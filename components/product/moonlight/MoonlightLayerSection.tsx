"use client";

import { useState } from "react";
import Image from "next/image";

const ACCENT = "#1B6DC1";

const LAYERS = [
  {
    title: "第1層  SmartRest 透氣網布",
    desc: "Nooz獨家專利，表面柔軟光滑，加強透氣，整夜保持涼爽舒適。",
  },
  {
    title: "第2層  酷涼記憶層",
    desc: "將Cool Gel冷凝粒子添加至床墊中增加涼感，讓您享受整夜涼爽舒適的睡眠感受。",
  },
  {
    title: "第3層  EvoCool 涼爽支撐層",
    desc: "結合降溫凝膠的高支撐泡棉，可均勻分散體重，又能散熱控溫。",
  },
  {
    title: "第4層  釋壓活性碳平衡層",
    desc: "注入活性碳的可幫助消除異味、提升透氣度，抑制細菌和微生物生長，並提升床墊穩固性及耐用度。",
  },
  {
    title: "第5層  Anti-Slip 防滑墊",
    desc: "避免污垢灰塵積聚在床墊內層，且不易使床墊位移。",
  },
];

const PTR_POS = [
  { top: "22%", left: "72%" },
  { top: "35%", left: "72%" },
  { top: "48%", left: "72%" },
  { top: "62%", left: "72%" },
  { top: "76%", left: "72%" },
];

export function MoonlightLayerSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1280px] w-[90%] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left: image + pointers */}
          <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
            <Image
              src="/moonlight/Product-image-Body-1-1.webp"
              alt="NOOZ Moonlight Plus 5層機能結構"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {PTR_POS.map((pos, i) => (
              <div key={i} className="absolute" style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -50%)" }}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`第${i + 1}層`}
                  className="flex items-center justify-center rounded-full font-bold transition-all duration-200 shadow-md"
                  style={{
                    width: 30,
                    height: 30,
                    fontSize: 13,
                    backgroundColor: active === i ? ACCENT : "rgba(255,255,255,0.92)",
                    color: active === i ? "#fff" : ACCENT,
                    border: `2px solid ${ACCENT}`,
                    transform: active === i ? "scale(1.18)" : "scale(1)",
                  }}
                >
                  {i + 1}
                </button>
              </div>
            ))}
          </div>

          {/* Right: layer list */}
          <div>
            <h2 className="font-bold mb-7" style={{ fontSize: "clamp(18px, 2vw, 26px)", color: ACCENT }}>
              NOOZ Moonlight Plus 5層構造設計
            </h2>
            <div className="space-y-5">
              {LAYERS.map((layer, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className="w-full text-left transition-all duration-200"
                  style={{ opacity: active === i ? 1 : 0.45 }}
                >
                  <p
                    className="font-bold leading-snug mb-1"
                    style={{ fontSize: "clamp(13px, 1.4vw, 15px)", color: active === i ? ACCENT : "#17284b" }}
                  >
                    {layer.title}
                  </p>
                  {active === i && (
                    <p style={{ fontSize: "clamp(12px, 1.2vw, 13.5px)", color: "#555", lineHeight: 1.75 }}>
                      {layer.desc}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
