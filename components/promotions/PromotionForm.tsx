"use client";
import { useState } from "react";

const BLUE = "#3c7ae4";
const NAVY = "#17284b";

export function PromotionForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", size: "", hasBought: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  }

  if (sent) return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 12 }}>感謝您的登記！</h3>
      <p style={{ color: "#666", fontSize: 15, lineHeight: 1.8 }}>
        我們的專人將在 24 小時內與您聯繫，<br />為您提供專屬優惠方案。
      </p>
    </div>
  );

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 8,
    border: "1.5px solid #e0e6f0", fontSize: 14, color: NAVY,
    outline: "none", background: "#fff", boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label style={{ fontSize: 13, fontWeight: 700, color: NAVY, display: "block", marginBottom: 6 }}>
          姓名 <span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <input required style={inputStyle} placeholder="您的姓名"
          value={form.name} onChange={e => set("name", e.target.value)} />
      </div>

      <div>
        <label style={{ fontSize: 13, fontWeight: 700, color: NAVY, display: "block", marginBottom: 6 }}>
          Email <span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <input required type="email" style={inputStyle} placeholder="email@address.com"
          value={form.email} onChange={e => set("email", e.target.value)} />
      </div>

      <div>
        <label style={{ fontSize: 13, fontWeight: 700, color: NAVY, display: "block", marginBottom: 6 }}>
          手機號碼 <span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <input required type="tel" style={inputStyle} placeholder="0912345678"
          value={form.phone} onChange={e => set("phone", e.target.value)} />
      </div>

      <div>
        <label style={{ fontSize: 13, fontWeight: 700, color: NAVY, display: "block", marginBottom: 6 }}>
          您需要的床墊尺寸 <span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <select required style={{ ...inputStyle, appearance: "none" as const, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
          value={form.size} onChange={e => set("size", e.target.value)}>
          <option value="">選擇需要的尺寸</option>
          <option value="single">單人 (3尺)</option>
          <option value="double">雙人 (5尺)</option>
          <option value="queen">雙人加大 (6尺)</option>
          <option value="king">特大雙人 (6.2尺)</option>
        </select>
      </div>

      <div>
        <label style={{ fontSize: 13, fontWeight: 700, color: NAVY, display: "block", marginBottom: 10 }}>
          您曾經購買過Lunio的床墊嗎？<span style={{ color: "#e53e3e" }}>*</span>
        </label>
        <div style={{ display: "flex", gap: 32 }}>
          {["有", "沒有"].map(v => (
            <label key={v} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: NAVY }}>
              <input type="radio" required name="hasBought" value={v}
                checked={form.hasBought === v}
                onChange={() => set("hasBought", v)}
                style={{ accentColor: BLUE, width: 16, height: 16 }} />
              {v}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" disabled={loading}
        style={{
          marginTop: 8, padding: "14px 0", borderRadius: 8, border: "none",
          background: loading ? "#ccc" : "#f59e0b", color: "#fff",
          fontSize: 16, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: "0.05em", fontFamily: "inherit",
        }}>
        {loading ? "送出中…" : "立即領取特別優惠 →"}
      </button>

      <p style={{ fontSize: 11, color: "#999", textAlign: "center" }}>
        提交即代表您同意我們的隱私政策，我們不會分享您的個人資訊。
      </p>
    </form>
  );
}
