"use client";

import { useState } from "react";

const TABS = [
  {
    videoId: "DAt2oUXv-Wc",
    cover: "/gen4/tabvideo1.jpg",
    title: "什麼！買床墊還能這樣貼心？\nLunio 提供你4大VIP級專屬服務",
    content: [
      "Lunio 全部幫你想好了！我們不只有科技床墊",
      "還提供一套「完整、貼心、真正解決問題」的服務方案",
      "— 0% 分期12期｜輕鬆無壓入手好床",
      "— 全台免運費｜全台都能送到家",
      "— 幫你搬走舊床墊｜不必煩惱如何處理舊床",
      "— 免費床墊寄倉｜新家還沒好也OK",
    ],
  },
  {
    videoId: "8H_iBqPFSNA",
    cover: "/gen4/tabvideo2.jpg",
    title: "睡眠專家推薦！提供諮詢，幫你挑好床\n升級睡眠人生，就從Lunio門市體驗開始",
    content: [
      "如果你正在考慮換一張真正能 睡得好、睡得深的床墊 別再煩惱啦～",
      "讓 Lunio Bunny 睡眠專家",
      "親自為你推薦最適合的床墊！",
    ],
  },
  {
    videoId: "0GFRxkOxt-A",
    cover: "/gen4/tabvideo3.jpg",
    title: "揭開Lunio床墊特別好睡的秘密\n顛覆傳統睡眠革命",
    content: [
      "你值得睡得更好 因為每個精神飽滿的清晨",
      "都來自你對「選對床墊」的堅持 Lunio",
      "堅持嚴選天然材質 結合多道精密工藝製程",
      "只為打造一張真正能改善你生活的床墊",
    ],
  },
  {
    videoId: "L1Hjixw_DvA",
    cover: "/gen4/tabvideo4.jpg",
    title: "不是只要「睡得著」而是真正\n「睡得好」 Lunio 你的科技\n睡眠幫手",
    content: [
      "Lunio 就像會思考的床 用科技和設計陪你一夜好眠",
      "我們相信，睡眠不是日常 而是一種需要呵護的能力",
      "Lunio 不只是床墊 而是一套專為現代人設計的「睡眠升級系統」",
      "從設計、材質、製造到銷售 每一步都以你為核心",
      "讓你每晚都能真正放鬆而不是只是「躺著」",
    ],
  },
];

export function VideoTabSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  function selectTab(i: number) {
    if (i !== active) {
      setActive(i);
      setPlaying(false);
    }
  }

  const tab = TABS[active];

  return (
    <section style={{ backgroundColor: "#0d1520" }} className="py-14 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">

        {/* Title */}
        <h2 className="font-bold mb-10" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", color: "#fff" }}>
          好眠從這裡開始 "Lunio"
        </h2>

        <div className="flex flex-col-reverse md:grid md:grid-cols-[45fr_55fr] gap-8 md:gap-12 md:items-start">

          {/* Left — tab list */}
          <div className="space-y-5">
            {TABS.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectTab(i)}
                className="w-full text-left"
              >
                {/* Tab title */}
                <p
                  className="whitespace-pre-line mb-2 leading-snug"
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: i === active ? "#fff" : "#555",
                    borderLeft: i === active ? "3px solid #17569E" : "3px solid transparent",
                    paddingLeft: "12px",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.color = "#aaa"; }}
                  onMouseLeave={(e) => { if (i !== active) (e.currentTarget as HTMLElement).style.color = "#555"; }}
                >
                  {t.title}
                </p>

                {/* Tab content — only show for active */}
                {i === active && (
                  <div className="pl-4 space-y-1.5">
                    {t.content.map((line, j) => (
                      <p key={j} style={{ fontSize: "13px", color: "#999", lineHeight: 1.7 }}>{line}</p>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Right — YouTube video */}
          <div
            className="relative w-full overflow-hidden rounded-xl cursor-pointer"
            style={{ aspectRatio: "16 / 9" }}
            onClick={() => setPlaying(true)}
          >
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${tab.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={tab.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              />
            ) : (
              <>
                <img
                  src={tab.cover}
                  alt={tab.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#17569E" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
