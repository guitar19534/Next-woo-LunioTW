"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

interface Notification { name: string; product: string; slug: string; img: string; price?: string; ago: string; }

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
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pp-wrap {
          position: fixed; bottom: 20px; left: 16px; z-index: 50;
          width: min(320px, calc(100vw - 32px));
          border-radius: 20px;
          background: #17284b;
          box-shadow: 0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.18);
          overflow: hidden;
          animation: pp-in 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
          font-family: 'MiSansTC','Noto Sans TC',sans-serif;
          letter-spacing: 1px;
        }
      `}</style>

      <div className="pp-wrap">
        <div style={{ padding: "14px 16px 14px 14px", display: "flex", alignItems: "center", gap: 12 }}>

          {/* Image */}
          <div style={{
            width: 68, height: 68, borderRadius: 14, overflow: "hidden",
            flexShrink: 0, backgroundColor: "#223660",
          }}>
            <Image src={n.img} alt={n.product} width={68} height={68}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} unoptimized />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 5, lineHeight: 1.4 }}>
              {n.name} 已購買
            </p>
            <Link href={`/product/${n.slug}`} style={{ textDecoration: "none" }}>
              <p style={{
                fontSize: 14, fontWeight: 700, color: "#fff",
                lineHeight: 1.45, marginBottom: 6,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as const,
                overflow: "hidden",
              }}>{n.product}</p>
            </Link>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
              {n.ago}
            </p>
          </div>

          {/* Close */}
          <button type="button" onClick={() => setDismissed(true)} aria-label="關閉"
            style={{
              flexShrink: 0, alignSelf: "flex-start",
              width: 24, height: 24, borderRadius: "50%",
              border: "none", cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.12)",
            }}>
            <X size={12} color="rgba(255,255,255,0.7)" />
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, backgroundColor: "rgba(255,255,255,0.08)" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "rgba(255,255,255,0.3)",
            transition: "width 0.08s linear",
          }} />
        </div>
      </div>
    </>
  );
}
