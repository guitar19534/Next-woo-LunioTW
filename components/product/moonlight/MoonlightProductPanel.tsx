"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product, ProductVariation } from "@/lib/woocommerce.d";
import { useCart } from "@/components/shop";
import { StickyCartBar } from "@/components/product/shared/StickyCartBar";

const VARIATION_LABELS: Record<string, string> = {
  "標準單人":              "【標準單人】現折5,080",
  "單人加大":              "【單人加大】現折6,480",
  "標準雙人":              "【標準雙人】現折8,880",
  "雙人加大":              "【雙人加大】現折10,080",
  "雙人特大":              "【雙人特大】現折11,280",
  "標準單人+記憶枕買1送1": "【標準單人】＋記憶枕買1送1 現折10,540",
  "單人加大+記憶枕買1送1": "【單人加大】＋記憶枕買1送1 現折12,860",
  "標準雙人+記憶枕買1送1": "【標準雙人】＋記憶枕買1送1 現折15,260",
  "雙人加大+記憶枕買1送1": "【雙人加大】＋記憶枕買1送1 現折17,000",
  "雙人特大+記憶枕買1送1": "【雙人特大】＋記憶枕買1送1 現折17,660",
};

const SESSION_KEY = "lunio_moonlight_countdown_end";
const DURATION_MS = 12 * 60 * 60 * 1000;
const ACCENT = "#1B6DC1";

function getOrCreateEndTime(): number {
  if (typeof window === "undefined") return Date.now() + DURATION_MS;
  const stored = localStorage.getItem(SESSION_KEY);
  if (stored) {
    const end = parseInt(stored, 10);
    if (end > Date.now()) return end;
  }
  const end = Date.now() + DURATION_MS;
  localStorage.setItem(SESSION_KEY, String(end));
  return end;
}

function CountdownBlock() {
  const [time, setTime] = useState({ h: "12", m: "00", s: "00" });

  useEffect(() => {
    let end = getOrCreateEndTime();
    function tick() {
      if (Date.now() >= end) {
        end = Date.now() + DURATION_MS;
        localStorage.setItem(SESSION_KEY, String(end));
      }
      const diff = end - Date.now();
      setTime({
        h: String(Math.floor(diff / 3600000)).padStart(2, "0"),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl" style={{ backgroundColor: "#EBF4FD" }}>
      <div
        className="flex items-center justify-center gap-2 py-2.5"
        style={{ background: "linear-gradient(90deg, #1B6DC1, #38bdf8)", borderRadius: "16px 16px 0 0" }}
      >
        <span style={{ fontSize: 15 }}>⚡</span>
        <span className="font-semibold text-white" style={{ fontSize: 14, letterSpacing: "0.05em" }}>
          官網優惠期限
        </span>
      </div>
      <div className="flex items-center justify-center gap-4 py-5">
        {[{ val: time.h, label: "時" }, { val: time.m, label: "分" }, { val: time.s, label: "秒" }].map(({ val, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <div
              className="flex items-center justify-center rounded-2xl font-bold"
              style={{ width: 64, height: 64, backgroundColor: "#fff", fontSize: 32, color: "#e53e3e", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
            >
              {val}
            </div>
            <span style={{ fontSize: 13, color: "#555" }}>{label}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 px-4 pb-5">
        {[
          { src: "/helix/icon-10-year-guarantee.webp", label: "享10年保修", w: 56, h: 56 },
          { src: "/helix/icon-free-delivery-4_3.webp", label: "本島免費配送", w: 70, h: 52 },
          { src: "/helix/icon-packing-3_4-w500.webp", label: "捲包床易安裝", w: 44, h: 58 },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center" style={{ height: 60 }}>
              <Image src={item.src} alt={item.label} width={item.w} height={item.h} className="object-contain" />
            </div>
            <span style={{ fontSize: 12, color: "#374151", textAlign: "center" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  product: Product;
  variations: ProductVariation[];
}

export function MoonlightProductPanel({ product, variations }: Props) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();
  const ctaRef = useRef<HTMLButtonElement>(null);

  const handleVariationChange = useCallback((v: ProductVariation | null) => {
    setSelectedVariation(v);
  }, []);

  const price = selectedVariation?.price || product.price;
  const regularPrice = selectedVariation?.regular_price || product.regular_price;
  const isOnSale = selectedVariation?.on_sale ?? product.on_sale;

  return (
    <div className="space-y-5">

      {/* Breadcrumb + Title — desktop only */}
      <div className="hidden lg:block space-y-5">
        <nav className="flex items-center gap-1 text-sm" style={{ color: ACCENT }}>
          <Link href="/" className="hover:underline">Lunio</Link>
          <span style={{ color: "#aaa" }}>›</span>
          <span style={{ color: "#aaa" }}>{product.name}</span>
        </nav>
        <div>
          <h1 className="leading-tight mb-1 font-semibold" style={{ fontSize: "30px", color: "#17284b" }}>
            NOOZ Moonlight Plus記憶床墊
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#f5a623" }}>{"★★★★★"}</div>
          <span className="text-sm" style={{ color: "#555" }}>
            (Google 評論)床墊評價 {parseFloat(product.average_rating) > 0 ? product.average_rating : "5.0"}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2" style={{ fontSize: "15px", color: "#333", lineHeight: 1.85 }}>
        <p className="font-bold" style={{ color: "#17284b" }}>一覺到天亮，不再怕熱</p>
        <p>Moonlight Plus 記憶床墊，專為怕熱的你打造</p>
        <p>冷凝記憶層瞬間散熱</p>
        <p>整晚保持清爽，遠離悶熱干擾</p>
        <p>貼合包覆，舒緩壓力</p>
        <p>軟硬適中，緊貼身體曲線，釋放腰背疲勞，讓睡眠更安穩</p>
      </div>

      {/* Promo box */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: "#D6E8F7" }}>
        <p className="font-bold mb-4" style={{ fontSize: "15px", color: "#17284b" }}>★官網限定優惠★</p>
        <ul className="space-y-3">
          <li className="text-sm" style={{ lineHeight: 1.7 }}>
            🎁 好康一：加碼贈送，
            <a href="#" style={{ color: "#e05c1a", fontWeight: 500 }}>
              加購Nebula經典記憶枕買一送一
            </a>
          </li>
          <li className="text-sm" style={{ lineHeight: 1.7 }}>
            🎁 好康二：
            <a href="#" style={{ color: ACCENT, fontWeight: 500 }}>
              限量100組加購｜標準雙人床 × 蝴蝶枕＊2 超值組合
            </a>
          </li>
        </ul>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-bold" style={{ fontSize: "26px", color: ACCENT }}>
          NT${Number(price).toLocaleString()}
        </span>
        {isOnSale && regularPrice && (
          <span className="line-through" style={{ fontSize: "16px", color: "#bbb" }}>
            NT${Number(regularPrice).toLocaleString()}
          </span>
        )}
      </div>

      {selectedVariation?.description && (
        <p className="text-sm" style={{ color: "#555" }}>
          {selectedVariation.description.replace(/<[^>]*>/g, "").trim()}
        </p>
      )}

      {/* Variation selector */}
      {variations.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium shrink-0" style={{ color: "#555" }}>選擇尺寸</span>
          <select
            className="flex-1 border rounded-lg px-3 py-2.5 text-sm"
            style={{ borderColor: "#ddd", color: "#17284b", backgroundColor: "#1B6DC11a" }}
            onChange={(e) => {
              const v = variations.find((v) =>
                v.attributes.some((a) => a.option === e.target.value)
              ) ?? null;
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
        <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: "#ddd" }}>
          <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-50" style={{ color: "#555" }}>−</button>
          <span className="w-10 text-center text-sm font-medium" style={{ color: "#17284b" }}>{qty}</span>
          <button type="button" onClick={() => setQty(q => q + 1)}
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
          style={{ backgroundColor: ACCENT, fontSize: "16px", letterSpacing: "0.05em" }}
        >
          {adding ? "加入中..." : "立刻搶購"}
        </button>
      </div>

      <CountdownBlock />

      <div style={{ height: "1px", backgroundColor: "#e5e7eb", margin: "4px 0" }} />

      <StickyCartBar
        productName="NOOZ Moonlight Plus"
        subtitle="記憶床墊"
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
