"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { useAuth } from "@/components/providers/auth-provider";
import { Tiles } from "@/components/ui/tiles";

const dashboardStats = [
  {
    title: "Escrow commitments",
    value: "₾128,400",
    meta: "Across 3 open raises this week",
  },
  {
    title: "Total equity value",
    value: "₾15,710",
    meta: "Across 4 positions",
  },
];

const fundingPeriodHoldings = [
  {
    name: "Vake Vista SPV",
    stake: "5% equity • ₾5,750",
    fundingPercent: 78,
    daysLeft: 3,
  },
  {
    name: "Saburtalo Heights",
    stake: "1.5% equity • ₾1,920",
    fundingPercent: 65,
    daysLeft: 2,
  },
];

const ownedHoldings = [
  {
    name: "Batumi Seaside",
    stake: "3% equity • ₾2,760",
    nextEvent: "Sale pending · 22 Dec",
  },
  {
    name: "Old Town Revival",
    stake: "4% equity • ₾5,280",
    nextEvent: "Sale pending · 15 Dec",
  },
];

const payoutSchedule = [
  {
    title: "Sale completion · Vake Vista",
    date: "12 Dec",
    detail: "₾5,750 to TBC",
  },
  {
    title: "Sale completion · Batumi",
    date: "22 Dec",
    detail: "₾2,760 to TBC",
  },
  {
    title: "Sale completion · Old Town",
    date: "15 Dec",
    detail: "₾5,280 to TBC",
  },
];

const stockPerformance = [
  {
    label: "Vake Vista",
    latest: "₾1,150",
    change: "+3.4%",
    series: [920, 980, 1010, 1080, 1130, 1150],
  },
  {
    label: "Batumi Residences",
    latest: "₾920",
    change: "+1.2%",
    series: [870, 860, 880, 900, 910, 920],
  },
  {
    label: "Kutaisi Riverside",
    latest: "₾640",
    change: "-0.8%",
    series: [660, 655, 652, 648, 646, 640],
  },
  {
    label: "Old Town Revival",
    latest: "₾1,320",
    change: "+5.2%",
    series: [1200, 1220, 1250, 1280, 1300, 1320],
  },
  {
    label: "Saburtalo Heights",
    latest: "₾1,280",
    change: "+2.1%",
    series: [1180, 1200, 1210, 1230, 1250, 1280],
  },
];

const sparklinePoints = (series: number[]) => {
  if (series.length <= 1) {
    return "";
  }

  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;

  return series
    .map((value, index) => {
      const x = (index / (series.length - 1)) * 100;
      const y = 40 - ((value - min) / range) * 40;
      return `${x},${y}`;
    })
    .join(" ");
};

// Floating animation variants
const floatingVariants = {
  float1: {
    y: [0, -8, 0],
    x: [0, 3, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  float2: {
    y: [0, -10, 0],
    x: [0, -4, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  float3: {
    y: [0, -6, 0],
    x: [0, 5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  float4: {
    y: [0, -9, 0],
    x: [0, -3, 0],
    transition: {
      duration: 7.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const [sellOrders, setSellOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  const handleOpenSellOrder = (holdingName: string) => {
    setSellOrders((prev) => {
      const next = new Set(prev);
      next.add(holdingName);
      return next;
    });
    // TODO: Navigate to sell order page or open modal
    router.push(`/trade?sell=${encodeURIComponent(holdingName)}`);
  };

  const investorName = useMemo(
    () => user?.name?.split(" ")?.[0] ?? "Investor",
    [user]
  );
  const investorInitials = useMemo(() => {
    if (!user?.name) return "RI";
    return user.name
      .split(" ")
      .map((segment) => segment.charAt(0)?.toUpperCase())
      .slice(0, 2)
      .join("");
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        <p className="text-sm text-white/70">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 opacity-45 [--tile:rgba(213,255,236,0.6)]">
          <Tiles
            rows={120}
            cols={36}
            tileSize="sm"
            tileClassName="border-white/15 dark:border-white/5"
          />
        </div>
        <div className="absolute left-[-8%] top-16 h-64 w-64 rounded-full bg-emerald-300/10 blur-[140px]" />
        <div className="absolute right-[-12%] bottom-10 h-72 w-72 rounded-full bg-lime-300/10 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 pb-4 pt-4 sm:px-8 lg:px-10">
        <motion.header
          className="flex flex-col gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur md:flex-row md:items-center md:justify-between"
          animate="float1"
          variants={floatingVariants}
          whileHover={{ y: 0, x: 0 }}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-emerald-300 via-lime-200 to-emerald-400 text-sm font-semibold text-black shadow-[0_0_40px_rgba(134,239,172,0.45)]">
              {investorInitials}
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                Investor dashboard
              </p>
              <h1 className="text-lg font-semibold text-white">
                Welcome back, {investorName}
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/trade"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-3.5 py-1.5 text-xs font-semibold text-black shadow-[0_0_30px_rgba(134,239,172,0.35)] transition hover:bg-emerald-300"
            >
              Commit capital
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Logout
            </button>
          </div>
        </motion.header>

        <div className="flex flex-col gap-3">
          <motion.section
            className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur"
            animate="float2"
            variants={floatingVariants}
            whileHover={{ y: 0, x: 0 }}
          >
            <div className="grid grid-cols-2 gap-2.5">
              {dashboardStats.map((stat, index) => (
                <motion.article
                  key={stat.title}
                  className="rounded-lg border border-white/10 bg-black/20 p-2.5 shadow-[0_10px_35px_rgba(5,150,105,0.2)]"
                  animate={{
                    y: [0, index === 0 ? -5 : -7, 0],
                    x: [0, index === 0 ? 2 : -2, 0],
                  }}
                  transition={{
                    duration: index === 0 ? 5.5 : 6.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ y: 0, x: 0 }}
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
                    {stat.title}
                  </p>
                  <p className="mt-1.5 text-base font-semibold text-white">{stat.value}</p>
                  <p className="mt-0.5 text-[0.7rem] text-white/70">{stat.meta}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <div className="grid grid-cols-12 gap-3">
            <motion.div
              className="col-span-12 flex flex-col rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur lg:col-span-4"
              animate="float3"
              variants={floatingVariants}
              whileHover={{ y: 0, x: 0 }}
            >
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-emerald-200/80">
                <Sparkles className="h-3 w-3 text-emerald-200" />
                Market signals
              </div>
              <div className="mt-3 space-y-2.5">
                {stockPerformance.map((asset) => {
                  const positive = asset.change.startsWith("+");
                  return (
                    <div
                      key={asset.label}
                      className="rounded-lg border border-white/10 bg-black/30 p-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/70">{asset.label}</p>
                          <p className="text-sm font-semibold text-white">{asset.latest}</p>
                        </div>
                        <span
                          className={`text-[0.7rem] font-semibold ${
                            positive ? "text-emerald-200" : "text-rose-300"
                          }`}
                        >
                          {asset.change}
                        </span>
                      </div>
                      <svg
                        viewBox="0 0 100 40"
                        className="mt-1.5 h-7 w-full text-emerald-300"
                        preserveAspectRatio="none"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={sparklinePoints(asset.series)}
                        />
                      </svg>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="col-span-12 flex flex-col rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur lg:col-span-5"
              animate="float1"
              variants={floatingVariants}
              whileHover={{ y: 0, x: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-emerald-200/80">
                    Holdings snapshot
                  </p>
                  <h2 className="mt-0.5 text-base font-semibold text-white">
                    Equity positions
                  </h2>
                </div>
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.25em] text-white/50">
                  Live
                </span>
              </div>
              <div className="mt-3 space-y-4">
                <div>
                  <h3 className="mb-2 text-xs font-semibold text-white/80">Funding period</h3>
                  <div className="space-y-2">
                    {fundingPeriodHoldings.map((holding) => (
                      <div
                        key={holding.name}
                        className="relative rounded-lg border border-white/10 bg-black/30 p-2.5 transition hover:border-emerald-300/40 hover:bg-black/50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white">{holding.name}</p>
                            <p className="text-[0.7rem] text-white/60">{holding.stake}</p>
                          </div>
                          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.25em] text-white/60">
                            {holding.fundingPercent}% funded
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between">
                          <p className="text-[0.7rem] text-emerald-200/90">
                            {holding.daysLeft} days left
                          </p>
                          <button
                            type="button"
                            onClick={() => handleOpenSellOrder(holding.name)}
                            className="flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2 py-1 text-[0.65rem] font-semibold text-emerald-200 transition hover:border-emerald-300/60 hover:bg-emerald-400/20"
                          >
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                            Sell
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-semibold text-white/80">Owned by funders</h3>
                  <div className="space-y-2">
                    {ownedHoldings.map((holding) => (
                      <div
                        key={holding.name}
                        className="relative rounded-lg border border-white/10 bg-black/30 p-2.5 transition hover:border-emerald-300/40 hover:bg-black/50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white">{holding.name}</p>
                            <p className="text-[0.7rem] text-white/60">{holding.stake}</p>
                          </div>
                          <span className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.25em] text-emerald-200/80">
                            100% funded
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between">
                          <p className="text-[0.7rem] text-emerald-200/90">{holding.nextEvent}</p>
                          <button
                            type="button"
                            onClick={() => handleOpenSellOrder(holding.name)}
                            className="ml-2 flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2 py-1 text-[0.65rem] font-semibold text-emerald-200 transition hover:border-emerald-300/60 hover:bg-emerald-400/20"
                          >
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                            Sell
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-span-12 flex flex-col lg:col-span-3"
              animate="float4"
              variants={floatingVariants}
              whileHover={{ y: 0, x: 0 }}
            >
              <div className="flex flex-col rounded-lg border border-white/10 bg-neutral-900/70 p-4">
                <h3 className="text-xs font-semibold text-white">Upcoming sales</h3>
                <ul className="mt-3 space-y-2 text-xs">
                  {payoutSchedule.map((payout) => (
                    <li
                      key={payout.title}
                      className="rounded-lg border border-white/10 bg-black/30 p-2"
                    >
                      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-emerald-200/80">
                        {payout.date}
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-white">{payout.title}</p>
                      <p className="text-[0.7rem] text-white/60">{payout.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

