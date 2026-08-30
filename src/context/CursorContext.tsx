import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CursorEffectType = "off" | "default" | "sparkles" | "cyber" | "bubbles" | "clay";

export interface CursorEffectOption {
  id: CursorEffectType;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  iconName: string;
  color: string;
}

export const CURSOR_EFFECTS: CursorEffectOption[] = [
  {
    id: "off",
    nameVi: "0. Tắt con trỏ tùy chỉnh (Con trỏ HĐH)",
    nameEn: "0. Turn Off Custom Cursor (System Default)",
    descVi: "Tắt tất cả hiệu ứng con trỏ tùy chỉnh & dùng con trỏ mặc định",
    descEn: "Disable custom cursor effects & use standard system mouse",
    iconName: "PowerOff",
    color: "#94a3b8"
  },
  {
    id: "default",
    nameVi: "1. Vòng tròn Ma thuật",
    nameEn: "1. Magic Precision Ring",
    descVi: "Chấm tròn tinh tế và vòng lặp theo dõi mượt mà",
    descEn: "Clean precision dot and smooth tracking ring",
    iconName: "Target",
    color: "#ff451b"
  },
  {
    id: "sparkles",
    nameVi: "2. Bụi sao Lấp lánh",
    nameEn: "2. Sparkling Star Dust",
    descVi: "Vệt sao phát sáng rực rỡ lấp lánh khi di chuyển",
    descEn: "Radiant glowing star dust trailing mouse movement",
    iconName: "Sparkles",
    color: "#eab308"
  },
  {
    id: "cyber",
    nameVi: "3. Laser Neon Cyber",
    nameEn: "3. Cyber Laser Neon",
    descVi: "Tia hồng ngoại và vòng ngắm điện tử phát quang",
    descEn: "Cyan neon crosshair and pulsing holographic reticle",
    iconName: "Zap",
    color: "#00e5ff"
  },
  {
    id: "bubbles",
    nameVi: "4. Bong bóng Thủy tinh",
    nameEn: "4. Fluid Water Bubbles",
    descVi: "Bọt nước trong suốt trôi nổi và gợn sóng khi nhấp",
    descEn: "Translucent floating water bubbles and click ripples",
    iconName: "Droplets",
    color: "#3b82f6"
  },
  {
    id: "clay",
    nameVi: "5. Khối 3D Clay Bouncy",
    nameEn: "5. 3D Clay Orb",
    descVi: "Quả cầu đất sét 3D nảy mềm mại và phồng khi hover",
    descEn: "Soft 3D clay sphere bouncing smoothly with squish",
    iconName: "Palette",
    color: "#8b5cf6"
  }
];

interface CursorContextType {
  cursorEffect: CursorEffectType;
  setCursorEffect: (effect: CursorEffectType) => void;
  cursorEffects: CursorEffectOption[];
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

const CURSOR_STORAGE_KEY = "portfolio_cursor_effect";

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorEffect, setCursorEffectState] = useState<CursorEffectType>(() => {
    try {
      const saved = localStorage.getItem(CURSOR_STORAGE_KEY) as CursorEffectType | null;
      if (saved && CURSOR_EFFECTS.some(e => e.id === saved)) {
        return saved;
      }
    } catch (e) {
      console.warn("Could not read cursor effect from storage", e);
    }
    return "default";
  });

  const setCursorEffect = (effect: CursorEffectType) => {
    setCursorEffectState(effect);
    try {
      localStorage.setItem(CURSOR_STORAGE_KEY, effect);
    } catch (e) {
      console.warn("Could not save cursor effect to storage", e);
    }
  };

  return (
    <CursorContext.Provider value={{ cursorEffect, setCursorEffect, cursorEffects: CURSOR_EFFECTS }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
