"use client";

import { useState } from "react";
import Image from "next/image";

const VIDEO_ID = "L1Hjixw_DvA";

export function BrandStoryVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl group" style={{ aspectRatio: "16/9" }}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title="品牌總監親自揭密 Lunio 成功背後的秘密"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full cursor-pointer">
          <Image src="/our-story/VDO-Brand-01.webp" alt="品牌總監親自揭密" fill
            className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,30,30,0.9)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
