import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "分辨天然乳膠、合成乳膠、人造乳膠的方法｜Lunio Taiwan",
  description:
    "教你如何分辨天然乳膠、合成乳膠（SBR）和人造乳膠的差異，從顏色、氣孔、延展性、彈性、觸感、味道到認證，完整解析。",
  alternates: { canonical: "/latex" },
};

const BLUE = "#515f8c";
const NAVY = "#17284b";

const CERTIFICATIONS = [
  {
    src: "/latex/Lunio-歐盟ECOCERT天然有機認證.webp",
    alt: "ECO Institut 認證",
    label: "ECO 歐盟生態認證",
    desc: "100%天然乳膠且無含有危害健康的物質",
  },
  {
    src: "/latex/Lunio-乳膠床墊乳膠枕具有SGS認證.webp",
    alt: "SGS 認證",
    label: "環保SGS國家檢驗品檢合格",
    desc: "符合天然乳膠標準且無有害成份",
  },
  {
    src: "/latex/Lunio-德國萊茵LGA檢測合格.webp",
    alt: "德國萊因 LGA 認證",
    label: "德國萊因 LGA 品質檢測合格",
    desc: "100%天然乳膠及符合世界級環保標準",
  },
];

const BENEFITS = [
  {
    src: "/latex/100橡樹汁液製成的天然乳膠，安全無毒.webp",
    alt: "天然無毒",
    title: "天然無毒",
    desc: "100%橡樹汁液製成的天然乳膠，安全無毒更安心",
  },
  {
    src: "/latex/橡樹蛋白酶能抑制細菌和螨蟲孳生.webp",
    alt: "防蟎抗菌",
    title: "防蟎抗菌",
    desc: "天然乳膠含有橡樹蛋白酶，能抑制細菌和蟎蟲孳生",
  },
  {
    src: "/latex/天然乳膠Q彈且支撐力強能幫助睡眠.webp",
    alt: "舒適睡眠",
    title: "舒適睡眠",
    desc: "天然乳膠Q彈且支撐力強，能幫助釋放壓力，帶來一夜好眠",
  },
];

const PRODUCTS = [
  {
    src: "/latex/Lunio-Gen4-Pro_26-1.jpg",
    alt: "Lunio Gen4 石墨烯乳膠床墊",
    title: "Lunio Gen4 石墨烯乳膠床墊",
    desc: "一張適合怕熱、淺眠、腰酸背痛者的床墊。Lunio Latex®天然乳膠、9 區設計支撐，完美貼合身體曲線。4種太空科技調節溫度，讓你減少出汗48%，涼爽睡滿12小時。",
    btnLabel: "選購 Gen4",
    href: "/product/lunio-latex-mattress",
  },
  {
    src: "/latex/Quantum-Max_15-1200_0.webp",
    alt: "Lunio Quantum 乳膠獨立筒床墊",
    title: "Lunio Quantum 乳膠獨立筒床墊",
    desc: "Lunio Latex®天然乳膠、石墨烯釋壓層、高碳錳鋼獨立筒等，製成的床墊擁有絕佳支撐力，更榮獲德國eco、德國萊因TÜV LGA、SGS等多項國際組織認證，守護您的優質睡眠。",
    btnLabel: "選購 Quantum",
    href: "/product/lunio-quantum",
  },
  {
    src: "/latex/Lunio乳膠枕2，狼牙枕.webp",
    alt: "Lunio 天然乳膠枕",
    title: "Lunio 天然乳膠枕",
    desc: "針對使用者不同的睡姿、頸椎弧度，開發出多種乳膠枕類型－饅頭枕、狼牙枕，能滿足側睡、仰睡等各種需求，並提供頸椎最佳支撐以解決肩頸不適的問題，此外天然乳膠具有防蟎抗菌功能，非常適合呼吸道過敏者使用。",
    btnLabel: "選購乳膠枕",
    href: "/product/pillows",
  },
];

const TABLE_ROWS = [
  { label: "天然乳膠含量", nr: "80％以上",               sbr: "30％以下",                          fake: "0%" },
  { label: "原料",         nr: "橡樹汁液＋無毒發泡物質",  sbr: "橡樹汁液＋發泡劑、丁苯橡膠（含致癌物苯）", fake: "丁苯橡膠（含致癌物苯）" },
  { label: "顏色",         nr: "象牙色或奶油色",          sbr: "純白或其他顏色",                    fake: "純白或其他顏色" },
  { label: "外觀",         nr: "有自然毛邊、孔洞和痕紋",  sbr: "工整",                             fake: "工整" },
  { label: "味道",         nr: "天然橡樹汁液乳膠味",      sbr: "刺鼻化學或香精味",                  fake: "刺鼻化學或香精味" },
  { label: "壽命",         nr: "正常使用可達10年以上",    sbr: "約4–6年，較容易撕裂毀壞",            fake: "約2–3年，容易撕裂毀壞" },
  { label: "彈性",         nr: "高",                     sbr: "中",                               fake: "低" },
  { label: "延展性",       nr: "高",                     sbr: "中",                               fake: "低" },
  { label: "防蟎抗菌",     nr: "完整防蟎抗菌",            sbr: "低程度防蟎抗菌",                    fake: "無" },
  { label: "價格",         nr: "較高",                   sbr: "中",                               fake: "低" },
];

const IDENTIFY_METHODS = [
  {
    key: "看",
    title: "顏色、氣孔缺口",
    content: "就顏色來說，天然乳膠呈現奶油色或象牙色，人造或合成乳膠則呈現純白色，或是因為化學添加劑而出現其他顏色。至於氣孔缺口或瑕疵，是天然乳膠本身的自然特性與手工脫模製程，會出現毛邊、孔洞和痕紋，人造或合成乳膠則異常工整。",
  },
  {
    key: "拉",
    title: "延展性",
    content: "天然乳膠的延展性相當高，不容易被拉壞，到販售天然乳膠床墊的門市時，可以試著拉拉樣品，感受其不易變形的特性；合成或人造乳膠則相反，這也是為何天然乳膠床墊的壽命能長達10年以上，人工乳膠床墊則2–5年就需要汰換。",
  },
  {
    key: "壓",
    title: "彈性",
    content: "天然乳膠與人造乳膠最大的差異在於彈性，前者因為有高密度與純度的乳膠，按壓時能感受到優異的彈性與支撐力；而天然乳膠成份較少的合成品，甚至全人造乳膠的彈性則明顯不足，壓下去不會立即回彈。",
  },
  {
    key: "摸",
    title: "觸感",
    content: "隨著科技進步，人造乳膠的觸感已經能製作到與天然乳膠相似，但仔細觸摸仍會發現，天然乳膠有自然的粗糙感，而合成或人造乳膠較為光滑。",
  },
  {
    key: "聞",
    title: "味道",
    content: "天然乳膠床墊會散發出橡樹汁液的淡淡乳膠味，有些人可能對此感到介意，別擔心！這味道會隨著時間淡去且無毒無害；至於合成或人造乳膠床墊，則能聞到化學香精味，像是明顯的人工香味，甚至是化學原料的刺鼻氣味。",
  },
  {
    key: "問",
    title: "認證",
    content: "市面上許多合成乳膠號稱自己是天然乳膠，因此取得證明才能買得安心，真正採用100%的天然乳膠的產品會有國際組織認證，像是獲得德國ECO、德國萊茵TÜV、SGS等認證，購買前不妨先了解看看。",
  },
];

export default function LatexPage() {
  return (
    <main style={{ fontFamily: "'MiSansTC', 'Noto Sans TC', sans-serif", color: "#212020" }}>
      <style>{`
        .latex-identify-card {
          background: #fff;
          border: 1px solid #e8eaf0;
          border-radius: 16px;
          padding: 28px 24px;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .latex-identify-card:hover {
          box-shadow: 0 8px 32px rgba(81,95,140,0.13);
          transform: translateY(-3px);
        }
        .latex-cert-card {
          background: #fff;
          border: 1px solid #e8eaf0;
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .latex-cert-card:hover {
          box-shadow: 0 8px 32px rgba(81,95,140,0.13);
          transform: translateY(-3px);
        }
        .latex-product-card {
          background: #fff;
          border: 1px solid #e8eaf0;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .latex-product-card:hover {
          box-shadow: 0 12px 40px rgba(23,40,75,0.12);
          transform: translateY(-4px);
        }
        .latex-product-card .img-wrap {
          overflow: hidden;
        }
        .latex-product-card .img-wrap img {
          transition: transform 0.4s ease;
        }
        .latex-product-card:hover .img-wrap img {
          transform: scale(1.04);
        }
        .latex-benefit-card .img-wrap {
          overflow: hidden;
          border-radius: 12px;
        }
        .latex-benefit-card .img-wrap img {
          transition: transform 0.4s ease;
        }
        .latex-benefit-card:hover .img-wrap img {
          transform: scale(1.05);
        }
        .latex-table tr:hover td {
          background: #f0f3fa !important;
        }
        .latex-divider {
          width: 48px;
          height: 3px;
          background: ${BLUE};
          border-radius: 2px;
          margin-bottom: 20px;
        }
        .latex-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 28px;
          border-radius: 30px;
          border: 1.5px solid ${BLUE};
          color: ${BLUE};
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.08em;
          transition: background 0.2s, color 0.2s;
          align-self: flex-start;
          text-decoration: none;
        }
        .latex-btn-outline:hover {
          background: ${BLUE};
          color: #fff;
        }
      `}</style>

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section className="relative w-full">
        <Image
          src="/latex/橡樹流出橡膠原液.webp"
          alt="天然乳膠橡樹"
          width={600}
          height={400}
          priority
          className="w-full h-auto"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,18,38,0.78) 0%, rgba(10,18,38,0.35) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 flex flex-col justify-end"
          style={{ padding: "clamp(20px, 4vw, 56px)" }}
        >
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
            Lunio 乳膠教學
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display, 'MiSansTC')",
              fontSize: "clamp(18px, 3vw, 38px)",
              fontWeight: 700,
              lineHeight: 1.4,
              color: "#fff",
              maxWidth: 660,
              textShadow: "0 2px 16px rgba(0,0,0,0.35)",
              letterSpacing: "0.04em",
            }}
          >
            分辨天然乳膠、合成乳膠<br />人造乳膠的方法
          </h1>
        </div>
      </section>

      {/* ── 2. INTRO ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)" }}>

        <section style={{ paddingTop: 64, paddingBottom: 48, borderBottom: "1px solid #eaedf3" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px 64px" }}>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: BLUE, marginBottom: 12 }}>
                什麼是乳膠？
              </p>
              <div className="latex-divider" />
              <p style={{ lineHeight: 2, fontSize: "clamp(14px, 1.05vw, 15.5px)", color: "#3a3a3a" }}>
                <a
                  href="https://zh.wikipedia.org/zh-tw/%E4%B9%B3%E8%83%B6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: BLUE, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}
                >乳膠</a>（Latex）是從樹木中萃取而來的珍貴天然樹液，在世界近代史上，與人類的生活密不可分，自19世紀大英帝國在多個熱帶國家推廣割膠技術以來，乳膠廣泛出現在各種工商業產品之中，更成為難能可貴的床墊與枕頭的優質原料，但因為產料稀少，於是人類開發出合成及人造化學乳膠，然而各項特質仍遠遠不及天然乳膠。
              </p>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: BLUE, marginBottom: 12 }}>
                乳膠有哪些種類？
              </p>
              <div className="latex-divider" />
              <p style={{ lineHeight: 2, fontSize: "clamp(14px, 1.05vw, 15.5px)", color: "#3a3a3a", marginBottom: 20 }}>
                乳膠可以分為天然乳膠、合成乳膠和不含有天然乳膠的人造乳膠。
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {["天然乳膠 NR", "合成乳膠 SBR", "人造乳膠"].map((t, i) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "5px 14px",
                      borderRadius: 20,
                      background: i === 0 ? BLUE : "#f0f2f7",
                      color: i === 0 ? "#fff" : "#5F6062",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── 3. NR 天然乳膠 ─────────────────────────────────────────── */}
        <section style={{ paddingTop: 56, paddingBottom: 48, borderBottom: "1px solid #eaedf3" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: BLUE, marginBottom: 12 }}>
            Natural Rubber
          </p>
          <div className="latex-divider" />
          <h2 style={{ fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 700, color: NAVY, marginBottom: 32 }}>
            NR 天然乳膠
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: "clamp(14px, 1.05vw, 15.5px)", lineHeight: 2, color: "#3a3a3a" }}>
            <p>
              天然乳膠來自於橡膠樹的乳白色汁液，能產出這些「白金」的橡膠樹林多在熱帶地區，統計資料顯示，
              <a
                href="https://www.statista.com/statistics/275397/caoutchouc-production-in-leading-countries/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: BLUE, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}
              >泰國是世界領先的乳膠生產國</a>，一年產量可達全球35%，被譽為量多質精。
            </p>
            <p>
              天然乳膠的萃取相當不易，首先要花6年以上培植橡膠樹林，並由採集人員人工汲取，他們會小心翼翼地在樹皮上切出缺口，讓乳膠汩汩流入容器中，為了不傷害橡膠樹並維護乳膠的品質，並須將整片樹林劃分出採集批次，這便是為何天然乳膠產量有限的原因。
            </p>
            <p>
              由於天然乳膠取之於自然，因此跟其他床墊原料相比，獨具環境友善特性，一方面為了讓產業永續發展，橡膠樹園積極培育林木，另一方面天然乳膠能透過生物降解回歸自然，對環境衝擊較低。
            </p>
          </div>

          {/* Lunio callout */}
          <div
            style={{
              marginTop: 36,
              background: `linear-gradient(135deg, ${NAVY} 0%, #2a3f6e 100%)`,
              borderRadius: 16,
              padding: "28px 32px",
              color: "#fff",
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
            }}
          >
            <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              🌿
            </div>
            <p style={{ lineHeight: 1.85, fontSize: "clamp(13px, 1vw, 15px)", opacity: 0.95 }}>
              Lunio 的乳膠產品均採用 <strong>Lunio Latex® 泰國100%天然頂級橡樹原液</strong>，並使用 Lunio 獨有的技術模壓，製成符合人體工學且擁有絕佳脊柱支撐力的複合式乳膠床墊
            </p>
          </div>

          {/* 認證 */}
          <div style={{ marginTop: 48 }}>
            <p style={{ textAlign: "center", fontSize: "clamp(15px, 1.5vw, 18px)", fontWeight: 700, color: NAVY, marginBottom: 32 }}>
              Lunio 採用的天然乳膠榮獲多項國際組織認證
            </p>
            <div className="grid grid-cols-3 gap-5" style={{ maxWidth: 780, margin: "0 auto" }}>
              {CERTIFICATIONS.map((c) => (
                <div key={c.label} className="latex-cert-card">
                  <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Image src={c.src} alt={c.alt} width={100} height={100} className="object-contain h-full w-auto" />
                  </div>
                  <p style={{ color: BLUE, fontWeight: 700, marginBottom: 8, fontSize: "clamp(12px, 0.95vw, 14px)", lineHeight: 1.5 }}>{c.label}</p>
                  <p style={{ color: "#7a7f90", fontSize: "clamp(11px, 0.85vw, 13px)", lineHeight: 1.7 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. SBR & 人造乳膠 ─────────────────────────────────────── */}
        <section style={{ paddingTop: 56, paddingBottom: 48, borderBottom: "1px solid #eaedf3" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px 64px" }}>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#b05050", marginBottom: 12 }}>
                Synthetic Rubber
              </p>
              <div style={{ width: 48, height: 3, background: "#b05050", borderRadius: 2, marginBottom: 20 }} />
              <h2 style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: "#333", marginBottom: 20 }}>
                SBR 合成乳膠
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: "clamp(14px, 1.05vw, 15.5px)", lineHeight: 2, color: "#3a3a3a" }}>
                <p>合成乳膠是人造乳膠和天然乳膠的混合物，僅含有30%以下的天然乳膠，其他70%通常是由SBR丁苯橡膠所製成，雖然能藉此壓低成本與售價，但產品壽命不及天然乳膠的一半，且人造乳膠原料「苯」已被確認為致癌物質，可能對人體造成不可預期的損害。</p>
                <p>這裡要特別提醒，部分商家會聲稱他們的合成乳膠床墊有「天然」成分，但床墊要達到高品質，唯有標明使用100%天然乳膠才符合業界標竿。</p>
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>
                Artificial Latex
              </p>
              <div style={{ width: 48, height: 3, background: "#ccc", borderRadius: 2, marginBottom: 20 }} />
              <h2 style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: "#333", marginBottom: 20 }}>
                人造乳膠
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: "clamp(14px, 1.05vw, 15.5px)", lineHeight: 2, color: "#3a3a3a" }}>
                <p>在20世紀乳膠床墊技術發展之初，當時人們大多購買天然乳膠床墊，但隨著戰爭爆發，天然乳膠被用於製作戰時物品，於是科學家開始研發乳膠替代品，採用石化材料製造出人造乳膠，因為價格便宜，受到不少消費者青睞。</p>
                <p>人造乳膠又稱為化學乳膠、科技乳膠，雖然也有「乳膠」兩字，卻跟天然乳膠完全沒有關係，基本上人造乳膠的原料是苯乙烯和丁二烯或其他化學材料，由於透氣性和彈性完全不及天然乳膠，雖價格低廉，但使用壽命更短且也含有致癌物質「苯」，不可不慎！</p>
              </div>
            </div>

          </div>
        </section>

        {/* ── 5. 如何識別 ────────────────────────────────────────────── */}
        <section style={{ paddingTop: 56, paddingBottom: 48, borderBottom: "1px solid #eaedf3" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: BLUE, marginBottom: 12 }}>
            How to Identify
          </p>
          <div className="latex-divider" />
          <h2 style={{ fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 700, color: NAVY, marginBottom: 40 }}>
            如何識別天然乳膠？
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {IDENTIFY_METHODS.map((m) => (
              <div key={m.key} className="latex-identify-card">
                <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${BLUE} 0%, #3a4d7a 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      fontFamily: "var(--font-display, 'MiSansTC')",
                    }}
                  >
                    {m.key}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "clamp(15px, 1.4vw, 17px)", fontWeight: 700, color: NAVY, marginBottom: 8 }}>
                      {m.key}：{m.title}
                    </h4>
                    <p style={{ fontSize: "clamp(13px, 1vw, 14.5px)", lineHeight: 1.85, color: "#4a4a4a" }}>{m.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. COMPARISON TABLE ────────────────────────────────────── */}
        <section style={{ paddingTop: 56, paddingBottom: 48, borderBottom: "1px solid #eaedf3" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: BLUE, marginBottom: 12 }}>
            Comparison
          </p>
          <div className="latex-divider" />
          <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, color: NAVY, marginBottom: 32 }}>
            一表了解天然乳膠、合成乳膠、人造乳膠的差異
          </h2>
          <div style={{ overflowX: "auto", borderRadius: 14, border: "1px solid #e2e5ef", boxShadow: "0 2px 16px rgba(81,95,140,0.06)" }}>
            <table className="latex-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "clamp(13px, 1vw, 14.5px)", minWidth: 560 }}>
              <thead>
                <tr>
                  <th style={{ padding: "14px 20px", background: "#f6f8fc", borderBottom: "2px solid #e2e5ef", textAlign: "left", width: "20%", color: "#888", fontWeight: 600 }} />
                  <th style={{ padding: "14px 20px", background: BLUE, color: "#fff", borderBottom: `2px solid ${BLUE}`, fontWeight: 700, fontSize: "clamp(13px, 1.1vw, 15px)" }}>
                    ✦ 天然乳膠
                  </th>
                  <th style={{ padding: "14px 20px", background: "#f6f8fc", borderBottom: "2px solid #e2e5ef", fontWeight: 600, color: "#555" }}>
                    合成乳膠
                  </th>
                  <th style={{ padding: "14px 20px", background: "#f6f8fc", borderBottom: "2px solid #e2e5ef", fontWeight: 600, color: "#555" }}>
                    人造乳膠
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? "#fff" : "#fafbfd" }}>
                    <td style={{ padding: "12px 20px", borderBottom: "1px solid #eaedf3", fontWeight: 700, color: NAVY, fontSize: "clamp(12px, 0.95vw, 14px)" }}>{row.label}</td>
                    <td style={{ padding: "12px 20px", borderBottom: "1px solid #eaedf3", color: BLUE, fontWeight: 600 }}>{row.nr}</td>
                    <td style={{ padding: "12px 20px", borderBottom: "1px solid #eaedf3", color: "#555" }}>{row.sbr}</td>
                    <td style={{ padding: "12px 20px", borderBottom: "1px solid #eaedf3", color: "#888" }}>{row.fake}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 7. 為什麼要選用乳膠 ──────────────────────────────────── */}
        <section style={{ paddingTop: 56, paddingBottom: 48, borderBottom: "1px solid #eaedf3" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: BLUE, marginBottom: 12 }}>
            Why Choose Latex
          </p>
          <div className="latex-divider" />
          <h2 style={{ fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 700, color: NAVY, marginBottom: 40 }}>
            為什麼要選用乳膠床墊/枕頭？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="latex-benefit-card" style={{ cursor: "default" }}>
                <div className="img-wrap" style={{ position: "relative", width: "100%", paddingBottom: "65%", marginBottom: 20, borderRadius: 12, overflow: "hidden" }}>
                  <Image src={b.src} alt={b.alt} fill className="object-cover" />
                </div>
                <h4 style={{ color: BLUE, fontWeight: 700, fontSize: "clamp(15px, 1.4vw, 18px)", marginBottom: 10 }}>{b.title}</h4>
                <p style={{ color: "#5F6062", fontSize: "clamp(13px, 1vw, 14.5px)", lineHeight: 1.85 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 8. PRODUCT RECS ──────────────────────────────────────── */}
        <section style={{ paddingTop: 56, paddingBottom: 80 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: BLUE, marginBottom: 12 }}>
            Lunio Recommendations
          </p>
          <div className="latex-divider" />
          <h2 style={{ fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 700, color: NAVY, marginBottom: 40 }}>
            Lunio 天然乳膠寢具推薦
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.title} className="latex-product-card">
                <div className="img-wrap" style={{ position: "relative", width: "100%", paddingBottom: "72%" }}>
                  <Image src={p.src} alt={p.alt} fill className="object-cover object-center" />
                </div>
                <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 style={{ color: NAVY, fontSize: "clamp(15px, 1.4vw, 18px)", fontWeight: 700, marginBottom: 12, lineHeight: 1.4 }}>
                    {p.title}
                  </h3>
                  <p style={{ color: "#5F6062", fontSize: "clamp(13px, 0.95vw, 14.5px)", lineHeight: 1.85, flexGrow: 1, marginBottom: 24 }}>
                    {p.desc}
                  </p>
                  <Link href={p.href} className="latex-btn-outline">
                    {p.btnLabel} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── 9. FULL-WIDTH CTA BANNER ─────────────────────────────────── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #2a3f6e 60%, #515f8c 100%)`,
          padding: "64px clamp(20px, 4vw, 48px)",
          textAlign: "center",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          100% Natural Latex · ECO · SGS · LGA Certified
        </p>
        <h2 style={{ color: "#fff", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, marginBottom: 12 }}>
          體驗天然乳膠的真實差異
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(14px, 1.2vw, 16px)", marginBottom: 36 }}>
          選擇 Lunio Latex® 泰國100%天然頂級橡樹原液，讓每一夜都值得期待
        </p>
        <Link
          href="/latex-mattress"
          style={{
            display: "inline-block",
            background: "#E8A44A",
            color: "#fff",
            borderRadius: 30,
            padding: "15px 48px",
            fontWeight: 700,
            fontSize: "clamp(14px, 1.1vw, 16px)",
            letterSpacing: "0.1em",
            boxShadow: "0 4px 20px rgba(232,164,74,0.4)",
          }}
        >
          查看更多　天然乳膠床墊
        </Link>
      </section>

    </main>
  );
}
