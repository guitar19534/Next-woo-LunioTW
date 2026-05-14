"use client";

import { useState } from "react";
import Image from "next/image";

const ICONS = [
  { src: "/embrance/Icon-Embrace-01.png", line1: "人體工學支撐", line2: "靠背厚實",    line3: "放鬆減壓"    },
  { src: "/embrance/Icon-Embrace-02.png", line1: "手臂支撐",     line2: "獨特扶手設計", line3: "手臂自在可靠" },
  { src: "/embrance/Icon-Embrace-03.png", line1: "舒適親膚",     line2: "細緻天鵝絨套", line3: "柔軟舒適"    },
  { src: "/embrance/Icon-Embrace-04.png", line1: "環保好清潔",   line2: "國際無毒認證", line3: "布套可拆洗"  },
];

export function EmbraceFeatureCarousel() {
  const [start, setStart] = useState(0);

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1100px] w-[90%] mx-auto">

        {/* Desktop */}
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

        {/* Mobile */}
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
