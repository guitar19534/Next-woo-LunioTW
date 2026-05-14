"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag, Plus, Minus, Trash2, ArrowLeft, ArrowRight,
  Gift, Lock, Truck, RefreshCw, Tag, X, CheckCircle, AlertCircle,
  ChevronDown,
} from "lucide-react";

import { useCart } from "@/components/shop/cart-provider";
import { formatPrice } from "@/lib/woocommerce";
import type { Product } from "@/lib/woocommerce.d";

const FONT = "'MiSansTC','Noto Sans TC',sans-serif";
const NAVY = "#17284b";
const BLUE = "#17569E";

// ─── Input helper ─────────────────────────────────────────────────────────

function Field({
  value, onChange, placeholder, type = "text",
}: {
  value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-xl outline-none transition-colors"
      style={{ border: "1.5px solid #e5e7eb", fontSize: 13, color: NAVY, fontFamily: FONT }}
      onFocus={(e) => (e.currentTarget.style.borderColor = BLUE)}
      onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
    />
  );
}

// ─── Recommended Products ──────────────────────────────────────────────────

function RecommendedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products/featured")
      .then((r) => r.json())
      .then((d) => setProducts(Array.isArray(d) ? d.slice(0, 4) : []))
      .catch(() => {});
  }, []);

  if (!products.length) return null;

  return (
    <section className="mt-12 md:mt-16">
      <h2 className="font-bold mb-5" style={{ fontSize: "clamp(15px, 2vw, 19px)", color: NAVY }}>
        你可能也喜歡
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {products.map((p) => {
          const img = p.images?.[0]?.src;
          const isOnSale = p.on_sale && p.regular_price && p.sale_price && p.regular_price !== p.sale_price;
          return (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              className="group rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "1/1", backgroundColor: "#f7f7f7" }}>
                {img && (
                  <Image
                    src={img} alt={p.name} fill
                    className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                {isOnSale && (
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-white font-bold"
                    style={{ fontSize: 9, backgroundColor: "#ef4444" }}>SALE</span>
                )}
              </div>
              <div className="p-2.5 md:p-3">
                <p className="font-medium line-clamp-2 mb-1" style={{ fontSize: 12, color: NAVY, lineHeight: 1.4 }}>{p.name}</p>
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="font-bold" style={{ fontSize: 13, color: BLUE }}>
                    {formatPrice(p.price || p.regular_price, "TWD")}
                  </span>
                  {isOnSale && (
                    <span className="line-through" style={{ fontSize: 11, color: "#9ca3af" }}>
                      {formatPrice(p.regular_price, "TWD")}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────

export default function CartPage() {
  const {
    cart, isLoading,
    removeItem, updateQuantity,
    applyCoupon, removeCoupon,
    selectShippingRate, updateShippingAddress,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const couponRef = useRef<HTMLInputElement>(null);

  const [addressOpen, setAddressOpen] = useState(false);
  const [addrCity, setAddrCity] = useState("");
  const [addrAddress, setAddrAddress] = useState("");
  const [addrPostcode, setAddrPostcode] = useState("");
  const [addrLoading, setAddrLoading] = useState(false);

  // Mobile: expand/collapse order summary accordion
  const [summaryOpen, setSummaryOpen] = useState(false);

  const cc = cart.totals.currencyCode;
  const hasDiscount = parseFloat(cart.totals.discount) > 0;

  async function handleApplyCoupon() {
    const code = couponInput.trim();
    if (!code) return;
    setCouponLoading(true);
    setCouponMsg(null);
    try {
      await applyCoupon(code);
      setCouponInput("");
      setCouponMsg({ type: "success", text: `優惠券「${code.toUpperCase()}」已套用！` });
    } catch (e: unknown) {
      setCouponMsg({ type: "error", text: e instanceof Error ? e.message : "優惠券無效或已過期" });
    } finally {
      setCouponLoading(false);
    }
  }

  async function handleUpdateAddress() {
    setAddrLoading(true);
    try {
      await updateShippingAddress({ city: addrCity, postcode: addrPostcode, address_1: addrAddress });
      setAddressOpen(false);
    } finally {
      setAddrLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center" style={{ fontFamily: FONT }}>
        <div className="w-9 h-9 rounded-full border-2 animate-spin" style={{ borderColor: BLUE, borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-6" style={{ fontFamily: FONT }}>
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: "#f0f5ff" }}>
          <ShoppingBag size={36} style={{ color: BLUE, opacity: 0.35 }} />
        </div>
        <div className="text-center space-y-1.5">
          <h1 className="font-semibold" style={{ fontSize: "clamp(18px, 4vw, 24px)", color: NAVY }}>購物車是空的</h1>
          <p style={{ color: "#9ca3af", fontSize: 14 }}>還沒有選到喜歡的商品？快去逛逛吧！</p>
        </div>
        <Link href="/shop"
          className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold hover:opacity-85 transition-opacity"
          style={{ backgroundColor: BLUE, fontSize: 14 }}>
          <ArrowLeft size={14} /> 繼續購物
        </Link>
      </div>
    );
  }

  // ── Order summary inner content (shared mobile accordion + desktop panel) ──
  const summaryContent = (
    <div>
      {/* 小計 */}
      <div className="flex justify-between items-center px-5 md:px-6 py-3.5" style={{ borderBottom: "1px solid #f3f4f6" }}>
        <span className="text-sm font-medium" style={{ color: NAVY }}>小計</span>
        <span className="text-sm" style={{ color: "#374151" }}>{formatPrice(cart.totals.subtotal, cc)}</span>
      </div>

      {/* 運送方式 */}
      <div className="px-5 md:px-6 py-3.5" style={{ borderBottom: "1px solid #f3f4f6" }}>
        <p className="text-sm font-medium mb-2.5" style={{ color: NAVY }}>運送方式</p>
        {cart.shippingRates.length > 0 && (
          <div className="space-y-2 mb-2.5">
            {cart.shippingRates.map((rate) => (
              <label key={rate.rateId} className="flex items-start gap-2.5 cursor-pointer">
                <input type="radio" name="shipping" checked={rate.selected}
                  onChange={() => selectShippingRate(rate.packageId, rate.rateId)}
                  className="mt-0.5 accent-[#17569E]" />
                <div>
                  <span style={{ fontSize: 13, color: "#374151" }}>{rate.name}</span>
                  {parseFloat(rate.price) > 0 && (
                    <span className="ml-1.5 font-medium" style={{ fontSize: 13, color: NAVY }}>
                      {formatPrice(rate.price, cc)}
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}
        {cart.shippingDestination && !addressOpen && (
          <p className="text-sm mb-2" style={{ color: "#374151" }}>
            運送至 <strong>
              {[cart.shippingDestination.address_1, cart.shippingDestination.city, cart.shippingDestination.postcode]
                .filter(Boolean).join(", ")}
            </strong>。
          </p>
        )}
        <button type="button"
          onClick={() => {
            if (!addressOpen && cart.shippingDestination) {
              setAddrCity(cart.shippingDestination.city);
              setAddrAddress(cart.shippingDestination.address_1);
              setAddrPostcode(cart.shippingDestination.postcode);
            }
            setAddressOpen((v) => !v);
          }}
          className="flex items-center gap-1.5 font-medium hover:underline"
          style={{ fontSize: 13, color: BLUE }}>
          {addressOpen ? "取消" : "變更地址"} 🚚
        </button>
        {addressOpen && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl"
              style={{ border: "1.5px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
              <span style={{ fontSize: 13, color: "#374151" }}>台灣</span>
              <ChevronDown size={14} style={{ color: "#9ca3af" }} />
            </div>
            <Field value={addrCity} onChange={setAddrCity} placeholder="城市 / 縣市" />
            <Field value={addrAddress} onChange={setAddrAddress} placeholder="地址" />
            <Field value={addrPostcode} onChange={setAddrPostcode} placeholder="郵遞區號" />
            <button type="button" onClick={handleUpdateAddress} disabled={addrLoading}
              className="w-full py-2.5 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
              style={{ backgroundColor: BLUE, fontSize: 14 }}>
              {addrLoading ? "更新中..." : "更新"}
            </button>
          </div>
        )}
      </div>

      {/* 優惠券 */}
      <div className="px-5 md:px-6 py-3.5" style={{ borderBottom: "1px solid #f3f4f6" }}>
        <p className="text-sm font-medium mb-2.5" style={{ color: NAVY }}>優惠券</p>
        {cart.coupons.length > 0 && (
          <div className="space-y-1.5 mb-2.5">
            {cart.coupons.map((c) => (
              <div key={c.code} className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ backgroundColor: "#f0fdf4" }}>
                <div className="flex items-center gap-2">
                  <Tag size={11} style={{ color: "#16a34a" }} />
                  <span className="font-semibold uppercase" style={{ fontSize: 12, color: "#16a34a" }}>{c.code}</span>
                  <span style={{ fontSize: 12, color: "#16a34a" }}>-{formatPrice(c.discount, cc)}</span>
                </div>
                <button type="button" onClick={() => removeCoupon(c.code)}
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-green-200 transition-colors">
                  <X size={10} style={{ color: "#16a34a" }} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            ref={couponRef}
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
            placeholder="輸入優惠碼"
            className="flex-1 min-w-0 px-3 py-2 rounded-xl outline-none"
            style={{ border: "1.5px solid #e5e7eb", fontSize: 13, color: NAVY, fontFamily: FONT }}
            onFocus={(e) => (e.currentTarget.style.borderColor = BLUE)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
          />
          <button type="button" onClick={handleApplyCoupon}
            disabled={couponLoading || !couponInput.trim()}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-white font-semibold transition-opacity disabled:opacity-50"
            style={{ backgroundColor: BLUE, fontSize: 13 }}>
            {couponLoading ? "..." : "套用"}
          </button>
        </div>
        {couponMsg && (
          <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-xl"
            style={{ backgroundColor: couponMsg.type === "success" ? "#f0fdf4" : "#fef2f2" }}>
            {couponMsg.type === "success"
              ? <CheckCircle size={12} style={{ color: "#16a34a", flexShrink: 0 }} />
              : <AlertCircle size={12} style={{ color: "#ef4444", flexShrink: 0 }} />}
            <span style={{ fontSize: 12, color: couponMsg.type === "success" ? "#16a34a" : "#ef4444" }}>
              {couponMsg.text}
            </span>
          </div>
        )}
      </div>

      {/* 限時折扣 */}
      {hasDiscount && (
        <div className="flex justify-between items-center px-5 md:px-6 py-3.5" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <span className="text-sm font-medium" style={{ color: NAVY }}>限時折扣</span>
          <span style={{ fontSize: 13, color: "#16a34a" }}>省下 {formatPrice(cart.totals.discount, cc)}</span>
        </div>
      )}

      {/* 總計 */}
      <div className="flex justify-between items-center px-5 md:px-6 py-4">
        <span className="font-bold" style={{ fontSize: 15, color: NAVY }}>總計</span>
        <span className="font-bold" style={{ fontSize: 22, color: NAVY }}>{formatPrice(cart.totals.total, cc)}</span>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen py-8 md:py-12 lg:py-16 pb-28 md:pb-12 lg:pb-16"
      style={{ backgroundColor: "#fafafa", fontFamily: FONT }}
    >
      <div className="max-w-[1200px] w-[94%] md:w-[92%] mx-auto">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-5 md:mb-8">
          <div className="flex items-center gap-2.5">
            <h1 className="font-bold" style={{ fontSize: "clamp(18px, 3vw, 26px)", color: NAVY }}>購物車</h1>
            <span className="flex items-center justify-center rounded-full text-white font-bold"
              style={{ backgroundColor: BLUE, fontSize: 11, minWidth: 22, height: 22, paddingInline: 5 }}>
              {cart.totals.itemCount}
            </span>
          </div>
          <Link href="/shop" className="flex items-center gap-1 text-sm font-medium" style={{ color: BLUE }}>
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">繼續購物</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_380px] gap-4 md:gap-5 lg:gap-6">

          {/* ── Left: Items ── */}
          <div className="space-y-2.5 md:space-y-3">
            {cart.items.map((item) => {
              const isFree = parseFloat(item.price) === 0;
              const isOnSale = !isFree && item.regularPrice && parseFloat(item.regularPrice) > parseFloat(item.price);

              return (
                <div
                  key={item.key}
                  className="flex gap-3 md:gap-4 p-3 md:p-4 lg:p-5 rounded-2xl bg-white"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative flex-shrink-0 rounded-xl overflow-hidden"
                    style={{ width: 82, height: 82, backgroundColor: "#f7f7f7" }}
                  >
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1.5 md:p-2" sizes="82px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-300">No img</div>
                    )}
                    {isFree && (
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center py-0.5"
                        style={{ backgroundColor: "#16a34a" }}>
                        <span className="text-white font-bold tracking-wider" style={{ fontSize: 8 }}>FREE</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    {/* Top row: name + price */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold leading-snug line-clamp-2"
                          style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: NAVY }}>
                          {item.name}
                        </h3>
                        {item.attributes && item.attributes.length > 0 && (
                          <p className="mt-0.5" style={{ fontSize: 12, color: "#9ca3af" }}>
                            {item.attributes.map((a) => a.value).join(" · ")}
                          </p>
                        )}
                        {isFree && (
                          <div className="flex items-center gap-1 mt-1">
                            <Gift size={11} style={{ color: "#16a34a" }} />
                            <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>免費贈品</span>
                          </div>
                        )}
                      </div>

                      {/* Price column */}
                      <div className="text-right flex-shrink-0">
                        {isFree ? (
                          <span className="font-bold" style={{ fontSize: 13, color: "#16a34a" }}>免費</span>
                        ) : (
                          <div className="flex flex-col items-end gap-0.5">
                            <span className="font-bold" style={{ fontSize: "clamp(14px, 1.5vw, 17px)", color: NAVY }}>
                              {formatPrice(item.lineTotal, cc)}
                            </span>
                            {isOnSale && (
                              <span className="line-through" style={{ fontSize: 11, color: "#9ca3af" }}>
                                {formatPrice((parseFloat(item.regularPrice) * item.quantity).toFixed(2), cc)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom row: qty controls + remove */}
                    <div className="flex items-center justify-between mt-2.5">
                      {isFree ? (
                        <div className="flex items-center gap-1.5">
                          <span style={{ fontSize: 12, color: "#9ca3af" }}>數量</span>
                          <span className="flex items-center justify-center rounded-full font-bold text-white"
                            style={{ backgroundColor: "#16a34a", fontSize: 10, minWidth: 20, height: 20, paddingInline: 4 }}>
                            ×{item.quantity}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1.5px solid #e5e7eb" }}>
                          <button type="button" onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Minus size={11} style={{ color: "#374151" }} />
                          </button>
                          <span className="w-8 text-center font-semibold" style={{ fontSize: 13, color: "#111827" }}>
                            {item.quantity}
                          </span>
                          <button type="button" onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Plus size={11} style={{ color: "#374151" }} />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5">
                        {!isFree && item.quantity > 1 && (
                          <span style={{ fontSize: 11, color: "#9ca3af" }}>{formatPrice(item.price, cc)} / 件</span>
                        )}
                        <button type="button" onClick={() => removeItem(item.key)}
                          className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          aria-label="移除">
                          <Trash2 size={12} style={{ color: "#d1d5db" }} />
                          <span className="hidden sm:inline" style={{ fontSize: 11, color: "#9ca3af" }}>移除</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Right: Order Summary (tablet+) ── */}
          <div className="hidden md:block md:sticky md:top-24 self-start space-y-3">
            <div className="rounded-2xl bg-white overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <div className="px-5 md:px-6 py-4 md:py-5" style={{ borderBottom: "1px solid #f3f4f6" }}>
                <h2 className="font-bold" style={{ fontSize: 17, color: NAVY }}>購物總計</h2>
              </div>
              {summaryContent}
              <div className="px-5 md:px-6 pb-5 pt-1">
                <Link href="/checkout"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white font-bold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: BLUE, fontSize: 14 }}>
                  我要結帳 <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Perks */}
            <div className="rounded-2xl bg-white px-4 md:px-5 py-3.5 space-y-2.5"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              {[
                { icon: Truck, text: "全台免費配送到府" },
                { icon: RefreshCw, text: "100 晚免費試睡體驗" },
                { icon: Gift, text: "購買即享 VIP 專屬服務" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#f0f5ff" }}>
                    <Icon size={13} style={{ color: BLUE }} />
                  </div>
                  <span style={{ fontSize: 12, color: "#374151" }}>{text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1.5">
              <Lock size={10} style={{ color: "#9ca3af" }} />
              <span style={{ fontSize: 11, color: "#9ca3af" }}>SSL 安全加密結帳</span>
            </div>
          </div>

          {/* ── Mobile: Order Summary Accordion ── */}
          <div className="md:hidden rounded-2xl bg-white overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            <button
              type="button"
              onClick={() => setSummaryOpen((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold" style={{ fontSize: 15, color: NAVY }}>訂單明細</span>
                {hasDiscount && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#f0fdf4", color: "#16a34a" }}>省錢中</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold" style={{ fontSize: 15, color: NAVY }}>
                  {formatPrice(cart.totals.total, cc)}
                </span>
                <ChevronDown
                  size={16}
                  style={{ color: "#9ca3af", transform: summaryOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
                />
              </div>
            </button>
            {summaryOpen && summaryContent}
          </div>
        </div>

        {/* Recommended */}
        <RecommendedProducts />
      </div>

      {/* ── Mobile Sticky Checkout Bar ── */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 px-4 pb-safe"
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid #f0f0f0",
          paddingTop: 12,
          paddingBottom: "max(16px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <p style={{ fontSize: 11, color: "#9ca3af" }}>合計（{cart.totals.itemCount} 件）</p>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold" style={{ fontSize: 20, color: NAVY }}>
                {formatPrice(cart.totals.total, cc)}
              </span>
              {hasDiscount && (
                <span className="line-through" style={{ fontSize: 12, color: "#9ca3af" }}>
                  {formatPrice((parseFloat(cart.totals.total) + parseFloat(cart.totals.discount)).toFixed(2), cc)}
                </span>
              )}
            </div>
          </div>
          <Link
            href="/checkout"
            className="flex items-center gap-1.5 px-6 py-3 rounded-2xl text-white font-bold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: BLUE, fontSize: 14 }}
          >
            結帳 <ArrowRight size={15} />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Lock size={9} style={{ color: "#9ca3af" }} />
          <span style={{ fontSize: 10, color: "#9ca3af" }}>SSL 安全加密</span>
        </div>
      </div>
    </div>
  );
}
