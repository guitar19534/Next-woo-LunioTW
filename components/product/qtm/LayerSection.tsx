"use client";

import { useState } from "react";
import Image from "next/image";


// ปรับตำแหน่งปุ่มให้ตรงกับชั้นในรูป QTM (top %, right %)
const BTN_POS = [
  { top: "18%", right: "26%" },
  { top: "27%", right: "26%" },
  { top: "35%", right: "26%" },
  { top: "40%", right: "22%" },
  { top: "45%", right: "26%" },
  { top: "53%", right: "45%" },
  { top: "70%", right: "26%" },
];

export function LayerSection() {
  const [active, setActive] = useState(0);

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
            從材質到結構，精準思考只為貼近你的睡眠需求
          </p>
          <p style={{ fontSize: "clamp(13px, 1.5vw, 16px)", color: "#fff", fontWeight: 400 }}>
            你感受到的舒適都來自精密設計的支持
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-[60fr_40fr] gap-6 md:gap-10 items-center">

          {/* Left — L images + number buttons (no frame) */}
          <div className="order-2 md:order-1 flex justify-center -mx-5 sm:-mx-8 md:mx-0">
            <div className="w-full md:max-w-[600px] relative" style={{ aspectRatio: "800 / 1000" }}>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <Image
                  key={n}
                  src={`/qtm/layer/(L)QTM-Layer-${n}.webp`}
                  alt={`QTM 第${n}層`}
                  fill
                  loading="eager"
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  style={{ opacity: active === n - 1 ? 1 : 0, transition: "opacity 0.5s ease" }}
                />
              ))}

              {/* Number buttons */}
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

          {/* Right — R images only */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-full md:max-w-[420px] relative overflow-hidden rounded-3xl" style={{ aspectRatio: "1000 / 1058" }}>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <Image
                  key={n}
                  src={`/qtm/layer/(R)QTM-Layer-${n}.webp`}
                  alt={`QTM 第${n}層`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 32vw"
                  style={{ opacity: active === n - 1 ? 1 : 0, transition: "opacity 0.5s ease" }}
                />
              ))}
            </div>
          </div>

        </div>


      </div>
    </section>
  );
}
