"use client";

import { useState } from "react";
import Image from "next/image";

const BLUE = "#17569E";
const NAVY = "#17284b";

function PlayButton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-transform duration-200 group-hover:scale-110"
        style={{ background: "rgba(255,30,30,0.92)", backdropFilter: "blur(4px)" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

export function InlineVideoCard({
  item,
  tag,
}: {
  item: { title: string; desc: string; img: string; videoId: string };
  tag: string;
}) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = item.videoId !== "PLACEHOLDER";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 2px 16px rgba(23,40,75,0.07)", border: "1px solid #f0f4fb" }}>
      {/* Thumbnail / Player */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
          />
        ) : (
          <button type="button" onClick={() => hasVideo && setPlaying(true)}
            className="absolute inset-0 w-full h-full cursor-pointer" disabled={!hasVideo}>
            <Image src={item.img} alt={item.title} fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors" />
            {hasVideo && <PlayButton />}
            {/* Tag */}
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white font-semibold"
              style={{ fontSize: 11, backgroundColor: BLUE, letterSpacing: "0.05em" }}>
              {tag}
            </span>
          </button>
        )}
      </div>
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
          style={{ fontSize: 14.5, color: NAVY }}>
          {item.title}
        </h3>
        <p className="text-xs flex-1 line-clamp-2" style={{ color: "#8b95a7", lineHeight: 1.7 }}>
          {item.desc}
        </p>
        {hasVideo && (
          <div className="mt-3 flex items-center gap-1" style={{ color: BLUE, fontSize: 12, fontWeight: 600 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M21.582 6.186A2.506 2.506 0 0 0 19.85 4.44C18.19 4 12 4 12 4s-6.19 0-7.85.44A2.506 2.506 0 0 0 2.418 6.186C2 7.84 2 11.3 2 11.3s0 3.46.418 5.114a2.506 2.506 0 0 0 1.732 1.746C5.81 18.6 12 18.6 12 18.6s6.19 0 7.85-.44a2.506 2.506 0 0 0 1.732-1.746C22 14.76 22 11.3 22 11.3s0-3.46-.418-5.114zM9.954 14.518l.001-6.437 5.249 3.219-5.25 3.218z"/></svg>
            觀看影片
          </div>
        )}
      </div>
    </div>
  );
}
