"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const BLUE = "#17569E";
const NAVY = "#17284b";

const SLIDES = [
  { img: "/embrance/PC1-3.webp",  imgMobile: "/embrance/Mobile1-4.webp" },
  { img: "/embrance/PC2-3.webp",  imgMobile: "/embrance/Mobile2-5.webp" },
  { img: "/embrance/PC3-5.webp",  imgMobile: "/embrance/Mobile3-5.webp" },
];

export function EmbraceLifestyleSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  return (
    <section className="bg-white py-10 md:py-14 overflow-hidden">

      {/* Header */}
      <div className="max-w-[1280px] w-[90%] mx-auto text-center mb-6 md:mb-8">
        <h2 className="font-bold mb-2" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: NAVY }}>
          背後的溫柔擁抱，坐著閱讀追劇更放鬆
        </h2>
        <p className="hidden md:block" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "#6b7280" }}>
          貼合腰背、填滿空隙，久坐不累更舒適，滑手機、看書都像享受情人的擁抱
        </p>
      </div>

      {/* Desktop slider — 1920×800 */}
      <div className="relative w-full hidden md:block" style={{ aspectRatio: "1920 / 800" }}>
        {SLIDES.map((s, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}>
            <Image src={s.img} alt={`lifestyle ${i + 1}`} fill className="object-cover object-center" sizes="100vw" priority={i === 0} />
          </div>
        ))}
        <button type="button" onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/90 transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.7)", fontSize: 22, color: NAVY }}>‹</button>
        <button type="button" onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/90 transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.7)", fontSize: 22, color: NAVY }}>›</button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} type="button" onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{ width: i === current ? 20 : 8, height: 8, backgroundColor: i === current ? BLUE : "rgba(255,255,255,0.7)" }} />
          ))}
        </div>
      </div>

      {/* Mobile slider — 400×458 */}
      <div className="md:hidden w-[85%] mx-auto">
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "400 / 458" }}>
          {SLIDES.map((s, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}>
              <Image src={s.imgMobile} alt={`lifestyle mobile ${i + 1}`} fill className="object-cover object-center" sizes="85vw" priority={i === 0} />
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
