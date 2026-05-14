"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const BLUE = "#17569E";
const NAVY = "#17284b";

const SLIDES = [
  { pc: "/pillowlatex/Benefit_PC.webp",           mobile: "/pillowlatex/Benefit_Mobile.webp" },
  { pc: "/pillowlatex/Support-Zone-01_PC-1.webp", mobile: "/pillowlatex/Support-Zone-01_Mobile.webp" },
  { pc: "/pillowlatex/Support-Zone-02_PC-1.webp", mobile: "/pillowlatex/Support-Zone-02_Mobile.webp" },
];

export function PillowLatexSupportZoneSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <section className="bg-white overflow-hidden">
      {/* Desktop */}
      <div className="relative w-full hidden md:block" style={{ aspectRatio: "1920 / 800" }}>
        {SLIDES.map((s, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 1 : 0 }}>
            <Image src={s.pc} alt={`支撐區域 ${i + 1}`} fill className="object-cover object-center" sizes="100vw" priority={i === 0} />
          </div>
        ))}
        <button type="button" onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/90 transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.7)", fontSize: 22, color: NAVY }}>‹</button>
        <button type="button" onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/90 transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.7)", fontSize: 22, color: NAVY }}>›</button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} type="button" onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{ width: i === current ? 20 : 8, height: 8, backgroundColor: i === current ? BLUE : "rgba(255,255,255,0.7)" }} />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "800 / 917" }}>
          {SLIDES.map((s, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 1 : 0 }}>
              <Image src={s.mobile} alt={`支撐區域 ${i + 1}`} fill className="object-cover object-center" sizes="100vw" priority={i === 0} />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {SLIDES.map((_, i) => (
            <button key={i} type="button" onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{ width: i === current ? 20 : 8, height: 8, backgroundColor: i === current ? BLUE : "#d1d5db" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
