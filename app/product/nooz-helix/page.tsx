import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom } from "@/components/product/shared/ProductGalleryCustom";
import { HelixProductPanel } from "@/components/product/helix/HelixProductPanel";
import { HelixLayerSection } from "@/components/product/helix/HelixLayerSection";
import { HelixVideoSection } from "@/components/product/helix/HelixVideoSection";
import { HelixFeatureSection } from "@/components/product/helix/HelixFeatureSection";
import { HelixVideoReviewSection } from "@/components/product/helix/HelixVideoReviewSection";
import { NoozPreFooter } from "@/components/shared/NoozPreFooter";

// ── แก้ slug ให้ตรงกับ WooCommerce product slug ─────────────────────────────
const SLUG = "nooz-helix";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NOOZ Helix 乳膠獨立筒床墊｜Lunio Taiwan",
  description: "NOOZ Helix 乳膠獨立筒床墊。100 晚試睡保證，全台免費配送安裝。",
  alternates: { canonical: "/product/nooz-helix" },
  openGraph: {
    title: "NOOZ Helix 乳膠獨立筒床墊",
    description: "NOOZ Helix 乳膠獨立筒 × 100 晚免費試睡保證",
  },
};

export default async function HelixProductPage() {
  const product = await getProductBySlug(SLUG);
  if (!product) notFound();

  const variations = product.type === "variable"
    ? await getProductVariations(product.id)
    : [];

  return (
    <main className="misans-page">
      <style>{`
        .misans-page, .misans-page * {
          font-family: 'MiSansTC', 'Noto Sans TC', sans-serif !important;
        }
      `}</style>

      {/* ── Hero: Gallery + Purchase Panel ───────────────────────────── */}
      <section className="pt-12 pb-20" style={{ backgroundColor: "#EFEFEF" }}>
        <div className="max-w-[1400px] w-[85%] mx-auto">

          {/* Mobile: breadcrumb + title above gallery */}
          <div className="lg:hidden mb-4 space-y-3">
            <nav className="flex items-center gap-1 text-sm" style={{ color: "#17569E" }}>
              <a href="/" className="hover:underline">Lunio</a>
              <span style={{ color: "#aaa" }}>›</span>
              <span style={{ color: "#aaa" }}>{product.name}</span>
            </nav>
            <div>
              <h1 className="leading-tight mb-1 font-semibold"
                style={{ fontSize: "30px", color: "#17284b" }}>
                NOOZ Helix
              </h1>
              <p style={{ fontSize: "16px", color: "#aaa" }}>乳膠獨立筒</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span className="text-sm" style={{ color: "#555" }}>
                (Google 評論)床墊評價 {product.average_rating || "4.8"}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            {/* Gallery — sticky */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            {/* Panel */}
            <HelixProductPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── 7-Layer Section ──────────────────────────────────────────── */}
      <HelixLayerSection />

      {/* ── Feature Icons ────────────────────────────────────────────── */}
      <section className="bg-white py-8 md:py-10">
        <div className="max-w-[1100px] w-[90%] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6">
            {[
              { src: "/helix/活性碳-icon.webp",               line1: "科技活性碳",  line2: "有害物質吸附"   },
              { src: "/helix/icon-服貼扎實躺感軟硬適中.png",   line1: "服貼紮實",    line2: "躺感軟硬適中"   },
              { src: "/helix/icon-優異人體工學舒緩痠痛.png",   line1: "人體工學",    line2: "舒緩腰酸背痛"   },
              { src: "/helix/icon-防止塵蟎細菌降低過敏原.png", line1: "防蟎抗菌",    line2: "避免過敏原孳生" },
            ].map((item) => (
              <div key={item.line1} className="flex flex-col items-center gap-3 text-center">
                <Image
                  src={item.src}
                  alt={item.line1}
                  width={130}
                  height={130}
                  className="object-contain"
                />
                <div>
                  <p className="font-medium" style={{ fontSize: 15, color: "#17284b" }}>{item.line1}</p>
                  <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 2 }}>{item.line2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Section ────────────────────────────────────────────── */}
      <HelixVideoSection />

      {/* ── Feature Blocks ───────────────────────────────────────────── */}
      <HelixFeatureSection />

      {/* ── Video Review Section ─────────────────────────────────────── */}
      <HelixVideoReviewSection />

      {/* ── VS Comparison + Certifications ──────────────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1100px] w-[92%] mx-auto">

          {/* VS image */}
          <div className="flex justify-center mb-14">
            <Image
              src="/helix/Helix-4.webp"
              alt="NOOZ Helix VS 一般獨立筒床墊比較"
              width={1100}
              height={600}
              className="w-full h-auto rounded-2xl"
            />
          </div>

          {/* Certifications */}
          <p
            className="text-center mb-10 font-medium"
            style={{ fontSize: "clamp(15px, 1.8vw, 20px)", color: "#17284b", fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" }}
          >
            NOOZ Helix 多重認證安全無毒更放心
          </p>
          <div className="flex items-start justify-center gap-16 flex-wrap">
            {[
              { src: "/helix/Lunio-CertiPUR-US認證.webp", label: "泡棉安全無毒認證", w: 120, h: 120 },
              { src: "/helix/OEKO-TEX_v2.png",            label: "紡織品環保無毒驗證", w: 110, h: 120 },
            ].map((cert) => (
              <div key={cert.label} className="flex flex-col items-center gap-3">
                <Image
                  src={cert.src}
                  alt={cert.label}
                  width={cert.w}
                  height={cert.h}
                  className="object-contain"
                />
                <p style={{ fontSize: 13, color: "#6b7280", fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" }}>
                  {cert.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Size & Care ──────────────────────────────────────────────── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#f4f4f4", fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" }}>
        <div className="max-w-[860px] w-[92%] mx-auto space-y-10">

          {/* 床墊尺寸 */}
          <div>
            <h2 className="font-bold mb-4" style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "#17284b" }}>床墊尺寸</h2>
            <p className="mb-3" style={{ fontSize: 14.5, color: "#374151" }}>床墊厚度：24公分</p>
            <ul className="space-y-2 mb-4" style={{ paddingLeft: "1.4em", listStyleType: "disc" }}>
              {[
                "標準單人：89 x 188 x 24 cm；3 尺床墊",
                "單人加大：104 x 188 x 24 cm；3.5 尺床墊",
                "標準雙人：150 x 188 x 24 cm；5 尺床墊",
                "雙人加大：180 x 188 x 24 cm；6 尺床墊",
                "雙人特大：180 x 210 x 24 cm；7 尺床墊",
              ].map((s) => (
                <li key={s} className="font-medium" style={{ fontSize: 14.5, color: "#374151" }}>{s}</li>
              ))}
            </ul>
            <p style={{ fontSize: 14, color: "#6b7280" }}>床墊尺寸因手工製作誤差正負2cm屬正常</p>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb" }} />

          {/* 保養說明 */}
          <div>
            <h2 className="font-bold mb-5" style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "#17284b" }}>保養說明</h2>
            <ol className="space-y-3 mb-6" style={{ paddingLeft: "1.4em", listStyleType: "decimal" }}>
              {[
                "Lunio 床墊表布及內部結構皆為科技機能設計，不可拆洗，表布起毛球或線頭屬正常現象，不影響使用",
                "為避免髒汙滲透與細菌滋生，建議搭配防水防蟎保潔墊與床包，並定期以吸塵器清潔表面、勤換床單",
                "床墊長期使用後出現「2.5 公分內」，的人體壓痕屬正常，建議每 3～6 個月，將床墊頭尾對調即可改善",
                "乳膠床墊請避免曝曬於高溫或紫外線環境，以維持材質彈性與壽命",
                "由於表布採用毛覓填充，會隨著使用習慣與方式更貼合身型，故逐漸減少或出現些許不平整為正常使用現象",
              ].map((item, i) => (
                <li key={i} style={{ fontSize: 14.5, color: "#374151", lineHeight: 1.85 }}>{item}</li>
              ))}
            </ol>
            <p className="mb-2" style={{ fontSize: 14.5, color: "#374151" }}>想了解更多清潔與保養技巧：</p>
            <p className="mb-1">
              {/* TODO: 換成正確連結 */}
              <a href="#" style={{ fontSize: 14.5, color: "#17569E" }}>【乳膠床墊清潔及保養指南】</a>
            </p>
            <p>
              {/* TODO: 換成正確連結 */}
              <a href="#" style={{ fontSize: 14.5, color: "#17569E" }}>【床墊清潔大揭秘：7技巧讓您不再與塵蟎髒污共眠】</a>
            </p>
          </div>

        </div>
      </section>

      {/* ── Nooz Pre-Footer ──────────────────────────────────────────── */}
      <NoozPreFooter
        productName="NOOZ HELIX 獨立筒床墊"
        productHref="/product/nooz-helix"
      />

    </main>
  );
}
