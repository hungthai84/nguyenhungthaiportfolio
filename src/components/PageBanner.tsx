import React from "react";
import {
  Sparkles,
  Server,
  Globe,
  Cpu,
  Layers,
  ShieldCheck,
  Briefcase,
  Award,
  BookOpen,
  User,
  Mail,
  Star,
  Code,
  GraduationCap,
  MessageSquare,
  Image,
  Compass,
  FileText
} from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import WebsiteGradientIcon from "./WebsiteGradientIcon";

export interface PageBannerProps {
  title: string;
  subtitle: string;
  tag: string;
  iconType: string;
  gradient?: string;
  glowColor?: string;
  className?: string;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
  logoUrl?: string;
}

const systemIconMap: Record<string, React.ElementType> = {
  about: User,
  letter: Mail,
  openletter: Mail,
  domains: Globe,
  experience: Award,
  skills: Cpu,
  projects: Briefcase,
  systems: Server,
  system: Server,
  education: GraduationCap,
  interview: MessageSquare,
  tuvi: Compass,
  memories: Sparkles,
  wallpapers: Image,
  contact: Mail,
};

export function PageBanner({ 
  title, 
  subtitle, 
  tag, 
  iconType, 
  gradient, 
  className, 
  rightContent, 
  children,
  logoUrl
}: PageBannerProps) {
  const theme = useTheme().theme as string;

  // Helper styles based on active Theme
  const getBannerContainerStyle = () => {
    if (gradient && gradient !== "from-slate-800 via-sky-900 to-indigo-950" && gradient !== "from-slate-950 via-indigo-950 to-slate-950") {
      return `bg-gradient-to-br ${gradient} border border-sky-400/30 shadow-2xl`;
    }

    switch (theme) {
      case "glass-vivid":
        return "bg-gradient-to-r from-violet-950/85 via-indigo-950/85 to-pink-950/80 border-2 border-white/40 shadow-[0_16px_40px_rgba(124,58,237,0.3),inset_0_1.5px_2px_rgba(255,255,255,0.4)] backdrop-blur-2xl";
      case "nec":
        return "bg-[#f0f3f8]/95 dark:bg-slate-900/95 border-2 border-white/90 dark:border-slate-800/90 text-slate-800 dark:text-slate-100 shadow-[-6px_-6px_16px_rgba(255,255,255,0.9),_6px_6px_20px_rgba(163,177,198,0.45)] backdrop-blur-xl";
      case "clay":
        return "bg-gradient-to-tr from-indigo-700/85 via-purple-700/85 to-pink-700/85 border-2 border-white text-white shadow-[0_16px_36px_rgba(140,150,200,0.35),inset_0_2px_4px_rgba(255,255,255,0.8)] backdrop-blur-2xl";
      case "glass-neo":
        return "bg-gradient-to-r from-slate-950/95 via-[#0b1026]/90 to-[#160b24]/90 border border-cyan-400/50 text-cyan-50 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,240,255,0.25),0_0_35px_rgba(255,0,128,0.2)] backdrop-blur-2xl";
      case "glass":
      default:
        return "bg-slate-900/80 dark:bg-slate-950/85 border border-white/25 text-white shadow-2xl backdrop-blur-2xl";
    }
  };

  const isNec = theme === "nec";

  return (
    <div 
      id="hero-banner"
      className={cn(
        "relative rounded-2xl sm:rounded-3xl py-2 px-3.5 sm:py-3 sm:px-5 md:py-3 md:px-6 text-white overflow-hidden transition-all duration-700 hover:shadow-[0_0_40px_rgba(56,189,248,0.25)] group flex flex-col items-center gap-1 sm:gap-1.5",
        getBannerContainerStyle(),
        className
      )}
    >
      {/* Decorative Glow Orbs */}
      <div className={cn(
        "absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-all duration-1000 ease-in-out animate-pulse",
        theme === "glass-neo" ? "bg-fuchsia-500/35 group-hover:bg-fuchsia-400/45" :
        theme === "clay" ? "bg-pink-500/30 group-hover:bg-pink-400/40" :
        theme === "nec" ? "bg-purple-400/20 group-hover:bg-purple-300/30" :
        "bg-sky-500/30 group-hover:bg-sky-400/40"
      )}></div>
      <div className={cn(
        "absolute right-40 -top-20 w-72 h-72 rounded-full blur-[80px] pointer-events-none group-hover:translate-x-10 transition-all duration-1000 ease-in-out",
        theme === "glass-neo" ? "bg-cyan-500/30 group-hover:bg-cyan-400/40" :
        theme === "clay" ? "bg-indigo-500/30" :
        theme === "nec" ? "bg-indigo-300/20" :
        "bg-indigo-500/30"
      )}></div>
      <div className={cn(
        "absolute left-10 bottom-10 w-48 h-48 rounded-full blur-[60px] pointer-events-none transition-all duration-1000 ease-in-out",
        theme === "glass-neo" ? "bg-purple-500/35 group-hover:bg-purple-400/45 group-hover:-translate-y-10" : "bg-purple-500/20 group-hover:bg-purple-400/30 group-hover:-translate-y-10"
      )}></div>

      {/* Banner Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center justify-between gap-1 md:gap-2">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-5">
          
          <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-5 w-full md:w-auto flex-1">
            {/* 3D System Card Graphic Badge */}
            

            
            <div className="shrink-0 flex items-center justify-center">
              <WebsiteGradientIcon type={iconType as any} extraClass="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg transform transition-transform group-hover:scale-105 group-hover:-rotate-3" />
            </div>
            
            {/* Text content side-by-side with system icon */}
            <div className="flex-1 w-full space-y-1 sm:space-y-1.5 flex flex-col justify-center items-start text-left py-1">
              <div className="flex flex-wrap items-center justify-start gap-2">
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-extrabold backdrop-blur-xl shadow-lg transition-colors",
                  isNec 
                    ? "bg-purple-100 dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-slate-700 shadow-[inset_1px_1px_3px_rgba(163,177,198,0.4)]"
                    : theme === "glass-neo"
                    ? "bg-gradient-to-r from-cyan-950/80 via-purple-950/80 to-fuchsia-950/80 text-cyan-200 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                    : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                )}>
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-pulse" /> {tag}
                </span>
              </div>
              <div className="space-y-0.5 sm:space-y-1 w-full">
                <h2 className={cn(
                  "text-xl sm:text-2xl md:text-3xl font-black tracking-tight drop-shadow-lg leading-tight transition-all duration-500",
                  isNec
                    ? "text-slate-800 dark:text-slate-100"
                    : theme === "glass-neo"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-pink-200 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-indigo-100 group-hover:from-white group-hover:to-sky-200"
                )}>
                  {title}
                </h2>
                <p className={cn(
                  "text-xs sm:text-sm font-medium leading-relaxed max-w-3xl italic drop-shadow-md",
                  isNec
                    ? "text-slate-600 dark:text-slate-300"
                    : theme === "glass-neo"
                    ? "text-cyan-100/90"
                    : "text-sky-100/95"
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
