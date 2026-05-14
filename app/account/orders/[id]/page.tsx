"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard } from "lucide-react";
import type { Order } from "@/lib/woocommerce.d";

const BLUE = "#17569E";
const NAVY = "#17284b";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; Icon: typeof Package; step: number }> = {
  pending:    { label: "待付款", color: "#d97706", bg: "#fef3c7", Icon: Clock,        step: 0 },
  processing: { label: "處理中", color: "#2563eb", bg: "#dbeafe", Icon: Package,      step: 1 },
  "on-hold":  { label: "保留中", color: "#7c3aed", bg: "#ede9fe", Icon: Clock,        step: 1 },
  completed:  { label: "已完成", color: "#16a34a", bg: "#dcfce7", Icon: CheckCircle,  step: 3 },
  cancelled:  { label: "已取消", color: "#dc2626", bg: "#fee2e2", Icon: Package,      step: -1 },
  shipped:    { label: "已出貨", color: "#0891b2", bg: "#cffafe", Icon: Truck,        step: 2 },
};

const STEPS = ["訂單確認", "備貨中", "已出貨", "已完成"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });
}

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => { if (r.status === 404 || r.status === 403) { setNotFound(true); return null; } return r.json(); })
      .then((data) => { if (data && !data.error) setOrder(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-100 rounded-xl w-40 animate-pulse" />
        {[1, 2, 3].map((i) => <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />)}
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center" style={{ border: "1px solid #f0f0f0" }}>
        <Package size={40} className="mx-auto mb-3" style={{ color: "#d1d5db" }} />
        <p className="font-medium" style={{ fontSize: 15, color: NAVY }}>找不到此訂單</p>
        <Link href="/account/orders" className="inline-block mt-4 text-sm" style={{ color: BLUE }}>← 返回訂單列表</Link>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.processing;
  const step = cfg.step;
  const hasDiscount = parseFloat(order.discount_total) > 0;

  return (
    <div className="space-y-5">

      {/* Back */}
      <Link href="/account/orders" className="inline-flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity" style={{ color: BLUE }}>
        <ChevronLeft size={15} /> 返回訂單列表
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-2xl px-6 py-5" style={{ border: "1px solid #f0f0f0" }}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 2 }}>訂單編號</p>
            <p className="font-bold" style={{ fontSize: 20, color: NAVY }}>#{order.number}</p>
            <p className="mt-1" style={{ fontSize: 13, color: "#9ca3af" }}>{formatDate(order.date_created)}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold"
            style={{ fontSize: 13, color: cfg.color, backgroundColor: cfg.bg }}>
            <cfg.Icon size={13} />{cfg.label}
          </span>
        </div>

        {/* Progress bar — only for non-cancelled */}
        {step >= 0 && (
          <div className="mt-5">
            <div className="flex items-center">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: i <= step ? BLUE : "#e5e7eb",
                        color: i <= step ? "#fff" : "#9ca3af",
                        fontSize: 11, fontWeight: 600,
                      }}
                    >
                      {i < step ? "✓" : i + 1}
                    </div>
                    <p style={{ fontSize: 10.5, color: i <= step ? NAVY : "#9ca3af", whiteSpace: "nowrap" }}>{label}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 mb-5 rounded-full transition-colors"
                      style={{ backgroundColor: i < step ? BLUE : "#e5e7eb" }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Line items */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #f0f0f0" }}>
        <p className="px-6 py-4 font-semibold border-b border-gray-100" style={{ fontSize: 14, color: NAVY }}>訂購商品</p>
        <div className="divide-y divide-gray-50">
          {order.line_items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-6 py-4">
              {item.image?.src && (
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image src={item.image.src} alt={item.name} fill className="object-contain" sizes="56px" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium leading-snug" style={{ fontSize: 14, color: NAVY }}>{item.name}</p>
                <p style={{ fontSize: 12, color: "#9ca3af" }}>× {item.quantity}</p>
              </div>
              <p className="font-semibold flex-shrink-0" style={{ fontSize: 14, color: NAVY }}>
                NT${Number(item.total).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="px-6 py-4 space-y-2 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between text-sm" style={{ color: "#6b7280" }}>
            <span>小計</span>
            <span>NT${Number(parseFloat(order.total) - parseFloat(order.shipping_total) + parseFloat(order.discount_total)).toLocaleString()}</span>
          </div>
          {hasDiscount && (
            <div className="flex justify-between text-sm" style={{ color: "#16a34a" }}>
              <span>折扣</span><span>− NT${Number(order.discount_total).toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-sm" style={{ color: "#6b7280" }}>
            <span>運費</span>
            <span>{parseFloat(order.shipping_total) > 0 ? `NT${Number(order.shipping_total).toLocaleString()}` : "免費"}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-gray-200" style={{ fontSize: 16, color: NAVY }}>
            <span>合計</span><span>NT${Number(order.total).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Address + Payment grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #f0f0f0" }}>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={15} style={{ color: BLUE }} />
            <p className="font-semibold" style={{ fontSize: 13, color: NAVY }}>配送地址</p>
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
            {order.shipping.last_name}{order.shipping.first_name}<br />
            {order.shipping.postcode} {order.shipping.state}{order.shipping.city}<br />
            {order.shipping.address_1}{order.shipping.address_2 ? <><br />{order.shipping.address_2}</> : ""}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #f0f0f0" }}>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={15} style={{ color: BLUE }} />
            <p className="font-semibold" style={{ fontSize: 13, color: NAVY }}>付款方式</p>
          </div>
          <p style={{ fontSize: 13, color: "#6b7280" }}>{order.payment_method_title}</p>
          {order.shipping_lines?.[0] && (
            <>
              <p className="font-semibold mt-3 mb-1" style={{ fontSize: 13, color: NAVY }}>配送方式</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{order.shipping_lines[0].method_title}</p>
            </>
          )}
          {order.customer_note && (
            <>
              <p className="font-semibold mt-3 mb-1" style={{ fontSize: 13, color: NAVY }}>訂單備註</p>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{order.customer_note}</p>
            </>
          )}
        </div>
      </div>

    </div>
  );
}
