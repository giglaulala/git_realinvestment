"use client"

import { X, MapPin, TrendingUp, Users, Layers, Building2, Home, Train, Bus, ShoppingBag, Trees, GraduationCap } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { InvestmentOpportunity } from "./investment-opportunity-card"

type ExpandedPropertyViewProps = {
  opportunity: InvestmentOpportunity
  onClose: () => void
}

export function ExpandedPropertyView({ opportunity, onClose }: ExpandedPropertyViewProps) {
  const [shareCount, setShareCount] = useState<string>("1")
  const sharePrice = parseFloat(opportunity.pricePerShare.replace(/[₾,k]/g, ""))
  const totalCost = sharePrice * (parseInt(shareCount) || 0)
  const changePositive = opportunity.priceChange.startsWith("+")

  return (
    <>
      {/* Background overlay */}
      <motion.div
        key="expanded-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.3,
          exit: { duration: 0.05 }
        }}
        className="fixed inset-0 z-40 bg-neutral-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Expanding card container */}
      <motion.div
        layoutId={`property-card-${opportunity.code}`}
        className="fixed inset-4 z-50 overflow-y-auto rounded-[2rem] border border-white/10 bg-neutral-950 sm:inset-6 lg:inset-8"
        style={{ 
          maxWidth: 'none',
          maxHeight: 'none'
        }}
        transition={{
          layout: { duration: 0.4, ease: "easeInOut" },
          exit: { duration: 0.06 }
        }}
      >
        {/* Close button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ 
            delay: 0.4, 
            duration: 0.2,
            exit: { duration: 0.05, delay: 0 }
          }}
          onClick={onClose}
          className="fixed right-6 top-6 z-50 rounded-full border border-white/15 bg-black/60 p-3 text-white backdrop-blur transition hover:border-white/30 hover:bg-black/80 sm:right-10 sm:top-10 lg:right-12 lg:top-12"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16"
        >
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="relative h-[400px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-neutral-800 to-neutral-900 sm:h-[500px]"
        >
          <div className="flex h-full items-center justify-center text-white/40">
            <Home className="h-24 w-24" />
          </div>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="absolute left-6 top-6 rounded-full border border-emerald-300/40 bg-emerald-400/20 px-4 py-2 text-sm font-medium text-emerald-200 backdrop-blur"
          >
            {opportunity.status}
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Column - Property Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4" />
                <span>{opportunity.location}</span>
              </div>
              <h1 className="mt-2 text-4xl font-semibold text-white">
                {opportunity.name}
              </h1>
              <p className="mt-3 text-lg text-white/70">
                {opportunity.description}
              </p>
            </motion.div>

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <h2 className="text-xl font-semibold text-white">Property Details</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <DetailItem icon={Building2} label="Floor" value={opportunity.propertyDetails.floor} />
                <DetailItem icon={Home} label="Total Floors" value={opportunity.propertyDetails.totalFloors} />
                <DetailItem icon={Home} label="Size" value={opportunity.propertyDetails.size} />
                <DetailItem icon={Home} label="Rooms" value={opportunity.propertyDetails.rooms} />
                <DetailItem icon={Home} label="Bathrooms" value={opportunity.propertyDetails.bathrooms} />
                <DetailItem icon={Home} label="Balconies" value={opportunity.propertyDetails.balconies} />
                <DetailItem icon={Home} label="Parking" value={opportunity.propertyDetails.parking} />
                <DetailItem icon={Home} label="Year Built" value={opportunity.propertyDetails.yearBuilt} />
              </div>
            </motion.div>

            {/* Nearby Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <h2 className="text-xl font-semibold text-white">Nearby Amenities</h2>
              <div className="mt-6 space-y-6">
                {opportunity.nearbyAmenities.metro.length > 0 && (
                  <AmenitySection
                    icon={Train}
                    title="Metro Stations"
                    items={opportunity.nearbyAmenities.metro}
                  />
                )}
                {opportunity.nearbyAmenities.busStops.length > 0 && (
                  <AmenitySection
                    icon={Bus}
                    title="Bus Stops"
                    items={opportunity.nearbyAmenities.busStops}
                  />
                )}
                {opportunity.nearbyAmenities.stores.length > 0 && (
                  <AmenitySection
                    icon={ShoppingBag}
                    title="Stores"
                    items={opportunity.nearbyAmenities.stores}
                  />
                )}
                {opportunity.nearbyAmenities.parks.length > 0 && (
                  <AmenitySection
                    icon={Trees}
                    title="Parks"
                    items={opportunity.nearbyAmenities.parks}
                  />
                )}
                {opportunity.nearbyAmenities.schools.length > 0 && (
                  <AmenitySection
                    icon={GraduationCap}
                    title="Schools"
                    items={opportunity.nearbyAmenities.schools}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Investment Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Investment Summary */}
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="text-xl font-semibold text-white">Investment Details</h2>
              
              {/* Price Info */}
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                    Price per share
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {opportunity.pricePerShare}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {changePositive ? (
                      <TrendingUp className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <TrendingUp className="h-4 w-4 rotate-180 text-rose-300" />
                    )}
                    <p className={`text-sm ${changePositive ? "text-emerald-300" : "text-rose-300"}`}>
                      {opportunity.priceChange}
                    </p>
                    <span className="text-sm text-white/50">vs. avg</span>
                  </div>
                </div>

                {/* Stats */}
                {opportunity.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}

                {/* Investor Info */}
                <div className="flex gap-3 text-sm">
                  <div className="flex-1 rounded-xl border border-white/10 bg-black/30 p-3">
                    <Users className="h-4 w-4 text-emerald-200" />
                    <p className="mt-2 font-semibold text-white">
                      {opportunity.investors}
                    </p>
                    <p className="text-xs text-white/60">investors</p>
                  </div>
                  <div className="flex-1 rounded-xl border border-white/10 bg-black/30 p-3">
                    <Layers className="h-4 w-4 text-emerald-200" />
                    <p className="mt-2 font-semibold text-white">
                      {opportunity.availableShares}
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchase Shares */}
              <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                <div>
                  <label htmlFor="share-count" className="text-sm font-medium text-white">
                    Number of shares
                  </label>
                  <input
                    id="share-count"
                    type="number"
                    min="1"
                    max="100"
                    value={shareCount}
                    onChange={(e) => setShareCount(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-emerald-300/60 focus:bg-black/60"
                  />
                </div>

                <div className="rounded-xl bg-emerald-400/10 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                    Total Investment
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-200">
                    ₾{totalCost.toLocaleString()}
                  </p>
                </div>

                <button
                  className="w-full rounded-full bg-emerald-400 px-6 py-3 font-semibold text-white transition hover:bg-emerald-300"
                >
                  Commit to Purchase
                </button>

                <p className="text-center text-xs text-white/50">
                  Funds will be held in escrow until raise closes
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
    </>
  )
}

function DetailItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 text-emerald-300" />
      <div>
        <p className="text-xs text-white/60">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  )
}

function AmenitySection({ icon: Icon, title, items }: { icon: any; title: string; items: Array<{ name: string; distance: string }> }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-white">
        <Icon className="h-5 w-5 text-emerald-300" />
        <h3 className="font-medium">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between text-sm">
            <span className="text-white/80">{item.name}</span>
            <span className="text-white/50">{item.distance}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

