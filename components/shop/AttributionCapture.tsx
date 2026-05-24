"use client";

import { useEffect } from "react";

const SESSION_KEY = "wc_attribution";

const SEARCH_ENGINES = ["google", "bing", "yahoo", "naver", "baidu", "duckduckgo", "yandex"];

function getSourceType(utmSource: string, referrer: string): string {
  if (utmSource) return "utm";
  if (!referrer) return "typein";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (SEARCH_ENGINES.some((se) => host.includes(se))) return "organic";
  } catch {}
  return "referral";
}

export function AttributionCapture() {
  useEffect(() => {
    // Don't overwrite — attribution is for the first entry in the session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source") ?? "";
    const referrer  = document.referrer;

    const data = {
      source_type:    getSourceType(utmSource, referrer),
      referrer:       referrer,
      utm_source:     utmSource,
      utm_medium:     params.get("utm_medium")   ?? "",
      utm_campaign:   params.get("utm_campaign") ?? "",
      utm_content:    params.get("utm_content")  ?? "",
      utm_id:         params.get("utm_id")        ?? "",
      utm_term:       params.get("utm_term")      ?? "",
      session_entry:  window.location.href,
      session_start_time: new Date().toISOString(),
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }, []);

  return null;
}
