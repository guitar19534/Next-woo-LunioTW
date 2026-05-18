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

const COLORS = [
  { key: "氣韻米", label: "氣韻米", swatch: "#C4A882" },
  { key: "量子藍", label: "量子藍", swatch: "#8FA3C3" },
  { key: "鉑金灰", label: "鉑金灰", swatch: "#D8D8D8" },
];

const SIZES = ["標準單人｜單人加大", "標準雙人｜雙人加大", "雙人特大"];

/* ─── Gallery images ────────────────────────────────────────── */
const GALLERY_IMAGES = [
  "/snowweave-blanket/PC1.webp",
  "/snowweave-blanket/PC2.webp",
  "/snowweave-blanket/PC3.webp",
  "/snowweave-blanket/Other-1.webp",
];

/* ─── Accordion ──────────────────────────────────────────────── */
const ACCORDION_ITEMS = [
  {
    title: "產品詳情",
    content: (
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-3" style={{ color: NAVY }}>輕柔守護，讓舊被瞬間升級</p>
        <p className="mb-3" style={{ color: "#6b7280" }}>
          接觸肌膚的第一層，天絲被套讓舊被瞬間變得柔軟奢華
        </p>
        <p className="mb-3" style={{ color: "#6b7280" }}>
          100% 奧地利天絲萊賽爾纖維<br />
          柔軟親膚，天然涼感，吸濕排汗，一夜清爽舒適
        </p>
        <p className="mb-3" style={{ color: "#6b7280" }}>
          60支紗 x 300織，高規格厚度 115gsm<br />
          手感細膩柔軟又耐用，清洗後依然順滑不易起毛球，機洗也方便
        </p>
        <p style={{ color: "#6b7280" }}>
          素色簡約設計<br />
          靜謐優雅，與床包完美搭配，悄悄提升臥室整體氛圍
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
            <li><span className="font-medium" style={{ color: NAVY }}>標準單人｜單人加大：</span>152×212 cm</li>
            <li><span className="font-medium" style={{ color: NAVY }}>標準雙人｜雙人加大：</span>182×212 cm</li>
            <li><span className="font-medium" style={{ color: NAVY }}>雙人特大：</span>242×212 cm</li>
          </ul>
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            <Image src="/snowweave-blanket/Snow-Weave.webp" alt="Lunio Snow Weave 包裝" fill className="object-contain" sizes="200px" />
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
        <li><strong>紗支數</strong>：60支 x 60支</li>
        <li><strong>織數</strong>：300針</li>
        <li><strong>克重</strong>：115gsm</li>
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

function Gallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <div className="space-y-3">
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-50" style={{ aspectRatio: "3/2" }}>
        <Image src={GALLERY_IMAGES[activeIdx]} alt="Lunio Snow Weave Blanket Cover" fill className="object-contain" sizes="(max-width:1024px) 100vw, 65vw" priority />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {GALLERY_IMAGES.map((src, i) => (
          <button key={i} type="button" onClick={() => setActiveIdx(i)}
            className="relative overflow-hidden rounded-xl aspect-square"
            style={{ border: i === activeIdx ? `2px solid ${BLUE}` : "2px solid transparent", backgroundColor: "#f5f5f5" }}>
            <Image src={src} alt={`preview ${i + 1}`} fill className="object-cover" sizes="15vw" />
          </button>
        ))}
      </div>
    </div>
  );
}

interface Props { product: Product; variations: ProductVariation[]; }

export function DuvetCoverHero({ product, variations }: Props) {
  const [selectedColor, setSelectedColor] = useState("氣韻米");
  const [selectedSize, setSelectedSize] = useState("雙人特大");
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();
  const ctaRef = useRef<HTMLButtonElement>(null);

  const selectedVariation = variations.find((v) =>
    v.attributes.some((a) => (a.name === "被套顏色" || a.name === "寢具顏色") && a.option === selectedColor) &&
    v.attributes.some((a) => (a.name === "被套尺寸" || a.name === "床包尺寸") && a.option === selectedSize)
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

  const formatPrice = (p: string) => p ? `NT$${Number(p).toLocaleString()}` : "";

  return (
    <section className="pt-12 pb-20 bg-white">
      <div className="max-w-[1400px] w-[85%] mx-auto">

        {/* Mobile header */}
        <div className="lg:hidden mb-4 space-y-2">
          <nav className="flex items-center gap-1 text-sm" style={{ color: BLUE }}>
            <Link href="/" className="hover:underline">Lunio</Link>
            <span style={{ color: "#aaa" }}>›</span>
            <span style={{ color: "#aaa" }}>Lunio SnowWeave 智能天絲被套</span>
          </nav>
          <h1 className="font-bold" style={{ fontSize: 22, color: NAVY }}>智能天絲涼感被套 3色</h1>
          <div className="flex items-center gap-2">
            <span style={{ color: "#f5a623" }}>★★★★★</span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[65fr_35fr] gap-10 lg:gap-16 items-start">

          {/* Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {isOnSale && regularPrice && (
              <div className="inline-block mb-3 px-3 py-1 rounded-full text-white text-sm font-bold"
                style={{ backgroundColor: "#f5892a" }}>
                {Math.round((1 - Number(price) / Number(regularPrice)) * 100)}% Off
              </div>
            )}
            <Gallery />
          </div>

          {/* Panel */}
          <div className="space-y-4">
            <div className="hidden lg:block space-y-2">
              <nav className="flex items-center gap-1 text-sm" style={{ color: BLUE }}>
                <Link href="/" className="hover:underline">Lunio</Link>
                <span style={{ color: "#aaa" }}>›</span>
                <span style={{ color: "#aaa" }}>Lunio SnowWeave 智能天絲被套</span>
              </nav>
              <h1 className="font-bold leading-snug" style={{ fontSize: 28, color: NAVY }}>
                Lunio Snow Weave Blanket Cover
              </h1>
              <p style={{ fontSize: 16, color: "#9ca3af" }}>智能天絲涼感被套 3色</p>
              <div className="flex items-center gap-2">
                <span style={{ color: "#f5a623" }}>★★★★★</span>
                <span style={{ fontSize: 13.5, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-bold" style={{ fontSize: 26, color: BLUE }}>
                {formatPrice(price)}
              </span>
              {isOnSale && regularPrice && (
                <span className="line-through" style={{ fontSize: 16, color: "#9ca3af" }}>
                  {formatPrice(regularPrice)}
                </span>
              )}
            </div>

            {/* Colors */}
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: NAVY }}>顏色：{selectedColor}</p>
              <div className="flex gap-2">
                {COLORS.map((c) => (
                  <button key={c.key} type="button" onClick={() => setSelectedColor(c.key)}
                    title={c.label}
                    className="rounded-full transition-all"
                    style={{
                      width: 28, height: 28, backgroundColor: c.swatch,
                      outline: selectedColor === c.key ? `2px solid ${BLUE}` : "2px solid transparent",
                      outlineOffset: 2,
                    }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm font-medium appearance-none"
                style={{ border: "1.5px solid #e5eaf5", color: NAVY, backgroundColor: "#f8faff", cursor: "pointer" }}>
                {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Qty + CTA */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1.5px solid #e5eaf5" }}>
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-11 flex items-center justify-center text-lg font-bold hover:bg-gray-50 transition-colors"
                  style={{ color: NAVY }}>−</button>
                <span className="w-10 text-center font-semibold" style={{ fontSize: 15, color: NAVY }}>{qty}</span>
                <button type="button" onClick={() => setQty(qty + 1)}
                  className="w-11 h-11 flex items-center justify-center text-lg font-bold hover:bg-gray-50 transition-colors"
                  style={{ color: NAVY }}>+</button>
              </div>
              <button ref={ctaRef} type="button" onClick={handleAddToCart} disabled={adding}
                className="flex-1 h-11 rounded-xl font-bold text-white transition-all"
                style={{ backgroundColor: adding ? "#93b4d9" : BLUE, fontSize: 15, letterSpacing: "0.05em" }}>
                {adding ? "加入中…" : "立刻搶購"}
              </button>
            </div>

            <p style={{ fontSize: 12, color: "#9ca3af" }}>本島免運＋門市試躺＋專業服務</p>

            <Accordion />
          </div>
        </div>
      </div>

      <StickyCartBar
        triggerRef={ctaRef}
        productName="Lunio Snow Weave Blanket Cover"
        subtitle="智能天絲涼感被套"
        price={formatPrice(price)}
        regularPrice={formatPrice(regularPrice)}
        isOnSale={isOnSale}
        variations={variations}
        selectedVariation={selectedVariation}
        onVariationChange={() => {}}
        variationLabels={{}}
        onAddToCart={handleAddToCart}
        adding={adding}
      />
    </section>
  );
}
