"use client";

import { useState } from "react";
import Image from "next/image";

const SLIDES = [
  { pc: "/qtm/QTM_Layers_PC_01.webp", mobile: "/qtm/QTM_Layers_Mobile_01.webp" },
  { pc: "/qtm/QTM_Layers_PC_02.webp", mobile: "/qtm/QTM_Layers_Mobile_02.webp" },
  { pc: "/qtm/QTM_Layers_PC_03.webp", mobile: "/qtm/QTM_Layers_Mobile_03.webp" },
];

export function LayerCarousel() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(SLIDES.length - 1, i + 1));

  return (
    <section className="relative w-full overflow-hidden bg-black select-none">

      {/* ── Desktop image ── */}
      <div className="hidden md:block w-full">
        <Image
          key={`pc-${active}`}
          src={SLIDES[active].pc}
          alt={`Gen4 Layer ${active + 1}`}
          width={1920}
          height={800}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* ── Mobile image ── */}
      <div className="block md:hidden w-full">
        <Image
          key={`m-${active}`}
          src={SLIDES[active].mobile}
          alt={`Gen4 Layer ${active + 1}`}
          width={750}
          height={900}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Left arrow */}
      {active > 0 && (
        <button
          type="button"
          onClick={prev}
          aria-label="上一張"
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      )}

      {/* Right arrow */}
      {active < SLIDES.length - 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="下一張"
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M9 18l6-6-6-6" /></svg>
        </button>
      )}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`第 ${i + 1} 張`}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === active ? "20px" : "8px",
              height: "8px",
              backgroundColor: i === active ? "#fff" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>

    </section>
  );
}
