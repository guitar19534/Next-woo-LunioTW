import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/woocommerce";
import { getPostBySlug } from "@/lib/wordpress";
import { stripHtml, truncateText } from "@/lib/metadata";
import type { Product } from "@/lib/woocommerce.d";
import MattressTabFilter from "@/components/mattress/MattressTabFilter";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "床包、保潔墊、被套推薦 – Lunio 天絲寢具系列" },
  description: "Lunio精選天絲床包、天絲保潔墊、涼感被套，柔軟親膚、吸濕透氣，素色設計百搭好看，大幅提高睡眠品質與臥室質感。",
  alternates: { canonical: "/bedding" },
};

const BLUE   = "#17569E";
const NAVY   = "#17284b";
const ORANGE = "#f5892a";
const FONT   = "'MiSansTC','Noto Sans TC',sans-serif";
const W      = { maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" };

const BEDDING_SLUGS = [
  "tencel-duvet-cover",
  "lunio-snowsilk",
  "lunio-protector",
  "tencel-bedsheet",
];

const FEATURES: Record<string, string[]> = {
  "tencel-duvet-cover": [
    "奧地利100%純天絲，讓舊被瞬間升級成天絲被",
    "物理性天然涼感，吸濕透氣排汗，涼爽一整夜",
    "簡約素色，灰、黃、藍3色可選，優雅百搭",
  ],
  "lunio-snowsilk": [
    "雙面涼感布料，怎麼蓋都涼爽",
    "絲滑柔軟，親膚透氣",
    "四季適用，輕盈好收納",
  ],
  "lunio-protector": [
    "100%天絲 × 超薄防水膜，最舒服的防水保潔墊",
    "透氣舒適，安靜無聲，告別傳統保潔墊吵雜與悶熱",
    "360度彈性包覆，平整服貼不滑動",
  ],
  "tencel-bedsheet": [
    "100%萊賽爾纖維，60支紗 × 300織 × 加厚布料，柔軟又耐洗耐用",
    "口型加寬鬆緊帶，輕鬆將床墊包得服貼漂亮",
    "素色簡約，灰、黃、藍3色可選，優雅百搭",
  ],
};

const BLOG_SLUGS = [
  "cooling-blanket-material-guide",
  "tencel-bed-sheets-winter",
  "how-to-wash-tencel",
  "tencel-bedding-price",
  "what-is-mattress-protector",
  "tencel-bedsheet",
];

function formatPrice(p: string) {
  return `NT$${Number(p).toLocaleString()}`;
}

function calcDiscount(regular: string, sale: string): number | null {
  const reg = parseFloat(regular), sal = parseFloat(sale);
  if (!reg || !sal || sal >= reg) return null;
  return Math.round((1 - sal / reg) * 100);
}

function BeddingCard({ product }: { product: Product }) {
  const slug     = product.slug;
  const img      = product.images?.[0]?.src;
  const isVar    = product.type === "variable";
  const salePct  = calcDiscount(product.regular_price, product.sale_price);
  const priceStr = isVar
    ? `NT$${Number(product.price).toLocaleString()} — NT$${Number(product.regular_price || product.price).toLocaleString()}`
    : formatPrice(product.price);
  const features = FEATURES[slug] ?? [];

  return (
    <div className="flex flex-col" style={{ fontFamily: FONT }}>
      <Link href={`/product/${slug}`} className="group block relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "4/3", marginBottom: 20 }}>
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

      <div className="text-center flex flex-col items-center flex-1">
        <Link href={`/product/${slug}`}>
          <h3 className="font-bold mb-2 hover:opacity-80 transition-opacity leading-snug"
            style={{ fontSize: "clamp(13px,1.2vw,15px)", color: BLUE }}>{product.name}</h3>
        </Link>

        <p className="font-bold mb-3" style={{ fontSize: 13, color: ORANGE }}>
          {product.on_sale && !isVar ? (
            <>{formatPrice(product.price)}{" "}
            <span className="line-through" style={{ color: "#9ca3af", fontWeight: 400 }}>{formatPrice(product.regular_price)}</span></>
          ) : priceStr}
        </p>

        {features.length > 0 && (
          <ul className="space-y-1.5 mb-5 text-center" style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.75 }}>
            {features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        )}

        <Link href={`/product/${slug}`}
          className="mt-auto px-8 py-2.5 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: BLUE, letterSpacing: "0.05em" }}>
          選擇規格
        </Link>
      </div>
    </div>
  );
}

export default async function BeddingPage() {
  const products = await Promise.all(BEDDING_SLUGS.map((s) => getProductBySlug(s)));
  const validProducts = products.filter((p): p is Product => !!p);

  const blogPosts = (await Promise.all(
    BLOG_SLUGS.map((s) => getPostBySlug(s).catch(() => null))
  )).filter(Boolean);

  return (
    <main style={{ fontFamily: FONT, color: NAVY, background: "#fff" }}>

      {/* ── 1. HERO + PRODUCTS ────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(48px,6vw,72px) 0 clamp(40px,5vw,64px)" }}>
        <div style={W}>
          <h1 className="font-bold mb-4" style={{ fontSize: "clamp(20px,2.5vw,32px)", color: NAVY }}>
            床包、保潔墊、被套推薦
          </h1>
          <p style={{ fontSize: "clamp(13px,1.1vw,15px)", color: "#555", lineHeight: 1.9, maxWidth: 860, marginBottom: 40 }}>
            讓睡眠品質再升級！Lunio精選天絲床包、天絲保潔墊、涼感被套，柔軟親膚、吸濕透氣，換洗也簡單，素色設計百搭好看，大幅提高睡眠品質與臥室質感。
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {validProducts.map((p) => <BeddingCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── 2. BLOG ──────────────────────────────────────────────────── */}
      {blogPosts.length > 0 && (
        <section style={{ background: "#fafbff", padding: "clamp(40px,5vw,64px) 0" }}>
          <div style={W}>
            <h2 className="font-bold mb-8" style={{ fontSize: "clamp(18px,2.5vw,28px)", color: NAVY }}>
              床包、保潔墊、枕套挑選技巧、清潔保養
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => {
                if (!post) return null;
                const media   = post._embedded?.["wp:featuredmedia"]?.[0];
                const excerpt = post.excerpt?.rendered ? truncateText(stripHtml(post.excerpt.rendered), 100) : "";
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
                      <Link href={`/blog/${post.slug}`} className="text-sm font-semibold hover:underline" style={{ color: BLUE }}>
                        閱讀內容
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. CROSS-SELL ────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(40px,5vw,64px) 0" }}>
        <div style={W}>
          <MattressTabFilter />
        </div>
      </section>

    </main>
  );
}
