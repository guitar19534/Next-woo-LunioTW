"use client";

import { useState } from "react";
import Image from "next/image";

const NAVY = "#17284b";
const BLUE = "#17569E";
const VISIBLE = 4;

const ICONS = [
  { src: "/smartguard/Icon-SmartGuard-Protector-01.webp", title: "100%純天絲",    sub1: "100%天絲萊賽爾", sub2: "親膚涼爽" },
  { src: "/smartguard/Icon-SmartGuard-Protector-03.webp", title: "親膚柔軟",      sub1: "吸濕排汗透氣",   sub2: "敏感肌也適用" },
  { src: "/smartguard/Icon-SmartGuard-Protector-04.webp", title: "360° 彈性包覆", sub1: "安裝簡單，平整服貼", sub2: "素色百搭" },
  { src: "/smartguard/Icon-SmartGuard-Protector-05.webp", title: "100%防水",      sub1: "TPU 超薄防水膜",  sub2: "防水透氣" },
  { src: "/smartguard/Icon-SmartGuard-Protector-06.webp", title: "安靜無聲",      sub1: "翻身無雜音",      sub2: "" },
];

export function SmartguardFeatureCarousel() {
  const [start, setStart] = useState(0);
  const canPrev = start > 0;
  const canNext = start < ICONS.length - VISIBLE;

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1100px] w-[90%] mx-auto">

        {/* Desktop */}
        <div className="hidden md:block relative">
          <button type="button" onClick={() => setStart((s) => Math.max(0, s - 1))} disabled={!canPrev}
            className="absolute -left-7 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-50 disabled:opacity-20 transition-colors"
            style={{ borderColor: "#e5e7eb", fontSize: 18, color: "#9ca3af" }}>‹</button>

          <div className="grid grid-cols-4 gap-8">
            {ICONS.slice(start, start + VISIBLE).map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-full flex items-center justify-center"
                  style={{ width: 64, height: 64, backgroundColor: "#DBEAFE" }}>
                  <Image src={item.src} alt={item.title} width={38} height={38} className="object-contain" />
                </div>
                <div>
                  <p className="font-semibold mb-0.5" style={{ fontSize: 14, color: NAVY }}>{item.title}</p>
                  <p style={{ fontSize: 12, color: "#6b7280" }}>{item.sub1}</p>
                  {item.sub2 && <p style={{ fontSize: 12, color: "#6b7280" }}>{item.sub2}</p>}
                </div>
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
                style={{ width: 8, height: 8, backgroundColor: i >= start && i < start + VISIBLE ? BLUE : "#d1d5db" }} />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="flex items-center gap-4 px-2">
            <div className="flex-shrink-0 rounded-full flex items-center justify-center"
              style={{ width: 72, height: 72, backgroundColor: "#DBEAFE" }}>
              <Image src={ICONS[start].src} alt={ICONS[start].title} width={44} height={44} className="object-contain" />
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ fontSize: 16, color: NAVY }}>{ICONS[start].title}</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{ICONS[start].sub1}</p>
              {ICONS[start].sub2 && <p style={{ fontSize: 13, color: "#6b7280" }}>{ICONS[start].sub2}</p>}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {ICONS.map((_, i) => (
              <button key={i} type="button" onClick={() => setStart(i)} aria-label={`Icon ${i + 1}`}
                className="rounded-full transition-all duration-200"
                style={{ width: i === start ? 20 : 8, height: 8, backgroundColor: i === start ? BLUE : "#d1d5db" }} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
