import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, getProductCategoryBySlug, getAllCategorySlugs } from "@/lib/woocommerce";
import type { Product } from "@/lib/woocommerce.d";
import MattressTabFilter from "@/components/mattress/MattressTabFilter";
import ErgoStoreSection from "@/components/ergo/ErgoStoreSection";


interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getProductCategoryBySlug(slug);
  if (!cat) return { title: "找不到分類" };
  return {
    title: `${cat.name}｜Lunio Taiwan`,
    description: cat.description || `${cat.name}，Lunio乳膠床墊推薦`,
    alternates: { canonical: `/shop/category/${slug}` },
  };
}

/* ── helpers ───────────────────────────────────────────────────── */
function parsePriceHtml(html: string): string {
  const nums = html.match(/[\d,]+/g)?.filter((n) => n.replace(",", "").length >= 3) ?? [];
  if (nums.length === 0) return "";
  if (nums.length === 1) return `NT$${nums[0]}`;
  return `NT$${nums[0]} — NT$${nums[nums.length - 1]}`;
}

function calcDiscount(regular: string, sale: string): number | null {
  const reg = parseFloat(regular.replace(/,/g, ""));
  const sal = parseFloat(sale.replace(/,/g, ""));
  if (!reg || !sal || sal >= reg) return null;
  return Math.round((1 - sal / reg) * 100);
}

function extractListItems(html: string): string[] {
  const matches = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  return matches.map((m) => m[1].replace(/<[^>]+>/g, "").trim()).filter(Boolean);
}

/* ── product card ──────────────────────────────────────────────── */
const BLUE  = "#3c7ae4";
const NAVY  = "#17284b";
const ORANGE = "#f5892a";

function WcProductCard({ p }: { p: Product }) {
  const img = p.images?.[0]?.src;
  const discount = calcDiscount(p.regular_price, p.sale_price);
  const price = parsePriceHtml(p.price_html) || (p.price ? `NT$${p.price}` : "");
  const features = extractListItems(p.short_description);
  const href = `/product/${p.slug}`;

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e4e8f0",
      borderRadius: 14,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      transition: "box-shadow .25s, transform .25s",
    }} className="hover:shadow-xl hover:-translate-y-1">
      {/* Image */}
      {img && (
        <div style={{ position: "relative", width: "100%", paddingBottom: "62%", overflow: "hidden" }}>
          <Image src={img} alt={p.name} fill className="object-cover object-center"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" />
          {discount && (
            <span style={{ position: "absolute", top: 12, left: 12, background: ORANGE, color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 6 }}>
              {discount}% Off
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div style={{ padding: "18px 18px 0", flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Link href={href} style={{ textDecoration: "none" }}>
          <h2 style={{ fontSize: "clamp(14px,1.3vw,16px)", fontWeight: 700, color: NAVY, marginBottom: 8, lineHeight: 1.4, cursor: "pointer" }}
            className="hover:text-[#3c7ae4] transition-colors">
            {p.name}
          </h2>
        </Link>

        {price && (
          <p style={{ fontSize: "clamp(13px,1.1vw,15px)", color: BLUE, fontWeight: 700, marginBottom: 14 }}>
            {price}
          </p>
        )}

        {features.length > 0 && (
          <ul style={{ paddingLeft: 18, margin: "0 0 16px", flexGrow: 1 }}>
            {features.map((f, i) => (
              <li key={i} style={{ fontSize: "clamp(12px,0.95vw,13.5px)", color: "#555", lineHeight: 1.8, marginBottom: 2 }}>
                {f}
              </li>
            ))}
          </ul>
        )}

        {features.length === 0 && (
          <div
            className="wc-desc"
            style={{ flexGrow: 1, fontSize: "clamp(12px,0.95vw,13.5px)", color: "#555", lineHeight: 1.8, marginBottom: 16 }}
            dangerouslySetInnerHTML={{ __html: p.short_description }}
          />
        )}
      </div>

      {/* Button */}
      <div style={{ padding: "12px 18px 18px" }}>
        <Link href={href} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          width: "100%", padding: "12px 0", borderRadius: 30,
          background: BLUE, color: "#fff", fontWeight: 700, fontSize: 14,
          letterSpacing: "0.08em", textDecoration: "none",
        }}>
          🛒 瀏覽產品
        </Link>
      </div>
    </div>
  );
}

const CERTS = [
  { src: "/mattress/Lunio-產品獲得CertiPUR-US認證.png",             label: "泡棉安全無毒認證" },
  { src: "/mattress/Lunio-乳膠床墊具有SGS認證.png",                 label: "無甲醛測試" },
  { src: "/mattress/Lunio-乳膠床墊具有歐盟ECOCERT天然有機認證.png",  label: "歐盟床墊環保無毒驗證" },
  { src: "/mattress/Lunio-乳膠產LGA檢測合格.png",                   label: "德國萊茵家具安全無毒" },
  { src: "/mattress/Lunio-產品獲得OEKO-TEX-Standard-1000-認證.png", label: "紡織品環保無毒驗證" },
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

/* ── page ──────────────────────────────────────────────────────── */
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [cat, { data: products }] = await Promise.all([
    getProductCategoryBySlug(slug),
    getProducts(1, 24, { category: undefined }).catch(() => ({ data: [] as Product[], headers: { total: 0, totalPages: 0 } })),
  ]);

  if (!cat) notFound();

  // Re-fetch with correct category id
  const { data: catProducts } = await getProducts(1, 24, { category: cat.id })
    .catch(() => ({ data: [] as Product[], headers: { total: 0, totalPages: 0 } }));

  const colClass = catProducts.length === 1
    ? "grid-cols-1 max-w-sm"
    : catProducts.length === 2
    ? "grid-cols-1 sm:grid-cols-2"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <main style={{ fontFamily: "'MiSansTC','Noto Sans TC',sans-serif", color: "#212020", background: "#fff" }}>

      {/* ── 1. HEADER ─────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(40px,5vw,64px) 0 clamp(32px,4vw,48px)" }}>
        <div style={W}>
          <h1 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 800, color: BLUE, marginBottom: 16, lineHeight: 1.3 }}>
            {cat.name}
          </h1>
          {cat.description && (
            <p style={{ fontSize: "clamp(13px,1.1vw,16px)", color: "#444", lineHeight: 1.9, maxWidth: 960 }}
              dangerouslySetInnerHTML={{ __html: cat.description }} />
          )}
        </div>
      </section>

      {/* ── 2. PRODUCTS ──────────────────────────────────────────── */}
      <section style={{ background: "#f6f9ff", padding: "clamp(32px,4vw,56px) 0" }}>
        <div style={W}>
          {catProducts.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888", padding: "48px 0", fontSize: 16 }}>
              此分類目前暫無商品，請稍後再查看。
            </p>
          ) : (
            <div className={`grid gap-5 ${colClass}`}>
              {catProducts.map((p) => <WcProductCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* dashed divider */}
      <div style={{ borderTop: "1px dashed #c8d4e8", margin: "clamp(24px,3vw,40px) clamp(20px,4vw,48px)" }} />

      {/* ── 3. CERTIFICATIONS ────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(40px,5vw,60px) 0" }}>
        <div style={W}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 700, color: NAVY, marginBottom: 12 }}>
            多重認證安全無毒更放心
          </h2>
          <p style={{ textAlign: "center", fontSize: "clamp(13px,1.05vw,15px)", color: "#555", maxWidth: 640, margin: "0 auto 40px" }}>
            Lunio的乳膠床墊，採用泰國天然乳膠原料及各項專利技術製成，更獲得多項國際安全認證，安全無毒睡起來更安心！
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-10" style={{ maxWidth: 860, margin: "0 auto" }}>
            {CERTS.map((c) => (
              <div key={c.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image src={c.src} alt={c.label} width={76} height={76} className="object-contain h-full w-auto" />
                </div>
                <p style={{ fontSize: "clamp(11px,0.9vw,13px)", fontWeight: 600, color: NAVY, textAlign: "center", lineHeight: 1.4 }}>{c.label}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "#aaa" }}>
            •TERMS APPLY&nbsp;&nbsp;••DETAILS
          </p>
        </div>
      </section>

      {/* ── 4. STORE ─────────────────────────────────────────────── */}
      <ErgoStoreSection />

      {/* ── 5. TAB FILTER ────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(36px,5vw,52px) 0" }}>
        <div style={W}>
          <MattressTabFilter />
        </div>
      </section>

      {/* ── 6. FREE SERVICES ─────────────────────────────────────── */}
      <section style={{ background: "#eef3fb", padding: "clamp(40px,5vw,60px) 0" }}>
        <div style={W}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(18px,2vw,24px)", fontWeight: 700, color: NAVY, marginBottom: "clamp(28px,4vw,44px)" }}>
            免費服務
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-8">
            {SERVICES.map((s) => (
              <div key={s.label} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image src={s.src} alt={s.label} width={52} height={52} className="object-contain" />
                </div>
                <p style={{ fontSize: "clamp(11px,.9vw,13px)", fontWeight: 600, color: NAVY, lineHeight: 1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
