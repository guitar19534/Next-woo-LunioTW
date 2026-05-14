"use client";

import { useState, useRef } from "react";

const MILESTONES = [
  { year: "2025", title: "桃園店開幕",     desc: "桃園成立第6家門市，進駐中路特區指標社區，擴大北台灣服務能量" },
  { year: "2024", title: "台南旗艦店開幕", desc: "成立第五家門市，擴大南台灣服務範圍（泰國門市擴展至38家）" },
  { year: "2023", title: "持續成長中",     desc: "新竹新生活概念館開幕！以兔子為吉祥物，彷彿依偎在兔子背上般舒服（泰國門市擴展至35家）" },
  { year: "2022", title: "高雄旗艦店開幕", desc: "為了滿足客人的心聲，第三家門市決定創立在高雄鼓山，為雲嘉南高屏地區的大家服務" },
  { year: "2021", title: "台中店開幕",     desc: "第二家門市創立於台中北屯，讓客人更方便來到Lunio（放眼亞太地區，進軍中國與柬埔寨）" },
  { year: "2020", title: "屢創佳績",       desc: "在台灣爆紅，達到月銷萬張，回購率更高達99%，睡過的都說好！" },
  { year: "2019", title: "Lunio正式登台",  desc: "從泰國前進台灣，在台北市大安路創建第一家門市，為台灣人帶來優質的舒眠體驗" },
  { year: "2018", title: "台灣初始概念館", desc: "第一間以「太空艙」為概念的床墊概念館，了解台灣人的睡眠愛好與問題" },
  { year: "2017", title: "品牌創立",       desc: "產品通過安全認證 CertiPUR-US, OEKO-TEX®, eco-INSTITUT, LGA, SGS等" },
];

const VISIBLE = 3;
const ORANGE = "#f5a000";

export function MilestonesTimeline() {
  const [start, setStart] = useState(0);
  const canPrev = start > 0;
  const canNext = start < MILESTONES.length - VISIBLE;

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(MILESTONES.length - VISIBLE, s + 1));

  const visible = MILESTONES.slice(start, start + VISIBLE);

  return (
    <div className="mt-10">
      {/* Timeline row */}
      <div className="relative flex items-center gap-0 mb-8 px-2">
        {/* Arrow left */}
        <button type="button" onClick={prev} disabled={!canPrev}
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white transition-opacity disabled:opacity-30"
          style={{ backgroundColor: ORANGE, fontSize: 18 }}>
          ‹
        </button>

        {/* Line + dots */}
        <div className="flex-1 relative flex items-center mx-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-0.5" style={{ backgroundColor: ORANGE }} />
          </div>
          <div className="relative flex justify-between w-full">
            {Array.from({ length: VISIBLE }).map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full transition-transform duration-300"
                style={{ backgroundColor: ORANGE, transform: "scale(1)" }} />
            ))}
          </div>
        </div>

        {/* Arrow right */}
        <button type="button" onClick={next} disabled={!canNext}
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white transition-opacity disabled:opacity-30"
          style={{ backgroundColor: ORANGE, fontSize: 18 }}>
          ›
        </button>
      </div>

      {/* Cards */}
      <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${VISIBLE}, 1fr)` }}>
        {visible.map((m) => (
          <div key={m.year} className="min-w-0">
            <p className="font-black mb-1.5" style={{ fontSize: 22, color: ORANGE, fontFamily: "'Nunito', sans-serif" }}>
              {m.year}
            </p>
            <p className="font-bold mb-2" style={{ fontSize: 15, color: "#fff", lineHeight: 1.4 }}>
              {m.title}
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", lineHeight: 1.75 }}>
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: MILESTONES.length - VISIBLE + 1 }).map((_, i) => (
          <button key={i} type="button" onClick={() => setStart(i)} aria-label={`Go to ${i}`}
            className="rounded-full transition-all duration-200"
            style={{ width: i === start ? 20 : 8, height: 8, backgroundColor: i === start ? ORANGE : "rgba(255,255,255,0.25)" }} />
        ))}
      </div>
    </div>
  );
}
