"use client";

import { useState } from "react";
import Image from "next/image";

const ICONS = [
  { src: "/hypercool/Icon-HyperCool-01.webp",    line1: "人體工學設計",  line2: "放鬆肌肉",        line3: "分散肩頸壓力"     },
  { src: "/hypercool/Icon-HyperCool-02.webp",    line1: "適合所有睡姿",  line2: "蝶型曲線",        line3: "適合各種睡姿高度"  },
  { src: "/hypercool/Icon-Mercury-01.webp",       line1: "智慧記憶棉",    line2: "自動貼合肩頸曲線",  line3: "支撐減壓"         },
  { src: "/hypercool/Icon-HyperCool-04.webp",    line1: "高效散熱透氣",  line2: "3重散熱設計",      line3: "減少濕氣異味"     },
  { src: "/hypercool/Icon-Smart-Snowsilk-01.webp",line1: "一觸即涼",      line2: "涼感布套",        line3: "柔軟親膚耐用"     },
];

const VISIBLE = 4; // icons shown at once on desktop

export function HyperCoolFeatureCarousel() {
  const [start, setStart] = useState(0);

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(ICONS.length - VISIBLE, s + 1));

  const canPrev = start > 0;
  const canNext = start < ICONS.length - VISIBLE;

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1100px] w-[90%] mx-auto">

        {/* Desktop: sliding carousel, 4 visible */}
        <div className="hidden md:block relative">
          {/* Prev arrow */}
          <button
            type="button"
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous"
            className="absolute left-[-28px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border transition-colors hover:bg-gray-50 disabled:opacity-20"
            style={{ borderColor: "#e5e7eb", fontSize: 18, color: "#9ca3af" }}
          >
            ‹
          </button>

          {/* Icons */}
          <div className="grid grid-cols-4 gap-6">
            {ICONS.slice(start, start + VISIBLE).map((item) => (
              <div key={item.line1} className="flex flex-col items-center gap-3 text-center">
                <Image src={item.src} alt={item.line1} width={100} height={100} className="object-contain" />
                <div>
                  <p className="font-semibold" style={{ fontSize: 15, color: "#17284b" }}>{item.line1}</p>
                  <p style={{ fontSize: 12.5, color: "#6b7280", marginTop: 3 }}>{item.line2}</p>
                  <p style={{ fontSize: 12.5, color: "#6b7280" }}>{item.line3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Next arrow */}
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            aria-label="Next"
            className="absolute right-[-28px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border transition-colors hover:bg-gray-50 disabled:opacity-20"
            style={{ borderColor: "#e5e7eb", fontSize: 18, color: "#9ca3af" }}
          >
            ›
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {ICONS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStart(Math.min(i, ICONS.length - VISIBLE))}
                aria-label={`Icon ${i + 1}`}
                className="rounded-full transition-all duration-200"
                style={{
                  width: 8, height: 8,
                  backgroundColor: i >= start && i < start + VISIBLE ? "#17569E" : "#d1d5db",
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile: 1 icon at a time */}
        <div className="md:hidden">
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <Image src={ICONS[start].src} alt={ICONS[start].line1} width={120} height={120} className="object-contain" />
              <div>
                <p className="font-semibold" style={{ fontSize: 16, color: "#17284b" }}>{ICONS[start].line1}</p>
                <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{ICONS[start].line2}</p>
                <p style={{ fontSize: 13, color: "#6b7280" }}>{ICONS[start].line3}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {ICONS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStart(i)}
                aria-label={`Icon ${i + 1}`}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === start ? 20 : 8, height: 8,
                  backgroundColor: i === start ? "#17569E" : "#d1d5db",
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
