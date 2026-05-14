/**
 * CategoryShowcase — Section 2 on the homepage, directly below the Hero.
 *
 * Three equal-width portrait cards, each:
 *   • Full-bleed lifestyle photo (fill + object-cover)
 *   • Subtle gradient overlay so the button is always legible
 *   • Floating blue pill button anchored to the center-bottom of the image
 *   • Hover: image gently zooms, button brightens
 *
 * Replacing placeholder images
 * ────────────────────────────
 *   Drop your WebP/JPEG files into /public/brand/ and update the `imageSrc`
 *   values in the CATEGORIES array below. Recommended dimensions: 600 × 800 px.
 *
 *   cat-mattress.svg  →  cat-mattress.webp
 *   cat-pillow.svg    →  cat-pillow.webp
 *   cat-bedding.svg   →  cat-bedding.webp
 */

import Link from "next/link";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    label:    "床墊",
    labelEn:  "Mattress",
    href:     "/shop/category/mattress",
    imageSrc: "/brand/cat-mattress.svg",   // ← replace with real photo
    imageAlt: "Lunio Gen 4 石墨烯乳膠床墊 — 享受舒適深層睡眠",
    // Fallback background shown while image loads (or if placeholder)
    bgColor:  "#c8d8ee",
  },
  {
    label:    "枕頭",
    labelEn:  "Pillow",
    href:     "/shop/category/pillow",
    imageSrc: "/brand/cat-pillow.svg",     // ← replace with real photo
    imageAlt: "Lunio HyperCool 工學護頸枕 — 輕鬆入眠",
    bgColor:  "#bdd4ed",
  },
  {
    label:    "寢具配件",
    labelEn:  "Bedding",
    href:     "/shop/category/bedding",
    imageSrc: "/brand/cat-bedding.svg",    // ← replace with real photo
    imageAlt: "Lunio SnowWeave 智能天絲寢具 — 溫度調節科技",
    bgColor:  "#b5cde8",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function CategoryShowcase() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Three-column grid — stays 3 cols on all breakpoints */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3c7ae4] focus-visible:ring-offset-2 rounded-2xl md:rounded-3xl"
              aria-label={`${cat.label} — ${cat.labelEn}`}
            >
              {/* ── Card ───────────────────────────────────────────────── */}
              <div
                className="relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[3/4]"
                // Fallback colour visible while SVG/image loads
                style={{ backgroundColor: cat.bgColor }}
              >
                {/* Photo */}
                <Image
                  src={cat.imageSrc}
                  alt={cat.imageAlt}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1140px) 33vw, 380px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  // SVG placeholders don't need blur; swap to placeholder="blur"
                  // + blurDataURL once you have real WebP files.
                />

                {/* Gradient: ensures button is always readable over any photo */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.10) 40%, transparent 65%)",
                  }}
                />

                {/* ── Floating pill button ───────────────────────────── */}
                <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 inset-x-0 flex justify-center pointer-events-none">
                  <span
                    className="
                      inline-flex items-center justify-center
                      bg-[#3c7ae4] text-white
                      rounded-full
                      font-medium tracking-[1px] sm:tracking-[2px]
                      transition-all duration-200
                      group-hover:bg-[#2e6ad4] group-hover:scale-105 group-hover:shadow-lg
                      whitespace-nowrap
                      text-[11px] sm:text-[13px] md:text-[15px]
                      px-4 sm:px-6 md:px-8
                      py-1.5 sm:py-2 md:py-2.5
                    "
                  >
                    {cat.label}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
