/**
 * Promotional Banner
 * Matches the "最新床墊優惠，立刻查看！" dark CTA section on lunio.com.tw
 */

import Link from "next/link";

export function PromoBanner() {
  return (
    <section
      className="py-14 md:py-16"
      style={{
        background:
          "linear-gradient(135deg, #17284b 0%, #1e3560 50%, #17284b 100%)",
      }}
    >
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8 text-white text-center">
        <p
          className="tracking-[5px] uppercase font-medium mb-4"
          style={{ fontSize: "11px", color: "#93b4f0" }}
        >
          SPECIAL OFFERS · 限時優惠
        </p>

        <h2 className="font-bold text-white mb-4">
          最新床墊優惠，立刻查看！
        </h2>

        <p
          className="text-slate-300 mb-8 mx-auto leading-relaxed"
          style={{ maxWidth: "580px", fontSize: "15px" }}
        >
          不論你喜歡哪種床墊躺感、支撐度、涼感度，總有一款適合你！
          <br />
          現在訂購享有獨家套組優惠，限量供應。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop/category/campaign10000"
            className="btn-lunio"
          >
            立刻搶購
          </Link>
          <Link
            href="/shop"
            className="btn-lunio-white"
          >
            瀏覽全部商品
          </Link>
        </div>
      </div>
    </section>
  );
}
