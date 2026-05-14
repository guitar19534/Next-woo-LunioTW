"use client";

import { useState } from "react";
import Image from "next/image";

// ── Layer data ─────────────────────────────────────────────────────────────
const LAYERS = [
  {
    title: "第1層 PlushCloud Euro Top 歐洲頂級毛覓表層",
    desc: "蓬鬆柔軟，搭配乳膠支撐身體曲線，躺下就像置身五星級飯店軟床，釋放全身壓力",
    // TODO: 填入 pointer 標籤文字
    pointerLabel: "",
  },
  {
    title: "第2層 Lumbar Support Plus+ 強化支撐冷凝記憶層",
    desc: "貼合腰椎曲線，減輕下背壓力，翻身更自在",
    pointerLabel: "",
  },
  {
    title: "第3層 Natural Latex 100%天然乳膠",
    desc: "天然透氣、符合人體工學，自然回彈貼合身形，防菌防塵蟎，睡得安心健康",
    pointerLabel: "",
  },
  {
    title: "第4層 ComforTech Adaptive 科技彈性釋壓層",
    desc: "高彈性減壓均勻分散重量，釋放全身壓力",
    pointerLabel: "",
  },
  {
    title: "第5層 Precision Pocket Coils 精密吸震獨立筒",
    desc: "高碳錳鋼獨立筒彈簧，耐用抗鏽，不易塌陷，翻身時不干擾另一半",
    pointerLabel: "",
  },
  {
    title: "第6層 Hyper-Elastic Pad 彈力吸震層",
    desc: "增加耐用性與承重力，延長床墊壽命，保持舒適支撐感",
    pointerLabel: "",
  },
  {
    title: "第7層 防滑床罩",
    desc: "防止灰塵污垢累積，避免床墊位移",
    pointerLabel: "",
  },
];

// ── Pointer positions on the image (top %, left %) ────────────────────────
// TODO: ปรับ top/left ให้ตรงกับรูปจริง
const PTR_POS = [
  { top: "18%", left: "68%" },
  { top: "27%", left: "55%" },
  { top: "34%", left: "63%" },
  { top: "40%", left: "68%" },
  { top: "50%", left: "68%" },
  { top: "60%", left: "68%" },
  { top: "70%", left: "68%" },
];

export function HelixLayerSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1280px] w-[90%] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ── Left: image + pointers ── */}
          <div className="relative w-full" style={{ aspectRatio: "870 / 700" }}>
            <Image
              src="/helix/Product-image-Body-1.webp"
              alt="NOOZ Helix 7層機能結構"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Pointer buttons */}
            {PTR_POS.map((pos, i) => (
              <div key={i} className="absolute" style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -50%)" }}>
                {/* Pointer label (tooltip) */}
                {LAYERS[i].pointerLabel && active === i && (
                  <div
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-white text-xs font-medium shadow-lg"
                    style={{ backgroundColor: "rgba(23,40,75,0.85)", fontSize: 12 }}
                  >
                    {LAYERS[i].pointerLabel}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                      style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid rgba(23,40,75,0.85)" }} />
                  </div>
                )}

                {/* Circle button */}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`第${i + 1}層`}
                  className="flex items-center justify-center rounded-full font-bold transition-all duration-200 shadow-md"
                  style={{
                    width: 28,
                    height: 28,
                    fontSize: 12,
                    backgroundColor: active === i ? "#17569E" : "rgba(255,255,255,0.9)",
                    color: active === i ? "#fff" : "#17569E",
                    border: `2px solid ${active === i ? "#17569E" : "#17569E"}`,
                    transform: active === i ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {i + 1}
                </button>
              </div>
            ))}
          </div>

          {/* ── Right: layer list ── */}
          <div>
            <h2 className="font-semibold mb-6" style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "#17284b" }}>
              NOOZ Helix 7層機能結構
            </h2>

            <div className="space-y-5">
              {LAYERS.map((layer, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className="w-full text-left transition-all duration-200"
                  style={{ opacity: active === i ? 1 : 0.5 }}
                >
                  <p
                    className="font-bold leading-snug mb-1"
                    style={{
                      fontSize: "clamp(13px, 1.4vw, 15px)",
                      color: active === i ? "#17569E" : "#17284b",
                    }}
                  >
                    {layer.title}
                  </p>
                  {active === i && (
                    <p style={{ fontSize: "clamp(12px, 1.2vw, 13.5px)", color: "#555", lineHeight: 1.7 }}>
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
