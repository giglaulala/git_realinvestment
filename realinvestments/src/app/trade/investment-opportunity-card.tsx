"use client"

import Link from "next/link";
import {
  Layers,
  Maximize2,
  TrendingDown,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

export type InvestmentStat = {
  label: string;
  value: string;
};

export type InvestmentOpportunity = {
  code: string;
  name: string;
  location: string;
  status: string;
  daysUntilClose: number;
  pricePerShare: string;
  priceChange: string;
  avgPrice: string;
  winnings: string;
  investors: number;
  availableShares: string;
  stats: InvestmentStat[];
  // Detailed property info
  propertyDetails: {
    floor: string;
    totalFloors: string;
    size: string;
    rooms: string;
    bathrooms: string;
    balconies: string;
    parking: string;
    yearBuilt: string;
    condition: string;
  };
  nearbyAmenities: {
    metro: Array<{ name: string; distance: string }>;
    busStops: Array<{ name: string; distance: string }>;
    stores: Array<{ name: string; distance: string }>;
    parks: Array<{ name: string; distance: string }>;
    schools: Array<{ name: string; distance: string }>;
  };
  images: string[];
  description: string;
};

type InvestmentOpportunityCardProps = {
  opportunity: InvestmentOpportunity;
  className?: string;
  onExpand?: () => void;
};

export function InvestmentOpportunityCard({
  opportunity,
  className,
  onExpand,
}: InvestmentOpportunityCardProps) {
  const changePositive = opportunity.priceChange.startsWith("+");

  return (
    <motion.article
      layoutId={`property-card-${opportunity.code}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{
        duration: 0.3,
        layout: { duration: 0.4, ease: "easeInOut" as const },
      }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-white/10 via-neutral-900/80 to-neutral-900/95 p-6 shadow-[0_10px_30px_rgba(15,118,110,0.15)] transition duration-300 hover:border-emerald-300/50 hover:shadow-[0_15px_40px_rgba(134,239,172,0.2)] ${className ?? ""}`}
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-400/5 blur-[120px] transition group-hover:scale-125" />
      <div className="absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-lime-300/5 blur-[120px] transition group-hover:scale-110" />
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
          <motion.button
            onClick={onExpand}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-emerald-300"
          >
            Expand
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

