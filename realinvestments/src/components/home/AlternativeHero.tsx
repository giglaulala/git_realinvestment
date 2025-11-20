"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AlternativeHero() {
  const container = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLHeadingElement>(null)
  const greenBgRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  useGSAP(
    () => {
      // Wait for all refs to be available and all word refs to be populated
      if (
        !text1Ref.current ||
        !text2Ref.current ||
        !greenBgRef.current ||
        wordRefs.current.length === 0 ||
        !wordRefs.current[0]
      )
        return

      // Split text into words: ["Buy", "a", "piece", "of", "Georgia!"]
      const words = ["Buy", "a", "piece", "of", "Georgia!"]

      // Ensure all word refs are available
      const allWordsReady = words.every((_, index) => wordRefs.current[index])
      if (!allWordsReady) return

      // Initial state: Set all words - "Buy" starts visible, others hidden and large
      const firstWordEl = wordRefs.current[0]
      if (firstWordEl) {
        // "Buy" starts visible (fade in animation happens on load)
        gsap.set(firstWordEl, {
          opacity: 1,
          scale: 1,
          display: "inline-block",
          transformOrigin: "center center",
        })
      }

      words.forEach((_, index) => {
        if (index === 0) return // Already handled above
        const wordEl = wordRefs.current[index]
        if (wordEl) {
          // Other words start invisible and very large, but stay in DOM
          gsap.set(wordEl, {
            opacity: 0,
            scale: 5,
            display: "inline-block",
            transformOrigin: "center center",
          })
        }
      })

      // Optional: Animate "Buy" fade in on load (though it's already visible)
      // This can be removed if you want it to appear immediately
      // gsap.from(wordRefs.current[0], {
      //   opacity: 0,
      //   duration: 1.5,
      //   ease: "power2.out",
      // })

      // Set text2Ref initial state
      gsap.set(text2Ref.current, { x: "100vw", opacity: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
        },
      })

      // Set initial state in timeline: "Buy" should be visible at scroll start
      tl.set(wordRefs.current[0], {
        opacity: 1,
        scale: 1,
      })

      // Word-by-word scroll animation (fully reversible)
      words.forEach((_, index) => {
        if (index < words.length - 1) {
          const currentWord = wordRefs.current[index]
          const nextWord = wordRefs.current[index + 1]

          if (currentWord && nextWord) {
            // Next word fades in and shrinks from large to normal
            tl.to(
              nextWord,
              {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              ">"
            )

            // Current word shrinks away and fades out (simultaneous)
            tl.to(
              currentWord,
              {
                opacity: 0,
                scale: 0.1,
                duration: 0.8,
                ease: "power2.in",
              },
              "<" // Start at same time as next word animation
            )
          }
        }
      })

      // Animate the last word ("Georgia!") shrinking and disappearing
      const lastWord = wordRefs.current[words.length - 1]
      if (lastWord) {
        tl.to(
          lastWord,
          {
            opacity: 0,
            scale: 0.1,
            duration: 0.8,
            ease: "power2.in",
          },
          ">"
        )
      }

      // --- Sequence 2: Second Text ---
      // Enter from right - only after last word has disappeared
      tl.to(
        text2Ref.current,
        {
          x: "0%",
          duration: 1,
          ease: "power2.out",
        },
        ">" // Start after the last word animation completes
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
        )
    },
    { scope: container }
  )

  const text1 = "Buy a piece of Georgia!"
  const text2 = "Investing in Real Estate has never been easier"
  const words = text1.split(" ")

  return (
    <section
      ref={container}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Green background layer that slides out */}
      <div
        ref={greenBgRef}
        className="absolute inset-0 bg-[#69f450]"
        suppressHydrationWarning
      />

      <div
        ref={text1Ref}
        className="absolute px-4 text-center text-6xl font-bold tracking-tighter text-white sm:text-8xl md:text-9xl z-10 w-full flex justify-center items-center"
      >
        {words.map((word, index) => (
          <span
            key={index}
            ref={(el) => {
              if (el) {
                wordRefs.current[index] = el
              }
            }}
            className={`word absolute whitespace-nowrap ${
              index === 0 ? "opacity-100" : "opacity-0"
            }`}
            suppressHydrationWarning
          >
            {word}
          </span>
        ))}
      </div>

      <h1
        ref={text2Ref}
        className="absolute px-4 text-center text-6xl font-bold tracking-tighter text-white sm:text-8xl md:text-7xl z-10 opacity-0"
        suppressHydrationWarning
      >
        {text2.split("").map((char, index) => (
          <span key={index} className="letter inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </section>
  )
}
