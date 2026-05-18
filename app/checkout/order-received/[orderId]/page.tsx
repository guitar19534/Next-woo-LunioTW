"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, Truck, MessageCircle, MapPin, CreditCard, ClipboardList, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/cart-provider";
import type { Order } from "@/lib/woocommerce.d";

const NAVY  = "#17284b";
const BLUE  = "#3c7ae4";
const GREEN = "#16a34a";
const FONT  = "'MiSansTC','Noto Sans TC',sans-serif";

function ntd(v: string | number) {
  return `NT$${Number(v).toLocaleString("zh-TW")}`;
}

/* ── Skeleton ─────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="animate-pulse w-full max-w-xl mt-8 rounded-2xl overflow-hidden" style={{ border: "1px solid #e8edf4" }}>
      <div className="h-12 bg-gray-100" />
      {[1, 2].map(i => (
        <div key={i} className="flex gap-4 px-6 py-4 border-t border-gray-100">
          <div className="w-14 h-14 rounded-xl bg-gray-100 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 bg-gray-100 rounded w-2/3" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
          </div>
          <div className="h-4 bg-gray-100 rounded w-16" />
        </div>
      ))}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex justify-between">
            <div className="h-3 bg-gray-100 rounded w-20" />
            <div className="h-3 bg-gray-100 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Order summary card ───────────────────────────────────────── */
function OrderCard({ order }: { order: Order }) {
  const hasDiscount = parseFloat(order.discount_total) > 0;
  const hasShipping = parseFloat(order.shipping_total) > 0;
  const subtotal = parseFloat(order.total)
    - parseFloat(order.shipping_total)
    + parseFloat(order.discount_total);

  return (
    <div className="w-full max-w-xl mt-8 rounded-2xl overflow-hidden" style={{ border: "1px solid #e8edf4", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ background: "#f6f9ff", borderBottom: "1px solid #e8edf4" }}>
        <span className="font-bold" style={{ fontSize: 15, color: NAVY }}>訂單明細</span>
        <span style={{ fontSize: 13, color: "#888" }}>#{order.id}</span>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-100">
        {order.line_items.map(item => (
          <div key={item.id} className="flex items-center gap-4 px-6 py-4">
            {item.image?.src && (
              <div className="relative shrink-0 rounded-xl overflow-hidden" style={{ width: 56, height: 56, background: "#f6f9ff" }}>
                <Image src={item.image.src} alt={item.name} fill className="object-contain" sizes="56px" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium leading-snug line-clamp-2" style={{ fontSize: 13.5, color: NAVY }}>{item.name}</p>
              <p style={{ fontSize: 12, color: "#aaa" }}>× {item.quantity}</p>
            </div>
            <p className="font-semibold shrink-0" style={{ fontSize: 14, color: NAVY }}>{ntd(item.total)}</p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-6 py-4 space-y-2.5" style={{ borderTop: "1px solid #e8edf4", background: "#fafbfd" }}>
        <div className="flex justify-between" style={{ fontSize: 13, color: "#888" }}>
          <span>商品小計</span><span>{ntd(subtotal)}</span>
        </div>
        {hasDiscount && (
          <div className="flex justify-between" style={{ fontSize: 13, color: GREEN }}>
            <span>折扣優惠</span><span>− {ntd(order.discount_total)}</span>
          </div>
        )}
        <div className="flex justify-between" style={{ fontSize: 13, color: hasShipping ? "#888" : GREEN }}>
          <span>運費</span>
          <span>{hasShipping ? ntd(order.shipping_total) : "免費配送 🎉"}</span>
        </div>
        <div className="flex justify-between font-bold pt-2" style={{ borderTop: "1px solid #e8edf4", fontSize: 16, color: NAVY }}>
          <span>總計</span><span style={{ color: BLUE }}>{ntd(order.total)}</span>
        </div>
      </div>

      {/* Shipping + Payment */}
      <div className="grid sm:grid-cols-2" style={{ borderTop: "1px solid #e8edf4" }}>
        <div className="px-6 py-4 flex gap-3" style={{ borderBottom: "1px solid #e8edf4" }}>
          <MapPin size={15} className="shrink-0 mt-0.5" style={{ color: BLUE }} />
          <div>
            <p className="font-semibold mb-1" style={{ fontSize: 13, color: NAVY }}>配送地址</p>
            <p style={{ fontSize: 12.5, color: "#666", lineHeight: 1.7 }}>
              {order.shipping.last_name}{order.shipping.first_name}<br />
              {order.shipping.postcode} {order.shipping.state}{order.shipping.city}<br />
              {order.shipping.address_1}
            </p>
          </div>
        </div>
        <div className="px-6 py-4 flex gap-3">
          <CreditCard size={15} className="shrink-0 mt-0.5" style={{ color: BLUE }} />
          <div>
            <p className="font-semibold mb-1" style={{ fontSize: 13, color: NAVY }}>付款方式</p>
            <p style={{ fontSize: 12.5, color: "#666" }}>{order.payment_method_title}</p>
            {order.shipping_lines?.[0]?.method_title && (
              <>
                <p className="font-semibold mt-2 mb-1" style={{ fontSize: 13, color: NAVY }}>配送方式</p>
                <p style={{ fontSize: 12.5, color: "#666" }}>{order.shipping_lines[0].method_title}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────── */
function OrderReceivedContent() {
  const { orderId } = useParams<{ orderId: string }>();
  const sp = useSearchParams();
  const key = sp.get("key") ?? "";
  const { clearCart } = useCart();
  const cleared = useRef(false);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cleared.current) {
      cleared.current = true;
      clearCart().catch(() => {});
    }
    sessionStorage.removeItem("pending_order_id");
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!orderId) return;
    const qs = key ? `?key=${encodeURIComponent(key)}` : "";
    fetch(`/api/orders/${orderId}${qs}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data && !data.error) setOrder(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [orderId, key]);

  return (
    <main style={{ fontFamily: FONT, background: "#f8faff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "clamp(40px,6vw,80px) clamp(20px,4vw,48px)" }}>

        {/* ── Success icon ── */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 88, height: 88, borderRadius: "50%",
            background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 8px 32px rgba(22,163,74,0.15)",
          }}>
            <CheckCircle size={48} style={{ color: GREEN }} />
          </div>

          <h1 style={{ fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, color: NAVY, marginBottom: 10 }}>
            感謝您的訂購！
          </h1>
          <p style={{ fontSize: "clamp(14px,1.1vw,16px)", color: "#666", lineHeight: 1.8, maxWidth: 420, margin: "0 auto" }}>
            您的訂單已成功建立，我們將盡快安排出貨。<br />
            確認信已寄送至您的電子信箱。
          </p>

          {/* Order number pill */}
          {orderId && (
            <div style={{
              display: "inline-flex", flexDirection: "column", alignItems: "center",
              marginTop: 20, padding: "12px 32px", borderRadius: 16,
              background: "#fff", border: "1.5px solid #dbeafe",
              boxShadow: "0 2px 12px rgba(60,122,228,0.08)",
            }}>
              <span style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>訂單編號</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: BLUE }}>#{orderId}</span>
            </div>
          )}
        </div>

        {/* ── Info cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 4 }}>
          {[
            { Icon: Package,       color: "#3c7ae4", bg: "#eff6ff", title: "出貨時間",  body: "確認後\n7–14 工作天" },
            { Icon: Truck,         color: "#16a34a", bg: "#f0fdf4", title: "全台配送",  body: "司機前一天\n來電確認" },
            { Icon: MessageCircle, color: "#f59e0b", bg: "#fffbeb", title: "需要協助？", body: "LINE 客服或\n服務專線" },
          ].map(({ Icon, color, bg, title, body }) => (
            <div key={title} style={{ background: "#fff", border: "1px solid #e8edf4", borderRadius: 16, padding: "16px 12px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                <Icon size={20} style={{ color }} />
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{title}</p>
              <p style={{ fontSize: 11.5, color: "#888", lineHeight: 1.65, whiteSpace: "pre-line" }}>{body}</p>
            </div>
          ))}
        </div>

        {/* ── Order detail card ── */}
        {loading && <Skeleton />}
        {order && <OrderCard order={order} />}

        {/* ── Actions ── */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          <Link href="/shop" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 28px", borderRadius: 30,
            background: BLUE, color: "#fff", fontWeight: 700, fontSize: 14,
            textDecoration: "none", letterSpacing: "0.05em",
          }}>
            <ShoppingBag size={15} /> 繼續購物
          </Link>
          {orderId && (
            <Link href={`/account/orders/${orderId}`} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px", borderRadius: 30,
              background: "#fff", color: NAVY, fontWeight: 600, fontSize: 14,
              textDecoration: "none", border: "1.5px solid #e8edf4",
              letterSpacing: "0.05em",
            }}>
              <ClipboardList size={15} /> 查看訂單
            </Link>
          )}
        </div>

      </div>
    </main>
  );
}

export default function OrderReceivedPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: `2px solid ${BLUE}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <OrderReceivedContent />
    </Suspense>
  );
}
