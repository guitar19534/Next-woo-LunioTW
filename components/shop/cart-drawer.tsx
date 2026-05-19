"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Trash2, Plus, Minus, Gift, ArrowRight, Lock } from "lucide-react";

import { useCart } from "./cart-provider";
import { formatPrice } from "@/lib/woocommerce";

export function CartDrawer() {
  const {
    cart,
    isOpen,
    isLoading,
    isSyncing,
    openCart,
    closeCart,
    removeItem,
    updateQuantity,
    getItemCount,
  } = useCart();

  const itemCount = getItemCount();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Trigger — cart icon in nav */}
      <button
        type="button"
        onClick={openCart}
        aria-label="開啟購物車"
        className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/10 transition-colors"
      >
        <ShoppingBag size={20} />
        {mounted && itemCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-[18px] h-[18px] rounded-full text-white font-bold"
            style={{ backgroundColor: "#17569E", fontSize: 10 }}
          >
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <div
        aria-hidden
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.45)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={closeCart}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="購物車"
        aria-modal="true"
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          fontFamily: "'MiSansTC', 'Noto Sans TC', sans-serif",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} style={{ color: "#17284b" }} />
            <span className="font-semibold" style={{ color: "#17284b", fontSize: 15 }}>購物車</span>
            {mounted && itemCount > 0 && (
              <span
                className="flex items-center justify-center px-1.5 rounded-full text-white font-bold"
                style={{ backgroundColor: "#17569E", fontSize: 11, minWidth: 20, height: 20 }}
              >
                {itemCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="關閉購物車"
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={16} style={{ color: "#6b7280" }} />
          </button>
        </div>

        {/* Body */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div
              className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: "#17569E", borderTopColor: "transparent" }}
            />
          </div>

        ) : cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 pb-10">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#f0f5ff" }}
            >
              <ShoppingBag size={34} style={{ color: "#17569E", opacity: 0.35 }} />
            </div>
            <div className="text-center space-y-1">
              <p className="font-semibold text-base" style={{ color: "#17284b" }}>購物車是空的</p>
              <p className="text-sm" style={{ color: "#9ca3af" }}>挑選你喜歡的商品加入購物車吧！</p>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="mt-1 px-7 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-85 transition-opacity"
              style={{ backgroundColor: "#17569E" }}
            >
              繼續購物
            </button>
          </div>

        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5">
              <div style={{ borderBottom: "none" }}>
                {cart.items.map((item) => {
                  const isFree = parseFloat(item.price) === 0;
                  return (
                    <div
                      key={item.key}
                      className="flex gap-3.5 py-4"
                      style={{ borderBottom: "1px solid #f9fafb" }}
                    >
                      {/* Thumbnail */}
                      <div
                        className="relative flex-shrink-0 rounded-2xl overflow-hidden"
                        style={{ width: 78, height: 78, backgroundColor: "#f7f7f7" }}
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-1.5"
                            sizes="78px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-300">
                            No image
                          </div>
                        )}
                        {isFree && (
                          <div
                            className="absolute inset-x-0 bottom-0 flex items-center justify-center py-[3px]"
                            style={{ backgroundColor: "#16a34a" }}
                          >
                            <span className="text-white font-bold tracking-wider" style={{ fontSize: 9 }}>FREE</span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <p className="font-medium leading-snug line-clamp-2" style={{ fontSize: 13.5, color: "#17284b" }}>
                            {item.name}
                          </p>
                          {item.attributes && item.attributes.length > 0 && (
                            <p className="mt-0.5" style={{ fontSize: 12, color: "#9ca3af" }}>
                              {item.attributes.map((a) => a.value).join(" · ")}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {isFree ? (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <Gift size={12} style={{ color: "#16a34a" }} />
                                <span className="font-semibold" style={{ fontSize: 12, color: "#16a34a" }}>贈品</span>
                              </div>
                              <span
                                className="flex items-center justify-center rounded-full font-bold text-white"
                                style={{ backgroundColor: "#16a34a", fontSize: 10, minWidth: 18, height: 18, paddingInline: 4 }}
                              >
                                ×{item.quantity}
                              </span>
                            </div>
                          ) : (
                            <div
                              className="flex items-center rounded-lg overflow-hidden"
                              style={{ border: "1.5px solid #e5e7eb" }}
                            >
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <Minus size={10} style={{ color: "#374151" }} />
                              </button>
                              <span
                                className="w-7 text-center font-medium"
                                style={{ fontSize: 13, color: "#111827" }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <Plus size={10} style={{ color: "#374151" }} />
                              </button>
                            </div>
                          )}

                          <div className="flex items-center gap-2.5">
                            {!isFree && (
                              <span className="font-semibold" style={{ fontSize: 14, color: "#17284b" }}>
                                {formatPrice(item.lineTotal, cart.totals.currencyCode)}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeItem(item.key)}
                              className="p-1 rounded-full hover:bg-red-50 transition-colors group"
                              aria-label="移除"
                            >
                              <Trash2
                                size={13}
                                className="transition-colors"
                                style={{ color: "#d1d5db" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pt-4 pb-6 space-y-3" style={{ borderTop: "1px solid #f3f4f6" }}>
              {/* Subtotal */}
              <div className="flex items-baseline justify-between">
                <span style={{ fontSize: 13, color: "#6b7280" }}>小計（{cart.totals.itemCount} 件）</span>
                <span className="font-bold" style={{ fontSize: 20, color: "#17284b" }}>
                  {formatPrice(cart.totals.subtotal, cart.totals.currencyCode)}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>含稅 · 運費於結帳時計算</p>

              {/* Checkout */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#17569E", fontSize: 14 }}
              >
                前往結帳
                <ArrowRight size={15} />
              </Link>

              {/* View cart */}
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex items-center justify-center w-full py-2.5 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
                style={{ color: "#17284b", border: "1.5px solid #e5e7eb", fontSize: 13 }}
              >
                查看完整購物車
              </Link>

              {/* Trust badge */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <Lock size={10} style={{ color: "#9ca3af" }} />
                <span style={{ fontSize: 11, color: "#9ca3af" }}>SSL 安全加密結帳</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
