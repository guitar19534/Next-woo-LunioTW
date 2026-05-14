import Image from "next/image";

const FONT = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

const TARGET = [
  "擔心床墊被飲料或液體弄髒者，Lunio SmartGuard™ 薄膜提供 100% 防水保護",
  "想兼顧防水與舒適者，透氣設計讓床墊保持涼爽乾爽",
  "睡覺常翻身或活動量大者，360° 彈性包覆，牢固不滑動、不起皺",
  "膚質敏感、家有小孩或長輩者，TENCEL™ 天絲親膚柔和、不刺激",
  "討厭傳統保潔墊塑膠聲音者，薄而柔軟的 TPU 膜安靜無聲",
  "需要天天使用者，即使潮濕夜晚，也能享受涼爽乾燥的舒眠",
];

const SMARTGUARD_PROS = [
  "100% 防水透氣：採用Lunio SmartGuard™ 薄膜，輕薄貼合又能透氣",
  "360° 全面包覆：四角牢固不移位，翻身也不滑動或皺折",
  "安靜無聲：柔軟 TPU 膜，翻身無噪音",
  "親膚柔軟：適合敏感肌、小孩與長輩",
  "透氣涼爽：防水也不悶熱，乾爽透氣",
];

const GENERIC_CONS = [
  "防水膜厚硬，塑膠感明顯，容易有摩擦聲",
  "鬆緊帶設計不完整，容易滑動、起皺",
  "布料粗糙僵硬，觸感不舒服",
  "翻身會發出噪音，影響睡眠",
  "防水但容易悶熱，鎖住濕氣",
];

export function SmartguardCompareSection() {
  return (
    <div style={{ backgroundColor: "#0f1b2d", ...FONT }}>

      {/* 適合對象 */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1000px] w-[90%] mx-auto">
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#fff" }}>適合對象</h2>
          <ul className="space-y-3">
            {TARGET.map((t) => (
              <li key={t} className="flex items-start gap-3" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.82)", lineHeight: 1.75 }}>
                <span style={{ color: "#3b82f6", flexShrink: 0, marginTop: 2 }}>•</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 產品比較 */}
      <section className="py-14 md:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <h2 className="text-center font-bold mb-14" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#fff" }}>產品比較</h2>
          <div className="space-y-14">

            {/* Lunio Smartguard */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-bold mb-5" style={{ fontSize: "clamp(14px, 1.4vw, 18px)", color: "#fff" }}>
                  Lunio Smartguard 智能防水保潔墊
                </p>
                <ul className="space-y-3">
                  {SMARTGUARD_PROS.map((p) => (
                    <li key={p} className="flex items-start gap-2.5" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
                      <span style={{ color: "#16a34a", flexShrink: 0, fontSize: 16, marginTop: 1 }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/smartguard/SmartGuard.webp" alt="Lunio Smartguard" fill className="object-contain" sizes="50vw" />
              </div>
            </div>

            <div className="text-center">
              <span className="font-bold" style={{ fontSize: 28, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>VS</span>
            </div>

            {/* 一般保潔墊 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-bold mb-5" style={{ fontSize: "clamp(15px, 1.5vw, 19px)", color: "#fff" }}>一般保潔墊</p>
                <ul className="space-y-3">
                  {GENERIC_CONS.map((c) => (
                    <li key={c} className="flex items-start gap-2.5" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
                      <span style={{ color: "#dc2626", flexShrink: 0, fontSize: 16, marginTop: 1 }}>✗</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/smartguard/Other.webp" alt="一般保潔墊" fill className="object-contain" sizes="50vw" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
