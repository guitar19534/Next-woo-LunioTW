"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition, useRef } from "react";
import type { ProductCategory } from "@/lib/woocommerce.d";

const BLUE = "#3c7ae4";
const NAVY = "#17284b";

const SORT_OPTIONS = [
  { value: "",            label: "預設排序" },
  { value: "popularity", label: "最熱銷" },
  { value: "date",       label: "最新上架" },
  { value: "price",      label: "價格低→高" },
  { value: "price-desc", label: "價格高→低" },
  { value: "rating",     label: "評分最高" },
];

const HIDDEN_SLUGS = new Set([
  "campaign10000", "graphene", "installable", "uncategorized",
]);

interface Props {
  categories: ProductCategory[];
  currentCategory?: string;
  currentSearch?: string;
  currentSort?: string;
  total: number;
}

export default function ShopFilters({
  categories, currentCategory, currentSearch, currentSort, total,
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [, startTransition] = useTransition();
  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const nav = useCallback((updates: Record<string, string | undefined>) => {
    const q = new URLSearchParams(sp.toString());
    q.delete("page");
    Object.entries(updates).forEach(([k, v]) => {
      if (v) q.set(k, v); else q.delete(k);
    });
    startTransition(() => router.push(`/shop${q.size ? `?${q}` : ""}`));
  }, [router, sp]);

  const visibleCats = categories.filter(
    (c) => c.count > 0 && !HIDDEN_SLUGS.has(c.slug)
  );

  return (
    <div style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" }}>
      <style>{`
        /* ── pills ── */
        .sf-pill {
          display: inline-flex; align-items: center;
          padding: 7px 16px; border-radius: 20px;
          font-size: 13px; font-weight: 500;
          cursor: pointer; white-space: nowrap;
          border: 1.5px solid #e4e8f0;
          background: #fff; color: #555;
          transition: all .15s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .sf-pill:hover  { border-color: ${BLUE}; color: ${BLUE}; }
        .sf-pill.active { background: ${BLUE}; color: #fff; border-color: ${BLUE}; font-weight: 600; }

        /* ── scrollbar hide ── */
        .sf-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .sf-scroll::-webkit-scrollbar { display: none; }

        /* ── search ── */
        .sf-search {
          width: 100%; padding: 10px 40px 10px 14px;
          border: 1.5px solid #e4e8f0; border-radius: 10px;
          font-size: 13px; color: #333; outline: none;
          background: #fafbfd; font-family: inherit;
          transition: border-color .15s;
          -webkit-appearance: none;
        }
        .sf-search:focus { border-color: ${BLUE}; background: #fff; }

        /* ── select ── */
        .sf-select {
          padding: 10px 36px 10px 14px;
          border: 1.5px solid #e4e8f0; border-radius: 10px;
          font-size: 13px; color: ${NAVY};
          background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
          -webkit-appearance: none; appearance: none;
          cursor: pointer; outline: none;
          font-family: inherit; flex: 1;
        }
        .sf-select:focus { border-color: ${BLUE}; }

        /* ── bottom row (desktop) ── */
        .sf-row {
          display: flex; align-items: center; gap: 10px;
        }

        /* ── mobile ── */
        @media (max-width: 640px) {
          .sf-pill { font-size: 12px; padding: 6px 13px; }
          .sf-row  { flex-direction: column; align-items: stretch; gap: 10px; }
          .sf-sort-group { width: 100%; }
          .sf-count { display: none; }
        }
      `}</style>

      {/* ── Category pills ───────────────────────────── */}
      <div className="sf-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 14 }}>
        <button
          className={`sf-pill${!currentCategory ? " active" : ""}`}
          onClick={() => nav({ category: undefined })}
        >
          全部
        </button>
        {visibleCats.map((c) => (
          <button
            key={c.id}
            className={`sf-pill${currentCategory === c.slug ? " active" : ""}`}
            onClick={() => nav({ category: currentCategory === c.slug ? undefined : c.slug })}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* ── Search + Sort ─────────────────────────────── */}
      <div className="sf-row">

        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 180px", maxWidth: 320 }}>
          <input
            className="sf-search"
            defaultValue={currentSearch}
            placeholder="搜尋商品..."
            onChange={(e) => {
              clearTimeout(searchTimer.current);
              searchTimer.current = setTimeout(
                () => nav({ search: e.target.value || undefined }), 400
              );
            }}
          />
          <span style={{
            position: "absolute", right: 12, top: "50%",
            transform: "translateY(-50%)", color: "#bbb",
            pointerEvents: "none", fontSize: 14,
          }}>🔍</span>
        </div>

        {/* Sort */}
        <div className="sf-sort-group" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: "#999", whiteSpace: "nowrap" }}>排序</span>
          <select
            className="sf-select"
            value={currentSort ?? ""}
            onChange={(e) => nav({ sort: e.target.value || undefined })}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Count */}
        {total > 0 && (
          <span className="sf-count" style={{ fontSize: 12, color: "#bbb", whiteSpace: "nowrap", marginLeft: "auto" }}>
            {total} 件
          </span>
        )}
      </div>
    </div>
  );
}
