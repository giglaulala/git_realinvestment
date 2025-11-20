"use client";

import Link from "next/link";
import { useCallback, type MouseEvent, useState, useEffect, useRef } from "react";
import { UserRound, MenuIcon, Grid2x2PlusIcon } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useLenis } from "@/components/providers/smooth-scroll";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter } from "@/components/sheet";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const lenis = useLenis();
  const { isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleSmoothScroll = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
      if (!hash.startsWith("#") || !lenis) {
        return;
      }

      const target = document.querySelector(hash);

      if (!(target instanceof HTMLElement)) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
      window.history.replaceState(null, "", hash);
      setOpen(false);
    },
    [lenis]
  );

  const handleLogout = useCallback(() => {
    logout();
    setOpen(false);
  }, [logout]);

  useGSAP(() => {
    if (!headerRef.current) return;

    // Get the hero section height to determine when to start hiding
    const heroSection = document.querySelector("section");
    if (!heroSection) return;

    let lastScrollY = 0;
    let idleTimeout: number | null = null;

    const trigger = ScrollTrigger.create({
      trigger: heroSection,
      start: "bottom top", // When bottom of hero reaches top of viewport
      end: "max", // Continue for the rest of the page
      onUpdate: (self) => {
        const scrollY = window.scrollY || window.pageYOffset;
        const direction = scrollY > lastScrollY ? "down" : "up";

        // Clear any pending "idle" show while the user is actively scrolling
        if (idleTimeout !== null) {
          window.clearTimeout(idleTimeout);
          idleTimeout = null;
        }

        // Only animate if we're past the hero section
        if (self.progress > 0) {
          if (direction === "down") {
            // Scrolling down - hide header
            gsap.to(headerRef.current, {
              y: -120,
              opacity: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          } else {
            // Scrolling up - show header
            gsap.to(headerRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        } else {
          // We're in the hero section - always show header
          gsap.to(headerRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        lastScrollY = scrollY;

        // When scrolling stops, show the header again after a short delay
        idleTimeout = window.setTimeout(() => {
          gsap.to(headerRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }, 200);
      },
    });

    return () => {
      trigger.kill();
      if (idleTimeout !== null) {
        window.clearTimeout(idleTimeout);
      }
    };
  }, { dependencies: [] });

  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Opportunities", href: "#opportunities" },
    { label: "Fees", href: "#fee-structure" },
  ];

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-5 left-0 right-0 z-50",
        "mx-auto w-full max-w-3xl rounded-2xl border shadow-lg",
        "bg-[#051f11]/70 backdrop-blur-2xl border-[#50f48a]/20"
      )}
    >
      <nav className="mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-emerald-300 via-emerald-400 to-emerald-500 text-xs font-semibold text-black shadow-[0_0_20px_rgba(163,255,204,0.4)] transition-shadow group-hover:shadow-[0_0_30px_rgba(163,255,204,0.6)]">
              RI
            </span>
            <span className="font-semibold text-white tracking-wide hidden sm:block">Real Investment</span>
          </Link>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(event) => handleSmoothScroll(event, item.href)}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
               <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "hidden sm:inline-flex text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                Dashboard
              </Link>
               <div className="relative group">
                  <Link href="/profile">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-emerald-300/60 hover:text-white hover:bg-white/10">
                      <UserRound className="h-4 w-4" />
                    </div>
                  </Link>
                  {/* Dropdown for profile */}
                  <div className="invisible absolute right-0 top-full mt-2 w-40 translate-y-2 rounded-xl border border-[#50f48a]/20 bg-[#051f11]/90 p-1 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                     <Link href="/profile" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                        <UserRound className="h-4 w-4" /> Profile
                     </Link>
                     <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-300 hover:bg-rose-500/15 hover:text-rose-200">
                        Logout
                     </button>
                  </div>
               </div>
            </div>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-gradient-to-r from-emerald-300 to-emerald-500 text-black font-semibold shadow-[0_0_20px_rgba(163,255,204,0.2)] hover:brightness-110"
              )}
            >
              Login
            </Link>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(!open)}
              className="md:hidden text-white hover:bg-white/10"
            >
              <MenuIcon className="size-5" />
            </Button>
            <SheetContent
              className="bg-[#051f11]/95 backdrop-blur-xl border-l border-[#50f48a]/20 text-white"
              side="right"
            >
              <div className="flex flex-col gap-4 pt-10">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(event) => handleSmoothScroll(event, item.href)}
                    className="text-lg font-medium text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <hr className="border-white/10 my-2" />
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" onClick={() => setOpen(false)} className="text-lg font-medium text-white/80 hover:text-white">
                      Dashboard
                    </Link>
                    <Link href="/profile" onClick={() => setOpen(false)} className="text-lg font-medium text-white/80 hover:text-white">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="text-left text-lg font-medium text-rose-300 hover:text-rose-200">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-300 to-emerald-500 px-5 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(163,255,204,0.35)] transition hover:brightness-110"
                  >
                    Login
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
