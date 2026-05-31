"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Check, AlertTriangle, Info, TrendingUp, Layers,
  Building2, Wallet, ChevronDown, FileText,
} from "lucide-react";
import {
  FEEDER_FUNDS, GIFT_FUNDS, TIER_INFO, FUNDS_AS_OF, NIFTY_TRI, ACWI_TRI_SI,
  type FeederFund, type GiftFund,
} from "@/lib/funds-data";

const C = {
  navy: "#00111B", green: "#05A049", greenBg: "#EDFAF3", greenBorder: "#B4E3C8",
  red: "#DC2626", redBg: "#FEF2F2", amber: "#B8913A", blue: "#2B4A8A",
  border: "#E5E7EB", muted: "#6b7280", page: "#FFFFFC",
};

type Tab = "feeder" | "gift";

export default function FundTrackerPage() {
  const [tab, setTab] = useState<Tab>("feeder");

  return (
    <div className="min-h-screen" style={{ background: C.page }}>
      {/* Hero */}
      <section style={{ background: C.navy }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-9 pb-10">
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(5,160,73,0.2)", color: "#05A049" }}>
            Global fund tracker · as of {FUNDS_AS_OF}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
            style={{ fontFamily: "var(--font-bricolage)" }}>
            Two ways to take your money global
          </h1>
          <p className="mt-3 text-base max-w-2xl" style={{ color: "rgba(255,255,255,0.55)" }}>
            Both routes send Indian money <span className="text-white font-semibold">outbound</span> into world markets —
            but they're taxed and priced very differently. Compare every live fund, with the costs nobody puts on the brochure.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-20 border-b" style={{ background: "rgba(255,255,252,0.9)", borderColor: C.border, backdropFilter: "blur(8px)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex gap-1">
          <TabButton active={tab === "feeder"} onClick={() => setTab("feeder")} icon={Layers}
            label="Domestic feeder funds" sub={`${FEEDER_FUNDS.length} funds`} />
          <TabButton active={tab === "gift"} onClick={() => setTab("gift")} icon={Building2}
            label="GIFT City funds" sub={`${GIFT_FUNDS.length} funds`} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-7">
        {tab === "feeder" ? <FeederSection /> : <GiftSection />}
        <TaxPanel />
        <Link href="/answers/direct-vs-feeder-vs-ucits"
          className="mt-6 flex items-center justify-between rounded-2xl p-5 transition-all hover:opacity-95"
          style={{ background: "linear-gradient(135deg,#05A049,#028037)" }}>
          <div>
            <p className="text-sm font-bold text-white">Direct stocks vs feeder fund vs UCITS — which is cheapest after tax?</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.85)" }}>The plain-English 3-way breakdown — cost, tax, and the estate-tax catch.</p>
          </div>
          <ArrowRight className="h-5 w-5 text-white flex-shrink-0" />
        </Link>
      </div>
    </div>
  );
}

/* ════════════════ FEEDER FUNDS ════════════════ */
function FeederSection() {
  const [openOnly, setOpenOnly] = useState(false);
  const [sort, setSort] = useState<"r1" | "r3" | "cost">("r3");

  const funds = useMemo(() => {
    let f = [...FEEDER_FUNDS];
    if (openOnly) f = f.filter((x) => x.lumpsumOpen);
    f.sort((a, b) => {
      if (sort === "cost") return totalCost(a) - totalCost(b);
      const key = sort === "r1" ? "r1" : "r3";
      return (b[key] ?? -999) - (a[key] ?? -999);
    });
    return f;
  }, [openOnly, sort]);

  return (
    <section>
      {/* Insight banner */}
      <InsightBanner
        icon={Wallet}
        title="The hidden double fee"
        body="A feeder fund charges its own fee AND pays the fee of the master fund it invests into. You pay both, every year — so the real cost is the sum of the two bars below, not just the headline number."
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm font-bold" style={{ color: C.navy }}>
          {funds.length} funds · each feeds a global master fund
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Toggle on={openOnly} onClick={() => setOpenOnly(!openOnly)} label="Lump-sum open only" />
          <SortSelect value={sort} onChange={setSort} options={[
            { v: "r3", l: "3-yr return" }, { v: "r1", l: "1-yr return" }, { v: "cost", l: "Lowest cost" },
          ]} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {funds.map((f) => <FeederCard key={f.name} f={f} />)}
      </div>

      <BenchmarkNote text={`Benchmark · Nifty TRI: 1y ${NIFTY_TRI.r1}% · 3y ${NIFTY_TRI.r3}% · 5y ${NIFTY_TRI.r5}% · 10y ${NIFTY_TRI.r10}%`} />
    </section>
  );
}

function totalCost(f: FeederFund) { return f.exp + (f.uexp ?? 0); }

function FeederCard({ f }: { f: FeederFund }) {
  const total = totalCost(f);
  const feederPct = (f.exp / Math.max(total, 0.01)) * 100;
  return (
    <div className="rounded-2xl border p-4" style={{ background: "#fff", borderColor: C.border }}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-bold leading-snug" style={{ color: C.navy }}>{f.name}</p>
          <p className="text-[11px] mt-1 flex items-center gap-1" style={{ color: C.muted }}>
            <ArrowUpRight className="h-3 w-3" style={{ color: C.green }} /> feeds <span className="font-medium" style={{ color: C.blue }}>{f.master}</span>
          </p>
        </div>
        <span className="rounded-full px-2 py-0.5 text-[10px] font-bold flex-shrink-0"
          style={{ background: "#F1F5F9", color: C.blue }}>{f.category}</span>
      </div>

      {/* Returns */}
      <div className="mt-3 grid grid-cols-4 gap-2">
        {([["1Y", f.r1], ["3Y", f.r3], ["5Y", f.r5], ["10Y", f.r10]] as const).map(([k, v]) => (
          <div key={k} className="rounded-lg px-2 py-1.5 text-center" style={{ background: "#F9FAFB" }}>
            <p className="text-[9px]" style={{ color: C.muted }}>{k}</p>
            <p className="text-xs font-bold" style={{ color: v == null ? C.muted : v >= 0 ? C.green : C.red }}>
              {v == null ? "—" : `${v}%`}
            </p>
          </div>
        ))}
      </div>

      {/* Cost bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span style={{ color: C.muted }}>Yearly cost you actually pay</span>
          <span className="font-bold" style={{ color: C.navy }}>
            {total.toFixed(2)}%{f.uexp == null ? "*" : ""}
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full overflow-hidden flex" style={{ background: "#EEF0F2" }}>
          <div className="h-full" style={{ width: `${feederPct}%`, background: C.green }} title={`Feeder ${f.exp}%`} />
          {f.uexp != null && <div className="h-full" style={{ width: `${100 - feederPct}%`, background: C.amber }} title={`Master ${f.uexp}%`} />}
        </div>
        <div className="flex items-center gap-3 mt-1 text-[10px]" style={{ color: C.muted }}>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: C.green }} /> Feeder {f.exp}%</span>
          {f.uexp != null
            ? <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: C.amber }} /> Master {f.uexp}%</span>
            : <span>*master fee bundled / not disclosed</span>}
        </div>
      </div>

      {/* Status + factsheets */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={f.lumpsumOpen ? { background: C.greenBg, color: "#047857" } : { background: C.redBg, color: C.red }}>
          {f.lumpsumOpen ? "Lump-sum open" : "SIP only"}
        </span>
        {f.sip && <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: "#F1F5F9", color: C.blue }}>SIP available</span>}
        <span className="flex-1" />
        {f.factsheet && <FactsheetLink href={f.factsheet} label="Factsheet" />}
        {f.masterFactsheet && <FactsheetLink href={f.masterFactsheet} label="Master factsheet" />}
      </div>
    </div>
  );
}

function FactsheetLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors hover:bg-[#F9FAFB]"
      style={{ borderColor: C.border, color: C.navy }}>
      <FileText className="h-3 w-3" style={{ color: C.green }} /> {label}
    </a>
  );
}

/* ════════════════ GIFT CITY FUNDS ════════════════ */
function GiftSection() {
  const tiers: GiftFund["tier"][] = ["Retail", "AIF", "PMS"];
  return (
    <section>
      <InsightBanner
        icon={Building2}
        title="GIFT City: same destination, different door"
        body="These funds route abroad through India's IFSC. Watch two things on every card: the minimum ticket (from $5,000 retail to $150,000 AIFs) and the 'tax on churn' note — and remember the GIFT City wrapper only removes US estate tax when the underlying isn't US-domiciled."
      />
      {tiers.map((tier) => {
        const funds = GIFT_FUNDS.filter((f) => f.tier === tier);
        if (!funds.length) return null;
        const info = TIER_INFO[tier];
        return (
          <div key={tier} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold" style={{ color: C.navy }}>{info.label}</h3>
              <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: C.greenBg, color: "#047857" }}>{info.ticket}</span>
            </div>
            <p className="text-[11px] mb-3" style={{ color: C.muted }}>{info.note}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {funds.map((f) => <GiftCard key={f.name} f={f} />)}
            </div>
          </div>
        );
      })}
      <BenchmarkNote text={`Benchmark · MSCI ACWI TRI since-inception reference: ${ACWI_TRI_SI}%`} />
    </section>
  );
}

function GiftCard({ f }: { f: GiftFund }) {
  return (
    <div className="rounded-2xl border p-4 flex flex-col" style={{ background: "#fff", borderColor: C.border }}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold leading-snug" style={{ color: C.navy }}>{f.name}</p>
        <span className="text-[10px] flex-shrink-0" style={{ color: C.muted }}>{f.inception}</span>
      </div>
      <p className="text-[11px] mt-1" style={{ color: C.muted }}>{f.strategy}</p>
      <p className="text-[11px] mt-1.5 rounded-lg px-2 py-1" style={{ background: "#F9FAFB", color: "#374151" }}>{f.allocation}</p>

      {/* Returns */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {([["3M", f.r3m], ["6M", f.r6m], ["Since inc.", f.si]] as const).map(([k, v]) => (
          <div key={k} className="rounded-lg px-2 py-1.5 text-center" style={{ background: "#F9FAFB" }}>
            <p className="text-[9px]" style={{ color: C.muted }}>{k}</p>
            <p className="text-xs font-bold" style={{ color: v == null ? C.muted : v >= 0 ? C.green : C.red }}>{v == null ? "—" : `${v}%`}</p>
          </div>
        ))}
      </div>

      {/* Pros / cons */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-start gap-1.5">
          <Check className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: C.green }} />
          <p className="text-[11px] leading-snug" style={{ color: "#256" }}>{f.pros}</p>
        </div>
        <div className="flex items-start gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: C.amber }} />
          <p className="text-[11px] leading-snug" style={{ color: "#7a5c14" }}>{f.cons}</p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════ TAX PANEL ════════════════ */
function TaxPanel() {
  const [open, setOpen] = useState(false);
  const rows = [
    { v: "Direct US / foreign stocks", lt: "12.5% after 24 months", st: "Your slab rate (≤24 months)", div: "Slab (25% US tax withheld, reclaim via FTC)" },
    { v: "US-domiciled ETFs", lt: "12.5% after 24 months", st: "Your slab rate", div: "Slab · US estate tax risk applies" },
    { v: "Ireland UCITS ETFs", lt: "12.5% after 24 months", st: "Your slab rate", div: "Accumulating = no payout · no US estate tax" },
    { v: "Indian feeder funds (these)", lt: "12.5% after 24 months", st: "Your slab rate", div: "Reinvested inside fund" },
    { v: "GIFT City (non-resident)", lt: "Exempt — Sec 10(4D)", st: "Exempt — Sec 10(4D)", div: "—" },
  ];
  return (
    <div className="mt-7 rounded-2xl border" style={{ borderColor: C.border, background: "#fff" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4">
        <span className="flex items-center gap-2 text-base font-bold" style={{ color: C.navy }}>
          <Info className="h-4 w-4" style={{ color: C.green }} /> How each of these is taxed (resident Indian, FY 2025-26)
        </span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: C.muted }} />
      </button>
      {open && (
        <div className="px-5 pb-5 animate-fade-in">
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: C.border }}>
            <table className="w-full text-xs" style={{ borderCollapse: "collapse", minWidth: 560 }}>
              <thead style={{ background: C.greenBg }}>
                <tr>
                  {["Vehicle", "Long-term tax", "Short-term tax", "Dividends"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: "#047857", borderBottom: `1px solid ${C.greenBorder}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.v} style={{ borderTop: `1px solid #EEF0F2` }}>
                    <td className="px-3 py-2.5 font-semibold" style={{ color: C.navy }}>{r.v}</td>
                    <td className="px-3 py-2.5" style={{ color: "#374151" }}>{r.lt}</td>
                    <td className="px-3 py-2.5" style={{ color: "#374151" }}>{r.st}</td>
                    <td className="px-3 py-2.5" style={{ color: "#374151" }}>{r.div}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px]" style={{ color: C.muted }}>
            "Long-term" = held more than 24 months. Foreign stocks &amp; ETFs use Section 112 (no ₹1.25L exemption, unlike Indian listed shares).
            Both gains also carry surcharge + 4% cess. Illustrative — confirm with a CA.
          </p>
        </div>
      )}
    </div>
  );
}

/* ════════════════ small bits ════════════════ */
function TabButton({ active, onClick, icon: Icon, label, sub }: {
  active: boolean; onClick: () => void; icon: typeof Layers; label: string; sub: string;
}) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 px-4 py-3 border-b-2 transition-all"
      style={active ? { borderColor: C.green, color: C.navy } : { borderColor: "transparent", color: C.muted }}>
      <Icon className="h-4 w-4" style={{ color: active ? C.green : C.muted }} />
      <span className="text-sm font-bold">{label}</span>
      <span className="text-[10px] rounded-full px-1.5 py-0.5" style={{ background: active ? C.greenBg : "#F1F5F9", color: active ? "#047857" : C.muted }}>{sub}</span>
    </button>
  );
}

function InsightBanner({ icon: Icon, title, body }: { icon: typeof Layers; title: string; body: string }) {
  return (
    <div className="rounded-2xl p-4 mb-5 flex items-start gap-3" style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}` }}>
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(5,160,73,0.15)" }}>
        <Icon className="h-4.5 w-4.5" style={{ color: C.green }} />
      </div>
      <div>
        <p className="text-sm font-bold" style={{ color: C.navy }}>{title}</p>
        <p className="text-[13px] leading-relaxed mt-0.5" style={{ color: "#33514a" }}>{body}</p>
      </div>
    </div>
  );
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
      style={on ? { background: C.navy, color: "#fff", borderColor: C.navy } : { background: "#fff", color: C.muted, borderColor: C.border }}>
      <span className="h-2 w-2 rounded-full" style={{ background: on ? C.green : C.border }} /> {label}
    </button>
  );
}

function SortSelect({ value, onChange, options }: { value: string; onChange: (v: any) => void; options: { v: string; l: string }[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="rounded-full border px-3 py-1.5 text-xs font-semibold outline-none"
      style={{ background: "#fff", color: C.navy, borderColor: C.border }}>
      {options.map((o) => <option key={o.v} value={o.v}>Sort: {o.l}</option>)}
    </select>
  );
}

function BenchmarkNote({ text }: { text: string }) {
  return (
    <p className="mt-4 flex items-center gap-1.5 text-[11px]" style={{ color: C.muted }}>
      <TrendingUp className="h-3.5 w-3.5" /> {text}
    </p>
  );
}
