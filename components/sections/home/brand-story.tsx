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

import Link from "next/link";
import Image from "next/image";

// ── Swap this to a local path once the real photo is ready ──────────────────
const imageSrc =
  "/images/brand/brand-story.webp";
// Final path: "/images/brand/brand-story.webp"

// ─── Inline helpers for rich typography ──────────────────────────────────────

/** Keyword highlighted in primary blue + semibold */
function Kw({ children }: { children: React.ReactNode }) {
  return (
    <strong style={{ color: "#17284b", fontWeight: 700 }}>
      {children}
    </strong>
  );
}

/** Keyword highlighted in primary blue */
function Blue({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: "#3c7ae4", fontWeight: 600 }}>
      {children}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BrandStory() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">

        {/* ── Heading ─────────────────────────────────────────────── */}
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-bold mx-auto"
            style={{
              fontFamily: "'Chiron Goround TC', sans-serif",
              color: "#17284b",
              maxWidth: "680px",
              lineHeight: 1.35,
              letterSpacing: "0.02em",
            }}
          >
            讓身體在睡眠中安靜修復
          </h2>
        </div>

        {/* ── Main image ──────────────────────────────────────────── */}
        <div
          className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl mb-12 md:mb-16"
          style={{ aspectRatio: "16 / 9" }}
        >
          <Image
            src={imageSrc}
            alt="在 Lunio Gen 4 石墨烯乳膠床墊上安然熟睡的生活照 — 讓身體在夜晚深層修復"
            fill
            priority={false}
            sizes="(max-width: 1200px) 100vw, 1140px"
            className="object-cover"
          />
        </div>

        {/* ── Prose content ───────────────────────────────────────── */}
        <div
          className="mx-auto text-left"
          style={{ maxWidth: "1200px" }}
        >
          {/* ① Opening quote */}
          <p
            className="mb-7"
            style={{
              fontSize: "clamp(17px, 2.2vw, 20px)",
              fontWeight: 600,
              color: "#17284b",
              lineHeight: 1.85,
              letterSpacing: "0.03em",
            }}
          >
            「關心你 80 歲時的脊椎，似乎有點管太寬，<br className="hidden sm:inline" />
            但 Lunio 就是忍不住。」
          </p>

          {/* Thin divider */}
          <div
            className="mx-auto mb-7"
            style={{ width: "40px", height: "2px", backgroundColor: "#3c7ae4", borderRadius: "2px" }}
          />

          {/* ② Pain points */}
          <p
            className="mb-6"
            style={{
              fontSize: "16px",
              color: "#5F6062",
              lineHeight: 2.0,
              letterSpacing: "0.04em",
            }}
          >
            關心你 80 歲時的脊椎似乎有點管太寬，但 Lunio 就是忍不住<br />
            </p>
          <p            
            className="mb-6"
            style={{
              fontSize: "16px",
              color: "#5F6062",
              lineHeight: 2.0,
              letterSpacing: "0.04em",
            }}
            >
            淺眠、悶熱、腰酸背痛，錯誤的床墊影響你的睡眠健康<br />
            Lunio 與骨科醫師合作，針對台灣氣候與東方人體型，打造出一套專屬的<br />
            「深夜修復系統」<br />
          </p>
           <p            
            className="mb-6"
            style={{
              fontSize: "16px",
              color: "#5F6062",
              lineHeight: 2.0,
              letterSpacing: "0.04em",
            }}
            >
            100% 天然乳膠 結構升級 × 精準承托，釋放日間累積壓力，回到深層放鬆狀態<br />
            石墨烯 × 德國 KIKOO × 四倍太空科技 維持整夜穩定舒適的睡眠溫度<br />
            細緻親膚面料，溫柔包覆，打造更完整的睡眠體驗<br />
          </p>
           <p            
            className="mb-6"
            style={{
              fontSize: "16px",
              color: "#5F6062",
              lineHeight: 2.0,
              letterSpacing: "0.04em",
            }}
            >
            從床墊、枕頭到配件，都擁有國際安全無毒認證，讓你睡得更安心<br />
            今晚，把身體交給 Lunio，在沉穩的睡眠中療癒身心，舒緩疲憊，醒來的每一天<br />
            都是最好的自己<br />
          </p>

          {/* ③ Solution */}
          <p
            className="mb-6"
            style={{
              fontSize: "16px",
              color: "#5F6062",
              lineHeight: 2.0,
              letterSpacing: "0.04em",
            }}
          >
            Lunio 與{" "}
            <Kw>骨科醫師</Kw>
            {" "}聯手，歷經三年研發出專屬亞洲人體型的{" "}
            <Kw>深層修復系統</Kw>。
            我們不只打造一張床墊——而是一套讓你的身體在每個夜晚
            真正安靜下來、由內而外深層修復的{" "}
            <Blue>睡眠科學</Blue>。
          </p>

          {/* ④ Specs */}
          <p
            className="mb-10"
            style={{
              fontSize: "15px",
              color: "#5F6062",
              lineHeight: 2.0,
              letterSpacing: "0.04em",
            }}
          >
            核心材質&ensp;
            <Blue>100% 天然乳膠</Blue>
            <span style={{ color: "#ccc", margin: "0 8px" }}>×</span>
            <Blue>石墨烯導熱技術</Blue>
            <span style={{ color: "#ccc", margin: "0 8px" }}>×</span>
            <Blue>德國 KIKOO 側邊支撐</Blue>
            <span style={{ color: "#ccc", margin: "0 8px" }}>×</span>
            <Blue>四倍太空科技緩壓層</Blue>
          </p>

          {/* CTA */}
          <Link
            href="/pages/about"
            className="btn-outline inline-flex items-center gap-2"
          >
            了解品牌故事
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
