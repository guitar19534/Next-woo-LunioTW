"use client";

import { useState } from "react";
import Image from "next/image";

const ZONES = [
  { num: "1", title: "頭部支撐區", desc: "支撐頭部，讓頸椎維持在合適高度，維持呼吸道順暢，減少打鼾" },
  { num: "2", title: "側邊支撐區", desc: "側睡穩定不晃動，維持脊椎對齊，減少肩頸壓力" },
  { num: "3", title: "頸部支撐區", desc: "弧形支撐，有效托住頸部，維持正確睡姿，預防落枕，減少翻身，睡得更安穩" },
  { num: "4", title: "手臂支撐區", desc: "手臂能輕鬆自然擺放，減少手臂壓迫或懸空" },
];

export function HyperCoolZoneSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#17284b" }}>
      <div className="max-w-[1280px] w-[90%] mx-auto">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-bold mb-2" style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#fff" }}>
            4大專區精準支撐
          </h2>
          <p style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "rgba(255,255,255,0.6)" }}>
            減少肩頸壓力與翻身滑落，告別落枕酸痛
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Left: pillow image */}
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/hypercool/Group-4211.webp"
              alt="HyperCool 4大支撐區"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: accordion zones */}
          <div>
            {ZONES.map((zone, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex items-center justify-between w-full py-4 text-left"
                >
                  <span className="font-semibold" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: "#fff" }}>
                    {zone.num}　{zone.title}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 20, lineHeight: 1 }}>
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                {open === i && (
                  <p className="pb-4" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
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
