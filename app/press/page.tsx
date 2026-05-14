import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteCarousel } from "@/components/press/QuoteCarousel";

export const metadata: Metadata = {
  title: "媒體報導｜Lunio Taiwan",
  description: "各大媒體對Lunio乳膠床墊的報導與評論，蘋果日報、Yahoo新聞、三立新聞網等。",
  alternates: { canonical: "/press" },
};

const BLUE = "#3B82F6";
const NAVY = "#17284b";

const PRESS_CARDS = [
  {
    img: "/press/感受lunio乳膠床墊的親膚舒適.webp",
    media: "蘋果日報",
    title: "泰國熱銷No.1乳膠床品牌Lunio 樂謐臥無負擔促銷",
    href: "#",
  },
  {
    img: "/press/Lunio-GEN3-PRO-乳膠床墊1_compressed.webp",
    media: "Yahoo新聞",
    title: "躺過就回不去！泰國第一天然乳膠床墊Lunio樂謐臥，讓你一夜好眠",
    href: "#",
  },
  {
    img: "/press/中老年人腰酸.webp",
    media: "三立新聞網",
    title: "起床腰痠背痛？名醫揪原因 警示，嚴重會椎肩盤病變",
    href: "#",
  },
];

const ARTICLES = [
  { media: "Yahoo新聞",  title: "起床腰痠背痛？名醫揪原因、警示這事", href: "#" },
  { media: "中華新聞報", title: "泰國熱銷No.1乳膠床品牌Lunio 樂謐臥正式來台", href: "#" },
  { media: "翻爆",       title: "搶攻百億睡眠商機 泰國乳膠床品牌Lunio 樂謐臥正式來台", href: "#" },
];

export default function PressPage() {
  return (
    <main style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" }}>

      {/* ── Hero — 別人口中的 Lunio ──────────────────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <h1 className="text-center font-bold mb-10" style={{ fontSize: "clamp(24px, 3vw, 38px)", color: NAVY }}>
            別人口中的 Lunio
          </h1>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {PRESS_CARDS.map((c) => (
              <a key={c.media} href={c.href} target="_blank" rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl block"
                style={{ aspectRatio: "4/3" }}>
                <Image src={c.img} alt={c.title} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:640px) 100vw, 33vw" />
                {/* Overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center text-white">
                  <p className="font-bold mb-1" style={{ fontSize: 18 }}>{c.media}</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{c.title}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <Link href="/product/lunio-latex-mattress"
              className="inline-flex px-8 py-3.5 rounded-full font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: BLUE, fontSize: 15 }}>
              挑選適合你的Lunio床墊
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quote carousel ────────────────────────────────────────── */}
      <section className="bg-white py-14 md:py-16" style={{ borderTop: "1px solid #f3f4f6" }}>
        <div className="max-w-[1100px] w-[90%] mx-auto">
          <QuoteCarousel />
        </div>
      </section>

      {/* ── Article list (timeline) ───────────────────────────────── */}
      <section className="bg-white py-14 md:py-20" style={{ borderTop: "1px solid #f3f4f6" }}>
        <div className="max-w-[680px] w-[88%] mx-auto">
          <h2 className="font-bold mb-10 text-center" style={{ fontSize: "clamp(20px, 2vw, 28px)", color: NAVY }}>
            媒體報導
          </h2>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Line */}
            <div className="absolute left-3.5 top-2 bottom-2 w-px" style={{ backgroundColor: "#e5e7eb" }} />

            <div className="space-y-10">
              {ARTICLES.map((a) => (
                <div key={a.title} className="relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full border-2 bg-white flex items-center justify-center"
                    style={{ borderColor: BLUE }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BLUE }} />
                  </div>
                  <p className="font-semibold mb-1" style={{ fontSize: 15, color: BLUE }}>{a.media}</p>
                  <p className="mb-4" style={{ fontSize: 16, color: NAVY, lineHeight: 1.5 }}>{a.title}</p>
                  <a href={a.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex px-5 py-2 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: BLUE }}>
                    閱讀更多
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-14">
            <Link href="/storefront"
              className="inline-flex px-8 py-4 rounded-full font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: BLUE, fontSize: 15 }}>
              參觀Lunio門市
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
