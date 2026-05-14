/**
 * Product Grid — reusable WooCommerce product grid component
 * Used for Lunio Collection and Pillows sections on homepage.
 * Matches the product card style from lunio.com.tw category pages.
 */

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/lib/woocommerce.d";

// ─── Individual card ──────────────────────────────────────────────────────────
export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];
  const price = parseInt(product.price || "0");
  const regularPrice = product.regular_price
    ? parseInt(product.regular_price)
    : 0;
  const isOnSale = product.on_sale && regularPrice > price;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block bg-white rounded-[8px] overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{ border: "1px solid #E4E4E4" }}
    >
      {/* Image */}
      <div className="relative aspect-square bg-[#F8F8F8] overflow-hidden">
        {image?.src ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
            sizes="(max-width: 544px) 50vw, (max-width: 921px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-[#E4E4E4]" />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isOnSale && (
            <span
              className="bg-[#3c7ae4] text-white rounded-full font-medium leading-none px-2.5 py-1"
              style={{ fontSize: "10px", letterSpacing: "0.5px" }}
            >
              特價
            </span>
          )}
          {product.featured && (
            <span
              className="bg-[#17284b] text-white rounded-full font-medium leading-none px-2.5 py-1"
              style={{ fontSize: "10px" }}
            >
              精選
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3
          className="font-medium text-[#212020] leading-snug line-clamp-2 mb-2"
          style={{ fontSize: "13px", minHeight: "38px" }}
        >
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          {price > 0 && (
            <span
              className="font-bold"
              style={{ fontSize: "15px", color: "#3c7ae4" }}
            >
              NT${price.toLocaleString()}
            </span>
          )}
          {isOnSale && regularPrice > 0 && (
            <span
              className="text-[#888888] line-through"
              style={{ fontSize: "12px" }}
            >
              NT${regularPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Grid wrapper ─────────────────────────────────────────────────────────────
interface ProductGridProps {
  products: Product[];
  title: string;
  eyebrow?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  bgColor?: string;
  columns?: 3 | 4;
}

export function ProductGrid({
  products,
  title,
  eyebrow,
  viewAllHref,
  viewAllLabel = "查看全部",
  bgColor = "#ffffff",
  columns = 4,
}: ProductGridProps) {
  if (!products.length) return null;

  return (
    <section className="py-14 md:py-16" style={{ backgroundColor: bgColor }}>
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            {eyebrow && (
              <p
                className="tracking-[5px] uppercase font-medium mb-2"
                style={{ fontSize: "11px", color: "#3c7ae4" }}
              >
                {eyebrow}
              </p>
            )}
            <h2 className="font-bold text-[#212020]">{title}</h2>
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="hidden sm:flex items-center gap-1 font-medium transition-colors hover:opacity-70"
              style={{ fontSize: "13px", color: "#3c7ae4" }}
            >
              {viewAllLabel}
              <ChevronRight size={14} />
            </Link>
          )}
        </div>

        {/* Grid */}
        <div
          className={`grid gap-4 md:gap-5 ${
            columns === 3
              ? "grid-cols-2 md:grid-cols-3"
              : "grid-cols-2 md:grid-cols-4"
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile view-all */}
        {viewAllHref && (
          <div className="text-center mt-6 sm:hidden">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1 font-medium"
              style={{ fontSize: "13px", color: "#3c7ae4" }}
            >
              {viewAllLabel} <ChevronRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
