"use client";

import { useState } from "react";

// TODO: แทน PLACEHOLDER ด้วย YouTube video IDs จริง
const VIDEOS = [
  {
    id: "PLACEHOLDER_V1",
    product: "Lunio Quantum Max",
    title: "誰才是真正的陳晨威？",
    desc: ["最近球迷大震撼", "有人發現球場上同時出現兩個", "「陳晨威」身高、臉蛋、打擊速度一模一樣，但有一個", "關鍵瞬間識破誰是假的"],
  },
  {
    id: "PLACEHOLDER_V2",
    product: "Lunio Quantum Max",
    title: "房思瑜挑戰全新升級床墊",
    desc: ["房思瑜換上全新升級床墊", "睡眠體驗全面升級", "效果究竟有多驚喜", "一起來看看吧！"],
  },
  {
    id: "PLACEHOLDER_V3",
    product: "Lunio Gen4",
    title: "康哥 VS 啦啦隊 結果怎麼樣？",
    desc: ["一邊是長期肩頸疼痛的康哥教練", "一邊是天天跳舞的啦啦隊", "Lunio Gen4，能不能讓他們", "都一夜好眠？"],
  },
];

function VideoCard({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const isPlaceholder = id.startsWith("PLACEHOLDER");

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl cursor-pointer"
      style={{ aspectRatio: "16/9", backgroundColor: "#1a1a1a" }}
      onClick={() => { if (!isPlaceholder) setPlaying(true); }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen className="absolute inset-0 w-full h-full" style={{ border: "none" }}
        />
      ) : isPlaceholder ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">影片即將上線</div>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full shadow-xl"
              style={{ width: 56, height: 56, backgroundColor: "rgba(255,0,0,0.9)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function HyperCoolVideoGrid() {
  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: "#0a0a0a", fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" }}>
      <div className="max-w-[1280px] w-[90%] mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-bold" style={{ fontSize: "clamp(18px, 2.2vw, 28px)", color: "#fff" }}>會相遇是種緣份</p>
          <p style={{ fontSize: "clamp(14px, 1.6vw, 20px)", color: "#fff", marginTop: 4 }}>謝謝你，始終如一的信任</p>
        </div>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {VIDEOS.map((v) => (
            <div key={v.id} className="flex flex-col gap-3">
              <VideoCard id={v.id} title={v.title} />
              <div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{v.product}</p>
                <p className="font-semibold" style={{ fontSize: 15, color: "#fff", marginBottom: 4 }}>{v.title}</p>
                <div className="flex" style={{ color: "#f5a623", fontSize: 13 }}>{"★★★★★"}</div>
                {v.desc.map((line, i) => (
                  <p key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginTop: i === 0 ? 6 : 0 }}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
