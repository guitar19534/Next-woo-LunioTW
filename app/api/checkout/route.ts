import { NextRequest, NextResponse } from "next/server";

const STORE_API = `${process.env.WORDPRESS_URL}/wp-json/wc/store/v1`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const nonce = request.headers.get("x-wc-nonce") ?? "";
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

    // Forward payment_data from client (installment period, etc.)
    const paymentData: Array<{ key: string; value: string }> = Array.isArray(body.payment_data)
      ? body.payment_data
      : [];

    const wcPayload: Record<string, unknown> = {
      billing_address: body.billing_address,
      shipping_address: body.shipping_address,
      customer_note: body.customer_note ?? "",
      payment_method: paymentMethod,
      payment_data: paymentData,
    };

    // Account creation fields (if user filled in password)
    if (body.create_account && body.account_password) {
      wcPayload.create_account = true;
      wcPayload.account_password = body.account_password;
    }

    const wcRes = await fetch(`${STORE_API}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
        Nonce: nonce,
      },
      body: JSON.stringify(wcPayload),
      cache: "no-store",
    });

    const data = await wcRes.json();

    if (!wcRes.ok) {
      // Surface WooCommerce error message to user
      const errMsg = data.message
        ?? data.data?.params
          ? Object.values(data.data?.params ?? {}).join("、")
          : "下單失敗，請稍後再試";
      return NextResponse.json({ error: errMsg }, { status: wcRes.status });
    }

    const res = NextResponse.json({
      success: true,
      order: {
        id: data.order_id,
        number: String(data.order_id),
        status: data.status,
        total: data.totals?.total_price,
        payment_url: data.payment_result?.redirect_url ?? null,
        needs_payment: data.payment_result?.payment_status !== "success",
      },
    });

    // Forward WooCommerce session cookies
    try {
      const cookies = wcRes.headers.getSetCookie?.() ?? [];
      cookies.forEach((c) => res.headers.append("set-cookie", c));
    } catch {
      const raw = wcRes.headers.get("set-cookie");
      if (raw) res.headers.set("set-cookie", raw);
    }

    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "伺服器錯誤，請稍後再試";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
