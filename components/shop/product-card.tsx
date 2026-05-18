import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/woocommerce.d";
import { isProductInStock } from "@/lib/woocommerce";

const BLUE   = "#3c7ae4";
const NAVY   = "#17284b";
const ORANGE = "#f5892a";

function ntd(price: string): string {
  const n = parseFloat(price);
  if (!n) return "";
  return `NT$${n.toLocaleString("zh-TW")}`;
}

function discount(regular: string, sale: string): number {
  const r = parseFloat(regular);
  const s = parseFloat(sale);
  if (!r || !s || s >= r) return 0;
  return Math.round((1 - s / r) * 100);
}

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const inStock   = isProductInStock(product);
  const onSale    = product.on_sale;
  const pct       = onSale ? discount(product.regular_price, product.sale_price) : 0;
  const img       = product.images[0];
  const href      = `/product/${product.slug}`;

  return (
    <Link
      href={href}
      className="lunio-product-card"
    >
      {/* Image */}
      <div className="lpc-img" style={{ position: "relative", width: "100%", paddingBottom: "72%", overflow: "hidden", background: "#f6f9ff" }}>
        {img?.src ? (
          <Image
            src={img.src}
            alt={img.alt || product.name}
            fill
            priority={priority}
            className="object-cover object-center"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
            style={{ transition: "transform .4s ease" }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: 14 }}>
            暫無圖片
          </div>
        )}

        {/* Badges */}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          {onSale && pct > 0 && (
            <span style={{ background: ORANGE, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6 }}>
              -{pct}%
            </span>
          )}
          {product.featured && (
            <span style={{ background: BLUE, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6 }}>
              精選
            </span>
          )}
          {!inStock && (
            <span style={{ background: "#999", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6 }}>
              已售完
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 0", flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Category */}
        {product.categories[0] && (
          <p style={{ fontSize: 11, color: BLUE, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>
            {product.categories[0].name}
          </p>
        )}

        {/* Name */}
        <h3 style={{ fontSize: "clamp(12px,0.95vw,13.5px)", fontWeight: 600, color: NAVY, lineHeight: 1.45, marginBottom: 10, flexGrow: 1 }}>
          {product.name}
        </h3>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
          {onSale ? (
            <>
              <span style={{ fontSize: "clamp(14px,1.2vw,16px)", fontWeight: 800, color: BLUE }}>
                {ntd(product.sale_price)}
              </span>
              <span style={{ fontSize: 12, color: "#bbb", textDecoration: "line-through" }}>
                {ntd(product.regular_price)}
              </span>
            </>
          ) : (
            <span style={{ fontSize: "clamp(14px,1.2vw,16px)", fontWeight: 700, color: NAVY }}>
              {product.price ? ntd(product.price) : "詢問價格"}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating_count > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#888", marginBottom: 4 }}>
            <span style={{ color: "#f5a623" }}>★</span>
            <span>{product.average_rating}</span>
            <span>({product.rating_count})</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: "12px 16px 16px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 0",
          borderRadius: 30,
          background: inStock ? BLUE : "#e5e7eb",
          color: inStock ? "#fff" : "#999",
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: "0.06em",
          transition: "background .2s",
        }}>
          {inStock ? "選購產品" : "補貨中"}
        </div>
      </div>
    </Link>
  );
}
