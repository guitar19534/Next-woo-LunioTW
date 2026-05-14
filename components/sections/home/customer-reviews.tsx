/**
 * CustomerReviews — Section 8: Customer Reviews
 *
 * Layout:
 *   Watermark 'REVIEWS' + centered heading
 *   Responsive card grid: 3-col desktop / 2-col tablet / scroll-snap mobile
 *
 * Each card: square lifestyle photo · 5 gold stars · review text · customer name
 *
 * ─── Replacing placeholder photos ───────────────────────────────────────────
 *  Drop real customer photos into /public/images/reviews/
 *  and update the `photo` field in REVIEWS below.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    photo: "https://placehold.co/400x400/dde8f5/17284b?text=夫妻+臥室",
    photoAlt: "滿意的 Lunio 顧客 — 夫妻在新床墊上的生活照",
    name: "陳先生 & 陳太太",
    location: "台北市",
    stars: 5,
    text: "買了 Gen4 之後，老婆說這是她睡過最好的床墊。翻身完全不會干擾彼此，兩個人都睡得很熟！",
  },
  {
    photo: "https://placehold.co/400x400/d8e5f2/17284b?text=寶寶+家庭",
    photoAlt: "年輕家庭與 Lunio 床墊 — 孩子在床上玩耍",
    name: "王小姐",
    location: "台中市",
    stars: 5,
    text: "石墨烯真的有差！以前夏天睡到半夜都會流汗醒來，用了 Lunio 之後整夜涼涼的，太神奇了。",
  },
  {
    photo: "https://placehold.co/400x400/d3e2f0/17284b?text=簡約+臥室",
    photoAlt: "現代簡約臥室中的 Lunio 床墊",
    name: "林先生",
    location: "新竹市",
    stars: 5,
    text: "腰痠背痛困擾我好幾年，睡了 Lunio 一個月之後，早上醒來腰完全不緊繃了。骨科醫師合作研發真的不是說說而已。",
  },
  {
    photo: "https://placehold.co/400x400/cdd9ec/17284b?text=女性+臥室",
    photoAlt: "女性顧客在 Lunio 床墊上舒適入睡",
    name: "張小姐",
    location: "高雄市",
    stars: 5,
    text: "100 晚試睡讓我安心很多，但根本不需要退，第一晚就愛上了。服務人員也超貼心，安裝完還教我調整枕頭高度。",
  },
  {
    photo: "https://placehold.co/400x400/c8d6e8/17284b?text=銀髮+夫妻",
    photoAlt: "熟齡夫妻在 Lunio 床墊上的幸福生活",
    name: "黃先生",
    location: "台南市",
    stars: 5,
    text: "退休後最重視睡眠品質，Lunio 的九區支撐讓我每天早上起床都神清氣爽。一分錢一分貨，值得！",
  },
  {
    photo: "https://placehold.co/400x400/c2cedf/17284b?text=年輕+臥室",
    photoAlt: "年輕顧客與 Lunio 床墊 — 清晨舒適醒來",
    name: "李小姐",
    location: "桃園市",
    stars: 5,
    text: "免費配送安裝太讚了！以前搬床超麻煩，這次舊床也幫我搬走，完全零壓力。床墊本身更不用說，舒服到不想起床。",
  },
] as const;

// ─── Star rating ──────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} 顆星`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" aria-hidden
          fill={i < count ? "#f0c040" : "#e5e5e5"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Single review card ────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div
      className="flex flex-col bg-white rounded-2xl overflow-hidden
                 border border-gray-100
                 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300"
    >
      {/* Square lifestyle photo */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={review.photo}
          alt={review.photoAlt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 360px"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 px-5 py-5">
        <Stars count={review.stars} />

        <p
          className="mt-3 flex-1"
          style={{
            fontSize: "14px",
            color: "#5F6062",
            lineHeight: 1.85,
          }}
        >
          「{review.text}」
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#eef4ff" }}
            aria-hidden
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#3c7ae4" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <p className="font-bold" style={{ fontSize: "13px", color: "#17284b" }}>
              {review.name}
            </p>
            <p style={{ fontSize: "11px", color: "#aaa" }}>{review.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function CustomerReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const TOTAL = REVIEWS.length;

  const syncIndex = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    let best = 0, bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const dist = Math.abs((child as HTMLElement).offsetLeft - el.scrollLeft);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    setActiveIndex(best);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncIndex, { passive: true });
    return () => el.removeEventListener("scroll", syncIndex);
  }, [syncIndex]);

  function scrollToIndex(i: number) {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveIndex(i);
  }

  return (
    <section className="bg-[#F8F8F8] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">

        {/* ── Header: watermark + title ──────────────────────── */}
        <div className="relative text-center mb-12 md:mb-16">

          {/* Watermark */}
          <span
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-bold leading-none"
            aria-hidden
            style={{
              fontSize: "clamp(50px, 11vw, 108px)",
              color: "transparent",
              WebkitTextStroke: "1px #dde6f0",
              letterSpacing: "0.14em",
              whiteSpace: "nowrap",
            }}
          >
            REVIEWS
          </span>

          <div className="relative">
            <p
              className="uppercase font-medium tracking-[5px] mb-4"
              style={{ fontSize: "11px", color: "#3c7ae4" }}
            >
              CUSTOMER REVIEWS
            </p>
            <h2
              className="font-bold"
              style={{
                fontFamily: "'Chiron Goround TC', sans-serif",
                color: "#17284b",
                lineHeight: 1.35,
                letterSpacing: "0.02em",
              }}
            >
              每個夜晚都值得被珍惜
            </h2>
            <p
              className="mt-3 mx-auto"
              style={{ fontSize: "15px", color: "#888888", maxWidth: "400px" }}
            >
              感謝每一位信任 Lunio 的顧客
            </p>
          </div>
        </div>

        {/* ── Desktop: 3-col grid (2 rows) ─────────────────── */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
          {REVIEWS.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>

        {/* ── Mobile: scroll-snap carousel 1.2 cards ────────── */}
        <div className="md:hidden">
          <style>{`.review-track::-webkit-scrollbar { display: none; }`}</style>
          <div
            ref={trackRef}
            className="review-track flex gap-4 overflow-x-auto pb-2"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
              marginLeft: "-20px",
              marginRight: "-20px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{
                  width: "calc(100vw - 60px)",
                  scrollSnapAlign: "start",
                }}
              >
                <ReviewCard review={r} />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6" role="tablist">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`評論 ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={cn(
                  "rounded-full transition-all duration-200",
                  i === activeIndex
                    ? "w-5 h-2 bg-[#3c7ae4]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        </div>

        {/* ── Aggregate rating bar ───────────────────────────── */}
        <div
          className="mt-14 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10"
        >
          <div className="text-center">
            <p className="font-bold" style={{ fontSize: "48px", color: "#17284b", lineHeight: 1 }}>
              4.9
            </p>
            <Stars count={5} />
            <p className="mt-1" style={{ fontSize: "12px", color: "#aaa" }}>
              平均評分
            </p>
          </div>

          <div
            className="hidden sm:block w-px self-stretch"
            style={{ background: "#e5e5e5" }}
          />

          <div className="flex flex-col gap-2" style={{ minWidth: "180px" }}>
            {[
              { label: "5 星", pct: 92 },
              { label: "4 星", pct: 6 },
              { label: "3 星", pct: 2 },
            ].map(({ label, pct }) => (
              <div key={label} className="flex items-center gap-3">
                <span style={{ fontSize: "12px", color: "#888", minWidth: "30px" }}>{label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: "#f0c040" }}
                  />
                </div>
                <span style={{ fontSize: "12px", color: "#888", minWidth: "28px", textAlign: "right" }}>
                  {pct}%
                </span>
              </div>
            ))}
          </div>

          <div
            className="hidden sm:block w-px self-stretch"
            style={{ background: "#e5e5e5" }}
          />

          <div className="text-center">
            <p className="font-bold" style={{ fontSize: "36px", color: "#17284b", lineHeight: 1 }}>
              2,800+
            </p>
            <p className="mt-1" style={{ fontSize: "12px", color: "#aaa" }}>
              滿意顧客
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
