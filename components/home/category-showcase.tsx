"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

const CATEGORIES = [
  {
    label:           "床墊",
    labelEn:         "Mattress",
    href:            "/shop/category/mattress",
    imageSrc:        "/brand/cat-mattress.webp",
    mobileImageSrc:  "/brand/mattress-mobile.webp",
    imageAlt:        "Lunio Gen 4 石墨烯乳膠床墊 — 享受舒適深層睡眠",
    bgColor:         "#c8d8ee",
    objectPos:       "object-center",
    aspectClass:     "",
  },
  {
    label:           "枕頭",
    labelEn:         "Pillow",
    href:            "/shop/category/pillow",
    imageSrc:        "/brand/cat-pillow.webp",
    mobileImageSrc:  "/brand/Pillow-mobile.webp",
    imageAlt:        "Lunio HyperCool 工學護頸枕 — 輕鬆入眠",
    bgColor:         "#bdd4ed",
    objectPos:       "object-center",
    aspectClass:     "aspect-[377/650]",
  },
  {
    label:           "寢具配件",
    labelEn:         "Bedding",
    href:            "/shop/category/bedding",
    imageSrc:        "/brand/cat-bedding.webp",
    mobileImageSrc:  "/brand/Bedding-mobile.webp",
    imageAlt:        "Lunio SnowWeave 智能天絲寢具 — 溫度調節科技",
    bgColor:         "#b5cde8",
    objectPos:       "object-top",
    aspectClass:     "aspect-[377/650]",
  },
] as const;

function CategoryCard({ cat }: { cat: typeof CATEGORIES[number] }) {
  return (
    <Link
      href={cat.href}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00139D] focus-visible:ring-offset-2 rounded-2xl md:rounded-3xl h-full"
      aria-label={`${cat.label} — ${cat.labelEn}`}
    >
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-3xl" style={{ backgroundColor: cat.bgColor }}>
        <Image
          src={cat.imageSrc}
          alt={cat.imageAlt}
          fill
          sizes="(max-width: 640px) 80vw, 33vw"
          className={`object-cover ${cat.objectPos} transition-transform duration-500 ease-out group-hover:scale-105`}
          priority
        />
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.10) 40%, transparent 65%)" }}
        />
        <div className="absolute bottom-[20%] inset-x-0 flex justify-center pointer-events-none">
          <span className="inline-flex items-center justify-center bg-[#00139DAB] text-white rounded-full font-medium tracking-[2px] transition-all duration-200 group-hover:bg-[#00139D] group-hover:scale-105 group-hover:shadow-lg whitespace-nowrap text-[13px] md:text-[15px] px-6 md:px-8 py-2 md:py-2.5">
            {cat.label}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CategoryShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
  }

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(CATEGORIES.length - 1, activeIndex + 1));

  return (
    <section className="bg-white py-10 md:py-14 lg:py-20">
      <div className="w-[95%] mx-auto">

        {/* ── MOBILE: carousel with arrows ─────────────────── */}
        <div className="md:hidden">
          <style>{`.cat-track::-webkit-scrollbar{display:none}`}</style>
          <div ref={trackRef} className="cat-track flex gap-3 overflow-x-auto"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="shrink-0 block relative overflow-hidden"
                style={{ width: "94vw", scrollSnapAlign: "center", aspectRatio: "1 / 1", borderRadius: "24px" }}
                aria-label={`${cat.label} — ${cat.labelEn}`}
              >
                <Image
                  src={cat.mobileImageSrc}
                  alt={cat.imageAlt}
                  fill
                  sizes="94vw"
                  className="object-cover object-center"
                  priority
                />
                <div aria-hidden className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.10) 40%, transparent 65%)" }}
                />
                {/* Label — 15% from bottom */}
                <div className="absolute bottom-[15%] inset-x-0 flex justify-center">
                  <span className="inline-flex items-center justify-center bg-[#00139DAB] text-white rounded-full font-medium tracking-[2px] whitespace-nowrap text-[14px] px-6 py-2">
                    {cat.label}
                  </span>
                </div>
                {/* Left arrow */}
                <button type="button" onClick={(e) => { e.preventDefault(); prev(); }}
                  aria-label="上一個"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/30 backdrop-blur-sm text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                {/* Right arrow */}
                <button type="button" onClick={(e) => { e.preventDefault(); next(); }}
                  aria-label="下一個"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/30 backdrop-blur-sm text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </Link>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {CATEGORIES.map((_, i) => (
              <button key={i} type="button" onClick={() => scrollToIndex(i)} aria-label={`分類 ${i + 1}`}
                className="rounded-full transition-all duration-200"
                style={{ width: i === activeIndex ? "20px" : "8px", height: "8px", backgroundColor: i === activeIndex ? "#17569E" : "#d1d5db" }}
              />
            ))}
          </div>
        </div>

        {/* ── TABLET / DESKTOP: 2:1:1 grid ─────────────────── */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] items-stretch gap-4 md:gap-5 lg:gap-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.href} className={cat.aspectClass || "min-h-[300px]"}>
              <CategoryCard cat={cat} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
