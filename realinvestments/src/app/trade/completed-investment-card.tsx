import { TrendingUp, Users, Calendar, Trophy } from "lucide-react"

export type CompletedInvestment = {
  code: string
  name: string
  location: string
  fundedDate: string
  purchasePrice: string
  currentValue: string
  appreciation: string
  appreciationPercent: string
  investors: number
  totalDistributions: string
  stats: {
    label: string
    value: string
  }[]
}

type CompletedInvestmentCardProps = {
  investment: CompletedInvestment
  className?: string
}

export function CompletedInvestmentCard({
  investment,
  className,
}: CompletedInvestmentCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-white/10 via-neutral-900/80 to-neutral-900/95 p-6 shadow-[0_10px_30px_rgba(15,118,110,0.15)] transition duration-300 hover:border-emerald-300/50 hover:shadow-[0_15px_40px_rgba(134,239,172,0.2)] ${className ?? ""}`}
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-400/5 blur-[120px] transition group-hover:scale-125" />
      <div className="absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-lime-300/5 blur-[120px] transition group-hover:scale-110" />
      
      <div className="relative z-10 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
              {investment.code}
            </p>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">
              {investment.name}
            </h3>
            <p className="text-sm text-white/60">{investment.location}</p>
          </div>
          <span className="inline-flex items-center rounded-full border border-emerald-300/40 bg-emerald-400/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-emerald-200">
            Funded
          </span>
        </div>

        {/* Value Metrics */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/45">
              Purchase price
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {investment.purchasePrice}
            </p>
            <p className="mt-1 text-xs text-white/50">
              Funded {investment.fundedDate}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/45">
              Current value
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {investment.currentValue}
            </p>
            <p className="mt-1 text-xs text-emerald-300">
              +{investment.appreciation} gain
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/45">
              Appreciation
            </p>
            <div className="mt-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              <p className="text-lg font-semibold text-emerald-300">
                {investment.appreciationPercent}
              </p>
            </div>
            <p className="mt-1 text-xs text-white/50">Since funding date</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-3">
          {investment.stats.map((stat) => (
            <div
              key={`${investment.code}-${stat.label}`}
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

        {/* Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2">
              <Users className="h-4 w-4 text-emerald-200" aria-hidden="true" />
              <span className="font-semibold text-white">
                {investment.investors.toLocaleString("en-US")}
              </span>
              <span className="text-white/60">investors</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2">
              <Trophy className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <span className="font-semibold text-white">
                {investment.totalDistributions}
              </span>
              <span className="text-white/60">distributed</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

