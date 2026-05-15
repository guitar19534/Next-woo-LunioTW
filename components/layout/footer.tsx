import Link from "next/link";
import Image from "next/image";
import { brandConfig } from "@/brand.config";

const NAV: { label: string; items: { label: string; href: string }[] }[] = [
  {
    label: "幫助",
    items: [
      { label: "產品及購物說明", href: "/faq" },
      { label: "會員中心",      href: "/account" },
    ],
  },
  {
    label: "關於",
    items: [
      { label: "品牌故事",     href: "/our-story" },
      { label: "Lunio 門市",   href: "/storefront" },
      { label: "分辨天然乳膠", href: "/blog" },
    ],
  },
  {
    label: "資源",
    items: [
      { label: "領取優惠",    href: "/shop/category/campaign10000" },
      { label: "Lunio Blog",  href: "/blog" },
    ],
  },
  {
    label: "產品",
    items: [
      { label: "床墊",    href: "/shop/category/mattress" },
      { label: "枕頭",    href: "/shop/category/pillow" },
      { label: "床包被子", href: "/product/tencel-bedsheet" },
      { label: "保潔墊",  href: "/product/lunio-protector" },
    ],
  },
];

const SOCIAL = [
  { label: "電話",      href: "tel:+886965218919",                      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12.17 19.79 19.79 0 0 1 1.42 3.5 2 2 0 0 1 3.4 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/></svg> },
  { label: "LINE",      href: "https://line.me",                        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg> },
  { label: "Messenger", href: "https://m.me/LunioTW",                   icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.26 5.889-3.26-6.56 6.963z"/></svg> },
  { label: "Facebook",  href: "https://www.facebook.com/LunioTW",       icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { label: "Instagram", href: "https://www.instagram.com/lunio_taiwan/", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg> },
  { label: "YouTube",   href: "https://www.youtube.com/@LunioTaiwan",   icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg> },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        fontFamily: "'MiSansTC','Noto Sans TC',sans-serif",
        background: "linear-gradient(175deg, #06122a 0%, #0c1d3b 50%, #111f40 100%)",
        color: "#fff",
      }}
    >
      <style>{`
        .ft-link { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1; transition: color 0.15s; letter-spacing: 0.01em; }
        .ft-link:hover { color: #60a5fa; }
        .ft-social { color: rgba(255,255,255,0.45); transition: color 0.15s; }
        .ft-social:hover { color: #fff; }
      `}</style>

      {/* ── Top rule ─────────────────────────────────────────────── */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.3) 30%, rgba(96,165,250,0.3) 70%, transparent)" }} />

      {/* ── Main body ────────────────────────────────────────────── */}
      <div className="max-w-[1280px] w-[88%] mx-auto py-16">
        <div className="grid md:grid-cols-[1fr_auto] gap-16 md:gap-24">

          {/* ─ Left: brand block ───────────────────────────────────── */}
          <div className="max-w-[340px]">

            {/* Logo */}
            <Link href="/" aria-label="Lunio" className="inline-block mb-8">
              <Image
                src={brandConfig.logo.src}
                alt="Lunio"
                width={120}
                height={44}
                className="object-contain brightness-0 invert"
              />
            </Link>

            {/* Tagline */}
            <p className="font-semibold mb-3" style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", letterSpacing: "0.01em" }}>
              Lunio 相信，好睡不該是奢侈
            </p>

            {/* Description */}
            <p style={{ fontSize: 13, letterSpacing: "0.2em", color: "rgba(255,255,254,0.85)", lineHeight: 1.85 }}>
              結合睡眠科技與專業醫師研發，打造高機能乳膠床墊與記憶枕。以平實價格，實現人人都能負擔的高品質好眠，讓每一夜都安心入睡、自在醒來。
            </p>

            {/* Cert badges */}
            <div className="mt-8">
              <Image
                src="/images/Group-155.webp"
                alt="Lunio 認證"
                width={380}
                height={52}
                className="object-contain w-full max-w-[340px] opacity-75"
              />
            </div>
          </div>

          {/* ─ Right: nav columns ──────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-10">
            {NAV.map((col) => (
              <div key={col.label}>
                <p className="font-semibold mb-5" style={{ fontSize: 13.5, color: "#fff", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {col.label}
                </p>
                <ul className="space-y-4">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="ft-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.35)" }}>
        <div className="max-w-[1280px] w-[88%] mx-auto py-5 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Social row */}
          <div className="flex items-center gap-5">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="ft-social"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col items-end gap-1.5">
            <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)", letterSpacing: "0.02em" }}>
              荷叡森有限公司　統一編號：82906524
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-end" style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)" }}>
              <span>Copyright ©{year} <span style={{ color: "#60a5fa" }}>Lunio</span> Taiwan</span>
              <span style={{ opacity: 0.3 }}>·</span>
              <Link href="/blog"          className="ft-link">分辨乳膠</Link>
              <Link href="/faq"           className="ft-link">產品購物須知</Link>
              <Link href="/faq" className="ft-link">隱私政策</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
