"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollbarController() {
  useGSAP(() => {
    const heroSection = document.getElementById("hero");
    
    if (heroSection) {
      ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          document.documentElement.classList.add("scrollbar-hero");
          document.documentElement.classList.remove("scrollbar-default");
        },
        onLeave: () => {
          document.documentElement.classList.remove("scrollbar-hero");
          document.documentElement.classList.add("scrollbar-default");
        },
        onEnterBack: () => {
          document.documentElement.classList.add("scrollbar-hero");
          document.documentElement.classList.remove("scrollbar-default");
        },
        onLeaveBack: () => {
          document.documentElement.classList.remove("scrollbar-hero");
          document.documentElement.classList.add("scrollbar-default");
        },
      });
    } else {
       // Fallback if no hero ID found, default to hero style initially then switch? 
       // Or just default to 'default' style.
       // Given the user request, let's assume there IS a hero section or we treat top of page as hero.
       // If no hero ID, we might want to just use scroll position 0-100vh.
       
       ScrollTrigger.create({
        start: 0,
        end: window.innerHeight, // Approximate hero height
        onEnter: () => {
            document.documentElement.classList.add("scrollbar-hero");
            document.documentElement.classList.remove("scrollbar-default");
        },
        onLeave: () => {
            document.documentElement.classList.remove("scrollbar-hero");
            document.documentElement.classList.add("scrollbar-default");
        },
        onEnterBack: () => {
            document.documentElement.classList.add("scrollbar-hero");
            document.documentElement.classList.remove("scrollbar-default");
        },
       });
    }
  }, []);

  return null;
}
