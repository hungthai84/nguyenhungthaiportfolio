import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SoundType, playWebAudioSound } from "../utils/soundEffects";

interface SoundContextType {
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  playSound: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app_sound_muted");
      return saved === "true";
    }
    return false;
  });

  const [volume, setVolumeState] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedVol = localStorage.getItem("app_sound_volume");
      return savedVol ? parseFloat(savedVol) : 0.6;
    }
    return 0.6;
  });

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem("app_sound_muted", String(next));
      if (!next) {
        // play small toggle on confirmation
        setTimeout(() => playWebAudioSound("toggle", volume), 50);
      }
      return next;
    });
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    localStorage.setItem("app_sound_volume", String(clamped));
  };

  const playSound = (type: SoundType) => {
    if (isMuted) return;
    playWebAudioSound(type, volume);
  };

  // Attach global automatic micro-interactions for buttons, links, inputs
  useEffect(() => {
    let lastHoverTime = 0;

    const handlePointerOver = (e: MouseEvent) => {
      if (isMuted) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, input, select, textarea, [role='button'], .cursor-pointer, .glass-card, [data-interactive]");
      if (interactive) {
        const now = Date.now();
        // Debounce 70ms to prevent audio spam on fast sweeping
        if (now - lastHoverTime > 70) {
          lastHoverTime = now;
          playWebAudioSound("hover", volume * 0.7);
        }
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (isMuted) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, input, select, textarea, [role='button'], .cursor-pointer, [data-interactive]");
      if (interactive) {
        // Don't play click sound if it's the mute toggle itself
        if (interactive.getAttribute("data-no-click-sound")) return;
        playWebAudioSound("click", volume * 0.9);
      }
    };

    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMuted, volume]);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        volume,
        toggleMute,
        setVolume,
        playSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
