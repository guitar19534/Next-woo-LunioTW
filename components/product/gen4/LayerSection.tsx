"use client";

import { useState } from "react";
import Image from "next/image";

// ── แก้ข้อมูลแต่ละชั้นที่นี่ ──────────────────────────────────────────────
const LAYERS = [
  {
    name: "SmartTemp Cooling Fabric",
    sub: "第一層",
    desc: "靈感來自太空科技，Lunio 智慧溫控布料，貼心調節體溫，為你守護每一夜的舒適與寧靜",
  },
  {
    name: "Zero-Pressure Cool Memory Foam",
    sub: "第二層",
    desc: "太空人專用的涼感減壓記憶棉，貼合身形釋放壓力，帶來無重力般的睡眠體驗",
  },
  {
    name: "Natural Latex",
    sub: "第三層",
    desc: "100% 天然乳膠，彈性回復快速，9區人體工學支撐，讓脊椎在深夜真正放鬆",
  },
  {
    name: "Hexagrid Pro",
    sub: "第四層",
    desc: "六角蜂巢結構，精準承托每個支撐點，吸震降干擾，翻身不影響枕邊人",
  },
  {
    name: "Diamond Fusion",
    sub: "第五層",
    desc: "鑽石融合高密度支撐層，強化邊緣支撐，坐邊起身更穩固，不易塌陷",
  },
  {
    name: "Foundation Base",
    sub: "第六層",
    desc: "堅固底座結構，整合全層支撐系統，確保床墊長期使用穩定不變形",
  },
];

// 數字按鈕在右側圖上的位置 (top %, right %) — ปรับให้ตรงกับชั้นในรูป
const BTN_POS = [
  { top: "22%", right: "26%" },
  { top: "33%", right: "26%" },
  { top: "40%", right: "26%" },
  { top: "49%", right: "26%" },
  { top: "58%", right: "26%" },
  { top: "69%", right: "26%" },
];

export function LayerSection() {
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">

      {/* Background */}
      <Image
        src="/gen4/layer/Layer-BG.webp"
        alt=""
        fill
        className="object-cover brightness-110 contrast-105"
        aria-hidden
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="mb-3" style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#fff", fontWeight: 500 }}>
            每一層設計都是為你打造
          </h2>
          <p style={{ fontSize: "clamp(13px, 1.5vw, 16px)", color: "#fff", fontWeight: 400 }}>
            從材質到結構，精準思考只為貼近你的睡眠需求，你感受到的舒適都來自精密設計的支持
          </p>
        </div>

        {/* Content: Left card + Right image */}
        <div className="grid md:grid-cols-[40fr_60fr] gap-6 md:gap-10 items-center">

          {/* Left — crossfade between all L images */}
          <div className="flex justify-center">
          <div className="w-full max-w-[420px] relative overflow-hidden rounded-3xl shadow-xl" style={{ aspectRatio: "1000 / 1058" }}>
            {[1,2,3,4,5,6].map((n) => (
              <Image
                key={n}
                src={`/gen4/layer/Gen4-L${n}.webp`}
                alt={`Gen4 第${n}層`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 32vw"
                style={{ opacity: active === n - 1 ? 1 : 0, transition: "opacity 0.5s ease" }}
              />
            ))}
          </div>
          </div>

          {/* Right — crossfade between all R images */}
          <div className="flex justify-center -mx-5 sm:-mx-8 md:mx-0">
          <div className="w-full md:max-w-[600px] relative" style={{ aspectRatio: "800 / 700" }}>
            {[1,2,3,4,5,6].map((n) => (
              <Image
                key={n}
                src={`/gen4/layer/Gen4-R${n}.webp`}
                alt={`Gen4 第${n}層`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 55vw"
                style={{ opacity: active === n - 1 ? 1 : 0, transition: "opacity 0.5s ease" }}
              />
            ))}

            {/* Number buttons overlay */}
            {BTN_POS.map((pos, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`第${i + 1}層`}
                className="absolute flex items-center justify-center rounded-full font-bold transition-all duration-200"
                style={{
                  top: pos.top,
                  right: pos.right,
                  width: "24px",
                  height: "24px",
                  fontSize: "11px",
                  backgroundColor: i === active ? "#17569E" : "rgba(23,86,158,0.5)",
                  color: "#fff",
                  border: i === active ? "2px solid #fff" : "2px solid rgba(255,255,255,0.4)",
                  transform: i === active ? "scale(1.2)" : "scale(1)",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
          </div>

        </div>
      </div>
    </section>
  );
}
