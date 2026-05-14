"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ShoppingBag, ClipboardList, MapPin, CreditCard } from "lucide-react";

import { useCart } from "@/components/shop/cart-provider";
import type { Order } from "@/lib/woocommerce.d";

const FONT = "'MiSansTC','Noto Sans TC',sans-serif";
const NAVY = "#17284b";
const BLUE = "#17569E";

function formatTWD(amount: string | number) {
  return `NT$${Number(amount).toLocaleString()}`;
}

// ── Order Summary ─────────────────────────────────────────────────────────────
function OrderSummary({ order }: { order: Order }) {
  const hasDiscount = parseFloat(order.discount_total) > 0;
  const hasShipping = parseFloat(order.shipping_total) > 0;

  return (
    <div
      className="w-full max-w-[640px] mt-10 rounded-3xl overflow-hidden text-left"
      style={{ border: "1.5px solid #e5e7eb", fontFamily: FONT }}
    >
      {/* Header */}
      <div className="px-6 py-4" style={{ backgroundColor: "#f8faff", borderBottom: "1px solid #e5e7eb" }}>
        <p className="font-bold" style={{ fontSize: 15, color: NAVY }}>訂單明細</p>
      </div>

      {/* Line items */}
      <div className="divide-y divide-gray-100">
        {order.line_items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 px-6 py-4">
            {/* Thumbnail */}
            {item.image?.src && (
              <div className="relative shrink-0 rounded-xl overflow-hidden bg-gray-50"
                style={{ width: 60, height: 60 }}>
                <Image
                  src={item.image.src}
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="60px"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium leading-snug" style={{ fontSize: 14, color: NAVY }}>
                {item.name}
              </p>
              {item.meta_data?.filter(m => m.key !== "_" && !m.key.startsWith("_")).map((m, i) => (
                <p key={i} style={{ fontSize: 12, color: "#9ca3af" }}>{m.display_key}: {String(m.display_value ?? m.value)}</p>
              ))}
              <p style={{ fontSize: 12, color: "#9ca3af" }}>× {item.quantity}</p>
            </div>
            <p className="font-semibold shrink-0" style={{ fontSize: 14, color: NAVY }}>
              {formatTWD(item.total)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-6 py-4 space-y-2" style={{ borderTop: "1px solid #e5e7eb", backgroundColor: "#fafafa" }}>
        <div className="flex justify-between text-sm" style={{ color: "#6b7280" }}>
          <span>商品小計</span>
          <span>{formatTWD(parseFloat(order.total) - parseFloat(order.shipping_total) + parseFloat(order.discount_total))}</span>
        </div>
        {hasDiscount && (
          <div className="flex justify-between text-sm" style={{ color: "#16a34a" }}>
            <span>折扣優惠</span>
            <span>− {formatTWD(order.discount_total)}</span>
          </div>
        )}
        {hasShipping ? (
          <div className="flex justify-between text-sm" style={{ color: "#6b7280" }}>
            <span>運費</span>
            <span>{formatTWD(order.shipping_total)}</span>
          </div>
        ) : (
          <div className="flex justify-between text-sm" style={{ color: "#16a34a" }}>
            <span>運費</span>
            <span>免費</span>
          </div>
        )}
        <div className="flex justify-between font-bold pt-2" style={{ borderTop: "1px solid #e5e7eb", fontSize: 16, color: NAVY }}>
          <span>總計</span>
          <span>{formatTWD(order.total)}</span>
        </div>
      </div>

      {/* Shipping address + payment method */}
      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100"
        style={{ borderTop: "1px solid #e5e7eb" }}>
        <div className="px-6 py-4 flex gap-3">
          <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: BLUE }} />
          <div>
            <p className="font-medium mb-1" style={{ fontSize: 13, color: NAVY }}>配送地址</p>
            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
              {order.shipping.last_name}{order.shipping.first_name}<br />
              {order.shipping.postcode} {order.shipping.state}{order.shipping.city}<br />
              {order.shipping.address_1}
              {order.shipping.address_2 && <><br />{order.shipping.address_2}</>}
            </p>
          </div>
        </div>
        <div className="px-6 py-4 flex gap-3">
          <CreditCard size={16} className="shrink-0 mt-0.5" style={{ color: BLUE }} />
          <div>
            <p className="font-medium mb-1" style={{ fontSize: 13, color: NAVY }}>付款方式</p>
            <p style={{ fontSize: 13, color: "#6b7280" }}>{order.payment_method_title}</p>
            {order.shipping_lines?.[0]?.method_title && (
              <>
                <p className="font-medium mt-2 mb-1" style={{ fontSize: 13, color: NAVY }}>配送方式</p>
                <p style={{ fontSize: 13, color: "#6b7280" }}>{order.shipping_lines[0].method_title}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function OrderSkeleton() {
  return (
    <div className="w-full max-w-[640px] mt-10 rounded-3xl overflow-hidden animate-pulse"
      style={{ border: "1.5px solid #e5e7eb" }}>
      <div className="px-6 py-4 bg-gray-100" style={{ height: 48 }} />
      {[1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4 border-t border-gray-100">
          <div className="rounded-xl bg-gray-100 shrink-0" style={{ width: 60, height: 60 }} />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
          </div>
          <div className="h-4 bg-gray-100 rounded w-16" />
        </div>
      ))}
      <div className="px-6 py-4 border-t border-gray-100 space-y-2 bg-gray-50">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3 bg-gray-100 rounded w-20" />
            <div className="h-3 bg-gray-100 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main content ──────────────────────────────────────────────────────────────
function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const cleared = useRef(false);

  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderKey, setOrderKey] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  useEffect(() => {
    // Support both URL formats:
    // Our format:          /checkout/success?order=123&key=wc_order_xxx
    // WooCommerce format:  /checkout/success?order-received=123&key=wc_order_xxx
    const id = searchParams.get("order") || searchParams.get("order-received");
    const key = searchParams.get("key");
    setOrderId(id);
    setOrderKey(key);

    if (!cleared.current) {
      cleared.current = true;
      queueMicrotask(() => { clearCart().catch(() => {}); });
    }

    if (typeof window !== "undefined") {
      sessionStorage.removeItem("pending_order_id");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch order details
  useEffect(() => {
    if (!orderId) return;
    setLoadingOrder(true);
    const qs = orderKey ? `?key=${encodeURIComponent(orderKey)}` : "";
    fetch(`/api/orders/${orderId}${qs}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data && !data.error) setOrder(data); })
      .catch(() => {})
      .finally(() => setLoadingOrder(false));
  }, [orderId, orderKey]);

  return (
    <div
      className="min-h-[70vh] flex flex-col items-center px-6 py-16"
      style={{ fontFamily: FONT }}
    >
      {/* Checkmark */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: "#f0fdf4" }}
      >
        <CheckCircle size={52} style={{ color: "#16a34a" }} />
      </div>

      {/* Title */}
      <h1 className="font-bold mb-2 text-center" style={{ fontSize: "clamp(22px, 4vw, 32px)", color: NAVY }}>
        感謝您的訂購！
      </h1>
      <p className="text-center" style={{ fontSize: 15, color: "#6b7280", maxWidth: 420, lineHeight: 1.7 }}>
        您的訂單已成功建立，我們會盡快與您確認並安排出貨。<br />
        確認信將寄送至您填寫的電子信箱。
      </p>

      {/* Order number */}
      {orderId && (
        <div
          className="mt-8 px-8 py-4 rounded-2xl"
          style={{ backgroundColor: "#f8faff", border: "1.5px solid #dbeafe" }}
        >
          <p className="text-center" style={{ fontSize: 12, color: "#9ca3af", marginBottom: 2 }}>訂單編號</p>
          <p className="font-bold text-center" style={{ fontSize: 26, color: NAVY }}>
            #{orderId}
          </p>
        </div>
      )}

      {/* Info cards */}
      <div className="grid sm:grid-cols-3 gap-3 mt-8 w-full max-w-[520px]">
        {[
          { icon: "📦", title: "出貨時間", desc: "下單確認後\n7–14 個工作天" },
          { icon: "🚚", title: "配送方式", desc: "全台免費配送\n司機前一天聯繫" },
          { icon: "💬", title: "需要協助？", desc: "LINE 客服或\n撥打服務專線" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl px-4 py-4 text-center"
            style={{ backgroundColor: "#fafafa", border: "1px solid #f0f0f0" }}
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <p className="font-semibold mb-0.5" style={{ fontSize: 13, color: NAVY }}>{item.title}</p>
            <p className="whitespace-pre-line" style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.6 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Order summary */}
      {loadingOrder && <OrderSkeleton />}
      {order && <OrderSummary order={order} />}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-8 justify-center">
        <Link
          href="/shop"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: BLUE, fontSize: 14 }}
        >
          <ShoppingBag size={15} />
          繼續購物
        </Link>

        {orderId && (
          <Link
            href={`/account/orders/${orderId}`}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
            style={{ fontSize: 14, color: NAVY, border: "1.5px solid #e5e7eb" }}
          >
            <ClipboardList size={15} />
            查看訂單
          </Link>
        )}
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center" style={{ fontFamily: FONT }}>
          <div
            className="w-9 h-9 rounded-full border-2 animate-spin"
            style={{ borderColor: BLUE, borderTopColor: "transparent" }}
          />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
