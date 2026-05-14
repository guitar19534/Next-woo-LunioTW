"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    imageSrc: "/images/services/service-1.webp",
    imageAlt: "免費配送",
    headline: "好眠不用多付費",
    sub: "台灣本島免運",
  },
  {
    imageSrc: "/images/services/service-2.webp",
    imageAlt: "真空包裝",
    headline: "簡單 就該這樣",
    sub: "真空包裝 拆開就能用",
  },
  {
    imageSrc: "/images/services/service-3.webp",
    imageAlt: "免費搬上樓",
    headline: "你只要負責躺好",
    sub: "不管多高 免費搬上樓",
  },
  {
    imageSrc: "/images/services/service-4.webp",
    imageAlt: "國際認證",
    headline: "每一晚都安心",
    sub: "多項國際認證 陪你入睡",
  },
  {
    imageSrc: "/images/services/service-5.webp",
    imageAlt: "分期付款",
    headline: "把睡眠 分期付款",
    sub: "輕鬆無負擔 12期0利率",
  },
] as const;

type Service = (typeof SERVICES)[number];

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col items-center text-center px-2">
      <div className="relative w-[70%] mx-auto aspect-[248/242] mb-5">
        <Image
          src={service.imageSrc}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 200px"
          className="object-contain"
        />
      </div>
      <h3
        className="font-display font-bold leading-snug mb-1.5"
        style={{ fontSize: "17px", fontFamily: "'Chiron Goround TC', sans-serif", letterSpacing: "0.10em", color: "#17569E" }}
      >
        {service.headline}
      </h3>
      <p className="font-display" style={{ fontSize: "13px", fontFamily: "'Chiron Goround TC', sans-serif",color: "#888888", letterSpacing: "0.10em" }}>
        {service.sub}
      </p>
    </div>
  );
}

export function ServiceCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const TOTAL = SERVICES.length;

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
    <section className="bg-white py-14 md:py-20">
      <div className="w-[85%] mx-auto">

        {/* Heading */}
        <h2
          className="font-display text-center font-bold mb-12 md:mb-16"
          style={{ fontSize: "45px", fontFamily: "'Chiron Goround TC', sans-serif", fontWeight: 800, color: "#17569E" }}
        >
          Our Services
        </h2>

        {/* Desktop: 5-col grid with side arrows */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            type="button"
            onClick={prev}
            disabled={activeIndex === 0}
            aria-label="上一個"
            className={cn(
              "flex-shrink-0 text-gray-300 transition-colors duration-150",
              activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "text-gray-400 hover:text-[#17284b]"
            )}
          >
            <ChevronLeft size={28} />
          </button>

          <div className="flex-1 grid grid-cols-5 gap-2">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} service={s} />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            disabled={activeIndex === TOTAL - 1}
            aria-label="下一個"
            className={cn(
              "flex-shrink-0 transition-colors duration-150",
              activeIndex === TOTAL - 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:text-[#17284b]"
            )}
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Mobile/tablet: scroll-snap carousel */}
        <div className="lg:hidden">
          <style>{`.service-track::-webkit-scrollbar{display:none}`}</style>
          <div
            ref={trackRef}
            className="service-track flex gap-4 overflow-x-auto pb-1"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(50%-12px)]"
                style={{ scrollSnapAlign: "start" }}
              >
                <ServiceCard service={s} />
              </div>
            ))}
          </div>

          {/* Dots + arrows */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              type="button" onClick={prev} disabled={activeIndex === 0} aria-label="上一個"
              className={cn("w-8 h-8 flex items-center justify-center rounded-full border transition-colors",
                activeIndex === 0 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-400 text-gray-400 hover:border-[#17284b] hover:text-[#17284b]"
              )}
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {SERVICES.map((_, i) => (
                <button
                  key={i} type="button" onClick={() => scrollToIndex(i)} aria-label={`服務 ${i + 1}`}
                  className={cn("rounded-full transition-all duration-200",
                    i === activeIndex ? "w-5 h-2 bg-[#17284b]" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  )}
                />
              ))}
            </div>

            <button
              type="button" onClick={next} disabled={activeIndex === TOTAL - 1} aria-label="下一個"
              className={cn("w-8 h-8 flex items-center justify-center rounded-full border transition-colors",
                activeIndex === TOTAL - 1 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-400 text-gray-400 hover:border-[#17284b] hover:text-[#17284b]"
              )}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Desktop dots */}
        <div className="hidden lg:flex justify-center gap-2 mt-10">
          {SERVICES.map((_, i) => (
            <button
              key={i} type="button" onClick={() => scrollToIndex(i)} aria-label={`服務 ${i + 1}`}
              className={cn("rounded-full transition-all duration-200",
                i === activeIndex ? "w-5 h-2 bg-[#17284b]" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
