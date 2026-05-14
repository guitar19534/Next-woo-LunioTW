"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BLUE = "#3c7ae4";

const STORES = [
  { name: "台南Dreamalands旗艦店", img: "/images/prefooter/nooz/dreamlands-tainan_02.jpg",      href: "/storefront/tainan" },
  { name: "台北門市",               img: "/images/prefooter/nooz/Store-1.webp",                    href: "/storefront/taipei" },
  { name: "台中床墊專賣店",         img: "/images/prefooter/nooz/Lunio-台中床墊專賣店.webp",       href: "/storefront/taichung" },
  { name: "新竹竹北床墊專賣店",     img: "/images/prefooter/nooz/Lunio-新竹竹北床墊專賣店.webp",   href: "/storefront/hsinchu" },
  { name: "高雄門市",               img: "/images/prefooter/nooz/Lunio高雄門市-1-1.webp",          href: "/storefront/kaohsiung" },
  { name: "桃園門市",               img: "/images/prefooter/nooz/Taoyuan-storefront (1).jpg",      href: "/storefront/taoyuan" },
];

export default function ErgoStoreSection() {
  const [idx, setIdx] = useState(0);
  const store = STORES[idx];
  const prev = () => setIdx((i) => (i - 1 + STORES.length) % STORES.length);
  const next = () => setIdx((i) => (i + 1) % STORES.length);

  return (
    <section className="bg-white py-14 md:py-20">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-center">

          {/* ── Left image ── */}
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src="/our-story/Lunio門市.webp"
              alt="Lunio 門市"
              width={834}
              height={834}
              className="w-full h-full object-cover"
            />
          </div>

          {/* ── Center text ── */}
          <div className="text-center">
            <h2 className="font-bold mb-4" style={{ fontSize: "clamp(18px,2vw,26px)", color: BLUE }}>
              找間離你最近門市睡午覺
            </h2>
            <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8, marginBottom: 4 }}>別光看！來摸摸我躺躺看</p>
            <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8, marginBottom: 4 }}>花個10分鐘，讓我們更認識彼此</p>
            <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8, marginBottom: 24 }}>激盪出不一樣火花</p>
            <Link
              href="/storefront"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 28px",
                borderRadius: 30,
                background: BLUE,
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.08em",
                textDecoration: "none",
              }}
            >
              預約小睡
            </Link>
          </div>

          {/* ── Right store carousel ── */}
          <div style={{ background: "#EEF4FF", borderRadius: 16, padding: 16 }}>
            <p className="text-center font-semibold mb-3" style={{ fontSize: 15, color: BLUE }}>
              {store.name}
            </p>
            <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
              <Image
                src={store.img}
                alt={store.name}
                fill
                className="object-cover"
                sizes="400px"
              />
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 hover:bg-white transition-colors shadow"
                aria-label="上一間"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 hover:bg-white transition-colors shadow"
                aria-label="下一間"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-3 mb-3">
              {STORES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`門市 ${i + 1}`}
                  style={{
                    width: i === idx ? 20 : 7,
                    height: 7,
                    borderRadius: 4,
                    background: i === idx ? BLUE : "#c5d4f0",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "width 0.3s, background 0.3s",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Link
                href={store.href}
                style={{
                  display: "inline-flex",
                  padding: "6px 20px",
                  borderRadius: 30,
                  border: `1.5px solid ${BLUE}`,
                  color: BLUE,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                查看位置
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
