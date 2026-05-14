"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const SLIDES = [
  {
    src: "/ergo/ergo-header-nebula.jpg",
    alt: "Lunio Nebula 經典記憶枕",
    width: 2310,
    height: 990,
    title: "Nebula 經典記憶枕",
    subtitle: "親膚不刺激",
    href: "/product/lunio-nebula",
  },
  {
    src: "/ergo/Mercury (1).webp",
    alt: "Lunio Mercury 石墨烯機能記憶枕",
    width: 2310,
    height: 990,
    title: "Mercury 石墨烯機能記憶枕",
    subtitle: "涼感科技 · 三層自由調高",
    href: "/product/lunio-mercury",
  },
];

export default function ErgoHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div
        style={{
          display: "flex",
          transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {SLIDES.map((s) => (
          <div key={s.src} style={{ flexShrink: 0, width: "100%", position: "relative" }}>
            <Image
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              priority
              className="w-full h-auto block"
            />
            {/* gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }}
            />
            {/* text */}
            <div
              className="absolute inset-0 flex flex-col justify-center"
              style={{ padding: "clamp(16px,5vw,80px)" }}
            >
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(10px,1vw,13px)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 10 }}>
                Lunio Ergo Series
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display,'MiSansTC')",
                  fontSize: "clamp(16px,2.8vw,40px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.35,
                  marginBottom: 8,
                  textShadow: "0 2px 16px rgba(0,0,0,0.3)",
                }}
              >
                {s.title}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "clamp(12px,1.2vw,18px)", marginBottom: 24, textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}>
                {s.subtitle}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link
                  href="#products"
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    padding: "clamp(8px,1vw,11px) clamp(16px,2vw,28px)",
                    borderRadius: 30,
                    background: "rgba(255,255,255,0.18)",
                    border: "1.5px solid rgba(255,255,255,0.65)",
                    backdropFilter: "blur(6px)",
                    color: "#fff", fontWeight: 600,
                    fontSize: "clamp(11px,1vw,14px)", letterSpacing: "0.08em",
                    textDecoration: "none",
                  }}
                >
                  挑選我的ERGO枕頭
                </Link>
                <Link
                  href={s.href}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    padding: "clamp(8px,1vw,11px) clamp(16px,2vw,28px)",
                    borderRadius: 30,
                    background: "#3c7ae4",
                    color: "#fff", fontWeight: 600,
                    fontSize: "clamp(11px,1vw,14px)", letterSpacing: "0.08em",
                    textDecoration: "none",
                  }}
                >
                  立即選購
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      {[{ fn: prev, dir: "left", path: "M15 18l-6-6 6-6" }, { fn: next, dir: "right", path: "M9 18l6-6-6-6" }].map(({ fn, dir, path }) => (
        <button
          key={dir}
          onClick={fn}
          aria-label={dir === "left" ? "上一張" : "下一張"}
          style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            [dir]: "clamp(8px,2vw,20px)",
            width: "clamp(32px,4vw,44px)", height: "clamp(32px,4vw,44px)",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <path d={path} />
          </svg>
        </button>
      ))}

      {/* Dots + progress */}
      <div style={{ position: "absolute", bottom: "clamp(8px,2vw,18px)", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, alignItems: "center" }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 8, height: 8, borderRadius: 4,
              background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "width 0.35s, background 0.35s",
            }}
          />
        ))}
      </div>
    </section>
  );
}
