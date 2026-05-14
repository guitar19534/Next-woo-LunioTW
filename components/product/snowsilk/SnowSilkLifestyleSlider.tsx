"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAVY = "#17284b";
const BLUE = "#17569E";

const SLIDES = [
  { pc: "/snowsilk/PC1-1.webp",       mobile: "/snowsilk/Mobile1-1.webp", title: "", sub1: "", sub2: "" },
  { pc: "/snowsilk/PC2-1.webp",       mobile: "/snowsilk/Mobile2-1.webp", title: "", sub1: "", sub2: "" },
  { pc: "/snowsilk/Benefit3-1-2.webp", mobile: "/snowsilk/Benefit3-5.webp",
    title: "輕鬆洗滌", sub1: "不易起毛球　不易沾灰塵", sub2: "多次清洗後依然平整美觀" },
];

export function SnowSilkLifestyleSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1280px] w-[90%] mx-auto text-center mb-8">
        <h2 className="font-bold mb-2" style={{ fontSize: "clamp(18px, 2vw, 28px)", color: NAVY }}>
          雙面涼感，絲滑柔軟，輕盈透氣的涼感被
        </h2>
        <p style={{ fontSize: "clamp(12px, 1.1vw, 14px)", color: "#6b7280" }}>
          雙面涼感布料，一觸即涼，親膚柔軟，帶來沁涼放鬆的舒適體驗。輕盈透氣不悶熱，陪你整夜舒眠放鬆
        </p>
      </div>

      {/* Desktop */}
      <div className="relative w-full hidden md:block" style={{ aspectRatio: "1920 / 800" }}>
        {SLIDES.map((s, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 1 : 0 }}>
            <Image src={s.pc} alt={`SnowSilk ${i + 1}`} fill className="object-cover object-center" sizes="100vw" priority={i === 0} />
            {s.title && (
              <div className="absolute right-[6%] bottom-[12%] text-right">
                <p className="font-bold mb-1" style={{ fontSize: "clamp(20px, 2.2vw, 32px)", color: BLUE }}>{s.title}</p>
                <p style={{ fontSize: "clamp(13px, 1.1vw, 16px)", color: NAVY }}>{s.sub1}</p>
                <p style={{ fontSize: "clamp(12px, 1vw, 14px)", color: "#555" }}>{s.sub2}</p>
              </div>
            )}
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
              <Image src={s.mobile} alt={`SnowSilk mobile ${i + 1}`} fill className="object-cover object-center" sizes="100vw" priority={i === 0} />
              {s.title && (
                <div className="absolute right-5 bottom-10 text-right">
                  <p className="font-bold mb-1" style={{ fontSize: 16, color: BLUE }}>{s.title}</p>
                  <p style={{ fontSize: 12, color: NAVY }}>{s.sub1}</p>
                </div>
              )}
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
