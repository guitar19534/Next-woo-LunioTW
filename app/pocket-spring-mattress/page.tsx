import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PocketSpringFAQ from "@/components/pocket-spring/PocketSpringFAQ";

export const metadata: Metadata = {
  title: "獨立筒床墊推薦｜支撐抗干擾，耐用不易塌陷｜Lunio Taiwan",
  description:
    "高CP值但不失品質的獨立筒床墊推薦給您！比起傳統彈簧床，獨立筒床墊擁有更好的支撐性、腰部不會懸空；擁有更佳的抗干擾性，不受翻身寒醒。",
  alternates: { canonical: "/pocket-spring-mattress" },
};

const BLUE = "#3c7ae4";
const NAVY = "#17284b";
const TIPS_BG = "#3a506b";

/* ── Rating bar ────────────────────────────────────────────────── */
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

/* ── Product card ──────────────────────────────────────────────── */
function ProductCard({
  src, badge, title, size, original, price, feel, reason, support, cool, btnLabel, href,
}: {
  src: string; badge: string; title: string; size: string; original: string; price: string;
  feel: string; reason: string; support: number; cool: number; btnLabel: string; href: string;
}) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e0e6f0",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      maxWidth: 360,
      width: "100%",
    }}>
      <div style={{ position: "relative", width: "100%", paddingBottom: "62%" }}>
        <Image src={src} alt={title} fill className="object-cover object-center" sizes="360px" />
        <span style={{
          position: "absolute", top: 14, left: 14,
          background: "rgba(230,185,100,0.92)", backdropFilter: "blur(4px)",
          color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 20,
        }}>{badge}</span>
      </div>
      <div style={{ padding: "20px 20px 0" }}>
        <h3 style={{ fontSize: "clamp(15px,1.4vw,17px)", fontWeight: 700, color: BLUE, marginBottom: 10, lineHeight: 1.35 }}>
          {title}
        </h3>
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
      <div style={{ padding: "14px 20px 20px" }}>
        <Link href={href} style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", padding: "13px 0", borderRadius: 30,
          background: BLUE, color: "#fff", fontWeight: 700, fontSize: 14,
          letterSpacing: "0.08em", textDecoration: "none",
        }}>
          {btnLabel}
        </Link>
      </div>
    </div>
  );
}

/* ── Tip item ──────────────────────────────────────────────────── */
function TipSection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ fontSize: "clamp(16px,1.6vw,20px)", fontWeight: 700, color: BLUE, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 32, height: 32, borderRadius: "50%", background: BLUE, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, flexShrink: 0 }}>
          {num}
        </span>
        {title}
      </h3>
      <div style={{ fontSize: "clamp(13px,1.05vw,15px)", color: "#3a3a3a", lineHeight: 1.9, paddingLeft: 40 }}>
        {children}
      </div>
    </div>
  );
}

function SubTip({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontWeight: 700, color: BLUE, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: BLUE }}>▶</span> {title}
      </p>
      <div style={{ lineHeight: 1.85 }}>{children}</div>
    </div>
  );
}

const W = { maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" };

const CERT_ITEMS = [
  { src: "/pocket-spring-mattress/Lunio-乳膠床墊乳膠枕具有SGS認證.webp", label: "SGS驗證",      sub: "原物料SGS檢驗合格" },
  { src: "/pocket-spring-mattress/Lunio-歐盟ECOCERT天然有機認證.webp",   label: "eco–INSTITUT", sub: "德國環保無毒認證" },
  { src: "/pocket-spring-mattress/Lunio-德國萊茵LGA檢測合格.webp",       label: "LGA",           sub: "德國萊茵安全和品質驗證" },
  { src: "/pocket-spring-mattress/Lunio-CertiPUR-US認證.webp",           label: "CertiPUR–US",  sub: "泡棉安全無毒認證" },
];

export default function PocketSpringMattressPage() {
  return (
    <main style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif", color: "#212020", background: "#fff" }}>

      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(40px,5vw,64px) 0 clamp(32px,4vw,48px)" }}>
        <div style={W}>
          <h1 style={{ fontSize: "clamp(22px,3vw,38px)", fontWeight: 800, color: BLUE, marginBottom: 20, lineHeight: 1.3 }}>
            獨立筒床墊推薦｜支撐抗干擾，耐用不易塌陷
          </h1>
          <p style={{ fontSize: "clamp(14px,1.1vw,16px)", color: "#444", lineHeight: 2, maxWidth: 960 }}>
            高CP值但不失品質的獨立筒床墊推薦給您！比起傳統彈簧床，獨立筒床墊擁有更好的支撐性，腰部不會懸空；擁有更佳的抗干擾性，不受翻身寒醒，獨立筒床墊還能因應您的身形與睡姿分散壓力，溫柔包覆全身、減輕腰部負擔，一起來了解優質床墊帶給您的睡眠好處吧！
          </p>
        </div>
      </section>

      {/* ── 2. PRODUCTS ──────────────────────────────────────────── */}
      <section style={{ background: "#f6f9ff", padding: "clamp(32px,4vw,56px) 0" }}>
        <div style={W}>

          {/* Lunio row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-12 pb-12"
            style={{ borderBottom: "1px dashed #c8d4e8" }}>
            <div style={{ paddingTop: 8 }}>
              <Image src="/latex-mattress/Lunio-logo-main.webp" alt="Lunio" width={120} height={40} className="h-auto object-contain" style={{ marginBottom: 10, maxWidth: 120 }} />
              <p style={{ fontSize: 13, color: "#666" }}>多機能，耐用首選</p>
            </div>
            <ProductCard
              src="/mattress/QTM_KV5.webp"
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

          {/* Nooz row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div style={{ paddingTop: 8 }}>
              <Image src="/latex-mattress/Logo-Nooz.webp" alt="NOOZ" width={120} height={50} className="h-auto object-contain" style={{ marginBottom: 10, maxWidth: 120 }} />
              <p style={{ fontSize: 13, color: "#666" }}>超優惠、高CP首選</p>
            </div>
            <ProductCard
              src="/mattress/Helix-3.webp"
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
          </div>
        </div>
      </section>

      {/* ── 3. COMPARISON ────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(48px,5vw,72px) 0" }}>
        <div style={W}>
          <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: BLUE, marginBottom: 20 }}>
            獨立筒床墊比較好嗎？彈簧床 vs 獨立筒床墊
          </h2>
          <p style={{ fontSize: "clamp(13px,1.05vw,15px)", lineHeight: 1.9, marginBottom: 16, color: "#3a3a3a" }}>
            彈簧床墊起源於19世紀，最初流行的是連結式彈簧床，這種床墊是由相互串連的彈簧組成，提供基本的支撐力，彈簧床的缺點相當明顯，由於彈簧互相連動，因此對床墊的單點施壓，就會造成床墊的其他部分連帶震動，並伴隨金屬摩擦的聲響，然而價格也相對低廉。
          </p>
          <p style={{ fontSize: "clamp(13px,1.05vw,15px)", lineHeight: 1.9, marginBottom: 36, color: "#3a3a3a" }}>
            彈簧床問世不久後，有發明家改良出獨立筒床墊，把彈簧獨立裝進不織布袋中再組合，讓彈簧能分別受力，跟彈簧床相比，獨立筒床墊更貼合人體曲線，抗干擾性也更強，使用者比較不會受到枕邊人的翻身動作影響，更大幅減少金屬摩擦的噪音，獨立筒床墊因此廣受消費者歡迎。
          </p>
          <p style={{ fontSize: "clamp(13px,1.05vw,15px)", color: "#555", marginBottom: 20 }}>
            以下進一步從彈簧結構排列、軟硬程度與價位等面向，列出這兩種彈簧製床墊的差異。
          </p>

          {/* Table */}
          <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid #e0e6f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "clamp(13px,1vw,14.5px)", minWidth: 560 }}>
              <thead>
                <tr>
                  <th style={{ padding: "14px 20px", background: "#f0f4f8", borderBottom: "2px solid #e0e6f0", textAlign: "left", width: "20%", color: "#777", fontWeight: 600 }}>差異處</th>
                  <th style={{ padding: "14px 20px", background: BLUE, color: "#fff", borderBottom: `2px solid ${BLUE}`, fontWeight: 700 }}>獨立筒床墊</th>
                  <th style={{ padding: "14px 20px", background: "#f0f4f8", borderBottom: "2px solid #e0e6f0", fontWeight: 600, color: "#555" }}>彈簧床墊</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "彈簧排列結構", nr: "彈簧獨立裝在不織布袋中，形成筒狀排列所製成", sbr: "彈簧全都串連在一起，又稱為連結式彈簧床" },
                  { label: "彈簧間的干擾與噪音", nr: "彈簧受壓時彼此是獨立運作的，不易感受到枕邊人的翻身或上下床動作，抗干擾性佳、不會產生彈簧摩擦噪音，但受重壓時可能會有輕微彈簧擠壓聲", sbr: "彈簧受壓時，整體彈簧結構會一起受拉扯，容易感受到枕邊人的翻身或上下床動作，干擾性大，容易產生彈簧摩擦噪音" },
                  { label: "軟硬度與支撐性", nr: "軟硬度受彈簧排列與賴數影響，較符合人體工學，具有優良分散支撐作用、包覆性佳，但較重的臀部區域下沉的會比較明顯", sbr: "偏硬（硬式彈簧），支撐性較差，腰部容易產生懸空，導致睡得腰酸背痛" },
                  { label: "價位", nr: "高中低價位皆有，取決於材質用料", sbr: "偏低" },
                ].map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? "#fff" : "#fafbfd" }}>
                    <td style={{ padding: "14px 20px", borderBottom: "1px solid #eaedf3", fontWeight: 700, color: NAVY, fontSize: "clamp(12px,0.95vw,13.5px)" }}>{row.label}</td>
                    <td style={{ padding: "14px 20px", borderBottom: "1px solid #eaedf3", color: "#333" }}>{row.nr}</td>
                    <td style={{ padding: "14px 20px", borderBottom: "1px solid #eaedf3", color: "#666" }}>{row.sbr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 4. 8 TIPS HEADER ─────────────────────────────────────── */}
      <section style={{ background: TIPS_BG, padding: "clamp(48px,6vw,72px) 0", overflow: "hidden" }}>
        <div style={W}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.35 }}>
                獨立筒床墊8個選購重點
              </h2>
              <p style={{ fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(255,255,255,0.82)", lineHeight: 1.9 }}>
                由於獨立筒床墊的結構複雜，很多人在挑選床墊時，總是一個頭兩個大，為了協助您找到最理想的獨立筒床墊，以下要從專業角度，提供給您8個選購重點。
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "clamp(200px,30vw,340px)", height: "clamp(200px,30vw,340px)", borderRadius: "50%", overflow: "hidden", border: "5px solid rgba(255,255,255,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
                <Image src="/pocket-spring-mattress/pocket-spring-mattress.webp" alt="獨立筒彈簧" width={340} height={340} className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. 8 TIPS CONTENT ────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(48px,5vw,72px) 0" }}>
        <div style={W}>

          <TipSection num="1" title="獨立筒彈簧的品質">
            <p style={{ marginBottom: 20 }}>獨立筒床墊是由個別袋裝彈簧提供支撐力，是床墊重要的支撐層結構，因此床墊的優劣，關鍵就在於彈簧的品質與結構，評估方式可參考三個面向：彈簧材料、圈數與線徑。</p>
            <SubTip title="彈簧材料：決定彈性、強度、耐用性">
              <p>獨立筒床墊的彈簧以鋼材為主，經過高溫高壓製成，其中回火時間較長，含碳量達0.6%至2%的「高碳鋼」，其耐用度和強度比一般鋼材高，因此得到廣泛使用，不過市面上還有另一種強度更高的材料，叫做「高碳錳鋼」，是提升高碳鋼中的錳元素佔比，藉此拉高彈簧的韌性和彈力，使用的壽命也更加長久。</p>
            </SubTip>
            <SubTip title="彈簧圈數：越多越軟、越少越硬">
              <p style={{ marginBottom: 8 }}>獨立筒彈簧圈數愈多，床墊躺起來愈軟；圈數愈少則愈硬，因此在挑選床墊時，並非圈數愈多愈好，重點仍在於躺感與舒適度，市面獨立筒床墊的彈簧圈數，約在5到10圈，其中6至7圈為常見範圍。</p>
              <p>Lunio 研究中心經由多次精密測試，將彈簧圈數設定在「6.5圈」，因為這個圈數對多數人來說，能達到最佳的軟硬度與支撐力。</p>
            </SubTip>
            <SubTip title="彈簧線徑：越粗越硬、越細越軟">
              <p style={{ marginBottom: 8 }}>獨立筒彈簧的粗細也影響了躺感，常見的線徑介於1.6mm至2.4mm，彈簧的線徑愈粗，代表愈強韌，但彈性也相對較低，因此躺起來會比較硬，線徑超過2.4mm則會被稱為硬式獨立筒；較細的線徑，受壓時下沉幅度則愈大，躺起來會較軟，適合偏好軟床的朋友使用。</p>
              <p>Lunio 研究中心依人體工學角度出發，依身體曲線及部位，採用彈簧線徑2.0mm及2.2mm於不同受壓重量區域，提供最適當的支撐力，讓獨立筒可以自然地包覆睡眠者的身體，有助於調節身體和脊椎的比例，減少腰酸背脊背痛的問題。</p>
            </SubTip>
          </TipSection>

          <TipSection num="2" title="合適的軟硬度與支撐力">
            <p style={{ marginBottom: 12 }}>獨立筒床墊的軟硬度，取決於彈簧的線徑、圈數以及密度，理論上彈簧做得越小顆，彈簧使用數量就會越高、密度也愈高，愈能提供多點受力，讓身體各部位得到支撐。</p>
            <p>而每個人對軟硬度和支撐性的需求和感受不同，因此彈簧數量愈多，不見得就越好，也不一定適合您，因此在選購床墊時，不論體重或BMI指數，建議先前往門市試躺，才能找出最適合自己身型的獨立筒床墊。</p>
          </TipSection>

          <TipSection num="3" title="優質的透氣性">
            <p>台灣的氣候悶熱潮濕，想要擁有良好的睡眠品質，建議選用透氣性高的床墊，才不會讓熱能沉積在床墊中，此外獨立筒床墊在製作過程中，會使用黏合膠，將一袋袋的獨立筒黏合固定，而黏合膠的品質，會決定黏著的牢固性，以及膠體氣味的殘留程度，床墊的透氣性好，才能徹底散去黏合膠的氣味。</p>
          </TipSection>

          <TipSection num="4" title="適用的床墊尺寸與厚度">
            <p style={{ marginBottom: 20 }}>在選購任何床墊之前，一定要先確定您需要什麼尺寸的床墊，您可先量測您的床架可容納的長與寬，以及床墊加上床架後的高度，是否方便上下床，避免在購買床墊之後，出現放不進床架、不符合使用需求，或是床墊過高和過低的情況。</p>
            <div style={{ background: "#f0f4f8", borderRadius: 10, padding: "16px 20px", lineHeight: 2 }}>
              <p>想要詳細了解床墊尺寸，請參考{" "}
                <Link href="/blog/" style={{ color: BLUE, fontWeight: 600 }}>【床墊尺寸｜台灣、歐日美規尺寸差異，買床前必讀！】</Link>
              </p>
              <p>想要詳細了解床墊高度，請參考{" "}
                <Link href="/blog/" style={{ color: BLUE, fontWeight: 600 }}>【床墊厚度挑選指南：找到最適合您的理想高度】</Link>
              </p>
            </div>
          </TipSection>

          <TipSection num="5" title="舒適層材質種類">
            <p>獨立筒層於床墊的支撐層，在獨立筒上方還會有舒適層，避免使用者直接躺在彈簧上，而舒適層是最直接讓您感受到床墊的舒適性與包覆感，若採用天然乳膠最為舒適層，床墊睡起來更佳Q彈，若採用記憶棉，則會提高床墊對人體的貼合性，建議舒適層選用透氣良好的材質，才不會讓您有悶熱不適感。</p>
          </TipSection>

          <TipSection num="6" title="表布的材質與縫製">
            <p>表布的功能在於保護床墊內部結構，以及讓使用者躺起來較為舒服，隨著製床技術發展，市面上的獨立筒床墊，存在各種不同功能的表布，例如天絲表布的涼感和透氣效果，可以應對悶熱的氣候，不過無論採用什麼材質的表布，縫製都必須要精準穩固，才能真正發揮床墊的舒適性與貼合性。</p>
          </TipSection>

          <TipSection num="7" title="安全無毒認證">
            <p style={{ marginBottom: 24 }}>獨立筒床墊的結構與用料較為複雜，必須要能在安全性和無毒性上做出保證，其中針對床墊多面向品質做保障的有SGS驗證，在舒適層用料方面，天然乳膠原料有 eco–INSTITUT 德國組織無毒認證、LGA 德國萊茵高品質驗證，記憶棉和泡棉則有 CertiPUR–US 美國組織泡棉安全測試，建議選用擁有安全認證的獨立筒床墊，才能確保是真正安全無毒無甲醛，不管給大人、老年人或小孩使用都能安心。</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ maxWidth: 640 }}>
              {CERT_ITEMS.map((c) => (
                <div key={c.label} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Image src={c.src} alt={c.label} width={72} height={72} className="object-contain h-full w-auto" />
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: BLUE }}>{c.label}</p>
                  <p style={{ fontSize: 11, color: "#777" }}>{c.sub}</p>
                </div>
              ))}
            </div>
          </TipSection>

          <TipSection num="8" title="保固與售後服務">
            <p>獨立筒床墊的單價不低，為了保障您自身的消費權益，購買時務必與商家確認，如何協助您運送和搬運新床，以及是否幫忙清除掉舊床，另外有些商家提供寄倉服務，能讓您在領貨時間點上更加彈性，更重要的是店家的保固與售後服務，確保您在消費之後能安心使用床墊。</p>
          </TipSection>
        </div>
      </section>

      {/* ── 6. FAQ ───────────────────────────────────────────────── */}
      <PocketSpringFAQ />

    </main>
  );
}
