import Image from "next/image";

const SLEEP_POSITIONS = [
  { label: "仰睡", img: "/nebula/Group-346.webp" },
  { label: "趴睡", img: "/nebula/Group-347.webp" },
  { label: "側睡", img: "/nebula/Group-348.webp" },
];

const TARGET = [
  "頸肩腰背疼痛者",
  "淺眠、不易入睡的人",
  "白天容易疲勞、容易倦怠的人",
  "睡覺常翻身、睡姿不穩的人",
  "喜歡記憶棉柔軟和緊實觸感的人",
  "喜歡涼爽睡眠的人",
];

const NEBULA_PROS = [
  "觸感柔軟舒適，敏感肌也適用",
  "穩定支撐，減壓不塌陷",
  "符合現代設計感，灰色光澤又耐髒",
  "材質通過國際無毒認證，使用安心",
];

const GENERIC_CONS = [
  "枕頭太高或太低",
  "容易肩頸酸痛或落枕",
  "睡到半夜悶熱出汗",
  "睡姿不穩，常翻身睡不好",
];

const FONT = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

export function NebulaSleepSection() {
  return (
    <div style={{ backgroundColor: "#0f1b2d", ...FONT }}>

      {/* Target audience */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#fff" }}>
            適合對象
          </h2>
          <div className="grid grid-cols-3 gap-8 mb-12 max-w-[900px] mx-auto">
            {SLEEP_POSITIONS.map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-2">
                <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3", backgroundColor: "#1e2d42" }}>
                  <Image src={p.img} alt={p.label} fill className="object-cover" sizes="(max-width:768px) 33vw, 240px" />
                </div>
                <p style={{ fontSize: "clamp(11px, 1vw, 13px)", color: "rgba(255,255,255,0.7)" }}>{p.label}</p>
              </div>
            ))}
          </div>
          <ul className="space-y-2.5" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
            {TARGET.map((t) => (
              <li key={t} style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* VS Comparison */}
      <section className="py-14 md:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <h2 className="text-center font-bold mb-14" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#fff" }}>
            與其他枕頭比較
          </h2>
          <div className="space-y-12">
            {/* Nebula */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-bold mb-4" style={{ fontSize: "clamp(15px, 1.5vw, 19px)", color: "#fff" }}>Nebula 經典記憶枕</p>
                <ul className="space-y-2.5">
                  {NEBULA_PROS.map((p) => (
                    <li key={p} className="flex items-start gap-2.5" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.85)" }}>
                      <span style={{ color: "#16a34a", flexShrink: 0, fontSize: 16 }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/nebula/Lunio-Hybrid-Nebula-Pillow00005.webp" alt="Nebula 經典記憶枕" fill className="object-contain" sizes="50vw" />
              </div>
            </div>
            {/* VS */}
            <div className="text-center">
              <span className="font-bold" style={{ fontSize: 28, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>VS</span>
            </div>
            {/* Generic */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-bold mb-4" style={{ fontSize: "clamp(15px, 1.5vw, 19px)", color: "#fff" }}>一般枕頭</p>
                <ul className="space-y-2.5">
                  {GENERIC_CONS.map((c) => (
                    <li key={c} className="flex items-start gap-2.5" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.85)" }}>
                      <span style={{ color: "#dc2626", flexShrink: 0, fontSize: 16 }}>✗</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/nebula/Other-Compare (1).webp" alt="一般枕頭" fill className="object-contain" sizes="50vw" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
