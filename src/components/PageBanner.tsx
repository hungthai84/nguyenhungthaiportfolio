import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import { BannerIcon3D } from "./BannerIcon3D";

export interface PageBannerProps {
  title: string;
  subtitle: string;
  tag?: string;
  iconType: string;
  gradient?: string;
  glowColor?: string;
  className?: string;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * System Icon Graphic for Banners
 * Renders sleek 3D Custom Icon with smooth continuous motion.
 */
function BannerGraphic({ iconType }: { iconType: string }) {
  return (
    <div className="relative shrink-0 flex items-center justify-center transition-all duration-500 group-hover:scale-110 select-none p-1">
      {/* Ambient Radial Glow behind Icon */}
      <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-xl group-hover:bg-cyan-400/40 transition-all duration-500 pointer-events-none" />

      {/* 3D Custom Icon floating directly with motion */}
      <motion.div
        animate={{ 
          y: [0, -6, 0, 6, 0],
          rotate: [0, 2.5, 0, -2.5, 0],
          scale: [1, 1.06, 1, 1.06, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10"
      >
        <BannerIcon3D 
          iconType={iconType} 
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]" 
        />
      </motion.div>
    </div>
  );
}

export function PageBanner({ 
  title, 
  subtitle, 
  tag, 
  iconType, 
  gradient, 
  className, 
  rightContent, 
  children 
}: PageBannerProps) {
  const { theme } = useTheme();

  // Helper styles based on active Theme
  const getBannerContainerStyle = () => {
    switch (theme as any) {
      case "light":
        return "glass-surface backdrop-blur-2xl border border-white/80 dark:border-white/15 text-slate-900 dark:text-white shadow-[0_10px_30px_rgba(59,130,246,0.08)]";
      case "glass-vivid":
        return "glass-surface backdrop-blur-2xl border-2 border-white/90 shadow-[0_16px_40px_rgba(99,102,241,0.18)] text-slate-900 dark:text-white";
      case "nec":
        return "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-[-8px_-8px_20px_rgba(255,255,255,0.95),_8px_8px_24px_rgba(163,177,198,0.45)] backdrop-blur-xl";
      case "clay":
        return "glass-surface backdrop-blur-2xl border-2 border-white text-slate-900 dark:text-white shadow-[0_14px_34px_rgba(160,165,210,0.32)]";
      case "glass-neon":
      case "glass-neo":
        return "glass-surface backdrop-blur-2xl border-2 border-cyan-400/60 text-slate-900 dark:text-cyan-50 shadow-[0_16px_40px_rgba(0,0,0,0.95)]";
      case "glass":
      default:
        return "glass-surface backdrop-blur-2xl border border-white/80 dark:border-white/15 text-slate-900 dark:text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.14)]";
    }
  };

  const getTagStyle = () => {
    switch (theme as any) {
      case "light":
        return "bg-blue-600/10 text-blue-700 border-blue-300/60 shadow-xs";
      case "glass-vivid":
        return "bg-violet-500/20 text-violet-200 border-violet-400/40 shadow-xs";
      case "nec":
        return "bg-[#e2e8f0] dark:bg-slate-800 text-purple-700 dark:text-purple-300 border-slate-300/80 dark:border-slate-700 shadow-xs";
      case "clay":
        return "bg-white/20 text-white border-white/40 shadow-xs";
      case "glass-neon":
      case "glass-neo":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-xs";
      case "glass":
      default:
        return "bg-white/15 text-sky-200 border-white/25 shadow-xs";
    }
  };

  const isLightMode = theme === "light";
  const isNec = (theme as any) === "nec";

  return (
    <div 
      id="hero-banner"
      className={cn(
        "relative rounded-2xl sm:rounded-3xl py-2 px-3.5 sm:py-3 sm:px-5 md:py-3 md:px-6 overflow-hidden transition-all duration-700 group flex flex-col items-center gap-1 sm:gap-1.5",
        getBannerContainerStyle(),
        className
      )}
    >
      {/* Decorative Glow Orbs */}
      <div className={cn(
        "absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-all duration-1000 ease-in-out animate-pulse opacity-40",
        (theme as any) === "glass-neo" || (theme as any) === "glass-neon" ? "bg-fuchsia-500/25 group-hover:bg-fuchsia-400/35" :
        (theme as any) === "glass-vivid" ? "bg-fuchsia-500/25 group-hover:bg-fuchsia-400/35" :
        (theme as any) === "clay" ? "bg-pink-500/20 group-hover:bg-pink-400/30" :
        (theme as any) === "nec" ? "bg-purple-400/15 group-hover:bg-purple-300/25" :
        (theme as any) === "light" ? "bg-blue-400/15 group-hover:bg-blue-300/25" :
        "bg-sky-500/20 group-hover:bg-sky-400/30"
      )}></div>

      {/* Banner Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center justify-between gap-1 md:gap-2">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-5">
          
          <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-5 w-full md:w-auto flex-1">
            {/* 3D System Card Graphic Badge */}
            <BannerGraphic iconType={iconType} />

            {/* Text content side-by-side with system icon */}
            <div className="flex-1 w-full space-y-1 sm:space-y-1.5 flex flex-col justify-center items-start text-left py-1">
              <div className="space-y-0.5 sm:space-y-1 w-full">
                <h2 className={cn(
                  "text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight transition-all duration-500",
                  "text-slate-900 dark:text-white drop-shadow-xs"
                )}>
                  {title}
                </h2>
                <p className={cn(
                  "text-xs sm:text-sm font-medium leading-relaxed max-w-3xl italic",
                  "text-slate-700 dark:text-slate-200/90"
                )}>
                  "{subtitle}"
                </p>
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          {rightContent && (
            <div className="shrink-0 flex items-center justify-center md:justify-end w-full md:w-auto mt-2 md:mt-0">
              {rightContent}
            </div>
          )}
          
        </div>
        
        {/* Optional Children */}
        {children && (
          <div className="w-full pt-2 mt-1">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
