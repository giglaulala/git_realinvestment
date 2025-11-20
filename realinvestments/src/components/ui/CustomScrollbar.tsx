"use client";

import { useEffect, useState, useRef } from "react";
import { useLenis } from "@/components/providers/smooth-scroll";

export function CustomScrollbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate scroll percentage
  useEffect(() => {
    if (!isMounted) return;

    const updateScrollPercentage = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      const percentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollPercentage(percentage);
    };

    updateScrollPercentage();
    window.addEventListener("scroll", updateScrollPercentage);
    window.addEventListener("resize", updateScrollPercentage);

    return () => {
      window.removeEventListener("scroll", updateScrollPercentage);
      window.removeEventListener("resize", updateScrollPercentage);
    };
  }, [isMounted]);

  // Handle drag functionality
  useEffect(() => {
    if (!isDragging) return;

    // Stop Lenis smooth scrolling during drag
    if (lenis) {
      lenis.stop();
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current) return;

      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      animationFrameRef.current = requestAnimationFrame(() => {
        const trackRect = trackRef.current!.getBoundingClientRect();
        const trackHeight = trackRect.height;
        const thumbHeight = isHovered ? 24 : 12; // Match new smaller sizes

        let mouseY = e.clientY - trackRect.top;
        mouseY = Math.max(0, Math.min(mouseY, trackHeight));

        const percentage = mouseY / trackHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        const scrollTo = percentage * maxScroll;

        // Direct scroll without animation
        window.scrollTo(0, scrollTo);
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Restart Lenis smooth scrolling after drag
      if (lenis) {
        lenis.start();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Ensure Lenis is restarted if component unmounts during drag
      if (lenis) {
        lenis.start();
      }
    };
  }, [isDragging, isHovered, lenis]);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Don't render on server or before mount
  if (!isMounted) {
    return null;
  }

  // Calculate thumb position and size
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const thumbHeight = isHovered ? 20 : 12; // Much smaller: 12px default, 20px on hover
  const trackHeight = window.innerHeight;
  const maxThumbTop = trackHeight - thumbHeight;
  const thumbTop = scrollPercentage * maxThumbTop;

  // Don't show scrollbar if content fits on screen
  if (scrollHeight <= clientHeight) {
    return null;
  }

  return (
    <div
      ref={trackRef}
      className="fixed right-0 top-0 z-50 h-screen w-4 cursor-pointer"
      style={{ pointerEvents: "none" }}
    >
      <div
        ref={thumbRef}
        className="absolute right-1 ease-out"
        style={{
          transformOrigin: "center",
          top: `${thumbTop}px`,
          height: `${thumbHeight}px`,
          width: isHovered ? "9px" : "6px",
          borderRadius: "100px",
          backgroundColor: isHovered
            ? "var(--scrollbar-thumb-hover)"
            : "var(--scrollbar-thumb)",
          pointerEvents: "auto",
          cursor: isDragging ? "grabbing" : "grab",
          // Only transition size/color, not position for smoother scroll tracking
          transition: "width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => !isDragging && setIsHovered(false)}
        onMouseDown={handleThumbMouseDown}
      />
    </div>
  );
}
