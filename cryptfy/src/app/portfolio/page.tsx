import Link from "next/link";

export const metadata = {
  title: "Real Investment | Portfolio",
  description:
    "Track allocations, yield performance, and cross-venue balances within your Real Investment portfolio.",
};

const holdings = [
  { asset: "Bitcoin", symbol: "BTC", allocation: "42%", value: "$2.8M", pnl: "+12.4%" },
  { asset: "Ether", symbol: "ETH", allocation: "27%", value: "$1.8M", pnl: "+7.9%" },
  { asset: "Solana", symbol: "SOL", allocation: "16%", value: "$1.1M", pnl: "+15.6%" },
  { asset: "Aptos", symbol: "APT", allocation: "9%", value: "$620K", pnl: "-3.8%" },
  { asset: "Stable reserves", symbol: "USDC", allocation: "6%", value: "$410K", pnl: "+1.1%" },
];

const streaks = [
  { title: "Net deposits", value: "$320K", caption: "Past 30 days" },
  { title: "Funding APR", value: "4.8%", caption: "Weighted average" },
  { title: "Strategy uptime", value: "99.97%", caption: "Last 90 days" },
];

const timeline = [
  {
    title: "Desk rebalance executed",
    time: "Today • 16:10",
    body: "Shifted 4% of SOL into BTC to capture swap incentives.",
  },
  {
    title: "USDC yield cycle settled",
    time: "Yesterday • 21:34",
    body: "Auto-rolled 45% of stable reserves into 7-day vault.",
  },
  {
    title: "Risk parameters synced",
    time: "Sep 13 • 09:18",
    body: "Synced updated volatility thresholds across smart order routing.",
  },
];

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen bg-neutral-950 px-6 pb-24 pt-16 text-white sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-14rem] top-40 h-[20rem] w-[20rem] rounded-full bg-emerald-400/20 blur-[160px]" />
        <div className="absolute right-[-10rem] top-[32rem] h-[18rem] w-[18rem] rounded-full bg-lime-300/20 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-200/70">
              Portfolio control tower
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              Monitor capital in real time
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/70 sm:text-lg">
              Visualize multi-chain balances, funding flows, and realized P&L with motion-ready
              data streams built for investor showcases.
            </p>
          </div>
          <Link
            href="/trade"
            className="self-start rounded-full border border-white/15 px-6 py-2 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
          >
            Open trade terminal
          </Link>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-white/12 bg-white/6 p-8 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Holdings breakdown</h2>
                <p className="mt-1 text-sm text-white/60">
                  Aggregated from on-chain vaults, exchanges, and custody partners.
                </p>
              </div>
              <span className="rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/50">
                Updated 14s ago
              </span>
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/30 p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {streaks.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-emerald-200/20 bg-white/5 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                      {item.title}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-xs text-white/50">{item.caption}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <ul className="mt-6 space-y-3">
                {holdings.map((holding) => (
                  <li
                    key={holding.symbol}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/30 to-emerald-500/30 text-base font-semibold text-emerald-100">
                        {holding.symbol}
                      </div>
                      <div>
                        <p className="text-base font-semibold">{holding.asset}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          Allocation {holding.allocation}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{holding.value}</p>
                      <p
                        className={`text-xs ${
                          holding.pnl.startsWith("-") ? "text-rose-400" : "text-emerald-300"
                        }`}
                      >
                        {holding.pnl}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-[2.2rem] border border-white/12 bg-white/6 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Activity timeline</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/50">
                  Chronicle
                </span>
              </div>
              <ul className="mt-4 space-y-4">
                {timeline.map((event) => (
                  <li
                    key={event.title}
                    className="rounded-2xl border border-white/10 bg-black/35 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                      {event.time}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">{event.title}</p>
                    <p className="mt-2 text-sm text-white/60">{event.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2.2rem] border border-emerald-200/40 bg-emerald-400/15 p-6 text-neutral-900 shadow-[0_30px_80px_rgba(134,239,172,0.4)]">
              <h3 className="text-lg font-semibold text-neutral-900">
                Present to LPs and investors
              </h3>
              <p className="mt-2 text-sm text-neutral-900/80">
                Sync these analytics into the 3D skyline hero for fundraising decks or live road
                shows. Configure custom camera paths per asset class.
              </p>
              <Link
                href="/"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-black"
              >
                Return home
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}


