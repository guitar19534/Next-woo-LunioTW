"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

const REVIEWS = [
  {
    name: "Jack Chen",
    type: "線上客人",
    text: "我是網上購買 躺上 Lunio 2天的床墊後多年的腰痠背痛不見了 廣告是真實的。",
  },
  {
    name: "黃善源",
    type: "門市客人",
    text: "來現場體驗，很舒服，腰不再鏤空！現場定床回家睡！",
  },
  {
    name: "莊凱丞",
    type: "門市客人",
    text: "CP值很高的床墊，躺起來很舒適包覆感很好，防干擾程度也很好👍 銷售服務員雅瑄親切介紹也詳細👍",
  },
  {
    name: "林佳儀",
    type: "線上客人",
    text: "睡了一個月，腰痛明顯改善，翻身也不會吵到旁邊的人，非常滿意！",
  },
  {
    name: "陳建宏",
    type: "門市客人",
    text: "門市體驗很棒，服務員很專業，解答了很多關於睡眠和床墊的問題，當場就決定購買。",
  },
  {
    name: "王雅婷",
    type: "線上客人",
    text: "收到床墊很快，安裝師傅也很專業，床墊品質真的很好，睡起來涼爽舒適！",
  },
];

function LunioAvatar() {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#17569E" }}>
      <span className="text-white font-bold text-xs tracking-tight">Lunio</span>
    </div>
  );
}

export function ReviewSection({ image = "/images/review/Review.webp", inlineHeader = false }: { image?: string; inlineHeader?: boolean } = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const TOTAL = REVIEWS.length;

  const syncIndex = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    let best = 0, bestDist = Infinity;
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

  function scrollToIndex(i: number) {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveIndex(i);
  }

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

        {/* ── Centered header (home layout) ──────────────────────── */}
        {!inlineHeader && (
          <div className="text-center mb-10 overflow-hidden">
            <h2 className="font-bold mb-2" style={{ color: "#17569E", fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "0.2em" }}>
              Google 體驗與購買評論
            </h2>
            <p aria-hidden className="font-bold select-none leading-none mb-4"
              style={{ fontSize: "clamp(30px, 8vw, 80px)", fontWeight: 200, color: "#e8eaed", letterSpacing: "0.08em" }}>
              CUSTOMER REVIEW
            </p>
            <p className="mb-6" style={{ fontSize: "15px", color: "#5F6062", lineHeight: 1.8 }}>
              感謝來<strong>Lunio</strong>的客人，實際試躺或睡了一陣子來<strong>Google</strong>商家留下好評<br />
              認可我們的服務及乳膠床好品質。
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="font-bold text-xl" style={{ color: "#f5a623" }}>4.8</span>
              <span className="text-xl" style={{ color: "#f5a623" }}>★★★★★</span>
            </div>
          </div>
        )}

        {/* ── Body: Image left + Header+Carousel right ───────────── */}
        <div className="flex flex-col md:flex-row gap-8 md:items-center">

          {/* Left — product photo */}
          <div className="w-full md:w-[32%] md:flex-shrink-0">
            <div className="relative w-full overflow-hidden rounded-3xl" style={{ aspectRatio: "1 / 1" }}>
              <Image
                src={image}
                alt="Lunio 客人體驗照"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            </div>
          </div>

          {/* Right — header + carousel */}
          <div className="flex-1 min-w-0">

            {/* Inline header (product layout) */}
            {inlineHeader && (
              <div className="mb-6">
                <h2 className="font-bold mb-3" style={{ color: "#17569E", fontSize: "clamp(20px, 2.5vw, 28px)" }}>
                  Google 體驗與購買評論
                </h2>
                <p className="mb-4" style={{ fontSize: "15px", color: "#5F6062", lineHeight: 1.8 }}>
                  感謝來<strong>Lunio</strong>的客人，實際試躺或睡了一陣子來<strong>Google</strong>商家留下好評，認可我們的服務及乳膠床好品質。
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl" style={{ color: "#f5a623" }}>4.8</span>
                  <span className="text-xl" style={{ color: "#f5a623" }}>★★★★★</span>
                </div>
              </div>
            )}

            {/* Scroll track — 2 cards visible + peek */}
            <style>{`.review-track::-webkit-scrollbar{display:none}`}</style>
            <div
              ref={trackRef}
              className="review-track flex gap-5 overflow-x-auto pb-2"
              style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
            >
              {REVIEWS.map((r, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 rounded-2xl border border-gray-100 p-6"
                  style={{
                    width: "clamp(240px, calc((100% - 20px) / 2.2), 360px)",
                    minWidth: "240px",
                    scrollSnapAlign: "start",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <LunioAvatar />
                    <div>
                      <p className="font-bold text-sm" style={{ color: "#17284b" }}>{r.name}</p>
                      <p className="text-xs" style={{ color: "#888" }}>{r.type}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "14px", color: "#5F6062", lineHeight: 1.8 }}>{r.text}</p>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2 mt-6">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`評論 ${i + 1}`}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: i === activeIndex ? "20px" : "8px",
                    height: "8px",
                    backgroundColor: i === activeIndex ? "#17569E" : "#d1d5db",
                  }}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
