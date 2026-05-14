"use client";

import { useState } from "react";
import Image from "next/image";

const NAVY = "#17284b";
const BLUE = "#17569E";

const ICONS = [
  { src: "/pillowlatex/Icon-Latex-02.webp", label: "柔軟Q彈" },
  { src: "/pillowlatex/Icon-Latex-03.webp", label: "泰國純乳膠" },
  { src: "/pillowlatex/Icon-Latex-01.webp", label: "服貼支撐" },
];

export function PillowLatexFeatureCarousel() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + ICONS.length) % ICONS.length);
  const next = () => setCurrent((c) => (c + 1) % ICONS.length);

  return (
    <section className="bg-white py-10 md:py-14">

      {/* Desktop */}
      <div className="hidden md:block relative max-w-[1100px] w-[90%] mx-auto">
        <button type="button" onClick={prev}
          className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full border bg-white hover:bg-gray-50 transition-colors"
          style={{ borderColor: "#e5e7eb", fontSize: 18, color: "#9ca3af" }}>‹</button>

        <div className="grid grid-cols-3 gap-4">
          {ICONS.map((item) => (
            <div key={item.label}
              className="flex items-center gap-5 rounded-2xl px-6 py-5"
              style={{ backgroundColor: "#f0f4fb" }}>
              <Image src={item.src} alt={item.label} width={80} height={80} className="object-contain flex-shrink-0" />
              <p className="font-semibold" style={{ fontSize: 16, color: NAVY }}>{item.label}</p>
            </div>
          ))}
        </div>

        <button type="button" onClick={next}
          className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full border bg-white hover:bg-gray-50 transition-colors"
          style={{ borderColor: "#e5e7eb", fontSize: 18, color: "#9ca3af" }}>›</button>

        <div className="flex justify-center gap-2 mt-6">
          {ICONS.map((_, i) => (
            <button key={i} type="button" onClick={() => setCurrent(i)} aria-label={`Item ${i + 1}`}
              className="rounded-full transition-all duration-200"
              style={{ width: i === current ? 20 : 8, height: 8, backgroundColor: i === current ? BLUE : "#d1d5db" }} />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative px-12">
        <button type="button" onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-6 z-10 w-8 h-8 flex items-center justify-center rounded-full border bg-white"
          style={{ borderColor: "#e5e7eb", fontSize: 18, color: "#9ca3af" }}>‹</button>

        <div className="flex items-center gap-4 rounded-2xl px-6 py-5" style={{ backgroundColor: "#f0f4fb" }}>
          <Image src={ICONS[current].src} alt={ICONS[current].label} width={80} height={80} className="object-contain flex-shrink-0" />
          <p className="font-semibold" style={{ fontSize: 16, color: NAVY }}>{ICONS[current].label}</p>
        </div>

        <button type="button" onClick={next}
          className="absolute right-2 top-1/2 -translate-y-6 z-10 w-8 h-8 flex items-center justify-center rounded-full border bg-white"
          style={{ borderColor: "#e5e7eb", fontSize: 18, color: "#9ca3af" }}>›</button>

        <div className="flex justify-center gap-2 mt-5">
          {ICONS.map((_, i) => (
            <button key={i} type="button" onClick={() => setCurrent(i)} aria-label={`Item ${i + 1}`}
              className="rounded-full transition-all duration-200"
              style={{ width: i === current ? 20 : 8, height: 8, backgroundColor: i === current ? BLUE : "#d1d5db" }} />
          ))}
        </div>
      </div>

    </section>
  );
}
