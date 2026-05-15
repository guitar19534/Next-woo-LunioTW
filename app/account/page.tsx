"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, ChevronRight, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { useAccount } from "./layout";

const BLUE = "#17569E";
const NAVY = "#17284b";

type Order = {
  id: number; number: string; status: string;
  date_created: string; total: string; currency: string;
  line_items: { name: string; quantity: number }[];
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; Icon: typeof Package }> = {
  pending:    { label: "待付款", color: "#d97706", bg: "#fef3c7", Icon: Clock },
  processing: { label: "處理中", color: "#2563eb", bg: "#dbeafe", Icon: Package },
  "on-hold":  { label: "保留中", color: "#7c3aed", bg: "#ede9fe", Icon: Clock },
  completed:  { label: "已完成", color: "#16a34a", bg: "#dcfce7", Icon: CheckCircle },
  cancelled:  { label: "已取消", color: "#dc2626", bg: "#fee2e2", Icon: Package },
  shipped:    { label: "已出貨", color: "#0891b2", bg: "#cffafe", Icon: Truck },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: "#6b7280", bg: "#f3f4f6", Icon: Package };
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium"
      style={{ fontSize: 12, color: cfg.color, backgroundColor: cfg.bg }}
    >
      <cfg.Icon size={11} />
      {cfg.label}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric" });
}

export default function DashboardPage() {
  const { user, loading: userLoading } = useAccount();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user?.wcCustomerId) return;
    fetch(`/api/account/orders?customer=${user.wcCustomerId}&page=1`)
      .then((r) => r.ok ? r.json() : { orders: [] })
      .then(({ orders }) => setOrders(orders.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoadingOrders(false));
  }, [user?.wcCustomerId]);

  if (userLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 animate-pulse" style={{ height: 120 }} />
        ))}
      </div>
    );
  }

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "早安";
    if (h < 17) return "午安";
    return "晚安";
  })();

  return (
    <div className="space-y-5">

      {/* Welcome card */}
      <div
        className="rounded-2xl p-6 text-white"
        style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #1e40af 100%)` }}
      >
        <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>{greeting}！</p>
        <h1 className="font-bold" style={{ fontSize: "clamp(18px, 3vw, 24px)" }}>
          {user?.lastName}{user?.firstName || user?.name}
        </h1>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>{user?.email}</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "訂單總數", value: orders.length > 0 ? orders.length + "+" : "0", Icon: ShoppingBag },
          { label: "已完成訂單", value: orders.filter(o => o.status === "completed").length.toString(), Icon: CheckCircle },
        ].map(({ label, value, Icon }) => (
          <div key={label} className="bg-white rounded-2xl p-5 flex items-center gap-4" style={{ border: "1px solid #f0f0f0" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
              <Icon size={18} style={{ color: BLUE }} />
            </div>
            <div>
              <p className="font-bold" style={{ fontSize: 22, color: NAVY }}>{value}</p>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl" style={{ border: "1px solid #f0f0f0" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <p className="font-semibold" style={{ fontSize: 15, color: NAVY }}>最近訂單</p>
          <Link
            href="/account/orders"
            className="flex items-center gap-1 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: BLUE, fontSize: 13 }}
          >
            查看全部 <ChevronRight size={14} />
          </Link>
        </div>

        {loadingOrders ? (
          <div className="p-6 space-y-4">
            {[1, 2].map((i) => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center">
            <ShoppingBag size={36} className="mx-auto mb-3" style={{ color: "#d1d5db" }} />
            <p style={{ fontSize: 14, color: "#9ca3af" }}>目前沒有訂單記錄</p>
            <Link href="/nooz" className="inline-block mt-4 px-6 py-2 rounded-full text-white text-sm font-medium" style={{ backgroundColor: BLUE }}>
              立即選購
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold" style={{ fontSize: 14, color: NAVY }}>#{order.number}</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>
                    {formatDate(order.date_created)} · {order.line_items.map(i => i.name).join("、").slice(0, 40)}
                    {order.line_items.map(i => i.name).join("").length > 40 ? "…" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-bold" style={{ fontSize: 15, color: NAVY }}>
                    NT${Number(order.total).toLocaleString()}
                  </span>
                  <ChevronRight size={16} style={{ color: "#d1d5db" }} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: "繼續購物", desc: "探索 Lunio 全系列商品", href: "/shop", color: BLUE },
          { label: "聯絡客服", desc: "有任何問題歡迎聯繫我們", href: "/storefront", color: "#16a34a" },
        ].map(({ label, desc, href, color }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 hover:shadow-sm transition-shadow"
            style={{ border: "1px solid #f0f0f0" }}
          >
            <div>
              <p className="font-semibold" style={{ fontSize: 14, color: NAVY }}>{label}</p>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>{desc}</p>
            </div>
            <ChevronRight size={18} style={{ color }} />
          </Link>
        ))}
      </div>

    </div>
  );
}
