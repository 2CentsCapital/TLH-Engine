"use client";

/**
 * White-label partner branding.
 * One registry drives the co-branded partner suite, showcase, report and Excel.
 * Switch the active partner (or upload a custom logo+colour) and everything reskins.
 */
import { useEffect, useState } from "react";

export interface Partner {
  id: string;
  name: string;
  color: string;       // brand primary (hex)
  colorDark: string;   // gradient end
  italic?: boolean;    // wordmark style
  logo?: string;       // optional image (data URL or /public path) — overrides the wordmark
}

export const VALURA = { name: "Valura", color: "#05A049", dark: "#028037" };

export const PARTNERS: Partner[] = [
  { id: "voguestock", name: "Voguestock", color: "#E0822E", colorDark: "#C26A1E", italic: true },
  { id: "fundsindia", name: "FundsIndia", color: "#2D7FF0", colorDark: "#1D4ED8", italic: false },
];

const KEY = "valura_partner";
const CUSTOM_KEY = "valura_partner_custom";
const listeners = new Set<() => void>();

export function getActivePartner(): Partner {
  if (typeof window === "undefined") return PARTNERS[0];
  try {
    const id = localStorage.getItem(KEY) || PARTNERS[0].id;
    if (id === "custom") {
      const raw = localStorage.getItem(CUSTOM_KEY);
      if (raw) return JSON.parse(raw) as Partner;
    }
    return PARTNERS.find((p) => p.id === id) || PARTNERS[0];
  } catch {
    return PARTNERS[0];
  }
}

export function setActivePartner(id: string) {
  try { localStorage.setItem(KEY, id); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

export function setCustomPartner(p: { name: string; color: string; logo?: string }) {
  const custom: Partner = {
    id: "custom", name: p.name || "Your Brand", color: p.color || "#2D7FF0",
    colorDark: p.color || "#1D4ED8", logo: p.logo, italic: false,
  };
  try {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom));
    localStorage.setItem(KEY, "custom");
  } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

/** Reactive hook — re-renders when the active partner changes. */
export function usePartner(): Partner {
  const [p, setP] = useState<Partner>(PARTNERS[0]);
  useEffect(() => {
    const update = () => setP(getActivePartner());
    update();
    listeners.add(update);
    const onStorage = (e: StorageEvent) => { if (e.key === KEY || e.key === CUSTOM_KEY) update(); };
    window.addEventListener("storage", onStorage);
    return () => { listeners.delete(update); window.removeEventListener("storage", onStorage); };
  }, []);
  return p;
}

/* ── colour helpers ── */
export const soft = (hex: string) => hex + "14";        // ~8% tint  (#RRGGBBAA)
export const border = (hex: string) => hex + "55";       // ~33% tint
export const hexToArgb = (hex: string) => "FF" + hex.replace("#", "").toUpperCase().padStart(6, "0").slice(0, 6);
