import Image from "next/image";

const TARGET = [
  "長時間坐著，想減輕背痛、需要支撐的人",
  "喜歡看書、追劇、或在沙發上放鬆的人",
  "有胃食道逆流困擾、需要抬高上半身的人",
  "喜歡柔軟又有支撐感靠枕的人",
];

const FONT = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

export function EmbraceTargetSection() {
  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#0f1b2d", ...FONT }}>
      <div className="max-w-[1200px] w-[90%] mx-auto">

        {/* Target audience */}
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "#fff" }}>
          適合族群
        </h2>
        <ul className="space-y-3 mb-16" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
          {TARGET.map((t) => (
            <li key={t} style={{ fontSize: "clamp(14px, 1.3vw, 16px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>{t}</li>
          ))}
        </ul>

        {/* Comparison */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "4rem" }}>
          <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(18px, 2vw, 28px)", color: "#fff" }}>
            Lunio Embrace 多功能擁抱枕與一般靠枕的差異
          </h2>
          <div className="relative w-full overflow-hidden rounded-2xl">
            <Image
              src="/embrance/Group-426.webp"
              alt="Embrace vs 一般靠枕比較"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
