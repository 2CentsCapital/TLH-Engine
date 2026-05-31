"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import { SCENARIOS } from "@/lib/answers-data";
import { JargonToggle } from "@/components/answers/JargonContext";
import { useProfile } from "@/components/profile/ProfileContext";

const C = {
  navy: "#00111B", green: "#05A049", greenBg: "#EDFAF3", border: "#E5E7EB", muted: "#6b7280", page: "#FFFFFC",
};

export default function AnswersHub() {
  const { profile } = useProfile();
  const [q, setQ] = useState("");
  const nonResident = profile.investorType !== "resident";

  const ask = q.trim()
    ? `/chat?ask=${encodeURIComponent(q.trim())}`
    : `/chat`;

  return (
    <div className="min-h-screen" style={{ background: C.page }}>
      {/* Hero */}
      <section style={{ background: C.navy }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-12">
          <div className="flex items-center justify-between gap-3 mb-6">
            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "rgba(5,160,73,0.2)", color: "#05A049" }}>
              Plain-English answers · FY 2025-26
            </span>
            <JargonToggle />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white"
            style={{ fontFamily: "var(--font-bricolage)" }}>
            Your money, abroad —<br />
            <span style={{ color: "#05A049" }}>explained without the jargon.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.55)" }}>
            Clear answers to what actually happens when you invest globally — what you'll pay, what you must file,
            and how GIFT City changes the maths. {nonResident ? "Tuned to your global / NRI profile." : "Tuned to your resident-Indian profile."}
          </p>

          {/* Ask box */}
          <form action={ask} className="mt-7 flex flex-col sm:flex-row gap-2 max-w-2xl">
            <div className="flex-1 flex items-center gap-2 rounded-xl px-4 py-3"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
              <Search className="h-4 w-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.5)" }} />
              <input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Ask anything — e.g. 'how is my Apple dividend taxed?'"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
              />
            </div>
            <button type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
              style={{ background: "#05A049" }}>
              <Sparkles className="h-4 w-4" /> Ask the AI
            </button>
          </form>
        </div>
      </section>

      {/* Scenario grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: C.green }}>The questions everyone asks</p>
        <h2 className="text-2xl font-extrabold mb-6" style={{ fontFamily: "var(--font-bricolage)", color: C.navy }}>
          Pick a situation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SCENARIOS.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.slug} href={`/answers/${s.slug}`}
                className="group rounded-2xl border p-5 flex flex-col transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "#fff", borderColor: C.border }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0"
                    style={{ background: `${s.accent}12` }}>
                    <Icon className="h-5 w-5" style={{ color: s.accent }} />
                  </div>
                  <span className="rounded-full px-2.5 py-1 text-sm font-extrabold flex-shrink-0"
                    style={{ background: `${s.accent}12`, color: s.accent }}>
                    {s.big.value}
                  </span>
                </div>
                <p className="text-base font-bold leading-snug mb-1.5" style={{ color: C.navy }}>{s.question}</p>
                <p className="text-[13px] leading-relaxed flex-1" style={{ color: C.muted }}>{s.verdictPlain}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                  style={{ color: s.accent }}>
                  See the full answer <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ background: C.greenBg, border: `1px solid ${C.green}33` }}>
          <div>
            <p className="font-bold" style={{ color: C.navy }}>Ready to act on the numbers?</p>
            <p className="text-sm" style={{ color: "#33514a" }}>Run your own figures in the calculators, or harvest losses in the TLH engine.</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link href="/calculators/net-returns" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white" style={{ background: C.green }}>
              Open calculators
            </Link>
            <Link href="/tlh" className="rounded-xl px-4 py-2.5 text-sm font-semibold" style={{ background: "#fff", color: C.navy, border: `1px solid ${C.border}` }}>
              TLH engine
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
