import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function InvestmentManagement() {
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

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="rounded-[2.5rem] border border-white/10 bg-linear-to-br from-white/10 via-neutral-900/80 to-neutral-900/95 p-8 backdrop-blur">
        <h2 className="animate-item text-2xl font-semibold text-white">
          Investment management & exit
        </h2>
        <p className="animate-item mt-3 text-sm text-white/70">
          After funding, the SPV acquires the apartment, rental income is
          tracked, and your dashboard shows your shareholding—never a wallet
          balance. Want to exit early? Use the Transfer Board for a
          peer-to-peer, escrow-managed sale.
        </p>
        <ul className="mt-6 space-y-4">
          <li className="animate-item rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
              Dashboard tracking
            </p>
            <p className="mt-2 text-sm text-white/70">
              View ownership like “5% in Tbilisi Apt #1 LLC” with rent
              distributions and documents in one place.
            </p>
          </li>
          <li className="animate-item rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
              Transfer Board
            </p>
            <p className="mt-2 text-sm text-white/70">
              Post your shares to interested investors. The same escrow flow
              moves funds buyer-to-seller and updates the SPV cap table.
            </p>
          </li>
          <li className="animate-item rounded-2xl border border-white/10 bg-black/30 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
              Payday event
            </p>
            <p className="mt-2 text-sm text-white/70">
              At exit, profits land in the SPV bank account. We deduct the
              success fee, then distribute principal and gains directly to
              every linked bank account.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
