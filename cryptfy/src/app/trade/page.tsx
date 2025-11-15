import Link from "next/link";

export const metadata = {
  title: "Real Investment | Trade Terminal",
  description:
    "Execute swaps, monitor order flow, and review live positions within the Real Investment trade terminal.",
};

const tradingPairs = [
  { base: "BTC", quote: "USDT", spread: "0.08%", liquidity: "$142M", depth: "4.2M" },
  { base: "ETH", quote: "USDC", spread: "0.11%", liquidity: "$108M", depth: "3.6M" },
  { base: "SOL", quote: "USDC", spread: "0.14%", liquidity: "$74M", depth: "2.1M" },
  { base: "APT", quote: "USDT", spread: "0.23%", liquidity: "$26M", depth: "870K" },
];

const recentTrades = [
  { pair: "BTC/USDT", side: "Buy", size: "4.25 BTC", price: "$74,230", time: "16:21:32" },
  { pair: "ETH/USDC", side: "Sell", size: "220 ETH", price: "$3,482", time: "16:20:18" },
  { pair: "SOL/USDC", side: "Buy", size: "12,400 SOL", price: "$182.3", time: "16:19:54" },
  { pair: "BTC/USDT", side: "Sell", size: "1.8 BTC", price: "$74,210", time: "16:18:03" },
];

const riskAlerts = [
  {
    title: "Funding window closes in 12m",
    body: "Transfer idle collateral or enable auto-borrow to retain full margin efficiency.",
  },
  {
    title: "Volatility sweep inbound",
    body: "Orderflow radar detects 4.1x spike on SOL. Expect wider spreads for the next block.",
  },
];

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
              Real Investment terminal
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              Trade without friction
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/70 sm:text-lg">
              Execute cross-venue swaps, monitor streaming liquidity, and queue algorithmic
              strategies with cinematic-grade telemetry overlays.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="self-start rounded-full border border-white/15 px-6 py-2 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
          >
            View portfolio
          </Link>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-white/15 bg-white/5 p-8 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Live swap orchestration</h2>
                <p className="mt-1 text-sm text-white/60">
                  Split orders across 120+ venues with adaptive routing.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                <span className="flex h-2 w-2 rounded-full bg-emerald-300" />
                Synced
              </div>
            </div>

            <form className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">From</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">Bitcoin</span>
                  <span className="text-xs text-white/40">Balance 23.23 BTC</span>
                </div>
                <input
                  className="mt-4 w-full rounded-xl bg-white/5 px-4 py-3 text-base text-white/90 outline-none transition focus:bg-white/10 focus:ring-2 focus:ring-emerald-300/60"
                  placeholder="7.23502"
                  type="number"
                  step="0.00001"
                />
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">To</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">USDT</span>
                  <span className="text-xs text-white/40">Est. fees $3.12</span>
                </div>
                <input
                  className="mt-4 w-full rounded-xl bg-white/5 px-4 py-3 text-base text-white/90 outline-none transition focus:bg-white/10 focus:ring-2 focus:ring-emerald-300/60"
                  placeholder="24,230.02"
                  type="number"
                  step="0.01"
                />
              </div>
              <div className="lg:col-span-2">
                <button
                  type="button"
                  className="w-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-200 to-emerald-500 px-8 py-3 text-sm font-semibold text-black shadow-[0_0_50px_rgba(134,239,172,0.5)] transition hover:scale-[1.01]"
                >
                  Execute smart swap
                </button>
              </div>
            </form>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Routing</p>
                <p className="mt-3 text-lg font-semibold">Multi-hop + batch</p>
                <p className="mt-2 text-sm text-emerald-200/80">
                  6 venues selected • MEV shield active • Expected slippage 0.06%
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Latency</p>
                <p className="mt-3 text-lg font-semibold">31ms</p>
                <p className="mt-2 text-sm text-emerald-200/80">
                  Synced to prime render pipeline for 3D hero handoff.
                </p>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Top trading pairs</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/50">
                  Spread
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {tradingPairs.map((pair) => (
                  <li
                    key={`${pair.base}${pair.quote}`}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {pair.base}/{pair.quote}
                      </p>
                      <p className="text-[0.7rem] text-white/50">
                        Liquidity {pair.liquidity} • Depth {pair.depth}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-emerald-300">{pair.spread}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent fills</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/50">
                  Live
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {recentTrades.map((trade) => (
                  <li
                    key={`${trade.pair}-${trade.time}`}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{trade.pair}</p>
                      <p className="text-[0.7rem] text-white/50">
                        {trade.size} • {trade.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${
                          trade.side === "Buy" ? "text-emerald-300" : "text-rose-400"
                        }`}
                      >
                        {trade.side}
                      </p>
                      <p className="text-xs text-white/70">{trade.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-emerald-200/40 bg-emerald-400/15 p-6 text-neutral-900 shadow-[0_30px_80px_rgba(134,239,172,0.4)]">
              <h3 className="text-lg font-semibold text-neutral-900">Risk console</h3>
              <ul className="mt-4 space-y-4">
                {riskAlerts.map((alert) => (
                  <li key={alert.title} className="rounded-xl border border-white/40 bg-white/50 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-700/80">
                      {alert.title}
                    </p>
                    <p className="mt-2 text-sm text-neutral-800">{alert.body}</p>
                  </li>
                ))}
              </ul>
              <Link
                href="/portfolio"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-black"
              >
                Review allocations
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}


