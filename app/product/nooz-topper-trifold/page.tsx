import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductBySlug, getProductVariations } from "@/lib/woocommerce";
import { ProductGalleryCustom } from "@/components/product/shared/ProductGalleryCustom";
import { TopperTrifoldPanel } from "@/components/product/topper/TopperTrifoldPanel";
import { NoozPreFooter } from "@/components/shared/NoozPreFooter";

const SLUG = "nooz-topper-trifold";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Nooz FlexiRest Trifold Topper 三折疊日式床墊｜厚8公分 露營宿舍首選 – Lunio" },
  description: "Nooz FlexiRest Trifold Topper 三折疊日式床墊。厚8公分，附手提袋，好攜帶好收納。可拆洗防滑床套，適合宿舍、租屋、露營。",
  alternates: { canonical: "/product/nooz-topper-trifold" },
  openGraph: {
    title: "Nooz FlexiRest Trifold Topper 三折疊日式床墊",
    description: "厚8公分 × 三折疊設計 × 可拆洗床套",
  },
};

export default async function TopperTrifoldPage() {
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

      <section className="pt-12 pb-20" style={{ backgroundColor: "#f4f4f4" }}>
        <div className="max-w-[1400px] w-[85%] mx-auto">

          <div className="lg:hidden mb-4 space-y-2">
            <nav className="flex items-center gap-1 text-sm" style={{ color: "#17569E" }}>
              <a href="/" className="hover:underline">Lunio</a>
              <span style={{ color: "#aaa" }}>›</span>
              <a href="/topper" className="hover:underline" style={{ color: "#17569E" }}>薄床墊</a>
              <span style={{ color: "#aaa" }}>›</span>
              <span style={{ color: "#aaa" }}>FlexiRest Trifold</span>
            </nav>
            <p style={{ fontSize: 14, color: "#aaa" }}>Nooz FlexiRest Trifold Topper</p>
            <h1 className="font-bold" style={{ fontSize: 26, color: "#17284b" }}>三折疊日式床墊（厚8公分）</h1>
            <div className="flex items-center gap-2">
              <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）{product.average_rating || "4.8"}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGalleryCustom images={product.images} productName={product.name} />
            </div>
            <TopperTrifoldPanel product={product} variations={variations} />
          </div>
        </div>
      </section>

      <NoozPreFooter
        productName="Nooz FlexiRest Trifold Topper"
        productHref="/product/nooz-topper-trifold"
      />
    </main>
  );
}
