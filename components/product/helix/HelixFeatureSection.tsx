import Image from "next/image";

const BLOCKS = [
  {
    img: "/helix/Product-image-Body-2_compressed.webp",
    imgLeft: true,
    title: "Nooz Helix 乳膠獨立筒床墊",
    paras: [
      "我們將 NOOZ Helix 頂級毛覓表層設計像枕頭般躺感，以滿足客戶對柔軟舒適的需求。",
      "外觀看起來優雅具有現代感，海軍藍色調為床墊增添了獨特又有質感的外觀。",
      "面料的縫紉方法，也增強了床墊的柔軟舒適度。",
    ],
    charcoalIcon: true,
  },
  {
    img: "/helix/Product-image-Body-3_compressed.webp",
    imgLeft: false,
    title: "Nooz Helix，支撐與柔軟兼具",
    paras: [
      "100%天然乳膠，完美貼合人體曲線，幫助脊椎自然伸展，同時防蟎抗菌，呵護敏感肌膚，讓你安心享受每一晚。",
      "搭配高彈性的吸震獨立筒，即使翻身，也不會干擾枕邊人，睡眠更加安穩自在",
    ],
  },
  {
    img: "/helix/Product-image-Body-4_compressed.webp",
    imgLeft: true,
    title: "Nooz Helix 適合您嗎？",
    list: [
      "長期使用舊床或不適合的床墊後有酸痛問題的您",
      "淺眠容易受到枕邊人翻身影響的您",
      "喜歡柔軟又有彈性躺感的您",
      "有過敏體質，您需要有防蟎抗敏功能的床墊",
      "厭倦傳統床墊找尋高CP值床墊、喜歡嘗試先進技術和現代設計的您",
    ],
  },
  {
    img: "/helix/Product-image-Body-5_compressed.webp",
    imgLeft: false,
    title: "感受腰部的溫柔支撐",
    paras: [
      "特別設計的冷凝記憶層，貼合腰椎曲線，給下背部額外的支撐。躺下瞬間，腰部被柔軟包覆，壓力逐漸釋放，整晚維持自然脊椎曲線，睡姿穩定更放鬆",
      "為長時間處在高壓緊繃狀態的你，找到放鬆的平衡",
    ],
  },
] as const;

const FONT = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

function TextContent({ block }: { block: typeof BLOCKS[number] }) {
  return (
    <>
      <h2 className="font-semibold mb-4" style={{ fontSize: "clamp(17px, 1.8vw, 24px)", color: "#17284b", lineHeight: 1.3 }}>
        {block.title}
      </h2>

      {'paras' in block && block.paras && (
        <div className="space-y-3.5">
          {block.paras.map((p, j) => (
            <p key={j} style={{ fontSize: "clamp(13.5px, 1.1vw, 15.5px)", color: "#4b5563", lineHeight: 1.9 }}>{p}</p>
          ))}
        </div>
      )}

      {'list' in block && block.list && (
        <ol className="space-y-2" style={{ paddingLeft: "1.2em", listStyleType: "decimal" }}>
          {block.list.map((item, j) => (
            <li key={j} style={{ fontSize: "clamp(13.5px, 1.1vw, 15.5px)", color: "#4b5563", lineHeight: 1.9 }}>{item}</li>
          ))}
        </ol>
      )}

      {'charcoalIcon' in block && block.charcoalIcon && (
        <div className="mt-5">
          <Image src="/helix/活性碳-icon.webp" alt="科技活性碳" width={80} height={80} className="object-contain rounded-full" />
        </div>
      )}
    </>
  );
}

export function HelixFeatureSection() {
  return (
    <section className="bg-white flex flex-col gap-3 md:gap-5" style={FONT}>
      {BLOCKS.map((block, i) => (
        <div key={i} className="bg-white">

          {/* ── Desktop: image absolute + floating card ── */}
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
                  width: "clamp(300px, 48%, 560px)",
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

          {/* ── Mobile: image full-width + card peeks from below ── */}
          <div className="md:hidden">
            {/* Image */}
            <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
              <Image src={block.img} alt={block.title} fill className="object-cover" sizes="100vw" />
              {/* Gradient fade at bottom for smooth card merge */}
              <div
                className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, #fff)" }}
              />
            </div>

            {/* Card peeks over image */}
            <div
              className="-mt-6 mx-4 relative z-10 bg-white px-6 pt-6 pb-8"
              style={{
                borderRadius: "20px 20px 16px 16px",
                boxShadow: "0 -2px 20px rgba(0,0,0,0.06)",
              }}
            >
              {/* Pull indicator */}
              <div className="w-8 h-1 rounded-full bg-gray-200 mx-auto mb-5" />
              <TextContent block={block} />
            </div>
          </div>

        </div>
      ))}
    </section>
  );
}
