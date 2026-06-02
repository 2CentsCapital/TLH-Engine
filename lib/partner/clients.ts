/**
 * Dummy client portfolios for the Voguestock × Valura partner demo.
 * Mix of US stocks, ETFs and funds. All figures illustrative.
 */
export const USD_INR = 83.5;
export const FY_LABEL = "FY 2025-26 (1 Apr 2025 – 31 Mar 2026)";
export const FY_START = "2025-04-01";
export const FY_END = "2026-03-31";

export type AssetType = "Stock" | "ETF" | "Fund";

export interface Holding {
  security: string; ticker: string; type: AssetType;
  qty: number; buyUSD: number; curUSD: number; buyDate: string;
}
export interface Sale {
  security: string; ticker: string; type: AssetType;
  qty: number; buyUSD: number; sellUSD: number; buyDate: string; sellDate: string;
}
export interface Dividend {
  security: string; ticker: string; grossUSD: number; usTaxUSD: number; date: string;
}
export interface Client {
  id: string; name: string; pan: string; usId: string; email: string; since: string;
  holdings: Holding[]; sales: Sale[]; dividends: Dividend[];
}

export const CLIENTS: Client[] = [
  {
    id: "aarav", name: "Aarav Mehta", pan: "ABCPM4521F", usId: "Passport Z3456789", email: "aarav.mehta@email.com", since: "Jun 2023",
    holdings: [
      { security: "Apple Inc.", ticker: "AAPL", type: "Stock", qty: 120, buyUSD: 148.2, curUSD: 211.4, buyDate: "2023-08-12" },
      { security: "Microsoft Corp.", ticker: "MSFT", type: "Stock", qty: 60, buyUSD: 305.5, curUSD: 438.1, buyDate: "2022-11-05" },
      { security: "Vanguard S&P 500 ETF", ticker: "VOO", type: "ETF", qty: 45, buyUSD: 382.0, curUSD: 512.3, buyDate: "2023-02-20" },
      { security: "Invesco QQQ Trust", ticker: "QQQ", type: "ETF", qty: 30, buyUSD: 352.1, curUSD: 498.7, buyDate: "2024-01-15" },
      { security: "Parag Parikh US FoF", ticker: "PPFAS-US", type: "Fund", qty: 2000, buyUSD: 14.2, curUSD: 16.8, buyDate: "2023-06-15" },
    ],
    sales: [
      { security: "NVIDIA Corp.", ticker: "NVDA", type: "Stock", qty: 15, buyUSD: 188.0, sellUSD: 905.0, buyDate: "2023-03-10", sellDate: "2025-12-20" },
      { security: "Amazon.com Inc.", ticker: "AMZN", type: "Stock", qty: 20, buyUSD: 131.0, sellUSD: 184.5, buyDate: "2025-02-01", sellDate: "2025-11-15" },
      { security: "Tesla Inc.", ticker: "TSLA", type: "Stock", qty: 25, buyUSD: 242.0, sellUSD: 188.0, buyDate: "2025-05-01", sellDate: "2026-01-10" },
    ],
    dividends: [
      { security: "Apple Inc.", ticker: "AAPL", grossUSD: 110.4, usTaxUSD: 27.6, date: "2025-08-14" },
      { security: "Microsoft Corp.", ticker: "MSFT", grossUSD: 180.0, usTaxUSD: 45.0, date: "2025-09-11" },
      { security: "Vanguard S&P 500 ETF", ticker: "VOO", grossUSD: 290.7, usTaxUSD: 72.7, date: "2025-12-29" },
      { security: "Invesco QQQ Trust", ticker: "QQQ", grossUSD: 84.0, usTaxUSD: 21.0, date: "2025-12-22" },
    ],
  },
  {
    id: "priya", name: "Priya Nair", pan: "AKLPN7788Q", usId: "Passport N1122334", email: "priya.nair@email.com", since: "Jan 2024",
    holdings: [
      { security: "Alphabet Inc. Class A", ticker: "GOOGL", type: "Stock", qty: 40, buyUSD: 122.4, curUSD: 178.9, buyDate: "2024-03-18" },
      { security: "iShares Core MSCI EM ETF", ticker: "IEMG", type: "ETF", qty: 90, buyUSD: 51.2, curUSD: 58.6, buyDate: "2024-05-02" },
      { security: "SPDR Gold Shares", ticker: "GLD", type: "ETF", qty: 35, buyUSD: 182.0, curUSD: 246.5, buyDate: "2024-02-10" },
      { security: "Motilal Oswal Nasdaq 100 FoF", ticker: "MO-N100", type: "Fund", qty: 5000, buyUSD: 0.32, curUSD: 0.41, buyDate: "2024-01-20" },
    ],
    sales: [
      { security: "Meta Platforms Inc.", ticker: "META", type: "Stock", qty: 12, buyUSD: 318.0, sellUSD: 602.0, buyDate: "2024-04-05", sellDate: "2025-10-08" },
    ],
    dividends: [
      { security: "iShares Core MSCI EM ETF", ticker: "IEMG", grossUSD: 96.4, usTaxUSD: 24.1, date: "2025-12-18" },
    ],
  },
  {
    id: "rohan", name: "Rohan Kapoor", pan: "BNZPK1093L", usId: "Passport K9087654", email: "rohan.kapoor@email.com", since: "Sep 2022",
    holdings: [
      { security: "Berkshire Hathaway Cl B", ticker: "BRK.B", type: "Stock", qty: 50, buyUSD: 312.0, curUSD: 468.0, buyDate: "2022-10-12" },
      { security: "Vanguard Total World ETF", ticker: "VT", type: "ETF", qty: 120, buyUSD: 95.4, curUSD: 124.8, buyDate: "2023-01-09" },
      { security: "Schwab US Dividend ETF", ticker: "SCHD", type: "ETF", qty: 200, buyUSD: 72.1, curUSD: 78.9, buyDate: "2023-07-22" },
    ],
    sales: [
      { security: "JPMorgan Chase & Co.", ticker: "JPM", type: "Stock", qty: 30, buyUSD: 138.0, sellUSD: 246.0, buyDate: "2022-12-01", sellDate: "2025-09-30" },
      { security: "Netflix Inc.", ticker: "NFLX", type: "Stock", qty: 8, buyUSD: 612.0, sellUSD: 489.0, buyDate: "2025-06-14", sellDate: "2026-02-02" },
    ],
    dividends: [
      { security: "Schwab US Dividend ETF", ticker: "SCHD", grossUSD: 540.0, usTaxUSD: 135.0, date: "2025-12-15" },
      { security: "Vanguard Total World ETF", ticker: "VT", grossUSD: 268.8, usTaxUSD: 67.2, date: "2025-12-20" },
    ],
  },
];

/* ── derived helpers ── */
export function holdingDays(buy: string, sell: string): number {
  return Math.floor((new Date(sell).getTime() - new Date(buy).getTime()) / 86_400_000);
}
export function isLongTerm(buy: string, sell: string): boolean {
  return holdingDays(buy, sell) > 730; // 24 months for foreign assets
}
export function inr(usd: number): number { return Math.round(usd * USD_INR); }

export function clientTotals(c: Client) {
  const stcgINR = c.sales.filter((s) => !isLongTerm(s.buyDate, s.sellDate))
    .reduce((t, s) => t + (s.sellUSD - s.buyUSD) * s.qty * USD_INR, 0);
  const ltcgINR = c.sales.filter((s) => isLongTerm(s.buyDate, s.sellDate))
    .reduce((t, s) => t + (s.sellUSD - s.buyUSD) * s.qty * USD_INR, 0);
  const divGrossINR = c.dividends.reduce((t, d) => t + d.grossUSD * USD_INR, 0);
  const usTaxINR = c.dividends.reduce((t, d) => t + d.usTaxUSD * USD_INR, 0);
  const holdingsValueINR = c.holdings.reduce((t, h) => t + h.curUSD * h.qty * USD_INR, 0);
  return {
    stcgINR: Math.round(stcgINR), ltcgINR: Math.round(ltcgINR),
    capGainsINR: Math.round(stcgINR + ltcgINR),
    divGrossINR: Math.round(divGrossINR), usTaxINR: Math.round(usTaxINR),
    holdingsValueINR: Math.round(holdingsValueINR),
  };
}
