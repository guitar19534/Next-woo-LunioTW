"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const VARIATION_LABELS: Record<string, string> = {
  "標準單人": "標準單人",
};

const BLUE = "#17569E";
const NAVY = "#17284b";

const ACCORDION_ITEMS = [
  {
    title: "產品詳情",
    content: (
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-3" style={{ color: NAVY }}>一墊多用，隨時隨地享受好眠</p>
        <ul className="space-y-2" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
          <li>適合宿舍、租屋、露營、和式床墊使用</li>
          <li>三折疊設計，附手提袋，好攜帶好收納</li>
          <li>可拆洗防滑床套，清潔輕鬆</li>
          <li>厚 8 公分，提供足夠的支撐與舒適</li>
        </ul>
      </div>
    ),
  },
  {
    title: "尺寸規格",
    content: (
      <div style={{ fontSize: 14, color: "#374151" }}>
        <div className="space-y-1.5">
          <p>厚度：8 公分</p>
          <p className="mt-2 font-medium" style={{ color: NAVY }}>標準單人</p>
          <p>89 × 188 cm（3 尺）</p>
        </div>
        <p className="mt-3" style={{ fontSize: 13, color: "#9ca3af" }}>尺寸因手工製作誤差正負 2 cm 屬正常</p>
      </div>
    ),
  },
  {
    title: "運送方式",
    content: <p style={{ fontSize: 14, color: "#374151" }}>真空裝箱出貨，全台本島免運費</p>,
  },
  {
    title: "保養方式",
    content: (
      <ul className="space-y-2" style={{ fontSize: 14, color: "#374151", paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
        <li>床套可拆洗，以冷水機洗（最高 30°C）</li>
        <li>放入洗衣袋，低速柔洗</li>
        <li>不可漂白，陰涼處晾乾</li>
      </ul>
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

export function TopperTrifoldPanel({ product, variations }: Props) {
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
          <Link href="/topper" className="hover:underline" style={{ color: BLUE }}>薄床墊</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <span style={{ color: "#aaa" }}>FlexiRest Trifold Topper</span>
        </nav>
        <p style={{ fontSize: 16, color: "#9ca3af" }}>Nooz FlexiRest Trifold Topper</p>
        <h1 className="font-bold leading-tight" style={{ fontSize: 30, color: NAVY }}>三折疊日式床墊（厚8公分）</h1>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span style={{ fontSize: 13.5, color: "#6b7280" }}>（Google 評論）{parseFloat(product.average_rating) > 0 ? product.average_rating : "4.8"}</span>
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-bold" style={{ fontSize: 26, color: BLUE }}>NT${Number(price).toLocaleString()}</span>
        {isOnSale && regularPrice && (
          <span className="line-through" style={{ fontSize: 16, color: "#bbb" }}>NT${Number(regularPrice).toLocaleString()}</span>
        )}
      </div>

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

      <div className="h-px bg-gray-100" />
      <p style={{ fontSize: 13, color: "#9ca3af" }}>全台本島免運 · 真空裝箱好搬運</p>

      <Accordion />

      <StickyCartBar productName="Nooz FlexiRest" subtitle="三折疊日式床墊"
        price={price} regularPrice={regularPrice} isOnSale={isOnSale}
        variations={variations} selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange} variationLabels={VARIATION_LABELS}
        onAddToCart={async () => { const id = selectedVariation?.id ?? product.id; setAdding(true); await addItem(id, qty); setAdding(false); }}
        adding={adding} triggerRef={ctaRef} />
    </div>
  );
}
