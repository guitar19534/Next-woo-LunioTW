"use client";

import { useState } from "react";
import Image from "next/image";

const NAVY = "#17284b";
const BLUE = "#17569E";

const ICONS = [
  { src: "/snowsilk/Icon-SmartGuard-Protector-02.webp", title: "可機洗",   sub1: "特殊布料纖維，不起毛球", sub2: "" },
  { src: "/snowsilk/Icon-Smart-Snowsilk-02.webp",        title: "雙面涼感", sub1: "柔軟輕盈，享受雲朵般清涼", sub2: "" },
  { src: "/snowsilk/Icon-Smart-Snowsilk-03.webp",        title: "透氣排濕", sub1: "吸濕排汗", sub2: "透氣不悶" },
  { src: "/snowsilk/Icon-Smart-Snowsilk-04.webp",        title: "輕巧好收納", sub1: "攜帶方便", sub2: "四季皆宜" },
];

export function SnowSilkFeatureCarousel() {
  const [start, setStart] = useState(0);

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1100px] w-[90%] mx-auto">

        {/* Desktop — all 4 */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {ICONS.map((item) => (
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
