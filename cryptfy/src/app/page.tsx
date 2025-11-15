import Link from "next/link";

import { AnimatedHeroHeadline } from "@/components/ui/animated-hero";
import { Tiles } from "@/components/ui/tiles";

export default function Home() {
  const navLinks = [
    { label: "Trade", href: "/trade" },
    { label: "Portfolio", href: "/portfolio" },
  ];
  const stats = [
    { label: "Avg swap time", value: "1.2s" },
    { label: "Fees saved last 24h", value: "$128K" },
    { label: "Global traders", value: "174K+" },
  ];

  const animatedTitles = [
    "cinematic infrastructure",
    "multi-market precision",
    "3D skyline intelligence",
    "institutional routing",
    "risk-aware execution",
  ];

  const featureCards = [
    {
      title: "Institutional routing",
      description:
        "Tap into 120+ liquidity venues simultaneously to secure best-execution pricing on every swap.",
      points: ["Smart order splitting", "MEV protection", "Instant settlement"],
    },
    {
      title: "Real-time risk engine",
      description:
        "Monitor liquidity, slippage, and volatility in one stream with adaptive thresholds tuned for pro desks.",
      points: [
        "Granular alerts",
        "Programmable safeguards",
        "Audit-ready logs",
      ],
    },
    {
      title: "Unified treasury layer",
      description:
        "Automate funding flows with multi-sig vaults, scheduled rebalancing, and fiat on/off ramps.",
      points: [
        "Multi-entrant controls",
        "Gas abstraction",
        "Cross-chain batching",
      ],
    },
  ];

  const marketMovers = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$7,235.02",
      change: "+3.24%",
      volume: "$23.4B",
    },
    {
      name: "Ether",
      symbol: "ETH",
      price: "$3,482.11",
      change: "+1.87%",
      volume: "$14.6B",
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$182.45",
      change: "+5.32%",
      volume: "$5.2B",
    },
    {
      name: "Aptos",
      symbol: "APT",
      price: "$13.08",
      change: "-2.14%",
      volume: "$1.8B",
    },
  ];

  const trustSignals = [
    {
      title: "Regulated coverage",
      body: "Custody segregated under SOC 2 and ISO 27001 frameworks with 24/7 coverage.",
    },
    {
      title: "Transparent pricing",
      body: "Fee-as-a-service model keeps execution costs predictable across all venues.",
    },
    {
      title: "Plug-and-trade",
      body: "SDKs across JS, Rust, and Python get you trading programmatically in minutes.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-12 h-[20rem] w-[20rem] rounded-full bg-emerald-500/30 blur-[160px]" />
        <div className="absolute -left-32 top-[42rem] h-[24rem] w-[24rem] rounded-full bg-lime-400/25 blur-[160px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute inset-0 opacity-45 [--tile:rgba(213,255,236,0.85)]">
          <Tiles
            rows={120}
            cols={36}
            tileSize="sm"
            tileClassName="border-white/20 dark:border-white/10"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-24 pt-8 sm:px-10 lg:px-16">
        <header className="flex flex-wrap items-center justify-between gap-6 rounded-full border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-lime-300 to-emerald-500 text-base font-semibold text-black shadow-[0_0_40px_rgba(163,255,204,0.6)]">
              RI
            </span>
            <div>
              <p className="text-lg font-semibold tracking-wide">
                Real Investment
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Trading Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <nav className="hidden items-center gap-6 text-sm font-medium text-white/80 md:flex">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-white hover:drop-shadow-[0_0_12px_rgba(163,255,204,0.7)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold text-white/80 transition hover:border-emerald-300/60 hover:text-white md:flex"
              >
                <span className="sr-only">Profile</span>
                <span className="text-xs uppercase tracking-[0.3em]">ID</span>
              </Link>
              <Link
                href="/login"
                className="hidden rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white md:block"
              >
                Login
              </Link>
            </div>
          </div>
        </header>

        <main className="mt-20 flex flex-1 flex-col gap-16">
          <section className="relative overflow-hidden px-8 py-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-[-25%] h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[220px]" />
              <div className="absolute left-1/2 top-[35%] h-[38rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-[7rem] bg-gradient-to-br from-emerald-400/25 via-neutral-900/30 to-transparent blur-[40px]" />
              <div className="absolute inset-x-12 bottom-10 flex justify-end text-xs uppercase tracking-[0.35em] text-white/45">
                Immersive 3D skyline hero coming soon – drop your glTF assets to
                activate the cinematic reveal.
              </div>
            </div>

            <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12">
              <div className="space-y-8">
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.45em] text-emerald-200/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    Real-time execution rail
                  </div>
                </div>

                <div className="space-y-6 text-center">
                  <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    <span className="block">High-speed swaps with</span>
                    <AnimatedHeroHeadline
                      titles={animatedTitles}
                      className="justify-center"
                      wordClassName="bg-gradient-to-r from-emerald-200 via-lime-200 to-emerald-400 bg-clip-text text-transparent"
                    />
                  </h1>
                  <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                    Real Investment orchestrates 3D market visualisations,
                    automated routing, and latency-aware liquidity so you can
                    move size instantly—without overpaying on gas or slippage.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/trade"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-400/90 px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(134,239,172,0.5)] transition hover:bg-emerald-300"
                  >
                    Launch Terminal
                  </Link>
                  <Link
                    href="#execution-core"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/50 hover:text-white"
                  >
                    Explore protocol
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center shadow-[0_20px_60px_rgba(15,185,128,0.08)]"
                  >
                    <p className="text-2xl font-semibold tracking-tight text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="execution-core"
            className="rounded-[3rem] border border-white/10 bg-white/5 p-10 shadow-[0_25px_70px_rgba(12,123,89,0.17)] backdrop-blur"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-sm uppercase tracking-[0.4em] text-emerald-200/80">
                  Execution core
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Anchor your desk with modular liquidity primitives
                </h2>
                <p className="text-base text-white/70">
                  Each block can be deployed independently or bundled into your
                  existing infrastructure using our command line toolkit and
                  API-level webhooks.
                </p>
              </div>
              <button
                type="button"
                className="self-start rounded-full border border-white/15 px-6 py-2 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
              >
                View docs
              </button>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature) => (
                <article
                  key={feature.title}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-neutral-900/70 to-neutral-900/90 p-6 transition duration-300 hover:border-emerald-300/40 hover:shadow-[0_40px_80px_rgba(134,239,172,0.18)]"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {feature.description}
                    </p>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm text-emerald-200/90">
                    {feature.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-left"
                      >
                        <span className="h-1.5 w-6 rounded-full bg-emerald-300/70 transition group-hover:w-8" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section
            id="community"
            className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="rounded-[3rem] border border-white/5 bg-white/5 p-8 backdrop-blur">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">
                  Market flight deck
                </h2>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/50">
                  Live feed
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {marketMovers.map((asset) => {
                  const positive = asset.change.startsWith("+");
                  return (
                    <div
                      key={asset.symbol}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-5 py-4 transition hover:border-emerald-300/40 hover:bg-black/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/30 to-emerald-500/30 text-base font-semibold text-emerald-100">
                          {asset.symbol}
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white">
                            {asset.name}
                          </p>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                            Total volume {asset.volume}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">
                          {asset.price}
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            positive ? "text-emerald-300" : "text-rose-400"
                          }`}
                        >
                          {asset.change}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 via-neutral-900/80 to-neutral-900/95 p-8 backdrop-blur">
                <h2 className="text-2xl font-semibold text-white">
                  Why desks choose Real Investment
                </h2>
                <p className="mt-3 text-sm text-white/70">
                  Built with a cinema-grade 3D hero for live events and investor
                  demos, backed by real execution muscle for pro trading teams.
                </p>
                <ul className="mt-6 space-y-4">
                  {trustSignals.map((signal) => (
                    <li
                      key={signal.title}
                      className="rounded-2xl border border-white/10 bg-black/30 p-5"
                    >
                      <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                        {signal.title}
                      </p>
                      <p className="mt-2 text-sm text-white/70">
                        {signal.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2.5rem] border border-white/10 bg-emerald-400/20 p-8 text-neutral-900 shadow-[0_30px_80px_rgba(134,239,172,0.45)]">
                <p className="text-sm uppercase tracking-[0.4em] text-neutral-900/70">
                  Launch partner program
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-neutral-900">
                  Bring your skyline to life
                </h3>
                <p className="mt-2 text-sm text-neutral-900/70">
                  Submit your 3D assets and we will stage them within the hero
                  module, complete with volumetric lighting presets and camera
                  paths.
                </p>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-black"
                >
                  Request staging session
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-20 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-sm text-white/60 backdrop-blur md:flex-row">
          <p>
            © {new Date().getFullYear()} Real Investment Group. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-white">
              Status
            </a>
            <a href="#" className="transition hover:text-white">
              Security
            </a>
            <a href="#" className="transition hover:text-white">
              Careers
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
