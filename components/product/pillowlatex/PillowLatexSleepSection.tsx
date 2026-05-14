import Image from "next/image";

const SLEEP_POSITIONS = [
  { label: "仰睡", img: "/pillowlatex/Group-346.webp" },
  { label: "側睡", img: "/pillowlatex/Group-347.webp" },
  { label: "趴睡", img: "/pillowlatex/Group-348.webp" },
];

const TARGET = [
  "孩童有過敏體質的家庭",
  "睡覺常翻身、睡姿不穩的人",
  "睡覺怕熱、容易流汗的人",
  "肩頸容易緊繃、酸痛的人",
];

const LATEX_PROS = [
  "耐用壽命長，不易扁塌變形",
  "天然防蟎抗菌，有效隔絕過敏原",
  "Q彈扎實，支撐力十足",
  "通風不悶熱，整夜涼爽舒眠",
];

const GENERIC_CONS = [
  "壽命短，容易扁塌變形",
  "填充物滋生塵蟎，誘發過敏",
  "睡到半夜悶熱出汗",
];

const FONT = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

export function PillowLatexSleepSection() {
  return (
    <div style={{ backgroundColor: "#0f1b2d", ...FONT }}>
      <section className="py-14 md:py-20">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#fff" }}>適合對象</h2>
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

      <section className="py-14 md:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <h2 className="text-center font-bold mb-14" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#fff" }}>與其他枕頭比較</h2>
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-bold mb-4" style={{ fontSize: "clamp(14px, 1.4vw, 17px)", color: "#fff" }}>Lunio 天然乳膠枕</p>
                <ul className="space-y-2.5">
                  {LATEX_PROS.map((p) => (
                    <li key={p} className="flex items-start gap-2.5" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(255,255,255,0.85)" }}>
                      <span style={{ color: "#16a34a", flexShrink: 0, fontSize: 16 }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src="/pillowlatex/Lunio-Latex.webp" alt="Lunio 天然乳膠枕" fill className="object-contain" sizes="50vw" />
              </div>
            </div>
            <div className="text-center">
              <span className="font-bold" style={{ fontSize: 28, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>VS</span>
            </div>
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
                <Image src="/pillowlatex/Other-Compare (1).webp" alt="一般枕頭" fill className="object-contain" sizes="50vw" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
