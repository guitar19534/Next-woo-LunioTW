"use client";

import { useEffect } from "react";

/**
 * Adds a subtle box-shadow to the nav bar when the page is scrolled.
 * Runs entirely in the browser — zero SSR payload.
 */
export function NavScrollEffect() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>("[data-nav-bar]");
    const handler = () => {
      if (!bar) return;
      bar.style.boxShadow =
        window.scrollY > 8 ? "0 2px 16px rgba(0,0,0,0.08)" : "";
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler(); // run once on mount
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return null;
}
