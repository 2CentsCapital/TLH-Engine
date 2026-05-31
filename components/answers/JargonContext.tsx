"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface JargonCtx {
  expert: boolean;
  setExpert: (v: boolean) => void;
}
const Ctx = createContext<JargonCtx>({ expert: false, setExpert: () => {} });
const KEY = "valura_show_jargon";

export function JargonProvider({ children }: { children: React.ReactNode }) {
  const [expert, setExpertState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setExpertState(localStorage.getItem(KEY) === "1");
    } catch { /* ignore */ }
  }, []);

  const setExpert = (v: boolean) => {
    setExpertState(v);
    try { localStorage.setItem(KEY, v ? "1" : "0"); } catch { /* ignore */ }
  };

  return (
    <Ctx.Provider value={{ expert: mounted ? expert : false, setExpert }}>
      {children}
    </Ctx.Provider>
  );
}

export function useJargon() {
  return useContext(Ctx);
}

/** Renders the plain-English version by default; the technical version when "Show tax terms" is on. */
export function Plain({ p, e }: { p: React.ReactNode; e: React.ReactNode }) {
  const { expert } = useJargon();
  return <>{expert ? e : p}</>;
}

/** The global toggle. */
export function JargonToggle({ className = "" }: { className?: string }) {
  const { expert, setExpert } = useJargon();
  return (
    <button
      onClick={() => setExpert(!expert)}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${className}`}
      style={expert
        ? { background: "#00111B", color: "#fff", borderColor: "#00111B" }
        : { background: "#fff", color: "#374151", borderColor: "#E5E7EB" }}
      aria-pressed={expert}
    >
      <span>🤓</span>
      {expert ? "Tax terms: ON" : "Show tax terms"}
    </button>
  );
}
