"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const REVIEWS = [
  {
    img: "/images/nooz/review/Review1.webp",
    text: "CP值很高\n真空壓縮的包裝搬家很方便",
  },
  {
    img: "/images/nooz/review/Review2.webp",
    text: "Nooz乳膠竹炭床墊的軟硬度剛好，使用後從沒想過要換床墊，因為這張床讓我睡得更好",
  },
  {
    img: "/images/nooz/review/Review3.webp",
    text: "扎實又有彈性，可以很好的支撐身體，滿足我的睡眠需求👍",
  },
  {
    img: "/images/nooz/review/Review4.webp",
    text: "遇到 Nooz 後，睡眠問題都解決了，睡得好舒服輕鬆，醒來時也不會痠痛",
  },
  {
    img: "/images/nooz/review/Review5.webp",
    text: "在床上看書，然後不小心睡著了不是我們的錯，是這張床害的，因為太舒服了",
  },
];

export function NoozReviewCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 4s
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % REVIEWS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const review = REVIEWS[current];

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Photo */}
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4 / 5" }}>
        {REVIEWS.map((r, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={r.img}
              alt={`用戶評論 ${i + 1}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Review text */}
      <p
        className="text-center leading-relaxed whitespace-pre-line"
        style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "#374151", maxWidth: 360 }}
      >
        {review.text}
      </p>

      {/* Stars */}
      <p style={{ fontSize: 20, color: "#F5A623", letterSpacing: "0.1em" }}>★★★★★</p>

      {/* Dots */}
      <div className="flex gap-2">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Review ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              backgroundColor: i === current ? "#17569E" : "#d1d5db",
            }}
          />
        ))}
      </div>
    </div>
  );
}
