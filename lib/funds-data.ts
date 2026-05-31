/**
 * Global fund tracker data.
 * Source: thefynprint.com feeder-funds & gift-city-outbound trackers.
 * Data snapshot: 29 May 2026. Returns are %; illustrative, not advice.
 */

export interface FeederFund {
  name: string;
  master: string;       // underlying master fund it feeds into
  category: string;
  r1: number | null;
  r3: number | null;
  r5: number | null;
  r10: number | null;
  lumpsumOpen: boolean;
  sip: boolean;
  exp: number;          // Indian feeder TER %
  uexp: number | null;  // underlying master fund expense %  (null = bundled/NA)
}

export interface GiftFund {
  name: string;
  tier: "AIF" | "PMS" | "Retail";
  strategy: string;
  allocation: string;
  pros: string;
  cons: string;
  r3m: number | null;
  r6m: number | null;
  si: number | null;     // since-inception %
  inception: string;
}

export const FUNDS_AS_OF = "29 May 2026";
export const NIFTY_TRI = { r1: -4.02, r3: 9.3, r5: 9.63, r10: 12.24 };
export const ACWI_TRI_SI = 8.37;

export const FEEDER_FUNDS: FeederFund[] = [
  { name: "Edelweiss US Technology Equity FoF", master: "JPMorgan US Technology Fund", category: "US · Tech", r1: 56.33, r3: 35.09, r5: 19.28, r10: null, lumpsumOpen: false, sip: true, exp: 1.51, uexp: 0.78 },
  { name: "Edelweiss US Value Equity Offshore Fund", master: "JPMorgan US Value Fund", category: "US · Value", r1: 36.03, r3: 20.54, r5: 14.14, r10: 13.8, lumpsumOpen: false, sip: true, exp: 1.41, uexp: 0.91 },
  { name: "Edelweiss Greater China Equity Offshore Fund", master: "JPMorgan Greater China Fund", category: "China", r1: 69.73, r3: 25.46, r5: 4.9, r10: 15.05, lumpsumOpen: false, sip: true, exp: 1.51, uexp: 0.75 },
  { name: "Edelweiss Emerging Markets Opportunities Offshore Fund", master: "JPMorgan Emerging Markets Opportunities Fund", category: "Emerging Mkts", r1: 79.33, r3: 29.64, r5: 10.02, r10: 13, lumpsumOpen: false, sip: true, exp: 1.48, uexp: 0.92 },
  { name: "Edelweiss Europe Dynamic Equity Offshore Fund", master: "JPMorgan Europe Dynamic Fund", category: "Europe", r1: 30.2, r3: 25.47, r5: 15.47, r10: 13.03, lumpsumOpen: false, sip: true, exp: 1.49, uexp: 0.91 },
  { name: "Edelweiss ASEAN Equity Offshore Fund", master: "JPMorgan ASEAN Equity Fund", category: "ASEAN", r1: 23.41, r3: 14.14, r5: 9.48, r10: 8.64, lumpsumOpen: false, sip: true, exp: 1.59, uexp: 0.91 },
  { name: "Franklin US Opportunities Active FoF", master: "Franklin US Opportunities Fund, Class I (Acc)", category: "US · Growth", r1: 30.95, r3: 25.72, r5: 13.8, r10: 17.73, lumpsumOpen: true, sip: true, exp: 0.6, uexp: 0.85 },
  { name: "PGIM India Global Equity Opportunities Fund", master: "PGIM Jennison Global Equity Opportunities (USD AC I)", category: "Global", r1: 27.77, r3: 20.36, r5: 10.01, r10: 14.67, lumpsumOpen: true, sip: true, exp: 1.44, uexp: null },
  { name: "PGIM India Emerging Markets Equity Fund", master: "PGIM Jennison Emerging Markets Equity Fund", category: "Emerging Mkts", r1: 62.03, r3: 31.9, r5: 6.28, r10: 7.9, lumpsumOpen: true, sip: true, exp: 1.41, uexp: null },
  { name: "PGIM India Global Select Real Estate Fund", master: "PGIM Global Select Real Estate Securities Fund", category: "Real Estate", r1: 25.82, r3: 16.39, r5: null, r10: null, lumpsumOpen: true, sip: true, exp: 1.28, uexp: null },
  { name: "Franklin Asian Equity Fund", master: "Direct Asian stocks (ex-Japan)", category: "Asia ex-Japan", r1: 54.82, r3: 23.07, r5: 7.93, r10: 11.86, lumpsumOpen: true, sip: true, exp: 1.6, uexp: null },
  { name: "Baroda BNP Paribas Aqua FoF", master: "BNP Paribas Funds SICAV – Aqua", category: "Water / Thematic", r1: 21.13, r3: 16.13, r5: 10.34, r10: null, lumpsumOpen: true, sip: true, exp: 0.61, uexp: null },
];

export const GIFT_FUNDS: GiftFund[] = [
  // ── AIFs ──
  { name: "Ionic Global Innovation Fund", tier: "AIF", strategy: "Mid-tier IT / innovation companies", allocation: "Across markets · ~45% US, 25% Europe", pros: "No churn tax (Cayman route)", cons: "Fortnightly redemption only · tech concentration", r3m: null, r6m: null, si: null, inception: "—" },
  { name: "Mirae Asset Global Allocation Fund", tier: "AIF", strategy: "Invests in ETFs across global markets", allocation: "50–70% developed · 30–50% emerging", pros: "Wide diversification via ETFs", cons: "3-year lock-in · close-ended", r3m: -0.32, r6m: 2.11, si: 4.6, inception: "Sep 2025" },
  { name: "Baroda BNP Paribas US Smallcap Fund", tier: "AIF", strategy: "Feeds BNP Paribas US Small Cap Fund · bottom-up", allocation: "100% US small-cap", pros: "Underlying beat its index 10 of 12 years", cons: "Small-cap concentration · 2-year lock-in", r3m: 3.95, r6m: 10.5, si: null, inception: "Nov 2025" },
  { name: "Rational Gold & Silver Miners Fund", tier: "AIF", strategy: "Gold & silver mining stocks", allocation: "~80% gold miners, rest silver", pros: "Holdings reasonably valued", cons: "Concentration in gold", r3m: -9.7, r6m: 22, si: 73, inception: "May 2025" },
  { name: "Ashoka WhiteOak Emerging Markets Fund (ex-India)", tier: "AIF", strategy: "Bottom-up, long-only", allocation: "EM ex-India · Asia, LatAm, Middle East", pros: "No churn tax · feeds an Irish UCITS", cons: "Emerging-markets concentration", r3m: 3.9, r6m: 8.9, si: 9.3, inception: "Dec 2022" },
  { name: "Unifi G20 Fund", tier: "AIF", strategy: "20 global stocks / ADRs · GARP framework", allocation: "60% US, 8% Taiwan, rest others", pros: "Niche exposure: tech, luxury, cloud", cons: "2-year lock-in · tech concentration", r3m: 6.83, r6m: 1.47, si: 10.22, inception: "Jun 2025" },
  // ── PMS (min ~$75,000) ──
  { name: "Phillip Intl. Pioneer Portfolio", tier: "PMS", strategy: "Fundamentals-led, US-listed ETFs, sector-agnostic", allocation: "67% US, rest Japan / Taiwan / others", pros: "Wide diversification via ETFs", cons: "Tax on churn", r3m: -2.3, r6m: -1.8, si: 7.7, inception: "Dec 2021" },
  { name: "Marcellus GCP PMS", tier: "PMS", strategy: "Growth & quality · 25–30 stocks · all-cap", allocation: "62% US, rest EU & Canada", pros: "Flexible fees · zero exit load", cons: "Tax on churn", r3m: -2.19, r6m: -1.25, si: 19.86, inception: "Aug 2022" },
  { name: "PPFAS Global Investing Strategy PMS", tier: "PMS", strategy: "Value · sector ≤25%, single stock ≤10%", allocation: "Global companies, diversified revenues", pros: "Lower fees · zero exit load", cons: "Tax on churn", r3m: -6.88, r6m: -5.61, si: -2.56, inception: "Aug 2025" },
  // ── Retail (min ~$5,000) ──
  { name: "DSP Global Equity Fund", tier: "Retail", strategy: "Value · 30–50 stocks · cap & country agnostic", allocation: "40% US, 32% EU, rest Japan & China", pros: "Low ticket ($5,000)", cons: "Fund-level tax — other investors' exits can raise your tax bill", r3m: -2.64, r6m: -4.08, si: -4.71, inception: "Sep 2025" },
  { name: "PPFAS Nasdaq 100 Fund", tier: "Retail", strategy: "Nasdaq-100 via UCITS & ETFs · passive", allocation: "90% index, 10% cash/debt", pros: "Low ticket ($5,000) · low fee ~0.4%", cons: "Rich valuations · 64% in tech", r3m: null, r6m: null, si: 13.94, inception: "Mar 2026" },
  { name: "PPFAS S&P 500 Fund", tier: "Retail", strategy: "S&P 500 via UCITS & ETFs · passive", allocation: "90% index, 10% cash/debt", pros: "Low ticket ($5,000) · low fee ~0.5%", cons: "Rich valuations · 33% in tech", r3m: null, r6m: null, si: 10.02, inception: "Mar 2026" },
  { name: "Edelweiss Greater China Fund", tier: "Retail", strategy: "Greater China equities", allocation: "China / Greater China region", pros: "Low ticket access", cons: "Single-region concentration", r3m: null, r6m: null, si: 10.58, inception: "Mar 2026" },
];

export const TIER_INFO: Record<GiftFund["tier"], { label: string; ticket: string; note: string }> = {
  AIF: { label: "AIF — Alternative Investment Fund", ticket: "Min ~$150,000", note: "Pooled, professionally managed; often a lock-in." },
  PMS: { label: "PMS — Portfolio Management Service", ticket: "Min ~$75,000", note: "You own the stocks directly; churn can be taxed." },
  Retail: { label: "Retail feeder funds", ticket: "Min ~$5,000", note: "Accessible tickets; the closest GIFT City gets to a mutual fund." },
};
