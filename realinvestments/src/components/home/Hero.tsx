"use client";

import { AnimatedHeroHeadline } from "@/components/ui/animated-hero";
import { HeroModelBackdrop } from "@/components/ui/hero-model";

export function Hero() {
  const animatedTitles = [
    "fractional ownership",
    "Georgian rental growth",
    "transparent escrow flows",
    "SPV-backed security",
    "investor-first returns",
  ];

  return (
    <section className="relative min-h-[104vh] px-8 py-20 sm:min-h-[108vh] sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <HeroModelBackdrop />
        <div className="absolute inset-x-12 bottom-10 flex justify-end text-xs uppercase tracking-[0.35em] text-white/45">
          Escrow and payouts handled by licensed Georgian banks and law firms.
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col pb-2">
        <div className="flex flex-1 items-center justify-center">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block">Own institutional-grade property with</span>
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
  );
}
