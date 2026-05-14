/**
 * ServiceCarousel — Section 3: "Our Services"
 *
 * Card layout (photo-first):
 *   ┌──────────────────────────────┐
 *   │  [Photo — 4:3 aspect ratio]  │  ← rounded top corners
 *   ├──────────────────────────────┤
 *   │  Bold headline (navy)        │
 *   │  Gray sub-headline           │
 *   └──────────────────────────────┘
 *
 * Desktop (lg+):  5 cards in a static grid
 * Tablet / mobile: native CSS scroll-snap + JS-driven arrows + dot pagination
 *
 * ─── Replacing placeholder images ───────────────────────────────────────────
 *  1. Drop your WebP/JPEG files into  /public/images/services/
 *  2. Update the `imageSrc` value in the SERVICES array below to the local path.
 *     e.g. "/images/services/service-1-certification.webp"
 *  The `imagePlaceholder` field is the placehold.co URL — remove it once you
 *  swap in the real photo and add  placeholder="blur" + blurDataURL  instead.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Service data ──────────────────────────────────────────────────────────────

const SERVICES = [
  {
    // ① Replace imageSrc with: "/images/services/service-1-certification.webp"
    imageSrc: "https://placehold.co/800x600/dde8f5/17284b?text=認證標章+照片",
    imageAlt: "Lunio 乳膠床墊國際認證標章 — CertiPUR-US / OEKO-TEX",
    headline: "每一晚都安心",
    sub: "多項國際認證\n陪你入睡",
  },
  {
    // ② Replace imageSrc with: "/images/services/service-2-payment.webp"
    imageSrc: "https://placehold.co/800x600/d8e5f2/17284b?text=信用卡+分期",
    imageAlt: "高端信用卡與 Lunio 頂級床墊 — 12期0利率輕鬆入手",
    headline: "把睡眠 分期付款",
    sub: "輕鬆無負擔\n12期0利率",
  },
  {
    // ③ Replace imageSrc with: "/images/services/service-3-delivery.webp"
    imageSrc: "https://placehold.co/800x600/d3e2f0/17284b?text=真空包裝+配送",
    imageAlt: "Lunio 床墊真空捲包裝 — 整齊配送到府安裝",
    headline: "不用多付一毛",
    sub: "全台免費配送\n到府安裝，舊床回收",
  },
  {
    // ④ Replace imageSrc with: "/images/services/service-4-bedroom.webp"
    imageSrc: "https://placehold.co/800x600/cdd9ec/17284b?text=現代臥室+床墊",
    imageAlt: "現代簡約臥室中的 Lunio 床墊 — 極簡美學與舒適兼備",
    headline: "簡單，就是好",
    sub: "100% 天然乳膠\n石墨烯科技寢具",
  },
  {
    // ⑤ Replace imageSrc with: "/images/services/service-5-sleep.webp"
    imageSrc: "https://placehold.co/800x600/c8d6e8/17284b?text=安心+熟睡",
    imageAlt: "安心熟睡在 Lunio 床墊上的生活照 — 深層睡眠提升30%",
    headline: "你只要負責躺",
    sub: "100晚試睡保證\n不滿意全額退款",
  },
] as const;

type Service = (typeof SERVICES)[number];

// ─── Single card ──────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white h-full
                    border border-gray-100
                    transition-shadow duration-200
                    hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)]">
      {/* Photo */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={service.imageSrc}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 31vw, 220px"
          className="object-cover transition-transform duration-500 ease-out
                     group-hover:scale-105"
        />
      </div>

      {/* Text */}
      <div className="px-5 py-5 text-center">
        <h3
          className="font-bold leading-snug mb-1.5 whitespace-pre-line"
          style={{ fontSize: "16px", color: "#17284b" }}
        >
          {service.headline}
        </h3>
        <p
          className="leading-relaxed whitespace-pre-line"
          style={{ fontSize: "12.5px", color: "#888888" }}
        >
          {service.sub}
        </p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ServiceCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const TOTAL = SERVICES.length;

  // Sync active dot: find the child whose offsetLeft is closest to scrollLeft
  const syncIndex = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    let best = 0;
    let bestDist = Infinity;
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

  // Scroll the track to bring card `index` to the left edge
  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(TOTAL - 1, activeIndex + 1));

  return (
    <section className="bg-[#F8F8F8] py-14 md:py-20">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">

        {/* ── Section heading ─────────────────────────────────────── */}
        <div className="text-center mb-10 md:mb-14">
          <p
            className="uppercase font-medium tracking-[5px] mb-3"
            style={{ fontSize: "11px", color: "#3c7ae4" }}
          >
            OUR SERVICES · 服務說明
          </p>
          <h2 className="font-bold" style={{ color: "#17284b" }}>
            Our Services
          </h2>
        </div>

        {/* ── Desktop: 5-col static grid ──────────────────────────── */}
        <div className="hidden lg:grid grid-cols-5 gap-4 xl:gap-5">
          {SERVICES.map((s, i) => (
            // group on wrapper so Card can react to hover via group-hover:
            <div key={i} className="group">
              <ServiceCard service={s} />
            </div>
          ))}
        </div>

        {/* ── Mobile / tablet: scroll-snap carousel ───────────────── */}
        <div className="lg:hidden">

          {/* Hide native scrollbar cross-browser */}
          <style>{`
            .service-track::-webkit-scrollbar { display: none; }
          `}</style>

          {/* Track */}
          <div
            ref={trackRef}
            className="service-track flex gap-3 sm:gap-4 overflow-x-auto pb-1"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="group flex-shrink-0
                           w-[calc(100%-24px)]
                           sm:w-[calc(50%-8px)]
                           md:w-[calc(33.333%-10px)]"
                style={{ scrollSnapAlign: "start" }}
              >
                <ServiceCard service={s} />
              </div>
            ))}
          </div>

          {/* ── Controls ─────────────────────────────────────────── */}
          <div className="flex items-center justify-center gap-5 mt-8">

            {/* Prev */}
            <button
              type="button"
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="上一個"
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-full border transition-colors duration-150",
                activeIndex === 0
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-[#3c7ae4] text-[#3c7ae4] hover:bg-[#3c7ae4] hover:text-white"
              )}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="服務項目">
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`服務 ${i + 1}`}
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

            {/* Next */}
            <button
              type="button"
              onClick={next}
              disabled={activeIndex === TOTAL - 1}
              aria-label="下一個"
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-full border transition-colors duration-150",
                activeIndex === TOTAL - 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-[#3c7ae4] text-[#3c7ae4] hover:bg-[#3c7ae4] hover:text-white"
              )}
            >
              <ChevronRight size={18} />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}
