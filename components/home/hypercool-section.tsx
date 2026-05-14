/**
 * BrandStory — Section 4: Brand Introduction
 *
 * Layout (top → bottom, all center-aligned):
 *   Eyebrow · H2 heading
 *   Large lifestyle photo  (full container width, 16:9, rounded-3xl)
 *   Prose text block       (max-w-[700px] for comfortable reading)
 *     ① Opening quote  — dark navy, slightly larger
 *     ② Pain points    — gray body text
 *     ③ Solution       — gray body + bold navy keywords
 *     ④ Specs line     — bold blue key-spec tokens
 *   CTA link button
 *
 * ─── Replacing the placeholder image ────────────────────────────────────────
 *  Drop your photo at:  /public/images/brand/brand-story.webp  (recommended)
 *  Then change imageSrc below to "/images/brand/brand-story.webp"
 *  and add  placeholder="blur" blurDataURL="<your-tiny-preview>"
 *  to the <Image> element.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Image from "next/image";
import { HypercoolFeatures, HypercoolPricing } from "@/components/product/hypercool/HypercoolShowcase";

const imageSrc = "/hypercool/hypercool.webp";


export function HypercoolSection() {
  return (
    <section className="bg-white py-12 md:py-16">

      {/* ── Section Opener Heading ──────────────────────────────────────── */}
      <div className="text-center overflow-hidden">
        <p
          className="font-bold mb-4"
          style={{ color: "#17569E", fontSize: "clamp(18px, 2.5vw, 30px)", fontFamily: "'Chiron Goround TC', sans-serif", letterSpacing: "0.3em" }}
        >
          智能工學護頸枕
        </p>
        <p
          aria-hidden
          className="font-bold select-none leading-none"
          style={{
            fontSize: "clamp(36px, 10vw, 100px)",
            fontFamily: "'Chiron Goround TC', sans-serif",
            fontWeight: 200,
            color: "#e8eaed",
            letterSpacing: "0.05em",
          }}
        >
          HYPERCOOL
        </p>
      </div>

      {/* ── Image + Text — shared container ─────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

        {/* Image */}
        <div
          className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl mb-10 md:mb-12"
          style={{ aspectRatio: "16 / 9" }}
        >
          <Image
            src={imageSrc}
            alt="Lunio 不只關心你的脊椎，也在意脖子的舒適感"
            fill
            priority={false}
            sizes="(max-width: 1320px) 100vw, 1280px"
            className="object-contain object-center"
          />
        </div>

        {/* Text — aligned to same edges as the image */}
        <div className="text-left" style={{ color: "#5F6062", fontSize: "clamp(15px, 1.8vw, 18px)", fontFamily: "'Chiron Goround TC', sans-serif", lineHeight: 2.0, letterSpacing: "0.03em" }}>

          <p className="mb-8">
            Lunio 不只關心你的脊椎，也在意脖子的舒適感
          </p>

          <p className="mb-8 whitespace-pre-line">
            {"無論你喜歡側睡、仰睡還是趴睡，每種姿勢對枕頭高度的需求都不同\nHyperCool 工學護頸枕採用中間低、兩側高的蝴蝶曲線，撐住肩頸的每一處懸空\n讓脖子不再緊繃酸痛，呼吸更順暢，睡得安心，也減少打鼾的小困擾"}
          </p>         
        </div>

      </div>

      {/* ── Feature Carousel ────────────────────────────────────────── */}
      <HypercoolFeatures />

      {/* ── Size & Pricing Tabs ─────────────────────────────────────── */}
      <HypercoolPricing />

    </section>
  );
}
