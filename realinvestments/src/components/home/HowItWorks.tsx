"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FeatureCard } from "./FeatureCard"

gsap.registerPlugin(ScrollTrigger)

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const card1Ref = useRef<HTMLElement>(null)
  const card2Ref = useRef<HTMLElement>(null)
  const card3Ref = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

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
  ]

  useGSAP(
    () => {
      if (!titleRef.current) return

      const heading = containerRef.current?.querySelector(
        ".main-heading"
      ) as HTMLElement
      const headingLines = Array.from(
        heading?.querySelectorAll(".heading-line") ?? []
      ) as HTMLElement[]
      if (!heading || headingLines.length < 2) return

      const cards = [
        card1Ref.current,
        card2Ref.current,
        card3Ref.current,
      ].filter(Boolean) as HTMLElement[]

      const setupTimeline = (isMobile: boolean) => {
        const introYOffset = isMobile ? "85vh" : "100vh"
        // Visually center content accounting for the fixed header height:
        // nudge the "center" up a bit so it looks centered in the
        // remaining viewport below the header.
        const visualCenterTop = isMobile ? "48%" : "47%"
        const headingScale = isMobile ? 1.05 : 1.2
        const riftInset = isMobile
          ? "inset(45% 35% 45% 35%)"
          : "inset(35% 30% 35% 30%)"
        // Shorten the total pinned scroll distance so later phases
        // (especially the second phase) start sooner and there is
        // less “empty” scroll time between moments.
        const endDistance = isMobile ? "+=220%" : "+=320%"
        const spreadOffset = isMobile ? 140 : 420
        const scrubValue = isMobile ? 0.6 : 1

        gsap.set(titleRef.current, {
          left: "50%",
          top: visualCenterTop,
          x: "-50%",
          y: introYOffset,
          opacity: 0,
        })

        gsap.set(heading, {
          left: "50%",
          top: visualCenterTop,
          x: "-50%",
          y: introYOffset,
          opacity: 0,
          scale: 0.9,
          lineHeight: "1em",
          transformOrigin: "50% 50%",
        })

        if (cards.length) {
          gsap.set(cards, {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0.85,
          })

          gsap.set(card1Ref.current, { rotation: -8 })
          gsap.set(card2Ref.current, { rotation: 4 })
          gsap.set(card3Ref.current, { rotation: -5 })
        }

        if (cardsContainerRef.current) {
          gsap.set(cardsContainerRef.current, {
            clipPath: "inset(50% 45% 50% 45%)",
            opacity: 0,
            filter: "drop-shadow(0 0 20px rgba(255,255,255,0.25))",
          })
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: endDistance,
            pin: true,
            scrub: scrubValue,
            anticipatePin: 1,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        })

        // Phase 1 → 2: make the title and main heading feel like
        // one continuous motion by overlapping their animations and
        // removing the static “hold” segment.
        tl.to(titleRef.current, {
          y: "-50%",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        })
          .to(titleRef.current, {
            top: "-50%",
            y: "-50%",
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
          })
          .to(
            heading,
            {
              y: "-50%",
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            "<0.25" // start shortly after the title begins moving up
          )
          .addLabel("schism")
          .to(
            headingLines[0],
            {
              yPercent: -65,
              duration: 1.2,
              ease: "power3.inOut",
            },
            "schism"
          )
          .to(
            headingLines[1],
            {
              yPercent: 65,
              duration: 1.2,
              ease: "power3.inOut",
            },
            "schism"
          )
          .to(
            heading,
            {
              scale: headingScale,
              letterSpacing: "-0.01em",
              duration: 1.2,
              ease: "power2.inOut",
            },
            "schism"
          )
          .to(
            cardsContainerRef.current,
            {
              opacity: 1,
              clipPath: riftInset,
              duration: 1.1,
              ease: "power2.inOut",
            },
            "schism+=0.2"
          )
          .fromTo(
            cards,
            {
              yPercent: 30,
              scale: 0.85,
              opacity: 0,
            },
            {
              yPercent: -50,
              scale: 1,
              opacity: 1,
              stagger: 0.12,
              duration: 1,
              ease: "power3.out",
            },
            "schism+=0.35"
          )
          .to(
            headingLines[0],
            {
              yPercent: -220,
              opacity: 0,
              duration: 1,
              ease: "power2.in",
            },
            "schism+=0.6"
          )
          .to(
            headingLines[1],
            {
              yPercent: 220,
              opacity: 0,
              duration: 1,
              ease: "power2.in",
            },
            "schism+=0.6"
          )
          .to(
            heading,
            {
              opacity: 0,
              duration: 0.7,
              ease: "power2.in",
            },
            "schism+=0.8"
          )
          .to(cardsContainerRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power2.out",
          })
          .addLabel("spread")
          .to(
            card1Ref.current,
            {
              left: "50%",
              x: -spreadOffset,
              rotation: 0,
              duration: 1,
              ease: "power3.inOut",
            },
            "spread"
          )
          .to(
            card2Ref.current,
            {
              left: "50%",
              x: 0,
              rotation: 0,
              duration: 1,
              ease: "power3.inOut",
            },
            "spread"
          )
          .to(
            card3Ref.current,
            {
              left: "50%",
              x: spreadOffset,
              rotation: 0,
              duration: 1,
              ease: "power3.inOut",
            },
            "spread"
          )
          .to([card1Ref.current, card2Ref.current, card3Ref.current], {
            duration: 0.8,
          })

        return () => {
          tl.kill()
        }
      }

      const mm = gsap.matchMedia()
      mm.add("(max-width: 1023px)", () => setupTimeline(true))
      mm.add("(min-width: 1024px)", () => setupTimeline(false))

      return () => {
        mm.revert()
      }
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="relative flex w-full min-h-[120svh] items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-16 sm:min-h-[120dvh] md:h-screen md:px-0 md:py-0"
    >
      {/* Full-Screen Title Container */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h2
          ref={titleRef}
          className="absolute px-4 text-center text-[clamp(2.5rem,8vw,5.5rem)] font-bold tracking-tight text-white md:text-8xl lg:text-9xl"
        >
          What we offer
        </h2>
      </div>

      {/* Main Heading - "Three guardrails..." */}
      <h3 className="main-heading absolute z-10 max-w-5xl px-4 text-center text-[clamp(2.25rem,7vw,4.5rem)] font-bold leading-tight tracking-tight text-white sm:px-8 md:text-7xl lg:text-8xl">
        <span className="heading-line block">Three guardrails</span>
        <span className="heading-line block">before a single lari moves</span>
      </h3>

      {/* Feature Cards Container - for animation */}
      <div
        ref={cardsContainerRef}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 px-4 md:flex-row md:gap-12"
      >
        <FeatureCard
          ref={card1Ref}
          title={featureCards[0].title}
          description={featureCards[0].description}
          points={featureCards[0].points}
        />
        <FeatureCard
          ref={card2Ref}
          title={featureCards[1].title}
          description={featureCards[1].description}
          points={featureCards[1].points}
        />
        <FeatureCard
          ref={card3Ref}
          title={featureCards[2].title}
          description={featureCards[2].description}
          points={featureCards[2].points}
        />
      </div>
    </div>
  )
}
