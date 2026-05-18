"use client";

const BLUE = "#3c7ae4";

export function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        display: "inline-block", padding: "14px 40px", borderRadius: 40,
        background: BLUE, color: "#fff", fontSize: 16, fontWeight: 700,
        border: "none", cursor: "pointer", letterSpacing: "0.08em",
        fontFamily: "inherit",
        boxShadow: "0 4px 20px rgba(60,122,228,0.4)",
      }}>
      登記享特別優惠
    </button>
  );
}
