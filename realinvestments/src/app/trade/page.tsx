import { FundingPeriodSection } from "./funding-period-section"
import { RecentInvestmentsSection } from "./recent-investments-section"
import { TradeHeader } from "./trade-header"
import { investmentOpportunities, completedInvestments } from "./trade-data"

export const metadata = {
  title: "Real Investment | Current Raises",
  description:
    "Commit capital to Georgian real estate SPVs, monitor escrow progress, and stay informed on raise updates in one place.",
}

export default function TradePage() {
  return (
    <div className="relative min-h-screen bg-neutral-950 px-6 pb-24 pt-16 text-white sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 top-28 h-88 w-88 rounded-full bg-lime-400/20 blur-[160px]" />
        <div className="absolute -right-40 top-10 h-72 w-72 rounded-full bg-emerald-400/25 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12">
        <TradeHeader />

        <FundingPeriodSection opportunities={investmentOpportunities} />

        <RecentInvestmentsSection investments={completedInvestments} />
      </div>
    </div>
  )
}
