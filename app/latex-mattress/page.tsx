import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LatexFAQ from "@/components/latex-mattress/LatexFAQ";
import MattressTabFilter from "@/components/mattress/MattressTabFilter";

export const metadata: Metadata = {
  title: "天然乳膠床墊推薦｜Q彈支撐，放鬆全身｜Lunio Taiwan",
  description:
    "Lunio的乳膠床墊，採用泰國100%純天然乳膠，通過國際安全認證，結合石墨烯散熱技術，提供高彈性、支撐性、透氣舒適的睡眠體驗。",
  alternates: { canonical: "/latex-mattress" },
};

const BLUE  = "#3c7ae4";
const NAVY  = "#17284b";
const GOLD  = "rgba(230,185,100,0.92)";

const W = { maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" };

/* ── Rating bar ─────────────────────────────────────────────────── */
function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 5 }}>{label}</p>
      <div style={{ background: "#e4e8f0", borderRadius: 4, height: 10, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: BLUE, borderRadius: 4 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 11, color: "#888" }}>一般</span>
        <span style={{ fontSize: 11, color: "#888" }}>絕佳</span>
      </div>
    </div>
  );
}

/* ── Product card ────────────────────────────────────────────────── */
function ProductCard({ src, badge, title, size, original, price, feel, reason, support, cool, btnLabel, href }: {
  src: string; badge: string; title: string; size: string; original: string; price: string;
  feel: string; reason: string; support: number; cool: number; btnLabel: string; href: string;
}) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e0e6f0", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", width: "100%", paddingBottom: "62%", overflow: "hidden" }}>
        <Image src={src} alt={title} fill className="object-cover object-center" sizes="(max-width:768px) 100vw, 50vw" />
        <span style={{ position: "absolute", top: 14, left: 14, background: GOLD, backdropFilter: "blur(4px)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 20 }}>
          {badge}
        </span>
      </div>
      <div style={{ padding: "18px 18px 0", flexGrow: 1 }}>
        <h3 style={{ fontSize: "clamp(15px,1.4vw,17px)", fontWeight: 700, color: BLUE, marginBottom: 10, lineHeight: 1.35 }}>{title}</h3>
        <p style={{ fontSize: 13, color: "#555", marginBottom: 3 }}>
          {size}&nbsp;
          <span style={{ textDecoration: "line-through", color: "#bbb", marginRight: 4 }}>{original}</span>
          <span style={{ color: BLUE, fontWeight: 700 }}>{price}</span>
        </p>
        <p style={{ fontSize: 13, color: "#444", marginBottom: 4 }}>躺感：<strong>{feel}</strong></p>
        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 16 }}>推薦原因：{reason}</p>
        <div style={{ background: "#f6f8fc", borderRadius: 10, padding: "14px 14px 6px" }}>
          <RatingBar label="支撐度" value={support} />
          <RatingBar label="涼感度" value={cool} />
        </div>
      </div>
      <div style={{ padding: "14px 18px 18px" }}>
        <Link href={href} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "13px 0", borderRadius: 30, background: BLUE, color: "#fff", fontWeight: 700, fontSize: 14, letterSpacing: "0.08em", textDecoration: "none" }}>
          {btnLabel}
        </Link>
      </div>
    </div>
  );
}

const CERTS = [
  { src: "/mattress/Lunio-產品獲得CertiPUR-US認證.png",              label: "泡棉安全無毒認證" },
  { src: "/mattress/Lunio-乳膠床墊具有SGS認證.png",                  label: "無甲醛測試" },
  { src: "/mattress/Lunio-乳膠床墊具有歐盟ECOCERT天然有機認證.png",   label: "歐盟床墊環保無毒驗證" },
  { src: "/mattress/Lunio-乳膠產LGA檢測合格.png",                    label: "德國萊茵家具安全無毒" },
  { src: "/mattress/Lunio-產品獲得OEKO-TEX-Standard-1000-認證.png",  label: "紡織品環保無毒驗證" },
];

const BLOG_ARTICLES = [
  {
    img: "/latex-mattress/Helix-3.webp",
    title: "業者老實說：乳膠床墊的缺點？讓您不再花冤枉錢",
    desc: "對乳膠床墊的不熟悉，讓您充滿疑問且遲遲不敢下手：「乳膠床墊真的好嗎？會不會很貴？容易壞嗎？」，Lunio老實告訴您乳膠床墊的缺點，一一破解您心中的疑惑，協助挑選最適合您的床墊。",
    href: "/blog/latex-mattress-cons/",
  },
  {
    img: "/latex-mattress/G4_KV8.webp",
    title: "【2026 乳膠床墊推薦】4款比較＋乳膠床墊優缺點與挑選技巧",
    desc: "各大媒體平台PTT、Mobile01、Dcard有不少對乳膠床墊的推薦和討論，看了這麼多資訊您真的有了解乳膠床墊了嗎？一張床要睡得好久要睡得好，先搞懂乳膠床墊優缺點、類型、挑選重點後再來選購也不遲，就讓Lunio來一步一步告訴您！",
    href: "/blog/latex-mattress-recommend/",
  },
  {
    img: "/latex-mattress/QTM_KV5.webp",
    title: "「乳膠床墊好嗎？」5大常見疑問幫您解答！",
    desc: "對於乳膠床墊不熟悉的您，心中肯定會有「乳膠床好嗎？」的疑問，一張床要睡好幾年，挑選時千萬不可馬虎，Lunio以多年經驗告訴消費者在選購乳膠床的會有的疑慮，讓您能順利買到優質好床！",
    href: "/blog/latex-5-benefit/",
  },
  {
    img: "/helix/Helix-cover.webp",
    title: "延長乳膠床墊壽命的6訣竅，使用超過十年沒問題！",
    desc: "希望新床墊使用壽命能超過10年嗎？您一定要看這篇！只需要幾種簡單的保養方式，並稍微記住幾個天然乳膠的特性，正確使用壽命達到15年也沒問題！讓我們接著看下去...",
    href: "/blog/takecare-latex-bed/",
  },
  {
    img: "/latex/橡樹流出橡膠原液.webp",
    title: "乳膠床墊怎麼洗才對？4大禁忌＋完整清潔步驟大公開",
    desc: "您的乳膠床墊有發黴、髒污、沾到尿液、經血等問題嗎？您知道定期清理還能延長使用壽命嗎？讓乳膠專門品牌Lunio來告訴您「如何透過正確的清潔步驟、保養方法，維護乳膠床墊乾淨舒適」。",
    href: "/blog/latex-mattress-cleaning/",
  },
  {
    img: "/ergo/Mercury (1).webp",
    title: "記憶床墊vs.乳膠床墊：哪一種床比較好？",
    desc: "記憶床墊和乳膠床墊不管是在躺感、材質、透氣性、支撐方式、耐用性都不一樣，了解它們的差異讓你了解哪張床更適合自己，床墊好壞不僅會影響睡眠品質與身體健康，更會影響我們整個生活，Lunio希望您能選到自己的舒適好床，一起來了解兩款床的差異吧！",
    href: "/blog/memory-foam-vs-latex-mattress/",
  },
];

const SERVICES = [
  { src: "/ergo/Icon_Delivery_0.png",    label: "全台本島免運費" },
  { src: "/ergo/Icon_stair_1-1.png",     label: "免費搬上樓" },
  { src: "/ergo/Icon_recycle_1-1.png",   label: "協助舊床搬至一樓" },
  { src: "/ergo/Icon_payment_1-1.png",   label: "12期0利率" },
  { src: "/ergo/Icon_warehouse_1-1.png", label: "床墊可寄倉" },
  { src: "/ergo/Icon_Box.png",           label: "真空裝箱好搬運" },
];

export default function LatexMattressPage() {
  return (
    <main style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif", color: "#212020", background: "#fff" }}>

      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(40px,5vw,64px) 0 clamp(32px,4vw,48px)" }}>
        <div style={W}>
          <h1 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 800, color: NAVY, marginBottom: 20, lineHeight: 1.3 }}>
            天然乳膠床墊推薦｜Q彈支撐，放鬆全身
          </h1>
          <p style={{ fontSize: "clamp(14px,1.1vw,16px)", color: "#444", lineHeight: 2, maxWidth: 980 }}>
            Lunio的乳膠床墊，採用泰國100%純天然乳膠，通過國際安全認證，結合石墨烯散熱技術，提供高彈性、支撐性、透氣舒適的睡眠體驗，符合人體工學設計，有效減緩腰酸腰背背痛等問題。耐用、抗菌、防塵蟎，給全家大小長期健康的睡眠環境。提供台灣床墊全尺寸規格，用料好，價格實惠，讓您輕鬆擁有高品質乳膠床墊。
          </p>
        </div>
      </section>

      {/* ── 2. PRODUCTS ──────────────────────────────────────────── */}
      <section style={{ background: "#f6f9ff", padding: "clamp(32px,4vw,56px) 0" }}>
        <div style={W}>

          {/* Lunio brand */}
          <div style={{ marginBottom: 12 }}>
            <Image src="/latex-mattress/Lunio-logo-main.webp" alt="Lunio" width={100} height={32} className="h-auto object-contain" style={{ marginBottom: 4 }} />
            <p style={{ fontSize: 13, color: "#666" }}>多機能，耐用首選</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 pb-10" style={{ borderBottom: "1px dashed #c8d4e8" }}>
            <ProductCard
              src="/latex-mattress/G4_KV8.webp"
              badge="最好睡"
              title="Lunio Gen 4 石墨烯乳膠床墊"
              size="標準雙人(5尺)"
              original="NT$38,990"
              price="NT$28,990"
              feel="中等"
              reason="與骨科醫師合作研發，改善腰酸背痛，提升深層睡眠30%。"
              support={100}
              cool={55}
              btnLabel="了解 Lunio Gen4"
              href="/product/lunio-latex-mattress"
            />
            <ProductCard
              src="/latex-mattress/QTM_KV5.webp"
              badge="最舒適"
              title="Lunio Quantum Max 高碳錳乳膠獨立筒"
              size="標準雙人(5尺)"
              original="NT$25,990"
              price="NT$13,990"
              feel="中等偏硬"
              reason="天絲加厚表布，5區支撐，床沿加固，涼爽又減壓。"
              support={70}
              cool={50}
              btnLabel="了解 Lunio Quantum"
              href="/product/lunio-quantum"
            />
          </div>

          {/* Nooz brand */}
          <div style={{ marginBottom: 12 }}>
            <Image src="/latex-mattress/Logo-Nooz.webp" alt="NOOZ" width={100} height={36} className="h-auto object-contain" style={{ marginBottom: 4 }} />
            <p style={{ fontSize: 13, color: "#666" }}>超優惠、高CP首選</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ProductCard
              src="/latex-mattress/Helix-3.webp"
              badge="最熱銷"
              title="Nooz Helix 乳膠獨立筒"
              size="標準雙人(5尺)"
              original="NT$19,800"
              price="NT$7,920"
              feel="中等"
              reason="柔軟又支撐，享受五星級飯店奢華躺感。"
              support={50}
              cool={30}
              btnLabel="了解 Nooz Helix"
              href="/product/nooz-helix"
            />
            <ProductCard
              src="/latex-mattress/Sunset-Pro.jpg"
              badge="最高CP值"
              title="Nooz Sunset Pro 乳膠床墊"
              size="標準雙人(5尺)"
              original="NT$19,800"
              price="NT$7,920"
              feel="中等偏硬"
              reason="加強腰部支撐，硬床推薦。"
              support={75}
              cool={60}
              btnLabel="了解 Nooz Sunset Pro"
              href="/product/nooz-sunset"
            />
          </div>
        </div>
      </section>

      {/* ── 3. CERTIFICATIONS ────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(48px,5vw,64px) 0" }}>
        <div style={W}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 700, color: NAVY, marginBottom: 12 }}>
            多重認證安全無毒更放心
          </h2>
          <p style={{ textAlign: "center", fontSize: "clamp(13px,1.05vw,15px)", color: "#555", marginBottom: 44, maxWidth: 640, margin: "0 auto 44px" }}>
            Lunio的乳膠床墊，採用泰國天然乳膠原料及各項專利技術製成，更獲得多項國際安全認證，安全無毒睡起來更安心！
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-10" style={{ maxWidth: 860, margin: "0 auto" }}>
            {CERTS.map((c) => (
              <div key={c.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image src={c.src} alt={c.label} width={80} height={80} className="object-contain h-full w-auto" />
                </div>
                <p style={{ fontSize: "clamp(11px,0.9vw,13px)", fontWeight: 600, color: NAVY, textAlign: "center", lineHeight: 1.4 }}>{c.label}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: "#aaa" }}>
            <Link href="#" style={{ color: "#aaa" }}>•TERMS APPLY</Link>
            &nbsp;&nbsp;
            <Link href="#" style={{ color: "#aaa" }}>••DETAILS</Link>
          </p>
        </div>
      </section>

      {/* ── 4. BLOG GUIDES ───────────────────────────────────────── */}
      <section style={{ background: "#f6f9ff", padding: "clamp(48px,5vw,64px) 0" }}>
        <div style={W}>
          <h2 style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 700, color: NAVY, marginBottom: 32 }}>
            乳膠床墊選購指南
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {BLOG_ARTICLES.map((a) => (
              <div key={a.href} style={{ background: "#fff", border: "1px solid #e4e8f0", borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s, transform 0.2s" }}
                className="hover:shadow-lg hover:-translate-y-1">
                <div style={{ position: "relative", width: "100%", paddingBottom: "58%", overflow: "hidden" }}>
                  <Image src={a.img} alt={a.title} fill className="object-cover" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" />
                </div>
                <div style={{ padding: "16px 18px 20px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "clamp(13px,1.1vw,15px)", fontWeight: 700, color: NAVY, marginBottom: 10, lineHeight: 1.45 }}>{a.title}</h3>
                  <p style={{ fontSize: "clamp(12px,0.9vw,13px)", color: "#666", lineHeight: 1.75, flexGrow: 1, marginBottom: 16,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                    {a.desc}
                  </p>
                  <Link href={a.href} style={{ color: BLUE, fontWeight: 600, fontSize: 13, textDecoration: "none" }}>
                    閱讀內容 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/blog/" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "13px 40px", borderRadius: 30, background: BLUE,
              color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none",
            }}>
              更多乳膠床墊挑選技巧
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ───────────────────────────────────────────────── */}
      <LatexFAQ />

      {/* ── 6. TAB FILTER ────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(40px,5vw,60px) 0" }}>
        <div style={W}>
          <MattressTabFilter />
        </div>
      </section>

      {/* ── 7. FREE SERVICES ─────────────────────────────────────── */}
      <section style={{ background: "#eef3fb", padding: "clamp(40px,5vw,60px) 0" }}>
        <div style={W}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(18px,2vw,24px)", fontWeight: 700, color: NAVY, marginBottom: "clamp(28px,4vw,44px)" }}>
            免費服務
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-8">
            {SERVICES.map((s) => (
              <div key={s.label} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image src={s.src} alt={s.label} width={52} height={52} className="object-contain" />
                </div>
                <p style={{ fontSize: "clamp(11px,.9vw,13px)", fontWeight: 600, color: NAVY, lineHeight: 1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
