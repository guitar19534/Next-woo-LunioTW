"use client";

import { useState } from "react";
import Image from "next/image";

const ICONS = [
  { src: "/butterfly/Icon-Butterfly-01.webp", line1: "人體工學設計",  line2: "" },
  { src: "/butterfly/Icon-Butterfly-02.webp", line1: "支撐頸椎",      line2: "" },
  { src: "/butterfly/Icon-Butterfly-03.webp", line1: "貼合頸部曲線",  line2: "" },
  { src: "/butterfly/Icon-Butterfly-04.webp", line1: "分散身體壓力",  line2: "" },
  { src: "/butterfly/Icon-Butterfly-06.webp", line1: "親膚柔軟",      line2: "" },
];

const VISIBLE = 4;

export function ButterflyFeatureCarousel() {
  const [start, setStart] = useState(0);
  const canPrev = start > 0;
  const canNext = start < ICONS.length - VISIBLE;

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1100px] w-[90%] mx-auto">

        {/* Desktop: sliding carousel */}
        <div className="hidden md:block relative">
          <button type="button" onClick={() => setStart((s) => Math.max(0, s - 1))} disabled={!canPrev}
            className="absolute -left-7 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-50 disabled:opacity-20 transition-colors"
            style={{ borderColor: "#e5e7eb", fontSize: 18, color: "#9ca3af" }}>‹</button>

          <div className="grid grid-cols-4 gap-8">
            {ICONS.slice(start, start + VISIBLE).map((item) => (
              <div key={item.line1} className="flex flex-col items-center gap-3 text-center">
                <Image src={item.src} alt={item.line1} width={90} height={90} className="object-contain" />
                <p className="font-medium" style={{ fontSize: 14, color: "#17284b" }}>{item.line1}</p>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => setStart((s) => Math.min(ICONS.length - VISIBLE, s + 1))} disabled={!canNext}
            className="absolute -right-7 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-50 disabled:opacity-20 transition-colors"
            style={{ borderColor: "#e5e7eb", fontSize: 18, color: "#9ca3af" }}>›</button>

          <div className="flex justify-center gap-2 mt-7">
            {ICONS.map((_, i) => (
              <button key={i} type="button" onClick={() => setStart(Math.min(i, ICONS.length - VISIBLE))} aria-label={`Icon ${i + 1}`}
                className="rounded-full transition-all duration-200"
                style={{ width: 8, height: 8, backgroundColor: i >= start && i < start + VISIBLE ? "#17569E" : "#d1d5db" }} />
            ))}
          </div>
        </div>

        {/* Mobile: 1 at a time */}
        <div className="md:hidden">
          <div className="flex flex-col items-center gap-3 text-center">
            <Image src={ICONS[start].src} alt={ICONS[start].line1} width={110} height={110} className="object-contain" />
            <p className="font-medium" style={{ fontSize: 15, color: "#17284b" }}>{ICONS[start].line1}</p>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            {ICONS.map((_, i) => (
              <button key={i} type="button" onClick={() => setStart(i)} aria-label={`Icon ${i + 1}`}
                className="rounded-full transition-all duration-200"
                style={{ width: i === start ? 20 : 8, height: 8, backgroundColor: i === start ? "#17569E" : "#d1d5db" }} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
