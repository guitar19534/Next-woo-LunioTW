"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCart } from "@/components/shop/cart-provider";

export function AddToCartHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { addItem, openCart } = useCart();
  const handled = useRef<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("add-to-cart");
    if (!id || handled.current === id) return;
    handled.current = id;

    const varId = parseInt(id, 10);
    if (isNaN(varId)) return;

    // Open cart immediately for instant feedback (optimistic)
    openCart();

    // Clean URL right away
    const params = new URLSearchParams(searchParams.toString());
    params.delete("add-to-cart");
    const qs = params.toString();
    router.replace(pathname + (qs ? `?${qs}` : ""), { scroll: false });

    // Add item in background — cart will show syncing state
    addItem(varId, 1).catch(() => {});
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
