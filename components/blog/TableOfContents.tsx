"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Heading { level: number; id: string; text: string; num: string; }

function buildNumbered(headings: { level: number; id: string; text: string }[]): Heading[] {
  const counters: number[] = [0, 0, 0];
  return headings.map((h) => {
    const idx = h.level - 2; // h2=0, h3=1, h4=2
    counters[idx]++;
    for (let i = idx + 1; i < 3; i++) counters[i] = 0;
    const num = counters.slice(0, idx + 1).join(".");
    return { ...h, num };
  });
}

export function TableOfContents({ headings }: { headings: { level: number; id: string; text: string }[] }) {
  const [open, setOpen] = useState(true);
  const numbered = buildNumbered(headings);
  if (!headings.length) return null;

  return (
    <div className="rounded-2xl overflow-hidden mb-8" style={{ border: "1px solid #e5eaf5" }}>
      <button type="button" onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 font-semibold transition-colors hover:bg-gray-50"
        style={{ fontSize: 15, color: "#17284b", backgroundColor: "#f8faff" }}>
        文章目錄
        <ChevronDown size={16} style={{ color: "#9ca3af", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </button>
      {open && (
        <div className="px-5 py-4" style={{ backgroundColor: "#fff" }}>
          <ol className="space-y-1.5">
            {numbered.map((h) => (
              <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 16}px` }}>
                <a href={`#${h.id}`}
                  className="text-sm hover:underline transition-colors"
                  style={{ color: "#555", lineHeight: 1.6 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}>
                  <span className="font-medium mr-2" style={{ color: "#9ca3af" }}>{h.num}.</span>
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
