"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const FEATURES = [
  {
    icon: "/qtm/Icon-QTM-01.webp",
    title: "親膚涼爽",
    desc: "加厚天絲表布，柔軟舒適，降噪減壓，不開冷氣也涼爽",
  },
  {
    icon: "/qtm/Icon-QTM-02.webp",
    title: "減輕腰酸背痛",
    desc: "人體工學支撐系統 均勻分散壓力，守護脊椎健康",
  },
  {
    icon: "/qtm/Icon-QTM-03.webp",
    title: "吸震增加 41%",
    desc: "五區獨立筒，更穩定貼合身形，吸震力比傳統獨立筒更高",
  },
  {
    icon: "/qtm/Icon-QTM-04.webp",
    title: "30倍透氣",
    desc: "德國科技散熱搭配雙層石墨烯層，透氣度是一般床墊30倍",
  },
  {
    icon: "/qtm/Icon-QTM-06.webp",
    title: "10年保固",
    desc: "採用防鏽高碳錳彈簧，彈性更好，壽命更長",
  },
];

export function FeatureCarousel() {
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    function update() {
      setPerPage(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxStart = FEATURES.length - perPage;
  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(maxStart, s + 1));
  const visible = FEATURES.slice(start, start + perPage);

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1400px] w-[85%] mx-auto relative">

        {/* Left arrow */}
        {start > 0 && (
          <button
            type="button"
            onClick={prev}
            aria-label="上一個"
            className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-colors z-10 hover:bg-gray-100"
            style={{ color: "#9ca3af" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Cards */}
        <div className={`grid gap-6 md:gap-10`}
          style={{ gridTemplateColumns: `repeat(${perPage}, 1fr)` }}>
          {visible.map((f) => (
            <div key={f.title} className="flex items-center gap-5">
              {/* Circle icon */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{ width: 110, height: 110, backgroundColor: "#e8f0fb" }}
              >
                <Image src={f.icon} alt={f.title} width={80} height={80} className="object-contain" />
              </div>
              {/* Text */}
              <div className="min-w-0">
                <p className="font-semibold leading-snug mb-1.5" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "#17284b" }}>
                  {f.title}
                </p>
                <p style={{ fontSize: "clamp(12px, 1.2vw, 13px)", color: "#6b7280", lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        {start < maxStart && (
          <button
            type="button"
            onClick={next}
            aria-label="下一個"
            className="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-colors z-10 hover:bg-gray-100"
            style={{ color: "#9ca3af" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxStart + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStart(i)}
              aria-label={`第 ${i + 1} 頁`}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === start ? "20px" : "8px",
                height: "8px",
                backgroundColor: i === start ? "#17569E" : "#d1d5db",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
