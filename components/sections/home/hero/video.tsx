"use client";

/**
 * HeroVideo — client-only wrapper for the background video.
 *
 * Why client?  We need onCanPlay to detect when the browser has buffered
 * enough to play without stuttering, then fade the video in smoothly.
 *
 * The <Hero> parent always renders bg-[#17284b] as the solid background,
 * so the page never shows a blank/white flash while the video loads.
 * The video simply crossfades in on top once it's ready.
 */

import { useState } from "react";

export function HeroVideo() {
  const [ready, setReady] = useState(false);

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      // Fade in only after the browser has buffered enough to play smoothly.
      // Until then the dark navy bg-[#17284b] on <section> is the placeholder.
      onCanPlay={() => setReady(true)}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <source src="/brand/hero.mp4" type="video/mp4" />
    </video>
  );
}
