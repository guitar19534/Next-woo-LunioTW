"use client";

import { useState } from "react";
import Image from "next/image";

const LAYERS = [
  {
    num: "1", title: "外層布套",
    subtitle: "天鵝絨布料",
    desc: "嚴選優質天鵝絨，觸感柔軟細膩，親膚透氣，不悶熱、不刺激，讓你從頭到尾都舒適放鬆。",
  },
  {
    num: "2", title: "內層布套",
    subtitle: "100% 聚酯纖維",
    desc: "內襯採用 100% 聚酯纖維，緊密包覆碎記憶棉填充物，防止散落。布料柔軟、輕盈，透氣性佳。",
  },
  {
    num: "3", title: "填充枕",
    subtitle: "優質記憶棉",
    desc: "枕頭填充物採用碎記憶棉，柔軟舒適，支撐力佳，回彈迅速、不易塌陷，透氣散熱，遠離悶熱與濕氣。",
  },
];

export function EmbraceLayerSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#17284b" }}>
      <div className="max-w-[1280px] w-[90%] mx-auto">

        <div className="text-center mb-12">
          <h2 className="font-bold mb-2" style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#fff" }}>
            給你最舒適的背靠支撐
          </h2>
          <p style={{ fontSize: "clamp(13px, 1.3vw, 15px)", color: "rgba(255,255,255,0.6)" }}>
            三層結構，打造溫柔的擁抱
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left: product image */}
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            <Image src="/embrance/Embrace_Layers.webp" alt="Embrace 三層結構" fill
              className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>

          {/* Right: accordion */}
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
                  <div className="pb-4 space-y-2">
                    <p style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{layer.subtitle}</p>
                    <p style={{ fontSize: "clamp(12px, 1.1vw, 14px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.85 }}>{layer.desc}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
