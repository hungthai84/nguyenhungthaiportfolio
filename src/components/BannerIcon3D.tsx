import React from "react";

export interface BannerIcon3DProps {
  iconType: string;
  className?: string;
  size?: number;
}

export function BannerIcon3D({ iconType, className = "w-10 h-10", size = 48 }: BannerIcon3DProps) {
  const normalizedType = (iconType || "").toLowerCase().trim();

  switch (normalizedType) {
    // 1. Thư ngỏ (Open Letter)
    case "letter":
    case "openletter":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Envelope Body */}
          <path d="M8 22C8 17.5817 11.5817 14 16 14H48C52.4183 14 56 17.5817 56 22V44C56 48.4183 52.4183 52 48 52H16C11.5817 52 8 48.4183 8 44V22Z" fill="url(#letter_body)" />
          {/* Open Envelope Top Flap Shadow & Inner */}
          <path d="M8 22L32 38L56 22" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Paper sliding out */}
          <rect x="16" y="10" width="32" height="24" rx="4" fill="url(#letter_paper)" shadow="0 4px 8px rgba(0,0,0,0.15)" />
          {/* Heart on Paper */}
          <path d="M32 25C32 25 25 20.5 25 17C25 15 26.5 13.5 28.5 13.5C30 13.5 31.2 14.3 32 15.2C32.8 14.3 34 13.5 35.5 13.5C37.5 13.5 39 15 39 17C39 20.5 32 25 32 25Z" fill="#F43F5E" />
          {/* Envelope Front Pocket */}
          <path d="M8 26L28.8 41.6C30.7 43 33.3 43 35.2 41.6L56 26V44C56 48.4 52.4 52 48 52H16C11.6 52 8 48.4 8 44V26Z" fill="url(#letter_front)" />
          
          <defs>
            <linearGradient id="letter_body" x1="8" y1="14" x2="56" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB7185" />
              <stop offset="1" stopColor="#E11D48" />
            </linearGradient>
            <linearGradient id="letter_paper" x1="16" y1="10" x2="48" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#F1F5F9" />
            </linearGradient>
            <linearGradient id="letter_front" x1="8" y1="26" x2="56" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF4D6D" />
              <stop offset="1" stopColor="#C2410C" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 2. Giới thiệu (About / Profile ID Card)
    case "about":
    case "profile":
    case "user":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* ID Card Base */}
          <rect x="8" y="14" width="48" height="36" rx="10" fill="url(#about_bg)" />
          {/* Gloss overlay */}
          <path d="M8 22C8 17.5817 11.5817 14 16 14H48C52.4183 14 56 17.5817 56 22V28L8 34V22Z" fill="white" fillOpacity="0.2" />
          {/* User Head */}
          <circle cx="24" cy="28" r="6" fill="white" />
          {/* User Shoulder Arc */}
          <path d="M15 42C15 37.5817 18.5817 34 23 34H25C29.4183 34 33 37.5817 33 42V43H15V42Z" fill="white" />
          {/* Info Lines */}
          <rect x="37" y="25" width="13" height="4" rx="2" fill="white" fillOpacity="0.9" />
          <rect x="37" y="33" width="10" height="3" rx="1.5" fill="white" fillOpacity="0.7" />

          <defs>
            <linearGradient id="about_bg" x1="8" y1="14" x2="56" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 3. Học vấn (Education / Graduation Cap)
    case "education":
    case "academic":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Cap Cap Base / Skullcap */}
          <path d="M20 34V42C20 46 25.3726 49 32 49C38.6274 49 44 46 44 42V34" fill="url(#edu_skull)" />
          {/* Top Diamond Mortarboard */}
          <path d="M32 12L58 24L32 36L6 24L32 12Z" fill="url(#edu_top)" />
          {/* Underside Shadow */}
          <path d="M32 36L58 24L52 21.2L32 31L12 21.2L6 24L32 36Z" fill="#4C1D95" fillOpacity="0.4" />
          {/* Tassel Button */}
          <circle cx="32" cy="24" r="2.5" fill="#FBBF24" />
          {/* Tassel String & Pendant */}
          <path d="M32 24C32 24 45 28 47 34V42" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Tassel Drop Ring & Fringe */}
          <circle cx="47" cy="42" r="2.5" fill="#F59E0B" />
          <path d="M45 44.5L49 44.5L48 50L46 50L45 44.5Z" fill="#FBBF24" />

          <defs>
            <linearGradient id="edu_skull" x1="20" y1="34" x2="44" y2="49" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6D28D9" />
              <stop offset="1" stopColor="#4C1D95" />
            </linearGradient>
            <linearGradient id="edu_top" x1="6" y1="12" x2="58" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A855F7" />
              <stop offset="0.5" stopColor="#7C3AED" />
              <stop offset="1" stopColor="#581C87" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 4. Kinh nghiệm (Experience / Briefcase)
    case "experience":
    case "work":
    case "career":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Top Handle */}
          <path d="M24 16C24 13.7909 25.7909 12 28 12H36C38.2091 12 40 13.7909 40 16V18H24V16Z" fill="#D97706" />
          {/* Handle Inner Hole */}
          <rect x="27" y="15" width="10" height="3" rx="1.5" fill="#78350F" />
          {/* Briefcase Body */}
          <rect x="8" y="18" width="48" height="34" rx="8" fill="url(#exp_body)" />
          {/* Top Flap Overlay */}
          <path d="M8 26C8 21.5817 11.5817 18 16 18H48C52.4183 18 56 21.5817 56 26V30L36 34H28L8 30V26Z" fill="url(#exp_flap)" />
          {/* Center Lock / Clasp */}
          <rect x="27" y="30" width="10" height="8" rx="2" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
          <circle cx="32" cy="34" r="1.5" fill="#78350F" />

          <defs>
            <linearGradient id="exp_body" x1="8" y1="18" x2="56" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F97316" />
              <stop offset="1" stopColor="#C2410C" />
            </linearGradient>
            <linearGradient id="exp_flap" x1="8" y1="18" x2="56" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBBF24" />
              <stop offset="1" stopColor="#F97316" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 5. Lĩnh vực (Domains / Industry Networks)
    case "domains":
    case "domain":
    case "industry":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Network Connection Lines */}
          <line x1="32" y1="16" x2="16" y2="28" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="16" x2="48" y2="28" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="16" y1="28" x2="20" y2="48" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="28" x2="44" y2="48" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="48" x2="44" y2="48" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="33" x2="32" y2="16" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="33" x2="16" y2="28" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="33" x2="48" y2="28" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

          {/* Central Blue Hexagon */}
          <path d="M32 23L41 28V38L32 43L23 38V28L32 23Z" fill="url(#domain_center)" />
          {/* Top Orange Node */}
          <circle cx="32" cy="15" r="6" fill="#F97316" stroke="#FFFFFF" strokeWidth="2" />
          {/* Left Green Node */}
          <circle cx="15" cy="28" r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
          {/* Right Purple Node */}
          <circle cx="49" cy="28" r="6" fill="#A855F7" stroke="#FFFFFF" strokeWidth="2" />
          {/* Bottom Left Green Node */}
          <circle cx="20" cy="49" r="6" fill="#34D399" stroke="#FFFFFF" strokeWidth="2" />
          {/* Bottom Right Purple Node */}
          <circle cx="44" cy="49" r="6" fill="#C084FC" stroke="#FFFFFF" strokeWidth="2" />

          <defs>
            <linearGradient id="domain_center" x1="23" y1="23" x2="41" y2="43" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 6. Kỹ năng (Skills / Lightbulb)
    case "skills":
    case "skill":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Glowing Aura Rays */}
          <line x1="32" y1="6" x2="32" y2="10" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="14" y1="14" x2="17" y2="17" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="14" x2="47" y2="17" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="8" y1="30" x2="12" y2="30" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="56" y1="30" x2="52" y2="30" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />

          {/* Bulb Glass Body */}
          <path d="M32 14C22.0589 14 14 22.0589 14 32C14 38.3 17.2 43.8 22 47V51C22 52.1 22.9 53 24 53H40C41.1 53 42 52.1 42 51V47C46.8 43.8 50 38.3 50 32C50 22.0589 41.9411 14 32 14Z" fill="url(#skill_bulb)" />
          {/* Inner Filament */}
          <path d="M27 34C27 31 29 28 32 28C35 28 37 31 37 34" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="27" y1="34" x2="27" y2="44" stroke="#D97706" strokeWidth="2" />
          <line x1="37" y1="34" x2="37" y2="44" stroke="#D97706" strokeWidth="2" />

          {/* Bulb Base Screw Thread */}
          <rect x="23" y="53" width="18" height="4" rx="2" fill="#0284C7" />
          <rect x="25" y="57" width="14" height="3" rx="1.5" fill="#0369A1" />

          <defs>
            <linearGradient id="skill_bulb" x1="14" y1="14" x2="50" y2="51" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE047" />
              <stop offset="0.6" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 7. Dự án (Projects / Code Folder)
    case "projects":
    case "project":
    case "portfolio":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Folder Back Tab */}
          <path d="M8 22C8 17.5817 11.5817 14 16 14H28L34 20H48C52.4183 20 56 23.5817 56 28V44C56 48.4183 52.4183 52 48 52H16C11.5817 52 8 48.4183 8 44V22Z" fill="url(#proj_back)" />
          {/* Front Folder Pocket */}
          <path d="M8 26C8 22.6863 10.6863 20 14 20H50C53.3137 20 56 22.6863 56 26V44C56 48.4183 52.4183 52 48 52H16C11.5817 52 8 48.4183 8 44V26Z" fill="url(#proj_front)" />
          {/* Code Brackets symbol </ > */}
          <path d="M24 32L18 36L24 40" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 32L46 36L40 40" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="34" y1="30" x2="30" y2="42" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

          <defs>
            <linearGradient id="proj_back" x1="8" y1="14" x2="56" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#059669" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="proj_front" x1="8" y1="20" x2="56" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="0.5" stopColor="#10B981" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 8. Phỏng vấn (Interview / Chat Speech Bubbles)
    case "interview":
    case "chat":
    case "qa":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Back Orange Speech Bubble */}
          <path d="M30 32C30 25.3726 36.268 20 44 20C51.732 20 58 25.3726 58 32C58 35.8 55.8 39.1 52.3 41.4L55 49L47.5 45.8C46.4 46.2 45.2 46.4 44 46.4C36.268 46.4 30 41.0274 30 34.4" fill="url(#chat_orange)" />
          {/* Front Cyan Speech Bubble */}
          <path d="M6 26C6 17.1634 14.0589 10 24 10C33.9411 10 42 17.1634 42 26C42 34.8366 33.9411 42 24 42C21.2 42 18.5 41.3 16.2 40.1L8 44L10 36.8C7.5 33.9 6 30.1 6 26Z" fill="url(#chat_cyan)" />
          {/* 3 White Dots in Cyan Bubble */}
          <circle cx="16" cy="26" r="2.5" fill="#FFFFFF" />
          <circle cx="24" cy="26" r="2.5" fill="#FFFFFF" />
          <circle cx="32" cy="26" r="2.5" fill="#FFFFFF" />

          <defs>
            <linearGradient id="chat_orange" x1="30" y1="20" x2="58" y2="49" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F97316" />
              <stop offset="1" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="chat_cyan" x1="6" y1="10" x2="42" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 9. Tử vi (Horoscope / Astrology)
    case "tuvi":
    case "astrology":
    case "horoscope":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Outer Astrological Circle Disk */}
          <circle cx="32" cy="32" r="24" fill="url(#tuvi_disk)" stroke="#8B5CF6" strokeWidth="2" />
          {/* Zodiac Border Dots */}
          <circle cx="32" cy="12" r="1.5" fill="#FBBF24" />
          <circle cx="52" cy="32" r="1.5" fill="#FBBF24" />
          <circle cx="32" cy="52" r="1.5" fill="#FBBF24" />
          <circle cx="12" cy="32" r="1.5" fill="#FBBF24" />
          <circle cx="46" cy="18" r="1.2" fill="#E2E8F0" />
          <circle cx="46" cy="46" r="1.2" fill="#E2E8F0" />
          <circle cx="18" cy="46" r="1.2" fill="#E2E8F0" />
          <circle cx="18" cy="18" r="1.2" fill="#E2E8F0" />

          {/* Golden Crescent Moon */}
          <path d="M38 21C31.3726 21 26 26.3726 26 33C26 39.6274 31.3726 45 38 45C34 45 29 40 29 33C29 26 34 21 38 21Z" fill="url(#tuvi_moon)" />
          {/* Star Sparkles */}
          <path d="M42 22L43.5 25L46.5 26.5L43.5 28L42 31L40.5 28L37.5 26.5L40.5 25L42 22Z" fill="#FDE047" />
          <path d="M22 36L23 38L25 39L23 40L22 42L21 40L19 39L21 38L22 36Z" fill="#FDE047" />

          <defs>
            <linearGradient id="tuvi_disk" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6D28D9" />
              <stop offset="1" stopColor="#2E1065" />
            </linearGradient>
            <linearGradient id="tuvi_moon" x1="26" y1="21" x2="38" y2="45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE047" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 10. Hệ thống (Systems / Gear Cog)
    case "systems":
    case "system":
    case "settings":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* 3D Blue Gear Wheel */}
          <path d="M28 8H36V14.2C38 14.7 39.9 15.5 41.6 16.5L46 12L51.6 17.6L47.1 22C48.1 23.7 48.9 25.6 49.4 27.6H55.6V35.6H49.4C48.9 37.6 48.1 39.5 47.1 41.2L51.6 45.6L46 51.2L41.6 46.7C39.9 47.7 38 48.5 36 49V55.2H28V49C26 48.5 24.1 47.7 22.4 46.7L18 51.2L12.4 45.6L16.9 41.2C15.9 39.5 15.1 37.6 14.6 35.6H8.4V27.6H14.6C15.1 25.6 15.9 23.7 16.9 22L12.4 17.6L18 12L22.4 16.5C24.1 15.5 26 14.7 28 14.2V8Z" fill="url(#sys_gear)" />
          {/* Inner Circle Cutout */}
          <circle cx="32" cy="31.6" r="11" fill="#FFFFFF" />
          <circle cx="32" cy="31.6" r="7" fill="#0284C7" />

          <defs>
            <linearGradient id="sys_gear" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.5" stopColor="#0284C7" />
              <stop offset="1" stopColor="#1E3A8A" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 11. Kỷ niệm (Memories / Gallery)
    case "memories":
    case "memory":
    case "gallery":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Back Photo Card */}
          <rect x="8" y="18" width="36" height="32" rx="6" fill="url(#mem_pink)" transform="rotate(-8 26 34)" />
          {/* Front Photo Card */}
          <rect x="16" y="16" width="40" height="34" rx="6" fill="#FFFFFF" shadow="0 4px 12px rgba(0,0,0,0.2)" />
          {/* Front Photo Inner Screen */}
          <rect x="20" y="20" width="32" height="26" rx="4" fill="url(#mem_sky)" />
          {/* Mountain Peak & Sun */}
          <circle cx="42" cy="27" r="3.5" fill="#FBBF24" />
          <path d="M20 42L28 32L34 38L42 29L52 42H20Z" fill="#10B981" />

          <defs>
            <linearGradient id="mem_pink" x1="8" y1="18" x2="44" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F43F5E" />
              <stop offset="1" stopColor="#FB7185" />
            </linearGradient>
            <linearGradient id="mem_sky" x1="20" y1="20" x2="52" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 12. Trợ lý AI (AI Assistant / Bot)
    case "ai":
    case "assistant":
    case "bot":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Top Antenna */}
          <line x1="32" y1="10" x2="32" y2="17" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="8" r="3.5" fill="#38BDF8" />

          {/* Robot Head Outer Shell */}
          <rect x="12" y="17" width="40" height="34" rx="14" fill="url(#bot_shell)" />
          {/* Side Ears / Headphones */}
          <rect x="6" y="27" width="6" height="14" rx="3" fill="#0284C7" />
          <rect x="52" y="27" width="6" height="14" rx="3" fill="#0284C7" />

          {/* Screen Faceplate */}
          <rect x="18" y="23" width="28" height="22" rx="8" fill="#0F172A" />
          {/* Glowing Eyes */}
          <ellipse cx="26" cy="32" rx="3" ry="4" fill="#38BDF8" />
          <ellipse cx="38" cy="32" rx="3" ry="4" fill="#38BDF8" />
          {/* Smiling Curved Mouth */}
          <path d="M28 39C28 39 30 41 32 41C34 41 36 39 36 39" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />

          <defs>
            <linearGradient id="bot_shell" x1="12" y1="17" x2="52" y2="51" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.8" stopColor="#E2E8F0" />
              <stop offset="1" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 13. Hình nền (Wallpapers / Wallpaper Painting)
    case "wallpapers":
    case "wallpaper":
    case "artwork":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Canvas Board */}
          <rect x="10" y="12" width="44" height="32" rx="6" fill="url(#wall_canvas)" />
          {/* Sun & Mountains on Canvas */}
          <circle cx="42" cy="20" r="4" fill="#FBBF24" />
          <path d="M10 38L22 26L32 34L40 24L54 38H10Z" fill="#2563EB" opacity="0.8" />

          {/* Paintbrush */}
          <path d="M46 52L52 46L42 36L36 42L46 52Z" fill="#D97706" />
          <path d="M36 42L32 46C30 48 30 51 32 53C34 55 37 55 39 53L42 49L36 42Z" fill="#F59E0B" />
          <path d="M30 54C28 55 24 54 22 51C20 48 21 44 23 43L32 46L30 54Z" fill="#A855F7" />

          <defs>
            <linearGradient id="wall_canvas" x1="10" y1="12" x2="54" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#1E40AF" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 14. Liên hệ (Contact / Address Book)
    case "contact":
    case "phone":
    case "address":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Notebook Base */}
          <rect x="12" y="12" width="38" height="42" rx="6" fill="url(#contact_bg)" />
          {/* Right Page Binder Tabs */}
          <rect x="50" y="18" width="4" height="6" rx="1" fill="#34D399" />
          <rect x="50" y="27" width="4" height="6" rx="1" fill="#FBBF24" />
          <rect x="50" y="36" width="4" height="6" rx="1" fill="#F43F5E" />

          {/* User Icon on Book */}
          <circle cx="31" cy="28" r="6" fill="#FFFFFF" />
          <path d="M21 44C21 39.5817 24.5817 36 29 36H33C37.4183 36 41 39.5817 41 44V45H21V44Z" fill="#FFFFFF" />

          <defs>
            <linearGradient id="contact_bg" x1="12" y1="12" x2="50" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
        </svg>
      );

    // 15. Trang chủ (Home)
    case "home":
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
          {/* Dark Rounded Container */}
          <rect x="8" y="8" width="48" height="48" rx="12" fill="url(#home_bg)" stroke="#334155" strokeWidth="2" />
          {/* House Roof & Body */}
          <path d="M32 18L18 30V44C18 46.2 19.8 48 22 48H42C44.2 48 46 46.2 46 44V30L32 18Z" fill="url(#home_roof)" />
          {/* Doorway */}
          <path d="M28 48V36H36V48H28Z" fill="#0F172A" />

          <defs>
            <linearGradient id="home_bg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1E293B" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="home_roof" x1="18" y1="18" x2="46" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
      );
  }
}
