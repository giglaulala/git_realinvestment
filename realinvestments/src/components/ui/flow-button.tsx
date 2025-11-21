'use client';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface FlowButtonProps {
  text?: string;
  direction?: 'left' | 'right';
  variant?: 'dark' | 'light';
  onClick?: () => void;
  className?: string;
}

export function FlowButton({ 
  text = "Modern Button", 
  direction = 'right',
  variant = 'dark',
  onClick,
  className = ''
}: FlowButtonProps) {
  const isLeft = direction === 'left';
  const isLight = variant === 'light';
  const Arrow = isLeft ? ArrowLeft : ArrowRight;
  
  const baseClasses = isLight
    ? "border-white/20 text-white"
    : "border-[#333333]/40 text-[#111111]";
    
  const hoverBg = isLight
    ? "bg-emerald-400"
    : "bg-[#111111]";
  
  const arrowStroke = isLight
    ? "stroke-white"
    : "stroke-[#111111]";
  
  return (
    <button 
      onClick={onClick}
      className={`group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] bg-transparent px-8 py-3 text-sm font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[12px] active:scale-[0.95] ${baseClasses} ${className}`}
    >
      {/* Leading arrow */}
      <Arrow 
        className={`absolute w-4 h-4 ${isLeft ? 'left-[-25%] group-hover:left-4' : 'left-[-25%] group-hover:left-4'} ${arrowStroke} fill-none z-[9] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
      />

      {/* Text */}
      <span className={`relative z-[1] ${isLeft ? '-translate-x-3 group-hover:translate-x-3' : '-translate-x-3 group-hover:translate-x-3'} transition-all duration-[800ms] ease-out`}>
        {text}
      </span>

      {/* Circle */}
      <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${hoverBg} rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]`}></span>

      {/* Trailing arrow */}
      <Arrow 
        className={`absolute w-4 h-4 ${isLeft ? 'right-4 group-hover:right-[-25%]' : 'right-4 group-hover:right-[-25%]'} ${arrowStroke} fill-none z-[9] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
      />
    </button>
  );
}
