"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const VARIATION_LABELS: Record<string, string> = {
  "記憶枕 1入":   "記憶枕 1入",
  "記憶枕 2入":   "記憶枕 2入（優惠組）",
};

const BLUE = "#17569E";
const NAVY = "#17284b";

// ── Accordion ─────────────────────────────────────────────────────────────────
const ACCORDION_ITEMS = [
  {
    title: "產品詳情",
    content: (
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-3" style={{ color: NAVY }}>智慧專區支撐 × 適合全睡姿 × 減少落枕與翻身</p>
        <p className="mb-4">不論你喜歡哪種睡姿，肩頸都能穩穩支撐，完美服貼</p>
        <ul className="space-y-2.5" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
          <li><strong>4 大專區精準支撐</strong>：頭、頸、肩、手臂各有獨立支撐區，維持脊椎自然曲線</li>
          <li><strong>多功能設計</strong>：一枕三用，可作為蝶形枕、止鼾枕、側睡枕，滿足不同睡姿需求</li>
          <li><strong>全睡姿適應</strong>：不論仰睡、側睡、趴睡，都能匹配合適高度</li>
          <li><strong>減少落枕與翻身</strong>：穩定支撐減少肌肉緊繃，提升深層睡眠比例</li>
          <li><strong>高科技面料</strong>：六角格枕套布料柔軟耐用，搭配網眼透氣結構有效散熱，適合怕熱與易流汗族群</li>
        </ul>
      </div>
    ),
  },
  {
    title: "尺寸和重量",
    content: (
      <div style={{ fontSize: 14, color: "#374151" }}>
        <div className="mb-4">
          <Image src="/hypercool/Hypercool-size.webp" alt="HyperCool 枕頭尺寸" width={400} height={280} className="w-full h-auto rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-y-3" style={{ fontSize: 14 }}>
          <div><span style={{ color: "#9ca3af" }}>高度</span><p className="font-medium" style={{ color: NAVY }}>14/10 cm</p></div>
          <div><span style={{ color: "#9ca3af" }}>寬度</span><p className="font-medium" style={{ color: NAVY }}>36.8 cm</p></div>
          <div><span style={{ color: "#9ca3af" }}>長度</span><p className="font-medium" style={{ color: NAVY }}>61.5 cm</p></div>
          <div><span style={{ color: "#9ca3af" }}>重量</span><p className="font-medium" style={{ color: NAVY }}>1.2 kg</p></div>
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
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.85 }}>
        <p className="font-bold mb-3" style={{ color: NAVY }}>記憶枕材質</p>
        <ul className="space-y-2" style={{ paddingLeft: "1.2em", listStyleType: "disc" }}>
          <li>枕芯：SmartCloud 涼感記憶棉（冷凝膠注入記憶棉）</li>
          <li>內枕套：100% 聚酯纖維，無拉鍊設計</li>
          <li>外枕套：HexaCool 布料，附拉鍊。65% 聚酯纖維 / 35% 冷感布料（聚乙烯材質）</li>
        </ul>
      </div>
    ),
  },
  {
    title: "保養方式",
    content: (
      <ul className="space-y-2" style={{ fontSize: 14, color: "#374151", paddingLeft: "1.2em", listStyleType: "disc", lineHeight: 1.85 }}>
        <li>記憶枕芯不可下水洗滌。</li>
        <li>外層枕套可拆洗，水溫建議不超過30°C</li>
        <li>禁止使用漂白劑、扭乾、熨燙，以免布料變形</li>
        <li>建議定期使用吸塵器，清除枕頭上的灰塵與毛屑</li>
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
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex items-center justify-between w-full px-0 py-5 text-left"
          >
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

export function HyperCoolPanel({ product, variations }: Props) {
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

      {/* Desktop breadcrumb + title */}
      <div className="hidden lg:block space-y-4">
        <nav className="flex items-center gap-1 text-sm" style={{ color: BLUE }}>
          <Link href="/" className="hover:underline">Lunio</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <span style={{ color: "#aaa" }}>Lunio HyperCool 智能工學護頸枕</span>
        </nav>
        <div>
          <h1 className="font-bold leading-tight" style={{ fontSize: 30, color: NAVY }}>Lunio HyperCool</h1>
          <p style={{ fontSize: 18, color: "#9ca3af", marginTop: 2 }}>智能工學護頸枕</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span style={{ fontSize: 13.5, color: "#6b7280" }}>（Google 評論）床墊評價 {product.average_rating || "4.8"}</span>
        </div>
      </div>

      {/* Promo banner */}
      <div className="px-4 py-3 rounded-xl" style={{ backgroundColor: "#f0f4fb", border: "1px solid #dbeafe" }}>
        <p style={{ fontSize: 13.5, color: "#374151" }}>
          限量100組加購｜
          <a href="#" style={{ color: BLUE, fontWeight: 500 }}>涼被1 × 工學枕1 超值組合</a>
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-bold" style={{ fontSize: 26, color: BLUE }}>
          NT${Number(price).toLocaleString()}
        </span>
        {isOnSale && regularPrice && (
          <span className="line-through" style={{ fontSize: 16, color: "#bbb" }}>
            NT${Number(regularPrice).toLocaleString()}
          </span>
        )}
      </div>

      {/* Variation */}
      {variations.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium shrink-0" style={{ color: "#555" }}>尺寸</span>
          <select
            className="flex-1 border rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{ borderColor: "#ddd", color: NAVY, backgroundColor: "#f8faff" }}
            onChange={(e) => {
              const v = variations.find((v) => v.attributes.some((a) => a.option === e.target.value)) ?? null;
              handleVariationChange(v);
            }}
            defaultValue=""
          >
            <option value="" disabled>請選取一個選項</option>
            {variations.map((v) => {
              const opt = v.attributes[0]?.option ?? "";
              const label = VARIATION_LABELS[opt] ?? opt;
              return <option key={v.id} value={opt}>{label}</option>;
            })}
          </select>
        </div>
      )}

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
        <button
          ref={ctaRef}
          type="button"
          disabled={adding}
          onClick={async () => {
            const id = selectedVariation?.id ?? product.id;
            setAdding(true);
            await addItem(id, qty);
            setAdding(false);
          }}
          className="flex-1 py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: BLUE, fontSize: 16 }}
        >
          {adding ? "加入中..." : "立刻搶購"}
        </button>
      </div>

      <div className="h-px bg-gray-100" /><p style={{ fontSize: 13, color: "#9ca3af", letterSpacing: "0.02em" }}>本島免運+專業服務</p>

      {/* Accordion */}
      <Accordion />

      <StickyCartBar
        productName="Lunio HyperCool"
        subtitle="智能工學護頸枕"
        price={price}
        regularPrice={regularPrice}
        isOnSale={isOnSale}
        variations={variations}
        selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange}
        variationLabels={VARIATION_LABELS}
        onAddToCart={async () => {
          const id = selectedVariation?.id ?? product.id;
          setAdding(true);
          await addItem(id, qty);
          setAdding(false);
        }}
        adding={adding}
        triggerRef={ctaRef}
      />
    </div>
  );
}
