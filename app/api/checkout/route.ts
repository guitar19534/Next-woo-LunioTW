import { NextRequest, NextResponse } from "next/server";
import { forwardSetCookies } from "@/app/api/cart/_proxy";

const STORE_API = `${process.env.WORDPRESS_URL}/wp-json/wc/store/v1`;

function extractErrMsg(data: Record<string, unknown>): string {
  // data.message is the primary WooCommerce error string
  if (typeof data.message === "string" && data.message) return data.message;
  // data.data.params contains field-level validation errors
  const params = (data.data as Record<string, unknown> | undefined)?.params;
  if (params && typeof params === "object") {
    const msgs = Object.values(params).filter(Boolean);
    if (msgs.length) return msgs.join("、");
  }
  return "下單失敗，請稍後再試";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const nonce       = request.headers.get("x-wc-nonce") ?? "";
    const cookieHeader = request.headers.get("cookie") ?? "";

    if (!body.billing_address?.email) {
      return NextResponse.json({ error: "請填寫電子信箱" }, { status: 400 });
    }

    // Use client-selected payment method, fall back to first available
    let paymentMethod = body.payment_method as string | undefined;
    if (!paymentMethod) {
      const pmRes = await fetch(`${STORE_API}/payment-methods`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      });
      const paymentMethods: Array<{ id: string }> = pmRes.ok ? await pmRes.json() : [];
      paymentMethod = paymentMethods[0]?.id ?? "cod";
    }

    const paymentData: Array<{ key: string; value: string }> = Array.isArray(body.payment_data)
      ? body.payment_data : [];

    const wcPayload: Record<string, unknown> = {
      billing_address:  body.billing_address,
      shipping_address: body.shipping_address,
      customer_note:    body.customer_note ?? "",
      payment_method:   paymentMethod,
      payment_data:     paymentData,
    };

    if (body.create_account && body.account_password) {
      wcPayload.create_account    = true;
      wcPayload.account_password  = body.account_password;
    }

    const wcRes = await fetch(`${STORE_API}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
        Nonce:  nonce,
      },
      body: JSON.stringify(wcPayload),
      cache: "no-store",
    });

    const data = await wcRes.json() as Record<string, unknown>;

    if (!wcRes.ok) {
      console.error("[checkout] WC error", wcRes.status, JSON.stringify(data).slice(0, 400));

      // Handle pending order: WooCommerce returns the existing pending order
      // instead of creating a new one — treat it as a successful order
      if (
        data.code === "woocommerce_rest_cart_empty" ||
        (typeof data.order_id === "number" && data.status === "pending")
      ) {
        const pendingOrderId = data.order_id as number | undefined;
        if (pendingOrderId) {
          // Fetch the pending order's payment URL via REST API
          const orderRes = await fetch(
            `${process.env.WORDPRESS_URL}/wp-json/wc/v3/orders/${pendingOrderId}?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}`,
            { cache: "no-store" }
          );
          const orderData = orderRes.ok ? await orderRes.json() as Record<string, unknown> : null;
          const paymentUrl = orderData
            ? `${process.env.WORDPRESS_URL}/checkout/order-pay/${pendingOrderId}/?pay_for_order=true&key=${orderData.order_key}`
            : null;
          const res = NextResponse.json({
            success: true,
            order: {
              id:            pendingOrderId,
              number:        String(pendingOrderId),
              status:        "pending",
              payment_url:   paymentUrl,
              needs_payment: true,
            },
          });
          forwardSetCookies(wcRes, res);
          return res;
        }
      }

      // Cart is empty — friendly message
      if (data.code === "woocommerce_rest_cart_empty") {
        return NextResponse.json({ error: "購物車是空的，請重新加入商品後再結帳" }, { status: 400 });
      }

      const errMsg = extractErrMsg(data);
      return NextResponse.json({ error: errMsg }, { status: wcRes.status });
    }

    const order = data as {
      order_id: number;
      status: string;
      totals?: { total_price: string };
      payment_result?: { redirect_url?: string; payment_status?: string };
    };

    const res = NextResponse.json({
      success: true,
      order: {
        id:            order.order_id,
        number:        String(order.order_id),
        status:        order.status,
        total:         order.totals?.total_price,
        payment_url:   order.payment_result?.redirect_url ?? null,
        needs_payment: order.payment_result?.payment_status !== "success",
      },
    });

    // Forward session cookies (rewrite domain so they work on localhost)
    forwardSetCookies(wcRes, res);

    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "伺服器錯誤，請稍後再試";
    console.error("[checkout] unexpected error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
