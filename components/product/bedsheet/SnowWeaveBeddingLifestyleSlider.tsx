"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAVY = "#17284b";
const BLUE = "#17569E";

const SLIDES = [
  {
    pc: "/snowweave-bedding/PC_1-5.webp",
    mobile: "/snowweave-bedding/Mobile_1-5.webp",
    title: "100%天絲™",
    sub1: "使用100%奧地利天絲萊賽爾",
    sub2: "如絲般柔順涼爽 親膚包覆每一寸肌膚",
  },
  {
    pc: "/snowweave-bedding/PC_2-4.webp",
    mobile: "/snowweave-bedding/Mobile_2-5.webp",
    title: "",
    sub1: "",
    sub2: "",
  },
  {
    pc: "/snowweave-bedding/PC3-1.webp",
    mobile: "/snowweave-bedding/Mobile_3-4.webp",
    title: "",
    sub1: "",
    sub2: "",
  },
];

export function SnowWeaveBeddingLifestyleSlider() {
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
          細緻緊密，兼顧舒適與耐用的天絲床包
        </h2>
        <p style={{ fontSize: "clamp(12px, 1.1vw, 14px)", color: "#6b7280" }}>
          100%純天絲，觸感比棉柔滑2倍，涼爽輕盈，親膚舒適。採用高規格60支紗×300織，搭配115gsm厚度，既奢華又耐用
        </p>
      </div>

      {/* Desktop */}
      <div className="relative w-full hidden md:block" style={{ aspectRatio: "1920 / 800" }}>
        {SLIDES.map((s, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 1 : 0 }}>
            <Image src={s.pc} alt={`Snow Weave ${i + 1}`} fill className="object-cover object-center" sizes="100vw" priority={i === 0} />
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
              <Image src={s.mobile} alt={`Snow Weave mobile ${i + 1}`} fill className="object-cover object-center" sizes="100vw" priority={i === 0} />
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
