/**
 * Footer — matches the dark navy footer on lunio.com.tw
 * Dark bg (#17284b), white text, 4 link columns + social icons + copyright
 */

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/providers/theme-toggle";
import { footerMenu } from "@/config/menu";
import { siteConfig } from "@/config/site";
import { brandConfig } from "@/config/brand";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/LunioTW",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: brandConfig.social.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LINE",
    href: brandConfig.social.line,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
      </svg>
    ),
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#17284b", color: "#ffffff" }}>
      {/* ── Main footer content ── */}
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8 pt-14 pb-10">
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
          {/* Brand column */}
          <div className="space-y-5">
            {/* Logo — white version via CSS invert */}
            <Link href="/" aria-label={brandConfig.logo.alt}>
              <Image
                src={brandConfig.logo.src}
                alt={brandConfig.logo.alt}
                width={brandConfig.logo.width}
                height={brandConfig.logo.height}
                className="invert brightness-0 invert"
              />
            </Link>

            <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.7, maxWidth: "280px" }}>
              {siteConfig.site_description}
            </p>

            {/* Contact */}
            <div className="space-y-1.5" style={{ fontSize: "13px", color: "#94a3b8" }}>
              <p>
                📞{" "}
                <a
                  href={`tel:${brandConfig.store.phone.replace(/-/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {brandConfig.store.phone}
                </a>
              </p>
              <p>
                ✉{" "}
                <a
                  href={`mailto:${brandConfig.store.email}`}
                  className="hover:text-white transition-colors"
                >
                  {brandConfig.store.email}
                </a>
              </p>
              <p>🕐 {brandConfig.store.hours}</p>
              <p>📍 {brandConfig.store.locations[0].address}</p>
            </div>

            {/* Social links */}
            <style>{`
              .footer-social-icon { background-color: rgba(255,255,255,0.1); color: #94a3b8; }
              .footer-social-icon:hover { background-color: rgba(255,255,255,0.22); color: #ffffff; }
            `}</style>
            <div className="flex items-center gap-3 pt-1">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social-icon flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.values(footerMenu).map((section) => (
            <div key={section.label}>
              <h5
                className="font-semibold text-white mb-4"
                style={{ fontSize: "14px" }}
              >
                {section.label}
              </h5>
              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors duration-200 hover:text-white"
                      style={{ fontSize: "13px", color: "#94a3b8" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8 py-4 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-3" style={{ fontSize: "12px", color: "#64748b" }}>
              <Link href="/faq" className="hover:text-white transition-colors">
                產品購物須知
              </Link>
              <span aria-hidden>·</span>
              <Link href="/faq" className="hover:text-white transition-colors">
                隱私政策
              </Link>
            </div>
          </div>
          <p style={{ fontSize: "12px", color: "#64748b" }}>
            荷叡森有限公司　統一編號：82906524 ／ &copy; {year} Lunio Taiwan
          </p>
        </div>
      </div>
    </footer>
  );
}
