/**
 * BeddingShowcase — Section 6: Pillow & Bedding Highlights
 *
 * Part 1 · Pillow Promo
 *   Centered heading → large cloud-sleep illustration → price bar + CTA
 *
 * Part 2 · Snow Weave Collection
 *   Background 'SNOW WEAVE' watermark text → main heading →
 *   large rounded video/image player
 *
 * ─── Replacing placeholder assets ───────────────────────────────────────────
 *  Pillow illustration : /public/images/bedding/pillow-cloud.webp
 *  Snow Weave video    : /public/images/bedding/snow-weave.mp4
 *  Snow Weave poster   : /public/images/bedding/snow-weave-poster.webp
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Part 1 · Pillow Promo ────────────────────────────────────────────────────

function PillowPromo() {
  return (
    <div className="bg-white py-20 md:py-28">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <p
            className="uppercase font-medium tracking-[5px] mb-4"
            style={{ fontSize: "11px", color: "#3c7ae4" }}
          >
            LUNIO · PILLOW
          </p>
          <h2
            className="font-bold mx-auto"
            style={{
              fontFamily: "'Chiron Goround TC', sans-serif",
              color: "#17284b",
              maxWidth: "640px",
              lineHeight: 1.35,
              letterSpacing: "0.02em",
            }}
          >
            感受頸椎被溫柔撐起吧！
          </h2>
        </div>

        {/* Illustration */}
        <div
          className="relative mx-auto mb-10 md:mb-14"
          style={{ maxWidth: "680px", aspectRatio: "4 / 3" }}
        >
          <Image
            src="https://placehold.co/680x510/eef4ff/17284b?text=枕頭雲端插圖"
            alt="在 Lunio 枕頭上安然熟睡的插圖 — 頸椎被完美支撐"
            fill
            className="object-contain"
            sizes="(max-width: 720px) 90vw, 680px"
          />
        </div>

        {/* Price bar */}
        <div
          className="mx-auto flex items-center justify-between gap-6 rounded-2xl px-8 py-5"
          style={{
            maxWidth: "680px",
            background: "#f0f4fb",
            border: "1px solid #dde6f5",
          }}
        >
          <div>
            <p
              className="font-medium mb-0.5"
              style={{ fontSize: "13px", color: "#888888" }}
            >
              Lunio 人體工學枕頭
            </p>
            <p
              className="font-bold"
              style={{ fontSize: "28px", color: "#17284b", lineHeight: 1 }}
            >
              NT$1,790
            </p>
          </div>
          <Link
            href="/shop/category/pillow"
            className="btn-primary inline-flex items-center gap-2 flex-shrink-0"
          >
            立即購買
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}

// ─── Part 2 · Snow Weave Collection ──────────────────────────────────────────

function SnowWeaveSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }

  return (
    <div className="bg-[#F8F8F8] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">

        {/* Watermark + Heading stack */}
        <div className="relative text-center mb-12 md:mb-16">

          {/* Background watermark */}
          <span
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-bold leading-none"
            aria-hidden
            style={{
              fontSize: "clamp(56px, 12vw, 120px)",
              color: "transparent",
              WebkitTextStroke: "1px #dde6f0",
              letterSpacing: "0.12em",
              whiteSpace: "nowrap",
            }}
          >
            SNOW WEAVE
          </span>

          {/* Foreground headings */}
          <div className="relative">
            <p
              className="uppercase font-medium tracking-[5px] mb-4"
              style={{ fontSize: "11px", color: "#3c7ae4" }}
            >
              LUNIO · BEDDING
            </p>
            <h2
              className="font-bold mx-auto"
              style={{
                fontFamily: "'Chiron Goround TC', sans-serif",
                color: "#17284b",
                maxWidth: "600px",
                lineHeight: 1.35,
                letterSpacing: "0.02em",
              }}
            >
              智能天絲床包組
            </h2>
            <p
              className="mt-3 mx-auto"
              style={{
                fontSize: "15px",
                color: "#888888",
                maxWidth: "420px",
                lineHeight: 1.7,
              }}
            >
              床包 + 枕套，天絲纖維柔滑親膚，
              <br className="hidden sm:block" />
              全年溫度調節，打造沙龍級睡眠體驗。
            </p>
          </div>
        </div>

        {/* Video / Image player */}
        <div
          className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group"
          style={{ aspectRatio: "16 / 9", background: "#d8e2ef" }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="https://placehold.co/1140x641/d8e2ef/17284b?text=天絲床包組+生活影片"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images/bedding/snow-weave.mp4" type="video/mp4" />
          </video>

          {/* Pause overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: playing ? 0 : 1 }}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Pause button — hover when playing */}
          {playing && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <p style={{ fontSize: "14px", color: "#888888" }}>
            智能天絲床包組（床包 + 枕套 × 2）
          </p>
          <Link
            href="/shop/category/bedding"
            className="btn-outline inline-flex items-center gap-2"
          >
            查看全系列
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}

// ─── Master export ────────────────────────────────────────────────────────────

export function BeddingShowcase() {
  return (
    <>
      <PillowPromo />
      <SnowWeaveSection />
    </>
  );
}
