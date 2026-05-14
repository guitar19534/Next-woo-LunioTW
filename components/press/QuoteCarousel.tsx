"use client";

import { useState } from "react";
import Image from "next/image";

const QUOTES = [
  {
    quote: "此次進軍台灣市場，有信心Lunio為在地消費者帶來最優質的舒眠體驗",
    logo: "/press/logo_news.png", media: "PChome 新聞", href: "#",
  },
  {
    quote: "Lunio樂謐臥提供優質的睡眠體驗",
    logo: "/press/logo (1).png", media: "HiNet 生活誌", href: "#",
  },
  {
    quote: "泰國網路銷售排名第一的高品質乳膠床 Lunio",
    logo: "/press/2018_logo_B.png", media: "經濟日報", href: "#",
  },
  {
    quote: "檢驗自己和床的匹配度最簡單的方式就是『睡一覺』！",
    logo: "/press/logo-1.jpg", media: "SETN 三立新聞網", href: "#",
  },
  {
    quote: "躺過就回不去！泰國第一天然乳膠床墊Lunio樂謐臥，讓你一夜好眠",
    logo: "/press/yahoo_news_zh-Hant-TW_h_p_newsv2_2.png", media: "Yahoo 新聞", href: "#",
  },
  {
    quote: "泰國熱銷No.1乳膠床品牌Lunio 樂謐臥正式來台",
    logo: "/press/yahoo_news_zh-Hant-TW_h_p_newsv2_2 (1).png", media: "Yahoo 新聞", href: "#",
  },
];

const VISIBLE = 3;
const BLUE = "#3B82F6";

export function QuoteCarousel() {
  const [start, setStart] = useState(0);
  const canPrev = start > 0;
  const canNext = start < QUOTES.length - VISIBLE;

  const visible = QUOTES.slice(start, start + VISIBLE);

  return (
    <div className="relative">
      {/* Prev */}
      <button type="button" onClick={() => setStart((s) => Math.max(0, s - 1))} disabled={!canPrev}
        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-20"
        style={{ fontSize: 22, color: "#9ca3af" }}>‹</button>

      <div className="grid grid-cols-3 gap-8">
        {visible.map((q, i) => (
          <a key={start + i} href={q.href} target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center text-center group">
            <p className="italic mb-6" style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "#555", lineHeight: 1.8 }}>
              "{q.quote}"
            </p>
            <div className="h-12 flex items-center justify-center">
              <Image src={q.logo} alt={q.media} width={140} height={48}
                className="object-contain max-h-12 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100" />
            </div>
          </a>
        ))}
      </div>

      {/* Next */}
      <button type="button" onClick={() => setStart((s) => Math.min(QUOTES.length - VISIBLE, s + 1))} disabled={!canNext}
        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-20"
        style={{ fontSize: 22, color: "#9ca3af" }}>›</button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: QUOTES.length - VISIBLE + 1 }).map((_, i) => (
          <button key={i} type="button" onClick={() => setStart(i)}
            className="rounded-full transition-all duration-200"
            style={{ width: i === start ? 20 : 8, height: 8, backgroundColor: i === start ? BLUE : "#d1d5db" }} />
        ))}
      </div>
    </div>
  );
}
