"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/site.config";
import { LayoutDashboard, ShoppingBag, User, LogOut, Menu, X } from "lucide-react";

const FONT = "'MiSansTC','Noto Sans TC',sans-serif";
const BLUE = "#17569E";
const NAVY = "#17284b";

export type MeUser = {
  id: number; name: string; email: string;
  firstName: string; lastName: string;
  wcCustomerId: number | null;
  billing: Record<string, string> | null;
  shipping: Record<string, string> | null;
  avatarUrl: string | null;
};

export const AccountContext = createContext<{ user: MeUser | null; loading: boolean }>({
  user: null, loading: true,
});

export function useAccount() { return useContext(AccountContext); }

const NAV = [
  { href: "/account",         label: "總覽",    Icon: LayoutDashboard },
  { href: "/account/orders",  label: "訂單記錄", Icon: ShoppingBag },
  { href: "/account/profile", label: "帳號資料", Icon: User },
];

function Sidebar({ user, onLogout, onClose }: { user: MeUser | null; onLogout: () => void; onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col h-full" style={{ fontFamily: FONT }}>
      {/* User info */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
            style={{ backgroundColor: BLUE, fontSize: 15 }}
          >
            {user ? (user.firstName?.[0] ?? user.name?.[0] ?? "?").toUpperCase() : "…"}
          </div>
          <div className="min-w-0">
            <p className="font-semibold truncate" style={{ fontSize: 14, color: "#17284b" }}>
              {user ? `${user.lastName}${user.firstName}` || user.name : "載入中…"}
            </p>
            <p className="truncate" style={{ fontSize: 12, color: "#9ca3af" }}>{user?.email ?? ""}</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-colors"
              style={{
                backgroundColor: active ? "#EFF6FF" : "transparent",
                color: active ? BLUE : "#5F6062",
                fontWeight: active ? 600 : 400,
                fontSize: 14,
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors hover:bg-red-50"
          style={{ color: "#ef4444", fontSize: 14 }}
        >
          <LogOut size={16} />
          登出
        </button>
      </div>
    </aside>
  );
}

// ── Inline login panel (shown when not authenticated) ─────────────────────────
function LoginPanel({ onSuccess: _ }: { onSuccess: () => void }) {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? "";
  // ใช้ production domain เสมอ เพราะ WordPress wp_safe_redirect จะ block localhost
  const returnUrl = `${siteConfig.site_domain}/account`;
  const wpLoginUrl = `${WP_URL}/my-account/?redirect_to=${encodeURIComponent(returnUrl)}`;
  const wpRegisterUrl = `${WP_URL}/my-account/?action=register`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-14" style={{ fontFamily: FONT }}>
      <div className="w-full max-w-[400px]">

        {/* Icon + title */}
        <div className="text-center mb-7">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#EFF6FF" }}>
            <User size={26} style={{ color: BLUE }} />
          </div>
          <h2 className="font-bold" style={{ fontSize: 22, color: NAVY }}>會員登入</h2>
          <p className="mt-1" style={{ fontSize: 13.5, color: "#9ca3af" }}>登入後查看訂單與帳號資料</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl px-7 py-7 shadow-sm space-y-4" style={{ border: "1px solid #f0f0f0" }}>

          {/* Primary — redirect to WP login (handles Turnstile) */}
          <a
            href={wpLoginUrl}
            className="flex items-center justify-center w-full py-4 rounded-2xl font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: BLUE, fontSize: 15 }}
          >
            前往登入頁面
          </a>

          {/* Info */}
          <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl" style={{ backgroundColor: "#F0F7FF", border: "1px solid #DBEAFE" }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>ℹ️</span>
            <p style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.65 }}>
              點擊後會跳轉至登入頁面，完成登入後將自動返回此頁面。
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span style={{ fontSize: 11.5, color: "#9ca3af" }}>還沒有帳號？</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <a
            href={wpRegisterUrl}
            className="flex items-center justify-center w-full py-3 rounded-xl border font-medium hover:bg-gray-50 transition-colors"
            style={{ fontSize: 14, color: "#374151", borderColor: "#e5e7eb" }}
          >
            立即免費註冊
          </a>
        </div>

      </div>
    </div>
  );
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<MeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  function refreshUser() {
    fetch("/api/auth/me")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { setUser(data); setLoading(false); })
      .catch(() => setLoading(false));
  }

  useEffect(() => { refreshUser(); }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  // Not logged in — show inline login panel
  if (!loading && !user) {
    return <LoginPanel onSuccess={refreshUser} />;
  }

  return (
    <AccountContext.Provider value={{ user, loading }}>
      <div className="min-h-screen" style={{ backgroundColor: "#f8fafc", fontFamily: FONT }}>

        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
          <p className="font-bold" style={{ fontSize: 16, color: "#17284b" }}>我的帳號</p>
          <button type="button" onClick={() => setMobileOpen(true)} style={{ color: "#17284b" }}>
            <Menu size={22} />
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <p className="font-bold" style={{ fontSize: 15, color: "#17284b" }}>我的帳號</p>
                <button type="button" onClick={() => setMobileOpen(false)}><X size={20} /></button>
              </div>
              <Sidebar user={user} onLogout={handleLogout} onClose={() => setMobileOpen(false)} />
            </div>
          </>
        )}

        {/* Desktop layout */}
        <div className="max-w-[1100px] w-[92%] mx-auto py-8 lg:py-12">
          <div className="flex gap-6 lg:gap-8">

            {/* Sidebar — desktop */}
            <div className="hidden lg:block w-56 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm sticky top-24" style={{ border: "1px solid #f0f0f0" }}>
                <Sidebar user={user} onLogout={handleLogout} />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {children}
            </div>

          </div>
        </div>
      </div>
    </AccountContext.Provider>
  );
}
