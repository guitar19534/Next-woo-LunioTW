"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    img: "/images/nooz/Header_Helix.webp",
    line1: "NOOZ Helix 乳膠獨立筒",
    line2: "五星飯店躺感就在你家",
    btn: "立即購買 Helix",
    href: "/product/nooz-helix",
    mobileLines: ["躺在Nooz Helix", "乳膠獨立筒床墊", "五星飯店的躺感"],
    mobilePos: "72% center",
    mobileBg: "#e8e8ec",       // Helix — dark/charcoal tint
  },
  {
    img: "/images/nooz/Header_Sunset-Pro.webp",
    line1: "NOOZ Sunset Pro",
    line2: "腰背救星，硬床首選",
    btn: "立即購買 Sunset Pro",
    href: "/product/nooz-sunset",
    mobileLines: ["躺在Nooz Sunset Pro", "乳膠床墊", "護腰伸展放鬆"],
    mobilePos: "76% center",
    mobileBg: "#FEF0E0",       // Sunset Pro — warm orange cream
  },
  {
    img: "/images/nooz/Header_Mooonlight-Plus.webp",
    line1: "NOOZ Moonlight Plus",
    line2: "整夜清爽，涼感好眠",
    btn: "立即購買 Moonlight Plus",
    href: "/product/nooz-moonlight",
    mobileLines: ["躺在Nooz Moonlight Plus", "記憶床墊", "整夜清爽好眠"],
    mobilePos: "74% center",
    mobileBg: "#E8F4FD",       // Moonlight Plus — cool blue
  },
  {
    img: "/images/nooz/Header_TriFold.webp",
    line1: "Nooz 三折疊日式床墊",
    line2: "輕巧好帶，隨時隨地好睡",
    btn: "了解更多",
    href: "#",
    mobileLines: ["Nooz 三折疊", "日式床墊", "輕巧好帶隨時好睡"],
    mobilePos: "78% center",
    mobileBg: "#E8F0F8",       // TriFold — neutral blue-gray
  },
  {
    img: "/images/nooz/Header_Topper.webp",
    line1: "躺在Nooz 翻轉床墊",
    line2: "雙面軟硬自由選擇",
    btn: "了解更多",
    href: "#",
    mobileLines: ["躺在Nooz", "翻轉床墊", "雙面軟硬自由選擇"],
    mobilePos: "76% center",
    mobileBg: "#EAF6EC",       // Topper — fresh green
  },
];

const NAVY = "#17284b";
const BLUE = "#17569E";

export function NoozHeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[current];

  return (
    <>
      {/* ── Desktop: overlay layout ──────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden hidden md:block"
        style={{ aspectRatio: "2310 / 990" }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image src={s.img} alt={s.line1} fill className="object-cover object-center" sizes="100vw" priority={i === 0} />
          </div>
        ))}

        {/* Text + button */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-[85%] mx-auto flex flex-col gap-3" style={{ maxWidth: 1400 }}>
            <p className="font-bold leading-snug"
              style={{ fontSize: "clamp(18px, 2.5vw, 32px)", color: NAVY, textShadow: "0 1px 3px rgba(255,255,255,0.6)" }}>
              {slide.line1}
            </p>
            <p className="font-bold leading-snug"
              style={{ fontSize: "clamp(18px, 2.5vw, 32px)", color: NAVY, textShadow: "0 1px 3px rgba(255,255,255,0.6)" }}>
              {slide.line2}
            </p>
            <Link
              href={slide.href}
              className="self-start mt-2 px-7 py-2.5 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: BLUE, fontSize: "clamp(13px, 1.2vw, 15px)" }}
            >
              {slide.btn}
            </Link>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} type="button" onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{ width: i === current ? 24 : 8, height: 8, backgroundColor: i === current ? NAVY : "rgba(255,255,255,0.7)" }} />
          ))}
        </div>
      </div>

      {/* ── Mobile: image top + text/button bottom ───────────────────── */}
      <div className="md:hidden w-full overflow-hidden rounded-b-3xl shadow-sm">
        {/* Image — 4:3 ratio, right-biased position per slide */}
        <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <Image
                src={s.img}
                alt={s.line1}
                fill
                className="object-cover"
                style={{ objectPosition: s.mobilePos }}
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Text + dots + button */}
        <div
          className="px-6 pt-5 pb-6 flex flex-col items-center gap-1 text-center transition-colors duration-700"
          style={{ backgroundColor: slide.mobileBg }}
        >
          {slide.mobileLines.map((line, i) => (
            <p key={i} className="font-bold leading-snug"
              style={{ fontSize: i === 0 ? "clamp(16px, 5vw, 22px)" : "clamp(15px, 4.5vw, 20px)", color: NAVY }}>
              {line}
            </p>
          ))}

          {/* Dots */}
          <div className="flex gap-2 mt-4 mb-3">
            {SLIDES.map((_, i) => (
              <button key={i} type="button" onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{ width: i === current ? 20 : 8, height: 8, backgroundColor: i === current ? NAVY : "#d1d5db" }} />
            ))}
          </div>

          {/* CTA button */}
          <Link
            href={slide.href}
            className="w-full py-3 rounded-2xl text-white font-semibold text-center hover:opacity-90 transition-opacity"
            style={{ backgroundColor: NAVY, fontSize: 15 }}
          >
            挑選我的NOOZ床墊
          </Link>
        </div>
      </div>
    </>
  );
}
