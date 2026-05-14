"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const VARIATION_LABELS: Record<string, string> = {
  "標準雙人": "標準雙人（5/25陸續出貨）",
};

const BLUE = "#17569E";
const NAVY = "#17284b";

const ACCORDION_ITEMS = [
  {
    title: "產品詳情",
    content: (
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-3" style={{ color: NAVY }}>一觸即涼的絲滑包覆</p>
        <ul className="space-y-2" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
          <li>雙面涼感布料，Qmax值達 0.31，一觸即涼</li>
          <li>觸感絲滑，柔順透氣，像被涼爽絲網輕輕包覆</li>
          <li>OEKO-TEX® 認證，嬰幼兒、敏感肌也能安心用</li>
          <li>可機洗，清潔保養輕鬆</li>
          <li>四季適用，輕盈好收納，居家、冷氣房、旅行都好用</li>
        </ul>
      </div>
    ),
  },
  {
    title: "尺寸和重量",
    content: (
      <div style={{ fontSize: 14, color: "#374151" }}>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <p style={{ color: NAVY }}>尺寸：150 × 200 cm</p>
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            <Image src="/snowsilk/Snowsilk (1).webp" alt="Lunio SnowSilk 尺寸" fill className="object-contain" sizes="200px" />
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
        <li><strong>布料</strong>：兩面皆為 80% 尼龍、20% 彈性纖維</li>
        <li><strong>填充物</strong>：纖維絎縫 150g/m²</li>
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
            className="flex items-center justify-between w-full px-0 py-5 text-left">
            <span className="font-semibold" style={{ fontSize: 15, color: NAVY }}>{item.title}</span>
            <ChevronDown size={16} style={{ color: "#9ca3af", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {open === i && <div className="pb-4">{item.content}</div>}
        </div>
      ))}
    </div>
  );
}

interface Props { product: Product; variations: ProductVariation[]; }

export function SnowSilkPanel({ product, variations }: Props) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    variations.length > 0 ? variations[0] : null
  );
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();
  const ctaRef = useRef<HTMLButtonElement>(null);
  const handleVariationChange = useCallback((v: ProductVariation | null) => setSelectedVariation(v), []);

  const price = selectedVariation?.price || product.price;
  const regularPrice = selectedVariation?.regular_price || product.regular_price;
  const isOnSale = selectedVariation?.on_sale ?? product.on_sale;

  return (
    <div className="space-y-6">
      <div className="hidden lg:block space-y-2">
        <nav className="flex items-center gap-1 text-sm" style={{ color: BLUE }}>
          <Link href="/" className="hover:underline">Lunio</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <span style={{ color: "#aaa" }}>Lunio SnowSilk 智能涼被</span>
        </nav>
        <p style={{ fontSize: 16, color: "#9ca3af" }}>Lunio Snow Silk</p>
        <h1 className="font-bold leading-tight" style={{ fontSize: 30, color: NAVY }}>智能涼被</h1>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span style={{ fontSize: 13.5, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
        </div>
      </div>

      {/* Promo box */}
      <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "#f0f6ff", border: "1px solid #dbeafe" }}>
        <p style={{ fontSize: 13.5, color: "#555" }}>
          限量100組加購｜
          <span className="font-semibold" style={{ color: BLUE }}>涼被1 × 工學枕1 超值組合</span>
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-bold" style={{ fontSize: 26, color: BLUE }}>NT${Number(price).toLocaleString()}</span>
        {isOnSale && regularPrice && (
          <span className="line-through" style={{ fontSize: 16, color: "#bbb" }}>NT${Number(regularPrice).toLocaleString()}</span>
        )}
      </div>

      {/* Size */}
      {variations.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium shrink-0" style={{ color: "#555" }}>尺寸</span>
          <select className="flex-1 border rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{ borderColor: "#ddd", color: NAVY, backgroundColor: "#f8faff" }}
            onChange={(e) => {
              const v = variations.find((v) => v.attributes.some((a) => a.option === e.target.value)) ?? null;
              handleVariationChange(v);
            }}
            defaultValue={variations[0]?.attributes[0]?.option ?? ""}>
            {variations.map((v) => {
              const opt = v.attributes[0]?.option ?? "";
              return <option key={v.id} value={opt}>{VARIATION_LABELS[opt] ?? opt}</option>;
            })}
          </select>
        </div>
      )}

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
        <button ref={ctaRef} type="button" disabled={adding}
          onClick={async () => { const id = selectedVariation?.id ?? product.id; setAdding(true); await addItem(id, qty); setAdding(false); }}
          className="flex-1 py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: BLUE, fontSize: 16 }}>
          {adding ? "加入中..." : "立刻搶購"}
        </button>
      </div>

      {/* Price repeat + service line */}
      <div className="flex items-baseline gap-2">
        <span className="font-bold" style={{ fontSize: 18, color: BLUE }}>NT${Number(price).toLocaleString()}</span>
        {isOnSale && regularPrice && (
          <span className="line-through" style={{ fontSize: 13, color: "#bbb" }}>NT${Number(regularPrice).toLocaleString()}</span>
        )}
      </div>
      <div className="h-px bg-gray-100" /><p style={{ fontSize: 13, color: "#9ca3af", letterSpacing: "0.02em" }}>本島免運+門市試躺+一對一服務</p>

      <Accordion />

      <StickyCartBar productName="Lunio Snow Silk" subtitle="智能涼被"
        price={price} regularPrice={regularPrice} isOnSale={isOnSale}
        variations={variations} selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange} variationLabels={VARIATION_LABELS}
        onAddToCart={async () => { const id = selectedVariation?.id ?? product.id; setAdding(true); await addItem(id, qty); setAdding(false); }}
        adding={adding} triggerRef={ctaRef} />
    </div>
  );
}
