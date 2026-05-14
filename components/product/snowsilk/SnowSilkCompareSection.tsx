import Image from "next/image";

const FONT = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

const TARGET = [
  "喜歡睡冷氣房，想要涼爽又不會太冷的人",
  "睡覺常翻身的人，想兩面都涼爽免翻面的族群",
  "情侶、夫妻共用，想整件均勻涼爽不搶被子的人",
  "敏感肌或有小孩的家庭，絲滑布料不會刺激皮膚",
  "喜歡絲滑觸感與奢華質感的人",
  "覺得其他涼感被太冷，想要剛剛好涼感的人",
];

const SNOWSILK_PROS = [
  "不必再翻找涼的一面，每一面都涼爽舒適",
  "睡覺常翻身、或是情侶夫妻共用的人，整條被子都能保持均勻涼爽",
  "布料滑順，觸感柔軟輕盈，細嫩肌膚或敏感肌都能安心使用",
];

const GENERIC_CONS = [
  "其他涼感被只有單面清涼，另一面則是普通布料，摸起來會偏熱或偏粗糙",
  "有些涼感被溫度太低，睡冷氣房會發抖，反而睡不好",
  "有些涼感被表面霧感重、帶塑膠感，觸感不佳",
];

export function SnowSilkCompareSection() {
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
                  Lunio Smart Snow Silk 智能涼被
                </p>
                <ul className="space-y-3">
                  {SNOWSILK_PROS.map((p) => (
                    <li key={p} className="flex items-start gap-2.5" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
                      <span style={{ color: "#16a34a", flexShrink: 0, fontSize: 16, marginTop: 1 }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/snowsilk/Snowsilk (1).webp" alt="Lunio SnowSilk" fill className="object-contain" sizes="50vw" />
              </div>
            </div>

            <div className="text-center">
              <span className="font-bold" style={{ fontSize: 28, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>VS</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-bold mb-5" style={{ fontSize: "clamp(15px, 1.5vw, 19px)", color: "#fff" }}>其他涼被</p>
                <ul className="space-y-3">
                  {GENERIC_CONS.map((c) => (
                    <li key={c} className="flex items-start gap-2.5" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
                      <span style={{ color: "#dc2626", flexShrink: 0, fontSize: 16, marginTop: 1 }}>✗</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/snowsilk/Snowsilk1.webp" alt="其他涼被" fill className="object-contain" sizes="50vw" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
