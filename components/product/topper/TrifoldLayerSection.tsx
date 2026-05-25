import Image from "next/image";

const NAVY = "#17284b";

const LAYERS = [
  {
    label: "SmartRest 智眠透氣床罩",
    desc: "吸濕透氣，親膚舒適。",
  },
  {
    label: "CoolRest 冰感記憶層",
    desc: "貼合身形，釋放壓力，均勻散熱。",
  },
  {
    label: "FlexSupport高支撐層",
    desc: "穩定支撐，不易塌陷，均勻分散體重，開放式氣孔，告別悶熱。",
  },
  {
    label: "Anti-slip防滑墊",
    desc: "穩固防滑，不易移動，減少晃動干擾。",
  },
];

export function TrifoldLayerSection() {
  return (
    <section style={{ background: "linear-gradient(135deg, #2bcfcf 0%, #5be6d0 40%, #a8f0e8 100%)", padding: "clamp(48px,5vw,72px) 0" }}>
      <div className="max-w-[1140px] w-[90%] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Layer diagram image */}
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/topper-trifold/Nooz-Trifold-Topper_02.jpg"
              alt="Nooz FlexiRest Trifold Topper 床墊結構"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </div>

          {/* Layer descriptions */}
          <div className="space-y-5">
            <h2 className="font-bold leading-snug" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: NAVY }}>
              Nooz FlexiRest Trifold Topper 三折疊日式床墊結構
            </h2>
            {LAYERS.map((layer) => (
              <p key={layer.label} style={{ fontSize: 14.5, color: "#1a3a2a", lineHeight: 1.75 }}>
                <span className="font-bold">{layer.label}：</span>{layer.desc}
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
