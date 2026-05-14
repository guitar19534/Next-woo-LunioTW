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
import { Gen4Features, Gen4Pricing } from "@/components/product/gen4/Gen4Showcase";

const imageSrc = "/images/brand/brand-story.webp";


export function Gen4Section() {
  return (
    <section className="bg-white py-12 md:py-16">

      {/* ── Heading ─────────────────────────────────────────────── */}
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8 text-center mb-8 md:mb-10">
        <h2
          className="font-bold mx-auto"
          style={{
            fontFamily: "'Chiron Goround TC', sans-serif",
            color: "#515f8a",
            fontSize: "clamp(26px, 3.5vw, 40px)",
            lineHeight: 1.35,
            letterSpacing: "0.02em",
          }}
        >
          讓身體在睡眠中安靜修復
        </h2>
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
            alt="在 Lunio Gen 4 石墨烯乳膠床墊上安然熟睡的生活照 — 讓身體在夜晚深層修復"
            fill
            priority={false}
            sizes="(max-width: 1320px) 100vw, 1280px"
            className="object-contain object-center"
          />
        </div>

        {/* Text — aligned to same edges as the image */}
        <div className="text-left" style={{ color: "#5F6062", fontSize: "clamp(15px, 1.8vw, 18px)", fontFamily: "'Chiron Goround TC', sans-serif", lineHeight: 2.0, letterSpacing: "0.03em" }}>

          <p className="mb-8">
            關心你 80 歲時的脊椎似乎有點管太寬，但 Lunio 就是忍不住
          </p>

          <p className="mb-8">
            淺眠、悶熱、腰酸背痛，錯誤的床墊影響你的睡眠健康<br />
            Lunio 與骨科醫師合作，針對台灣氣候與東方人體型，打造出一套專屬的<br />
            「深夜修復系統」
          </p>

          <p className="mb-8">
            100% 天然乳膠 結構升級 × 精準承托，釋放日間累積壓力，回到深層放鬆狀態<br />
            石墨烯 × 四倍太空科技 維持整夜穩定舒適的睡眠溫度<br />
            細緻親膚面料，溫柔包覆，打造更完整的睡眠體驗
          </p>

          <p className="mb-10">
            從床墊、枕頭到配件，都擁有國際安全無毒認證，讓你睡得更安心<br />
            今晚，把身體交給 Lunio，在沉穩的睡眠中療癒身心，舒緩疲憊，醒來的每一天<br />
            都是最好的自己
          </p>

          
        </div>

      </div>

      {/* ── Gen4 Mascot Block ────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-16 md:pt-24 text-center">

        <p
          className="mb-4 font-medium"
          style={{ color: "#515f8a", fontSize: "40px", fontFamily: "'Chiron Goround TC', sans-serif", fontWeight: 500, letterSpacing: "0.08em" }}
        >
          Gen4
        </p>

        <h3
          className="font-bold mb-5"
          style={{
            color: "#515f8a",
            fontSize: "clamp(30px, 7vw, 45px)",
            letterSpacing: "0.10em",
            lineHeight: 1.15,
          }}
        >
          石墨烯乳膠床墊
        </h3>

        <p
          className="mb-16"
          style={{
            color: "#b0b8c8",
            fontSize: "clamp(17px, 1.8vw, 26px)",
            letterSpacing: "0.10em",
          }}
        >
          撐住整晚，睡進深層
        </p>

        <div className="relative mx-auto" style={{ maxWidth: "720px" }}>
          <Image
            src="/images/brand/gen4-mascot.png"
            alt="Lunio Gen4 石墨烯乳膠床墊 — 撐住整晚睡進深層"
            width={720}
            height={672}
            className="w-full h-auto"
          />
        </div>

      </div>

      {/* ── Gen4 Video ──────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-8">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full rounded-2xl md:rounded-3xl"
        >
          <source src="/brand/gen4.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Gen4 Video Caption ──────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-4">
        <div style={{ color: "#5F6062", fontSize: "clamp(15px, 1.8vw, 18px)", fontFamily: "'Chiron Goround TC', sans-serif", lineHeight: 2.0, letterSpacing: "0.03em" }}>
          <p className="mb-0">
            <span style={{fontWeight: 700 }}>Gen4</span>
            {"  "}守護你的深層睡眠，也放過你的疲勞
          </p>
          <p className="mb-0">加厚乳膠 × 9 區支撐，貼合身形，軟硬適中，減輕腰酸背痛</p>
          <p className="mb-0">讓每一晚，都慢慢回到深層放鬆的狀態</p>
          <p>每天醒來，少一點疼痛，多一點自在</p>
        </div>
      </div>

      {/* ── Feature Carousel ────────────────────────────────────────── */}
      <Gen4Features />

      {/* ── Size & Pricing Tabs ─────────────────────────────────────── */}
      <Gen4Pricing />

    </section>
  );
}
