"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/site.config";

const BLUE = "#17569E";
const NAVY = "#17284b";
const FONT = "'MiSansTC','Noto Sans TC',sans-serif";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? "";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/account";

  // If already logged in, skip straight to destination
  useEffect(() => {
    fetch("/api/auth/me").then((r) => {
      if (r.ok) router.replace(redirectTo);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ใช้ production domain — WordPress wp_safe_redirect block localhost/external domains
  const wpLoginUrl = `${WP_URL}/my-account/?redirect_to=${encodeURIComponent(
    `${siteConfig.site_domain}${redirectTo}`
  )}`;

  const wpRegisterUrl = `${WP_URL}/my-account/?action=register`;
  const wpForgotUrl = `${WP_URL}/my-account/lost-password/`;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 py-12"
      style={{ backgroundColor: "#f8fafc", fontFamily: FONT }}
    >
      <div className="w-full max-w-[420px]">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/brand/logo.svg"
              alt="Lunio"
              width={100}
              height={36}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm px-8 py-8" style={{ border: "1px solid #f0f0f0" }}>

          <h1 className="font-bold mb-1" style={{ fontSize: 22, color: NAVY }}>會員登入</h1>
          <p className="mb-7" style={{ fontSize: 13.5, color: "#9ca3af" }}>
            登入後可查看訂單記錄與帳號資料
          </p>

          {/* Primary CTA — redirect to WordPress login (handles Cloudflare Turnstile) */}
          <a
            href={wpLoginUrl}
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: BLUE, fontSize: 15 }}
          >
            <ExternalLink size={17} />
            前往會員登入頁面
          </a>

          {/* Info note */}
          <div
            className="flex items-start gap-3 mt-5 px-4 py-3.5 rounded-xl"
            style={{ backgroundColor: "#F0F7FF", border: "1px solid #DBEAFE" }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>ℹ️</span>
            <p style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.65 }}>
              登入後將自動跳轉回此頁面。
              若您尚未有帳號，可在登入頁點選「<strong>立即註冊</strong>」建立帳號。
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span style={{ fontSize: 12, color: "#9ca3af" }}>其他選項</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Secondary links */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={wpRegisterUrl}
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl border font-medium hover:bg-gray-50 transition-colors"
              style={{ fontSize: 13.5, color: "#374151", borderColor: "#e5e7eb" }}
            >
              立即註冊
            </a>
            <a
              href={wpForgotUrl}
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl border font-medium hover:bg-gray-50 transition-colors"
              style={{ fontSize: 13.5, color: "#374151", borderColor: "#e5e7eb" }}
            >
              忘記密碼
            </a>
          </div>

        </div>

        {/* Back link */}
        <p className="text-center mt-6">
          <Link href="/" className="hover:opacity-70 transition-opacity" style={{ fontSize: 13, color: "#9ca3af" }}>
            ← 返回首頁
          </Link>
        </p>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: "#e5e7eb", borderTopColor: BLUE }} />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
