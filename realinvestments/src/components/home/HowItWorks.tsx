"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeatureCard } from "./FeatureCard";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const card1Ref = useRef<HTMLElement>(null);
  const card2Ref = useRef<HTMLElement>(null);
  const card3Ref = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

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
  ];

  useGSAP(
    () => {
      if (!titleRef.current) return;

      const heading = containerRef.current?.querySelector('.main-heading') as HTMLElement;
      const paragraph = containerRef.current?.querySelector('.main-paragraph') as HTMLElement;
      if (!heading || !paragraph) return;

      // Set initial states - position elements at center first, then move them offscreen
      gsap.set(titleRef.current, { 
        left: "50%", 
        top: "50%", 
        x: "-50%", 
        y: "100vh", 
        opacity: 0 
      });
      
      gsap.set(heading, { 
        left: "50%", 
        top: "50%", 
        x: "-50%", 
        y: "100vh", 
        opacity: 0 
      });
      
      gsap.set(paragraph, { 
        left: "50%", 
        top: "50%", 
        x: "-50%", 
        y: "100vh", 
        opacity: 0, 
        lineHeight: "3em" 
      });
      

      
      // Set initial states for cards - all centered with different rotations
      if (card1Ref.current && card2Ref.current && card3Ref.current) {
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "100vh",
          opacity: 0,
        });
        gsap.set(card1Ref.current, { rotation: -8 });
        gsap.set(card2Ref.current, { rotation: 3 });
        gsap.set(card3Ref.current, { rotation: -5 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Extended for more animation sequences
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          pinSpacing: true,
        },
      });

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
        // Sequence 4: "Three guardrails..." comes up from below (BIG)
        .to(heading, {
          y: "-50%", // Center it
          opacity: 1,
          duration: 2,
          ease: "power2.out",
        })
        // Sequence 5: Hold it briefly
        .to(heading, {
          duration: 0.5,
        })
        // Sequence 6: Heading shrinks and moves to top-left
        .to(heading, {
          fontSize: "2.5rem",
          top: "10%",
          left: "8%",
          x: 0, // Clear transform
          y: 0, // Clear transform
          duration: 2,
          ease: "power2.inOut",
        })
        // Sequence 7: Hold before paragraph appears
        .to(heading, {
          duration: 0.5,
        })
        // Sequence 8: Paragraph comes up with large line-height, aligned with heading
        .to(paragraph, {
          top: "35vh",
          left: "8%",
          x: 0, // Clear transform
          y: 0, // Clear transform
          opacity: 1,
          duration: 2,
          ease: "power2.out",
        })
        // Sequence 9: Compress line-height to normal and move UP closer to heading
        .to(paragraph, {
          lineHeight: "1.6em",
          top: "25vh",
          duration: 2,
          ease: "power2.inOut",
        })
        // Sequence 10: Hold the final state briefly
        .to(paragraph, {
          duration: 1,
        })
        // Sequence 11: Scroll heading and paragraph up and out of view
        .to([heading, paragraph], {
          y: "-100vh",
          opacity: 0,
          duration: 2,
          ease: "power2.inOut",
        })
        // Sequence 12: Cards enter from bottom, stacked on top of each other with rotations
        .to([card1Ref.current, card2Ref.current, card3Ref.current], {
          y: "-50%", // Center them
          opacity: 1,
          duration: 2,
          ease: "power2.out",
        })
        // Sequence 13: Hold cards stacked briefly
        .to([card1Ref.current, card2Ref.current, card3Ref.current], {
          duration: 0.5,
        })
        // Sequence 14: Spread cards out evenly and zero their rotations
        .to(card1Ref.current, {
          left: "50%",
          x: -550, // Move left from center (half card width + gap)
          rotation: 0,
          opacity: 1,
          duration: 2.5,
          ease: "power2.inOut",
        }, "spread")
        .to(card2Ref.current, {
          left: "50%",
          x: -175, // Center (half of card width)
          rotation: 0,
          opacity: 1,
          duration: 2.5,
          ease: "power2.inOut",
        }, "spread")
        .to(card3Ref.current, {
          left: "50%",
          x: 200, // Move right from center (half card width + gap)
          rotation: 0,
          opacity: 1,
          duration: 2.5,
          ease: "power2.inOut",
        }, "spread")
        // Sequence 15: Hold final state
        .to([card1Ref.current, card2Ref.current, card3Ref.current], {
          duration: 1,
        });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
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
      <h3 className="main-heading absolute text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight text-left px-8 max-w-4xl z-10">
        Three guardrails before a single lari moves
      </h3>

      {/* Main Paragraph */}
      <p className="main-paragraph absolute text-xl sm:text-2xl md:text-3xl text-white/90 text-left px-8 max-w-4xl z-10">
        Each apartment is locked to its own Georgian SPV, investors pass national ID verification, and contributions flow directly into escrow until the raise succeeds. If the goal isn&apos;t met, the bank reverses funds back to every investor automatically.
      </p>

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
  );
}
