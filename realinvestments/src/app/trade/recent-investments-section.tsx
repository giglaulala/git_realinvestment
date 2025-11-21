import { CompletedInvestmentCard, type CompletedInvestment } from "./completed-investment-card"

type RecentInvestmentsSectionProps = {
  investments: CompletedInvestment[]
}

export function RecentInvestmentsSection({ investments }: RecentInvestmentsSectionProps) {
  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Recent investments
        </h2>
        <p className="mt-2 text-base text-white/70">
          Successfully funded properties and their current performance
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {investments.map((investment) => (
          <CompletedInvestmentCard
            key={investment.code}
            investment={investment}
          />
        ))}
      </div>
    </section>
  )
}

