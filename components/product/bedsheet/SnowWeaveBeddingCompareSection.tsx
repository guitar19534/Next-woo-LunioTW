import Image from "next/image";

const FONT = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

const TARGET = [
  "喜愛柔軟奢華寢具的人：享受絲綢般滑順觸感，打造飯店級睡眠體驗",
  "重視臥室美感的人：床包彈性服貼，包覆平整無皺摺，簡約單色設計，提升床墊視覺美感",
  "睡在冷氣房的人：涼感溫和，享受舒適的涼爽好眠",
  "怕熱或容易流汗的人：天絲能有效調節體溫與濕氣，告別半夜熱醒",
  "注重潔淨衛生的使用者：天絲天然抗菌抗異味，天天都像新洗過一樣清新",
  "敏感肌、幼童或長輩：TENCEL™ 天絲纖維製程環保無毒，安全親膚不刺激",
];

const SNOWWEAVE_PROS = [
  "一觸即涼：天絲纖維可瞬間吸濕散熱",
  "高效透氣：搭載 SmartClimate™ 科技，透氣排濕，減少悶熱",
  "絲緞般柔滑觸感：比絲網更親膚，輕盈奢華",
  "敏感肌也安心：溫和不刺激，嬰幼兒與長輩皆能安心使用",
  "抑菌抗臭：天絲具備天然抗菌特性，可抑菌減少霉味",
];

const GENERIC_CONS = [
  "缺乏涼感：常需要搭配冷氣或電扇使用，減少悶熱",
  "不夠透氣：睡久容易流汗悶熱",
  "布料粗厚僵硬：觸感不佳，影響睡眠舒適度",
  "敏感肌不適合：部分還含化學殘留，對幼童或長輩不友善",
  "缺乏天然抑菌：容易滋生異味與細菌",
];

export function SnowWeaveBeddingCompareSection() {
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

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-bold mb-5" style={{ fontSize: "clamp(14px, 1.4vw, 18px)", color: "#fff" }}>
                  Lunio Snow Weave 智能天絲床包組（床包+枕套）
                </p>
                <ul className="space-y-3">
                  {SNOWWEAVE_PROS.map((p) => (
                    <li key={p} className="flex items-start gap-2.5" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
                      <span style={{ color: "#16a34a", flexShrink: 0, fontSize: 16, marginTop: 1 }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/snowweave-bedding/Snow-Weave2.webp" alt="Lunio Snow Weave" fill className="object-contain" sizes="50vw" />
              </div>
            </div>

            <div className="text-center">
              <span className="font-bold" style={{ fontSize: 28, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>VS</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-bold mb-5" style={{ fontSize: "clamp(15px, 1.5vw, 19px)", color: "#fff" }}>一般床包</p>
                <ul className="space-y-3">
                  {GENERIC_CONS.map((c) => (
                    <li key={c} className="flex items-start gap-2.5" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
                      <span style={{ color: "#dc2626", flexShrink: 0, fontSize: 16, marginTop: 1 }}>✗</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/snowweave-bedding/Snowsilk1.webp" alt="一般床包" fill className="object-contain" sizes="50vw" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
