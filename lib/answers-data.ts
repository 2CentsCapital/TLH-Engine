/**
 * Answer Engine content — plain-English "what happens if…" scenarios.
 * Every figure is grounded in FY 2025-26 (Finance Act 2025) rules and cited.
 * Numbers are illustrative and labelled as such; the real math lives in the calculators.
 */
import {
  Banknote, ShieldCheck, FileText, RefreshCw, Handshake, type LucideIcon,
} from "lucide-react";

export interface WaterfallStep { label: string; amount: string; kind: "start" | "deduct" | "result"; }
export interface ComparisonRow { label: string; direct: string; giftCity: string; directBad?: boolean; }
export interface WhyBullet { p: string; e: string; }
export interface Citation { label: string; url: string; }

export interface Scenario {
  slug: string;
  icon: LucideIcon;
  category: string;
  accent: string;
  question: string;
  verdictPlain: string;
  verdictExpert: string;
  big: { value: string; caption: string };
  forResident?: string;
  forGlobal?: string;
  waterfall?: { title: string; note: string; steps: WaterfallStep[] };
  comparison?: { title: string; rows: ComparisonRow[] };
  steps: string[];
  why: WhyBullet[];
  citations: Citation[];
  aiSeed: string;
}

export const SCENARIOS: Scenario[] = [
  /* ───────────────────────── 1. US STOCKS ───────────────────────── */
  {
    slug: "us-stocks",
    icon: Banknote,
    category: "Direct investing",
    accent: "#DC2626",
    question: "What happens if I buy US stocks directly?",
    verdictPlain:
      "Three taxes quietly chip away at your returns — and if something happens to you, the US can take up to 40% of your US holdings.",
    verdictExpert:
      "25% dividend WHT (DTAA Art. 10), Indian capital-gains tax under Sec 112, mandatory Schedule FA disclosure, and US estate-tax exposure on US-situs assets above $60k.",
    big: { value: "Up to 40%", caption: "US estate tax your heirs could owe on US stocks above a $60,000 cushion" },
    waterfall: {
      title: "Every ₹100 of US dividend — what reaches you",
      note: "Illustrative, assuming a 30% Indian slab. The US tax is recovered as credit, so it isn't lost twice.",
      steps: [
        { label: "Dividend declared", amount: "₹100", kind: "start" },
        { label: "US withholds upfront (25%)", amount: "−₹25", kind: "deduct" },
        { label: "Extra Indian tax after credit", amount: "−₹5", kind: "deduct" },
        { label: "In your hand", amount: "₹70", kind: "result" },
      ],
    },
    comparison: {
      title: "Buying US stocks directly vs through GIFT City",
      rows: [
        { label: "Tax on dividends", direct: "25% held back by the US (claim the rest later)", giftCity: "~15% at the fund level (Ireland route)", directBad: true },
        { label: "Tax on profits", direct: "Taxed in India — 12.5% after 2 years, else your slab", giftCity: "Non-resident: exempt. Resident: same, but simpler" },
        { label: "If you pass away", direct: "Up to 40% US estate tax above $60,000", giftCity: "₹0 — fund units aren't US assets", directBad: true },
        { label: "Your tax return", direct: "List every holding in Schedule FA · ₹10L/yr penalty if missed", giftCity: "One domestic fund line", directBad: true },
      ],
    },
    steps: [
      "File a W-8BEN with your US broker so the US takes 25%, not the default 30%.",
      "List every US holding in Schedule FA of your Indian return — even if you made no profit.",
      "File Form 67 to claim back the US tax before you file your return.",
      "Compare the GIFT City route — it removes the estate-tax exposure entirely.",
    ],
    why: [
      { p: "The US keeps 25% of your dividends before you ever see them.", e: "India-US DTAA Art. 10(2)(b): 25% withholding for individuals. The 15% rate is corporate-only (≥10% holding) — it does NOT apply to retail investors." },
      { p: "Your profits are taxed in India, not the US.", e: "Non-residents aren't taxed on US capital gains. A resident pays India tax under Sec 112: 12.5% LTCG after 24 months, STCG at slab. Sec 112A (₹1.25L exemption, 20% STCG) does NOT apply to foreign stocks." },
      { p: "If you die holding US stocks, the US can tax up to 40% above a $60,000 cushion.", e: "US-situs assets > $60,000 face US estate tax up to 40% (IRC §2001). US stock is US-situs wherever your broker sits. There is no India-US estate-tax treaty." },
      { p: "You must declare foreign holdings in your tax return.", e: "Schedule FA (Table A3) is mandatory for a Resident & Ordinarily Resident; non-disclosure exposes you to ₹10L/year under Black Money Act ss. 42/43." },
    ],
    citations: [
      { label: "PwC — India withholding tax rates", url: "https://taxsummaries.pwc.com/india/corporate/withholding-taxes" },
      { label: "IRS — Estate tax for nonresidents", url: "https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax-for-nonresidents-not-citizens-of-the-united-states" },
      { label: "ClearTax — Schedule FA disclosure", url: "https://cleartax.in/s/disclosure-of-foreign-assets-in-income-tax-return" },
    ],
    aiSeed:
      "I'm a resident Indian planning to buy ₹50 lakh of US stocks directly. Explain exactly how I'll be taxed — dividends, capital gains, US estate tax, and what I must file — then compare it to investing the same amount through a GIFT City IFSC fund.",
  },

  /* ───────────────────────── 2. GIFT CITY ───────────────────────── */
  {
    slug: "gift-city",
    icon: ShieldCheck,
    category: "GIFT City",
    accent: "#05A049",
    question: "How am I taxed if I invest through GIFT City?",
    verdictPlain:
      "You own an Indian fund unit, not the US stock — so the harshest taxes simply don't reach you.",
    verdictExpert:
      "IFSC fund units are non-US-situs (no US estate tax). Non-residents are exempt under Sec 10(4D); the Ireland feeder cuts dividend WHT to 15%.",
    big: { value: "$0", caption: "US estate tax — IFSC fund units are not US-situated assets" },
    forGlobal:
      "If you're a non-resident, your gains on IFSC fund units are exempt from Indian tax under Section 10(4D) — at any holding period, when settled in foreign currency.",
    forResident:
      "If you're a resident, your gains are still taxed in India like any global fund — but you skip the US estate-tax trap and the dividend drag is lighter.",
    comparison: {
      title: "What GIFT City removes",
      rows: [
        { label: "US estate tax", direct: "Up to 40% on US stocks above $60k", giftCity: "₹0 — unit isn't a US asset" },
        { label: "Dividend drag", direct: "25% (direct US holding)", giftCity: "~15% via the Ireland feeder" },
        { label: "Indian capital gains", direct: "Resident: taxed · Non-resident: taxed on direct foreign assets", giftCity: "Non-resident: exempt (10(4D)) · Resident: taxed, simpler reporting" },
        { label: "Paperwork", direct: "Schedule FA per holding", giftCity: "One fund line" },
      ],
    },
    steps: [
      "Pick an IFSC fund that's registered with IFSCA under the 2022 Fund Management Regulations.",
      "If you're a non-resident, confirm the subscription is in foreign currency to keep the 10(4D) exemption.",
      "If you're a resident, remember gains are still taxable in India — plan the holding period.",
      "Use Valura's Net Returns tool to see the 10-year difference vs direct.",
    ],
    why: [
      { p: "Your fund unit isn't a US asset, so US estate tax can't touch it.", e: "US-situs is set by the legal form of the security you own. A unit of an India-domiciled IFSC fund is a non-US security → outside the $60k/40% US estate-tax net, even though the fund holds US stocks." },
      { p: "Non-residents pay no Indian tax on these gains.", e: "Section 10(4D) exempts a non-resident's income from transfer of IFSC-fund units, regardless of holding period — valid FY 2025-26 (IFSCA/EY)." },
      { p: "It is not blanket 'tax-free' for everyone.", e: "10(4D) is non-resident-only. Residents still pay Indian capital-gains tax; direct IFSC-exchange/PMS trades are taxed normally. Don't oversell 'tax-free'." },
    ],
    citations: [
      { label: "EY / IFSCA — GIFT City tax benefits (Feb 2025)", url: "https://ifsca.gov.in/Document/10_EY-GIFT_tax_benefits_050225.pdf" },
      { label: "Belong — Capital gains on GIFT City funds", url: "https://getbelong.com/blog/mutual-funds/capital-gains-gift-city-mutual-funds/" },
    ],
    aiSeed:
      "Explain how I'm taxed if I invest in US markets through a GIFT City IFSC fund. Cover capital gains, dividends and US estate tax, and tell me how it differs for a resident Indian vs an NRI.",
  },

  /* ───────────────────────── 3. ITR / SCHEDULE FA ───────────────────────── */
  {
    slug: "tax-return",
    icon: FileText,
    category: "Compliance",
    accent: "#2B4A8A",
    question: "What do I have to file in my tax return?",
    verdictPlain:
      "Own foreign stocks and you must declare every single one — miss it and the penalty is ₹10 lakh a year.",
    verdictExpert:
      "ROR must report all foreign holdings in Schedule FA (Table A3), plus Schedule FSI & TR for foreign income; non-disclosure → ₹10L/yr (Black Money Act).",
    big: { value: "₹10L", caption: "penalty per year for failing to disclose foreign holdings" },
    comparison: {
      title: "Filing burden: direct vs GIFT City",
      rows: [
        { label: "Which ITR form", direct: "ITR-2 or ITR-3 (never ITR-1)", giftCity: "ITR-2 or ITR-3" },
        { label: "Foreign-asset disclosure", direct: "Every holding in Schedule FA, Table A3", giftCity: "One IFSC fund entry", directBad: true },
        { label: "Foreign income", direct: "Schedule FSI + Schedule TR", giftCity: "Minimal" },
        { label: "Penalty risk", direct: "₹10L/yr if a holding is missed", giftCity: "Far lower surface area", directBad: true },
      ],
    },
    steps: [
      "Use ITR-2 (salary/capital gains) or ITR-3 (business) — never ITR-1.",
      "Enter each foreign holding in Schedule FA, Table A3 (held during the calendar year).",
      "Report foreign income in Schedule FSI and claim relief in Schedule TR.",
      "Cross-check every entry against your AIS and Form 26AS before filing.",
    ],
    why: [
      { p: "Foreign shares must be declared even if you didn't sell or profit.", e: "Schedule FA is a holdings disclosure, mandatory for a Resident & Ordinarily Resident regardless of income level; reporting period is the calendar year." },
      { p: "Missing a holding is expensive.", e: "Black Money Act ss. 42/43: ₹10L/year penalty for non-/mis-disclosure, with possible prosecution. (Recent ITAT rulings soften this for small bona-fide omissions, but the statutory exposure stands.)" },
      { p: "GIFT City collapses the paperwork.", e: "A single India-domiciled fund unit replaces a long list of individual foreign securities — fewer Schedule FA lines, lower error risk." },
    ],
    citations: [
      { label: "ClearTax — Foreign asset disclosure", url: "https://cleartax.in/s/disclosure-of-foreign-assets-in-income-tax-return" },
      { label: "Tax2win — Schedule FA guide", url: "https://tax2win.in/guide/schedule-fa-disclosure-of-foreign-assets-in-itr" },
    ],
    aiSeed:
      "I hold US stocks and GIFT City IFSC fund units as a resident Indian. Tell me exactly what I need to file in my ITR this year — which form, Schedule FA, FSI, TR — and the penalties if I get it wrong.",
  },

  /* ───────────────────────── 4. FTC / FORM 67 ───────────────────────── */
  {
    slug: "foreign-tax-credit",
    icon: RefreshCw,
    category: "Double-tax relief",
    accent: "#B8913A",
    question: "Am I being taxed twice? (Foreign Tax Credit)",
    verdictPlain:
      "No — India lets you subtract the US tax you already paid. But you have to file one form first, or you lose the credit.",
    verdictExpert:
      "FTC under Sec 90 + Rule 128: credit the lower of foreign tax paid or Indian tax on that income. Form 67 is mandatory (now allowed up to the belated-return window).",
    big: { value: "Form 67", caption: "file this and you won't pay tax twice on the same income" },
    waterfall: {
      title: "₹100 US dividend, taxed correctly",
      note: "Illustrative at a 30% Indian slab. You get credit for the US tax — you don't pay the full amount twice.",
      steps: [
        { label: "Gross dividend declared in India", amount: "₹100", kind: "start" },
        { label: "Indian tax at slab (30%)", amount: "−₹30", kind: "deduct" },
        { label: "Credit for US tax already paid", amount: "+₹25", kind: "result" },
        { label: "Net extra Indian tax", amount: "₹5", kind: "deduct" },
      ],
    },
    steps: [
      "Declare the gross (pre-US-tax) dividend as 'Income from Other Sources'.",
      "Work out your Indian tax on it, then credit the lower of the US tax or the Indian tax.",
      "File Form 67 — before you file your return is safest.",
      "Keep your US Form 1042-S as proof of the tax withheld.",
    ],
    why: [
      { p: "The treaty stops the same income being fully taxed in both countries.", e: "Sec 90 read with the India-US DTAA gives a Foreign Tax Credit for US tax suffered on the same income." },
      { p: "You can only credit up to what India would have charged.", e: "Rule 128: FTC = lower of (foreign tax paid) or (Indian tax on the doubly-taxed income), computed source-by-source." },
      { p: "The form is non-negotiable — but the timing is now relaxed.", e: "Form 67 is mandatory; post Notification 100/2022 it may be filed up to the end of the AY within the 139(1)/139(4) window (earlier it was strictly by the due date)." },
    ],
    citations: [
      { label: "Income Tax Dept — Rule 128 (FTC)", url: "https://incometaxindia.gov.in/Rules/Income-Tax%20Rules/rule128.htm" },
      { label: "EY — Form 67 timing relief", url: "https://www.ey.com/en_in/technical/alerts-hub/2024/03/madras-high-court-grants-foreign-tax-credit-on-delayed-filing-of-form-67" },
    ],
    aiSeed:
      "The US withheld 25% on my US dividends. As a resident Indian, how do I avoid being taxed twice? Walk me through the Foreign Tax Credit, Form 67, and the deadline, with a worked example on ₹1 lakh of dividends.",
  },

  /* ───────────────────────── 5. DTAA ───────────────────────── */
  {
    slug: "dtaa",
    icon: Handshake,
    category: "Treaties",
    accent: "#7A2020",
    question: "Does the India-US treaty (DTAA) actually help me?",
    verdictPlain:
      "Yes — it caps how much the US can hold back, and it's the reason you can claim that tax back in India.",
    verdictExpert:
      "The India-US DTAA caps dividend WHT at 25% for individuals (vs 30% default) and underpins the FTC; US capital gains remain taxable only in India.",
    big: { value: "30% → 25%", caption: "the treaty caps US dividend withholding — and lets you reclaim it" },
    forGlobal:
      "If you're a non-resident investing through GIFT City, the treaty barely matters — your IFSC gains are already exempt in India under 10(4D).",
    forResident:
      "If you're a resident, the treaty is what makes the Foreign Tax Credit possible and keeps your US profits out of US tax.",
    comparison: {
      title: "With the treaty vs without",
      rows: [
        { label: "Dividend withholding", direct: "30% default", giftCity: "25% with W-8BEN + treaty" },
        { label: "Capital gains", direct: "Could be claimed by two countries", giftCity: "Taxable only in India" },
        { label: "Double tax", direct: "Paid twice", giftCity: "Reclaimed via Form 67 (FTC)" },
      ],
    },
    steps: [
      "File a W-8BEN with your broker to switch from 30% to the 25% treaty rate.",
      "Treat US capital gains as taxable in India only.",
      "Use Form 67 to claim the treaty's double-tax relief.",
      "If you're an NRI on the GIFT City route, you usually don't need the treaty at all.",
    ],
    why: [
      { p: "The treaty caps the US's cut of your dividends.", e: "India-US DTAA Art. 10(2)(b): 25% for individuals; the W-8BEN claims this in place of the 30% statutory default." },
      { p: "It decides which country taxes your profits.", e: "Under the treaty, capital gains on US shares are taxable in the country of residence — India for a resident; the US does not tax an NRA's gains." },
      { p: "For GIFT City NRIs it's mostly irrelevant.", e: "10(4D) already exempts the IFSC-fund gains in India, so there's little double-tax to relieve." },
    ],
    citations: [
      { label: "India Embassy — India-US DTAA rate table", url: "https://www.indianembassyusa.gov.in/pdf/Tax%20rates%20as%20per%20IT%20Act%20vis%20a%20vis%20Indo-US%20DTAA.pdf" },
      { label: "PwC — India treaty withholding rates", url: "https://taxsummaries.pwc.com/india/corporate/withholding-taxes" },
    ],
    aiSeed:
      "Explain how the India-US tax treaty (DTAA) affects me as an Indian investor in US stocks — the dividend rate, capital gains, and double-tax relief. How does it change if I invest through GIFT City as an NRI?",
  },
];

export function getScenario(slug: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.slug === slug);
}
