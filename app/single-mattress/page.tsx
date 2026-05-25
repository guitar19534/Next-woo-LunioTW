import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MattressTabFilter from "@/components/mattress/MattressTabFilter";

export const metadata: Metadata = {
  title: "單人床墊推薦｜3尺、3.5尺單人床墊｜Lunio Taiwan",
  description:
    "Lunio單人床墊採用台灣規格，含3尺標準單人、3.5尺單人加大。乳膠床墊、獨立筒、冷凝記憶床墊、薄墊多種選擇，不論躺感、支撐度、涼感度，總有一款適合你！",
  alternates: { canonical: "/single-mattress" },
};

const BLUE = "#3c7ae4";
const NAVY = "#17284b";
const GOLD = "rgba(230,185,100,0.92)";

const W = { maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" };

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

function ProductCard({ src, badge, title, size, original, price, feel, reason, support, cool, btnLabel, href }: {
  src: string; badge: string; title: string; size: string; original: string; price: string;
  feel: string; reason: string; support: number; cool: number; btnLabel: string; href: string;
}) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e0e6f0", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", transition: "box-shadow 0.25s, transform 0.25s" }}
      className="hover:shadow-xl hover:-translate-y-1">
      <div style={{ position: "relative", width: "100%", paddingBottom: "62%", overflow: "hidden" }}>
        <Image src={src} alt={title} fill className="object-cover object-center" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" />
        <span style={{ position: "absolute", top: 14, left: 14, background: GOLD, backdropFilter: "blur(4px)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 20 }}>
          {badge}
        </span>
      </div>
      <div style={{ padding: "18px 18px 0", flexGrow: 1 }}>
        <h3 style={{ fontSize: "clamp(15px,1.4vw,17px)", fontWeight: 700, color: NAVY, marginBottom: 10, lineHeight: 1.35 }}>{title}</h3>
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

const PRODUCTS = [
  { src: "/mattress/G4_KV8.webp",      badge: "最好睡",    title: "Lunio Gen 4 石墨烯乳膠床墊",        size: "標準雙人(5尺)", original: "NT$38,990", price: "NT$28,990", feel: "中等",    reason: "與骨科醫師合作研發，改善腰酸背痛，提升深層睡眠30%。", support: 100, cool: 55, btnLabel: "了解 Lunio Gen4",        href: "/product/lunio-latex-mattress" },
  { src: "/mattress/QTM_KV5.webp",     badge: "最舒適",    title: "Lunio Quantum Max 高碳錳乳膠獨立筒", size: "標準雙人(5尺)", original: "NT$25,990", price: "NT$13,990", feel: "中等偏硬", reason: "天絲加厚表布，5區支撐，床沿加固，涼爽又減壓。",       support: 70,  cool: 50, btnLabel: "了解 Lunio Quantum",     href: "/product/lunio-quantum" },
  { src: "/mattress/Helix-3.webp",     badge: "最熱銷",    title: "Nooz Helix 乳膠獨立筒",              size: "標準雙人(5尺)", original: "NT$19,800", price: "NT$7,920",  feel: "中等",    reason: "柔軟又支撐，享受五星級飯店奢華躺感。",               support: 50,  cool: 30, btnLabel: "了解 Nooz Helix",       href: "/product/nooz-helix" },
  { src: "/mattress/Sunset-Pro.jpg",   badge: "最高CP值",  title: "Nooz Sunset Pro 乳膠床墊",           size: "標準雙人(5尺)", original: "NT$19,800", price: "NT$7,920",  feel: "中等偏硬", reason: "加強腰部支撐，硬床推薦。",                           support: 75,  cool: 60, btnLabel: "了解 Nooz Sunset Pro",  href: "/product/nooz-sunset" },
  { src: "/mattress/Moonlight-Plus.jpg",badge: "最經濟實惠",title: "Nooz Moonlight Plus 涼感記憶床墊",   size: "標準雙人(5尺)", original: "NT$13,800", price: "NT$5,520",  feel: "中等偏硬", reason: "添加涼感粒子，減壓包覆。",                           support: 30,  cool: 35, btnLabel: "了解 Nooz Moonlight Plus", href: "/product/nooz-moonlight" },
  { src: "/mattress/Nooz-Trifold-Topper_cover-1.jpg", badge: "最萬用",    title: "Nooz Trifold 三折疊日式床墊",        size: "標準單人(3尺)", original: "NT$8,970", price: "NT$2,990", feel: "中等", reason: "好收好帶，一墊多用，居家外宿都方便。",               support: 30,  cool: 50, btnLabel: "了解 Nooz Trifold",     href: "/product/nooz-topper-trifold" },
  { src: "/mattress/nooz-topper-smartrest_04.jpg",    badge: "最輕薄實惠", title: "Nooz SmartRest 翻轉床墊",            size: "標準雙人(5尺)", original: "NT$7,225", price: "NT$2,890", feel: "中等", reason: "軟硬雙面任選，升級舊床墊，外宿租屋都合適。",         support: 25,  cool: 50, btnLabel: "了解 Nooz SmartRest",   href: "/product/nooz-topper-smartrest" },
];

const CERTS = [
  { src: "/mattress/Lunio-產品獲得CertiPUR-US認證.png",             label: "泡棉安全無毒認證" },
  { src: "/mattress/Lunio-乳膠床墊具有SGS認證.png",                 label: "無甲醛測試" },
  { src: "/mattress/Lunio-乳膠床墊具有歐盟ECOCERT天然有機認證.png",  label: "歐盟床墊環保無毒驗證" },
  { src: "/mattress/Lunio-乳膠產LGA檢測合格.png",                   label: "德國萊茵家具安全無毒" },
  { src: "/mattress/Lunio-產品獲得OEKO-TEX-Standard-1000-認證.png", label: "紡織品環保無毒驗證" },
];

const SERVICES = [
  { src: "/ergo/Icon_Delivery_0.png",    label: "全台本島免運費" },
  { src: "/ergo/Icon_stair_1-1.png",     label: "免費搬上樓" },
  { src: "/ergo/Icon_recycle_1-1.png",   label: "協助舊床搬至一樓" },
  { src: "/ergo/Icon_payment_1-1.png",   label: "12期0利率" },
  { src: "/ergo/Icon_warehouse_1-1.png", label: "床墊可寄倉" },
  { src: "/ergo/Icon_Box.png",           label: "真空裝箱好搬運" },
];

export default function SingleMattressPage() {
  return (
    <main style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif", color: "#212020", background: "#fff" }}>

      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(40px,5vw,64px) 0 clamp(32px,4vw,48px)" }}>
        <div style={W}>
          <h1 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, color: BLUE, marginBottom: 16 }}>
            單人床墊推薦
          </h1>
          <p style={{ fontSize: "clamp(14px,1.1vw,16px)", color: "#444", marginBottom: 12, lineHeight: 1.8 }}>
            Lunio的單人床墊採用台灣規格，單人床墊尺寸如下：
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 20, lineHeight: 2.1, fontSize: "clamp(13px,1.05vw,15px)", color: "#444" }}>
            <li>3 尺床墊｜標準單人：89 x 188 公分</li>
            <li>3.5 尺床墊｜單人加大：104 x 188 公分</li>
          </ul>
          <p style={{ fontSize: "clamp(13px,1.05vw,15px)", color: "#444", lineHeight: 1.9 }}>
            包含乳膠床墊、獨立筒床墊、冷凝記憶床墊、薄墊等多種材質款式，並不定期提供各種單人床墊優惠。不論你喜歡哪種床墊躺感、支撐度、涼感度，總有一款適合你！
          </p>
        </div>
      </section>

      {/* ── 2. PRODUCTS ──────────────────────────────────────────── */}
      <section style={{ background: "#f6f9ff", padding: "clamp(32px,4vw,56px) 0" }}>
        <div style={W}>
          {/* Row 1: 2 Lunio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {PRODUCTS.slice(0, 2).map((p) => <ProductCard key={p.title} {...p} />)}
          </div>
          {/* Row 2: 3 Nooz mid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {PRODUCTS.slice(2, 5).map((p) => <ProductCard key={p.title} {...p} />)}
          </div>
          {/* Row 3: Trifold + SmartRest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ maxWidth: 760 }}>
            {PRODUCTS.slice(5).map((p) => <ProductCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── 3. SIZE GUIDE ────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(48px,5vw,72px) 0" }}>
        <div style={W}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div style={{ position: "relative", width: "100%", paddingBottom: "56%", borderRadius: 16, overflow: "hidden" }}>
              <Image
                src="/single-mattress/單人床尺寸.jpg"
                alt="Lunio台規單人床尺寸挑選指南"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 style={{ fontSize: "clamp(17px,1.8vw,22px)", fontWeight: 700, color: NAVY, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                📐 如何挑選Lunio台規單人床尺寸？
              </h2>
              <div style={{ lineHeight: 2.1, fontSize: "clamp(13px,1.05vw,15px)", color: "#3a3a3a", marginBottom: 20 }}>
                <p>標準單人床：89 x 188 公分/ 3 x 6.2 台尺</p>
                <p>加大單人床：104 x 188 公分/ 3.5 x 6.2 台尺</p>
                <p style={{ color: "#888", fontSize: "clamp(12px,0.95vw,13.5px)", marginTop: 8 }}>
                  ＊每張床墊皆由手工製造會有正負5cm差異，實屬正常，這是因為材料層具有一定的自然彈性拉伸跟收縮。
                </p>
              </div>
              <p style={{ fontSize: "clamp(13px,1.05vw,15px)", color: "#444", lineHeight: 1.8 }}>
                若您需要尺寸選購上的建議，可先參考：{" "}
                <Link
                  href="/blog/single-size-bed/#elementor-toc__heading-anchor-7"
                  style={{ color: BLUE, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  單人床尺寸挑選指南
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CERTIFICATIONS ────────────────────────────────────── */}
      <section style={{ background: "#f6f9ff", padding: "clamp(48px,5vw,64px) 0" }}>
        <div style={W}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 700, color: NAVY, marginBottom: 12 }}>
            多重認證安全無毒更放心
          </h2>
          <p style={{ textAlign: "center", fontSize: "clamp(13px,1.05vw,15px)", color: "#555", maxWidth: 640, margin: "0 auto 44px" }}>
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

      {/* ── 5. TAB FILTER ────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(40px,5vw,56px) 0" }}>
        <div style={W}>
          <MattressTabFilter />
        </div>
      </section>

      {/* ── 6. FREE SERVICES ─────────────────────────────────────── */}
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
