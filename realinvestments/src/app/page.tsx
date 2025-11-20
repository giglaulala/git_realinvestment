"use client"

import { Tiles } from "@/components/ui/tiles"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AlternativeHero } from "@/components/home/AlternativeHero"
import { HowItWorks } from "@/components/home/HowItWorks"
import { Opportunities } from "@/components/home/Opportunities"
import { Location } from "@/components/home/Location"

export default function Home() {
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

      <Header />

      <AlternativeHero />

      <HowItWorks />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pb-24 sm:px-10 lg:px-16">
        <main className="flex flex-1 flex-col gap-16">
          <Opportunities />
        </main>
      </div>

      <Location />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pb-24 sm:px-10 lg:px-16">
        <Footer />
      </div>
    </div>
  )
}
