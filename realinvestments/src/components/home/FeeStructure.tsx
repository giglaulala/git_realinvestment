import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function FeeStructure() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const elements = gsap.utils.toArray(".fee-animate")

      if (!elements.length) return

      gsap.set(elements, { y: 40, opacity: 0 })

      gsap.to(elements, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      })
    },
    { scope: containerRef }
  )

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
  ]

  return (
    <div
      ref={containerRef}
      id="fee-structure"
      className="mt-6 rounded-[2.5rem] border border-white/10 bg-emerald-400/20 p-8 text-white shadow-[0_30px_80px_rgba(134,239,172,0.45)] lg:col-span-2 lg:mt-0 overflow-hidden"
    >
      <p className="fee-animate text-sm uppercase tracking-[0.4em] text-white/70">
        Fair & transparent fees
      </p>
      <h3 className="fee-animate mt-3 text-2xl font-semibold text-white">
        We win when investors win
      </h3>
      <ul className="mt-4 space-y-4 text-sm text-white/80">
        {trustSignals.map((signal) => (
          <li
            key={signal.title}
            className="fee-animate rounded-2xl border border-neutral-900/10 bg-black/15 p-4"
          >
            <p className="text-s uppercase tracking-[0.3em] text-white/70 font-bold">
              {signal.title}
            </p>
            <p className="mt-2 text-white/75">{signal.body}</p>
          </li>
        ))}
        <li className="fee-animate rounded-2xl border border-neutral-900/10 bg-black/15 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Transaction fee
          </p>
          <p className="mt-2 text-white/75">
            Instead of bank withdrawal fees, we charge a flat 5 GEL bank
            transfer fee on final profit payouts to cover processing.
          </p>
        </li>
      </ul>
      <button
        type="button"
        className="fee-animate mt-6 inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-black"
      >
        Download fee schedule
      </button>
    </div>
  )
}
