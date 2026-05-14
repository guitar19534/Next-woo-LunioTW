"use client";

import { useState } from "react";
import Image from "next/image";

const LAYERS = [
  {
    num: "1", title: "曲線記憶棉",
    desc: "曲線記憶棉 5.0 公分\n緊密貼合，穩定支撐，不易下陷",
  },
  {
    num: "2", title: "平面記憶棉",
    desc: "平面記憶棉 2.5 公分\n緊實服貼，穩穩支撐不下沉",
  },
  {
    num: "3", title: "碎形記憶棉",
    desc: "輕柔彈性，透氣舒壓更放鬆",
  },
];

export function IceFitLayerSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#17284b" }}>
      <div className="max-w-[1280px] w-[90%] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold mb-3" style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#fff" }}>
            三層枕芯，雙面躺感
          </h2>
          <p style={{ fontSize: "clamp(13px, 1.3vw, 15px)", color: "rgba(255,255,255,0.6)" }}>
            躺感緊實或彈性自由選擇，依睡姿、心情自由選擇。
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: accordion */}
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
                  <p className="pb-4 whitespace-pre-line" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.85 }}>
                    {layer.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
          {/* Right: product image */}
          <div className="relative w-full" style={{ aspectRatio: "2286 / 1194" }}>
            <Image src="/smartcurve/Group-423-3.webp" alt="IceFit Smart Curve 三層枕芯" fill
              className="object-contain" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
