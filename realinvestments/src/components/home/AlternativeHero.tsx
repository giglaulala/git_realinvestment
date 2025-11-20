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
      if (
        !text1Ref.current ||
        !text2Ref.current ||
        !greenBgRef.current ||
        wordRefs.current.length === 0 ||
        !wordRefs.current[0]
      ) {
        return
      }

      const words = ["Buy", "a", "piece", "of", "Georgia!"]
      const allWordsReady = words.every((_, index) => wordRefs.current[index])
      if (!allWordsReady) return

      const setupTimeline = (isMobile: boolean) => {
        const scaleOut = isMobile ? 0.35 : 0.1
        const initialWordScale = isMobile ? 7 : 18
        const endDistance = isMobile ? "+=135%" : "+=165%"
        const holdDuration = isMobile ? 3.6 : 5
        const text2EnterOffset = isMobile ? 25 : 35
        const text2ExitOffset = isMobile ? -260 : -360
        const text2ExitDuration = isMobile ? 4.6 : 6.1
        const exitFirstStageDuration = text2ExitDuration * 0.65
        const exitSecondStageDuration = text2ExitDuration * 0.35
        const exitFirstStageOffset = text2ExitOffset * 0.65

        gsap.set(greenBgRef.current, {
          x: 0,
          opacity: 1,
          clearProps: "transform",
        })

        wordRefs.current.forEach((word, index) => {
          if (!word) return
          const isFirstWord = index === 0
          gsap.set(word, {
            opacity: isFirstWord ? 1 : 0,
            scale: isFirstWord ? 1 : initialWordScale,
            display: "inline-block",
            transformOrigin: "center center",
          })
        })

        gsap.set(text2Ref.current, {
          xPercent: text2EnterOffset,
          opacity: 0,
          rotate: isMobile ? 0 : 0,
        })

        const tl = gsap.timeline({
          defaults: {
            duration: isMobile ? 0.65 : 0.8,
            ease: "power2.out",
          },
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: endDistance,
            pin: true,
            scrub: isMobile ? 3.4 : 4.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        words.forEach((_, index) => {
          if (index < words.length - 1) {
            const currentWord = wordRefs.current[index]
            const nextWord = wordRefs.current[index + 1]

            if (currentWord && nextWord) {
              tl.to(
                nextWord,
                {
                  opacity: 1,
                  scale: 1,
                },
                ">"
              ).to(
                currentWord,
                {
                  opacity: 0,
                  scale: scaleOut,
                  ease: "power2.in",
                },
                "<"
              )
            }
          }
        })

        const lastWord = wordRefs.current[words.length - 1]
        if (lastWord) {
          tl.to(lastWord, {
            opacity: 0,
            scale: scaleOut,
            ease: "power2.in",
          })
        }

        tl.to(text2Ref.current, {
          xPercent: 10,
          opacity: 1,
          duration: isMobile ? 1.05 : 1.35,
        })
          .to(text2Ref.current, {
            xPercent: 0,
            duration: holdDuration,
          })
          .to(text2Ref.current, {
            xPercent: exitFirstStageOffset,
            duration: exitFirstStageDuration,
            ease: "power2.in",
          })
          .to(text2Ref.current, {
            xPercent: text2ExitOffset,
            duration: exitSecondStageDuration,
            ease: "power2.in",
          })
          .to(
            greenBgRef.current,
            {
              opacity: 0,
              duration: isMobile ? 0.6 : 0.9,
              ease: "power2.inOut",
            },
            "<"
          )
          .to(
            {},
            {
              duration: isMobile ? 0.35 : 0.55,
            }
          )
          .to(text2Ref.current, {
            opacity: 0,
            duration: 0.01,
          })

        return () => {
          tl.kill()
        }
      }

      const mm = gsap.matchMedia()
      mm.add("(max-width: 767px)", () => setupTimeline(true))
      mm.add("(min-width: 768px)", () => setupTimeline(false))

      return () => {
        mm.revert()
      }
    },
    { scope: container }
  )

  const text1 = "Buy a piece of Georgia!"
  const text2 = "Investing in Real Estate has never been easier"
  const words = text1.split(" ")

  return (
    <section
      ref={container}
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-16 sm:min-h-dvh md:h-screen md:px-10"
    >
      {/* Green background layer that slides out */}
      <div
        ref={greenBgRef}
        className="absolute inset-0 bg-[#69f450]"
        suppressHydrationWarning
      />

      <div
        ref={text1Ref}
        className="absolute z-10 flex w-full max-w-6xl items-center justify-center px-4 text-center text-[clamp(3.25rem,11vw,7.5rem)] font-bold leading-[0.9] tracking-tight text-white sm:text-[clamp(4rem,10vw,8.5rem)]"
      >
        {words.map((word, index) => (
          <span
            key={index}
            ref={(el) => {
              if (el) {
                wordRefs.current[index] = el
              }
            }}
            className={`word absolute whitespace-nowrap px-1 ${
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
        className="absolute z-10 w-full max-w-none px-4 text-center text-[clamp(3.5rem,14vw,9.5rem)] font-extrabold leading-[0.9] tracking-tight text-white opacity-0 whitespace-nowrap sm:text-[clamp(4.5rem,12vw,11rem)]"
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
