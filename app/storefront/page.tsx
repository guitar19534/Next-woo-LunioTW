import type { Metadata } from "next";
import Image from "next/image";
import { StorefrontPreFooter } from "@/components/storefront/StorefrontPreFooter";

export const metadata: Metadata = {
  title: "Lunio門市 — 乳膠床墊專賣店｜Lunio Taiwan",
  description: "Lunio於台北、桃園、新竹、台中、台南、高雄都有床墊試躺服務，立刻找尋離您最近的門市預約試躺。",
  alternates: { canonical: "/storefront" },
};

const BLUE   = "#17569E";
const NAVY   = "#17284b";
const ORANGE = "#F5A000";
const FONT   = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

const STORES = [
  { name: "台北門市",     img: "/storefront/taipei-store_202508.jpg",        href: "/storefront/taipei",    phone: "+886 965 218 919", lineLabel: "聯繫台北門市Line官方",   lineHref: "#", mapHref: "#" },
  { name: "桃園門市",     img: "/storefront/Taoyuan-storefront (1).jpg",     href: "/storefront/taoyuan",   phone: "+886 937 968 020", lineLabel: "聯繫桃園門市Line官方",   lineHref: "#", mapHref: "#" },
  { name: "新竹新生活門市", img: "/storefront/hsinchu-store (1).jpg",        href: "/storefront/hsinchu",   phone: "+886 965 321 511", lineLabel: "聯繫新竹門市Line官方",   lineHref: "#", mapHref: "#" },
  { name: "台中門市",     img: "/storefront/Taichung-store.jpg",             href: "/storefront/taichung",  phone: "+886 965 032 822", lineLabel: "聯繫台中門市Line官方",   lineHref: "#", mapHref: "#" },
  { name: "台南旗艦店",   img: "/storefront/DreamLands-store.jpg",           href: "/storefront/tainan",    phone: "+886 937 968 070", lineLabel: "聯繫台南門市Line官方",   lineHref: "#", mapHref: "#" },
  { name: "高雄旗艦店",   img: "/storefront/Lunio高雄門市.webp",             href: "/storefront/kaohsiung", phone: "+886 965 508 387", lineLabel: "聯繫高雄門市Line官方",   lineHref: "#", mapHref: "#" },
];

function LineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#00B900" />
      <path d="M20 10.5C20 7.46 16.41 5 12 5S4 7.46 4 10.5c0 2.7 2.4 4.97 5.63 5.4.22.05.52.14.59.33.07.17.05.43.02.6l-.1.58c-.03.17-.14.67.59.36.73-.3 3.94-2.32 5.37-3.97C17.93 12.73 20 11.73 20 10.5z" fill="white" />
    </svg>
  );
}

export default function StorefrontPage() {
  return (
    <main style={FONT}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#EBF2FB" }} className="py-5 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-bold mb-1" style={{ fontSize: "clamp(20px, 2.2vw, 28px)", color: BLUE }}>
              Lunio門市 — 乳膠床墊專賣店
            </h1>
            <p style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "#555" }}>
              Lunio於台北、新竹、台中、台南、高雄都有床墊試躺服務，立刻找尋離您最近的門市預約試躺。
            </p>
          </div>
          <a href="#booking"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ backgroundColor: ORANGE, color: "#fff", fontSize: 14 }}>
            🗓 立即預約試躺
          </a>
        </div>
      </section>

      {/* ── Store List ────────────────────────────────────────────── */}
      <section className="bg-white py-10 md:py-16">
        <div className="max-w-[1100px] w-[88%] mx-auto divide-y divide-gray-100">
          {STORES.map((s) => (
            <div key={s.name} className="grid md:grid-cols-[340px_1fr] gap-8 md:gap-16 items-center py-10 first:pt-0 last:pb-0">
              <a href={s.href} className="block">
                <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
                  <Image src={s.img} alt={s.name} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width:768px) 100vw, 340px" />
                </div>
              </a>
              <div>
                <h2 className="font-bold mb-4" style={{ fontSize: "clamp(18px, 1.8vw, 24px)", color: NAVY }}>
                  <a href={s.href} className="hover:underline">{s.name}</a>
                  <span className="ml-2 font-semibold" style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: ORANGE }}>【消費贈好禮】</span>
                </h2>
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-2.5" style={{ color: "#444", fontSize: 14 }}>
                    <span>🗓</span><span>營業時間：每日 11:00 — 20:00</span>
                  </div>
                  <div className="flex items-center gap-2.5" style={{ color: "#444", fontSize: 14 }}>
                    <span>📞</span>
                    <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:underline">{s.phone}</a>
                  </div>
                  <div className="flex items-center gap-2.5" style={{ fontSize: 14 }}>
                    <LineIcon />
                    <a href={s.lineHref} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#00B900" }}>{s.lineLabel}</a>
                  </div>
                </div>
                <a href={s.mapHref} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: BLUE, color: "#fff", fontSize: 14 }}>
                  查看位置
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <StorefrontPreFooter />

    </main>
  );
}
