"use client";

import { useState } from "react";
import Image from "next/image";

const NAVY = "#17284b";
const BLUE = "#17569E";

const ICONS = [
  { src: "/topper-trifold/icon-Nooz-Trifold-Topper_01-r3im028qzzmttor9672tni1uqo4ydy12j5snn35jb4.png", label: "8公分雙層結構" },
  { src: "/topper-trifold/icon-Nooz-Trifold-Topper_02-r3im1rc9c7ygscai9fhknkmtcprta9rmfk77u2my2o.png", label: "舒適、支撐兼具" },
  { src: "/topper-trifold/icon-Nooz-Trifold-Topper_03-r3im2r24jxbd1iumguxeabmbxcvrerpf8gzo2l5zi8.png", label: "吸濕透氣" },
  { src: "/topper-trifold/icon-Nooz-Trifold-Topper_04-r3im3pu5ksmyz3g3trylckudwm4cbkjhp94mttqf40.png", label: "三折好收納" },
  { src: "/topper-trifold/icon-Nooz-Trifold-Topper_05-r3im4rfp662fvhxhq87o4bcto0z0vgor6f820w6o74.png", label: "布套可拆洗" },
  { src: "/topper-trifold/icon-Nooz-Trifold-Topper_06-r3iml3uo0gfxre6saak4h6vdj8espzkq3bm0g3y800.png", label: "底部止滑" },
];

const VIDEOS = [
  { videoId: "ee900WV3_jk" },
  { videoId: "xcm1qMXZ4o0" },
];

const USE_CASES = [
  { label: "鋪在床墊", desc: "提高床墊舒適度，睡眠更放鬆" },
  { label: "客房床墊", desc: "臨時加床好選擇，收納方便不佔空間，客人睡得舒服，家裡也不亂" },
  { label: "租屋族 / 宿舍學生", desc: "坐臥兩用適合小空間，搬家帶走也方便" },
  { label: "露營 / 車宿", desc: "輕巧好收納，展開就能睡，比睡袋更舒服" },
  { label: "瑜伽墊 / 遊戲墊", desc: "通過無毒驗證，厚實止滑，瑜伽、冥想、小孩遊戲也安心" },
];

function VideoCard({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl cursor-pointer shadow-md"
      style={{ aspectRatio: "16 / 9" }}
      onClick={() => setPlaying(true)}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title="video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt="video thumbnail" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full shadow-lg"
              style={{ width: 64, height: 64, backgroundColor: "rgba(255,0,0,0.85)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function TrifoldFeatureSection() {
  return (
    <>
      {/* ── 6 Feature Icons ─────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: "clamp(40px,4vw,60px) 0" }}>
        <div className="max-w-[1000px] w-[90%] mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {ICONS.map((icon) => (
              <div key={icon.label} className="flex flex-col items-center gap-3 text-center">
                <Image src={icon.src} alt={icon.label} width={80} height={80} className="object-contain" />
                <p style={{ fontSize: 13, color: BLUE, fontWeight: 500 }}>{icon.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Videos ──────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ paddingBottom: "clamp(48px,5vw,72px)" }}>
        <div className="max-w-[1100px] w-[90%] mx-auto">
          <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: NAVY }}>
            商品影片
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {VIDEOS.map((v, i) => <VideoCard key={i} videoId={v.videoId} />)}
          </div>
        </div>
      </section>

      {/* ── Lifestyle intro ──────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: "clamp(48px,5vw,72px) 0", borderTop: "1px solid #f0f4fa" }}>
        <div className="max-w-[1100px] w-[90%] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="font-bold" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: BLUE }}>
                Nooz FlexiRest Trifold Topper 三折疊日式床墊
              </h2>
              <p className="font-medium" style={{ fontSize: 15, color: NAVY }}>折疊 x 好攜帶 x 多功能</p>
              <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8 }}>
                輕巧不佔空間，不論居家、旅行、露營、車宿，都能享受舒適支撐
              </p>
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <Image src="/topper-trifold/sku_TriFold.jpg" alt="Nooz FlexiRest Trifold Topper" fill className="object-cover" sizes="(max-width:768px) 90vw, 45vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Folding steps ────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#f8faff", padding: "clamp(48px,5vw,72px) 0" }}>
        <div className="max-w-[1100px] w-[90%] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <Image src="/topper-trifold/Nooz-Trifold-Topper_14.jpg" alt="三折疊床墊使用方式" fill className="object-cover" sizes="(max-width:768px) 90vw, 45vw" />
            </div>
            <div className="space-y-4">
              <h2 className="font-bold text-center" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: NAVY }}>
                靈活多變，要躺、要坐都好用
              </h2>
              <p className="text-center" style={{ fontSize: 14.5, color: "#555" }}>攤開當床墊、二折當沙發、三折好收納</p>
              <p className="text-center" style={{ fontSize: 14.5, color: "#555" }}>小空間大幫手，特別適合小坪數房間</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 一墊多用 ─────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: "clamp(48px,5vw,72px) 0" }}>
        <div className="max-w-[1100px] w-[90%] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="space-y-5">
              <h2 className="font-bold" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: NAVY }}>
                一墊多用，讓舒適無所不在
              </h2>
              <ul className="space-y-3" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
                {USE_CASES.map((u) => (
                  <li key={u.label} style={{ fontSize: 14.5, color: "#444", lineHeight: 1.8 }}>
                    <span className="font-bold" style={{ color: NAVY }}>{u.label}</span>：{u.desc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "1/1.2" }}>
              <Image src="/topper-trifold/Nooz-Trifold-Topper_13.jpg" alt="一墊多用使用場景" fill className="object-cover" sizes="(max-width:768px) 90vw, 45vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature block 1: 柔軟貼合 ───────────────────────────────── */}
      <section style={{ backgroundColor: "#f8faff", padding: "clamp(48px,5vw,72px) 0" }}>
        <div className="max-w-[1100px] w-[90%] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <Image src="/topper-trifold/Nooz-Trifold-Topper_10.jpg" alt="柔軟貼合，穩定支撐" fill className="object-cover" sizes="(max-width:768px) 90vw, 45vw" />
            </div>
            <div className="space-y-4">
              <h2 className="font-bold" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: NAVY }}>
                柔軟貼合，穩定支撐，睡得舒適又安心
              </h2>
              <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.85 }}>
                告別一般薄床墊容易塌陷、滑動的困擾，享受放鬆的睡眠。
              </p>
              <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.85 }}>
                冰感記憶棉 × 高支撐泡棉，既能貼合身形，提供舒適包覆感，又具穩定支撐力，厚度直達8公分，能均勻分散體重，不易變形塌陷。
              </p>
              <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.85 }}>
                底部採用防滑設計，無論翻身或起床，床墊都能穩穩固定，不易移位。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature block 2: 透氣網布 ───────────────────────────────── */}
      <section className="bg-white" style={{ padding: "clamp(48px,5vw,72px) 0" }}>
        <div className="max-w-[1100px] w-[90%] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="font-bold" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: NAVY }}>
                會呼吸的透氣網布，涼爽好眠一整夜
              </h2>
              <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.85 }}>
                專利設計的 SmartRest 透氣床罩，就像自帶微型空調，高效散熱排濕，告別黏膩汗水，減少過敏原。柔軟細膩的親膚觸感，讓你享受更放鬆、更清新的夜晚。
              </p>
              <p style={{ fontSize: 14.5, color: "#555" }}>透氣床套可拆洗，清潔更方便。</p>
            </div>
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <Image src="/topper-trifold/Nooz-Trifold-Topper_11.jpg" alt="透氣網布涼爽好眠" fill className="object-cover" sizes="(max-width:768px) 90vw, 45vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature block 3: 輕鬆帶著走 ────────────────────────────── */}
      <section style={{ backgroundColor: "#f8faff", padding: "clamp(48px,5vw,72px) 0" }}>
        <div className="max-w-[1100px] w-[90%] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <Image src="/topper-trifold/Nooz-Trifold-Topper_12.jpg" alt="輕鬆帶著走" fill className="object-cover" sizes="(max-width:768px) 90vw, 45vw" />
            </div>
            <div className="space-y-4">
              <h2 className="font-bold" style={{ fontSize: "clamp(20px,2.2vw,26px)", color: NAVY }}>
                輕鬆帶著走，哪裡都能睡
              </h2>
              <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.85 }}>
                3×6尺標準單人床尺寸，除了放家裡或宿舍、也適合大部分的露營帳、休旅車空間。
              </p>
              <p style={{ fontSize: 14.5, color: "#555" }}>
                附收納手提袋，方便攜帶，防塵防髒。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
