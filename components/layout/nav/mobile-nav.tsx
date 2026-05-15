/**
 * Mobile navigation drawer — slides in from the left.
 *
 * Structure:
 *  Header: Lunio logo + close button
 *  Body:   Product dropdowns (accordion) → flat links → utility links
 *  Footer: Account + quick CTA
 */

"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { productMenu, mainMenu } from "@/config/menu";
import { brandConfig } from "@/config/brand";

const DROPDOWN_KEYS = new Set(["床墊", "枕頭", "寢具配件"]);

export function MobileNav({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const toggle = (key: string) =>
    setExpanded((prev) => (prev === key ? null : key));

  const dropdowns = Object.values(productMenu);
  const flatLinks = (Object.entries(mainMenu) as [string, string][]).filter(
    ([key]) => !DROPDOWN_KEYS.has(key)
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Hamburger trigger */}
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex lg:hidden items-center justify-center w-10 h-10 rounded-full transition-colors duration-300",
            dark ? "text-white hover:bg-white/10" : "text-[#212020] hover:bg-gray-50"
          )}
          aria-label="開啟選單"
        >
          <Menu size={22} />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        // [&>button:last-child] hides the default Radix close button —
        // we render our own in the header row instead.
        className="w-[300px] sm:w-[340px] p-0 flex flex-col [&>button:last-child]:hidden"
        style={{ borderRight: "1px solid #eaeaea" }}
      >
        {/* ── Sheet header ─────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
          style={{ borderColor: "#eaeaea" }}
        >
          <MobileLink href="/" onOpenChange={setOpen}>
            <Image
              src={brandConfig.logo.src}
              alt={brandConfig.logo.alt}
              width={80}
              height={36}
              style={{ height: "36px", width: "auto" }}
            />
          </MobileLink>
          <SheetClose asChild>
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="關閉選單"
            >
              <X size={18} />
            </button>
          </SheetClose>
        </div>

        {/* ── Scrollable body ──────────────────────────────────────── */}
        <ScrollArea className="flex-1">
          <div className="py-3">

            {/* Product category dropdowns */}
            {dropdowns.map((cat) => (
              <div key={cat.label}>
                <button
                  type="button"
                  onClick={() => toggle(cat.label)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-[14px] font-medium text-[#212020] hover:bg-gray-50 transition-colors"
                >
                  {cat.label}
                  <ChevronDown
                    size={14}
                    className={cn(
                      "text-gray-400 transition-transform duration-200",
                      expanded === cat.label && "rotate-180"
                    )}
                  />
                </button>

                {expanded === cat.label && (
                  <div className="bg-[#fafafa] border-y border-gray-100">
                    {/* Category link */}
                    <MobileLink
                      href={cat.href}
                      onOpenChange={setOpen}
                      className="block px-5 py-3 text-[13px] font-semibold text-[#17284b] hover:text-[#3c7ae4] transition-colors"
                    >
                      {cat.label} 全系列
                    </MobileLink>
                    <div className="mx-5 border-t border-gray-100" />
                    {cat.items.map((item) => (
                      <MobileLink
                        key={item.href}
                        href={item.href}
                        onOpenChange={setOpen}
                        className={cn(
                          "block px-5 py-2.5 text-[13px] border-b border-gray-100 last:border-0 transition-colors",
                          item.label.endsWith("→")
                            ? "font-medium text-[#3c7ae4]"
                            : "text-[#5F6062] hover:text-[#3c7ae4]"
                        )}
                      >
                        {item.label}
                      </MobileLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Divider */}
            <div className="mx-5 my-2 border-t border-gray-100" />

            {/* Flat nav links */}
            {flatLinks.map(([label, href]) => (
              <MobileLink
                key={href}
                href={href}
                onOpenChange={setOpen}
                className="flex items-center px-5 py-3.5 text-[14px] font-medium text-[#212020] hover:text-[#3c7ae4] hover:bg-gray-50 transition-colors"
              >
                {label}
              </MobileLink>
            ))}

            {/* Divider */}
            <div className="mx-5 my-2 border-t border-gray-100" />

            {/* Utility: cart + account */}
            <div className="px-5 py-2 space-y-1">
              <MobileLink
                href="/cart"
                onOpenChange={setOpen}
                className="flex items-center gap-2.5 py-3 text-[13px] text-[#5F6062] hover:text-[#3c7ae4] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                購物車
              </MobileLink>
              <a
                href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""}/my-account`}
                className="flex items-center gap-2.5 py-3 text-[13px] text-[#5F6062] hover:text-[#3c7ae4] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                我的帳戶
              </a>
            </div>

          </div>
        </ScrollArea>

        {/* ── Sheet footer CTA ─────────────────────────────────────── */}
        <div
          className="px-5 py-4 border-t flex-shrink-0"
          style={{ borderColor: "#eaeaea" }}
        >
          <MobileLink
            href="/storefront"
            onOpenChange={setOpen}
            className="flex items-center justify-center w-full py-3 rounded-[30px] text-[13.5px] font-medium tracking-[1px] transition-colors"
            style={{
              backgroundColor: "#3c7ae4",
              color: "#ffffff",
            }}
          >
            預約門市試躺
          </MobileLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── MobileLink helper ────────────────────────────────────────────────────────

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  style,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={className}
      style={style}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
