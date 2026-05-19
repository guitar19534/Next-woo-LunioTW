/**
 * Gen4Showcase — Section 5: Product Deep Dive
 *
 * Four stacked sub-sections:
 *   Part 1 · Intro          — eyebrow + H2 + sub-text + mascot illustration
 *   Part 2 · Video          — dark bg, play/pause overlay, autoPlay/muted/loop
 *   Part 3 · Features       — 4 cards (desktop static grid, mobile framer carousel + dots)
 *   Part 4 · Size & Pricing — 5-tab size picker (framer layoutId indicator + AnimatePresence)
 *
 * ─── Replacing placeholder assets ───────────────────────────────────────────
 *  Mascot:  /public/images/product/gen4-mascot.webp
 *  Video:   /public/brand/gen4.mp4
 *  Feature card photos: /public/images/product/feat-graphene.webp, feat-latex.webp,
 *                       feat-pressure.webp, feat-zones.webp
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SizeOption {
  label: string;
  tw: string;
  cm: string;
  price: string;
  strikePrice?: string;
  slug: string;
  image: string;
  desc: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

// ─── Feature card types ───────────────────────────────────────────────────────

type FeatureImage = {
  type: "image";
  /** Replace with: /images/product/feat-graphene.webp */
  imageSrc: string;
  imageAlt: string;
  title: string;
  desc: string;
};

type FeatureVideo = {
  type: "video";
  /** Replace with: /images/product/feat-latex.mp4 */
  videoSrc: string;
  /** Poster shown before video plays — replace with a real preview frame */
  poster: string;
  title: string;
  desc: string;
};

type Feature = FeatureImage | FeatureVideo;

// Order: gen4-1, gen4-2, gen4-video1, gen4-video2
const FEATURES: Feature[] = [
  {
    type: "image",
    imageSrc: "/hypercool/Benefit1-scaled-1.webp",
    imageAlt: "Lunio Gen4 石墨烯導熱層 — 快速散熱維持舒適睡眠溫度",
    title: "智慧溫控，整晚舒適",
    desc: "石墨烯導熱科技 × 高效散熱設計\n帶走悶熱與煩躁\n維持整夜穩定的舒適溫度",
  },
  {
    type: "video",
    videoSrc: "/hypercool/Benefit2.mp4",
    poster: "",
    title: "加厚款天然乳膠",
    desc: "乳膠層特別加厚\n使用泰國 100% 純天然乳膠\n一躺下就服貼得不想起床",
  },
  {
    type: "image",
    imageSrc: "/hypercool/Benefit3-scaled-1.webp",
    imageAlt: "「三重釋壓」的貼合",
    title: "「三重釋壓」的貼合",
    desc: "貼合身形的支撐，釋放累積壓力\n只留下真正放鬆的深層好眠",
  },
  {
    type: "video",
    videoSrc: "/hypercool/Benefit4-1.mp4",
    poster: "",
    title: "每段曲線，都有對的位置",
    desc: "九區精準支撐\n翻身不會卡、不會壓\n讓脊椎回到自然放鬆的狀態",
  },
];

const SIZES: SizeOption[] = [
  {
    label: "標準單人",
    tw: "3 尺 : 89 x 188 x 24 cm",
    cm: "90 × 188 cm",
    price: "NT$21,990",
    strikePrice: "NT$38,000",
    slug: "lunio-gen4-single",
    image: "/gen4/3ft.webp",
    desc: "精準支撐全身曲線 單人專屬的高科技深眠空間",
  },
  {
    label: "單人加大",
    tw: "3.5 尺 : 104 x 188 x 24 cm",
    cm: "105 × 188 cm",
    price: "NT$23,990",
    strikePrice: "NT$40,000",
    slug: "lunio-gen4-single-xl",
    image: "/gen4/3.5ft.webp",
    desc: "加寬設計搭配智能承托系統 翻身依然穩定舒適 ",
  },
  {
    label: "標準雙人",
    tw: "5 尺 : 150 x 188 x 24 cm",
    cm: "150 × 188 cm",
    price: "NT$28,990",
    strikePrice: "NT$52,000",
    slug: "lunio-gen4-double",
    image: "/gen4/5ft.webp",
    desc: "人體工學分區支撐 兩人共享也能各自獨立安睡 ",
  },
  {
    label: "雙人加大",
    tw: "6 尺 : 180 x 188 x 24 cm",
    cm: "180 × 188 cm",
    price: "NT$33,990",
    strikePrice: "NT$64,000",
    slug: "lunio-gen4-queen",
    image: "/gen4/6ft.webp",
    desc: "更廣闊的睡眠場域 零干擾技術讓深眠不中斷 ",
  },
  {
    label: "雙人特大",
    tw: "7 尺 : 180 x 210 x 24 cm",
    cm: "210 × 188 cm",
    price: "NT$36,990",
    strikePrice: "NT$80,000",
    slug: "lunio-gen4-superking",
    image: "/gen4/7ft.webp",
    desc: "旗艦級寬敞空間 從頭到腳全面智慧承托與釋壓 ",
  },
];

// ─── Part 1 · Intro ───────────────────────────────────────────────────────────

function HypercoolIntro() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Text column */}
          <div className="flex-1 text-center md:text-left">
            <p
              className="uppercase font-medium tracking-[5px] mb-4"
              style={{ fontSize: "11px", color: "#17569E" }}
            >
              LUNIO · GEN 4
            </p>
            <h2
              className="font-bold mb-5"
              style={{
                fontFamily: "'Chiron Goround TC', sans-serif",
                color: "#17284b",
                lineHeight: 1.3,
                letterSpacing: "0.02em",
              }}
            >
              石墨烯乳膠床墊
            </h2>
            <p
              className="mb-6"
              style={{ fontSize: "16px", color: "#5F6062", lineHeight: 1.9 }}
            >
              結合石墨烯導熱科技與 100% 天然乳膠，
              <br className="hidden sm:block" />
              由骨科醫師聯合研發，專為亞洲人體型設計。
              <br className="hidden sm:block" />
              讓每一夜成為身體真正的修復時刻。
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                href="/shop/lunio-latex-mattress"
                className="btn-primary inline-flex items-center gap-2"
              >
                立即選購
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/our-story"
                className="btn-outline inline-flex items-center gap-2"
              >
                了解更多
              </Link>
            </div>
          </div>
SIZE & PRICING
          {/* Mascot / product illustration column */}
          <div className="flex-1 flex justify-center">
            <div
              className="relative w-full max-w-[480px]"
              style={{ aspectRatio: "4 / 3" }}
            >
              <Image
                src="https://placehold.co/960x720/f0f4fb/17284b?text=Gen4+產品圖"
                alt="Lunio Gen4 石墨烯乳膠床墊產品展示圖"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 480px"
                priority={false}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Part 2 · Video ───────────────────────────────────────────────────────────

function HypercoolVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="bg-[#0d1520] py-14 md:py-20">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">

        {/* Section label */}
        <p
          className="text-center uppercase font-medium tracking-[5px] mb-8"
          style={{ fontSize: "11px", color: "#17569E" }}
        >
          SEE IT IN ACTION
        </p>

        {/* Video container */}
        <div
          className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group"
          style={{ aspectRatio: "16 / 9", background: "#1a2535" }}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/brand/gen4.mp4" type="video/mp4" />
          </video>

          {/* Play/Pause overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: playing ? 0 : 1 }}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
              {/* Play icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Pause button — visible on hover when playing */}
          {playing && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Caption */}
        <p
          className="text-center mt-5"
          style={{ fontSize: "13px", color: "#8899aa", letterSpacing: "0.04em" }}
        >
          Lunio Gen 4 石墨烯乳膠床墊 — 深層修復，從第一夜開始
        </p>
      </div>
    </div>
  );
}

// ─── Part 3 · Features carousel ───────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "60%" : "-60%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? "-60%" : "60%",
    opacity: 0,
  }),
};

function FeatureCard({ feat }: { feat: Feature }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 h-full
                    hover:shadow-[0_6px_28px_rgba(0,0,0,0.09)] transition-shadow duration-200">

      {/* Media — image or looping short video */}
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        {feat.type === "image" ? (
          <Image
            src={feat.imageSrc}
            alt={feat.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 30vw"
          />
        ) : (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={feat.poster}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={feat.videoSrc} type="video/mp4" />
            </video>
            {/* Small video badge */}
            <span
              className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm"
              style={{ fontSize: "10px", color: "#fff", fontWeight: 600, letterSpacing: "0.05em" }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              VIDEO
            </span>
          </>
        )}
      </div>

      {/* Text */}
      <div className="px-5 py-5 text-center">
        <h3
          className="font-bold mb-2"
          style={{ fontFamily: "'Chiron Goround TC'", fontSize: "16px", color: "#606060", lineHeight: 1.4 }}
        >
          {feat.title}
        </h3>
        <p className="whitespace-pre-line" style={{ fontFamily: "'Chiron Goround TC'", fontSize: "13.5px", color: "#606060", letterSpacing: "0.10em", lineHeight: 1.8 }}>
          {feat.desc}
        </p>
      </div>
    </div>
  );
}

export function HypercoolFeatures() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const TOTAL = FEATURES.length;

  // ── Dot sync ────────────────────────────────────────────────────────────────
  const syncIndex = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const dist = Math.abs((child as HTMLElement).offsetLeft - el.scrollLeft);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    setActiveIndex(best);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncIndex, { passive: true });
    return () => el.removeEventListener("scroll", syncIndex);
  }, [syncIndex]);

  // ── Mouse drag-to-scroll ─────────────────────────────────────────────────────
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none"; // disable snap while dragging
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging.current) return;
    const el = trackRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    el.scrollLeft = dragScrollLeft.current - walk;
  }

  function onMouseUp() {
    if (!isDragging.current) return;
    isDragging.current = false;
    const el = trackRef.current;
    if (!el) return;
    el.style.cursor = "grab";
    el.style.scrollSnapType = "x mandatory"; // re-enable snap → snaps to nearest
    syncIndex();
  }

  // ── Scroll to card ───────────────────────────────────────────────────────────
  function scrollToIndex(i: number) {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveIndex(i);
  }

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(TOTAL - 1, activeIndex + 1));

  return (
    <div className="bg-white pt-4 pb-16 md:pt-6 md:pb-24">

      {/* Carousel — arrows on left & right */}
      <style>{`.feat-track::-webkit-scrollbar { display: none; }`}</style>
      <div className="flex items-center gap-3 px-4 sm:px-6">

        {/* Left arrow */}
        <button
          type="button"
          onClick={prev}
          disabled={activeIndex === 0}
          aria-label="上一個"
          className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-150 ${
            activeIndex === 0
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-[#17284b] text-[#17284b] hover:bg-[#17284b] hover:text-white"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="feat-track flex gap-4 overflow-x-auto pb-2 select-none flex-1"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            cursor: "grab",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                width: "calc((100% - 48px) / 3.5)",
                minWidth: "220px",
                scrollSnapAlign: "start",
              }}
            >
              <FeatureCard feat={f} />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={next}
          disabled={activeIndex === TOTAL - 1}
          aria-label="下一個"
          className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-150 ${
            activeIndex === TOTAL - 1
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-[#17284b] text-[#17284b] hover:bg-[#17284b] hover:text-white"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-7" role="tablist">
        {FEATURES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`功能 ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className={`rounded-full transition-all duration-200 ${
              i === activeIndex
                ? "w-5 h-2 bg-[#17569E]"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

// ─── Part 4 · Size & Pricing tabs ─────────────────────────────────────────────

export function HypercoolPricing() {
  const first = SIZES[0];

  return (
    <div className="bg-[#F8F8F8] pt-4 pb-16 md:pt-6 md:pb-24">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8 text-center">

        {/* Tagline */}
        <p
          className="font-bold mb-10"
          style={{ fontSize: "clamp(16px, 2vw, 22px)", fontFamily: "'Chiron Goround TC', sans-serif", letterSpacing: "0.08em", color: "#17569E", lineHeight: 1.7 }}
        >
          感受頸椎被溫柔撐起吧！
        </p>

        {/* Cartoon illustration */}
        <div className="mb-12 -mx-5 sm:-mx-8">
          <Image
            src="/hypercool/Cartoon-Hypercool.webp"
            alt="Lunio HyperCool 智能工學護頸枕"
            width={1400}
            height={1000}
            className="w-full h-auto"
          />
        </div>

        {/* Price + CTA pill */}
        <div className="flex justify-center">
          <div className="flex items-center rounded-full border-2 overflow-hidden" style={{ borderColor: "#17569E" }}>
            <span className="px-4 font-bold" style={{ fontSize: "15px", color: "#17569E" }}>
              {first.price}
            </span>
            <Link
              href="/product/lunio-hypercool"
              className="px-4 py-2 font-bold text-white rounded-full"
              style={{ fontSize: "13px", backgroundColor: "#17569E" }}
            >
              立即購買
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Master export ────────────────────────────────────────────────────────────

export function HypercoolShowcase() {
  return (
    <>
      <HypercoolIntro />
      <HypercoolVideoSection />
    </>
  );
}
