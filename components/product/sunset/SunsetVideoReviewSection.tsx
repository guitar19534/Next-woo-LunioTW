"use client";

import { useState } from "react";

// ── ใส่ YouTube video IDs ────────────────────────────────────────────────────
const VIDEOS = [
  { id: "Xt3UT0-3JoQ" },
  { id: "G1LigDXt6rk" },
];

function VideoCard({ id }: { id: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl cursor-pointer"
      style={{ aspectRatio: "9 / 16" }}
      onClick={() => setPlaying(true)}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title="video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt="thumbnail" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex items-center justify-center rounded-full shadow-lg"
              style={{ width: 56, height: 56, backgroundColor: "rgba(255,0,0,0.85)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function SunsetVideoReviewSection() {
  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#f5ede3", fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" }}>
      <div className="max-w-[1280px] w-[92%] mx-auto">

        <h2
          className="text-center font-semibold mb-10"
          style={{ fontSize: "clamp(18px, 2vw, 26px)", color: "#17284b" }}
        >
          商品影片
        </h2>

        <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-[800px] mx-auto">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} id={v.id} />
          ))}
        </div>

      </div>
    </section>
  );
}
