import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ActiveRaises() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elements = gsap.utils.toArray(".animate-item");

      if (elements.length > 0) {
        gsap.set(elements, { y: 50, opacity: 0 });

        gsap.to(elements, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
      }
    },
    { scope: containerRef }
  );

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

  return (
    <div ref={containerRef} className="self-start rounded-[2.5rem] border border-white/5 bg-white/5 p-7 backdrop-blur">
      <div className="flex items-center justify-between animate-item">
        <h2 className="text-xl font-semibold text-white">
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
              className="animate-item flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 transition hover:border-emerald-300/40 hover:bg-black/50"
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
  );
}
