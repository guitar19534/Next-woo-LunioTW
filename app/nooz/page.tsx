import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { NoozHeroSlider } from "@/components/nooz/NoozHeroSlider";
import { NoozVideoRows } from "@/components/nooz/NoozVideoRows";
import { NoozReviewCarousel } from "@/components/nooz/NoozReviewCarousel";
import { NoozPreFooter } from "@/components/shared/NoozPreFooter";

export const metadata: Metadata = {
  title: "NOOZ 床墊品牌｜Lunio Taiwan",
  description: "NOOZ 系列床墊 — Helix 乳膠獨立筒、Sunset Pro 乳膠床墊、Moonlight Plus 記憶床墊。全台免費配送，享 10 年保修。",
  alternates: { canonical: "/nooz" },
};

const FONT = "'MiSansTC','Noto Sans TC',sans-serif";
const BLUE = "#17569E";
const NAVY = "#17284b";

// ── Products data ─────────────────────────────────────────────────────────────
const MATTRESSES = [
  {
    img: "/images/nooz/sku_Helix_compressed.webp",
    title: "Nooz Helix 乳膠獨立筒床墊",
    orig: "NT$11,590",
    price: "NT$4,720",
    features: ["結合天然乳膠＋獨立筒", "服貼身體曲線，釋放壓力", "五星級飯店躺感"],
    btn: "購買Helix床墊",
    href: "/product/nooz-helix",
  },
  {
    img: "/images/nooz/sku_Sunset-Pro_compressed.webp",
    title: "Nooz Sunset Pro乳膠床墊",
    orig: "NT$11,900",
    price: "NT$4,720",
    features: ["天然乳膠＋活性碳支撐層", "防蟎抗菌、觸感Q彈", "加強腰部支撐"],
    btn: "購買Sunset Pro床墊",
    href: "/product/nooz-sunset",
  },
  {
    img: "/images/nooz/sku_Moonlight-Plus_compressed.webp",
    title: "NOOZ Moonlight Plus記憶床墊",
    orig: "NT$8,900",
    price: "NT$3,672",
    features: ["恆溫冷凝記憶膠", "前所未有涼感透氣", "非常適合怕熱的你"],
    btn: "購買Moonlight Plus床墊",
    href: "/product/nooz-moonlight",
  },
  {
    img: "/images/nooz/sku_Topper_compressed.webp",
    title: "Nooz SmartRest Flip Topper 翻轉床墊",
    orig: "NT$4,725",
    price: "NT$1,890",
    features: ["雙面翻轉，軟硬任選", "升級舊床墊躺感和壽命", "放和室、宿舍也好睡"],
    btn: "購買Topper 翻轉床墊",
    href: "#",
  },
  {
    img: "/images/nooz/sku_TriFold_compressed.webp",
    title: "Nooz FlexiRest Trifold Topper 三折疊日式床墊",
    orig: "NT$8,970",
    price: "NT$2,990",
    features: ["三折疊設計，收納搬運都方便", "一墊多用，居家、露營、車宿都好用", "附提袋，好搬又防髒"],
    btn: "購買三折疊日式床墊",
    href: "#",
  },
];

const PILLOWS = [
  {
    img: "/images/nooz/sku_Butterfly_compressed.webp",
    title: "Nooz Ergo Butterfly 蝶形記憶枕",
    orig: "NT$1,770",
    price: "NT$590",
    pricePrefix: "1入只要",
    features: ["蝶形曲線支撐", "側睡、仰睡都好睡", "竹纖維枕套"],
    btn: "購買蝶形記憶枕",
    href: "/product/nooz-butterfly",
  },
];

const SERVICES = [
  { icon: "/images/nooz/icon/icon-10-year-guarantee.webp",        label: "享10年保修"    },
  { icon: "/images/nooz/icon/icon-free-move-old-mattress.webp",   label: "免費舊床協助"  },
  { icon: "/images/nooz/icon/icon-packing-3_4-w500.webp",         label: "捲包床易安裝"  },
  { icon: "/images/nooz/icon/icon-free-delivery-4_3.webp",        label: "本島免費配送"  },
  { icon: "/images/nooz/icon/icon-favorable-price-4_3.webp",      label: "原廠直售更實惠" },
];


// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ p, wide }: { p: typeof MATTRESSES[number] & { pricePrefix?: string }; wide?: boolean }) {
  return (
    <div className="flex flex-col" style={{ fontFamily: FONT }}>
      {/* Image */}
      <Link href={p.href}>
        <div className="relative w-full overflow-hidden rounded-2xl bg-gray-50" style={{ aspectRatio: "4/3" }}>
          <Image src={p.img} alt={p.title} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      </Link>

      {/* Content */}
      <div className="pt-4 flex flex-col flex-1">
        <Link href={p.href}>
          <h3 className="font-semibold mb-1 hover:underline" style={{ fontSize: "clamp(14px, 1.3vw, 17px)", color: BLUE, lineHeight: 1.35 }}>
            {p.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          {p.pricePrefix && <span style={{ fontSize: 13, color: "#6b7280" }}>{p.pricePrefix}</span>}
          {!p.pricePrefix && <span style={{ fontSize: 13, color: "#6b7280" }}>只要</span>}
          <span className="line-through" style={{ fontSize: 13, color: "#9ca3af" }}>{p.orig}</span>
          <span className="font-bold" style={{ fontSize: 16, color: NAVY }}>{p.price} 起</span>
        </div>

        {/* Features */}
        <ul className="space-y-1 mb-4 flex-1">
          {p.features.map((f) => (
            <li key={f} className="flex items-start gap-1.5" style={{ fontSize: 13.5, color: "#4b5563" }}>
              <span style={{ color: BLUE, marginTop: 2 }}>▪</span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={p.href}
          className="inline-block px-6 py-2.5 rounded-full text-white font-semibold text-center hover:opacity-90 transition-opacity"
          style={{ backgroundColor: BLUE, fontSize: 14 }}
        >
          {p.btn}
        </Link>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function NoozPage() {
  return (
    <main style={{ fontFamily: FONT }}>

      {/* ── Hero Slider ─────────────────────────────────────────────── */}
      <NoozHeroSlider />

      {/* ── 床墊系列 ────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <h2 className="font-bold mb-8" style={{ fontSize: "clamp(18px, 2vw, 26px)", color: NAVY }}>
            Nooz床墊系列
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MATTRESSES.map((p) => <ProductCard key={p.title} p={p} />)}
          </div>
        </div>
      </section>

      {/* ── 枕頭系列 ────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <h2 className="font-bold mb-8" style={{ fontSize: "clamp(18px, 2vw, 26px)", color: NAVY }}>
            Nooz枕頭系列
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PILLOWS.map((p) => <ProductCard key={p.title} p={p as typeof MATTRESSES[number] & { pricePrefix?: string }} />)}
          </div>
        </div>
      </section>

      {/* ── Video zigzag rows ────────────────────────────────────────── */}
      <NoozVideoRows />

      {/* ── Take the NOOZ ───────────────────────────────────────────── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#f0f0f0" }}>
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/images/nooz/Body-image-Helix_compressed.webp"
                alt="Take the NOOZ from the Box"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold" style={{ fontSize: "clamp(22px, 3vw, 40px)", color: NAVY }}>Take the NOOZ</p>
              <p className="font-bold" style={{ fontSize: "clamp(22px, 3vw, 40px)", color: NAVY }}>Take it from &quot;The Box&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service bar ─────────────────────────────────────────────── */}
      <section className="py-8 md:py-10" style={{ backgroundColor: "#eef2ee" }}>
        <div className="max-w-[1100px] w-[92%] mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
            {SERVICES.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-3 text-center">
                <div className="relative" style={{ width: 52, height: 52 }}>
                  <Image src={s.icon} alt={s.label} fill className="object-contain" sizes="52px" />
                </div>
                <p style={{ fontSize: 13, color: "#4b5563" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product banner ──────────────────────────────────────────── */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-[1000px] w-[92%] mx-auto">
          <Link href="/nooz#mattresses">
            <Image
              src="/images/nooz/Footer-image-SKUs-clarification_02_compressed.webp"
              alt="NOOZ 全系列床墊"
              width={1000}
              height={600}
              className="w-full h-auto rounded-2xl"
            />
          </Link>
        </div>
      </section>

      {/* ── Review section ──────────────────────────────────────────── */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "#f8f8f8" }}>
        <div className="max-w-[1200px] w-[90%] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Left: text */}
            <div className="text-center md:text-left">
              <p className="font-bold mb-1" style={{ fontSize: "clamp(22px, 3vw, 38px)", color: NAVY }}>+100,000 用戶好評回饋</p>
              <p className="font-bold mb-1" style={{ fontSize: "clamp(22px, 3vw, 38px)", color: NAVY }}>更好的睡眠質量</p>
              <p style={{ fontSize: 15, color: "#6b7280" }}>這是真實的用戶評論！</p>
            </div>

            {/* Right: review carousel */}
            <NoozReviewCarousel />

          </div>
        </div>
      </section>

      {/* ── Store section (reuse from Helix/Sunset/Moonlight pages) ── */}
      <NoozPreFooter productName="NOOZ 系列床墊" productHref="/nooz" />

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
        <Image
          src="/images/nooz/Footer-image-Sunset.webp"
          alt="找到適合你的床墊"
          fill
          className="object-cover object-center"
          style={{ zIndex: 0 }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(255,255,255,0.88) 45%, rgba(255,255,255,0.2) 100%)", zIndex: 1 }}
        />
        <div
          className="absolute inset-0 flex items-center"
          style={{ zIndex: 2 }}
        >
          <div className="max-w-[1200px] w-[85%] mx-auto">
            <div className="flex flex-col gap-4 max-w-md">
              <h2 className="font-bold" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: NAVY }}>
                你找不到適合的床墊嗎？
              </h2>
              <p style={{ fontSize: 15, color: "#4b5563" }}>
                每個人都需要休息，讓我們協助你找到適合你的床墊吧
              </p>
              <div>
                <Link
                  href="#"
                  className="inline-block px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: BLUE, fontSize: 14 }}
                >
                  開始聊天
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
