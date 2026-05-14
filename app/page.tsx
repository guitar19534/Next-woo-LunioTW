/**
 * Lunio Homepage
 * ─────────────────────────────────────────────────────────────────────────────
 * Sections (top → bottom, matching lunio.com.tw):
 *   1.  Hero              — full-viewport video background
 *   2.  CategoryShowcase  — 3-col lifestyle cards (床墊 / 枕頭 / 寢具配件)
 *   3.  ServiceCarousel   — 5 service-promise cards with prev/next + dots
 *   4.  BrandStory        — heading + hero image + prose + specs + CTA
 *   5.  FeatureStrip      — 4-col benefit bar
 *   4.  ProductShowcase   — interactive tab switcher (Gen4 / Quantum / NOOZ)
 *   5.  GrapheneSection   — 5 feature blocks + Gen4 spotlight
 *   6.  Lunio Collection  — 8-product grid (category 484)
 *   7.  PromoBanner       — dark CTA strip
 *   8.  BrandPromises     — dark navy big-number statistics
 *   9.  Pillow Grid       — 4-product pillow grid
 *  10.  StoreLocations    — 6 showroom cards
 *  11.  BlogSection       — 4 recent posts
 */

import { Suspense } from "react";

// ── Section components ────────────────────────────────────────────────────────
import { Hero }              from "@/components/home/hero";
import { CategoryShowcase }  from "@/components/home/category-showcase";
import { ServiceCarousel }  from "@/components/home/service-carousel";
import { Gen4Section }      from "@/components/home/gen4-section";
import { HypercoolSection } from "@/components/home/hypercool-section";
import { SnowWeaveSection } from "@/components/home/snowweave-section";
import { ServiceSection }   from "@/components/home/service-section";
import { OurstoreSection }  from "@/components/home/ourstore-section";
import { ReviewSection }    from "@/components/home/review-section";
import { FeatureStrip }     from "@/components/home/feature-strip";
import { Gen4Showcase }    from "@/components/product/gen4/Gen4Showcase";
import { BeddingShowcase } from "@/components/home/bedding-showcase";
import { ServicePromise }  from "@/components/home/service-promise";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { ProductShowcase } from "@/components/home/product-showcase";
import { GrapheneSection } from "@/components/home/graphene-section";
import { ProductGrid }     from "@/components/home/product-grid";
import { PromoBanner }     from "@/components/home/promo-banner";
import { BrandPromises }   from "@/components/home/brand-promises";
import { StoreLocations }  from "@/components/home/store-locations";
import { BlogSection }     from "@/components/home/blog-section";

// ── Data layer ────────────────────────────────────────────────────────────────
import { getProductBySlug, getProducts } from "@/lib/woocommerce";
import { brandConfig } from "@/brand.config";

// ── ISR: rebuild at most every hour ──────────────────────────────────────────
export const revalidate = 3600;

export const metadata = {
  title: "乳膠床墊首選Lunio｜為了更好的睡眠品質",
  description:
    "Lunio — 台灣頂級天然乳膠床墊品牌。石墨烯技術、骨科醫師合作研發、100晚試睡保證。提升深層睡眠30%，全台免費配送安裝。",
  alternates: { canonical: "/" },
  openGraph: {
    title: "乳膠床墊首選Lunio｜為了更好的睡眠品質",
    description:
      "台灣頂級天然乳膠床墊品牌。石墨烯技術、100晚試睡保證，全台免費配送。",
  },
};

// ── Loading skeleton ──────────────────────────────────────────────────────────
function GridSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <div className="py-14">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
        <div className="h-5 bg-[#E4E4E4] rounded w-40 mb-8 animate-pulse" />
        <div className={`grid gap-4 ${cols === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="rounded-[8px] bg-[#F8F8F8] animate-pulse aspect-square" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default async function Home() {
  // Parallel data fetch — all at build/revalidation time (server components)
  const [showcaseProducts, gen4Product, { data: lunioProducts }, { data: pillowProducts }] =
    await Promise.all([
      Promise.all(
        brandConfig.showcaseSlugs.map((slug) => getProductBySlug(slug))
      ),
      getProductBySlug("lunio-latex-mattress"),
      getProducts(1, 8, { category: 484 }),       // Lunio brand
      getProducts(1, 4, { category: 513 }),        // Pillows
    ]);

  return (
    <main>
      {/* 1. Hero ─────────────────────────────────────── */}
      <Hero />

      {/* 2. Category Showcase — 3-col card grid ──────── */}
      <CategoryShowcase />

      {/* 3. Service Carousel — 5 service cards ──────── */}
      <ServiceCarousel />

      {/* 4. Gen4 Section ────────────────────────────── */}
      <Gen4Section />

      {/* 5. Hypercool Section ────────────────────────── */}
      <HypercoolSection />

      {/* 6. SnowWeave Section ───────────────────────── */}
      <SnowWeaveSection />

      {/* 7. Service Section ─────────────────────────── */}
      <ServiceSection />

      {/* 8. Our Store Section ───────────────────────── */}
      <OurstoreSection />

      {/* 9. Review Section ──────────────────────────── */}
      <ReviewSection />

      {/* 5. Feature Strip ────────────────────────────── 
      <FeatureStrip /> */}

      {/* 6. Gen4 Product Deep Dive ───────────────────── 
      <Gen4Showcase /> */}

      {/* 7. Bedding Showcase — Pillow + Snow Weave ────── 
      <BeddingShowcase /> */}

      {/* 8. Service Delivery Promise ─────────────────── 
      <ServicePromise /> */}

      {/* ── ส่วนด้านล่างปิดชั่วคราว ──────────────────── */}
      {/* <CustomerReviews /> */}
      {/* <ProductShowcase products={showcaseProducts} /> */}
      {/* <GrapheneSection product={gen4Product} /> */}
      {/* <ProductGrid products={lunioProducts ?? []} title="Lunio 精選商品" eyebrow="LUNIO COLLECTION" viewAllHref="/shop/category/our-product" bgColor="#ffffff" columns={4} /> */}
      {/* <PromoBanner /> */}
      {/* <BrandPromises /> */}
      {/* <ProductGrid products={pillowProducts ?? []} title="枕頭系列" eyebrow="PILLOW COLLECTION" viewAllHref="/shop/category/pillow" bgColor="#F8F8F8" columns={4} /> */}
      {/* <StoreLocations /> */}
      {/* <Suspense fallback={<GridSkeleton cols={4} />}><BlogSection /></Suspense> */}
    </main>
  );
}
