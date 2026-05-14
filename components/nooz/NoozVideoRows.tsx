"use client";

import { useState } from "react";
import Link from "next/link";

// TODO: แทน PLACEHOLDER ด้วย YouTube video IDs จริง
const ROWS = [
  {
    videoId: "PLACEHOLDER_V1",
    textLeft: false,
    label: "",
    title: "Nooz 床墊展示中心\n一起來看看三款床墊有什麼差異呢？",
    btn: null,
    bg: "#fff",
  },
  {
    videoId: "TuV1TUZOQig",
    textLeft: true,
    label: "",
    title: "美女主播蔡尚樺\n回家就像睡在5星級飯店一樣舒服",
    btn: { label: "享受五星躺感", href: "/product/nooz-helix" },
    bg: "#fff",
  },
  {
    videoId: "PLACEHOLDER_V3",
    textLeft: false,
    label: "",
    title: "久坐腰酸背痛？租屋舊床難睡？\n換張好床墊吧！",
    btn: { label: "改善腰酸背痛", href: "/product/nooz-sunset" },
    bg: "#fafafa",
  },
  {
    videoId: "T648SgZKeYA",
    textLeft: true,
    label: "",
    title: "義大利工藝技術\n每天享受奢華躺感",
    btn: { label: "臥室搖身變飯店", href: "/product/nooz-helix" },
    bg: "#fafafa",
  },
];

const BLUE = "#17569E";
const FONT = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

function VideoCard({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const isPlaceholder = videoId.startsWith("PLACEHOLDER");

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-md"
      style={{ aspectRatio: "16 / 9", cursor: isPlaceholder ? "default" : "pointer", backgroundColor: "#e5e7eb" }}
      onClick={() => { if (!isPlaceholder) setPlaying(true); }}
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
      ) : isPlaceholder ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">影片即將上線</div>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt="video thumbnail" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full shadow-lg"
              style={{ width: 64, height: 64, backgroundColor: "rgba(255,0,0,0.85)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function NoozVideoRows() {
  return (
    <div style={FONT}>
      {ROWS.map((row, i) => (
        <section key={i} className="py-12 md:py-16" style={{ backgroundColor: row.bg }}>
          <div className="max-w-[1200px] w-[90%] mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
              {/* Video */}
              <div className={row.textLeft ? "md:order-2" : "md:order-1"}>
                <VideoCard videoId={row.videoId} />
              </div>

              {/* Text */}
              <div className={`flex flex-col items-center justify-center text-center gap-4 ${row.textLeft ? "md:order-1" : "md:order-2"}`}>
                {row.title.split("\n").map((line, j) => (
                  <p key={j} className="font-bold leading-snug"
                    style={{ fontSize: "clamp(18px, 2.2vw, 28px)", color: "#17284b" }}>
                    {line}
                  </p>
                ))}
                {row.btn && (
                  <Link
                    href={row.btn.href}
                    className="mt-2 px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: BLUE, fontSize: 15 }}
                  >
                    {row.btn.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
