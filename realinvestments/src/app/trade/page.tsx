import Link from "next/link";
import {
  ArrowUpRight,
  Layers,
  TrendingDown,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { CommitmentForm } from "./commitment-form";

export const metadata = {
  title: "Real Investment | Current Raises",
  description:
    "Commit capital to Georgian real estate SPVs, monitor escrow progress, and stay informed on raise updates in one place.",
};

type InvestmentStat = {
  label: string;
  value: string;
};

type InvestmentOpportunity = {
  code: string;
  name: string;
  location: string;
  status: string;
  pricePerShare: string;
  priceChange: string;
  avgPrice: string;
  winnings: string;
  investors: number;
  availableShares: string;
  stats: InvestmentStat[];
};

const roundUpdates = [
  {
    title: "Escrow audit scheduled",
    body: "TBI-01 escrow reconciliation with partner bank at 18:00. Updated statement uploaded to the data room.",
  },
  {
    title: "Transfer Board inquiry",
    body: "Two investors requested early-exit slots for BTM-02. Bulletin board opening once compliance approval clears.",
  },
];

const investmentOpportunities: InvestmentOpportunity[] = [
  {
    code: "TBI-01",
    name: "Vake Vista",
    location: "Tbilisi · Vake district",
    status: "78% funded · Closes in 3 days",
    pricePerShare: "₾1,150",
    priceChange: "+6.4%",
    avgPrice: "₾1,085",
    winnings: "₾420k",
    investors: 286,
    availableShares: "44 shares remaining",
    stats: [
      { label: "Projected IRR", value: "16%" },
      { label: "Gross yield", value: "6.8%" },
      { label: "Occupancy", value: "92% leased" },
    ],
  },
  {
    code: "BTM-02",
    name: "Seaside Residences",
    location: "Batumi · New Boulevard",
    status: "52% funded · Closes in 5 days",
    pricePerShare: "₾920",
    priceChange: "-1.4%",
    avgPrice: "₾950",
    winnings: "₾310k",
    investors: 198,
    availableShares: "96 shares remaining",
    stats: [
      { label: "Projected IRR", value: "14%" },
      { label: "Gross yield", value: "6.1%" },
      { label: "Occupancy", value: "88% pre-leased" },
    ],
  },
  {
    code: "KTS-03",
    name: "Riverside Lofts",
    location: "Kutaisi · Riverfront",
    status: "34% funded · Closes in 6 days",
    pricePerShare: "₾640",
    priceChange: "+4.8%",
    avgPrice: "₾612",
    winnings: "₾185k",
    investors: 143,
    availableShares: "132 shares remaining",
    stats: [
      { label: "Projected IRR", value: "12%" },
      { label: "Gross yield", value: "5.9%" },
      { label: "Occupancy", value: "82% presold" },
    ],
  },
  {
    code: "TBI-04",
    name: "Old Town Revival",
    location: "Tbilisi · Sololaki",
    status: "New raise · Opened today",
    pricePerShare: "₾1,320",
    priceChange: "+7.5%",
    avgPrice: "₾1,250",
    winnings: "₾265k",
    investors: 164,
    availableShares: "210 shares available",
    stats: [
      { label: "Projected IRR", value: "18%" },
      { label: "Gross yield", value: "7.2%" },
      { label: "Restoration", value: "Phase 2 permits" },
    ],
  },
];

function InvestmentOpportunityCard({
  opportunity,
  className,
}: {
  opportunity: InvestmentOpportunity;
  className?: string;
}) {
  const changePositive = opportunity.priceChange.startsWith("+");

  return (
    <article
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-white/10 via-neutral-900/80 to-neutral-900/95 p-6 shadow-[0_20px_60px_rgba(15,118,110,0.25)] transition duration-300 hover:border-emerald-300/50 hover:shadow-[0_30px_80px_rgba(134,239,172,0.35)] ${className ?? ""}`}
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-400/10 blur-[160px] transition group-hover:scale-125" />
      <div className="absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-lime-300/10 blur-[160px] transition group-hover:scale-110" />
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
              {opportunity.code}
            </p>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">
              {opportunity.name}
            </h3>
            <p className="text-sm text-white/60">{opportunity.location}</p>
          </div>
          <span className="inline-flex items-center rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white/60">
            {opportunity.status}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/45">
              Price per share
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {opportunity.pricePerShare}
            </p>
            <p className="mt-1 text-xs text-white/50">
              Avg. {opportunity.avgPrice} last 30 days
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/45">
              Price movement
            </p>
            <div className="mt-2 flex items-center gap-2">
              {changePositive ? (
                <TrendingUp className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              ) : (
                <TrendingDown className="h-4 w-4 text-rose-300" aria-hidden="true" />
              )}
              <p
                className={`text-lg font-semibold ${
                  changePositive ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {opportunity.priceChange}
              </p>
            </div>
            <p className="mt-1 text-xs text-white/50">vs. previous 30 days</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/45">
              Payouts to date
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <p className="text-lg font-semibold text-white">
                {opportunity.winnings}
              </p>
            </div>
            <p className="mt-1 text-xs text-white/50">Total investor winnings</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {opportunity.stats.map((stat) => (
            <div
              key={`${opportunity.code}-${stat.label}`}
              className="rounded-xl border border-white/10 bg-black/25 p-3"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/45">
                {stat.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2">
              <Users className="h-4 w-4 text-emerald-200" aria-hidden="true" />
              <span className="font-semibold text-white">
                {opportunity.investors.toLocaleString("en-US")}
              </span>
              <span className="text-white/60">investors</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2">
              <Layers className="h-4 w-4 text-emerald-200" aria-hidden="true" />
              <span className="font-semibold text-white">
                {opportunity.availableShares}
              </span>
            </span>
          </div>
          <Link
            href={{ pathname: "/trade", query: { raise: opportunity.code } }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-white/80 transition hover:border-emerald-300/60 hover:text-emerald-200"
          >
            Review data room
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function TradePage() {
  return (
    <div className="relative min-h-screen bg-neutral-950 px-6 pb-24 pt-16 text-white sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-28 h-[22rem] w-[22rem] rounded-full bg-lime-400/20 blur-[160px]" />
        <div className="absolute right-[-10rem] top-10 h-[18rem] w-[18rem] rounded-full bg-emerald-400/25 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-200/70">
              Escrow-backed raises
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              Commit to fractional ownership
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/70 sm:text-lg">
              Review active SPVs, pass compliance, and lock your capital into escrow—funds move straight to the property&apos;s company once the goal is reached, or return to your bank account if it isn&apos;t.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="self-start rounded-full border border-white/15 px-6 py-2 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
          >
            View my holdings
          </Link>
        </header>

        <section className="grid items-start gap-8 lg:grid-cols-[max-content_minmax(0,1fr)]">
          <div className="w-full max-w-2xl rounded-[2.5rem] border border-white/15 bg-white/5 p-8 backdrop-blur lg:justify-self-start">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Commit to a property raise</h2>
                <p className="mt-1 text-sm text-white/60">
                  One-week fundraising window per SPV. Capital settles into escrow until the round closes.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                <span className="flex h-2 w-2 rounded-full bg-emerald-300" />
                Window open
              </div>
            </div>

            <CommitmentForm opportunities={investmentOpportunities} />

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Escrow status</p>
                <p className="mt-3 text-lg font-semibold">Bank-confirmed</p>
                <p className="mt-2 text-sm text-emerald-200/80">
                  Funds settle into a licensed third-party escrow account. Release requires raise completion and lawyer sign-off.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Refund safety</p>
                <p className="mt-3 text-lg font-semibold">Automatic reversals</p>
                <p className="mt-2 text-sm text-emerald-200/80">
                  If the goal is missed, the escrow agent returns 100% of capital to the linked personal bank accounts instantly.
                </p>
              </div>
            </div>

            <div className="mt-6 w-full rounded-[2rem] border border-emerald-200/40 bg-emerald-400/15 p-6 text-white shadow-[0_30px_80px_rgba(134,239,172,0.4)]">
              <h3 className="text-lg font-semibold text-white">Round updates</h3>
              <ul className="mt-4 space-y-4 text-sm text-white/80">
                {roundUpdates.map((update) => (
                  <li
                    key={update.title}
                    className="w-full rounded-xl border border-white/40 bg-white/10 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                      {update.title}
                    </p>
                    <p className="mt-2 text-sm text-white/80">{update.body}</p>
                  </li>
                ))}
              </ul>
              <Link
                href="/portfolio"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-black"
              >
                Review my positions
              </Link>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            {investmentOpportunities.slice(0, 2).map((opportunity) => (
              <InvestmentOpportunityCard
                key={`${opportunity.code}-summary`}
                opportunity={opportunity}
              />
            ))}
          </aside>
        </section>
      </div>
    </div>
  );
}


