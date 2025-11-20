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

      // Set initial states - keep hero elements centered to set up the rift effect
      gsap.set(titleRef.current, {
        left: "50%",
        top: "50%",
        x: "-50%",
        y: "100vh",
        opacity: 0,
      })

      gsap.set(heading, {
        left: "50%",
        top: "50%",
        x: "-50%",
        y: "100vh",
        opacity: 0,
        scale: 0.9,
        lineHeight: "1em",
        transformOrigin: "50% 50%",
      })

      const cards = [
        card1Ref.current,
        card2Ref.current,
        card3Ref.current,
      ].filter(Boolean) as HTMLElement[]

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
          end: "+=450%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          pinSpacing: true,
        },
      })

      // Sequence 1: "What we offer" comes up from below to center
      tl.to(titleRef.current, {
        y: "-50%", // Center it
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      })
        // Sequence 2: Hold the title in center briefly
        .to(titleRef.current, {
          y: "-50%",
          opacity: 1,
          duration: 0.5,
        })
        // Sequence 3: Title exits upward completely
        .to(titleRef.current, {
          top: "-50%",
          y: "-50%", // Keep the transform offset
          opacity: 1, // Stay fully visible while exiting upward
          duration: 1.5,
          ease: "power2.in",
        })
        // Sequence 4: "Three guardrails..." rises and locks to center
        .to(heading, {
          y: "-50%",
          opacity: 1,
          duration: 2.2,
          ease: "power2.out",
        })
        // Sequence 5: Lines separate to form the rift
        .addLabel("schism")
        .to(
          headingLines[0],
          {
            yPercent: -65,
            duration: 1.4,
            ease: "power3.inOut",
          },
          "schism"
        )
        .to(
          headingLines[1],
          {
            yPercent: 65,
            duration: 1.4,
            ease: "power3.inOut",
          },
          "schism"
        )
        .to(
          heading,
          {
            scale: 1.2,
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
            clipPath: "inset(35% 30% 35% 30%)",
            duration: 1.2,
            ease: "power2.inOut",
          },
          "schism+=0.2"
        )
        // Sequence 6: Cards burst through stacked in the center
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
            stagger: 0.15,
            duration: 1.1,
            ease: "power3.out",
          },
          "schism+=0.4"
        )
        // Sequence 7: Heading lines continue splitting and exit while cards emerge
        .to(
          headingLines[0],
          {
            yPercent: -220,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          "schism+=0.7"
        )
        .to(
          headingLines[1],
          {
            yPercent: 220,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          "schism+=0.7"
        )
        .to(
          heading,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
          },
          "schism+=0.9"
        )
        // Sequence 8: Rift fully opens to reveal cards
        .to(cardsContainerRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power2.out",
        })
        // Sequence 9: Cards spread out horizontally
        .addLabel("spread")
        .to(
          card1Ref.current,
          {
            left: "50%",
            x: -420,
            rotation: 0,
            duration: 1.3,
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
            duration: 1.3,
            ease: "power3.inOut",
          },
          "spread"
        )
        .to(
          card3Ref.current,
          {
            left: "50%",
            x: 420,
            rotation: 0,
            duration: 1.3,
            ease: "power3.inOut",
          },
          "spread"
        )
        // Sequence 10: Hold final tableau with cards only
        .to([card1Ref.current, card2Ref.current, card3Ref.current], {
          duration: 1,
        })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Full-Screen Title Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h2
          ref={titleRef}
          className="absolute text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight text-center px-4"
        >
          What we offer
        </h2>
      </div>

      {/* Main Heading - "Three guardrails..." */}
      <h3 className="main-heading absolute text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight text-center px-8 max-w-5xl z-10 leading-tight">
        <span className="heading-line block">Three guardrails</span>
        <span className="heading-line block">before a single lari moves</span>
      </h3>

      {/* Feature Cards Container - for animation */}
      <div
        ref={cardsContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
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
