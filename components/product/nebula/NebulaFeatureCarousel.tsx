"use client";

import { useState } from "react";
import Image from "next/image";

const ICONS = [
  { src: "/nebula/Icon-Nebula-01.webp",  line1: "親膚舒適",      line2: "觸感柔軟舒服",   line3: "不刺激皮膚"         },
  { src: "/nebula/Icon-Mercury-03.webp", line1: "出色的睡眠支撐", line2: "蓬鬆有彈性",    line3: "不易扁塌"           },
  { src: "/nebula/Icon-Mercury-01.webp", line1: "通風",           line2: "透氣乾爽不悶熱", line3: "提高睡眠舒適度"     },
  { src: "/nebula/Icon-Mercury-05.webp", line1: "壓力釋放",       line2: "記憶棉貼合肩頸", line3: "提供個性化支撐，減壓又舒適" },
];

export function NebulaFeatureCarousel() {
  const [start, setStart] = useState(0);

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1100px] w-[90%] mx-auto">

        {/* Desktop: all 4 */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {ICONS.map((item) => (
            <div key={item.line1} className="flex items-start gap-4">
              <Image src={item.src} alt={item.line1} width={72} height={72} className="object-contain flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1" style={{ fontSize: 15, color: "#17284b" }}>{item.line1}</p>
                <p style={{ fontSize: 12.5, color: "#6b7280" }}>{item.line2}</p>
                <p style={{ fontSize: 12.5, color: "#6b7280" }}>{item.line3}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: 1 at a time */}
        <div className="md:hidden">
          <div className="flex items-start gap-4 px-4">
            <Image src={ICONS[start].src} alt={ICONS[start].line1} width={80} height={80} className="object-contain flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1" style={{ fontSize: 16, color: "#17284b" }}>{ICONS[start].line1}</p>
              <p style={{ fontSize: 13.5, color: "#6b7280" }}>{ICONS[start].line2}</p>
              <p style={{ fontSize: 13.5, color: "#6b7280" }}>{ICONS[start].line3}</p>
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
