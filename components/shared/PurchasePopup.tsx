"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Notification { name: string; product: string; img: string; price?: string; ago: string; }

const SHOW_DELAY  = 8_000;
const SHOW_FOR    = 9_000;
const CYCLE_EVERY = 52_000;

export function PurchasePopup() {
  const [items, setItems]         = useState<Notification[]>([]);
  const [index, setIndex]         = useState(0);
  const [visible, setVisible]     = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [progress, setProgress]   = useState(100);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/recent-purchases")
      .then((r) => r.json())
      .then((d: Notification[]) => { if (d.length) setItems(d); })
      .catch(() => {});
  }, []);

  const startProgress = useCallback(() => {
    setProgress(100);
    if (timerRef.current) clearInterval(timerRef.current);
    const step = 100 / (SHOW_FOR / 80);
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) { clearInterval(timerRef.current!); return 0; }
        return p - step;
      });
    }, 80);
  }, []);

  const show = useCallback(() => {
    if (dismissed || !items.length) return;
    setIndex((i) => (i + 1) % items.length);
    setVisible(true);
    startProgress();
    setTimeout(() => setVisible(false), SHOW_FOR);
  }, [dismissed, items.length, startProgress]);

  useEffect(() => {
    if (!items.length) return;
    const t1 = setTimeout(show, SHOW_DELAY);
    const t2 = setInterval(show, CYCLE_EVERY);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, [show, items.length]);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  if (!visible || dismissed || !items.length) return null;

  const n = items[index];

  return (
    <>
      <style>{`
        @keyframes pp-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="fixed bottom-6 left-5 z-50"
        style={{
          width: 336,
          borderRadius: 18,
          background: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(23,40,75,0.10), 0 20px 48px rgba(23,40,75,0.06)",
          border: "1px solid rgba(23,40,75,0.07)",
          overflow: "hidden",
          animation: "pp-in 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
          fontFamily: "'MiSansTC','Noto Sans TC',sans-serif",
          letterSpacing: "1px",
        }}
      >
        {/* Thin top accent */}
        <div style={{ height: 2, background: "linear-gradient(90deg, #17569E 0%, #4f93e0 100%)" }} />

        <div style={{ padding: "16px 18px 14px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>

            {/* Image */}
            <div style={{
              width: 60, height: 60, borderRadius: 12, overflow: "hidden",
              flexShrink: 0, backgroundColor: "#f5f7fb",
              border: "1px solid #eef2fb",
            }}>
              <Image src={n.img} alt={n.product} width={60} height={60}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} unoptimized />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Badge */}
              <span style={{
                display: "inline-block",
                fontSize: 10, fontWeight: 700,
                color: "#16a34a",
                letterSpacing: "0.06em",
                marginBottom: 6,
              }}>✓ 已購買</span>

              {/* Product */}
              <p style={{
                fontSize: 13, fontWeight: 700, lineHeight: 1.45,
                color: "#17284b", marginBottom: 4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as const,
                overflow: "hidden",
              }}>{n.product}</p>

              {/* Price */}
              {n.price && (
                <p style={{ fontSize: 13, fontWeight: 800, color: "#17569E", marginBottom: 5 }}>
                  {n.price}
                </p>
              )}

              {/* Meta */}
              <p style={{ fontSize: 11, color: "#b0bac8", letterSpacing: "0.01em" }}>
                {n.name}&ensp;·&ensp;{n.ago}
              </p>
            </div>

            {/* Close */}
            <button type="button" onClick={() => setDismissed(true)} aria-label="關閉"
              style={{
                flexShrink: 0, width: 22, height: 22,
                borderRadius: "50%", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: "#f3f5f9", marginTop: -2, padding: 0,
              }}>
              <X size={11} color="#9ca3af" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, backgroundColor: "#f3f5f9" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "linear-gradient(90deg, #17569E, #4f93e0)",
            transition: "width 0.08s linear",
          }} />
        </div>
      </div>
    </>
  );
}
