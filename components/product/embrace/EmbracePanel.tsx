"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const VARIATION_LABELS: Record<string, string> = {
  "典雅灰": "典雅灰",
  "奶油白": "奶油白",
};

const BLUE = "#17569E";
const NAVY = "#17284b";

const ACCORDION_ITEMS = [
  {
    title: "產品詳情",
    content: (
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-3" style={{ color: NAVY }}>環腰的溫暖擁抱×追劇必備神器</p>
        <ul className="space-y-2.5" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
          <li>厚實飽滿的大靠枕，伸出手臂從後方環住你</li>
          <li>無論床頭或沙發，隨時給你溫暖的擁抱</li>
          <li>天鵝絨枕套可拆洗，細膩柔軟，透氣不悶熱</li>
          <li>高級記憶棉枕芯，彈性支撐，靠背或放手臂，都自在舒適</li>
        </ul>
      </div>
    ),
  },
  {
    title: "尺寸和重量",
    content: (
      <div style={{ fontSize: 14, color: "#374151" }}>
        <div className="mb-4">
          <Image src="/embrance/Embrace_Layers (1).webp" alt="Embrace 尺寸" width={400} height={300} className="w-full h-auto rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <p>高度：61 cm</p>
          <p>長度：102 cm</p>
          <p>重量：4.5 kg</p>
        </div>
        <p className="mt-3" style={{ fontSize: 13, color: "#9ca3af" }}>枕頭為可塑性材質，實際高度正負2cm屬正常</p>
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
      <ul className="space-y-2.5" style={{ fontSize: 14, color: "#374151", paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
        <li>內裡布料：100% 聚酯纖維</li>
        <li>外層布料：柔軟天鵝絨（Lunio 優質布料）</li>
        <li>枕芯：SmartCloud™ 碎記憶海綿</li>
      </ul>
    ),
  },
  {
    title: "保養方式",
    content: (
      <ul className="space-y-2" style={{ fontSize: 14, color: "#374151", paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
        <li>枕頭套可手洗或機洗，水溫不超過40度</li>
        <li>請放入洗衣袋，輕柔烘乾。不可漂白或乾洗。</li>
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

export function EmbracePanel({ product, variations }: Props) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
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
      <div className="hidden lg:block space-y-4">
        <nav className="flex items-center gap-1 text-sm" style={{ color: BLUE }}>
          <Link href="/" className="hover:underline">Lunio</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <span style={{ color: "#aaa" }}>Lunio Embrace 多功能擁抱枕</span>
        </nav>
        <div>
          <h1 className="font-bold leading-tight" style={{ fontSize: 30, color: NAVY }}>Lunio Embrace</h1>
          <p style={{ fontSize: 18, color: "#9ca3af", marginTop: 2 }}>多功能擁抱枕</p>
          <p style={{ fontSize: 14, color: "#9ca3af" }}>Backrest Pillow</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span style={{ fontSize: 13.5, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-bold" style={{ fontSize: 26, color: BLUE }}>NT${Number(price).toLocaleString()}</span>
        {isOnSale && regularPrice && (
          <span className="line-through" style={{ fontSize: 16, color: "#bbb" }}>NT${Number(regularPrice).toLocaleString()}</span>
        )}
      </div>

      {/* Variation — color picker */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium shrink-0" style={{ color: "#555" }}>尺寸</span>
        {variations.length > 0 ? (
          <select className="flex-1 border rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{ borderColor: "#ddd", color: NAVY, backgroundColor: "#f8faff" }}
            onChange={(e) => {
              const v = variations.find((v) => v.attributes.some((a) => a.option === e.target.value)) ?? null;
              handleVariationChange(v);
            }} defaultValue="">
            <option value="" disabled>請選取顏色</option>
            {variations.map((v) => {
              const opt = v.attributes[0]?.option ?? "";
              return <option key={v.id} value={opt}>{VARIATION_LABELS[opt] ?? opt}</option>;
            })}
          </select>
        ) : (
          <span className="px-3 py-2.5 rounded-xl border text-sm" style={{ borderColor: "#ddd", color: NAVY }}>典雅灰</span>
        )}
      </div>

      {/* Qty + Buy */}
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

      <div className="h-px bg-gray-100" /><p style={{ fontSize: 13, color: "#9ca3af", letterSpacing: "0.02em" }}>本島免運+專業服務</p>
      <Accordion />

      <StickyCartBar productName="Lunio Embrace" subtitle="多功能擁抱枕"
        price={price} regularPrice={regularPrice} isOnSale={isOnSale}
        variations={variations} selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange} variationLabels={VARIATION_LABELS}
        onAddToCart={async () => { const id = selectedVariation?.id ?? product.id; setAdding(true); await addItem(id, qty); setAdding(false); }}
        adding={adding} triggerRef={ctaRef} />
    </div>
  );
}
