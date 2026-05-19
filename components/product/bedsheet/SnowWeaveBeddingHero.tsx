"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const BLUE = "#17569E";
const NAVY = "#17284b";

/* ─── Color config ───────────────────────────────────────────── */
const COLORS: { key: string; label: string; swatch: string }[] = [
  { key: "氣韻米", label: "氣韻米", swatch: "#C4A882" },
  { key: "量子藍", label: "量子藍", swatch: "#8FA3C3" },
  { key: "鉑金灰", label: "鉑金灰", swatch: "#D8D8D8" },
];

const SIZES = ["標準單人｜單人加大", "標準雙人", "雙人加大", "雙人特大"];

const BASE = "https://lunio.com.tw/wp-content/uploads";

/* ─── Gallery images per color (WooCommerce CDN + variation gallery plugin) ── */
const COLOR_IMAGES: Record<string, string[]> = {
  "氣韻米": [
    `${BASE}/2025/09/Cream-PC-Main8.webp`,
    `${BASE}/2021/04/Artboard-11.webp`,
    `${BASE}/2021/04/Artboard-21.webp`,
    `${BASE}/2021/04/Artboard-31.webp`,
    `${BASE}/2021/04/Artboard-41.webp`,
    `${BASE}/2021/04/Artboard-51.webp`,
    `${BASE}/2021/04/Artboard-61.webp`,
  ],
  "量子藍": [
    `${BASE}/2025/09/Navy-PC-Main8.webp`,
    `${BASE}/2021/04/Artboard-1.webp`,
    `${BASE}/2021/04/Artboard-2.webp`,
    `${BASE}/2021/04/Artboard-3.webp`,
    `${BASE}/2021/04/Artboard-4.webp`,
    `${BASE}/2021/04/Artboard-5.webp`,
    `${BASE}/2021/04/Artboard-6.webp`,
  ],
  "鉑金灰": [
    `${BASE}/2025/09/Grey-PC-Main8.webp`,
    `${BASE}/2021/04/Artboard-1-1.webp`,
    `${BASE}/2021/04/Artboard-2-1.webp`,
    `${BASE}/2021/04/Artboard-3-1.webp`,
    `${BASE}/2021/04/Artboard-4-1.webp`,
    `${BASE}/2021/04/Artboard-5-1.webp`,
    `${BASE}/2021/04/Artboard-6-1.webp`,
  ],
};

/* ─── Accordion ──────────────────────────────────────────────── */
const ACCORDION_ITEMS = [
  {
    title: "產品詳情",
    content: (
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-3" style={{ color: NAVY }}>親膚微涼，簡約優雅，臥室瞬間升級為低調奢華</p>
        <p className="mb-3" style={{ color: "#6b7280" }}>
          100% 奧地利天絲萊賽爾纖維<br />
          柔軟親膚，天然涼感，吸濕排汗，一夜清爽舒適
        </p>
        <p className="mb-3" style={{ color: "#6b7280" }}>
          360° 高彈力床包 + 美式信封枕套<br />
          鋪床輕鬆，整齊服貼，素色簡約設計，靜謐優雅，低調奢華感瞬間呈現
        </p>
        <p style={{ color: "#6b7280" }}>
          60支紗 x 300織，高規格厚度 115gsm<br />
          手感細膩柔軟又耐用，清洗後依然順滑不易起毛球，機洗也方便
        </p>
      </div>
    ),
  },
  {
    title: "尺寸和重量",
    content: (
      <div style={{ fontSize: 14, color: "#374151" }}>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <ul className="space-y-3" style={{ paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
            <li><span className="font-medium" style={{ color: NAVY }}>標準單人｜單人加大：</span><br />106×188×35 cm</li>
            <li><span className="font-medium" style={{ color: NAVY }}>標準雙人：</span>152×188×35 cm</li>
            <li><span className="font-medium" style={{ color: NAVY }}>雙人加大：</span>182×188×35 cm</li>
            <li><span className="font-medium" style={{ color: NAVY }}>雙人特大：</span>182×212×35 cm</li>
          </ul>
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            <Image src="/snowweave-bedding/Snow-Weave2.webp" alt="Lunio Snow Weave 包裝" fill className="object-contain" sizes="200px" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "運送方式",
    content: <p style={{ fontSize: 14, color: "#374151" }}>單買配件統一使用新竹物流出貨</p>,
  },
  {
    title: "材質",
    content: (
      <ul className="space-y-2" style={{ fontSize: 14, color: "#374151", paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
        <li><strong>材質</strong>：100% 天絲萊賽爾</li>
        <li><strong>紗支數</strong>：60支 × 60支</li>
        <li><strong>織數</strong>：300針</li>
        <li><strong>克重</strong>：115gsm</li>
        <li><strong>床包鬆緊帶寬度</strong>：2.5 公分（全周縫製）</li>
      </ul>
    ),
  },
  {
    title: "保養方式",
    content: (
      <div style={{ fontSize: 14, color: "#374151" }}>
        <ul className="space-y-2 mb-3" style={{ paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
          <li>搭配洗衣袋翻面清洗</li>
          <li>以冷水機洗（最高30°C）</li>
          <li>只可使用低速柔洗模式</li>
          <li>不可漂白、浸泡、高速脫水</li>
          <li>陰涼處懸掛晾乾</li>
          <li>不可熨燙、乾洗</li>
        </ul>
        <p style={{ color: "#9ca3af" }}>（產生毛球或者線頭屬自然現象）</p>
      </div>
    ),
  },
];

function Accordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-gray-100">
      {ACCORDION_ITEMS.map((item, i) => (
        <div key={i} className="border-b border-gray-100">
          <button type="button" onClick={() => setOpen(open === i ? null : i)}
            className="flex items-center justify-between w-full px-0 py-4 text-left">
            <span className="font-semibold" style={{ fontSize: 15, color: NAVY }}>{item.title}</span>
            <ChevronDown size={16} style={{ color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {open === i && <div className="pb-4">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}

/* ─── Color Gallery ──────────────────────────────────────────── */
function ColorGallery({ color }: { color: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const images = COLOR_IMAGES[color] ?? [];

  if (!images.length) return null;

  return (
    <div className="space-y-3">
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-50" style={{ aspectRatio: "3/2" }}>
        <Image src={images[activeIdx]} alt={color} fill className="object-contain" sizes="(max-width:1024px) 100vw, 65vw" priority />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button key={i} type="button" onClick={() => setActiveIdx(i)}
              className="relative overflow-hidden rounded-xl aspect-square"
              style={{ border: i === activeIdx ? `2px solid ${BLUE}` : "2px solid transparent", backgroundColor: "#f5f5f5" }}>
              <Image src={src} alt={`${color} ${i + 1}`} fill className="object-cover" sizes="15vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Hero Component ────────────────────────────────────── */
interface Props { product: Product; variations: ProductVariation[]; }

export function SnowWeaveBeddingHero({ product, variations }: Props) {
  const [selectedColor, setSelectedColor] = useState("氣韻米");
  const [selectedSize, setSelectedSize] = useState("雙人特大");
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();
  const ctaRef = useRef<HTMLButtonElement>(null);

  const selectedVariation = variations.find((v) =>
    v.attributes.some((a) => a.name === "寢具顏色" && a.option === selectedColor) &&
    v.attributes.some((a) => a.name === "床包尺寸" && a.option === selectedSize)
  ) ?? null;

  const price = selectedVariation?.price || product.price;
  const regularPrice = selectedVariation?.regular_price || product.regular_price;
  const isOnSale = selectedVariation?.on_sale ?? product.on_sale;

  const handleAddToCart = useCallback(async () => {
    const id = selectedVariation?.id ?? product.id;
    setAdding(true);
    await addItem(id, qty);
    setAdding(false);
  }, [selectedVariation, product.id, qty, addItem]);

  const VARIATION_LABELS: Record<string, string> = {};
  variations.forEach((v) => {
    const colorAttr = v.attributes.find((a) => a.name === "寢具顏色");
    const sizeAttr = v.attributes.find((a) => a.name === "床包尺寸");
    if (colorAttr && sizeAttr) VARIATION_LABELS[`${colorAttr.option}|${sizeAttr.option}`] = sizeAttr.option;
  });

  return (
    <section className="pt-12 pb-20 bg-white">
      <div className="max-w-[1400px] w-[85%] mx-auto">

        {/* Mobile breadcrumb + title */}
        <div className="lg:hidden mb-4 space-y-2">
          <nav className="flex items-center gap-1 text-sm" style={{ color: BLUE }}>
            <a href="/" className="hover:underline">Lunio</a>
            <span style={{ color: "#aaa" }}>›</span>
            <span style={{ color: "#aaa" }}>Lunio Snow Weave Bedding</span>
          </nav>
          <p style={{ fontSize: 14, color: "#9ca3af" }}>Lunio Snow Weave Bedding</p>
          <h1 className="font-bold" style={{ fontSize: 22, color: NAVY }}>智能天絲床包組（床包+枕套）3色</h1>
          <div className="flex items-center gap-2">
            <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
            <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）床墊評價 {parseFloat(product.average_rating) > 0 ? product.average_rating : "4.8"}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">

          {/* Gallery — color aware */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ColorGallery color={selectedColor} />
          </div>

          {/* Panel */}
          <div className="space-y-4">
            <div className="hidden lg:block space-y-2">
              <nav className="flex items-center gap-1 text-sm" style={{ color: BLUE }}>
                <Link href="/" className="hover:underline">Lunio</Link>
                <span style={{ color: "#aaa" }}>›</span>
                <span style={{ color: "#aaa" }}>Lunio Snow Weave Bedding</span>
              </nav>
              <p style={{ fontSize: 15, color: "#9ca3af" }}>Lunio Snow Weave Bedding</p>
              <h1 className="font-bold leading-snug" style={{ fontSize: 28, color: NAVY }}>
                智能天絲床包組（床包+枕套）3色
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
                <span style={{ fontSize: 13.5, color: "#6b7280" }}>（Google 評論）床墊評價 {parseFloat(product.average_rating) > 0 ? product.average_rating : "4.8"}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-bold" style={{ fontSize: 26, color: BLUE }}>NT${Number(price).toLocaleString()}</span>
              {isOnSale && regularPrice && (
                <span className="line-through" style={{ fontSize: 16, color: "#bbb" }}>NT${Number(regularPrice).toLocaleString()}</span>
              )}
            </div>

            {/* Color swatches */}
            <div className="flex items-center gap-3">
              {COLORS.map((c) => (
                <button key={c.key} type="button" title={c.label}
                  onClick={() => setSelectedColor(c.key)}
                  className="rounded-full transition-all"
                  style={{
                    width: 32, height: 32,
                    backgroundColor: c.swatch,
                    border: selectedColor === c.key ? `3px solid ${BLUE}` : "3px solid transparent",
                    outline: selectedColor === c.key ? `1px solid #ccc` : "none",
                    boxSizing: "border-box",
                  }} />
              ))}
            </div>

            {/* Size */}
            <div className="flex items-center gap-3">
              <select className="flex-1 border rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ borderColor: "#ddd", color: NAVY, backgroundColor: "#f8faff" }}
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}>
                {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Qty + CTA */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium" style={{ color: "#555" }}>數量</span>
              <div className="flex items-center rounded-xl overflow-hidden border" style={{ borderColor: "#ddd" }}>
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-50" style={{ color: "#555" }}>−</button>
                <span className="w-10 text-center text-sm font-medium" style={{ color: NAVY }}>{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-50" style={{ color: "#555" }}>＋</button>
              </div>
              <button ref={ctaRef} type="button" disabled={adding} onClick={handleAddToCart}
                className="flex-1 py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: BLUE, fontSize: 16 }}>
                {adding ? "加入中..." : "立刻搶購"}
              </button>
            </div>

            <p style={{ fontSize: 13, color: "#9ca3af" }}>本島免運+門市試躺+專業服務</p>
            <Accordion />

            <StickyCartBar
              productName="Lunio Snow Weave Bedding" subtitle="智能天絲床包組"
              price={price} regularPrice={regularPrice} isOnSale={isOnSale}
              variations={[]} selectedVariation={null}
              onVariationChange={() => {}} variationLabels={{}}
              onAddToCart={handleAddToCart} adding={adding} triggerRef={ctaRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
