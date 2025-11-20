"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { LocationModel } from "./LocationModel"
import { useAuth } from "../providers/auth-provider"

export function Location() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const introRef = useRef<HTMLParagraphElement | null>(null)
  const buttonRef = useRef<HTMLAnchorElement | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { isAuthenticated } = useAuth()

  useGSAP(
    () => {
      if (typeof window === "undefined") {
        return
      }

      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) {
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      })

      if (introRef.current) {
        tl.fromTo(
          introRef.current,
          { opacity: 0, y: 110 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.05
        ).to(
          introRef.current,
          { opacity: 0, y: -220, duration: 0.35, ease: "power2.in" },
          0.45
        )
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0.65
        )
      }

      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { opacity: 0, y: 36, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
          },
          0.92
        )
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[100svh] w-screen items-center justify-center overflow-hidden bg-neutral-950"
    >
      <LocationModel progress={scrollProgress} />
      <div className="relative z-10 flex flex-col items-center gap-9 px-6 text-center">
        <p
          ref={introRef}
          className="text-2xl font-semibold uppercase tracking-[0.25em] text-white/80 opacity-0 sm:text-3xl"
        >
          Want to get started?
        </p>
        <div ref={textRef} className="space-y-3 opacity-0">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">
            white square
          </p>
          <p className="text-xs text-white/60">
            Tbilisi, Varketili III Microdistrict, III Block – Shuamta Street #40
          </p>
          <p className="text-xs text-white/50">March 2028</p>
        </div>
        <Link
          ref={buttonRef}
          href={isAuthenticated ? "/trade" : "/login"}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300/90 via-emerald-400/90 to-emerald-500/90 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 opacity-0 shadow-[0_0_35px_rgba(52,211,153,0.45)] transition hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(52,211,153,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
        >
          Start Investing!
        </Link>
      </div>
    </section>
  )
}
