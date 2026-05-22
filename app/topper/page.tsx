import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MattressTabFilter from "@/components/mattress/MattressTabFilter";

export const metadata: Metadata = {
  title: "薄床墊推薦｜含單人、雙人尺寸｜Lunio Taiwan",
  description:
    "Nooz 薄床墊推薦，含標準單人、單人加大、標準雙人、雙人加大尺寸。方便搬運收納，適合宿舍、租屋、露營、和式床墊使用。",
  alternates: { canonical: "/topper" },
};

const BLUE  = "#3c7ae4";
const NAVY  = "#17284b";
const ORANGE = "#f5892a";

const W = { maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" };

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

const PRODUCTS = [
  {
    src: "/topper/sku_TriFold.webp",
    discount: "67% Off",
    title: "Nooz FlexiRest Trifold Topper 三折疊日式床墊（厚8公分）",
    price: "NT$2,990",
    original: "NT$8,970",
    features: ["一墊多用、居家、外宿、露營，隨時享受好眠", "三折疊設計，附手提袋，好攜帶又防辦", "可拆洗防滑床套"],
    href: "/product/nooz-topper-trifold",
    btnLabel: "選擇規格",
  },
  {
    src: "/topper/sku_Topper.webp",
    discount: "60% Off",
    title: "Nooz SmartRest Flip Topper 翻轉床墊（厚5公分）",
    price: "NT$1,890",
    priceTo: "NT$3,190",
    features: ["雙面翻轉，軟硬任選", "改善舊床舒適度、延長舊床墊壽命", "可水洗透氣床套"],
    href: "/product/nooz-topper-smartrest",
    btnLabel: "選擇規格",
  },
];

export default function TopperPage() {
  return (
    <main style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif", color: "#212020", background: "#fff" }}>
      <style>{`
        .topper-card {
          background: #fff;
          border: 1px solid #e4e8f0;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .topper-card:hover {
          box-shadow: 0 10px 36px rgba(60,122,228,0.12);
          transform: translateY(-3px);
        }
        .topper-card .img-wrap img {
          transition: transform 0.4s ease;
        }
        .topper-card:hover .img-wrap img {
          transform: scale(1.04);
        }
      `}</style>

      {/* ── 1. HEADER ─────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(40px,5vw,64px) 0 clamp(32px,4vw,48px)" }}>
        <div style={W}>
          <h1 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 800, color: BLUE, marginBottom: 20, lineHeight: 1.3 }}>
            薄床墊推薦｜含單人、雙人尺寸
          </h1>
          <ul style={{ paddingLeft: 20, marginBottom: 0, lineHeight: 2, fontSize: "clamp(13px,1.05vw,15px)", color: "#444" }}>
            <li>薄床墊尺寸：標準準單人、單人加大、標準雙人、雙人加大</li>
            <li>推薦用途：方便搬運收納，床套可拆洗，可鋪在舊床墊上，改善舊床舒適度。適合宿舍床墊、租屋床墊、折疊床墊、和式床墊、客房床墊、露營床墊。</li>
          </ul>
        </div>
      </section>

      {/* ── 2. PRODUCTS ───────────────────────────────────────────── */}
      <section style={{ background: "#f6f9ff", padding: "clamp(32px,4vw,56px) 0" }}>
        <div style={W}>
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start">

            {/* Brand */}
            <div style={{ paddingTop: 8 }}>
              <Image src="/latex-mattress/Logo-Nooz.webp" alt="NOOZ" width={120} height={48} className="h-auto object-contain" style={{ marginBottom: 10 }} />
              <p style={{ fontSize: 13, color: "#666" }}>平價床墊首選品牌</p>
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PRODUCTS.map((p) => (
                <div key={p.title} className="topper-card">
                  <div className="img-wrap" style={{ position: "relative", width: "100%", paddingBottom: "66%", overflow: "hidden" }}>
                    <Image src={p.src} alt={p.title} fill className="object-cover object-center" sizes="(max-width:640px) 100vw, 45vw" />
                    <span style={{ position: "absolute", top: 14, left: 14, background: ORANGE, color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 6 }}>
                      {p.discount}
                    </span>
                  </div>
                  <div style={{ padding: "20px 20px 0", flexGrow: 1, textAlign: "center" }}>
                    <h2 style={{ fontSize: "clamp(15px,1.4vw,17px)", fontWeight: 700, color: NAVY, marginBottom: 14, lineHeight: 1.4 }}>
                      {p.title}
                    </h2>
                    <p style={{ marginBottom: 16 }}>
                      <span style={{ color: BLUE, fontWeight: 800, fontSize: "clamp(15px,1.3vw,17px)" }}>{p.price}</span>
                      {p.priceTo
                        ? <span style={{ color: BLUE, fontWeight: 700, fontSize: "clamp(14px,1.2vw,16px)" }}> — {p.priceTo}</span>
                        : <span style={{ color: "#bbb", fontSize: 13, textDecoration: "line-through", marginLeft: 8 }}>{p.original}</span>
                      }
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
                      {p.features.map((f) => (
                        <p key={f} style={{ fontSize: "clamp(13px,1vw,14.5px)", color: "#555", lineHeight: 1.6 }}>{f}</p>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: "0 20px 20px" }}>
                    <Link href={p.href} style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "100%", padding: "13px 0", borderRadius: 30,
                      background: BLUE, color: "#fff", fontWeight: 700, fontSize: 14,
                      letterSpacing: "0.08em", textDecoration: "none",
                    }}>
                      {p.btnLabel}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. CERTIFICATIONS ─────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(48px,5vw,64px) 0" }}>
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

      {/* ── 4. TAB FILTER ─────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "0 0 clamp(32px,4vw,48px)" }}>
        <div style={W}>
          <MattressTabFilter />
        </div>
      </section>

      {/* ── 5. FREE SERVICES ──────────────────────────────────────── */}
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
