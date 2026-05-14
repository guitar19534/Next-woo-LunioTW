"use client";

import { useState, useEffect } from "react";

const VIDEOS = [
  "QK8aR_UpMbI",
  "bsPsBlmNZTE",
  "9U9RZaON-Yw",
  "3w1m3GciCec",
  "9whAAwOXrTI",
  "cMMYPiSEv4o",
];

export function YoutubeCarousel() {
  const [active, setActive] = useState(0);
  const [masking, setMasking] = useState(false);

  function changeTo(i: number) {
    setMasking(true);
    setTimeout(() => {
      setActive(i);
      setTimeout(() => setMasking(false), 600);
    }, 300);
  }

  const prev = () => changeTo(Math.max(0, active - 1));
  const next = () => changeTo(Math.min(VIDEOS.length - 1, active + 1));

  useEffect(() => {
    const id = setInterval(() => {
      changeTo((active + 1) % VIDEOS.length);
    }, 10000);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section className="relative w-full select-none overflow-hidden">

      {/* YouTube embed — taller container crops black bars top/bottom */}
      <div className="relative w-full overflow-hidden" style={{ paddingTop: "38%" }}>
        {VIDEOS.map((id, i) => (
          <iframe
            key={id}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=0&disablekb=1&playsinline=1&loop=1&playlist=${id}`}
            title={`Gen4 影片 ${i + 1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              border: "none",
              position: "absolute",
              top: "50%",
              left: "0",
              width: "100%",
              height: "200%",
              transform: "translateY(-50%)",
              opacity: i === active ? 1 : 0,
              transition: "opacity 0.8s ease",
              pointerEvents: "none",
            }}
          />
        ))}
        {/* Overlay blocks all mouse events to iframe — hides YouTube controls */}
        <div className="absolute inset-0" style={{ zIndex: 15, background: "transparent", cursor: "default" }} />
        {/* Transition mask — briefly covers YouTube UI during slide change */}
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{ zIndex: 16, backgroundColor: "#000", opacity: masking ? 1 : 0, pointerEvents: "none" }}
        />
      </div>

      {/* Left arrow */}
      {active > 0 && (
        <button
          type="button"
          onClick={prev}
          aria-label="上一個"
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
          style={{ zIndex: 20 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      )}

      {/* Right arrow */}
      {active < VIDEOS.length - 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="下一個"
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
          style={{ zIndex: 20 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M9 18l6-6-6-6" /></svg>
        </button>
      )}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2" style={{ zIndex: 20 }}>
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`影片 ${i + 1}`}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === active ? "20px" : "8px",
              height: "8px",
              backgroundColor: i === active ? "#fff" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>

    </section>
  );
}
