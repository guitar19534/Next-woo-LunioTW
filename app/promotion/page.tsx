import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PromotionForm } from "@/components/promotions/PromotionForm";
import { FeaturesCarousel } from "@/components/promotions/FeaturesCarousel";
import { ReviewsCarousel } from "@/components/promotions/ReviewsCarousel";

export const metadata: Metadata = {
  title: { absolute: "領取特別優惠｜Lunio乳膠床墊 – 限量50名" },
  description: "登記享Lunio乳膠床墊特別優惠，專人聯絡協助購床，本週限量50名。100晚試睡保證，全台免費配送安裝。",
};

const BLUE = "#3c7ae4";
const NAVY = "#17284b";
const FONT = "'MiSansTC','Noto Sans TC',sans-serif";
const W = { maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" };

const PROMISES = [
  "全產品本島免運費",
  "15年塌陷保固",
  "舊床免費搬下樓",
  "3/6/12期分期零利率",
  "舊床回收優惠價$800",
  "專人售前售後服務",
];

const SLEEP_BENEFITS = [
  "改善腰疼背痛",
  "提升深層睡眠",
  "調整睡眠姿勢",
  "夜晚身心放鬆",
  "防蟎抗過敏源",
  "舒緩痠痛疲勞",
];

const FEATURES = [
  {
    img: "/promotions/Lunio-石墨烯精密吸震平衡系統®.webp",
    title: "Lunio 石墨烯精密吸震平衡系統®",
    desc: "業界最厚17.5公分石墨烯層，排出多餘的熱氣，是延長深度睡眠的關鍵因素",
  },
  {
    img: "/promotions/Lunio-Latex®-天然乳膠.webp",
    title: "Lunio Latex® 天然乳膠",
    desc: "採用天然乳膠並以黃金比例製成最佳躺感，軟硬適中是人體最適性",
  },
  {
    img: "/promotions/Lunio-4D-Air-Tex®-涼感天絲表布.webp",
    title: "太空科技溫控表布",
    desc: "冬暖夏涼，可自動調溫，減少熱到睡不著的情況",
  },
  {
    img: "/promotions/Kikoo-3D-恆溫冷凝記憶層®.webp",
    title: "3D 恆溫冷凝記憶層®",
    desc: "幫助排除熱氣及根據部位分部壓力點，使身體有效放鬆",
  },
];

export default function PromotionPage() {
  return (
    <main style={{ fontFamily: FONT, color: NAVY, background: "#fff" }}>

      {/* ── 1. HERO + FORM ───────────────────────────────────────────────── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "90vh" }}>
        {/* Left — hero image */}
        <div style={{ position: "relative", minHeight: 500 }}>
          <Image
            src="/promotions/Web_01.webp"
            alt="Lunio乳膠床墊"
            fill
            className="object-cover object-center"
            priority
            sizes="50vw"
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(23,40,75,0.25) 0%, transparent 60%)",
          }} />
          <div style={{ position: "absolute", top: "clamp(40px,6vw,72px)", left: "clamp(24px,5vw,60px)" }}>
            <h1 style={{
              fontSize: "clamp(22px,3.5vw,40px)", fontWeight: 800,
              color: BLUE, lineHeight: 1.3,
              textShadow: "0 2px 12px rgba(255,255,255,0.8)",
            }}>
              想擁有一覺好眠到天亮？
            </h1>
          </div>
        </div>

        {/* Right — form */}
        <div style={{
          padding: "clamp(40px,5vw,64px) clamp(32px,5vw,72px)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          background: "#fff",
        }}>
          <h2 style={{ fontSize: "clamp(18px,2vw,24px)", fontWeight: 800, color: NAVY, marginBottom: 16, textAlign: "center" }}>
            登記享【特別優惠】
          </h2>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.9, marginBottom: 8, textAlign: "center" }}>
            歡迎來到Lunio，如果您有購買乳膠床墊的需求，或想要更了解我們的床墊，請留下您的聯絡資訊，專人將會與您聯絡並提供協助，購床還能獲得
            <strong style={{ color: NAVY }}>🎁額外的特別優惠</strong>，不要錯過喔！
          </p>
          <p style={{ fontSize: 13, color: "#e53e3e", fontWeight: 700, marginBottom: 20, textAlign: "center" }}>
            本週限量50名，優惠即將送完，要搶要快！
          </p>
          <PromotionForm />
        </div>
      </section>

      {/* ── 2. STEPS ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(40px,5vw,64px) 0" }}>
        <div style={{ ...W, display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(12px,3vw,32px)", flexWrap: "wrap" }}>
          {[
            { img: null, icon: "📋", label: "登記表單" },
            { img: "/promotions/phone-call.webp", icon: null, label: "專人聯絡" },
            { img: null, icon: "🛏️", label: "購買床墊" },
            { img: "/promotions/gift-box.webp", icon: null, label: "特別優惠" },
          ].map((step, i) => (
            <div key={step.label} style={{ display: "flex", alignItems: "center", gap: "clamp(8px,2vw,24px)" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "linear-gradient(135deg, #d6e6ff 0%, #b8d0f8 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 10px",
                }}>
                  {step.img ? (
                    <Image src={step.img} alt={step.label} width={40} height={40} style={{ objectFit: "contain" }} />
                  ) : (
                    <span style={{ fontSize: 28 }}>{step.icon}</span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>{step.label}</p>
              </div>
              {i < 3 && (
                <span style={{ fontSize: 20, color: "#aac5f5", fontWeight: 300, marginBottom: 24 }}>
                  {i === 2 ? "+" : "→"}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. PROMO BANNER ──────────────────────────────────────────────── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxHeight: 320 }}>
        <div style={{
          background: "#c8b49a",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "clamp(32px,5vw,64px)",
        }}>
          <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>
            Lunio 春眠新生活方案
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)" }}>購床享有</p>
        </div>
        <div style={{ position: "relative", minHeight: 240 }}>
          <Image
            src="/promotions/Lunio-gen3-pro-乳膠床墊表面.webp"
            alt="Lunio床墊"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>
      </section>

      {/* ── 4. BENEFITS ──────────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(48px,6vw,80px) 0", background: "#fff" }}>
        <div style={{ ...W, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)" }}>
          {/* Left */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: BLUE, marginBottom: 28, textAlign: "center" }}>
              6 大承諾服務
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 20 }}>
              {PROMISES.map(p => (
                <li key={p} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 15, color: "#444" }}>
                  <span style={{ color: "#3c7ae4", fontSize: 18, flexShrink: 0 }}>✅</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          {/* Right */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: BLUE, marginBottom: 28, textAlign: "center" }}>
              6 大睡眠享受
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 20 }}>
              {SLEEP_BENEFITS.map(b => (
                <li key={b} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 15, color: "#444" }}>
                  <span style={{ color: "#c8a96e", fontSize: 18, flexShrink: 0 }}>💎</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. FEATURES ──────────────────────────────────────────────────── */}
      <section style={{ background: "#f4f6fb", padding: "clamp(48px,6vw,80px) 0" }}>
        <div style={W}>
          <h2 style={{ fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 800, color: NAVY, textAlign: "center", marginBottom: 40 }}>
            Gen4 的舒適感，就像睡在兔子背上一樣
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
            {/* Left — 2×2 grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#fff" }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{ padding: "24px 20px", borderBottom: "1px solid #f0f2f8", borderRight: "1px solid #f0f2f8" }}>
                  <div style={{ position: "relative", width: "100%", paddingBottom: "70%", marginBottom: 12, borderRadius: 10, overflow: "hidden", background: "#f8f9fc" }}>
                    <Image src={f.img} alt={f.title} fill className="object-cover" sizes="25vw" />
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: BLUE, marginBottom: 6, lineHeight: 1.4 }}>{f.title}</p>
                  <p style={{ fontSize: 12, color: "#666", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              ))}
            </div>
            {/* Right — carousel */}
            <FeaturesCarousel />
          </div>
        </div>
      </section>

      {/* ── 6. REVIEWS CAROUSEL ──────────────────────────────────────────── */}
      <section style={{ padding: "clamp(48px,6vw,80px) 0", background: "#fff" }}>
        <div style={W}>
          <h2 style={{ fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 800, color: NAVY, textAlign: "center", marginBottom: 40 }}>
            Why Lunio ｜ 為何躺過的都說好？
          </h2>
          <ReviewsCarousel />
        </div>
      </section>

      {/* ── 7. FINAL CTA ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: 480 }}>
        <Image
          src="/promotions/Web_02.webp"
          alt="乳膠床墊 特別優惠"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(23,40,75,0.35)" }} />
        <div style={{
          position: "relative", zIndex: 1, height: "100%", minHeight: 480,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 24px",
        }}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", letterSpacing: "0.2em", marginBottom: 12 }}>
            ── 立即擁有 ──
          </p>
          <h2 style={{ fontSize: "clamp(24px,4vw,44px)", fontWeight: 800, color: "#fff", marginBottom: 28, lineHeight: 1.3 }}>
            乳膠床墊 + 特別優惠
          </h2>
          <Link href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{
              display: "inline-block", padding: "14px 40px", borderRadius: 40,
              background: BLUE, color: "#fff", fontSize: 16, fontWeight: 700,
              textDecoration: "none", letterSpacing: "0.08em",
              boxShadow: "0 4px 20px rgba(60,122,228,0.4)",
            }}>
            登記享特別優惠
          </Link>
        </div>
      </section>

    </main>
  );
}
