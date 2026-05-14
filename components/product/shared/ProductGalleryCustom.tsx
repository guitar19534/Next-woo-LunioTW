"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/woocommerce.d";

interface Props {
  images: ProductImage[];
  productName: string;
}

export function ProductGalleryCustom({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  const active = images[activeIndex];
  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(images.length - 1, i + 1));

  return (
    <div className="w-full">

      {/* ── Main image ─────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-3xl mb-3" style={{ aspectRatio: "3 / 2" }}>
        <Image
          key={activeIndex}
          src={active.src}
          alt={active.alt || productName}
          fill
          className="object-contain transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {/* Left arrow */}
        {activeIndex > 0 && (
          <button
            type="button"
            onClick={prev}
            aria-label="上一張"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm shadow transition-colors hover:bg-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#17284b" strokeWidth="2.5" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
          </button>
        )}

        {/* Right arrow */}
        {activeIndex < images.length - 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="下一張"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm shadow transition-colors hover:bg-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#17284b" strokeWidth="2.5" aria-hidden><path d="M9 18l6-6-6-6" /></svg>
          </button>
        )}
      </div>

      {/* ── Thumbnails 3-col grid ──────────────────────── */}
      <div className="grid grid-cols-3 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="relative overflow-hidden rounded-2xl transition-all duration-150"
            style={{
              aspectRatio: "3 / 2",
              outline: i === activeIndex ? "2px solid #17569E" : "2px solid transparent",
              outlineOffset: "2px",
            }}
            aria-label={`圖片 ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt || `${productName} ${i + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 33vw, 16vw"
            />
          </button>
        ))}
      </div>

    </div>
  );
}
