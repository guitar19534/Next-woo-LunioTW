import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom }           from "@/components/product/shared/ProductGalleryCustom";
import { SmartguardPanel }                from "@/components/product/protector/SmartguardPanel";
import { SmartguardFeatureCarousel }      from "@/components/product/protector/SmartguardFeatureCarousel";
import { SmartguardLifestyleSlider }      from "@/components/product/protector/SmartguardLifestyleSlider";
import { SmartguardVideoSection }         from "@/components/product/protector/SmartguardVideoSection";
import { SmartguardCompareSection }       from "@/components/product/protector/SmartguardCompareSection";
import { ProductPreFooter }               from "@/components/shared/ProductPreFooter";

const SLUG = "lunio-protector";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lunio Smartguard 智能防水保潔墊｜Lunio Taiwan",
  description: "Lunio Smartguard 智能防水保潔墊。100% TENCEL 天絲親膚，TPU 超薄防水膜，360° 彈性包覆，安靜無聲，OEKO-TEX® 認證。",
  alternates: { canonical: "/product/lunio-protector" },
  openGraph: {
    title: "Lunio Smartguard 智能防水保潔墊",
    description: "100%防水 × 親膚柔軟 × 靜音好眠，最舒服的天絲防水保潔墊",
  },
};

export default async function SmartguardPage() {
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

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-20 bg-white">
        <div className="max-w-[1400px] w-[85%] mx-auto">
          <div className="lg:hidden mb-4 space-y-2">
            <nav className="flex items-center gap-1 text-sm" style={{ color: "#17569E" }}>
              <a href="/" className="hover:underline">Lunio</a>
              <span style={{ color: "#aaa" }}>›</span>
              <span style={{ color: "#aaa" }}>Lunio Smartguard 智能防水保潔墊</span>
            </nav>
            <p style={{ fontSize: 14, color: "#aaa" }}>Lunio Smartguard</p>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>智能防水保潔墊</h1>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
            </div>
          </div>
          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            <SmartguardPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      {/* ── Feature Icons ─────────────────────────────────────────────── */}
      <SmartguardFeatureCarousel />

      {/* ── Lifestyle Slider ─────────────────────────────────────────── */}
      <SmartguardLifestyleSlider />

      {/* ── Video Section ────────────────────────────────────────────── */}
      <SmartguardVideoSection />

      {/* ── 適合對象 + 產品比較 (dark) ──────────────────────────────── */}
      <SmartguardCompareSection />

      {/* ── Pre-footer ───────────────────────────────────────────────── */}
      <ProductPreFooter />

    </main>
  );
}
