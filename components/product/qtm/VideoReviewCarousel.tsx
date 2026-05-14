"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function VideoCard({ v }: { v: typeof VIDEOS[number] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="block">
      {/* Thumbnail / Player */}
      <div
        className="relative w-full overflow-hidden rounded-xl mb-4 cursor-pointer"
        style={{ aspectRatio: "16 / 9" }}
        onClick={() => setPlaying(true)}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
          />
        ) : (
          <>
            <Image
              src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
              alt={v.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: "rgba(255,0,0,0.75)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
      <p className="mb-1" style={{ fontSize: "13px", color: "#888" }}>{v.product}</p>
      <p className="font-bold mb-2" style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "#fff", lineHeight: 1.3 }}>{v.title}</p>
      <div className="flex mb-3" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
      <div className="space-y-0.5">
        {v.desc.map((line, i) => (
          <p key={i} style={{ fontSize: "13px", color: "#888", lineHeight: 1.7 }}>{line}</p>
        ))}
      </div>
    </div>
  );
}

const VIDEOS = [
  {
    id: "kzSkVGrTJ1w",
    product: "Lunio Quantum Max",
    title: "誰才是真正的陳晨威？",
    desc: ["最近球迷圈大震撼", "有人發現球場上同時出現兩個", "「陳晨威」身高、臉蛋、打擊速度一模一樣，但有一個", "關鍵瞬間識破誰是假的"],
  },
  {
    id: "kJag4iM7NDU",
    product: "Lunio Quantum Max",
    title: "房思瑜挑戰全新升級床墊",
    desc: ["房思瑜換上全新升級床墊", "睡眠體驗全面升級", "效果究竟有多驚喜", "一起來看看吧！"],
  },
  {
    id: "cg8QcoqbzYM",
    product: "Lunio Gen4",
    title: "康哥 VS 啦啦隊 結果怎麼樣？",
    desc: ["一邊是長期肩頸痠痛的康哥教練", "一邊是天天跳舞的啦啦隊", "Lunio Gen4，能不能讓他們", "都一夜好眠？"],
  },
  {
    id: "LHqCS4Xgd7c",
    product: "Lunio Gen4",
    title: "驚險刺激，康哥殘酷的高空測試",
    desc: ["康宗康從10公尺高空", "丟塞鈴到 Lunio Gen4 石墨烯乳膠床墊上", "床上的水杯居然屹立不倒", "到底是怎麼做到的？"],
  },
  {
    id: "z1QQhmNmm-0",
    product: "Lunio Signature",
    title: "維恩差點與老公分房了？",
    desc: ["長久的困擾，讓維恩差點和老公分房", "最後靠著 Lunio Signature挽救夫妻關係", "怎麼做到的？", "背後暖心故事揭曉"],
  },
  {
    id: "Zw6XsnsuMmA",
    product: "Lunio Gen4",
    title: "浩角翔起，6樓高空水球大挑戰",
    desc: ["將水球從6樓高空丟到床墊上", "猜猜看哪個床墊的水球不會破？", "驚人測試現在揭曉"],
  },
];

export function VideoReviewCarousel() {
  const [start, setStart] = useState(0);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    function update() { setPerPage(window.innerWidth < 768 ? 1 : 3); }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const visible = VIDEOS.slice(start, start + perPage);
  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(VIDEOS.length - perPage, s + 1));

  return (
    <section style={{ backgroundColor: "#0d1520" }} className="py-14 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-medium mb-1" style={{ fontSize: "clamp(15px, 1.8vw, 18px)", color: "#aaa" }}>
            會相遇是種緣份
          </p>
          <p className="font-medium" style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#ccc" }}>
            謝謝你，始終如一的信任
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">

          {/* Left arrow */}
          {start > 0 && (
            <button type="button" onClick={prev} aria-label="上一個"
              className="absolute -left-5 top-[35%] -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
            </button>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visible.map((v) => (
              <VideoCard key={v.id} v={v} />
            ))}
          </div>

          {/* Right arrow */}
          {start < VIDEOS.length - 3 && (
            <button type="button" onClick={next} aria-label="下一個"
              className="absolute -right-5 top-[35%] -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M9 18l6-6-6-6" /></svg>
            </button>
          )}

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: VIDEOS.length - perPage + 1 }).map((_, i) => (
              <button key={i} type="button" onClick={() => setStart(i)} aria-label={`頁面 ${i + 1}`}
                className="rounded-full transition-all duration-200"
                style={{ width: i === start ? "20px" : "8px", height: "8px", backgroundColor: i === start ? "#fff" : "rgba(255,255,255,0.3)" }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
