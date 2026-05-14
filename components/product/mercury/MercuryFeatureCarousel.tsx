"use client";

import { useState } from "react";
import Image from "next/image";

const ICONS = [
  { src: "/hypercool/Icon-Mercury-01.webp", line1: "溫度調節",    line2: "恆溫石墨烯 X 冷凝膠", line3: "冬暖夏涼"   },
  { src: "/mercury/Icon-Mercury-03.webp",   line1: "通風",        line2: "通風透氣",             line3: "睡眠清爽自在" },
  { src: "/mercury/Icon-Mercury-04.webp",   line1: "支撐減壓",    line2: "貼合頭部",             line3: "釋放肩頸壓力" },
  { src: "/mercury/Icon-Mercury-05.webp",   line1: "三層高度可調", line2: "三層枕芯",             line3: "自由調整高度" },
];

const VISIBLE = 4;

export function MercuryFeatureCarousel() {
  const [start, setStart] = useState(0);

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1100px] w-[90%] mx-auto">

        {/* Desktop: all 4 in a row */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {ICONS.map((item) => (
            <div key={item.line1} className="flex flex-col items-center gap-3 text-center">
              <Image src={item.src} alt={item.line1} width={100} height={100} className="object-contain" />
              <div>
                <p className="font-semibold" style={{ fontSize: 15, color: "#17284b" }}>{item.line1}</p>
                <p style={{ fontSize: 12.5, color: "#6b7280", marginTop: 3 }}>{item.line2}</p>
                <p style={{ fontSize: 12.5, color: "#6b7280" }}>{item.line3}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: 1 at a time */}
        <div className="md:hidden">
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <Image src={ICONS[start].src} alt={ICONS[start].line1} width={120} height={120} className="object-contain" />
              <div>
                <p className="font-semibold" style={{ fontSize: 16, color: "#17284b" }}>{ICONS[start].line1}</p>
                <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{ICONS[start].line2}</p>
                <p style={{ fontSize: 13, color: "#6b7280" }}>{ICONS[start].line3}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {ICONS.map((_, i) => (
              <button key={i} type="button" onClick={() => setStart(i)} aria-label={`Icon ${i + 1}`}
                className="rounded-full transition-all duration-200"
                style={{ width: i === start ? 20 : 8, height: 8, backgroundColor: i === start ? "#17569E" : "#d1d5db" }} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
