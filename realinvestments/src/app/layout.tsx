import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ScrollbarController } from "@/components/ui/ScrollbarController";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Investment — Fractional Georgian Real Estate",
  description:
    "Invest in Georgian apartments through single-asset SPVs with escrow-protected raises, transparent fees, and direct bank payouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-neutral-950 text-white antialiased`}
      >
        <AuthProvider>
          <SmoothScroll>
            <ScrollbarController />
            <CustomScrollbar />
            {children}
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
