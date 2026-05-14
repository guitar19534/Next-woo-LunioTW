"use client";

import { useState } from "react";

// ── แก้ videoId และข้อความที่นี่ ──────────────────────────────────────────
const VIDEOS = [
  {
    videoId: "TuV1TUZOQig",
    text: ["美女主播蔡尚樺親測", "Helix乳膠獨立筒奢華躺感", "價格驚艷 CP值破表"],
    videoLeft: true,
  },
  {
    videoId: "T648SgZKeYA",
    text: ["義大利工藝技術", "讓魏蔓在家也能享受五星級睡眠"],
    videoLeft: false,
  },
];

function VideoCard({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl cursor-pointer shadow-md"
      style={{ aspectRatio: "16 / 9" }}
      onClick={() => setPlaying(true)}
    >
      {playing ? (
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt="video thumbnail" className="w-full h-full object-cover" />
          {/* Play button */}
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

export function HelixVideoSection() {
  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#f0f0f0" }}>
      <div className="max-w-[1200px] w-[90%] mx-auto space-y-14 md:space-y-20">
        {VIDEOS.map((v, i) => (
          <div
            key={i}
            className="grid md:grid-cols-2 gap-8 md:gap-14 items-center"
          >
            {/* Video — order depends on videoLeft */}
            <div className={v.videoLeft ? "md:order-1" : "md:order-2"}>
              <VideoCard videoId={v.videoId} />
            </div>

            {/* Text */}
            <div
              className={`flex flex-col items-center justify-center text-center ${v.videoLeft ? "md:order-2" : "md:order-1"}`}
            >
              {v.text.map((line, j) => (
                <p
                  key={j}
                  className="font-bold leading-snug"
                  style={{ fontSize: "clamp(18px, 2.2vw, 28px)", color: "#17284b" }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
