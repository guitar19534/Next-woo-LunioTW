"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Plus, Minus, Loader2, Tag, X,
  CheckCircle, AlertCircle, Gift, ShoppingBag,
  ChevronDown, Lock, Eye, EyeOff,
} from "lucide-react";

import { useCart } from "@/components/shop/cart-provider";
import { formatPrice } from "@/lib/woocommerce";

const FONT = "'MiSansTC','Noto Sans TC',sans-serif";
const NAVY = "#17284b";
const BLUE = "#17569E";

// ─── Sub-components ────────────────────────────────────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block mb-1.5 font-medium" style={{ fontSize: 13.5, color: "#6b7280" }}>
      {children}{required && <span className="ml-0.5" style={{ color: "#e53e3e" }}> *</span>}
    </label>
  );
}

function TextInput({
  name, value, onChange, placeholder, type = "text", required, disabled,
  suffix,
}: {
  name: string; value: string; onChange: (n: string, v: string) => void;
  placeholder?: string; type?: string; required?: boolean; disabled?: boolean;
  suffix?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-3 rounded-xl outline-none transition-colors disabled:cursor-not-allowed"
        style={{
          border: "1.5px solid #e2e8f0",
          fontSize: 14,
          color: disabled ? "#9ca3af" : NAVY,
          fontFamily: FONT,
          backgroundColor: disabled ? "#f9fafb" : "#fff",
          paddingRight: suffix ? "3rem" : undefined,
        }}
        onFocus={(e) => { if (!disabled) e.currentTarget.style.borderColor = BLUE; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; }}
      />
      {suffix && <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>}
    </div>
  );
}

function Accordion({
  title, children, open, onToggle,
}: {
  title: string; children: React.ReactNode; open: boolean; onToggle: () => void;
}) {
  return (
    <div style={{ borderBottom: "1px solid #e5e7eb" }}>
      <button type="button" onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
        <span className="font-medium" style={{ fontSize: 14, color: NAVY }}>{title}</span>
        <div className="flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 flex-shrink-0"
          style={{ backgroundColor: open ? NAVY : "transparent", border: `1.5px solid ${open ? NAVY : "#d1d5db"}` }}>
          {open ? <Minus size={11} style={{ color: "#fff" }} /> : <Plus size={11} style={{ color: "#9ca3af" }} />}
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-1.5" style={{ fontSize: 13.5, color: "#4b5563", lineHeight: 1.8 }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────

interface PaymentSubOption {
  key: string;
  label: string;
  defaultValue: string;
  options: Array<{ value: string; label: string }>;
}
interface PaymentMethod {
  id: string;
  title: string;
  description: string;
  subOptions: PaymentSubOption[];
}

const INVOICE_TYPES = [
  { value: "carrier", label: "手機條碼載具" },
  { value: "personal", label: "個人電子發票 (Email寄送)" },
  { value: "business", label: "營業用發票 (Email寄送)" },
];

const SERVICE_ITEMS = [
  { value: "recycle", label: "舊床回收（800/床現金給司機）" },
  { value: "ground", label: "舊床到一樓（免費）" },
  { value: "storage", label: "需要寄倉（備註配送月份）" },
];

// ─── Main ──────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, nonce, isLoading, clearCart, applyCoupon, removeCoupon } = useCart();

  // ── Form state ──
  const [f, setF] = useState({
    lastName: "", firstName: "",
    postcode: "", city: "", district: "",
    address1: "", address2: "",
    phone: "", email: "", password: "",
    notes: "",
    invoiceType: "carrier",
    invoiceCarrier: "", invoiceEmail: "", invoiceTaxId: "", invoiceCompany: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [diffShipping, setDiffShipping] = useState(false);
  const [ship, setShip] = useState({
    lastName: "", firstName: "",
    postcode: "", city: "", district: "", address1: "", address2: "",
  });

  // ── Payment ──
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("");
  // subSelections: { [paymentMethodId]: { [fieldKey]: selectedValue } }
  const [subSelections, setSubSelections] = useState<Record<string, Record<string, string>>>({});
  const [serviceItem, setServiceItem] = useState("");

  // ── Info accordions (only one open at a time) ──
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  function toggleAccordion(i: number) {
    setOpenAccordion(v => v === i ? null : i);
  }

  // ── Submit ──
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Login banner ──
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginShowPwd, setLoginShowPwd] = useState(false);
  const [loginRemember, setLoginRemember] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginMsg, setLoginMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // ── Coupon banner ──
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const cc = cart.totals.currencyCode;
  const hasDiscount = parseFloat(cart.totals.discount) > 0;

  // Fetch payment methods
  useEffect(() => {
    fetch("/api/checkout/payment-methods")
      .then(r => r.json())
      .then((data: PaymentMethod[]) => {
        if (Array.isArray(data) && data.length) {
          setPaymentMethods(data);
          setSelectedPayment(data[0].id);
          // Init sub-option defaults for all methods
          const defaults: Record<string, Record<string, string>> = {};
          data.forEach((pm) => {
            if (pm.subOptions?.length) {
              defaults[pm.id] = {};
              pm.subOptions.forEach((s) => {
                defaults[pm.id][s.key] = s.defaultValue || s.options[0]?.value || "";
              });
            }
          });
          setSubSelections(defaults);
        }
      })
      .catch(() => {})
      .finally(() => setPaymentMethodsLoading(false));
  }, []);

  function set(name: string, value: string) {
    setF(p => ({ ...p, [name]: value }));
  }
  function setShipField(name: string, value: string) {
    setShip(p => ({ ...p, [name]: value }));
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginMsg(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword, rememberme: loginRemember }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "login_failed");
      setLoginMsg({ type: "success", text: "登入成功！正在重新整理…" });
      setTimeout(() => window.location.reload(), 800);
    } catch (e: unknown) {
      // If server-side login fails (e.g. Cloudflare Turnstile blocks wp-login.php),
      // offer redirect to WP My Account login page as fallback
      setLoginMsg({ type: "error", text: e instanceof Error ? e.message : "登入失敗，請稍後再試" });
    } finally {
      setLoginLoading(false);
    }
  }

  const wpLoginUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""}/my-account?redirect_to=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "/checkout")}`;

  async function handleApplyCoupon() {
    const code = couponInput.trim();
    if (!code) return;
    setCouponLoading(true);
    setCouponMsg(null);
    try {
      await applyCoupon(code);
      setCouponInput("");
      setCouponMsg({ type: "success", text: `優惠券「${code.toUpperCase()}」已套用！` });
    } catch (e: unknown) {
      setCouponMsg({ type: "error", text: e instanceof Error ? e.message : "優惠券無效或已過期" });
    } finally {
      setCouponLoading(false);
    }
  }

  // Build full address string for notes
  function buildNotes() {
    const parts: string[] = [];
    if (f.notes) parts.push(f.notes);
    if (serviceItem) {
      const s = SERVICE_ITEMS.find(s => s.value === serviceItem);
      if (s) parts.push(`服務項目：${s.label}`);
    }
    if (f.invoiceType === "carrier" && f.invoiceCarrier)
      parts.push(`發票條碼：${f.invoiceCarrier}`);
    if (f.invoiceType === "personal" && f.invoiceEmail)
      parts.push(`個人發票Email：${f.invoiceEmail}`);
    if (f.invoiceType === "business")
      parts.push(`統編：${f.invoiceTaxId}｜公司：${f.invoiceCompany}`);
    return parts.join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Only block if methods loaded but none selected
    if (paymentMethods.length > 0 && !selectedPayment) { setError("請選擇付款方式"); return; }
    setIsSubmitting(true);
    setError(null);
    try {
      const billing = {
        first_name: f.firstName, last_name: f.lastName,
        address_1: f.address1, address_2: f.address2,
        city: f.city, state: f.district, postcode: f.postcode,
        country: "TW", email: f.email, phone: f.phone,
      };
      const shipping = diffShipping ? {
        first_name: ship.firstName, last_name: ship.lastName,
        address_1: ship.address1, address_2: ship.address2,
        city: ship.city, state: ship.district, postcode: ship.postcode,
        country: "TW", phone: f.phone,
      } : billing;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-wc-nonce": nonce },
        body: JSON.stringify({
          billing_address: billing,
          shipping_address: shipping,
          payment_method: selectedPayment || undefined,
          payment_data: selectedPayment && subSelections[selectedPayment]
            ? Object.entries(subSelections[selectedPayment]).map(([key, value]) => ({ key, value }))
            : [],
          customer_note: buildNotes(),
          create_account: !!f.password,
          account_password: f.password || undefined,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "下單失敗，請稍後再試");
      }
      const { order } = await res.json();
      if (typeof window !== "undefined")
        sessionStorage.setItem("pending_order_id", order.id.toString());

      if (order.payment_url) {
        // Use replace so React has time to flush before unload (avoids removeChild dev error)
        window.location.replace(order.payment_url);
      } else {
        // Free / COD order — clear cart then go to success
        try { await clearCart(); } catch { /* ignore */ }
        router.push(`/checkout/success?order=${order.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "發生錯誤，請稍後再試");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsSubmitting(false); // re-enable button on error
    } finally {
      // Note: don't setIsSubmitting(false) on success — page is navigating away
    }
  }

  // ── Loading / empty ──
  if (isLoading) return (
    <div className="min-h-[60vh] flex items-center justify-center" style={{ fontFamily: FONT }}>
      <div className="w-9 h-9 rounded-full border-2 animate-spin" style={{ borderColor: BLUE, borderTopColor: "transparent" }} />
    </div>
  );

  if (cart.items.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-6" style={{ fontFamily: FONT }}>
      <ShoppingBag size={48} style={{ color: BLUE, opacity: 0.3 }} />
      <div className="text-center">
        <h1 className="font-bold text-xl mb-1" style={{ color: NAVY }}>購物車是空的</h1>
        <p style={{ color: "#9ca3af", fontSize: 14 }}>請先加入商品再結帳</p>
      </div>
      <Link href="/shop" className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold"
        style={{ backgroundColor: BLUE, fontSize: 14 }}>
        <ArrowLeft size={14} /> 去逛逛
      </Link>
    </div>
  );

  // ── Invoice conditional field ──
  const invoiceExtra = f.invoiceType === "carrier" ? (
    <TextInput name="invoiceCarrier" value={f.invoiceCarrier} onChange={set} placeholder="請輸入手機條碼（/XXXXXXX）" />
  ) : f.invoiceType === "personal" ? (
    <TextInput name="invoiceEmail" value={f.invoiceEmail} onChange={set} placeholder="收取發票的 Email" type="email" />
  ) : (
    <div className="space-y-2.5">
      <TextInput name="invoiceTaxId" value={f.invoiceTaxId} onChange={set} placeholder="統一編號" />
      <TextInput name="invoiceCompany" value={f.invoiceCompany} onChange={set} placeholder="公司名稱" />
    </div>
  );

  return (
    <div className="min-h-screen py-8 md:py-12 lg:py-16" style={{ backgroundColor: "#fafafa", fontFamily: FONT }}>
      <div className="max-w-[1200px] w-[94%] md:w-[92%] mx-auto">

        {/* Title */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/cart" className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors">
              <ArrowLeft size={16} style={{ color: NAVY }} />
            </Link>
            <h1 className="font-bold" style={{ fontSize: "clamp(20px, 3vw, 28px)", color: NAVY }}>購物結帳</h1>
          </div>
          <p className="ml-11" style={{ fontSize: 14, color: "#6b7280" }}>結帳前請先了解以下重要資訊</p>
        </div>

        {/* Info Accordions */}
        <div className="rounded-2xl bg-white overflow-hidden mb-4"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0" }}>
          <Accordion title="1、備註欄填寫配送方式" open={openAccordion === 0} onToggle={() => toggleAccordion(0)}>
            <p className="mb-4">我們提供以下 2 種配送方式，請於「訂單備註」填寫</p>

            {/* 選項一 */}
            <p className="font-semibold mb-1" style={{ color: BLUE }}>選項一｜新竹物流（送至一樓）</p>
            <p className="mb-2">約 4 個工作天收到</p>
            <div className="px-4 py-2.5 rounded-lg mb-3 italic" style={{ backgroundColor: "#f5f5f5", borderLeft: "3px solid #d1d5db", fontSize: 13 }}>
              訂單備註填寫：新竹物流
            </div>
            <p className="mb-1.5">⚠️ 以下尺寸不適用此選項：</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Helix獨立筒床墊</li>
              <li>Quantum Max獨立筒床墊的【標準雙人／雙人加大／雙人特大】尺寸</li>
            </ul>

            {/* 選項二 */}
            <p className="font-semibold mb-1" style={{ color: BLUE }}>選項二｜搬家公司（搬上樓＋安裝定位）</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>約 14 個工作天收到，搬家公司會提前來電確認時間</li>
              <li>宜花東及離島地區不適用此選項</li>
            </ul>
            <div className="px-4 py-2.5 rounded-lg mb-2 italic" style={{ backgroundColor: "#f5f5f5", borderLeft: "3px solid #d1d5db", fontSize: 13 }}>
              訂單備註填寫：搬家公司：有無電梯／幾樓
            </div>
            <p className="mb-4">✅ 新床搬上樓 免樓層費</p>

            {/* 處理舊床 */}
            <p className="font-semibold mb-1" style={{ color: BLUE }}>處理舊床</p>
            <p className="mb-1">此選項可協助處理舊床，若有需求請在備註說明。</p>
            <p className="mb-1">舊床處理費用如下：</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>協助搬至一樓 → 免費</li>
              <li>舊床回收 → $800 /床</li>
              <li>搬至樓上→ （每層）$200 起 /床（依搬家公司標準）</li>
            </ul>

            {/* 選項三 */}
            <p className="font-semibold mb-1" style={{ color: BLUE }}>選項三｜偏遠地區</p>
            <p className="mb-4">費用依物流標準計算，下單後將有專人與您聯繫說明費用</p>

            <hr className="mb-4" style={{ borderColor: "#e5e7eb" }} />
            <p>⚡ 急件需求？請在備註加註「急件」，我們會優先處理！</p>
          </Accordion>

          <Accordion title="2、確認是否有《床墊寄倉》需求" open={openAccordion === 1} onToggle={() => toggleAccordion(1)}>
            <p>如有床墊寄倉需求，請於訂單備註「寄倉及寄達年月」，並於需出貨「前半個月」主動與我們Line客服聯繫。</p>
          </Accordion>

          <Accordion title="3、床墊保養注意事項" open={openAccordion === 2} onToggle={() => toggleAccordion(2)}>
            <ol className="list-decimal pl-5 space-y-2.5">
              <li>床墊表布及內部結構，皆採用科技機能設計，不可水洗！纖維細緻有起毛球屬正常現象，建議可搭配保潔墊及床包使用。</li>
              <li>手工床墊尺寸會有正負5公分的誤差，因為材料層具有一定的自然彈性拉伸跟收縮，請以實際收到的床墊長寬高為主。</li>
              <li>壓縮床墊建議於收到貨後「二個月內開箱」，約「半至一個月」會回彈到床墊最佳狀態。</li>
            </ol>
          </Accordion>
        </div>

        <p className="mb-5" style={{ fontSize: 13.5, color: "#6b7280" }}>
          如果任何問題，您可參考更多{" "}
          <Link href="/faq" className="hover:underline" style={{ color: BLUE }}>產品及購物須知</Link>。
        </p>

        {/* Login Banner */}
        <div className="rounded-2xl mb-3 overflow-hidden"
          style={{ border: `1.5px solid ${loginOpen ? BLUE : "#dbeafe"}`, backgroundColor: "#eff6ff" }}>
          <div className="flex items-center gap-3 px-5 py-3.5 cursor-pointer"
            onClick={() => !loginOpen && setLoginOpen(true)}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#dbeafe" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" aria-hidden>
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>
              </svg>
            </div>
            <p style={{ fontSize: 14, color: "#374151" }}>
              已經有帳號了嗎？{" "}
              <span className="font-bold" style={{ color: BLUE }}>點擊做登入</span>
            </p>
            <ChevronDown size={16} style={{ color: BLUE, marginLeft: "auto",
              transform: loginOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
          </div>
          {loginOpen && (
            <form onSubmit={handleLogin} className="px-5 pb-5 pt-2 space-y-4"
              style={{ borderTop: "1px solid #dbeafe" }}>
              {/* Description */}
              <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.6 }}>
                如果你曾向我們購買商品，請在下方輸入你的詳細資料。如果您是新的顧客，請前往「帳單」區段。
              </p>

              {/* Username + Password — 2 col */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <FieldLabel required>使用者名稱或電子郵件</FieldLabel>
                  <TextInput name="loginUsername" value={loginUsername}
                    onChange={(_, v) => setLoginUsername(v)} required />
                </div>
                <div>
                  <FieldLabel required>密碼</FieldLabel>
                  <TextInput
                    name="loginPassword"
                    value={loginPassword}
                    onChange={(_, v) => setLoginPassword(v)}
                    type={loginShowPwd ? "text" : "password"}
                    required
                    suffix={
                      <button type="button" onClick={() => setLoginShowPwd(v => !v)}
                        className="p-1 hover:opacity-70 transition-opacity">
                        {loginShowPwd
                          ? <EyeOff size={15} style={{ color: "#9ca3af" }} />
                          : <Eye size={15} style={{ color: "#9ca3af" }} />}
                      </button>
                    }
                  />
                </div>
              </div>

              {/* Feedback */}
              {loginMsg && (
                <div>
                  <div className="flex items-start gap-2 px-3 py-2 rounded-xl"
                    style={{ backgroundColor: loginMsg.type === "success" ? "#f0fdf4" : "#fef2f2" }}>
                    {loginMsg.type === "success"
                      ? <CheckCircle size={12} style={{ color: "#16a34a", flexShrink: 0, marginTop: 2 }} />
                      : <AlertCircle size={12} style={{ color: "#ef4444", flexShrink: 0, marginTop: 2 }} />}
                    <div>
                      <span style={{ fontSize: 12, color: loginMsg.type === "success" ? "#16a34a" : "#ef4444" }}>
                        {loginMsg.text}
                      </span>
                      {loginMsg.type === "error" && (
                        <p className="mt-1" style={{ fontSize: 12, color: "#6b7280" }}>
                          或{" "}
                          <a href={wpLoginUrl}
                            className="underline hover:no-underline"
                            style={{ color: BLUE }}>
                            前往帳號頁面登入
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit row */}
              <div className="flex items-center gap-4 flex-wrap">
                <button type="submit" disabled={loginLoading}
                  className="px-6 py-2 rounded-lg font-medium text-white transition-opacity disabled:opacity-60 hover:opacity-90"
                  style={{ backgroundColor: "#6b7280", fontSize: 14 }}>
                  {loginLoading ? "登入中…" : "登入"}
                </button>

                {/* 保持登入 */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ border: `1.5px solid ${loginRemember ? BLUE : "#d1d5db"}`, backgroundColor: loginRemember ? BLUE : "#fff" }}
                    onClick={() => setLoginRemember(v => !v)}
                  >
                    {loginRemember && (
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" checked={loginRemember} onChange={e => setLoginRemember(e.target.checked)} className="sr-only" />
                  <span style={{ fontSize: 13.5, color: "#374151" }}>保持登入</span>
                </label>
              </div>

              {/* 忘記密碼 */}
              <Link
                href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""}/wp-login.php?action=lostpassword`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13.5, color: "#6b7280" }}
                className="hover:underline block"
              >
                忘記密碼？
              </Link>
            </form>
          )}
        </div>

        {/* Coupon Banner */}
        <div className="rounded-2xl mb-6 md:mb-8 overflow-hidden"
          style={{ border: `1.5px solid ${couponOpen ? BLUE : "#dbeafe"}`, backgroundColor: "#eff6ff" }}>
          <div className="flex items-center gap-3 px-5 py-3.5 cursor-pointer"
            onClick={() => !couponOpen && setCouponOpen(true)}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#dbeafe" }}>
              <Tag size={14} style={{ color: BLUE }} />
            </div>
            <p style={{ fontSize: 14, color: "#374151" }}>
              有折扣碼？{" "}
              <span className="font-bold" style={{ color: BLUE }}>按此輸入您的折價碼</span>
            </p>
            <ChevronDown size={16} style={{ color: BLUE, marginLeft: "auto",
              transform: couponOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
          </div>
          {couponOpen && (
            <div className="px-5 pb-4 pt-1 space-y-2.5">
              {cart.coupons.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {cart.coupons.map((c) => (
                    <div key={c.code} className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                      style={{ backgroundColor: "#dcfce7", border: "1px solid #bbf7d0" }}>
                      <span className="font-bold uppercase" style={{ fontSize: 12, color: "#16a34a" }}>{c.code}</span>
                      <span style={{ fontSize: 12, color: "#16a34a" }}>-{formatPrice(c.discount, cc)}</span>
                      <button type="button" onClick={() => removeCoupon(c.code)}>
                        <X size={11} style={{ color: "#16a34a" }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input type="text" value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  placeholder="請輸入優惠碼"
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl outline-none"
                  style={{ border: "1.5px solid #bfdbfe", fontSize: 13, color: NAVY, fontFamily: FONT, backgroundColor: "#fff" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = BLUE)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#bfdbfe")} />
                <button type="button" onClick={handleApplyCoupon} disabled={couponLoading || !couponInput.trim()}
                  className="flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-white disabled:opacity-50"
                  style={{ backgroundColor: BLUE, fontSize: 13 }}>
                  {couponLoading ? "…" : "套用"}
                </button>
              </div>
              {couponMsg && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ backgroundColor: couponMsg.type === "success" ? "#f0fdf4" : "#fef2f2" }}>
                  {couponMsg.type === "success"
                    ? <CheckCircle size={12} style={{ color: "#16a34a" }} />
                    : <AlertCircle size={12} style={{ color: "#ef4444" }} />}
                  <span style={{ fontSize: 12, color: couponMsg.type === "success" ? "#16a34a" : "#ef4444" }}>
                    {couponMsg.text}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 px-4 py-3 rounded-2xl mb-5"
            style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
            <AlertCircle size={16} style={{ color: "#ef4444", flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 14, color: "#dc2626" }}>{error}</p>
          </div>
        )}

        {/* 2-column form */}
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-[1fr_380px] gap-5 lg:gap-7 items-start">

            {/* ── Left: Billing Form ── */}
            <div className="space-y-5">

              {/* 訂購人資料 */}
              <div className="rounded-2xl bg-white overflow-hidden"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <div className="px-5 md:px-7 py-5" style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <h2 className="font-bold" style={{ fontSize: 17, color: NAVY }}>訂購人資料</h2>
                </div>

                <div className="px-5 md:px-7 py-5 space-y-4">
                  {/* 姓氏 + 名字 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <FieldLabel required>姓氏</FieldLabel>
                      <TextInput name="lastName" value={f.lastName} onChange={set} placeholder="王" required />
                    </div>
                    <div>
                      <FieldLabel required>名字</FieldLabel>
                      <TextInput name="firstName" value={f.firstName} onChange={set} placeholder="小明" required />
                    </div>
                  </div>

                  {/* 國家 */}
                  <div>
                    <FieldLabel required>國家 / 地區或區域</FieldLabel>
                    <div className="px-4 py-3 rounded-xl" style={{ border: "1.5px solid #e2e8f0", backgroundColor: "#f9fafb" }}>
                      <span style={{ fontSize: 14, color: NAVY, fontWeight: 500 }}>台灣</span>
                    </div>
                  </div>

                  {/* 郵遞區號 */}
                  <div>
                    <FieldLabel required>郵遞區號</FieldLabel>
                    <TextInput name="postcode" value={f.postcode} onChange={set} placeholder="100" required />
                  </div>

                  {/* 縣/市 */}
                  <div>
                    <FieldLabel required>縣 / 市</FieldLabel>
                    <TextInput name="city" value={f.city} onChange={set} placeholder="台北市" required />
                  </div>

                  {/* 鄉鎮市 */}
                  <div>
                    <FieldLabel required>鄉鎮市</FieldLabel>
                    <TextInput name="district" value={f.district} onChange={set} placeholder="中正區" required />
                  </div>

                  {/* 街道地址 */}
                  <div>
                    <FieldLabel required>街道地址</FieldLabel>
                    <div className="space-y-2">
                      <TextInput name="address1" value={f.address1} onChange={set}
                        placeholder="門牌號碼與街道名稱" required />
                      <TextInput name="address2" value={f.address2} onChange={set}
                        placeholder="公寓、套房、單元等（選填）" />
                    </div>
                  </div>

                  {/* 聯絡電話 */}
                  <div>
                    <FieldLabel required>聯絡電話</FieldLabel>
                    <TextInput name="phone" value={f.phone} onChange={set}
                      placeholder="聯絡電話" type="tel" required />
                  </div>

                  {/* Email */}
                  <div>
                    <FieldLabel required>電子信箱 Email</FieldLabel>
                    <TextInput name="email" value={f.email} onChange={set}
                      placeholder="abc@gmail.com.tw" type="email" required />
                  </div>

                  {/* 建立帳號密碼 */}
                  <div>
                    <FieldLabel>建立帳號密碼</FieldLabel>
                    <TextInput
                      name="password"
                      value={f.password}
                      onChange={set}
                      placeholder="密碼"
                      type={showPassword ? "text" : "password"}
                      suffix={
                        <button type="button" onClick={() => setShowPassword(v => !v)}
                          className="p-1 hover:opacity-70 transition-opacity">
                          {showPassword
                            ? <EyeOff size={16} style={{ color: "#9ca3af" }} />
                            : <Eye size={16} style={{ color: "#9ca3af" }} />}
                        </button>
                      }
                    />
                  </div>
                </div>
              </div>

              {/* 運送到不同地址 */}
              <div className="rounded-2xl bg-white px-5 md:px-7 py-5"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ border: `2px solid ${diffShipping ? BLUE : "#d1d5db"}`, backgroundColor: diffShipping ? BLUE : "#fff" }}
                    onClick={() => setDiffShipping(v => !v)}
                  >
                    {diffShipping && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" checked={diffShipping} onChange={e => setDiffShipping(e.target.checked)} className="sr-only" />
                  <span className="font-bold" style={{ fontSize: 15, color: NAVY }}>要運送到不同地址嗎？</span>
                </label>

                {diffShipping && (
                  <div className="mt-5 space-y-4 pt-5" style={{ borderTop: "1px solid #f3f4f6" }}>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <FieldLabel required>姓氏</FieldLabel>
                        <TextInput name="lastName" value={ship.lastName} onChange={setShipField} placeholder="王" required />
                      </div>
                      <div>
                        <FieldLabel required>名字</FieldLabel>
                        <TextInput name="firstName" value={ship.firstName} onChange={setShipField} placeholder="小美" required />
                      </div>
                    </div>
                    <div>
                      <FieldLabel required>國家 / 地區或區域</FieldLabel>
                      <div className="px-4 py-3 rounded-xl" style={{ border: "1.5px solid #e2e8f0", backgroundColor: "#f9fafb" }}>
                        <span style={{ fontSize: 14, color: NAVY, fontWeight: 500 }}>台灣</span>
                      </div>
                    </div>
                    <div>
                      <FieldLabel required>郵遞區號</FieldLabel>
                      <TextInput name="postcode" value={ship.postcode} onChange={setShipField} placeholder="100" required />
                    </div>
                    <div>
                      <FieldLabel required>縣 / 市</FieldLabel>
                      <TextInput name="city" value={ship.city} onChange={setShipField} placeholder="台北市" required />
                    </div>
                    <div>
                      <FieldLabel required>鄉鎮市</FieldLabel>
                      <TextInput name="district" value={ship.district} onChange={setShipField} placeholder="中正區" required />
                    </div>
                    <div>
                      <FieldLabel required>街道地址</FieldLabel>
                      <div className="space-y-2">
                        <TextInput name="address1" value={ship.address1} onChange={setShipField}
                          placeholder="門牌號碼與街道名稱" required />
                        <TextInput name="address2" value={ship.address2} onChange={setShipField}
                          placeholder="公寓、套房、單元等（選填）" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 訂單備註 */}
              <div className="rounded-2xl bg-white px-5 md:px-7 py-5"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <FieldLabel>訂單備註（選填）</FieldLabel>
                <textarea
                  name="notes"
                  value={f.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3}
                  placeholder="填寫配送方式，是否要處理舊床／寄倉／急件，或其他需求"
                  className="w-full px-4 py-3 rounded-xl outline-none resize-y"
                  style={{ border: "1.5px solid #e2e8f0", fontSize: 14, color: NAVY, fontFamily: FONT, minHeight: 90 }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = BLUE)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                />
              </div>

              {/* 發票資訊 */}
              <div className="rounded-2xl bg-white px-5 md:px-7 py-5"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <h3 className="font-bold mb-4" style={{ fontSize: 16, color: NAVY }}>發票資訊</h3>

                <div className="space-y-3">
                  <div>
                    <FieldLabel required>電子發票索取方式</FieldLabel>
                    <div className="relative">
                      <select
                        value={f.invoiceType}
                        onChange={(e) => set("invoiceType", e.target.value)}
                        className="w-full appearance-none px-4 py-3 rounded-xl outline-none cursor-pointer"
                        style={{ border: "1.5px solid #e2e8f0", fontSize: 14, color: NAVY, fontFamily: FONT, backgroundColor: "#fff" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = BLUE)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                      >
                        {INVOICE_TYPES.map(t => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} style={{ color: "#9ca3af", position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                    </div>
                  </div>
                  {invoiceExtra}
                </div>
              </div>

            </div>

            {/* ── Right: Summary + Payment ── */}
            <div className="lg:sticky lg:top-24 self-start space-y-4">

              {/* Order summary */}
              <div className="rounded-2xl bg-white overflow-hidden"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                {/* Header */}
                <div className="grid grid-cols-[1fr_auto] px-5 py-3" style={{ backgroundColor: NAVY }}>
                  <span className="font-semibold text-white text-sm">商品</span>
                  <span className="font-semibold text-white text-sm">小計</span>
                </div>

                {/* Items */}
                {cart.items.map((item) => {
                  const isFree = parseFloat(item.price) === 0;
                  return (
                    <div key={item.key} className="grid grid-cols-[1fr_auto] gap-3 px-5 py-3"
                      style={{ borderBottom: "1px solid #f9fafb", backgroundColor: isFree ? "#f9fef9" : undefined }}>
                      <div className="flex items-start gap-2.5 min-w-0">
                        {item.image && (
                          <div className="relative flex-shrink-0 rounded-lg overflow-hidden"
                            style={{ width: 40, height: 40, backgroundColor: "#f5f5f5" }}>
                            <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="40px" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium leading-snug line-clamp-2" style={{ fontSize: 12.5, color: NAVY }}>
                            {item.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            {(item.attributes ?? []).length > 0 && (
                              <span style={{ fontSize: 11, color: "#9ca3af" }}>
                                {(item.attributes ?? []).map(a => a.value).join(" · ")}
                              </span>
                            )}
                            <span style={{ fontSize: 11, color: "#9ca3af" }}>× {item.quantity}</span>
                            {isFree && (
                              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-white font-bold"
                                style={{ fontSize: 9, backgroundColor: "#16a34a" }}>
                                <Gift size={8} /> Free
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {isFree
                          ? <span style={{ fontSize: 12.5, color: "#16a34a", fontWeight: 600 }}>NT$0</span>
                          : <span style={{ fontSize: 12.5, color: NAVY, fontWeight: 600 }}>
                              {formatPrice(item.lineTotal, cc)}
                            </span>
                        }
                      </div>
                    </div>
                  );
                })}

                {/* Totals */}
                <div className="px-5 py-3 space-y-2" style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <div className="flex justify-between" style={{ fontSize: 13 }}>
                    <span style={{ color: "#6b7280" }}>小計</span>
                    <span style={{ color: NAVY }}>{formatPrice(cart.totals.subtotal, cc)}</span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: 13 }}>
                    <span style={{ color: "#6b7280" }}>運費</span>
                    <span style={{ color: parseFloat(cart.totals.shipping) === 0 ? "#16a34a" : NAVY }}>
                      {parseFloat(cart.totals.shipping) === 0 ? "免費" : formatPrice(cart.totals.shipping, cc)}
                    </span>
                  </div>
                  {hasDiscount && (
                    <div className="flex justify-between" style={{ fontSize: 13 }}>
                      <span style={{ color: "#16a34a" }}>折扣</span>
                      <span style={{ color: "#16a34a" }}>-{formatPrice(cart.totals.discount, cc)}</span>
                    </div>
                  )}
                  {cart.coupons.map(c => (
                    <div key={c.code} className="flex justify-between" style={{ fontSize: 12 }}>
                      <span style={{ color: "#16a34a" }}><Tag size={11} className="inline mr-0.5" />{c.code.toUpperCase()}</span>
                      <span style={{ color: "#16a34a" }}>-{formatPrice(c.discount, cc)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-baseline px-5 py-4">
                  <span className="font-bold" style={{ fontSize: 15, color: NAVY }}>總計</span>
                  <span className="font-bold" style={{ fontSize: 22, color: NAVY }}>
                    {formatPrice(cart.totals.total, cc)}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              {(paymentMethodsLoading || paymentMethods.length > 0) && (
                <div className="rounded-2xl bg-white px-5 py-4 space-y-1"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  {paymentMethodsLoading ? (
                    <div className="flex items-center gap-2 py-2">
                      <div className="w-4 h-4 rounded-full border-2 animate-spin flex-shrink-0"
                        style={{ borderColor: BLUE, borderTopColor: "transparent" }} />
                      <span style={{ fontSize: 13, color: "#9ca3af" }}>載入付款方式…</span>
                    </div>
                  ) : paymentMethods.map((pm) => (
                    <label key={pm.id}
                      className="block cursor-pointer rounded-xl transition-colors"
                      style={{ padding: "10px 12px", backgroundColor: selectedPayment === pm.id ? "#f0f5ff" : "transparent" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ border: `2px solid ${selectedPayment === pm.id ? BLUE : "#d1d5db"}` }}>
                          {selectedPayment === pm.id && (
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BLUE }} />
                          )}
                        </div>
                        <input type="radio" name="payment" value={pm.id} checked={selectedPayment === pm.id}
                          onChange={() => setSelectedPayment(pm.id)} className="sr-only" />
                        <span style={{ fontSize: 13.5, color: NAVY, fontWeight: selectedPayment === pm.id ? 600 : 400 }}>
                          {pm.title}
                        </span>
                      </div>
                      {selectedPayment === pm.id && (
                        <div className="ml-7 mt-2 space-y-2.5">
                          {pm.description && (
                            <p
                              className="leading-relaxed"
                              style={{ fontSize: 12, color: "#6b7280" }}
                              dangerouslySetInnerHTML={{ __html: pm.description }}
                            />
                          )}
                          {pm.subOptions?.map((sub) => (
                            <div key={sub.key}>
                              {sub.label && (
                                <p className="mb-1.5" style={{ fontSize: 12, color: "#6b7280" }}
                                  dangerouslySetInnerHTML={{ __html: sub.label }} />
                              )}
                              <div className="relative">
                                <select
                                  value={subSelections[pm.id]?.[sub.key] ?? sub.defaultValue}
                                  onChange={(e) =>
                                    setSubSelections((prev) => ({
                                      ...prev,
                                      [pm.id]: { ...(prev[pm.id] ?? {}), [sub.key]: e.target.value },
                                    }))
                                  }
                                  className="w-full appearance-none px-3 py-2 rounded-xl outline-none cursor-pointer"
                                  style={{
                                    border: "1.5px solid #e2e8f0",
                                    fontSize: 13,
                                    color: NAVY,
                                    fontFamily: FONT,
                                    backgroundColor: "#fff",
                                    maxWidth: 240,
                                  }}
                                >
                                  {sub.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                  ))}
                                </select>
                                <ChevronDown size={13} style={{
                                  color: "#9ca3af", position: "absolute", right: 10, top: "50%",
                                  transform: "translateY(-50%)", pointerEvents: "none",
                                }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              )}

              {/* 服務項目 */}
              <div className="rounded-2xl bg-white px-5 py-4"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                <h3 className="font-bold mb-3" style={{ fontSize: 14, color: NAVY }}>服務項目（請選擇一項）</h3>
                <div className="space-y-2 mb-3">
                  {SERVICE_ITEMS.map((s) => (
                    <label key={s.value} className="flex items-center gap-2.5 cursor-pointer">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ border: `2px solid ${serviceItem === s.value ? BLUE : "#d1d5db"}` }}>
                        {serviceItem === s.value && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BLUE }} />
                        )}
                      </div>
                      <input type="radio" name="service" value={s.value}
                        checked={serviceItem === s.value}
                        onChange={() => setServiceItem(v => v === s.value ? "" : s.value)}
                        className="sr-only" />
                      <span style={{ fontSize: 13, color: "#374151" }}>{s.label}</span>
                    </label>
                  ))}
                </div>
                <p className="font-semibold leading-relaxed" style={{ fontSize: 12.5, color: "#dc2626" }}>
                  ！！請留意 配送時段無法指定 司機會於配送前一天約配
                </p>
              </div>

              {/* Submit — desktop */}
              <div className="hidden lg:block space-y-2">
                <SubmitBtn isSubmitting={isSubmitting} />
                <TrustNote />
              </div>
            </div>

          </div>

          {/* ── Mobile submit — AFTER payment methods & service items ── */}
          <div className="lg:hidden mt-4 space-y-2">
            <SubmitBtn isSubmitting={isSubmitting} />
            <TrustNote />
          </div>
        </form>
      </div>
    </div>
  );
}

function SubmitBtn({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button type="submit" disabled={isSubmitting}
      className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-60"
      style={{ backgroundColor: BLUE, fontSize: 15 }}>
      {isSubmitting ? <><Loader2 size={17} className="animate-spin" /> 處理中…</> : "下單購買"}
    </button>
  );
}

function TrustNote() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <Lock size={10} style={{ color: "#9ca3af" }} />
      <span style={{ fontSize: 11, color: "#9ca3af" }}>SSL 安全加密 · 資料受到保護</span>
    </div>
  );
}
