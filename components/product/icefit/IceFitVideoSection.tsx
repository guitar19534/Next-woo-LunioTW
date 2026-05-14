"use client";

import { useState } from "react";

// TODO: แทน PLACEHOLDER ด้วย YouTube Shorts video ID จริง
const VIDEO_ID = "PLACEHOLDER_ICEFIT_VIDEO";

export function IceFitVideoSection() {
  const [playing, setPlaying] = useState(false);
  const isPlaceholder = VIDEO_ID.startsWith("PLACEHOLDER");
  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-[1000px] w-[90%] mx-auto">
        <div className="text-center mb-10">
          <p className="font-bold" style={{ fontSize: "clamp(18px, 2.2vw, 28px)", color: "#fff", letterSpacing: "0.15em" }}>智能好眠系列</p>
          <p style={{ fontSize: "clamp(13px, 1.3vw, 16px)", color: "rgba(255,255,255,0.5)", marginTop: 6, letterSpacing: "0.2em" }}>享受智慧寢具 全面升級睡眠</p>
        </div>
        <div className="flex justify-center">
          <div className="relative overflow-hidden rounded-2xl cursor-pointer"
            style={{ width: "min(480px, 90vw)", aspectRatio: "9 / 16", backgroundColor: "#1a1a1a" }}
            onClick={() => { if (!isPlaceholder) setPlaying(true); }}>
            {playing ? (
              <iframe src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title="IceFit video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="absolute inset-0 w-full h-full" style={{ border: "none" }} />
            ) : isPlaceholder ? (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">影片即將上線</div>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="video" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center rounded-full shadow-xl"
                    style={{ width: 72, height: 72, backgroundColor: "rgba(255,0,0,0.9)" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
