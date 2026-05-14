"use client";

import { useState } from "react";
import Image from "next/image";

const ZONES = [
  {
    key: "A",
    title: "A)　柔軟臉部區",
    desc: "兩側抬高設計，減輕臉部壓力，側睡穩定不懸空",
  },
  {
    key: "B",
    title: "B)　頸部支撐區",
    desc: "中間凹陷，支撐頸部和胸部，仰睡或趴睡都舒適，特別適合有背痛困擾的人",
  },
  {
    key: "C",
    title: "C)　肩部固定區",
    desc: "貼合肩膀形狀，減輕肩頸部位的壓力",
  },
];

export function ButterflyZoneSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#17284b" }}>
      <div className="max-w-[1280px] w-[90%] mx-auto">

        <div className="text-center mb-12">
          <h2 className="font-bold mb-3" style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#fff" }}>
            蝶形人體工學設計，改善頸椎曲線
          </h2>
          <p style={{ fontSize: "clamp(13px, 1.3vw, 15px)", color: "rgba(255,255,255,0.6)" }}>
            中間凹陷，兩側抬高，提供側睡、仰睡所需要的不同高度，讓頸椎保持正確水平
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left: pillow zone image */}
          <div className="relative w-full" style={{ aspectRatio: "1452 / 774" }}>
            <Image src="/butterfly/Pillow-Zone.webp" alt="Butterfly 三區設計" fill
              className="object-contain" sizes="(max-width:768px) 100vw, 50vw" />
          </div>

          {/* Right: A/B/C accordion */}
          <div>
            {ZONES.map((zone, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex items-center justify-between w-full py-4 text-left">
                  <span style={{ fontSize: "clamp(14px, 1.5vw, 17px)", fontWeight: 600, color: open === i ? "#fff" : "rgba(255,255,255,0.5)" }}>
                    {zone.title}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 20, lineHeight: 1 }}>
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                {open === i && (
                  <p className="pb-4" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.85 }}>
                    {zone.desc}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
