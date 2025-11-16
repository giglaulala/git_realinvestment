"use client";

import Link from "next/link";
import { useCallback, type MouseEvent } from "react";
import { UserRound } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { AnimatedHeroHeadline } from "@/components/ui/animated-hero";
import { HeroModelBackdrop } from "@/components/ui/hero-model";
import { Tiles } from "@/components/ui/tiles";
import { useLenis } from "@/components/providers/smooth-scroll";

export default function Home() {
  const lenis = useLenis();
  const { isAuthenticated, logout } = useAuth();

  const handleSmoothScroll = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
      if (!hash.startsWith("#") || !lenis) {
        return;
      }

      const target = document.querySelector(hash);

      if (!(target instanceof HTMLElement)) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
      window.history.replaceState(null, "", hash);
    },
    [lenis]
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Opportunities", href: "#opportunities" },
    { label: "Fees", href: "#fee-structure" },
  ];
  const animatedTitles = [
    "fractional ownership",
    "Georgian rental growth",
    "transparent escrow flows",
    "SPV-backed security",
    "investor-first returns",
  ];

  const featureCards = [
    {
      title: "Sourcing & due diligence",
      description:
        "We partner with Georgian real estate experts to identify high-growth apartments and validate every assumption before a raise.",
      points: [
        "On-the-ground valuation walkthrough",
        "Legal & technical inspection dossier",
        "Projected rental and exit modelling",
      ],
    },
    {
      title: "Legal setup & onboarding",
      description:
        "Each property lives inside its own Georgian SPV (ShPS) so investors purchase equity in a single-asset company with clean governance.",
      points: [
        "SPV incorporation and banking",
        "Mandatory KYC via national ID",
        "Linked personal bank account for payouts",
      ],
    },
    {
      title: "Fundraising window & escrow",
      description:
        "Investors commit during a one-week window. Funds land directly in a licensed escrow account and unlock only when the round succeeds.",
      points: [
        "Direct bank checkout (TBC/Bog)",
        "Segregated escrow accounts",
        "Automatic refunds if targets miss",
      ],
    },
  ];

  const marketMovers = [
    {
      name: "Tbilisi • Vake Vista",
      symbol: "TBI-01",
      icon: "🏙️",
      price: "₾1,150 per 1% share",
      change: "+16% projected IRR",
      volume: "Funding status · 78%",
    },
    {
      name: "Batumi • Seaside Residences",
      symbol: "BTM-02",
      icon: "🌊",
      price: "₾920 per 1% share",
      change: "+14% projected IRR",
      volume: "Funding status · 52%",
    },
    {
      name: "Kutaisi • Riverside Lofts",
      symbol: "KTS-03",
      icon: "🌉",
      price: "₾640 per 1% share",
      change: "+12% projected IRR",
      volume: "Funding status · 34%",
    },
    {
      name: "Tbilisi • Old Town Revival",
      symbol: "TBI-04",
      icon: "🏛️",
      price: "₾1,320 per 1% share",
      change: "+18% projected IRR",
      volume: "Just listed · day 1",
    },
  ];

  const trustSignals = [
    {
      title: "Sourcing fee",
      body: "2-3% one-time fee taken from the total funds raised to cover legal structuring and detailed due diligence.",
    },
    {
      title: "Success fee",
      body: "15-20% of profit only when the SPV sells the property—your capital returns before fees are calculated.",
    },
    {
      title: "Early exit penalty",
      body: "Time-based vesting on profit share: 18% in year 1, 12% in year 2, 6% in year 3—then zero beyond year three.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
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
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 via-lime-300 to-emerald-500 text-base font-semibold text-black shadow-[0_0_40px_rgba(163,255,204,0.6)]">
              RI
            </span>
            <div>
              <p className="text-lg font-semibold tracking-wide">
                Real Investment
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Fractional Real Estate
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <nav className="hidden items-center gap-6 text-sm font-medium text-white/80 md:flex">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  scroll={false}
                  onClick={(event) => handleSmoothScroll(event, item.href)}
                  className="transition hover:text-white hover:drop-shadow-[0_0_12px_rgba(163,255,204,0.7)]"
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  href="/trade"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(163,255,204,0.35)] transition hover:bg-emerald-300"
                >
                  Invest now
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative hidden md:block">
                  <div className="peer flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold text-white/80 transition hover:border-emerald-300/60 hover:text-white">
                    <Link href="/profile" className="absolute inset-0">
                      <span className="sr-only">Profile</span>
                    </Link>
                    <UserRound className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="invisible absolute right-0 z-50 mt-2 w-44 -translate-y-2 rounded-xl border border-white/10 bg-neutral-900 p-2 opacity-0 shadow-xl transition-all duration-300 ease-in-out peer-hover:visible peer-hover:translate-y-0 peer-hover:opacity-100 hover:visible hover:translate-y-0 hover:opacity-100">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                    >
                      <UserRound className="h-4 w-4" aria-hidden="true" />
                      Profile
                    </Link>
                    <Link
                      href="/portfolio"
                      className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded bg-emerald-300/20 text-[0.65rem] font-semibold text-emerald-200">
                        P
                      </span>
                      Portfolio
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-300 transition hover:bg-rose-500/15 hover:text-rose-200"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded bg-rose-500/25 text-[0.65rem] font-semibold text-rose-200">
                        L
                      </span>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(163,255,204,0.35)] transition hover:bg-emerald-300 md:block"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </header>

        <main className="mt-20 flex flex-1 flex-col gap-16">
          <section className="relative min-h-[104vh] px-8 py-20 sm:min-h-[108vh] sm:py-28 lg:py-36">
            <div className="pointer-events-none absolute inset-0">
              <HeroModelBackdrop />
              <div className="absolute inset-x-12 bottom-10 flex justify-end text-xs uppercase tracking-[0.35em] text-white/45">
                Escrow and payouts handled by licensed Georgian banks and law
                firms.
              </div>
            </div>

            <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col pb-2">
              <div className="flex flex-1 items-center justify-center">
                <div className="space-y-6 text-center">
                  <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    <span className="block">
                      Own institutional-grade property with
                    </span>
                    <AnimatedHeroHeadline
                      titles={animatedTitles}
                      className="justify-center"
                      wordClassName="bg-gradient-to-r from-emerald-200 via-lime-200 to-emerald-400 bg-clip-text text-transparent"
                    />
                  </h1>
                </div>
              </div>
            </div>
          </section>

          <section
            id="how-it-works"
            className="rounded-[3rem] border border-white/10 bg-white/5 p-10 shadow-[0_25px_70px_rgba(12,123,89,0.17)] backdrop-blur"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-sm uppercase tracking-[0.4em] text-emerald-200/80">
                  Fundraising & acquisition
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Three guardrails before a single lari moves
                </h2>
                <p className="text-base text-white/70">
                  Each apartment is locked to its own Georgian SPV, investors
                  pass national ID verification, and contributions flow directly
                  into escrow until the raise succeeds. If the goal isn&apos;t
                  met, the bank reverses funds back to every investor
                  automatically.
                </p>
              </div>
              <button
                type="button"
                className="self-start rounded-full border border-white/15 px-6 py-2 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Download diligence sample
              </button>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature) => (
                <article
                  key={feature.title}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-linear-to-br from-white/8 via-neutral-900/70 to-neutral-900/90 p-6 transition duration-300 hover:border-emerald-300/40 hover:shadow-[0_40px_80px_rgba(134,239,172,0.18)]"
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
            id="opportunities"
            className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="self-start rounded-[2.5rem] border border-white/5 bg-white/5 p-7 backdrop-blur">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">
                  Active raises this week
                </h2>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/50">
                  Escrow protected
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {marketMovers.map((asset) => {
                  const positive = asset.change.startsWith("+");
                  return (
                    <div
                      key={asset.symbol}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 transition hover:border-emerald-300/40 hover:bg-black/50"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl">
                          {asset.icon}
                        </span>
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
              <div className="rounded-[2.5rem] border border-white/10 bg-linear-to-br from-white/10 via-neutral-900/80 to-neutral-900/95 p-8 backdrop-blur">
                <h2 className="text-2xl font-semibold text-white">
                  Investment management & exit
                </h2>
                <p className="mt-3 text-sm text-white/70">
                  After funding, the SPV acquires the apartment, rental income
                  is tracked, and your dashboard shows your shareholding—never a
                  wallet balance. Want to exit early? Use the Transfer Board for
                  a peer-to-peer, escrow-managed sale.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                      Dashboard tracking
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      View ownership like “5% in Tbilisi Apt #1 LLC” with rent
                      distributions and documents in one place.
                    </p>
                  </li>
                  <li className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                      Transfer Board
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      Post your shares to interested investors. The same escrow
                      flow moves funds buyer-to-seller and updates the SPV cap
                      table.
                    </p>
                  </li>
                  <li className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
                      Payday event
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      At exit, profits land in the SPV bank account. We deduct
                      the success fee, then distribute principal and gains
                      directly to every linked bank account.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div
              id="fee-structure"
              className="mt-6 rounded-[2.5rem] border border-white/10 bg-emerald-400/20 p-8 text-white shadow-[0_30px_80px_rgba(134,239,172,0.45)] lg:col-span-2 lg:mt-0"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-white/70">
                Fair & transparent fees
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                We win when investors win
              </h3>
              <ul className="mt-4 space-y-4 text-sm text-white/80">
                {trustSignals.map((signal) => (
                  <li
                    key={signal.title}
                    className="rounded-2xl border border-neutral-900/10 bg-white/60 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                      {signal.title}
                    </p>
                    <p className="mt-2">{signal.body}</p>
                  </li>
                ))}
                <li className="rounded-2xl border border-neutral-900/10 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                    Transaction fee
                  </p>
                  <p className="mt-2">
                    Instead of bank withdrawal fees, we charge a flat 5 GEL bank
                    transfer fee on final profit payouts to cover processing.
                  </p>
                </li>
              </ul>
              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-black"
              >
                Download fee schedule
              </button>
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
