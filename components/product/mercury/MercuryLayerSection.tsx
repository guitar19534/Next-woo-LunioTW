"use client";

import { useState } from "react";
import Image from "next/image";

const LAYERS = [
  {
    num: "1",
    title: "Diamond Fusion® 石墨烯記憶棉",
    desc: "這是一種具有世界上最佳導熱能力的粒子，將石墨烯元素注入記憶棉，以維持適當的睡眠溫度。",
  },
  {
    num: "2",
    title: "AdaptCore 減壓記憶棉",
    desc: "分散來自頭部的壓力，提供舒適和平衡支撐的輔助材質，能夠更好地優化頭頸部以便獲得更舒適的睡眠。具有良好的耐用性，能夠長時間保持支撐。",
  },
  {
    num: "3",
    title: "AirGel 冷凝記憶眠",
    desc: "加入冷凝凝膠的記憶棉，它能夠隨著重量的壓迫而持續釋放涼感效果，讓您在睡眠時感到放鬆、整晚睡眠舒適、不會感到熱。",
  },
];

export function MercuryLayerSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#17284b" }}>
      <div className="max-w-[1280px] w-[90%] mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-bold mb-3" style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#fff" }}>
            三層設計，個性化的舒適好眠
          </h2>
          <p style={{ fontSize: "clamp(13px, 1.3vw, 15px)", color: "rgba(255,255,255,0.6)" }}>
            三層結構設計，輕鬆調整喜歡的高度與躺感，不論體型，大人或兒童都能睡得舒服
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left: layer accordion */}
          <div>
            {LAYERS.map((layer, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex items-center justify-between w-full py-4 text-left">
                  <span style={{ fontSize: "clamp(14px, 1.5vw, 17px)", fontWeight: 600, color: open === i ? "#fff" : "rgba(255,255,255,0.5)" }}>
                    {layer.num}　{layer.title}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 20, lineHeight: 1 }}>
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                {open === i && (
                  <p className="pb-4" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.85 }}>
                    {layer.desc}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right: pillow cross-section */}
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/mercury/Group-436.webp"
              alt="Mercury 三層枕芯結構"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
