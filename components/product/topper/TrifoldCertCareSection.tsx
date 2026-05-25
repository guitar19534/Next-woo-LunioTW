import Image from "next/image";
import Link from "next/link";

const NAVY = "#17284b";
const BLUE = "#17569E";

const CERTS = [
  { src: "/topper-trifold/Lunio-CertiPUR-US認證.webp",         label: "CertiPUR-US",    w: 110, h: 110 },
  { src: "/topper-trifold/Lunio-OEKO-TEX-Standard-100-認證.webp", label: "OEKO-TEX® Standard 100", w: 110, h: 110 },
  { src: "/topper-trifold/ISPA認證.webp",                       label: "ISPA",           w: 110, h: 110 },
];

export function TrifoldCertCareSection() {
  return (
    <>
      {/* ── Certifications ───────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: "clamp(48px,5vw,72px) 0" }}>
        <div className="max-w-[860px] w-[90%] mx-auto text-center">
          <h2 className="font-bold mb-10" style={{ fontSize: "clamp(18px,2vw,24px)", color: NAVY }}>
            Nooz FlexiRest Trifold Topper 多重認證安全無毒更放心
          </h2>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {CERTS.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-2">
                <Image src={c.src} alt={c.label} width={c.w} height={c.h} className="object-contain" />
                <p style={{ fontSize: 13, color: "#6b7280" }}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Care Instructions + CTA ──────────────────────────────────── */}
      <section style={{ backgroundColor: "#f8faff", padding: "clamp(40px,4vw,56px) 0" }}>
        <div className="max-w-[860px] w-[90%] mx-auto">
          <h2 className="font-bold mb-5" style={{ fontSize: "clamp(18px,2vw,22px)", color: BLUE }}>保養說明</h2>
          <ul className="space-y-2 mb-5" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
            {[
              "床墊套可洗滌，請勿漂白、烘乾或熨燙。",
              "床墊的髒污處，可使用濕布沾取中性清潔劑，做局部擦拭清潔。",
              "建議定期使用除濕機，避免睡眠環境潮濕。",
            ].map((s, i) => (
              <li key={i} style={{ fontSize: 14.5, color: "#374151", lineHeight: 1.85 }}>{s}</li>
            ))}
          </ul>
          <p style={{ fontSize: 14, color: "#555" }}>
            ＊ 收到產品時建議一個月內進行開箱，並錄影開箱過程，避免後續產生爭議。
          </p>

          {/* CTA */}
          <div className="flex justify-center mt-10">
            <Link
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-10 py-4 rounded-full font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: BLUE, fontSize: 16 }}
            >
              選購Nooz Trifold Topper三折疊日式床墊
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
