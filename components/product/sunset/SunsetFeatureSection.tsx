import Image from "next/image";

const ACCENT = "#E07B2E";
const FONT = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

const BLOCKS = [
  {
    img: "/sunset/Product-image-Body-2-2_compressed.webp",
    imgLeft: true,
    title: "Sunset Pro的天然乳膠有多好？",
    lines: [
      "Sunset Pro 的乳膠層 Q 彈有力",
      "輕輕托住你的身形，卻不會陷下去",
      "翻身輕鬆順暢，整晚透氣乾爽",
      "怕熱又需要支撐的人，一躺就愛上",
      "想找到萬元以下的乳膠床",
      "Sunset Pro是你的唯一選擇",
    ],
    latexIcon: true,
  },
  {
    img: "/sunset/Product-image-Body-3-2_compressed.webp",
    imgLeft: false,
    title: "剛柔並濟，扎實又有彈性的舒適感",
    lines: [
      "喜歡硬床，也懂得留一點彈性給身體",
      "Sunset Pro在活性碳支撐層上，加了彈性的天然乳膠",
      "在扎實支撐中，帶著彈性與貼合，翻身更輕鬆",
      "硬床，也能睡得舒適自在",
    ],
    latexIcon: false,
  },
  {
    img: "/sunset/Product-image-Body-4-2_compressed.webp",
    imgLeft: true,
    title: "加強腰部支撐，不論胖瘦體型都好睡",
    lines: [
      "高彈乳膠搭配活性碳支撐層",
      "不管體型胖瘦，都能享受扎實又服貼的支撐感",
      "輕鬆將脊椎調整到最舒適的姿勢",
      "",
      "同時加強腰部支撐",
      "讓腰背充分伸展，舒緩整天累積的酸痛",
      "每一晚都能輕鬆入睡",
    ],
    latexIcon: false,
  },
  {
    img: "/sunset/Product-image-Body-5-2_compressed.webp",
    imgLeft: false,
    title: "會呼吸的透氣網布，涼爽好眠一整夜",
    lines: [
      "專利 SmartRest 透氣表布，就像自帶微型空調",
      "高效散熱排濕，減少悶熱與汗水",
      "柔軟細膩，貼膚舒適，讓整晚睡眠都清爽自在",
    ],
    latexIcon: false,
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
      {block.latexIcon && (
        <div className="mt-5">
          <Image
            src="/sunset/天然乳膠icon.webp"
            alt="天然乳膠"
            width={80}
            height={80}
            className="object-contain rounded-full"
          />
        </div>
      )}
    </>
  );
}

export function SunsetFeatureSection() {
  return (
    <section className="bg-white flex flex-col gap-3 md:gap-5" style={FONT}>
      {BLOCKS.map((block, i) => (
        <div key={i} className="bg-white">

          {/* ── Desktop: absolute image + floating card ── */}
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

          {/* ── Mobile: full-width image + card peek ── */}
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
