"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

import type { CartItem, Cart, CartTotals, CartCoupon, CartShippingRate, ShippingDestination } from "@/types/woocommerce";

// --- Store API response types ---

interface StoreItemPrices {
  price: string;
  regular_price: string;
  currency_minor_unit: number;
}

interface StoreItemTotals {
  line_subtotal: string;
  line_total: string;
  currency_minor_unit: number;
}

interface StoreCartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  images: Array<{ src: string }>;
  variation: Array<{ attribute: string; value: string }>;
  prices: StoreItemPrices;
  totals: StoreItemTotals;
}

interface StoreCartTotals {
  total_items: string;
  total_shipping: string;
  total_tax: string;
  total_price: string;
  total_discount: string;
  currency_minor_unit: number;
  currency_code: string;
}

interface StoreCoupon {
  code: string;
  label: string;
  discount: string;
}

interface StoreShippingRate {
  rate_id: string;
  name: string;
  price: string;
  selected: boolean;
}

interface StoreShippingDestination {
  country: string;
  city: string;
  state: string;
  postcode: string;
  address_1: string;
}

interface StoreShippingPackage {
  package_id: number;
  destination: StoreShippingDestination;
  shipping_rates: StoreShippingRate[];
}

interface StoreCart {
  items: StoreCartItem[];
  items_count: number;
  totals: StoreCartTotals;
  coupons?: StoreCoupon[];
  shipping_rates?: StoreShippingPackage[];
  _nonce?: string;
}

// --- Helpers ---

function toDecimal(minorUnits: string, decimals: number): string {
  return (parseFloat(minorUnits || "0") / Math.pow(10, decimals)).toFixed(decimals);
}

const EMPTY_TOTALS: CartTotals = {
  subtotal: "0.00",
  shipping: "0.00",
  tax: "0.00",
  total: "0.00",
  discount: "0.00",
  itemCount: 0,
  currencyCode: "TWD",
};

const EMPTY_CART: Cart = { items: [], totals: EMPTY_TOTALS, coupons: [], shippingRates: [], shippingDestination: null };

function mapStoreCart(data: StoreCart): Cart {
  const d = data.totals?.currency_minor_unit ?? 2;

  const items: CartItem[] = data.items.map((item) => ({
    key: item.key,
    productId: item.id,
    quantity: item.quantity,
    name: item.name,
    price: toDecimal(item.prices.price, item.prices.currency_minor_unit),
    regularPrice: toDecimal(item.prices.regular_price, item.prices.currency_minor_unit),
    lineTotal: toDecimal(item.totals.line_total, item.totals.currency_minor_unit),
    image: item.images[0]?.src,
    attributes: item.variation,
  }));

  const totals: CartTotals = {
    subtotal: toDecimal(data.totals.total_items, d),
    shipping: toDecimal(data.totals.total_shipping, d),
    tax: toDecimal(data.totals.total_tax, d),
    total: toDecimal(data.totals.total_price, d),
    discount: toDecimal(data.totals.total_discount, d),
    itemCount: data.items_count,
    currencyCode: data.totals.currency_code ?? "TWD",
  };

  const coupons: CartCoupon[] = (data.coupons ?? []).map((c) => ({
    code: c.code,
    label: c.label,
    discount: toDecimal(c.discount, d),
  }));

  const shippingRates: CartShippingRate[] = (data.shipping_rates ?? []).flatMap((pkg) =>
    pkg.shipping_rates.map((r) => ({
      rateId: r.rate_id,
      name: r.name,
      price: toDecimal(r.price, d),
      selected: r.selected,
      packageId: pkg.package_id,
    }))
  );

  const firstPkg = data.shipping_rates?.[0];
  const dest = firstPkg?.destination;
  const shippingDestination: ShippingDestination | null =
    dest && (dest.city || dest.postcode || dest.address_1)
      ? { country: dest.country, city: dest.city, state: dest.state, postcode: dest.postcode, address_1: dest.address_1 }
      : null;

  return { items, totals, coupons, shippingRates, shippingDestination };
}

// --- Context ---

interface CartContextType {
  cart: Cart;
  nonce: string;
  isOpen: boolean;
  isLoading: boolean;
  isSyncing: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (productId: number, quantity: number) => Promise<void>;
  addGiftItem: (mainProductId: number, giftProductId: number, quantity: number) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  updateQuantity: (key: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: (code: string) => Promise<void>;
  selectShippingRate: (packageId: number, rateId: string) => Promise<void>;
  updateShippingAddress: (address: { city: string; postcode: string; address_1: string }) => Promise<void>;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart localStorage cache — stale-while-revalidate
const CART_CACHE_KEY = "lunio_cart_cache";
function loadCartCache(): Cart | null {
  try {
    const raw = localStorage.getItem(CART_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function saveCartCache(cart: Cart) {
  try { localStorage.setItem(CART_CACHE_KEY, JSON.stringify(cart)); } catch {}
}

// giftRelations: sessionStorage — { giftProductId: mainProductId }
// When main product leaves cart, gift is auto-removed by useEffect watcher
const GIFT_KEY = "lunio_gift_relations";
function loadGiftRelations(): Record<number, number> {
  try { return JSON.parse(sessionStorage.getItem(GIFT_KEY) ?? "{}"); } catch { return {}; }
}
function saveGiftRelations(r: Record<number, number>) {
  sessionStorage.setItem(GIFT_KEY, JSON.stringify(r));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => loadCartCache() ?? EMPTY_CART);
  const [nonce, setNonce] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0); // items being added

  const applyResponse = useCallback((data: StoreCart) => {
    const mapped = mapStoreCart(data);
    setCart(mapped);
    saveCartCache(mapped);
    if (data._nonce) setNonce(data._nonce);
  }, []);

  const callCart = useCallback(
    async (url: string, options: RequestInit = {}): Promise<void> => {
      const res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "x-wc-nonce": nonce,
          ...(options.headers as Record<string, string>),
        },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Cart operation failed");
      }
      const data: StoreCart = await res.json();
      applyResponse(data);
    },
    [nonce, applyResponse]
  );

  // Initial cart fetch — stale-while-revalidate
  // Cache is already loaded in useState initializer, so isLoading=false immediately
  useEffect(() => {
    const cached = loadCartCache();
    if (cached) setIsLoading(false); // show cache instantly
    fetch("/api/cart", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: StoreCart) => applyResponse(data))
      .catch((e) => console.error("Failed to load cart:", e))
      .finally(() => setIsLoading(false));
  }, [applyResponse]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((p) => !p), []);

  // Re-fetch cart to pick up plugin-recalculated values (e.g. WooDiscountRules gifts)
  const refreshCart = useCallback(async () => {
    const data: StoreCart = await fetch("/api/cart", { cache: "no-store" }).then(r => r.json());
    applyResponse(data);
  }, [applyResponse]);

  const addItem = useCallback(
    async (productId: number, quantity: number) => {
      setIsSyncing(true);
      try {
        await callCart("/api/cart/add-item", {
          method: "POST",
          body: JSON.stringify({ id: productId, quantity }),
        });
        setIsOpen(true); // open after item is ready — no skeleton needed
      } finally {
        setIsSyncing(false);
      }
      // refresh in background — picks up WooDiscountRules gift calculations
      refreshCart().catch(() => {});
    },
    [callCart, refreshCart]
  );

  // addGiftItem — add gift + save relation: giftProductId → mainProductId
  const addGiftItem = useCallback(
    async (mainProductId: number, giftProductId: number, quantity: number) => {
      await callCart("/api/cart/add-item", {
        method: "POST",
        body: JSON.stringify({ id: giftProductId, quantity }),
      });
      const relations = loadGiftRelations();
      relations[giftProductId] = mainProductId;
      saveGiftRelations(relations);
      setIsOpen(true);
    },
    [callCart]
  );

  const removeItem = useCallback(
    async (key: string) => {
      // Find which product is being removed
      const removedItem = cart.items.find((i) => i.key === key);

      // Remove the main item
      await callCart("/api/cart/remove-item", {
        method: "POST",
        body: JSON.stringify({ key }),
      });

      if (!removedItem) return;

      // Check if any gifts are linked to this product
      const relations = loadGiftRelations();
      const giftProductIds = Object.entries(relations)
        .filter(([, mainId]) => mainId === removedItem.productId)
        .map(([giftId]) => Number(giftId));

      if (giftProductIds.length === 0) return;

      // Fetch fresh cart — remove any zero-price items (plugin-added gifts)
      const freshCart: StoreCart = await fetch("/api/cart", { cache: "no-store" }).then(r => r.json());

      for (const item of freshCart.items) {
        const price = parseFloat(item.prices?.price ?? "1");
        if (price === 0) {
          await callCart("/api/cart/remove-item", {
            method: "POST",
            body: JSON.stringify({ key: item.key }),
          });
        }
      }

      // Also remove by explicit gift relations if any
      for (const giftProductId of giftProductIds) {
        const giftItem = freshCart.items.find((i) => i.id === giftProductId);
        if (giftItem) {
          await callCart("/api/cart/remove-item", {
            method: "POST",
            body: JSON.stringify({ key: giftItem.key }),
          });
        }
        delete relations[giftProductId];
      }
      saveGiftRelations(relations);
    },
    [callCart, cart.items]
  );

  const updateQuantity = useCallback(
    async (key: string, quantity: number) => {
      if (quantity <= 0) {
        await removeItem(key);
        return;
      }
      await callCart("/api/cart/update-item", {
        method: "POST",
        body: JSON.stringify({ key, quantity }),
      });
      await refreshCart(); // re-fetch so plugin recalculates gift quantities
    },
    [callCart, removeItem, refreshCart]
  );

  const clearCart = useCallback(async () => {
    await callCart("/api/cart", { method: "DELETE" });
  }, [callCart]);

  const applyCoupon = useCallback(async (code: string) => {
    await callCart("/api/cart/apply-coupon", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  }, [callCart]);

  const removeCoupon = useCallback(async (code: string) => {
    await callCart("/api/cart/remove-coupon", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  }, [callCart]);

  const selectShippingRate = useCallback(async (packageId: number, rateId: string) => {
    await callCart("/api/cart/select-shipping-rate", {
      method: "POST",
      body: JSON.stringify({ package_id: packageId, rate_id: rateId }),
    });
  }, [callCart]);

  const updateShippingAddress = useCallback(
    async (address: { city: string; postcode: string; address_1: string }) => {
      await callCart("/api/cart/update-customer", {
        method: "POST",
        body: JSON.stringify({
          shipping_address: { country: "TW", state: "", ...address },
        }),
      });
    },
    [callCart]
  );

  const getItemCount = useCallback(
    () => cart.totals.itemCount,
    [cart.totals.itemCount]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        nonce,
        isOpen,
        isLoading,
        isSyncing,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        addGiftItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        selectShippingRate,
        updateShippingAddress,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
