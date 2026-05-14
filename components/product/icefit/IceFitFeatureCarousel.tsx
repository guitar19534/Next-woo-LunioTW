"use client";

import { useState } from "react";
import Image from "next/image";

const ICONS = [
  { src: "/smartcurve/Icon-Smart-Curve-01.webp", line1: "雙面躺感",    line2: "柔韌或蓬鬆",       line3: "軟硬任選"             },
  { src: "/smartcurve/Icon-Smart-Curve-03.webp", line1: "完美貼合頸部", line2: "凹型曲線",         line3: "完美貼合肩頸"          },
  { src: "/smartcurve/Icon-Smart-Curve-04.webp", line1: "清涼舒適",    line2: "一觸即涼",         line3: "降溫1～3°C"            },
  { src: "/smartcurve/Icon-Smart-Curve-05.webp", line1: "通風散熱",    line2: "透氣清爽",         line3: "適合怕熱或易出汗的人"    },
];

export function IceFitFeatureCarousel() {
  const [start, setStart] = useState(0);
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1100px] w-[90%] mx-auto">
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
