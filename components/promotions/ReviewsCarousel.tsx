"use client";
import { useState } from "react";
import Image from "next/image";

const BLUE = "#3c7ae4";
const NAVY = "#17284b";

const REVIEWS = [
  {
    img: "/promotions/Jennifer-正在聽專人介紹Lunio-GEN3-PRO乳膠床墊.webp",
    name: "雅琢 Jennifer",
    text: "材質是泰國天然乳膠，能打擊蟎蟲細菌又抗過敏、透氣防潮不悶熱，最適合台灣氣候，這就是最吸引我的地方，加上我有不好入眠的困擾，這款吸震抗干擾，讓淺眠的不會被翻身噪音而打擾。",
  },
  {
    img: "/promotions/Linda-躺在lunio-gen3-pro乳膠床墊上.webp",
    name: "Linda カフェ巡り",
    text: "家裡的床墊已到達壽命最高年限(所以我一直在看床墊)，實測發現泰國天然乳膠床墊優點超多欸，特別是敏兒超需要，對抗塵蟎、細菌、哈啾問題，五段式機能讓床墊的耐用度更升級！",
  },
  {
    img: "/promotions/koc跟著阿芸趣體驗lunio乳膠床墊.webp",
    name: "跟著阿芸趣",
    text: "為了讓睡眠品質提升，我試過網路上許多方法，這才發現原來床墊、枕頭的透氣性很重要，在聽了朋友的分享後，決定去Lunio門市來試躺超多藝人、網紅都大大推薦的床墊！",
  },
  {
    img: "/promotions/koc-黑貓與他的鏟屎官體驗lunio乳膠床墊.webp",
    name: "黑貓與他的鏟屎官",
    text: "平時睡覺容易腰酸背痛，選擇Lunio的原因是朋友強烈推薦！(他說超好睡原本淺眠的人都可以睡過頭😂)加上自己親身去台北門市試躺後覺得很讚～趕快分享給你們",
  },
  {
    img: "/promotions/koc-我是爛主婦體驗lunio乳膠床墊.webp",
    name: "我是爛主婦",
    text: "長輩家中的舊獨立筒床墊無法帶來完善的支撐，容易塌陷睡不好，不但淺眠，且一覺醒來腰酸背痛，實在無法帶來充分的休息。朋友推薦我們可以到Lunio門市體驗，實際躺過才知道什麼是一款好的床墊！",
  },
];

export function ReviewsCarousel() {
  const [page, setPage] = useState(0);
  const total = REVIEWS.length;

  // Show 4 at a time on desktop, shift by 1
  const visible = [0, 1, 2, 3].map(i => REVIEWS[(page + i) % total]);

  return (
    <div>
      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginBottom: 32 }}>
        {visible.map((r, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              width: 140, height: 140, borderRadius: "50%", overflow: "hidden",
              margin: "0 auto 16px", border: "3px solid #e8edf8",
            }}>
              <Image src={r.img} alt={r.name} width={140} height={140}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: BLUE, marginBottom: 8 }}>{r.name}</p>
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.8 }}>{r.text}</p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        {REVIEWS.map((_, i) => (
          <button key={i} onClick={() => setPage(i)} aria-label={`第${i + 1}頁`}
            style={{
              width: 10, height: 10, borderRadius: "50%", border: "none", padding: 0, cursor: "pointer",
              background: i === page ? NAVY : "#ccd2de", transition: "background 0.2s",
            }} />
        ))}
      </div>
    </div>
  );
}
