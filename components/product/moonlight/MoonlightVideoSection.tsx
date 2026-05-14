"use client";

import { useState } from "react";

// TODO: แทน PLACEHOLDER ด้วย YouTube video ID จริง
const VIDEO_ID = "cGDTAjMtvbM";

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

export function MoonlightVideoSection() {
  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#EFF6FF" }}>
      <div className="max-w-[1200px] w-[90%] mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">

          {/* Text — left */}
          <div className="flex flex-col gap-3 md:gap-4">
            <p
              className="font-bold"
              style={{ fontSize: "clamp(14px, 1.4vw, 18px)", color: "#1B6DC1", letterSpacing: "0.02em" }}
            >
              {/* TODO: 換成正確小標題 */}
              涼感科技！打造每一夜好眠
            </p>
            <p
              className="font-bold leading-snug"
              style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "#17284b" }}
            >
              {/* TODO: 換成正確文案 */}
              冷凝記憶 x 人體工學<br />
              雙重享受，整晚涼爽好眠
            </p>
          </div>

          {/* Video — right */}
          <VideoCard videoId={VIDEO_ID} />

        </div>
      </div>
    </section>
  );
}
