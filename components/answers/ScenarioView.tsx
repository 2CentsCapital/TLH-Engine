"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft, ArrowRight, ChevronDown, CheckCircle2, ExternalLink, Sparkles, X,
} from "lucide-react";
import { Plain, JargonToggle, useJargon } from "@/components/answers/JargonContext";
import { useProfile } from "@/components/profile/ProfileContext";
import { getScenario, type Scenario } from "@/lib/answers-data";

const C = {
  navy: "#00111B", green: "#05A049", greenBg: "#EDFAF3", greenBorder: "#B4E3C8",
  red: "#DC2626", redBg: "#FEF2F2", border: "#E5E7EB", muted: "#6b7280", page: "#FFFFFC",
};

export default function ScenarioView({ slug }: { slug: string }) {
  const { profile } = useProfile();
  const s = getScenario(slug);
  const nonResident = profile.investorType !== "resident";
  if (!s) return null;
  const askUrl = `/chat?ask=${encodeURIComponent(s.aiSeed)}`;

  return (
    <div className="min-h-screen" style={{ background: C.page }}>
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b backdrop-blur"
        style={{ background: "rgba(255,255,252,0.85)", borderColor: C.border }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link href="/answers" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: C.muted }}>
            <ArrowLeft className="h-4 w-4" /> All answers
          </Link>
          <JargonToggle />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-7 animate-fade-in">
        {/* Question + verdict */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: s.accent }}>{s.category}</span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-bricolage)", color: C.navy }}>
            {s.question}
          </h1>
          <p className="mt-3 text-lg leading-relaxed" style={{ color: "#33414d" }}>
            <Plain p={s.verdictPlain} e={s.verdictExpert} />
          </p>
        </div>

        {/* The big number */}
        <div className="rounded-2xl p-6 flex items-center gap-5" style={{ background: C.navy }}>
          <p className="text-4xl sm:text-5xl font-extrabold flex-shrink-0"
            style={{ fontFamily: "var(--font-bricolage)", color: s.accent === "#05A049" ? "#05A049" : "#fff" }}>
            {s.big.value}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{s.big.caption}</p>
        </div>

        {/* Profile-aware lens */}
        {(s.forResident || s.forGlobal) && (
          <div className="rounded-xl border p-4" style={{ background: nonResident ? C.greenBg : "#F9FAFB", borderColor: nonResident ? C.greenBorder : C.border }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: C.green }}>
              {nonResident ? "For you — global / NRI investor" : "For you — resident Indian"}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#33414d" }}>
              {nonResident ? s.forGlobal ?? s.forResident : s.forResident ?? s.forGlobal}
            </p>
          </div>
        )}

        {/* Waterfall */}
        {s.waterfall && <Waterfall data={s.waterfall} accent={s.accent} />}

        {/* Comparison */}
        {s.comparison && <Comparison data={s.comparison} />}

        {/* 3-way comparison */}
        {s.triComparison && <TriComparison data={s.triComparison} />}

        {/* What to do */}
        <div>
          <h2 className="text-base font-bold mb-3" style={{ color: C.navy }}>What to do</h2>
          <ol className="space-y-2.5">
            {s.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border p-3" style={{ background: "#fff", borderColor: C.border }}>
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: C.greenBg, color: C.green }}>{i + 1}</span>
                <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Show me why */}
        <WhySection why={s.why} citations={s.citations} />

        {/* AI CTA */}
        <Link href={askUrl}
          className="block rounded-2xl p-5 transition-all hover:opacity-95"
          style={{ background: "linear-gradient(135deg, #05A049, #028037)" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(255,255,255,0.2)" }}>
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Ask the AI advisor about your exact situation</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
                It knows your profile and runs the real tax calculations — not a generic chatbot.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-white flex-shrink-0" />
          </div>
        </Link>

        {/* Disclaimer */}
        <p className="text-[11px] leading-relaxed" style={{ color: C.muted }}>
          Illustrative only · Rules per Finance Act 2025 (FY 2025-26) · Figures are examples, not advice — confirm with a qualified CA / tax advisor before acting.
        </p>
      </div>
    </div>
  );
}

function Waterfall({ data, accent }: { data: NonNullable<Scenario["waterfall"]>; accent: string }) {
  return (
    <div className="rounded-2xl border p-5" style={{ background: "#fff", borderColor: C.border }}>
      <h2 className="text-base font-bold mb-1" style={{ color: C.navy }}>{data.title}</h2>
      <p className="text-[11px] mb-4" style={{ color: C.muted }}>{data.note}</p>
      <div className="space-y-2">
        {data.steps.map((st, i) => {
          const isResult = st.kind === "result";
          const isDeduct = st.kind === "deduct";
          return (
            <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2.5"
              style={{ background: isResult ? C.greenBg : isDeduct ? C.redBg : "#F9FAFB" }}>
              <span className="text-sm" style={{ color: "#374151" }}>{st.label}</span>
              <span className="text-sm font-bold tabular-nums"
                style={{ color: isResult ? C.green : isDeduct ? C.red : C.navy }}>{st.amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Comparison({ data }: { data: NonNullable<Scenario["comparison"]> }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: C.border, background: "#fff" }}>
      <div className="px-5 py-3 border-b" style={{ borderColor: C.border }}>
        <h2 className="text-base font-bold" style={{ color: C.navy }}>{data.title}</h2>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr] text-[11px] font-bold uppercase tracking-wider"
        style={{ background: "#F9FAFB", color: C.muted }}>
        <div className="px-4 py-2.5" />
        <div className="px-3 py-2.5 border-l text-center" style={{ borderColor: C.border }}>Direct</div>
        <div className="px-3 py-2.5 border-l text-center" style={{ borderColor: C.border, color: C.green }}>Via GIFT City</div>
      </div>
      {data.rows.map((r, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_1fr] border-t text-sm" style={{ borderColor: C.border }}>
          <div className="px-4 py-3 font-semibold" style={{ color: C.navy }}>{r.label}</div>
          <div className="px-3 py-3 border-l leading-snug" style={{ borderColor: C.border, color: r.directBad ? C.red : "#374151" }}>{r.direct}</div>
          <div className="px-3 py-3 border-l leading-snug" style={{ borderColor: C.border, background: C.greenBg, color: "#256" }}>{r.giftCity}</div>
        </div>
      ))}
    </div>
  );
}

function TriComparison({ data }: { data: NonNullable<Scenario["triComparison"]> }) {
  const cols = [
    { key: "direct" as const, label: "Direct stocks" },
    { key: "feeder" as const, label: "Feeder fund" },
    { key: "ucits" as const, label: "UCITS ETF" },
  ];
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: C.border, background: "#fff" }}>
      <div className="px-5 py-3 border-b" style={{ borderColor: C.border }}>
        <h2 className="text-base font-bold" style={{ color: C.navy }}>{data.title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse", minWidth: 520 }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              <th className="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider" style={{ color: C.muted }} />
              {cols.map((c) => (
                <th key={c.key} className="px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider border-l"
                  style={{ borderColor: C.border, color: c.key === "ucits" ? C.green : C.navy }}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r, i) => (
              <tr key={i} className="border-t" style={{ borderColor: C.border }}>
                <td className="px-4 py-3 font-semibold" style={{ color: C.navy }}>{r.label}</td>
                {cols.map((c) => {
                  const isBest = r.best === c.key;
                  return (
                    <td key={c.key} className="px-3 py-3 border-l leading-snug text-center align-top"
                      style={{ borderColor: C.border, background: isBest ? C.greenBg : "transparent", color: isBest ? "#256" : "#374151", fontWeight: isBest ? 600 : 400 }}>
                      {r[c.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t flex items-center gap-1.5 text-[11px]" style={{ borderColor: C.border, color: C.muted }}>
        <span className="h-2.5 w-2.5 rounded-sm inline-block" style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}` }} />
        Green = the lowest-cost / lowest-risk option for that row.
      </div>
    </div>
  );
}

function WhySection({ why, citations }: { why: Scenario["why"]; citations: Scenario["citations"] }) {
  const [open, setOpen] = useState(false);
  const { setExpert } = useJargon();
  return (
    <div className="rounded-2xl border" style={{ borderColor: C.border, background: "#fff" }}>
      <button onClick={() => { setOpen(!open); if (!open) setExpert(true); }}
        className="w-full flex items-center justify-between px-5 py-4 text-left">
        <span className="text-base font-bold" style={{ color: C.navy }}>Show me why →</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: C.muted }} />
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3 animate-fade-in">
          {why.map((b, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: "#F9FAFB" }}>
              <p className="text-sm font-semibold" style={{ color: C.navy }}>{b.p}</p>
              <p className="mt-1 text-[13px] leading-relaxed" style={{ color: C.muted }}>{b.e}</p>
            </div>
          ))}
          <div className="pt-1">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: C.muted }}>Sources</p>
            <div className="flex flex-col gap-1.5">
              {citations.map((c, i) => (
                <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium hover:underline" style={{ color: C.green }}>
                  <ExternalLink className="h-3.5 w-3.5" /> {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
