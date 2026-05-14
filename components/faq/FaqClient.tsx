"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

const BLUE = "#17569E";
const NAVY = "#17284b";

interface FaqItem { q: string; a: ReactNode; }

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}
            className="overflow-hidden rounded-2xl transition-all duration-200"
            style={{
              border: isOpen ? `1.5px solid ${BLUE}` : "1.5px solid #eef2fb",
              boxShadow: isOpen ? "0 4px 24px rgba(23,86,158,0.10)" : "0 1px 4px rgba(23,40,75,0.04)",
              backgroundColor: "#fff",
            }}>
            <button type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex items-center justify-between w-full text-left transition-colors"
              style={{ padding: "18px 24px", backgroundColor: isOpen ? "#f0f6ff" : "transparent" }}>
              <div className="flex items-center gap-3">
                {/* Number badge */}
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors"
                  style={{
                    backgroundColor: isOpen ? BLUE : "#f0f4fb",
                    color: isOpen ? "#fff" : "#9ca3af",
                  }}>
                  {i + 1}
                </span>
                <span className="font-semibold transition-colors"
                  style={{ fontSize: 15, color: isOpen ? BLUE : NAVY }}>
                  {item.q}
                </span>
              </div>
              <ChevronDown size={18}
                className="flex-shrink-0 transition-transform duration-300"
                style={{ color: isOpen ? BLUE : "#9ca3af", transform: isOpen ? "rotate(180deg)" : "none" }} />
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-2">
                {/* Left accent line */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-0.5 rounded-full self-stretch" style={{ backgroundColor: "#dce8f8" }} />
                  <div className="flex-1 min-w-0">{item.a}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface Props {
  productFaqs: FaqItem[];
  shoppingFaqs: FaqItem[];
}

export function FaqClient({ productFaqs, shoppingFaqs }: Props) {
  const [tab, setTab] = useState<"product" | "shopping">("product");

  const tabs = [
    { key: "product" as const, label: "產品須知", sub: "Product FAQ", count: productFaqs.length },
    { key: "shopping" as const, label: "購物須知", sub: "Shopping FAQ", count: shoppingFaqs.length },
  ];

  return (
    <main style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif", backgroundColor: "#f7f9fd", minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: NAVY }}>
        <div className="max-w-[760px] w-[88%] mx-auto text-center">
          <p className="font-semibold mb-2 uppercase tracking-[4px]" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>FAQ</p>
          <h1 className="font-bold mb-4" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#fff" }}>常見問題</h1>
          <p style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.55)" }}>
            找不到答案？歡迎聯繫我們的客服團隊
          </p>
        </div>
      </section>

      {/* ── Tab switcher ─────────────────────────────────────────── */}
      <div className="sticky top-[70px] z-30 bg-white" style={{ borderBottom: "1px solid #eef2fb", boxShadow: "0 2px 12px rgba(23,40,75,0.06)" }}>
        <div className="max-w-[840px] w-[88%] mx-auto flex">
          {tabs.map((t) => (
            <button key={t.key} type="button"
              onClick={() => setTab(t.key)}
              className="flex-1 flex flex-col items-center py-4 transition-colors relative"
              style={{ cursor: "pointer", background: "none", border: "none" }}>
              <span className="font-bold" style={{ fontSize: 15, color: tab === t.key ? BLUE : "#9ca3af", transition: "color 0.2s" }}>
                {t.label}
              </span>
              <span className="text-xs mt-0.5" style={{ color: tab === t.key ? "#93c5fd" : "#d1d5db", transition: "color 0.2s" }}>
                {t.sub} · {t.count}項
              </span>
              {tab === t.key && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-16 rounded-full" style={{ backgroundColor: BLUE }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="max-w-[840px] w-[88%] mx-auto py-10 md:py-14">

        {tab === "product" && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#e8f0fb" }}>
                🛏
              </div>
              <div>
                <p className="font-bold" style={{ fontSize: 18, color: NAVY }}>產品須知</p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>床墊、枕頭相關問題</p>
              </div>
            </div>
            <FaqAccordion items={productFaqs} />
          </div>
        )}

        {tab === "shopping" && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#e8f0fb" }}>
                🛒
              </div>
              <div>
                <p className="font-bold" style={{ fontSize: 18, color: NAVY }}>購物須知</p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>退換貨、運送、付款相關問題</p>
              </div>
            </div>
            <FaqAccordion items={shoppingFaqs} />
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 rounded-2xl p-8 text-center" style={{ backgroundColor: "#fff", border: "1.5px solid #eef2fb", boxShadow: "0 2px 16px rgba(23,40,75,0.05)" }}>
          <p className="font-bold mb-1" style={{ fontSize: 18, color: NAVY }}>您的問題沒有得到解決？</p>
          <p className="mb-6" style={{ fontSize: 14, color: "#6b7280" }}>我們的客服團隊隨時為您服務</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="https://line.me" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#00B900" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden>
                <rect width="24" height="24" rx="6" fill="transparent"/>
                <path d="M20 10.5C20 7.46 16.41 5 12 5S4 7.46 4 10.5c0 2.7 2.4 4.97 5.63 5.4.22.05.52.14.59.33.07.17.05.43.02.6l-.1.58c-.03.17-.14.67.59.36.73-.3 3.94-2.32 5.37-3.97C17.93 12.73 20 11.73 20 10.5z"/>
              </svg>
              Line 聯繫客服
            </a>
            <a href="/storefront#booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: BLUE, color: "#fff" }}>
              預約門市試躺
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
