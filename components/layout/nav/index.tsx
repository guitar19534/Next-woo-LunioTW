/**
 * Site header — sticky, 70 px tall, matches lunio.com.tw
 *
 * Scroll behaviour (matches live site):
 *   ① At top   → dark navy bg (#17284b), white text/icons — blends with the dark hero
 *   ② Scrolled → white bg, dark text/icons, subtle shadow
 *
 * Layout:
 *   Desktop  [Logo]  [Nav — centered]  [Account · Cart]
 *   Mobile   [Logo]  ———————————————   [Cart · Hamburger]
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/features/shop";
import { MobileNav } from "./mobile-nav";
import { DesktopMenu } from "./desktop-menu";
import { NavScrollEffect } from "./scroll-effect";
import { brandConfig } from "@/config/brand";

function UserIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    handler(); // set correct state on mount (e.g. page refreshed mid-scroll)
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // true  → dark state: white text on navy bg
  // false → light state: dark text on white bg
  const dark = !scrolled;

  return (
    <header className="sticky top-0 z-50">
      {/* NavScrollEffect adds box-shadow when scrolled — still useful in light state */}
      <NavScrollEffect />

      {/* ── Announcement bar ─────────────────────────────────────────────── */}
      {brandConfig.announcement.active && (
        <div
          className="text-center"
          style={{
            backgroundColor: "#17284b",
            color: "#ffffff",
            fontSize: "12px",
            padding: "7px 16px",
            letterSpacing: "0.03em",
          }}
        >
          <a
            href={brandConfig.announcement.href}
            className="hover:underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {brandConfig.announcement.text}
          </a>
        </div>
      )}

      {/* ── Main nav bar ─────────────────────────────────────────────────── */}
      <div
        data-nav-bar
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "bg-white border-b border-[#eaeaea]"
            : "bg-[#000000] border-b border-white/10"
        )}
      >
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8">

          {/* ── Mobile: [Hamburger] [Logo] [Cart] ─────────────────────── */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[70px] lg:hidden">

            {/* Left — hamburger */}
            <div className="flex items-center">
              <MobileNav dark={dark} />
            </div>

            {/* Center — logo */}
            <Link
              href="/"
              aria-label={brandConfig.logo.alt}
              className="hover:opacity-80 transition-opacity duration-150"
            >
              <Image
                src={brandConfig.logo.src}
                alt={brandConfig.logo.alt}
                width={90}
                height={40}
                priority
                loading="eager"
                style={{ height: "40px", width: "auto" }}
                className={cn("transition-all duration-300", dark && "brightness-0 invert")}
              />
            </Link>

            {/* Right — cart */}
            <div className={cn(
              "flex items-center justify-end transition-colors duration-300",
              dark && "text-white [&_button]:text-white"
            )}>
              <CartDrawer />
            </div>
          </div>

          {/* ── Desktop: [Logo] [Nav] [Account · Cart] ────────────────── */}
          <div className="hidden lg:flex items-center justify-between h-[70px] gap-4">

            {/* Logo */}
            <Link
              href="/"
              aria-label={brandConfig.logo.alt}
              className="flex-shrink-0 hover:opacity-80 transition-opacity duration-150"
            >
              <Image
                src={brandConfig.logo.src}
                alt={brandConfig.logo.alt}
                width={100}
                height={45}
                priority
                loading="eager"
                style={{ height: "45px", width: "auto" }}
                className={cn("transition-all duration-300", dark && "brightness-0 invert")}
              />
            </Link>

            {/* Desktop nav — centered */}
            <div className="flex flex-1 justify-center min-w-0">
              <DesktopMenu dark={dark} />
            </div>

            {/* Account + Cart */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <a
                href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""}/my-account`}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-150",
                  dark
                    ? "text-white hover:bg-white/10"
                    : "text-[#212020] hover:bg-gray-50"
                )}
                aria-label="我的帳戶"
                title="我的帳戶"
              >
                <UserIcon />
              </a>

              <div className={cn("transition-colors duration-300", dark && "text-white [&_button]:text-white")}>
                <CartDrawer />
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
