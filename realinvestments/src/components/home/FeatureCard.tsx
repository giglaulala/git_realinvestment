"use client";

import { forwardRef } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  points: string[];
}

export const FeatureCard = forwardRef<HTMLElement, FeatureCardProps>(
  ({ title, description, points }, ref) => {
    return (
      <article
        ref={ref}
        className="group absolute flex min-h-[18rem] w-[min(78vw,18rem)] max-w-sm flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-neutral-900/70 to-neutral-900/90 p-6 text-left transition duration-300 hover:border-emerald-300/40 hover:shadow-[0_40px_80px_rgba(134,239,172,0.18)] md:min-h-[21rem] md:w-[350px]"
      >
        <div>
          <h4 className="text-xl font-semibold text-white">
            {title}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {description}
          </p>
        </div>
        <ul className="mt-6 space-y-2 text-xs text-emerald-200/90">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-left">
              <span className="h-1.5 w-6 rounded-full bg-emerald-300/70 transition group-hover:w-8" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </article>
    );
  }
);

FeatureCard.displayName = "FeatureCard";
