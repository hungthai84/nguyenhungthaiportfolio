import React from "react";

interface WebsiteGradientIconProps {
  type:
    | "home"
    | "letter"
    | "about"
    | "domains"
    | "education"
    | "experience"
    | "skills"
    | "projects"
    | "systems"
    | "wallpapers"
    | "memories"
    | "interview"
    | "tuvi"
    | "ai"
    | "contact";
  index?: number;
  extraClass?: string;
}

export default function WebsiteGradientIcon({ type, index = 1, extraClass = "w-12 h-12" }: WebsiteGradientIconProps) {
  const id = `web-grad-${type}-${index}`;

  const getColors = () => {
    switch (type) {
      case "home": return { start: "#334155", end: "#0f172a", shadow: "#1e293b" };
      case "letter": return { start: "#fb7185", end: "#e11d48", shadow: "#f43f5e" };
      case "about": return { start: "#38bdf8", end: "#1d4ed8", shadow: "#2563eb" };
      case "domains": return { start: "#c084fc", end: "#6b21a8", shadow: "#7e22ce" };
      case "education": return { start: "#a855f7", end: "#581c87", shadow: "#7e22ce" };
      case "experience": return { start: "#fbbf24", end: "#ea580c", shadow: "#f59e0b" };
      case "skills": return { start: "#fcd34d", end: "#d97706", shadow: "#f59e0b" };
      case "projects": return { start: "#34d399", end: "#047857", shadow: "#10b981" };
      case "interview": return { start: "#3b82f6", end: "#1e3a8a", shadow: "#2563eb" };
      case "tuvi": return { start: "#c084fc", end: "#6b21a8", shadow: "#9333ea" };
      case "systems": return { start: "#60a5fa", end: "#1d4ed8", shadow: "#2563eb" };
      case "memories": return { start: "#fca5a5", end: "#dc2626", shadow: "#ef4444" };
      case "ai": return { start: "#818cf8", end: "#3730a3", shadow: "#4f46e5" };
      case "wallpapers": return { start: "#38bdf8", end: "#1d4ed8", shadow: "#2563eb" };
      case "contact": return { start: "#38bdf8", end: "#1d4ed8", shadow: "#2563eb" };
      default: return { start: "#3b82f6", end: "#1d4ed8", shadow: "#3b82f6" };
    }
  };

  const colors = getColors();

  return (
    <div className={`relative inline-flex items-center justify-center ${extraClass}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
        <defs>
          <linearGradient id={`${id}-grad-main`} x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor={colors.start} />
            <stop offset="1" stopColor={colors.end} />
          </linearGradient>
          <linearGradient id={`${id}-grad-accent`} x1="20" y1="20" x2="80" y2="80">
            <stop stopColor="#fde047" />
            <stop offset="1" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id={`${id}-grad-gold`} x1="0" y1="0" x2="100" y2="100">
            <stop stopColor="#fef08a" />
            <stop offset="0.5" stopColor="#eab308" />
            <stop offset="1" stopColor="#a16207" />
          </linearGradient>
        </defs>
        <g>
          {type === "home" && (
            <>
              {/* Home Icon */}
              <rect x="15" y="15" width="70" height="70" rx="16" fill={`url(#${id}-grad-main)`} />
              <path d="M 50 25 L 25 45 V 75 H 40 V 55 H 60 V 75 H 75 V 45 Z" fill="#ffffff" />
            </>
          )}
          {type === "letter" && (
            <>
              {/* 3D Envelope */}
              <path d="M 12 42 L 50 15 L 88 42 V 82 H 12 Z" fill={`url(#${id}-grad-main)`} />
              <rect x="24" y="22" width="52" height="34" rx="4" fill="#ffffff" />
              <path d="M 50 42 C 50 42, 44 34, 40 38 C 36 42, 40 48, 50 54 C 60 48, 64 42, 60 38 C 56 34, 50 42, 50 42 Z" fill="#ef4444" />
              <path d="M 12 42 L 50 68 L 88 42" fill="none" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 12 82 L 40 60" fill="none" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
              <path d="M 88 82 L 60 60" fill="none" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
            </>
          )}
          {type === "about" && (
            <>
              <rect x="15" y="25" width="70" height="50" rx="12" fill={`url(#${id}-grad-main)`} />
              <circle cx="36" cy="42" r="8" fill="#ffffff" />
              <path d="M 22 62 Q 22 52 36 52 Q 50 52 50 62 Z" fill="#ffffff" />
              <rect x="56" y="40" width="20" height="4" rx="2" fill="#ffffff" opacity="0.8" />
              <rect x="56" y="50" width="20" height="4" rx="2" fill="#ffffff" opacity="0.8" />
            </>
          )}
          {type === "domains" && (
            <>
              <circle cx="50" cy="50" r="30" fill={`url(#${id}-grad-main)`} />
              <circle cx="50" cy="25" r="10" fill="#f59e0b" />
              <circle cx="28" cy="62" r="10" fill="#22c55e" />
              <circle cx="72" cy="62" r="10" fill="#3b82f6" />
              <path d="M 50 35 L 34 56 M 50 35 L 66 56 M 38 62 L 62 62" stroke="#ffffff" strokeWidth="4" />
            </>
          )}
          {type === "education" && (
            <>
              <path d="M 50 18 L 88 34 L 50 50 L 12 34 Z" fill={`url(#${id}-grad-main)`} />
              <path d="M 28 44 V 68 C 28 78, 72 78, 72 68 V 44" fill={`url(#${id}-grad-main)`} opacity="0.85" />
              <path d="M 50 34 L 78 46 V 65" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="78" cy="65" r="5" fill="#fef08a" />
            </>
          )}
          {type === "experience" && (
            <>
              <rect x="16" y="32" width="68" height="48" rx="8" fill={`url(#${id}-grad-main)`} />
              <path d="M 36 32 V 20 H 64 V 32" stroke={`url(#${id}-grad-main)`} strokeWidth="8" strokeLinecap="round" fill="none" />
              <rect x="42" y="38" width="16" height="12" rx="2" fill="#fef08a" />
            </>
          )}
          {type === "skills" && (
            <>
              <path d="M 50 15 C 30 15, 25 35, 35 48 C 40 54, 42 60, 42 65 H 58 C 58 60, 60 54, 65 48 C 75 35, 70 15, 50 15 Z" fill={`url(#${id}-grad-main)`} />
              <rect x="44" y="68" width="12" height="12" rx="2" fill="#94a3b8" />
              <path d="M 40 82 H 60" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              <path d="M 45 45 L 50 35 L 55 45 M 50 35 V 60" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          )}
          {type === "projects" && (
            <>
              <path d="M 12 30 C 12 24, 18 20, 26 20 H 42 L 52 32 H 84 C 90 32, 88 38, 88 44 V 80 H 12 Z" fill={`url(#${id}-grad-main)`} />
              <path d="M 35 55 L 45 45 L 35 35" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 65 55 L 55 45 L 65 35" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          )}
          {type === "interview" && (
            <>
              <path d="M 20 55 C 20 35, 45 35, 45 55 C 45 75, 20 75, 20 55 Z" fill={`url(#${id}-grad-main)`} />
              <path d="M 25 70 L 15 80 L 30 72" fill={`url(#${id}-grad-main)`} />
              <circle cx="28" cy="55" r="3" fill="#ffffff" />
              <circle cx="38" cy="55" r="3" fill="#ffffff" />
              
              <path d="M 45 40 C 45 25, 80 25, 80 40 C 80 55, 45 55, 45 40 Z" fill="#fcd34d" />
              <path d="M 75 52 L 85 60 L 70 50" fill="#fcd34d" />
            </>
          )}
          {type === "tuvi" && (
            <>
              <circle cx="50" cy="50" r="36" fill={`url(#${id}-grad-main)`} />
              <path d="M 40 30 Q 55 30 50 45 Q 40 55 55 70 Q 30 70 30 50 Z" fill="#fef08a" />
              <circle cx="65" cy="40" r="4" fill="#ffffff" />
              <circle cx="35" cy="60" r="3" fill="#ffffff" />
              <circle cx="70" cy="65" r="5" fill="#ffffff" />
            </>
          )}
          {type === "systems" && (
            <>
              <circle cx="50" cy="50" r="30" fill={`url(#${id}-grad-main)`} />
              <circle cx="50" cy="50" r="15" fill="#ffffff" />
              <rect x="42" y="10" width="16" height="15" rx="4" fill={`url(#${id}-grad-main)`} />
              <rect x="42" y="75" width="16" height="15" rx="4" fill={`url(#${id}-grad-main)`} />
              <rect x="10" y="42" width="15" height="16" rx="4" fill={`url(#${id}-grad-main)`} />
              <rect x="75" y="42" width="15" height="16" rx="4" fill={`url(#${id}-grad-main)`} />
            </>
          )}
          {type === "memories" && (
            <>
              <rect x="15" y="20" width="50" height="50" rx="8" fill="#f59e0b" transform="rotate(-10 40 45)" />
              <rect x="35" y="30" width="50" height="50" rx="8" fill={`url(#${id}-grad-main)`} />
              <path d="M 35 60 L 50 45 L 65 60 L 85 45 V 80 H 35 Z" fill="#ffffff" opacity="0.8" />
              <circle cx="50" cy="45" r="6" fill="#fef08a" />
            </>
          )}
          {type === "ai" && (
            <>
              <rect x="20" y="25" width="60" height="50" rx="25" fill={`url(#${id}-grad-main)`} />
              <circle cx="35" cy="45" r="8" fill="#ffffff" />
              <circle cx="65" cy="45" r="8" fill="#ffffff" />
              <path d="M 40 65 Q 50 75 60 65" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" fill="none" />
              <rect x="8" y="40" width="12" height="20" rx="6" fill={`url(#${id}-grad-main)`} />
              <rect x="80" y="40" width="12" height="20" rx="6" fill={`url(#${id}-grad-main)`} />
              <circle cx="50" cy="15" r="5" fill="#fef08a" />
              <rect x="48" y="15" width="4" height="10" fill="#fef08a" />
            </>
          )}
          {type === "wallpapers" && (
            <>
              <rect x="15" y="20" width="70" height="60" rx="12" fill={`url(#${id}-grad-main)`} />
              <circle cx="65" cy="40" r="10" fill="#fef08a" />
              <path d="M 15 65 L 45 35 L 85 75" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" fill="none" />
            </>
          )}
          {type === "contact" && (
            <>
              <rect x="25" y="15" width="50" height="70" rx="8" fill={`url(#${id}-grad-main)`} />
              <rect x="15" y="25" width="10" height="10" rx="3" fill="#ef4444" />
              <rect x="15" y="45" width="10" height="10" rx="3" fill="#f59e0b" />
              <rect x="15" y="65" width="10" height="10" rx="3" fill="#22c55e" />
              <circle cx="50" cy="40" r="12" fill="#ffffff" />
              <path d="M 35 70 Q 35 55 50 55 Q 65 55 65 70 Z" fill="#ffffff" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
