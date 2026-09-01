export type BackgroundType = 'image' | 'video' | 'gradient' | 'beach' | 'animated-gradient';

export interface BackgroundItem {
  id: string;
  name?: string;
  type: BackgroundType;
  url: string;
  previewUrl?: string;
  category?: string;
  isCustom?: boolean;
  tags?: string[];
  addedAt?: number;
}

export interface BackgroundConfig {
  version?: number;
  savedAt?: string;
  selectedWallpaperId?: string;
  isWallpaperHidden?: boolean;
  activeId: string; // 'default-gradient' or item id or preset id
  activeType: BackgroundType;
  activeUrl: string;
  overlayOpacity: number; // 0 to 80% dimming
  blurAmount: number; // 0 to 20px blur
  items: BackgroundItem[];
}
