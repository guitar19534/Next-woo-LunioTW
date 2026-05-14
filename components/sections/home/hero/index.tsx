/**
 * Hero Section — full-viewport, dark background, background video.
 *
 * Loading strategy (no layout jump):
 *   1. Section always renders at min-h-screen with bg-[#17284b] (dark navy).
 *      This is the "skeleton" — zero flash, zero shift.
 *   2. <HeroVideo> (client component) fades the video in once buffered.
 *   3. All text / CTA content is server-rendered and visible immediately.
 *
 * Video file:  /public/brand/hero.mp4
 * Poster frame: /public/brand/hero-poster.webp  (add for best LCP score)
 */

import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { HeroVideo } from "./video";

export function Hero() {
  const { hero } = brandConfig;

  return (
    <section
      className="relative min-h-[110vh] flex items-center overflow-hidden bg-[#17284b]"
      // The bg colour is the loading placeholder — dark navy so no flash
    >
      {/* ── Background video (fades in once buffered) ──────────────────── */}
      <HeroVideo />


      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1140px] mx-auto px-5 sm:px-8 py-32 md:py-40 text-white text-center">
        <h1
          className="font-bold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(36px, 5.5vw, 60px)", letterSpacing: "1px" }}
        >
          {hero.title}
        </h1>

        <p
          className="text-white font-bold leading-relaxed mb-10 mx-auto"
          style={{ maxWidth: "520px", fontSize: "clamp(15px, 2vw, 18px)", letterSpacing: "1px" }}
        >
          {hero.subtitle}
        </p>

        {/* CTA Button */}
        <div className="flex items-center justify-center">
          <Link href={hero.ctaPrimary.href} className="btn-lunio">
            {hero.ctaPrimary.label}
          </Link>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.25))",
        }}
      />
    </section>
  );
}
