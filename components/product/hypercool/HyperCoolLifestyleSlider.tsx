"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SLIDES = [
  { img: "/hypercool/PC_1.webp",  imgMobile: "/hypercool/Mobile_1.webp" },
  { img: "/hypercool/PC_2.webp",  imgMobile: "/hypercool/Mobile_2.webp" },
  { img: "/hypercool/PC_3.webp",  imgMobile: "/hypercool/Mobile_3.webp" },
];

const BLUE = "#17569E";

export function HyperCoolLifestyleSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <section className="bg-white py-10 md:py-16 overflow-hidden">

      {/* Header */}
      <div className="max-w-[1280px] w-[90%] mx-auto text-center mb-6 md:mb-8">
        <h2 className="font-bold mb-2" style={{ fontSize: "clamp(18px, 2.5vw, 32px)", color: "#17284b" }}>
          放鬆肌肉，減少落枕與翻身，睡得更深更穩
        </h2>
        <p className="hidden md:block" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "#6b7280" }}>
          穩定支撐頭頸，放鬆肌肉，減少翻身，降低落枕風險，讓你進入更深層的熟睡狀態
        </p>
      </div>

      {/* Desktop slider — full width, PC 1898×791 */}
      <div className="relative w-full hidden md:block" style={{ aspectRatio: "1898 / 791" }}>
        {SLIDES.map((s, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}>
            <Image src={s.img} alt={`lifestyle ${i + 1}`} fill
              className="object-cover object-center" sizes="100vw" priority={i === 0} />
          </div>
        ))}
        {/* Arrows */}
        <button type="button" onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-white/90"
          style={{ backgroundColor: "rgba(255,255,255,0.7)", fontSize: 22, color: "#17284b" }}>‹</button>
        <button type="button" onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-white/90"
          style={{ backgroundColor: "rgba(255,255,255,0.7)", fontSize: 22, color: "#17284b" }}>›</button>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} type="button" onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{ width: i === current ? 20 : 8, height: 8, backgroundColor: i === current ? BLUE : "rgba(255,255,255,0.7)" }} />
          ))}
        </div>
      </div>

      {/* Mobile slider — max 85% width, centered, portrait 2400×2850 */}
      <div className="md:hidden w-[85%] mx-auto">
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "2400 / 2850" }}>
          {SLIDES.map((s, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}>
              <Image src={s.imgMobile} alt={`lifestyle mobile ${i + 1}`} fill
                className="object-cover object-center" sizes="85vw" priority={i === 0} />
            </div>
          ))}
        </div>
        {/* Dots below image */}
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
