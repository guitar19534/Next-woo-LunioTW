import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StoreCarousel } from "@/components/our-story/StoreCarousel";
import { MilestonesTimeline } from "@/components/our-story/MilestonesTimeline";

export const metadata: Metadata = {
  title: "Our Story｜Lunio Taiwan",
  description: "Lunio 品牌故事 — 從月球飛來的床墊，用最真誠的睡眠科學為你打造最好的夜晚。",
  alternates: { canonical: "/our-story" },
};

const BLUE   = "#3B82F6";
const NAVY   = "#3d4f7c";
const DARK   = "#3a4d7a";


const FEATURES = [
  { icon: "/our-story/icon-優質原料床墊.webp",      label: "優質天然原料" },
  { icon: "/our-story/icon-全方位服貼支撐床墊.webp", label: "全身服貼支撐" },
  { icon: "/our-story/icon-符合人體工學床墊.webp",   label: "符合人體工學" },
  { icon: "/our-story/icon-涼爽透氣床墊.webp",       label: "涼感透氣散熱" },
];

const PRODUCTS = {
  "床墊": [
    { name: "Signature 旗艦床墊", href: "#" },
    { name: "乳膠床墊 Gen4",      href: "/product/lunio-latex-mattress" },
    { name: "乳膠獨立筒床墊 Quantum", href: "/product/lunio-quantum" },
    { name: "Nooz 床墊系列",      href: "/product/nooz-helix" },
  ],
  "枕頭": [
    { name: "天然乳膠枕",         href: "/product/pillows" },
    { name: "Mercury 石墨烯機能記憶枕", href: "/product/lunio-mercury" },
    { name: "Nebula 經典記憶枕",  href: "/product/lunio-nebula" },
    { name: "Butterfly 蝴蝶枕",   href: "/product/nooz-butterfly" },
  ],
  "好眠寢具": [
    { name: "防水保潔墊",         href: "/product/lunio-protector" },
    { name: "天絲床包組",         href: "/product/tencel-bedsheet" },
  ],
};

const FONT_DISPLAY = { fontFamily: "'Nunito', 'MiSansTC', sans-serif" };
const FONT_BODY    = { fontFamily: "'MiSansTC', 'Noto Sans TC', sans-serif" };

export default function OurStoryPage() {
  return (
    <main style={FONT_BODY}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&display=swap');
        .story-title { font-family: 'Nunito', cursive; font-weight: 900; letter-spacing: -0.01em; }
      `}</style>

      {/* ── 1. SLEEP WITH ME ─────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1200px] w-[90%] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h1 className="story-title mb-3" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: NAVY }}>
              SLEEP WITH ME
            </h1>
            <p className="font-bold mb-6" style={{ fontSize: "clamp(16px, 1.6vw, 20px)", color: BLUE }}>
              和我一起睡是為了更好的夜晚
            </p>
            <div className="space-y-3 mb-8 text-center md:text-left" style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "#555", lineHeight: 1.9 }}>
              <p>拖著疲憊身軀，我從月球飛行了 384,400 公里終於到達地球。<br />
              當我遇到這張 Lunio 床墊，就像回到家裡睡覺一樣舒服，我立刻就睡著了。<br />
              眼睛睜開，我與一張陌生的臉孔進行了眼神交流，你是誰？是我的新家人嗎？<br />
              「你看起來很累，我想邀請你睡在我的床上，<br />
              他們設計了一層厚厚的舒適層，你可以安心依偎在上面。」</p>
              <p>最新科技打造的機能乳膠床墊，專為台灣人而設計，全方位的服貼支撐你的全身。<br />
              我相信你會像漂浮在月球上一樣舒服睡著，讓你每天都想快點回家陪我！</p>
            </div>
            <Link href="/blog"
              className="inline-flex px-7 py-3.5 rounded-full font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: BLUE, fontSize: 15 }}>
              Lunio 床墊品牌內幕大公開
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full" style={{ maxWidth: 480 }}>
              <Image src="/our-story/關於Lunio-sleep-on-me-for-a-better-night.webp"
                alt="Sleep on me for a better night" width={480} height={480}
                className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. I WILL GO TO YOU ──────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#f5e8d8" }}>
        <div className="max-w-[1200px] w-[90%] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="flex justify-center">
            <Image src="/our-story/關於Lunio-包辦製造生產及運送到客人家-desktop.webp"
              alt="Lunio 包辦製造生產及運送" width={560} height={280}
              className="w-full h-auto" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="story-title mb-3" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", color: NAVY }}>
              I WILL GO TO YOU
            </h2>
            <p className="font-bold mb-2" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "#6b7280" }}>我好喜歡我的家族成員</p>
            <p className="font-bold mb-6" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: BLUE }}>這樣的溫暖讓我想起我遠在月球的媽媽</p>
            <div className="space-y-4 mb-8" style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "#555", lineHeight: 1.9 }}>
              <p>我們家每位成員都非常有才華，研究人員、生理學家、設計團隊互相合作，結合石墨烯 + 100%天然乳膠，打造了機能乳膠床墊。</p>
              <p>我其實是想告訴你，睡在 Lunio 床上就像睡在我的背上安心</p>
            </div>
            <Link href="/product/lunio-latex-mattress"
              className="inline-flex px-7 py-3.5 rounded-full font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: BLUE, fontSize: 15 }}>
              像睡在兔子背上舒服的乳膠床
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. LUNIO MILESTONES ──────────────────────────────────── */}
      <section style={{ backgroundColor: "#4a5878", overflow: "hidden" }}>
        <div className="grid md:grid-cols-2 items-stretch">
          {/* Left — illustration fills height */}
          <div className="flex items-end justify-center" style={{ minHeight: 420, padding: "40px 0 0" }}>
            <Image src="/our-story/關於Lunio團隊專家.webp" alt="Lunio 團隊"
              width={580} height={500} className="w-full h-auto object-contain" style={{ maxHeight: 500 }} />
          </div>

          {/* Right — title + timeline */}
          <div className="flex flex-col justify-center px-8 md:px-12 py-12">
            <h2 className="story-title mb-0" style={{ fontSize: "clamp(32px, 4vw, 56px)", color: "#fff" }}>
              Lunio Milestones
            </h2>
            <MilestonesTimeline />
          </div>
        </div>
      </section>

      {/* ── 4. BETTER SLEEP FOR YOU ──────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1200px] w-[90%] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="story-title mb-3" style={{ fontSize: "clamp(30px, 4vw, 52px)", color: NAVY }}>
              Better Sleep for You
            </h2>
            <p className="font-bold mb-6" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: BLUE }}>
              不只讓你「睡得著」，更要你「睡得好」
            </p>
            <p className="mb-8" style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "#555", lineHeight: 1.9 }}>
              我們持續進化每一代產品，只為打造更好睡的床墊和枕頭 高品質不該昂貴，而是人人能負擔 因為好睡眠，是每個人都該有的幸福
            </p>
          </div>
          {/* Video thumbnail */}
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"
            className="relative block overflow-hidden rounded-2xl group"
            style={{ aspectRatio: "16/9" }}>
            <Image src="/our-story/VDO-Brand-01.webp" alt="品牌總監親自揭密" fill
              className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="50vw" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,30,30,0.9)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── 5. THIS WAY PLEASE ───────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#f5f7fb" }}>
        <div className="max-w-[1200px] w-[90%] mx-auto grid md:grid-cols-[300px_1fr] gap-10 md:gap-16 items-start">
          <div>
            <Image src="/our-story/Lunio門市.webp" alt="Lunio 門市" width={160} height={160} className="object-contain mb-4" />
            <p className="font-bold italic mb-4" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", color: NAVY, lineHeight: 1.6 }}>
              "Come experience what made<br />the rabbit fall in love"
            </p>
            <p style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "#6b7280", lineHeight: 1.8 }}>
              別光看！來摸摸我、躺躺看<br />
              花個 10 分鐘，讓我們更認識彼此<br />
              激盪出不一樣火花
            </p>
          </div>
          <div>
            <h2 className="story-title mb-6" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: NAVY }}>
              This Way Please
            </h2>
            <StoreCarousel />
            <div className="mt-6 text-center">
              <Link href="/storefront#booking"
                className="inline-flex px-6 py-3 rounded-full font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: BLUE, fontSize: 14 }}>
                預約門市試躺
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PRODUCT SHOWCASE ──────────────────────────────────── */}
      <section>
        <div className="grid md:grid-cols-2">
          {/* Left — hero image */}
          <div className="relative" style={{ minHeight: 400 }}>
            <Image src="/our-story/Our-story-footer-w840.webp" alt="I will not wait for you at the Milky Way" fill
              className="object-cover object-center" sizes="50vw" />
          </div>

          {/* Right */}
          <div className="flex flex-col">
            {/* Top — white */}
            <div className="flex-1 bg-white px-8 py-10 md:px-12 md:py-12">
              <p className="text-center mb-8" style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "#555", lineHeight: 1.9 }}>
                我不會在銀河等你，而是在你的家裡。<br />讓我陪你一起度過每夜晚吧！<br />
                <span style={{ color: "#9ca3af" }}>– Lunio</span>
              </p>
              <div className="grid grid-cols-4 gap-4">
                {FEATURES.map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-2 text-center">
                    <Image src={f.icon} alt={f.label} width={56} height={56} className="object-contain" />
                    <p style={{ fontSize: 12, color: "#6b7280" }}>{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Bottom — dark blue */}
            <div className="px-8 py-8 md:px-12 md:py-10" style={{ backgroundColor: DARK }}>
              <div className="grid grid-cols-3 gap-6">
                {Object.entries(PRODUCTS).map(([cat, items]) => (
                  <div key={cat}>
                    <p className="font-bold mb-3" style={{ fontSize: 14, color: "#fff" }}>{cat}</p>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item.name}>
                          <Link href={item.href}
                            className="flex items-center gap-1.5 text-sm hover:underline"
                            style={{ color: "rgba(255,255,255,0.7)", fontSize: 12.5 }}>
                            <span style={{ color: "#f5a000" }}>›</span> {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
