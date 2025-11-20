"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AlternativeHero() {
  const container = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const greenBgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const letters1 = text1Ref.current?.querySelectorAll(".letter");
      const letters2 = text2Ref.current?.querySelectorAll(".letter");
      
      if (!letters1 || !letters2 || !greenBgRef.current) return;

      // Initial states
      gsap.set(text1Ref.current, { opacity: 1 });
      gsap.set(text2Ref.current, { x: "100vw", opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=150%", // Tighter scroll distance for faster transition
          pin: true,
          scrub: true,
        },
      });

      // --- Sequence 1: First Text ---
      tl.to(text1Ref.current, {
        scale: 0.2,
        y: -200,
        duration: 1,
      })
        .to(
          text1Ref.current,
          {
            x: "-100vw",
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          ">"
        );

      // --- Sequence 2: Second Text ---
      // Enter from right
      tl.to(
        text2Ref.current,
        {
          x: "0%",
          duration: 1,
          ease: "power2.out",
        },
        "-=0.2" // Slight overlap
      )
        // Hold text2 in place for a moment
        .to(
          text2Ref.current,
          {
            x: "0%",
            duration: 1.5, // Hold duration
          },
          ">"
        )
        // Exit to left (no scale or y movement)
        .to(
          text2Ref.current,
          {
            x: "-100vw",
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          ">"
        )
        // Slide green background to the left (revealing black underneath)
        // This now starts after text2 has begun exiting
        .to(
          greenBgRef.current,
          {
            x: "-100%",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "<+=0.5" // Start halfway through the text exit
        );
    },
    { scope: container }
  );

  const text1 = "Own a piece of Georgia";
  const text2 = "Investing in Real Estate has never been easier";

  return (
    <section
      ref={container}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Green background layer that slides out */}
      <div
        ref={greenBgRef}
        className="absolute inset-0 bg-[#69f450]"
      />

      <h1
        ref={text1Ref}
        className="absolute px-4 text-center text-6xl font-bold tracking-tighter text-white sm:text-8xl md:text-9xl z-10 opacity-0"
      >
        {text1.split("").map((char, index) => (
          <span key={index} className="letter inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      <h1
        ref={text2Ref}
        className="absolute px-4 text-center text-6xl font-bold tracking-tighter text-white sm:text-8xl md:text-7xl z-10 opacity-0"
      >
        {text2.split("").map((char, index) => (
          <span key={index} className="letter inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </section>
  );
}
