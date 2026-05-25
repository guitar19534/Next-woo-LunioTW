"use client";

import { useState } from "react";
import Image from "next/image";

const NAVY = "#17284b";
const BLUE = "#17569E";

// ── แก้ videoId ให้ตรงกับ YouTube ─────────────────────────────────────────
const VIDEOS = [
  { videoId: "IEJwfR2qLvc" },
  { videoId: "0SYHdPVWuiM" },
];

const ICONS = [
  { src: "/topper-smartrest/Nooz-Topper-ICON-01.png", line1: "軟硬結合", line2: "雙面翻轉" },
  { src: "/topper-smartrest/Nooz-Topper-ICON-02.png", line1: "涼感層", line2: "涼爽散熱" },
  { src: "/topper-smartrest/Nooz-Topper-ICON-03.png", line1: "支撐層", line2: "扎實服貼" },
  { src: "/topper-smartrest/Nooz-Topper-ICON-04.png", line1: "透氣排濕", line2: "乾爽清新" },
];

const LIFESTYLE_IMAGES = [
  "/topper-smartrest/Body-1.webp",
  "/topper-smartrest/Body-2.webp",
];

const FEATURES = [
  {
    title: "持久涼感，服貼舒適",
    body: "喜歡軟床可選擇CoolRest 涼感記憶層，結合冷感凝膠，完美支撐身體曲線，持久涼爽，讓您整夜享受無壓力的深度睡眠。",
    img: "/topper-smartrest/Body-4.webp",
    imgLeft: false,
  },
  {
    title: "扎實支撐，告別疲憊",
    body: "喜歡硬床可選擇CloudComfort 超高支撐層，提供高密度泡棉支撐，均勻分散體重，特別針對肩、臀、膝等較重部位，有效減少壓力點，讓您舒適入睡，遠離關節和肌肉疼痛。",
    img: "/topper-smartrest/Body-6.webp",
    imgLeft: true,
  },
  {
    title: "表層床套透氣涼爽，告別悶熱夜晚",
    body: "SmartRest 透氣床罩，表面光滑柔軟，觸感溫和，透氣設計，有效散熱排濕，保持乾爽清新，減少夜間出汗，讓您整晚舒適入眠，遠離過敏與不適。",
    img: "/topper-smartrest/nooz-topper-smartrest_012.jpg",
    imgLeft: false,
  },
];

function VideoCard({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const isPlaceholder = videoId.startsWith("PLACEHOLDER");

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl cursor-pointer shadow-md"
      style={{ aspectRatio: "16 / 9" }}
      onClick={() => !isPlaceholder && setPlaying(true)}
    >
      {playing && !isPlaceholder ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title="video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      ) : (
        <>
          {isPlaceholder ? (
            <div className="w-full h-full" style={{ backgroundColor: "#e5e7eb" }} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumb} alt="video thumbnail" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex items-center justify-center rounded-full shadow-lg"
              style={{ width: 64, height: 64, backgroundColor: "rgba(255,0,0,0.85)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function LifestyleCarousel() {
  const [idx, setIdx] = useState(0);
  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
        {LIFESTYLE_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === idx ? 1 : 0 }}
          >
            <Image src={src} alt={`SmartRest lifestyle ${i + 1}`} fill className="object-cover" sizes="90vw" />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {LIFESTYLE_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            className="rounded-full transition-all"
            style={{ width: 8, height: 8, backgroundColor: i === idx ? BLUE : "#cbd5e1" }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function SmartrestFeatureSection() {
  return (
    <>
      {/* ── 4 Feature Icons ─────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: "clamp(40px,4vw,60px) 0" }}>
        <div className="max-w-[860px] w-[90%] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {ICONS.map((icon) => (
              <div key={icon.line1} className="flex flex-col items-center gap-3 text-center">
                <Image src={icon.src} alt={icon.line1} width={100} height={100} className="object-contain" />
                <div>
                  <p className="font-medium" style={{ fontSize: 15, color: NAVY }}>{icon.line1}</p>
                  <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 2 }}>{icon.line2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Videos ──────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ paddingBottom: "clamp(48px,5vw,72px)" }}>
        <div className="max-w-[1100px] w-[90%] mx-auto">
          <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: BLUE }}>
            商品影片
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {VIDEOS.map((v, i) => <VideoCard key={i} videoId={v.videoId} />)}
          </div>
        </div>
      </section>

      {/* ── 一張薄墊，雙重體驗 ──────────────────────────────────────── */}
      <section style={{ backgroundColor: "#f8faff", padding: "clamp(48px,5vw,72px) 0" }}>
        <div className="max-w-[900px] w-[90%] mx-auto">
          <h2 className="text-center font-bold mb-3" style={{ fontSize: "clamp(22px,2.5vw,30px)", color: NAVY }}>
            一張薄墊，雙重體驗
          </h2>
          <p className="text-center mb-2" style={{ fontSize: 14.5, color: "#555" }}>
            柔軟或扎實，任您翻轉，打造個性化的睡眠體驗
          </p>
          <p className="text-center mb-8" style={{ fontSize: 14.5, color: "#555" }}>
            5公分厚的舒適感和支撐力，讓舊床墊瞬間升級，直接放地面，或當宿舍床墊也能睡得舒服
          </p>
          <LifestyleCarousel />
        </div>
      </section>

      {/* ── 為舊床墊注入新活力 ───────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: "clamp(48px,5vw,72px) 0" }}>
        <div className="max-w-[900px] w-[90%] mx-auto">
          <h2 className="text-center font-bold mb-4" style={{ fontSize: "clamp(22px,2.5vw,30px)", color: BLUE }}>
            為舊床墊注入新活力
          </h2>
          <p className="text-center mb-8" style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8 }}>
            當舊床墊逐漸失去舒適感，使用 Nooz SmartRest 翻轉薄墊，能讓床墊重獲新生，恢復舒適的躺感。<br />
            還可作為床墊的隔離層，有效減少磨損與污垢，延長床墊的使用壽命。
          </p>
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/7" }}>
            <Image
              src="/topper-smartrest/Body-2.webp"
              alt="為舊床墊注入新活力"
              fill
              className="object-cover"
              sizes="90vw"
            />
          </div>
        </div>
      </section>

      {/* ── Alternating feature blocks ───────────────────────────────── */}
      {FEATURES.map((f) => (
        <section key={f.title} className="bg-white" style={{ padding: "clamp(40px,4vw,56px) 0", borderTop: "1px solid #f0f4fa" }}>
          <div className="max-w-[1100px] w-[90%] mx-auto">
            <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${f.imgLeft ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="space-y-4">
                <h3 className="font-bold" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: NAVY }}>{f.title}</h3>
                <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.85 }}>{f.body}</p>
              </div>
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
                <Image src={f.img} alt={f.title} fill className="object-cover" sizes="(max-width:768px) 90vw, 45vw" />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
