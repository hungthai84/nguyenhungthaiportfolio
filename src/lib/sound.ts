import { playWebAudioSound, SoundType } from "../utils/soundEffects";

export function playUiSound(type: "click" | "hover" | "switch" | "success" | "special" | "toggle" | "warp" = "click") {
  const isMuted = typeof window !== "undefined" && localStorage.getItem("app_sound_muted") === "true";
  if (isMuted) return;
  const vol = typeof window !== "undefined" && localStorage.getItem("app_sound_volume") 
    ? parseFloat(localStorage.getItem("app_sound_volume")!) 
    : 0.6;
  playWebAudioSound(type as SoundType, vol);
}
