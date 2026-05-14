import Image from "next/image";

const ACCENT = "#1B6DC1";
const FONT = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

const BLOCKS = [
  {
    img: "/moonlight/Product-image-Body-2-1_compressed.webp",
    imgLeft: true,
    title: "酷涼記憶層，整夜清爽包覆",
    lines: [
      "Nooz Moonlight Plus 的舒適核心",
      "記憶棉 x Cool Gel 冷凝膠",
      "",
      "躺下瞬間，床墊輕柔貼合曲線，釋放疲累與壓力",
      "同時帶來涼意，讓你一夜舒適，整晚好眠",
    ],
    gelIcon: true,
  },
  {
    img: "/moonlight/Product-image-Body-3-1_compressed.webp",
    imgLeft: false,
    title: "扎實支撐，帶著包覆減壓的溫柔",
    lines: [
      "喜歡硬床，也想感受溫柔服貼",
      "Moonlight Plus在活性碳支撐層上，加上冷凝記憶棉",
      "在穩固支撐中，帶著慢慢貼合的包覆感",
      "硬床，也能睡得舒適又貼身",
    ],
    gelIcon: false,
  },
  {
    img: "/moonlight/Product-image-Body-4-1_compressed.webp",
    imgLeft: true,
    title: "輕巧好搬，租屋也能舒適入睡",
    lines: [
      "Moonlight Plus 厚度 20 公分",
      "比一般 Lunio 床墊略薄",
      "體積輕巧，搬運更方便",
      "不論是租屋或客房，都能輕鬆擺放",
      "房子可能不是自己的",
      "但舒適的睡眠，完全屬於你",
    ],
    gelIcon: false,
  },
  {
    img: "/moonlight/Product-image-Body-5-1_compressed.webp",
    imgLeft: false,
    title: "會呼吸的透氣網布，涼爽好眠一整夜",
    lines: [
      "專利 SmartRest 透氣表布，就像自帶微型空調",
      "高效散熱排濕，減少悶熱與汗水",
      "柔軟細膩，貼膚舒適，讓整晚睡眠都清爽自在",
    ],
    gelIcon: false,
  },
] as const;

function TextContent({ block }: { block: typeof BLOCKS[number] }) {
  return (
    <>
      <h2
        className="font-semibold mb-4"
        style={{ fontSize: "clamp(16px, 1.8vw, 22px)", color: ACCENT, lineHeight: 1.35 }}
      >
        {block.title}
      </h2>
      <div className="space-y-1.5">
        {block.lines.map((line, j) =>
          line === "" ? (
            <div key={j} style={{ height: "0.6em" }} />
          ) : (
            <p key={j} style={{ fontSize: "clamp(13.5px, 1.1vw, 15px)", color: "#4b5563", lineHeight: 1.85 }}>
              {line}
            </p>
          )
        )}
      </div>
      {block.gelIcon && (
        <div className="mt-5">
          <Image
            src="/moonlight/冷凝膠icon.webp"
            alt="冷凝膠"
            width={80}
            height={80}
            className="object-contain rounded-full"
          />
        </div>
      )}
    </>
  );
}

export function MoonlightFeatureSection() {
  return (
    <section className="bg-white flex flex-col gap-3 md:gap-5" style={FONT}>
      {BLOCKS.map((block, i) => (
        <div key={i} className="bg-white">

          {/* Desktop */}
          <div className="hidden md:block relative py-16 lg:py-20 overflow-hidden">
            <div
              className="absolute inset-y-0"
              style={{ width: "58%", left: block.imgLeft ? "3%" : "auto", right: block.imgLeft ? "auto" : "3%" }}
            >
              <Image src={block.img} alt={block.title} fill className="object-cover" sizes="60vw" />
            </div>
            <div className="relative max-w-[1280px] w-[92%] mx-auto">
              <div
                className="bg-white p-10 lg:p-12"
                style={{
                  width: "clamp(300px, 46%, 540px)",
                  marginLeft: block.imgLeft ? "auto" : undefined,
                  marginRight: block.imgLeft ? undefined : "auto",
                  border: "1px solid #e8e8e8",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
                }}
              >
                <TextContent block={block} />
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
              <Image src={block.img} alt={block.title} fill className="object-cover" sizes="100vw" />
              <div
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, #fff)" }}
              />
            </div>
            <div
              className="-mt-6 mx-4 relative z-10 bg-white px-6 pt-6 pb-8"
              style={{ borderRadius: "20px 20px 16px 16px", boxShadow: "0 -2px 20px rgba(0,0,0,0.06)" }}
            >
              <div className="w-8 h-1 rounded-full bg-gray-200 mx-auto mb-5" />
              <TextContent block={block} />
            </div>
          </div>

        </div>
      ))}
    </section>
  );
}
