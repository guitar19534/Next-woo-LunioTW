import Image from "next/image";

const NAVY = "#17284b";

const LAYERS = [
  {
    num: "1",
    title: "第一層：CoolRest 涼感記憶層（減壓/軟）",
    desc: "記憶棉結合涼感凝膠，完美支撐身體曲線，放鬆減壓，散熱涼爽。",
  },
  {
    num: "2",
    title: "第二層：CloudComfort 超高支撐層（支撐/硬）",
    desc: "使用高密度泡棉，扎實支撐有彈性，均勻分散全身體重。",
  },
  {
    num: "3",
    title: "第三層：SmartRest 透氣床罩（可水洗）",
    desc: "床罩採用透氣材料，有效排出熱量和濕氣，保持床墊乾爽清新舒適。床罩可水洗，建議採用低溫手洗或機洗，洗完於通風處陰乾即可。不可烘乾、熨燙、漂白。",
  },
];

export function SmartrestLayerSection() {
  return (
    <section style={{ backgroundColor: "#EBF4FF", padding: "clamp(48px,5vw,72px) 0" }}>
      <div className="max-w-[1140px] w-[90%] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Layer image */}
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/topper-smartrest/nooz-topper-smartrest_05.png"
              alt="Nooz SmartRest Flip Topper 3層結構"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </div>

          {/* Layer descriptions */}
          <div className="space-y-7">
            <h2 className="font-bold leading-snug" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: NAVY }}>
              Nooz SmartRest Flip Topper 翻轉床墊 3層結構
            </h2>
            {LAYERS.map((layer) => (
              <div key={layer.num} className="flex gap-4 items-start">
                <div
                  className="shrink-0 flex items-center justify-center rounded-full font-bold text-white"
                  style={{ width: 28, height: 28, backgroundColor: "#3B82F6", fontSize: 13, marginTop: 2 }}
                >
                  {layer.num}
                </div>
                <div>
                  <p className="font-bold mb-1.5" style={{ fontSize: 15, color: NAVY }}>{layer.title}</p>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75 }}>{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
