/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OpenLetter from "./components/OpenLetter";
import About from "./components/About";
import Domains from "./components/Domains";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Systems from "./components/Systems";
import Wallpapers from "./components/Wallpapers";
import Contact from "./components/Contact";
import Memories from "./components/Memories";
import Interview from "./components/Interview";
import TuVi from "./components/TuVi";
import Footer from "./components/Footer";
import XRayInspector from "./components/XRayInspector";
import BackgroundRenderer from "./components/BackgroundRenderer";
import PointCursor from "./components/PointCursor";
import AIAssistant from "./components/ai/AIAssistant";
import { LanguageProvider, useLanguage } from "./i18n";
import { BackgroundProvider } from "./context/BackgroundContext";
import { LayoutProvider, useLayout } from "./context/LayoutContext";
import { SoundProvider, useSound } from "./context/SoundContext";
import { CursorProvider } from "./context/CursorContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { 
  Home, MailOpen, UserCheck, GraduationCap, Briefcase, 
  PhoneCall, Compass, Target, FolderKanban, MessagesSquare,
  Star, Server, Camera, Film, Sparkles
} from "lucide-react";

const SECTIONS = [
  { id: "home", labelKey: "nav.home", Icon: Home, Component: Hero, padding: "p-0 overflow-hidden" },
  { id: "letter", labelKey: "nav.letter", Icon: MailOpen, Component: OpenLetter, padding: "p-0 overflow-y-auto" },
  { id: "about", labelKey: "nav.about", Icon: UserCheck, Component: About, padding: "p-0 overflow-y-auto" },
  { id: "education", labelKey: "nav.education", Icon: GraduationCap, Component: Education, padding: "p-0 overflow-y-auto" },
  { id: "domains", labelKey: "nav.domains", Icon: Compass, Component: Domains, padding: "p-0 overflow-y-auto" },
  { id: "experience", labelKey: "nav.experience", Icon: Briefcase, Component: Experience, padding: "p-0 overflow-y-auto" },
  { id: "skills", labelKey: "nav.skills", Icon: Target, Component: Skills, padding: "p-0 overflow-y-auto" },
  { id: "projects", labelKey: "nav.projects", Icon: FolderKanban, Component: Projects, padding: "p-0 overflow-y-auto" },
  { id: "interview", labelKey: "nav.interview", Icon: MessagesSquare, Component: Interview, padding: "p-0 overflow-y-auto" },
  { id: "tuvi", labelKey: "nav.tuvi", Icon: Star, Component: TuVi, padding: "p-0 overflow-y-auto" },
  { id: "memories", labelKey: "nav.memories", Icon: Camera, Component: Memories, padding: "p-0 overflow-y-auto" },
  { id: "systems", labelKey: "nav.systems", Icon: Server, Component: Systems, padding: "p-0 overflow-y-auto" },
  { id: "wallpapers", labelKey: "nav.wallpapers", Icon: Film, Component: Wallpapers, padding: "p-0 overflow-y-auto" },
  { id: "contact", labelKey: "nav.contact", Icon: PhoneCall, Component: Contact, padding: "p-0 overflow-y-auto" },
];

function MainContent() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const { orientation, isSwitching } = useLayout();
  const { playSound } = useSound();
  const [activeSection, setActiveSection] = useState("home");
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const isHome = activeSection === "home";

  // Smoothly switch to specific section
  const navigateToSection = (id: string) => {
    const cleanId = id.replace(/^#/, "");
    const targetSection = SECTIONS.find((s) => s.id === cleanId);
    if (targetSection && cleanId !== activeSection) {
      playSound("switch");
      setActiveSection(cleanId);
    }
  };

  // Listen for custom app-navigate events (from buttons across pages)
  useEffect(() => {
    const handleAppNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        navigateToSection(customEvent.detail);
      }
    };
    window.addEventListener("app-navigate", handleAppNavigate);
    return () => window.removeEventListener("app-navigate", handleAppNavigate);
  }, [activeSection]);


  // Keyboard navigation (ArrowLeft/Right, ArrowUp/Down, PageUp/PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
      if ((e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") && currentIndex < SECTIONS.length - 1) {
        navigateToSection(SECTIONS[currentIndex + 1].id);
      } else if ((e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") && currentIndex > 0) {
        navigateToSection(SECTIONS[currentIndex - 1].id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  // Touch Swipe Navigation for Responsive Web (Mobile)
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      handleSwipeGesture(touchEndX, touchEndY);
    };
    
    const handleSwipeGesture = (touchEndX: number, touchEndY: number) => {
      const swipeThreshold = 60; // minimum distance to be considered a swipe
      const verticalThreshold = 40; // max vertical movement allowed to still count as horizontal swipe
      const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = Math.abs(touchEndY - touchStartY);
      
      // Ensure it's a primarily horizontal swipe, not vertical scrolling
      if (deltaY < verticalThreshold) {
        if (deltaX < -swipeThreshold) {
          // Swipe left -> Next section
          if (currentIndex < SECTIONS.length - 1) {
            navigateToSection(SECTIONS[currentIndex + 1].id);
          }
        } else if (deltaX > swipeThreshold) {
          // Swipe right -> Prev section
          if (currentIndex > 0) {
            navigateToSection(SECTIONS[currentIndex - 1].id);
          }
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection]);




  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const currentSection = SECTIONS[activeIndex] || SECTIONS[0];
  const CurrentComponent = currentSection.Component;

  const getMainCardStyle = () => {
    switch (theme as any) {
      case "industrial-futurist":
        return "theme-industrial-futurist glass-surface bg-[#050811]/55 border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.12)] text-white backdrop-blur-[16px] transition-all duration-300";
      case "light":
        return "glass-surface bg-white/85 border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] text-slate-900 dark:text-white transition-all duration-300";
      case "glass-dark":
        return "glass-surface bg-slate-950/45 dark:bg-slate-950/45 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.12)] text-white transition-all duration-300";
      case "glass-vivid":
        return "glass-surface border-2 border-white/40 shadow-[0_20px_50px_rgba(124,58,237,0.35)] text-slate-900 dark:text-white transition-all duration-300";
      case "nec":
        return "bg-[#f0f3f8] dark:bg-slate-900 border-2 border-white/90 dark:border-slate-800 shadow-[-12px_-12px_30px_rgba(255,255,255,0.95),_12px_12px_36px_rgba(163,177,198,0.45)] dark:shadow-[-8px_-8px_24px_rgba(255,255,255,0.05),_8px_8px_30px_rgba(0,0,0,0.6)] text-slate-900 dark:text-white transition-all duration-300";
      case "clay":
        return "glass-surface border-2 border-white shadow-[0_20px_40px_rgba(140,150,200,0.35)] text-slate-900 dark:text-white transition-all duration-300";
      case "glass-neon":
      case "glass-neo":
        return "glass-surface border-2 border-cyan-400/60 shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(0,240,255,0.35)] text-slate-900 dark:text-cyan-50 transition-all duration-300";
      case "dark":
      case "glass":
      default:
        return "glass-surface bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1.5px_2px_rgba(255,255,255,0.2)] text-slate-900 dark:text-white transition-all duration-300";
    }
  };

  return (
    <div className="min-h-screen h-screen w-full flex flex-col items-center justify-between relative overflow-hidden p-0">
      {/* Dynamic Persistent Background Renderer (Video / Image / Gradient) */}
      <BackgroundRenderer />

      {/* Global Header (Bám sát bên trên website 0px, cách thẻ 10px, chiều dài bằng chiều dài thẻ, bo cong góc dưới trái & phải) */}
      <Header 
        theme={theme} 
        setTheme={setTheme} 
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />

      {/* Main Container Wrapper (Cách Header đúng 10px, linh hoạt co giãn theo trạng thái Trang chủ / Trang phụ) */}
      <div 
        className={`mx-auto flex flex-col items-center relative z-10 w-[calc(100%-20px)] sm:w-[92%] lg:w-[88%] xl:w-[85%] max-w-[1250px] mt-[74px] sm:mt-[78px] transition-all duration-500 ease-in-out ${
          isHome ? "mb-[74px] sm:mb-[78px]" : "mb-[22px] sm:mb-[26px]"
        }`}
      >
        {/* Glass Container with Fluid Responsive Height */}
        <div 
          ref={cardContainerRef}
          className={`w-full backdrop-blur-2xl rounded-2xl sm:rounded-3xl lg:rounded-[2rem] overflow-hidden relative flex flex-col transition-all duration-500 ease-in-out ${getMainCardStyle()} ${
            isHome 
              ? "h-[calc(100vh-148px)] sm:h-[calc(100vh-156px)]" 
              : "h-[calc(100vh-96px)] sm:h-[calc(100vh-104px)]"
          } ${
            isSwitching ? "scale-[0.985] opacity-80" : "scale-100 opacity-100"
          }`}
        >
          <main className="relative w-full h-full overflow-hidden flex-grow">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSection}
                id={activeSection}
                style={activeSection === "education" ? { marginLeft: "10px" } : undefined}
                initial={{ 
                  y: 90, 
                  opacity: 0, 
                  scale: 0.98,
                  filter: "blur(4px)" 
                }}
                animate={{ 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  filter: "blur(0px)" 
                }}
                exit={{ 
                  y: -50, 
                  opacity: 0, 
                  scale: 0.98,
                  filter: "blur(4px)" 
                }}
                transition={{ 
                  duration: 0.42, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={`w-full h-full ${currentSection.padding} no-scrollbar scroll-smooth`}
              >
                <CurrentComponent />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

      </div>

      {/* RIGHT FLOATING PAGE PROGRESS STEPPER - TRANSPARENT GLASSMORPHISM */}
      <div className="fixed right-3 lg:right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center p-2.5 rounded-full bg-transparent space-y-3 transition-all duration-300">
        {/* Progress Line with Glass effect */}
        <div className="absolute top-5 bottom-5 w-0.5 bg-white/20 dark:bg-white/10 pointer-events-none backdrop-blur-xs">
          <div 
            className="w-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{ height: `${(activeIndex / (SECTIONS.length - 1)) * 100}%` }}
          />
        </div>
        
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          const Icon = sec.Icon;
          return (
            <div key={sec.id} className="relative group/step flex items-center justify-center py-0.5">
              {/* Tooltip Badge (Slide to the Left with Glassmorphism) */}
              <div className="absolute right-9 px-3 py-1.5 rounded-xl bg-slate-900/95 dark:bg-slate-950/95 border border-white/20 text-white text-[11px] font-black tracking-wide whitespace-nowrap opacity-0 translate-x-3 scale-95 group-hover/step:opacity-100 group-hover/step:translate-x-0 group-hover/step:scale-100 transition-all duration-200 pointer-events-none shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] flex items-center gap-2 backdrop-blur-md">
                <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <Icon className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <span>{t(sec.labelKey)}</span>
                <span className="text-[9px] text-blue-400 font-mono bg-blue-500/10 px-1.5 py-0.5 rounded-md">({idx + 1}/{SECTIONS.length})</span>
              </div>
              
              {/* Target Indicator Button with Vertical Bars (Dấu gạch dọc) */}
              <button
                onClick={() => navigateToSection(sec.id)}
                className={`relative z-10 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  isActive 
                    ? "w-1.5 h-6.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 shadow-md shadow-indigo-500/60 ring-2 ring-white/80 dark:ring-slate-800 scale-105" 
                    : "w-1 h-3.5 bg-slate-400/80 dark:bg-slate-600 hover:w-1.5 hover:h-6 hover:bg-indigo-500 dark:hover:bg-indigo-400"
                }`}
                title={t(sec.labelKey)}
              >
                {/* Ping wave effect for active item */}
                {isActive && (
                  <span className="absolute -inset-1 rounded-full border border-indigo-500/60 animate-ping opacity-60 pointer-events-none" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Global Footer (Full on Home / Collapsed Edge with Slide-up on Other Pages) */}
      <Footer 
        theme={theme}
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />

      {/* High-Precision Interactive Point Cursor with 5 selectable effects */}
      <PointCursor />

      {/* X-Ray Inspector Tool */}
      <XRayInspector />

      {/* AI Assistant Representative for Nguyễn Hùng Thái */}
      <AIAssistant />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BackgroundProvider>
        <LayoutProvider>
          <LanguageProvider>
            <SoundProvider>
              <CursorProvider>
                <MainContent />
              </CursorProvider>
            </SoundProvider>
          </LanguageProvider>
        </LayoutProvider>
      </BackgroundProvider>
    </ThemeProvider>
  );
}


