"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const BLUE = "#17569E";
const NAVY = "#17284b";

const SLIDES = [
  {
    img: "/butterfly/PC3-3.webp",
    imgMobile: "/butterfly/Mobile3-3.webp",
    titleLine1: "蝶型設計，減少肩頸壓力",
    titleLine2: "中央凹槽穩定頭部，兩側隆起支撐肩頸，減少打鼾與肩頸痠痛",
  },
  {
    img: "/butterfly/butterfly-pillow-benefit-PC_2.webp",
    imgMobile: "/butterfly/butterfly-pillow-benefit-Mobile2.webp",
    titleLine1: "竹纖維枕套，透氣舒適",
    titleLine2: "柔軟竹纖維材質，觸感細緻清爽，可拆洗輕鬆保持乾淨",
  },
  {
    img: "/butterfly/PC4-1.webp",
    imgMobile: "/butterfly/Mobile4-1.webp",
    titleLine1: "仰睡、側睡都合適",
    titleLine2: "中間凹陷支撐仰睡，兩側抬高穩定側睡，高度剛剛好",
  },
  {
    img: "/butterfly/PC5-1.webp",
    imgMobile: "/butterfly/Mobile5-1.webp",
    titleLine1: "入門工學枕首選",
    titleLine2: "蝶形輪廓自然貼合，適合第一次嘗試工學枕的你",
  },
];

export function ButterflyLifestyleSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);
  const slide = SLIDES[current];

  return (
    <section className="bg-white py-10 md:py-14 overflow-hidden">

      {/* Header */}
      <div className="max-w-[1280px] w-[90%] mx-auto text-center mb-6 md:mb-8">
        <h2 className="font-bold mb-2" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: NAVY }}>
          放鬆肌肉，減少落枕與翻身，睡得更深更穩
        </h2>
        <p className="hidden md:block" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "#6b7280" }}>
          穩定支撐頭頸，放鬆肌肉，減少翻身，降低落枕風險，讓你進入更深層的熟睡狀態
        </p>
      </div>

      {/* Desktop slider */}
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

      {/* Mobile slider — 800×916 */}
      <div className="md:hidden w-[85%] mx-auto">
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "800 / 916" }}>
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
