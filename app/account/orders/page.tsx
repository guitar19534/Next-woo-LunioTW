"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, ChevronRight, Package, Truck, CheckCircle, Clock, ChevronLeft } from "lucide-react";
import { useAccount } from "../layout";

const BLUE = "#17569E";
const NAVY = "#17284b";

type Order = {
  id: number; number: string; status: string;
  date_created: string; total: string; currency: string;
  line_items: { name: string; quantity: number; total: string }[];
  shipping_lines: { method_title: string }[];
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
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium"
      style={{ fontSize: 12, color: cfg.color, backgroundColor: cfg.bg }}>
      <cfg.Icon size={11} />{cfg.label}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" });
}

export default function OrdersPage() {
  const { user } = useAccount();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!user?.wcCustomerId) return;
    setLoading(true);
    fetch(`/api/account/orders?customer=${user.wcCustomerId}&page=${page}`)
      .then((r) => r.ok ? r.json() : { orders: [], totalPages: 1 })
      .then(({ orders, totalPages }) => { setOrders(orders); setTotalPages(totalPages); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.wcCustomerId, page]);

  return (
    <div className="space-y-5">
      <h1 className="font-bold" style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: NAVY }}>訂單記錄</h1>

      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #f0f0f0" }}>
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag size={40} className="mx-auto mb-3" style={{ color: "#d1d5db" }} />
            <p className="font-medium mb-1" style={{ fontSize: 15, color: NAVY }}>還沒有訂單</p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>立即探索我們的床墊系列</p>
            <Link href="/nooz" className="inline-block mt-5 px-7 py-2.5 rounded-full text-white font-medium" style={{ backgroundColor: BLUE, fontSize: 14 }}>
              前往選購
            </Link>
          </div>
        ) : (
          <>
            {/* Table header — desktop */}
            <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100"
              style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.05em" }}>
              <span>訂單</span>
              <span>日期</span>
              <span>狀態</span>
              <span>金額</span>
            </div>

            <div className="divide-y divide-gray-50">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="flex flex-col md:grid md:grid-cols-[1fr_auto_auto_auto] gap-2 md:gap-4 md:items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Order info */}
                  <div>
                    <p className="font-semibold" style={{ fontSize: 14, color: NAVY }}>#{order.number}</p>
                    <p className="mt-0.5" style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.5 }}>
                      {order.line_items.map(i => `${i.name} ×${i.quantity}`).join(" · ")}
                    </p>
                  </div>

                  <p className="md:text-right" style={{ fontSize: 13, color: "#6b7280" }}>
                    {formatDate(order.date_created)}
                  </p>

                  <div className="flex md:justify-end">
                    <StatusBadge status={order.status} />
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-2">
                    <span className="font-bold" style={{ fontSize: 15, color: NAVY }}>
                      NT${Number(order.total).toLocaleString()}
                    </span>
                    <ChevronRight size={16} style={{ color: "#d1d5db" }} />
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 px-6 py-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 rounded-full flex items-center justify-center border hover:bg-gray-50 disabled:opacity-30 transition-colors"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <ChevronLeft size={14} />
                </button>
                <span style={{ fontSize: 13, color: "#6b7280" }}>{page} / {totalPages}</span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-8 h-8 rounded-full flex items-center justify-center border hover:bg-gray-50 disabled:opacity-30 transition-colors"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
