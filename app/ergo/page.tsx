import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ErgoHeroCarousel from "@/components/ergo/ErgoHeroCarousel";
import ErgoStoreSection from "@/components/ergo/ErgoStoreSection";

export const metadata: Metadata = {
  title: "Lunio Ergo 系列人體工學枕｜Lunio Taiwan",
  description: "Lunio Ergo 系列人體工學枕，智慧貼合、絕佳支撐、釋放壓力，讓每一夜都舒適好眠。",
  alternates: { canonical: "/ergo" },
};

const BLUE   = "#3c7ae4";
const NAVY   = "#17284b";
const ORANGE = "#f5892a";

const FEATURES = [
  { src: "/ergo/ergo-icon01.png", label: "符合人體工學" },
  { src: "/ergo/ergo-icon02.png", label: "絕佳支撐" },
  { src: "/ergo/ergo-icon03.png", label: "釋放壓力" },
  { src: "/ergo/ergo-icon04.png", label: "舒適透氣" },
  { src: "/ergo/ergo-icon05.png", label: "無毒認證" },
  { src: "/ergo/ergo-icon06.png", label: "親膚柔軟" },
];

const PRODUCTS = [
  {
    src: "/embrance/PC1-3.webp",
    alt: "Lunio Embrace 多功能擁抱枕",
    title: "Lunio Embrace 多功能擁抱枕",
    price: "NT$3,980", original: "NT$5,980", discount: "33% Off",
    desc: "最舒服的大靠枕，不論是追劇、滑手機、看書，讓你的背部放鬆依靠，手臂也能輕鬆有撐",
    href: "/product/lunio-embrace",
  },
  {
    src: "/hypercool/cover_HyperCool-PC.webp",
    alt: "Lunio HyperCool 智能工學護頸枕",
    title: "Lunio HyperCool 智能工學護頸枕",
    price: "NT$1,790", priceTo: "NT$3,290", discount: "68% Off",
    desc: "4 大專區精準支撐，減少落枕打鼾。多重涼感設計，最適合睡覺怕熱的人。可作蝶形枕、止鼾枕、側睡枕，一枕多用",
    href: "/product/lunio-hypercool",
  },
  {
    src: "/ergo/Mercury (1).webp",
    alt: "Lunio Mercury 石墨烯機能記憶枕",
    title: "Lunio Mercury 石墨烯機能記憶枕",
    price: "NT$2,199", priceTo: "NT$3,399", discount: "73% Off",
    desc: "石墨烯涼威科技，三層自由調整高低，貼合頸肩曲線設計",
    href: "/product/lunio-mercury",
  },
  {
    src: "/nebula/Lunio-Hybrid-Nebula-Pillow00005.webp",
    alt: "Lunio Nebula 經典記憶枕",
    title: "Lunio Nebula 經典記憶枕",
    price: "NT$895", priceTo: "NT$4,375", discount: "84% Off",
    desc: "優質天絲記憶棉，柔軟不失支撐，貼合頸肩曲線設計",
    href: "/product/lunio-nebula",
  },
];

const VIDEOS = [
  { src: "/ergo/maxresdefault.jpg",     label: "愛子開箱Mercury機能記憶枕" },
  { src: "/ergo/maxresdefault (1).jpg", label: "Mercury 機能記憶枕 功能測試" },
  { src: "/ergo/maxresdefault (2).jpg", label: "Nebula 經典記憶枕 功能測試" },
];

const BRAND_SECTIONS = [
  {
    img: "/ergo/VDO-Brand-03_sleep-expert.jpg",
    imgAlt: "Bunny 睡眠專家",
    eyebrow: "Sleep Expert",
    title: "床墊＋枕頭試躺試睡，專家幫你評估",
    desc: "在 Lunio 門市，有專業睡眠顧問，依據你的體型、睡姿與睡眠習慣，進行評估分析，推薦合適的床墊與枕頭，幫你解決睡眠困擾",
    imgRight: true,
  },
  {
    img: "/ergo/VDO-Brand-02_sleep-smart.jpg",
    imgAlt: "品質為本 Lunio職人精神哲學",
    eyebrow: "Smart Sleep",
    title: "比起銷量，Lunio 更在乎你能睡得好",
    desc: "整合 Smart Sleep 科技，解決最多人困擾的酸痛、淺眠與悶熱出汗等睡眠問題，讓你每晚都能放鬆好眠",
    imgRight: false,
  },
  {
    img: "/ergo/VDO-Brand-01_vision.jpg",
    imgAlt: "Better Sleep for You",
    eyebrow: "Brand Vision",
    title: "Better Sleep for You",
    desc: "我們持續進化每一代產品，只為打造更好睡的床墊和枕頭\n高品質不該昂貴，而是人人能負擔得起\n因為好睡眠，是每個人都該有的幸福",
    imgRight: true,
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

const W = { maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" };

export default function ErgoPage() {
  return (
    <main style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif", color: "#212020" }}>
      <style>{`
        .ep-card {
          background:#fff; border-radius:16px; overflow:hidden;
          border:1px solid #e8edf4; display:flex; flex-direction:column;
          transition:box-shadow .25s,transform .25s;
        }
        .ep-card:hover { box-shadow:0 12px 40px rgba(60,122,228,.14); transform:translateY(-4px); }
        .ep-card .iw { overflow:hidden; }
        .ep-card .iw img { transition:transform .45s ease; }
        .ep-card:hover .iw img { transform:scale(1.05); }

        .ep-vid { position:relative; border-radius:14px; overflow:hidden; cursor:pointer; }
        .ep-vid-overlay {
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,0,.2); transition:background .2s;
        }
        .ep-vid:hover .ep-vid-overlay { background:rgba(0,0,0,.35); }
        .ep-play {
          width:54px; height:54px; border-radius:50%; background:rgba(220,40,40,.9);
          display:flex; align-items:center; justify-content:center; transition:transform .2s;
          box-shadow:0 4px 16px rgba(0,0,0,.3);
        }
        .ep-vid:hover .ep-play { transform:scale(1.12); }

        .ep-feat-item { transition:transform .2s; }
        .ep-feat-item:hover { transform:translateY(-4px); }

        .ep-svc-item { transition:transform .2s, opacity .2s; }
        .ep-svc-item:hover { transform:translateY(-3px); opacity:.85; }

        .ep-brand-img { position:relative; width:100%; border-radius:16px; overflow:hidden; aspect-ratio:16/10; }
        .ep-brand-play {
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,0,.12); transition:background .2s;
        }
        .ep-brand-play:hover { background:rgba(0,0,0,.3); }
        .ep-brand-play-circle {
          width:60px; height:60px; border-radius:50%; background:rgba(220,40,40,.88);
          display:flex; align-items:center; justify-content:center;
          transition:transform .2s; box-shadow:0 4px 20px rgba(0,0,0,.25);
        }
        .ep-brand-play:hover .ep-brand-play-circle { transform:scale(1.1); }

        .ep-btn {
          display:inline-flex; align-items:center; justify-content:center;
          padding:11px 28px; border-radius:30px; background:${BLUE};
          color:#fff; font-weight:600; font-size:14px; letter-spacing:.08em;
          transition:background .2s,transform .15s; text-decoration:none;
        }
        .ep-btn:hover { background:#2a62c8; transform:translateY(-1px); }

        .ep-eyebrow {
          font-size:11px; font-weight:600; letter-spacing:.25em;
          text-transform:uppercase; color:${BLUE}; margin-bottom:10px;
        }
        .ep-divider {
          width:40px; height:3px; background:${BLUE}; border-radius:2px; margin-bottom:18px;
        }
      `}</style>

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <ErgoHeroCarousel />

      {/* ── 2. FEATURES ──────────────────────────────────────────────── */}
      <section style={{ background:"#fff", padding:"clamp(40px,6vw,72px) 0" }}>
        <div style={W}>
          <p className="ep-eyebrow" style={{ textAlign:"center" }}>Smart · Ergonomic · Certified</p>
          <h2 style={{ textAlign:"center", fontSize:"clamp(20px,2.5vw,28px)", fontWeight:700, color:NAVY, marginBottom:"clamp(32px,4vw,52px)" }}>
            Lunio Ergo系列 人體工學枕
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-8">
            {FEATURES.map((f) => (
              <div key={f.label} className="ep-feat-item" style={{ textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
                <div style={{ width:72, height:72, background:"#f0f4fd", borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", padding:10 }}>
                  <Image src={f.src} alt={f.label} width={52} height={52} className="object-contain" />
                </div>
                <p style={{ fontSize:"clamp(11px,1vw,13px)", fontWeight:600, color:NAVY, letterSpacing:".05em" }}>{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PRODUCTS ──────────────────────────────────────────────── */}
      <section id="products" style={{ background:"#f6f9ff", padding:"clamp(48px,6vw,72px) 0" }}>
        <div style={W}>
          <p className="ep-eyebrow" style={{ textAlign:"center" }}>Ergo Pillow Series</p>
          <h2 style={{ textAlign:"center", fontSize:"clamp(20px,2.5vw,28px)", fontWeight:700, color:NAVY, marginBottom:"clamp(32px,4vw,48px)" }}>
            選一顆最適合你的枕頭
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {PRODUCTS.map((p) => (
              <div key={p.title} className="ep-card">
                <div className="iw" style={{ position:"relative", width:"100%", paddingBottom:"72%", overflow:"hidden" }}>
                  <Image src={p.src} alt={p.alt} fill className="object-cover object-center"
                    sizes="(max-width:640px) 100vw,(max-width:1280px) 50vw,25vw" />
                  <span style={{ position:"absolute", top:12, left:12, background:ORANGE, color:"#fff", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:6 }}>
                    {p.discount}
                  </span>
                </div>
                <div style={{ padding:"18px 18px 22px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", flexGrow:1 }}>
                  <h3 style={{ fontSize:"clamp(13px,1.2vw,15px)", fontWeight:700, color:NAVY, marginBottom:8, lineHeight:1.4 }}>{p.title}</h3>
                  <p style={{ marginBottom:10 }}>
                    <span style={{ color:ORANGE, fontWeight:700, fontSize:"clamp(13px,1.1vw,14px)" }}>{p.price}</span>
                    {"priceTo" in p
                      ? <span style={{ color:ORANGE, fontWeight:700, fontSize:"clamp(13px,1.1vw,14px)" }}> — {(p as { priceTo: string }).priceTo}</span>
                      : <span style={{ color:"#bbb", fontSize:12, textDecoration:"line-through", marginLeft:6 }}>{p.original}</span>
                    }
                  </p>
                  <p style={{ color:"#5F6062", fontSize:"clamp(12px,.9vw,13px)", lineHeight:1.8, flexGrow:1, marginBottom:18 }}>{p.desc}</p>
                  <Link href={p.href} className="ep-btn" style={{ fontSize:13, padding:"9px 22px" }}>選擇規格</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. VIDEOS ────────────────────────────────────────────────── */}
      <section style={{ background:"#eaf0fb", padding:"clamp(48px,6vw,72px) 0" }}>
        <div style={W}>
          <p className="ep-eyebrow" style={{ textAlign:"center" }}>Watch &amp; Experience</p>
          <h2 style={{ textAlign:"center", fontSize:"clamp(20px,2.5vw,28px)", fontWeight:700, color:NAVY, marginBottom:"clamp(28px,4vw,44px)" }}>
            體驗 Lunio Ergo 枕頭的支撐舒適
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {VIDEOS.map((v) => (
              <div key={v.label} className="ep-vid">
                <Image src={v.src} alt={v.label} width={640} height={360} className="w-full h-auto block" />
                <div className="ep-vid-overlay">
                  <div className="ep-play">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top,rgba(0,0,0,.65),transparent)", padding:"24px 14px 12px", color:"#fff", fontSize:13, fontWeight:500 }}>
                  {v.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. BRAND SECTIONS ────────────────────────────────────────── */}
      {BRAND_SECTIONS.map((b, i) => (
        <section key={b.title} style={{ background: i % 2 === 0 ? "#fff" : "#f6f9ff", padding:"clamp(48px,6vw,80px) 0" }}>
          <div style={W}>
            {/* Mobile: always text first, image second */}
            {/* Desktop: alternate left/right */}
            <div style={{ display:"grid", gap:"clamp(28px,5vw,64px)", alignItems:"center",
              gridTemplateColumns:"1fr",
            }}
              className="md:grid-cols-2"
            >
              {/* Text block — always rendered first in DOM (mobile reads top→down) */}
              <div style={{ order: 1 }} className={b.imgRight ? "md:order-1" : "md:order-2"}>
                <p className="ep-eyebrow">{b.eyebrow}</p>
                <div className="ep-divider" />
                <h2 style={{ fontSize:"clamp(20px,2.4vw,28px)", fontWeight:700, color:NAVY, marginBottom:16, lineHeight:1.35 }}>
                  {b.title}
                </h2>
                <p style={{ fontSize:"clamp(14px,1.1vw,16px)", color:"#4a4a4a", lineHeight:2, whiteSpace:"pre-line" }}>
                  {b.desc}
                </p>
              </div>
              {/* Image block */}
              <div style={{ order: 2 }} className={b.imgRight ? "md:order-2" : "md:order-1"}>
                <div className="ep-brand-img">
                  <Image src={b.img} alt={b.imgAlt} fill className="object-cover"
                    sizes="(max-width:768px) 100vw,50vw" />
                  <div className="ep-brand-play">
                    <div className="ep-brand-play-circle">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── 6. STORE ─────────────────────────────────────────────────── */}
      <ErgoStoreSection />

      {/* ── 7. SERVICES ──────────────────────────────────────────────── */}
      <section style={{ background:"#EEF4FF", padding:"clamp(40px,5vw,64px) 0" }}>
        <div style={W}>
          <p className="ep-eyebrow" style={{ textAlign:"center" }}>Free of Charge</p>
          <h2 style={{ textAlign:"center", fontSize:"clamp(18px,2vw,24px)", fontWeight:700, color:NAVY, marginBottom:"clamp(28px,4vw,44px)" }}>
            免費服務
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-8">
            {SERVICES.map((s) => (
              <div key={s.label} className="ep-svc-item" style={{ textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
                <div style={{ height:60, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Image src={s.src} alt={s.label} width={52} height={52} className="object-contain" />
                </div>
                <p style={{ fontSize:"clamp(11px,.9vw,13px)", fontWeight:600, color:NAVY, lineHeight:1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
