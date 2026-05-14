import type { Metadata } from "next";
import Image from "next/image";
import { StorefrontPreFooter } from "@/components/storefront/StorefrontPreFooter";

export const metadata: Metadata = {
  title: "Lunio 台北門市｜乳膠床墊專賣店",
  description: "Lunio 台北門市，台北市大安區敦化南路一段176號（近捷運忠孝敦化8號出口）。每日 11:00–20:00 營業，歡迎預約試躺。",
  alternates: { canonical: "/storefront/taipei" },
};

const BLUE   = "#17569E";
const NAVY   = "#17284b";
const ORANGE = "#F5A000";
const FONT   = { fontFamily: "'MiSansTC','Noto Sans TC',sans-serif" };

const MAP_EMBED = "https://maps.google.com/maps?q=台北市大安區敦化南路一段176號&output=embed&z=16&hl=zh-TW";

function LineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#00B900" />
      <path d="M20 10.5C20 7.46 16.41 5 12 5S4 7.46 4 10.5c0 2.7 2.4 4.97 5.63 5.4.22.05.52.14.59.33.07.17.05.43.02.6l-.1.58c-.03.17-.14.67.59.36.73-.3 3.94-2.32 5.37-3.97C17.93 12.73 20 11.73 20 10.5z" fill="white" />
    </svg>
  );
}

export default function TaipeiStorePage() {
  return (
    <main style={FONT}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1200px] w-[88%] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Left — store info */}
            <div className="flex flex-col items-center text-center">
              <p className="font-semibold mb-1" style={{ fontSize: 15, color: ORANGE }}>【消費贈好禮】</p>
              <h1 className="font-bold mb-6" style={{ fontSize: "clamp(26px, 3vw, 38px)", color: NAVY }}>
                Lunio 台北門市
              </h1>

              <div className="relative w-full overflow-hidden rounded-2xl mb-6" style={{ aspectRatio: "4/3", maxWidth: 480 }}>
                <Image src="/storefront/taipei-store_202508.jpg" alt="Lunio 台北門市" fill className="object-cover" sizes="(max-width:768px) 100vw, 480px" priority />
              </div>

              <div className="space-y-2 mb-6">
                <p style={{ fontSize: 15, color: NAVY, fontWeight: 500 }}>台北市大安區敦化南路一段176號</p>
                <p style={{ fontSize: 14, color: "#6b7280" }}>（近捷運忠孝敦化8號出口）</p>
                <p className="mt-3" style={{ fontSize: 14, color: "#444" }}>營業時間：每日 11:00 — 20:00</p>
                <a href="tel:+886965218919" className="block hover:underline font-medium" style={{ fontSize: 15, color: BLUE }}>
                  聯絡電話：0965-218-919
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:underline" style={{ fontSize: 14, color: BLUE }}>
                  <LineIcon /> 聯繫台北門市Line官方
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <a href="https://maps.google.com/?q=台北市大安區敦化南路一段176號"
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: BLUE, color: "#fff", fontSize: 15 }}>
                  📍 查看Google Map
                </a>
                <a href="#booking"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-opacity hover:opacity-90"
                  style={{ border: `2px solid ${BLUE}`, color: BLUE, fontSize: 15 }}>
                  快速預約門市試躺 🛏
                </a>
              </div>
            </div>

            {/* Right — Google Map */}
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3", minHeight: 320 }}>
              <iframe
                src={MAP_EMBED}
                title="Lunio 台北門市地圖"
                width="100%" height="100%"
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>

      <StorefrontPreFooter />

    </main>
  );
}
