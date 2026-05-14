"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAVY = "#17284b";
const BLUE = "#17569E";

const SLIDES = [
  {
    img: "/smartguard/PC_1-4.webp",
    title: "牢牢固定所有角落",
    sub1: "360° 彈性包覆　平整服貼",
    sub2: "加寬彈力鬆緊帶 緊密服貼不滑動\n讓床墊時刻保持平整好看",
  },
  {
    img: "/smartguard/PC_2-3.webp",
    title: "",
    sub1: "",
    sub2: "",
  },
  {
    img: "/smartguard/PC_3-4.webp",
    title: "",
    sub1: "",
    sub2: "",
  },
];

export function SmartguardLifestyleSlider() {
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
          100%防水 × 親膚柔軟 × 靜音好眠，最舒服的天絲防水保潔墊
        </h2>
        <p style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "#6b7280" }}>
          天絲搭配超薄防水膜，告別傳統保潔墊的粗糙悶熱。安靜無聲、完整包覆，隔絕髒污同時保留柔軟睡感，讓你夜夜安心好眠
        </p>
      </div>

      {/* Slider — full width, single set of images for all breakpoints */}
      <div className="relative w-full" style={{ aspectRatio: "1920 / 800" }}>
        {SLIDES.map((s, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 1 : 0 }}>
            <Image src={s.img} alt={`Smartguard ${i + 1}`} fill className="object-cover object-center" sizes="100vw" priority={i === 0} />
            {s.title && (
              <div className="absolute right-[6%] bottom-[12%] text-right">
                <p className="font-bold mb-1" style={{ fontSize: "clamp(18px, 2.5vw, 36px)", color: BLUE }}>{s.title}</p>
                <p style={{ fontSize: "clamp(13px, 1.2vw, 18px)", color: NAVY }}>{s.sub1}</p>
                <p className="mt-2 whitespace-pre-line" style={{ fontSize: "clamp(11px, 1vw, 14px)", color: "#555", lineHeight: 1.7 }}>{s.sub2}</p>
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
    </section>
  );
}
