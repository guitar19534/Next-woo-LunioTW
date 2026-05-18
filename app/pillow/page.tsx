import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/woocommerce";
import { getPostBySlug } from "@/lib/wordpress";
import { stripHtml, truncateText } from "@/lib/metadata";
import type { Product } from "@/lib/woocommerce.d";
import { PillowCategoryTabs } from "@/components/pillow/PillowCategoryTabs";
import { PillowCrossSell } from "@/components/pillow/PillowCrossSell";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "枕頭推薦｜100%天然乳膠枕、減壓記憶枕 – Lunio Taiwan" },
  description: "Lunio 枕頭推薦：天然乳膠枕、護頸記憶枕、蝶形枕，改善落枕打鼾、肩頸痠痛，適合仰睡側睡，台灣免費配送。",
  alternates: { canonical: "/pillow" },
};

const BLUE  = "#17569E";
const NAVY  = "#17284b";
const ORANGE = "#f5892a";
const FONT  = "'MiSansTC','Noto Sans TC',sans-serif";
const W     = { maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" };

/* ── Product slugs to show ── */
const PILLOW_SLUGS = [
  "pillows",
  "lunio-embrace",
  "lunio-hypercool",
  "lunio-icefit",
  "nooz-butterfly",
  "lunio-mercury",
  "lunio-nebula",
];

/* ── Feature text per product ── */
const FEATURES: Record<string, string[]> = {
  pillows:         ["高含量97%天然乳膠", "圓弧造型，仰側側睡都適合", "貼合頸肩曲線設計"],
  "lunio-embrace": ["最舒服的大靠枕", "追劇、滑手機、看書必備", "手臂也能輕鬆有撐"],
  "lunio-hypercool":["4大專區精準支撐，減少落枕打鼾", "多重涼感設計，適合怕熱的人", "可作為蝶形枕、止鼾枕、側睡枕"],
  "lunio-icefit":  ["涼感透氣，瞬間降溫1～3°C", "軟硬雙面，躺感自由選擇", "三段高度可調整"],
  "nooz-butterfly":["不到千元，CP值最高的蝶形枕", "竹纖維枕套，柔細", "可做為側睡枕、止鼾枕，一枕多用"],
  "lunio-mercury": ["石墨烯涼感科技", "三層自由調整高低", "貼合頸肩曲線設計"],
  "lunio-nebula":  ["優質天絲記憶棉", "柔軟不失支撐", "貼合頸肩曲線設計"],
};

/* ── Blog articles (hardcoded slugs) ── */
const BLOG_SLUGS = [
  "pillow-height-guide",
  "how-to-choose-pillow",
  "pillow-recommendation",
  "latex-pillow-washing",
  "memory-foam-pillow-recommendation",
  "what-is-butterfly-pillow",
];

function formatPrice(p: string) {
  return `NT$${Number(p).toLocaleString()}`;
}

function calcDiscount(regular: string, sale: string): number | null {
  const reg = parseFloat(regular), sal = parseFloat(sale);
  if (!reg || !sal || sal >= reg) return null;
  return Math.round((1 - sal / reg) * 100);
}

/* ── Product card ── */
function PillowCard({ product }: { product: Product }) {
  const slug = product.slug;
  const img  = product.images?.[0]?.src;
  const isVar = product.type === "variable";
  const salePct = calcDiscount(product.regular_price, product.sale_price);
  const priceLabel = isVar
    ? `NT$${Number(product.price).toLocaleString()} — NT$${Number(product.regular_price || product.price).toLocaleString()}`
    : formatPrice(product.price);

  const features = FEATURES[slug] ?? [];

  return (
    <div className="flex flex-col" style={{ fontFamily: FONT }}>
      {/* Image */}
      <Link href={`/product/${slug}`} className="group block relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "4/3", marginBottom: 16 }}>
        {salePct && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-white text-xs font-bold"
            style={{ backgroundColor: ORANGE }}>{salePct}% Off</div>
        )}
        {img ? (
          <Image src={img} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 100vw, 33vw" />
        ) : (
          <div className="w-full h-full" style={{ background: "#f0f4fb" }} />
        )}
      </Link>

      {/* Info */}
      <div className="text-center flex flex-col items-center flex-1">
        <Link href={`/product/${slug}`}>
          <h3 className="font-bold mb-2 hover:opacity-80 transition-opacity leading-snug"
            style={{ fontSize: "clamp(13px,1.2vw,15px)", color: BLUE }}>{product.name}</h3>
        </Link>

        <p className="font-bold mb-3" style={{ fontSize: 13, color: ORANGE }}>
          {product.on_sale && product.regular_price ? (
            <><span>{priceLabel.split("—")[0].trim()}</span>{" "}
            {!isVar && <span className="line-through" style={{ color: "#9ca3af", fontWeight: 400 }}>{formatPrice(product.regular_price)}</span>}</>
          ) : priceLabel}
        </p>

        {features.length > 0 && (
          <ul className="space-y-1 mb-4 text-center" style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.7 }}>
            {features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        )}

        <Link href={`/product/${slug}`}
          className="mt-auto px-7 py-2.5 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: BLUE, letterSpacing: "0.05em" }}>
          選擇規格
        </Link>
      </div>
    </div>
  );
}

export default async function PillowPage() {
  // Fetch all products in parallel
  const products = await Promise.all(PILLOW_SLUGS.map((s) => getProductBySlug(s)));
  const validProducts = products.filter((p): p is Product => !!p);

  // Fetch blog posts
  const blogPosts = (await Promise.all(
    BLOG_SLUGS.map((s) => getPostBySlug(s).catch(() => null))
  )).filter(Boolean);

  return (
    <main style={{ fontFamily: FONT, color: NAVY, background: "#fff" }}>

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(48px,6vw,72px) 0 clamp(32px,4vw,48px)" }}>
        <div style={W}>
          <h1 className="font-bold mb-4" style={{ fontSize: "clamp(20px,2.5vw,32px)", color: NAVY }}>
            枕頭推薦｜100%天然乳膠枕、減壓記憶枕
          </h1>
          <p style={{ fontSize: "clamp(13px,1.1vw,15px)", color: "#555", lineHeight: 1.9, maxWidth: 760, marginBottom: 8 }}>
            優質枕頭首選Lunio 乳膠枕，我們採用純天然泰國乳膠，製成高乳膠含量97%的枕頭，支撐彈性佳、呼吸順暢、減少打鼾。
          </p>
          <p style={{ fontSize: "clamp(13px,1.1vw,15px)", color: "#555", lineHeight: 1.9, maxWidth: 760, marginBottom: 40 }}>
            記憶枕採用涼感記憶棉，添加冷凝膠，清爽又減壓，通過多項國際無毒認證，仰睡、側睡都好睡，支撐頸部，告別落枕、肩頸酸痛。
          </p>
          <PillowCategoryTabs />
        </div>
      </section>

      {/* ── 2. PRODUCTS ──────────────────────────────────────────────── */}
      <section style={{ background: "#fafbff", padding: "clamp(40px,5vw,64px) 0" }}>
        <div style={W}>
          <h2 className="font-bold mb-3" style={{ fontSize: "clamp(18px,2.5vw,28px)", color: NAVY }}>
            枕頭優惠中，告別肩頸疼痛趁現在
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>枕頭換了一顆又一顆，就是找不到好睡的那一個？</p>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.8, marginBottom: 36 }}>
            Lunio 提供多款人體工學記憶枕和乳膠枕，採用高密度記憶棉和100%純天然乳膠，放鬆又支撐，不論是肩頸痠痛、落枕、打鼾困擾，總有適合你的那一顆，快來試試看吧！
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {validProducts.map((p) => <PillowCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── 3. BLOG ──────────────────────────────────────────────────── */}
      {blogPosts.length > 0 && (
        <section style={{ background: "#fff", padding: "clamp(40px,5vw,64px) 0" }}>
          <div style={W}>
            <h2 className="font-bold mb-8" style={{ fontSize: "clamp(18px,2.5vw,28px)", color: NAVY }}>
              枕頭選購、清洗保養技巧
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => {
                if (!post) return null;
                const media = post._embedded?.["wp:featuredmedia"]?.[0];
                const excerpt = post.excerpt?.rendered ? truncateText(stripHtml(post.excerpt.rendered), 80) : "";
                return (
                  <div key={post.id} className="flex flex-col" style={{ border: "1px solid #e5eaf5", borderRadius: 16, overflow: "hidden" }}>
                    {media?.source_url && (
                      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                        <Image src={media.source_url} alt={post.title.rendered} fill className="object-cover" sizes="33vw" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-semibold mb-2 leading-snug"
                        style={{ fontSize: 14, color: NAVY }}
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      {excerpt && <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.75, flexGrow: 1, marginBottom: 16 }}>{excerpt}</p>}
                      <Link href={`/blog/${post.slug}`}
                        className="text-sm font-semibold hover:underline"
                        style={{ color: BLUE }}>閱讀內容</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. CROSS-SELL ────────────────────────────────────────────── */}
      <section style={{ background: "#f8faff", padding: "clamp(40px,5vw,64px) 0" }}>
        <div style={W}>
          <PillowCrossSell />
        </div>
      </section>

    </main>
  );
}
