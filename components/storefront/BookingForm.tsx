"use client";

import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const STORES  = ["台北門市", "桃園門市", "新竹新生活門市", "台中門市", "台南旗艦店", "高雄旗艦店"];
const TIMES   = ["上午11點", "中午12點", "下午1點", "下午2點", "下午3點", "下午4點", "下午5點", "下午6點", "下午7點"];
const PERIODS = ["0-30分", "30-60分"];

const ORANGE = "#F5A000";
const BLUE   = "#17569E";
const SITE_KEY = "0x4AAAAAAAi_-Alimyco0tgf";

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const toWpDate = (iso: string) => iso.replace(/-/g, "/"); // YYYY-MM-DD → YYYY/MM/DD

export function BookingForm() {
  const [form, setForm]         = useState({ name: "", phone: "", email: "", store: "", date: "", time: "", period: "" });
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [tsToken, setTsToken]   = useState("");
  const tsRef   = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>("");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  /* ── Load Cloudflare Turnstile ─────────────────────────────── */
  const renderTurnstile = useCallback(() => {
    if (!tsRef.current || !window.turnstile) return;
    if (widgetId.current) window.turnstile?.remove(widgetId.current);
    widgetId.current = window.turnstile.render(tsRef.current, {
      sitekey: SITE_KEY,
      theme: "light",
      language: "auto",
      callback: (token: string) => setTsToken(token),
      "expired-callback": () => setTsToken(""),
      "error-callback": () => setTsToken(""),
    });
  }, []);

  useEffect(() => {
    if (document.querySelector('script[src*="turnstile"]')) {
      if (window.turnstile) renderTurnstile();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = renderTurnstile;
    document.head.appendChild(script);
  }, [renderTurnstile]);

  /* ── Submit ────────────────────────────────────────────────── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tsToken) {
      setErrors({ general: "請先完成驗證" });
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("/api/storefront/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: toWpDate(form.date), turnstileToken: tsToken }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
      } else {
        setErrors(data.errors ?? { general: "送出失敗，請稍後再試" });
        window.turnstile?.reset(widgetId.current);
        setTsToken("");
      }
    } catch {
      setErrors({ general: "網路錯誤，請稍後再試" });
    } finally {
      setLoading(false);
    }
  }

  const inputCls   = "w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors";
  const inputStyle = { borderColor: "#ddd", color: "#333", backgroundColor: "#fff" };

  if (submitted) return (
    <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "#f8faff", border: "1px solid #e5eaf5" }}>
      <div style={{ fontSize: 48 }}>✅</div>
      <p className="font-bold mt-3" style={{ color: "#16a34a", fontSize: 20 }}>預約成功！</p>
      <p className="mt-2" style={{ color: "#555", fontSize: 14 }}>我們的門市人員將於48小時內與您確認預約。</p>
    </div>
  );

  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: "#f8faff", border: "1px solid #e5eaf5" }}>
      <h2 className="text-center font-semibold mb-6" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", color: "#333" }}>
        一分鐘快速預約 門市試躺
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "#555" }}>
            姓名 <span style={{ color: "red" }}>*</span>
          </label>
          <input className={inputCls} style={inputStyle} maxLength={20}
            value={form.name} onChange={(e) => set("name", e.target.value)} required />
          <p style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>
            Limit is 20 characters. Characters remaining: {20 - form.name.length}.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "#555" }}>
            手機 <span style={{ color: "red" }}>*</span>
          </label>
          <input className={inputCls} style={inputStyle} type="tel" placeholder="0912345678"
            value={form.phone} onChange={(e) => set("phone", e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "#555" }}>
            電子郵件 <span style={{ color: "red" }}>*</span>
          </label>
          <input className={inputCls} style={inputStyle} type="email" placeholder="123@gmail.com"
            value={form.email} onChange={(e) => set("email", e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "#555" }}>
            預約門市 <span style={{ color: "red" }}>*</span>
          </label>
          <select className={inputCls} style={inputStyle}
            value={form.store} onChange={(e) => set("store", e.target.value)} required>
            <option value="">選擇門市</option>
            {STORES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "#555" }}>
            預約日期 <span style={{ color: "red" }}>*</span>
          </label>
          <input className={inputCls} style={inputStyle} type="date"
            min={tomorrow()}
            value={form.date} onChange={(e) => { set("date", e.target.value); set("time", ""); }} required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#555" }}>
              預約時間 <span style={{ color: "red" }}>*</span>
            </label>
            <select className={inputCls} style={{ ...inputStyle, opacity: form.date ? 1 : 0.5 }}
              value={form.time} onChange={(e) => set("time", e.target.value)}
              disabled={!form.date} required>
              <option value="">{form.date ? "選擇時間" : "請先選擇日期"}</option>
              {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "#555" }}>
              時段 <span style={{ color: "red" }}>*</span>
            </label>
            <select className={inputCls} style={inputStyle}
              value={form.period} onChange={(e) => set("period", e.target.value)} required>
              <option value="">選擇時段</option>
              {PERIODS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Cloudflare Turnstile */}
        <div ref={tsRef} />

        {errors.general && (
          <p className="text-sm" style={{ color: "#dc2626" }}>{errors.general}</p>
        )}

        <button type="submit" disabled={loading || !tsToken}
          className="w-full py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: ORANGE, fontSize: 16 }}>
          {loading ? "送出中..." : "送出預約"}
        </button>

      </form>
    </div>
  );
}
