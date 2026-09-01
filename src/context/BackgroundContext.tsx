import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BackgroundItem, BackgroundConfig, BackgroundType } from "../types/background";

// Initial wallpapers imported directly from user's JSON
export const INITIAL_WALLPAPERS_FROM_JSON: BackgroundItem[] = [
  {
    id: "animated-gradient-codepen",
    name: "Cực quang Tam sắc (Animated Gradient)",
    url: "animated-gradient",
    previewUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=200",
    type: "animated-gradient",
    category: "gradient",
    isCustom: false,
    tags: ["custom", "codepen", "gradient", "animated", "dynamic"]
  },
  {
    id: "beach-wave-codepen",
    name: "Sóng Biển (CodePen Interactive)",
    url: "beach",
    previewUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=200",
    type: "beach",
    category: "custom",
    isCustom: true,
    tags: ["custom", "codepen", "wave", "beach", "dynamic"]
  },
  // Custom Wallpapers from JSON
  {
    id: "custom-wp-1787476757058",
    name: "Hình nền #25",
    url: "https://i.pinimg.com/1200x/f4/5c/a5/f45ca538988ec678bdd13564c6e422e0.jpg",
    previewUrl: "https://i.pinimg.com/1200x/f4/5c/a5/f45ca538988ec678bdd13564c6e422e0.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "art", "aesthetic"]
  },
  {
    id: "custom-wp-1787474863337",
    name: "Hình nền #24",
    url: "https://i.pinimg.com/1200x/8b/1e/b9/8b1eb99060f70ca44abb1467991e0218.jpg",
    previewUrl: "https://i.pinimg.com/1200x/8b/1e/b9/8b1eb99060f70ca44abb1467991e0218.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "pastel", "soft"]
  },
  {
    id: "custom-wp-1787474467133",
    name: "Hình nền #23",
    url: "https://i.pinimg.com/1200x/df/a9/7d/dfa97d9d5fc6370a3291a60a7eaac630.jpg",
    previewUrl: "https://i.pinimg.com/1200x/df/a9/7d/dfa97d9d5fc6370a3291a60a7eaac630.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "abstract", "modern"]
  },
  {
    id: "custom-wp-1787411641956",
    name: "Hình nền Video #23",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4",
    previewUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4",
    type: "video",
    category: "video",
    isCustom: true,
    tags: ["custom", "video", "live", "motion"]
  },
  {
    id: "custom-wp-1787411610689",
    name: "Hình nền Video #22",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_034306_165449ef-7d2e-4e81-850f-1939c5cb442d.mp4",
    previewUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_034306_165449ef-7d2e-4e81-850f-1939c5cb442d.mp4",
    type: "video",
    category: "video",
    isCustom: true,
    tags: ["custom", "video", "live", "fluid"]
  },
  {
    id: "custom-wp-1787385268921",
    name: "Hình nền Video #20",
    url: "https://v1.pinimg.com/videos/mc/720p/24/04/f5/2404f5b12afbf179a6aa0be40c5468e4.mp4",
    previewUrl: "https://v1.pinimg.com/videos/mc/720p/24/04/f5/2404f5b12afbf179a6aa0be40c5468e4.mp4",
    type: "video",
    category: "video",
    isCustom: true,
    tags: ["custom", "video", "dynamic"]
  },
  {
    id: "custom-wp-1787385177593",
    name: "Hình nền #19",
    url: "https://i.pinimg.com/1200x/6e/ce/8d/6ece8dd1d119c72abe2ec5975cba98a7.jpg",
    previewUrl: "https://i.pinimg.com/1200x/6e/ce/8d/6ece8dd1d119c72abe2ec5975cba98a7.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "aesthetic"]
  },
  {
    id: "custom-wp-1787385135012",
    name: "Hình nền #18",
    url: "https://i.pinimg.com/1200x/da/78/3c/da783c1ae91c1810381cf8cbc5a234fd.jpg",
    previewUrl: "https://i.pinimg.com/1200x/da/78/3c/da783c1ae91c1810381cf8cbc5a234fd.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "art"]
  },
  {
    id: "custom-wp-1787385080160",
    name: "Hình nền #17",
    url: "https://i.pinimg.com/1200x/f7/ee/67/f7ee67286822641202752fdb2392af61.jpg",
    previewUrl: "https://i.pinimg.com/1200x/f7/ee/67/f7ee67286822641202752fdb2392af61.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "minimal"]
  },
  {
    id: "custom-wp-1787385043511",
    name: "Hình nền #16",
    url: "https://i.pinimg.com/1200x/bf/bd/f2/bfbdf26043b404d7a2ee18f176695c5f.jpg",
    previewUrl: "https://i.pinimg.com/1200x/bf/bd/f2/bfbdf26043b404d7a2ee18f176695c5f.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "nature"]
  },
  {
    id: "custom-wp-1787384730889",
    name: "Hình nền #15",
    url: "https://i.pinimg.com/1200x/23/2c/1d/232c1dfaaee23d7e6c07a2bf66380c40.jpg",
    previewUrl: "https://i.pinimg.com/1200x/23/2c/1d/232c1dfaaee23d7e6c07a2bf66380c40.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "clean"]
  },
  {
    id: "custom-wp-1787384608963",
    name: "Hình nền #14",
    url: "https://i.pinimg.com/1200x/a3/51/a6/a351a69c0a3ddd6dcc1f7d46e9d7fc2f.jpg",
    previewUrl: "https://i.pinimg.com/1200x/a3/51/a6/a351a69c0a3ddd6dcc1f7d46e9d7fc2f.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "scenery"]
  },
  {
    id: "custom-wp-1787384523506",
    name: "Hình nền #13",
    url: "https://i.pinimg.com/1200x/81/43/bd/8143bd40b96f7252f9f2964d0916dafe.jpg",
    previewUrl: "https://i.pinimg.com/1200x/81/43/bd/8143bd40b96f7252f9f2964d0916dafe.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "gradient"]
  },
  {
    id: "custom-wp-1787384473842",
    name: "Hình nền #12",
    url: "https://i.pinimg.com/1200x/8b/4c/38/8b4c383bf9cfe64ec3878f267769f5f3.jpg",
    previewUrl: "https://i.pinimg.com/1200x/8b/4c/38/8b4c383bf9cfe64ec3878f267769f5f3.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "art"]
  },
  {
    id: "custom-wp-1787362727226",
    name: "Hình nền #12 (Mẫu B)",
    url: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    previewUrl: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "soft"]
  },
  {
    id: "custom-wp-1787362700397",
    name: "Hình nền #11",
    url: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    previewUrl: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "minimal"]
  },
  {
    id: "custom-wp-1787362669332",
    name: "Hình nền #10",
    url: "https://i.pinimg.com/1200x/95/3c/ae/953caedb2a4f25bd463c1b74a4329651.jpg",
    previewUrl: "https://i.pinimg.com/1200x/95/3c/ae/953caedb2a4f25bd463c1b74a4329651.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "design"]
  },
  {
    id: "custom-wp-1787362648848",
    name: "Hình nền Video #9",
    url: "https://v1.pinimg.com/videos/mc/720p/10/77/ab/1077abb576579eba02148d3a25d62246.mp4",
    previewUrl: "https://v1.pinimg.com/videos/mc/720p/10/77/ab/1077abb576579eba02148d3a25d62246.mp4",
    type: "video",
    category: "video",
    isCustom: true,
    tags: ["custom", "video", "live"]
  },
  {
    id: "custom-wp-1787362619870",
    name: "Hình nền #8",
    url: "https://i.pinimg.com/1200x/a7/64/67/a764671d012a974456bd70ea13f9e856.jpg",
    previewUrl: "https://i.pinimg.com/1200x/a7/64/67/a764671d012a974456bd70ea13f9e856.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "aesthetic"]
  },
  {
    id: "custom-wp-1787362606619",
    name: "Hình nền #7",
    url: "https://i.pinimg.com/1200x/f8/58/20/f858205b0f91ab2dd9036b3d01e8341a.jpg",
    previewUrl: "https://i.pinimg.com/1200x/f8/58/20/f858205b0f91ab2dd9036b3d01e8341a.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "creative"]
  },
  {
    id: "custom-wp-1787362519361",
    name: "Hình nền #6",
    url: "https://i.pinimg.com/1200x/ea/da/bf/eadabffb44fb936533d37219dd3f5fd5.jpg",
    previewUrl: "https://i.pinimg.com/1200x/ea/da/bf/eadabffb44fb936533d37219dd3f5fd5.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "aesthetic"]
  },
  {
    id: "custom-wp-1787362503783",
    name: "Hình nền #5",
    url: "https://i.pinimg.com/1200x/e5/41/2f/e5412f90727c824210b57af865d48a7e.jpg",
    previewUrl: "https://i.pinimg.com/1200x/e5/41/2f/e5412f90727c824210b57af865d48a7e.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "art"]
  },
  {
    id: "custom-wp-1787362485474",
    name: "Hình nền Video #4",
    url: "https://v1.pinimg.com/videos/iht/hevcMp4V3/cd/8f/44/cd8f44dd4a75d66aeeb1c4343084966a_720w.mp4",
    previewUrl: "https://v1.pinimg.com/videos/iht/hevcMp4V3/cd/8f/44/cd8f44dd4a75d66aeeb1c4343084966a_720w.mp4",
    type: "video",
    category: "video",
    isCustom: true,
    tags: ["custom", "video", "live"]
  },
  {
    id: "custom-wp-1787362377113",
    name: "Hình nền #3",
    url: "https://i.pinimg.com/1200x/88/27/2f/88272fed43faf6368862ac2b6a763fdb.jpg",
    previewUrl: "https://i.pinimg.com/1200x/88/27/2f/88272fed43faf6368862ac2b6a763fdb.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "minimal"]
  },
  {
    id: "custom-wp-1787362244022",
    name: "Hình nền #2",
    url: "https://i.pinimg.com/1200x/4d/80/91/4d80911e8d5f12e891e9a1b78604fc15.jpg",
    previewUrl: "https://i.pinimg.com/1200x/4d/80/91/4d80911e8d5f12e891e9a1b78604fc15.jpg",
    type: "image",
    category: "custom",
    isCustom: true,
    tags: ["custom", "soft"]
  },

  // Curated Preset Themes from JSON allLinks
  {
    id: "img-wp-1",
    name: "Minimalist White Bright Space",
    url: "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
    previewUrl: "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "bright", "space", "4k"]
  },
  {
    id: "img-wp-2",
    name: "Geometric Mountain Calming Visuals",
    url: "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg",
    previewUrl: "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg",
    type: "image",
    category: "nature",
    tags: ["nature", "mountain", "geometric"]
  },
  {
    id: "img-wp-3",
    name: "Aesthetic Landscape 15",
    url: "https://i.ibb.co/R4P1zff0/ta-i-xu-ng-15.jpg",
    previewUrl: "https://i.ibb.co/R4P1zff0/ta-i-xu-ng-15.jpg",
    type: "image",
    category: "nature",
    tags: ["nature", "landscape", "calm"]
  },
  {
    id: "img-wp-4",
    name: "Aesthetic Landscape 14",
    url: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    previewUrl: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg",
    type: "image",
    category: "nature",
    tags: ["nature", "landscape"]
  },
  {
    id: "img-wp-5",
    name: "Aesthetic Landscape 13",
    url: "https://i.ibb.co/S49fBKcv/ta-i-xu-ng-13.jpg",
    previewUrl: "https://i.ibb.co/S49fBKcv/ta-i-xu-ng-13.jpg",
    type: "image",
    category: "nature",
    tags: ["nature", "scenery"]
  },
  {
    id: "img-wp-6",
    name: "Aesthetic Landscape 12",
    url: "https://i.ibb.co/04qypw8/ta-i-xu-ng-12.jpg",
    previewUrl: "https://i.ibb.co/04qypw8/ta-i-xu-ng-12.jpg",
    type: "image",
    category: "nature",
    tags: ["nature", "horizon"]
  },
  {
    id: "img-wp-7",
    name: "Pearlescent Abstract Hues",
    url: "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg",
    previewUrl: "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "pearlescent", "fluid"]
  },
  {
    id: "img-wp-8",
    name: "Best Premium Wallpaper",
    url: "https://i.ibb.co/d0Fw0xdW/Best-wallpaper-1.jpg",
    previewUrl: "https://i.ibb.co/d0Fw0xdW/Best-wallpaper-1.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "premium"]
  },
  {
    id: "img-wp-9",
    name: "Minimal Aesthetic Gradient 2",
    url: "https://i.ibb.co/rKL4ffH2/2.jpg",
    previewUrl: "https://i.ibb.co/rKL4ffH2/2.jpg",
    type: "image",
    category: "gradient",
    tags: ["gradient", "pastel", "aurora"]
  },
  {
    id: "img-wp-10",
    name: "Soft Pastel Atmosphere 12",
    url: "https://i.ibb.co/nq9GHB11/ta-i-xu-ng-12.jpg",
    previewUrl: "https://i.ibb.co/nq9GHB11/ta-i-xu-ng-12.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "atmosphere", "soft"]
  },
  {
    id: "img-wp-11",
    name: "Abstract Silvery Pearlescent Minimal",
    url: "https://i.ibb.co/PZhKjDjP/Abstract-minimalistic-background-image-with-minimal-details-in-silvery-pearlescent-hues-subtle-tex.jpg",
    previewUrl: "https://i.ibb.co/PZhKjDjP/Abstract-minimalistic-background-image-with-minimal-details-in-silvery-pearlescent-hues-subtle-tex.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "silvery", "texture"]
  },
  {
    id: "img-wp-12",
    name: "Clean Aesthetic Wallpaper",
    url: "https://i.ibb.co/Fc1dczn/Wallpaper.jpg",
    previewUrl: "https://i.ibb.co/Fc1dczn/Wallpaper.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "clean"]
  },
  {
    id: "img-wp-13",
    name: "Soft Atmosphere 15",
    url: "https://i.ibb.co/DDCj9TBk/ta-i-xu-ng-15.jpg",
    previewUrl: "https://i.ibb.co/DDCj9TBk/ta-i-xu-ng-15.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "soft"]
  },
  {
    id: "img-wp-14",
    name: "Pastel Minimal Clean Aesthetic",
    url: "https://i.ibb.co/jPN1bS9c/Pastel-Minimal-Wallpaper-Clean-Aesthetic-for-Mac-Book.jpg",
    previewUrl: "https://i.ibb.co/jPN1bS9c/Pastel-Minimal-Wallpaper-Clean-Aesthetic-for-Mac-Book.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "pastel", "mac"]
  },
  {
    id: "img-wp-15",
    name: "Soft Atmosphere 14",
    url: "https://i.ibb.co/chRZYCFs/ta-i-xu-ng-14.jpg",
    previewUrl: "https://i.ibb.co/chRZYCFs/ta-i-xu-ng-14.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "light"]
  },
  {
    id: "img-wp-16",
    name: "Soft Atmosphere 13",
    url: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    previewUrl: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "warm"]
  },
  {
    id: "img-wp-17",
    name: "Soft Atmosphere 16",
    url: "https://i.ibb.co/G4tGQZbB/ta-i-xu-ng-16.jpg",
    previewUrl: "https://i.ibb.co/G4tGQZbB/ta-i-xu-ng-16.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "sky"]
  },
  {
    id: "img-wp-18",
    name: "Abstract Vibrant Horizon 18",
    url: "https://i.pinimg.com/1200x/da/78/3c/da783c1ae91c1810381cf8cbc5a234fd.jpg",
    previewUrl: "https://i.pinimg.com/1200x/da/78/3c/da783c1ae91c1810381cf8cbc5a234fd.jpg",
    type: "image",
    category: "abstract",
    tags: ["abstract", "art"]
  },
  {
    id: "img-wp-19",
    name: "Mental Peace Rest Minimal",
    url: "https://i.ibb.co/zhc5bK7G/Ton-mental-a-aussi-besoin-de-repos.jpg",
    previewUrl: "https://i.ibb.co/zhc5bK7G/Ton-mental-a-aussi-besoin-de-repos.jpg",
    type: "image",
    category: "minimal",
    tags: ["minimal", "mindfulness", "peace"]
  }
];

export interface PresetBackground {
  id: string;
  type: 'image' | 'video';
  url: string;
  previewUrl?: string;
  tag: string;
}

export const PRESET_BACKGROUNDS: PresetBackground[] = [
  {
    id: "preset-vid-1",
    type: "video",
    url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4",
    tag: "Aurora Stream (Video 4K)"
  },
  {
    id: "preset-vid-2",
    type: "video",
    url: "https://v1.pinimg.com/videos/mc/720p/24/04/f5/2404f5b12afbf179a6aa0be40c5468e4.mp4",
    tag: "Abstract Motion (Video HD)"
  },
  {
    id: "preset-vid-3",
    type: "video",
    url: "https://v1.pinimg.com/videos/iht/hevcMp4V3/cd/8f/44/cd8f44dd4a75d66aeeb1c4343084966a_720w.mp4",
    tag: "Fluid Waves (Video HD)"
  },
  {
    id: "preset-img-1",
    type: "image",
    url: "https://i.pinimg.com/1200x/f4/5c/a5/f45ca538988ec678bdd13564c6e422e0.jpg",
    tag: "Hình nền #25 (Aesthetic Clay)"
  },
  {
    id: "preset-img-2",
    type: "image",
    url: "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg",
    tag: "Minimalist White Space (4K)"
  },
  {
    id: "preset-img-3",
    type: "image",
    url: "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg",
    tag: "Pearlescent Hues (Abstract)"
  }
];

interface BackgroundContextType {
  config: BackgroundConfig;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  addBackgroundLink: (url: string, explicitType?: 'image' | 'video', name?: string, category?: string) => boolean;
  removeBackground: (id: string) => void;
  setActiveBackground: (id: string, type: BackgroundType, url: string) => void;
  setOverlayOpacity: (opacity: number) => void;
  setBlurAmount: (blur: number) => void;
  resetToDefaultGradient: () => void;
  exportConfigToJson: () => string;
  importConfigFromJson: (jsonString: string) => { success: boolean; message: string };
  downloadJsonFile: () => void;
  resetToDefaultJsonLibrary: () => void;
}

const STORAGE_KEY = "portfolio_persistent_background_config_v2";

// Default configuration with selected wallpaper #25 from the user's JSON
const DEFAULT_CONFIG: BackgroundConfig = {
  version: 1,
  savedAt: "2026-08-23T09:19:59.655Z",
  selectedWallpaperId: "custom-wp-1787476757058",
  isWallpaperHidden: false,
  activeId: "custom-wp-1787476757058",
  activeType: "image",
  activeUrl: "https://i.pinimg.com/1200x/f4/5c/a5/f45ca538988ec678bdd13564c6e422e0.jpg",
  overlayOpacity: 25, // 25% overlay dim for elegant contrast
  blurAmount: 0,
  items: INITIAL_WALLPAPERS_FROM_JSON
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<BackgroundConfig>(() => {
    let initialConfig = DEFAULT_CONFIG;
    try {
      // Look for the absolute permanent default wallpaper first
      const permanentDefault = localStorage.getItem("portfolio_permanent_default_wallpaper_v2");
      if (permanentDefault) {
        const parsedDefault = JSON.parse(permanentDefault);
        if (parsedDefault && parsedDefault.activeId) {
          initialConfig = {
            ...DEFAULT_CONFIG,
            activeId: parsedDefault.activeId,
            activeType: parsedDefault.activeType,
            activeUrl: parsedDefault.activeUrl,
            selectedWallpaperId: parsedDefault.activeId,
            overlayOpacity: typeof parsedDefault.overlayOpacity === 'number' ? parsedDefault.overlayOpacity : DEFAULT_CONFIG.overlayOpacity,
            blurAmount: typeof parsedDefault.blurAmount === 'number' ? parsedDefault.blurAmount : DEFAULT_CONFIG.blurAmount
          };
        }
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
          return {
            ...initialConfig,
            ...parsed,
            // enforce the absolute permanent choice
            ...(permanentDefault ? JSON.parse(permanentDefault) : {})
          };
        }
      }
    } catch (e) {
      console.error("Failed to load background config from localStorage", e);
    }
    return initialConfig;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync to localStorage on every change so it is permanently saved in the website
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error("Failed to save background config to localStorage", e);
    }
  }, [config]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Auto-detect whether a link is a video or image
  const detectType = (url: string): 'image' | 'video' => {
    const cleanUrl = url.toLowerCase().trim();
    if (
      cleanUrl.includes('.mp4') || 
      cleanUrl.includes('.webm') || 
      cleanUrl.includes('.ogg') || 
      cleanUrl.includes('.mov') ||
      cleanUrl.includes('mixkit.co/videos') ||
      cleanUrl.includes('youtube.com') ||
      cleanUrl.includes('youtu.be') ||
      cleanUrl.includes('vimeo.com')
    ) {
      return 'video';
    }
    return 'image';
  };

  // Add a new background by link ONLY (no name required as per instructions!)
  const addBackgroundLink = (url: string, explicitType?: 'image' | 'video', name?: string, category?: string): boolean => {
    const trimmed = url.trim();
    if (!trimmed) return false;

    const type = explicitType || detectType(trimmed);
    const newId = `custom-wp-${Date.now()}`;

    const newItem: BackgroundItem = {
      id: newId,
      name: name || `Hình nền #${config.items.length + 1}`,
      type,
      url: trimmed,
      previewUrl: trimmed,
      category: category || (type === 'video' ? 'video' : 'custom'),
      isCustom: true,
      tags: ["custom", type],
      addedAt: Date.now()
    };

    setConfig((prev) => {
      const nextConfig = {
        ...prev,
        items: [newItem, ...prev.items],
        activeId: newId,
        activeType: type,
        activeUrl: trimmed,
        selectedWallpaperId: newId
      };
      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: newId,
          activeType: type,
          activeUrl: trimmed,
          overlayOpacity: prev.overlayOpacity,
          blurAmount: prev.blurAmount
        }));
      } catch (e) {}
      return nextConfig;
    });

    return true;
  };

  const removeBackground = (id: string) => {
    setConfig((prev) => {
      const remaining = prev.items.filter((item) => item.id !== id);
      const wasActive = prev.activeId === id;
      const nextConfig = {
        ...prev,
        items: remaining,
        ...(wasActive
          ? {
              activeId: "default-gradient",
              activeType: "gradient",
              activeUrl: "",
              selectedWallpaperId: "default-gradient"
            }
          : {})
      };

      if (wasActive) {
        try {
          localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
            activeId: "default-gradient",
            activeType: "gradient",
            activeUrl: "",
            overlayOpacity: prev.overlayOpacity,
            blurAmount: prev.blurAmount
          }));
        } catch (e) {}
      }
      return nextConfig;
    });
  };

  const setActiveBackground = (id: string, type: BackgroundType, url: string) => {
    setConfig((prev) => {
      const nextConfig = {
        ...prev,
        activeId: id,
        activeType: type,
        activeUrl: url,
        selectedWallpaperId: id,
        isWallpaperHidden: id === "none"
      };
      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: id,
          activeType: type,
          activeUrl: url,
          overlayOpacity: prev.overlayOpacity,
          blurAmount: prev.blurAmount
        }));
      } catch (e) {}
      return nextConfig;
    });
  };

  const setOverlayOpacity = (opacity: number) => {
    setConfig((prev) => {
      const nextOpacity = Math.max(0, Math.min(90, opacity));
      const nextConfig = {
        ...prev,
        overlayOpacity: nextOpacity
      };
      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: prev.activeId,
          activeType: prev.activeType,
          activeUrl: prev.activeUrl,
          overlayOpacity: nextOpacity,
          blurAmount: prev.blurAmount
        }));
      } catch (e) {}
      return nextConfig;
    });
  };

  const setBlurAmount = (blur: number) => {
    setConfig((prev) => {
      const nextBlur = Math.max(0, Math.min(25, blur));
      const nextConfig = {
        ...prev,
        blurAmount: nextBlur
      };
      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: prev.activeId,
          activeType: prev.activeType,
          activeUrl: prev.activeUrl,
          overlayOpacity: prev.overlayOpacity,
          blurAmount: nextBlur
        }));
      } catch (e) {}
      return nextConfig;
    });
  };

  const resetToDefaultGradient = () => {
    setConfig((prev) => {
      const nextConfig = {
        ...prev,
        activeId: "default-gradient",
        activeType: "gradient",
        activeUrl: "",
        selectedWallpaperId: "default-gradient",
        isWallpaperHidden: false
      };
      try {
        localStorage.setItem("portfolio_permanent_default_wallpaper_v2", JSON.stringify({
          activeId: "default-gradient",
          activeType: "gradient",
          activeUrl: "",
          overlayOpacity: prev.overlayOpacity,
          blurAmount: prev.blurAmount
        }));
      } catch (e) {}
      return nextConfig;
    });
  };

  const resetToDefaultJsonLibrary = () => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem("portfolio_permanent_default_wallpaper_v2");
    } catch (e) {}
  };

  const exportConfigToJson = (): string => {
    const exportObject = {
      version: 1,
      savedAt: new Date().toISOString(),
      selectedWallpaperId: config.activeId,
      isWallpaperHidden: config.isWallpaperHidden || false,
      overlayOpacity: config.overlayOpacity,
      blurAmount: config.blurAmount,
      activeType: config.activeType,
      activeUrl: config.activeUrl,
      customWallpapers: config.items.filter(it => it.isCustom || it.category === 'custom'),
      allLinks: config.items
    };
    return JSON.stringify(exportObject, null, 2);
  };

  const downloadJsonFile = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportConfigToJson());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `wallpapers-library-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfigFromJson = (jsonString: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, message: "Định dạng file JSON không hợp lệ." };
      }

      let importedItems: BackgroundItem[] = [];

      // Support direct items array or allLinks or customWallpapers format from user's schema
      if (Array.isArray(parsed.allLinks) && parsed.allLinks.length > 0) {
        importedItems = parsed.allLinks.map((it: any) => ({
          id: it.id || `custom-wp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: it.name || "Hình nền",
          type: it.type || (it.url?.includes('.mp4') ? 'video' : 'image'),
          url: it.url || it.previewUrl || "",
          previewUrl: it.previewUrl || it.url || "",
          category: it.category || "custom",
          isCustom: it.isCustom || false,
          tags: Array.isArray(it.tags) ? it.tags : [it.category || 'wallpaper']
        })).filter((it: BackgroundItem) => it.url && it.url !== "");
      } else if (Array.isArray(parsed.customWallpapers) && parsed.customWallpapers.length > 0) {
        importedItems = parsed.customWallpapers.map((it: any) => ({
          id: it.id || `custom-wp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: it.name || "Hình nền",
          type: it.type || (it.url?.includes('.mp4') ? 'video' : 'image'),
          url: it.url || it.previewUrl || "",
          previewUrl: it.previewUrl || it.url || "",
          category: it.category || "custom",
          isCustom: true,
          tags: Array.isArray(it.tags) ? it.tags : ['custom']
        })).filter((it: BackgroundItem) => it.url && it.url !== "");
      } else if (Array.isArray(parsed.items) && parsed.items.length > 0) {
        importedItems = parsed.items.filter((it: any) => it && typeof it.url === 'string');
      }

      const activeId = parsed.selectedWallpaperId || parsed.activeId || "custom-wp-1787476757058";
      const targetItem = importedItems.find(it => it.id === activeId) || importedItems[0];

      const newConfig: BackgroundConfig = {
        version: 1,
        savedAt: new Date().toISOString(),
        selectedWallpaperId: activeId,
        isWallpaperHidden: !!parsed.isWallpaperHidden,
        activeId: targetItem ? targetItem.id : "default-gradient",
        activeType: targetItem ? targetItem.type : "gradient",
        activeUrl: targetItem ? targetItem.url : "",
        overlayOpacity: typeof parsed.overlayOpacity === 'number' ? parsed.overlayOpacity : 25,
        blurAmount: typeof parsed.blurAmount === 'number' ? parsed.blurAmount : 0,
        items: importedItems.length > 0 ? importedItems : INITIAL_WALLPAPERS_FROM_JSON
      };

      setConfig(newConfig);
      return { success: true, message: `Đã nhập thành công ${newConfig.items.length} hình/video nền từ JSON!` };
    } catch (e: any) {
      return { success: false, message: `Lỗi đọc JSON: ${e.message}` };
    }
  };

  return (
    <BackgroundContext.Provider
      value={{
        config,
        isModalOpen,
        openModal,
        closeModal,
        addBackgroundLink,
        removeBackground,
        setActiveBackground,
        setOverlayOpacity,
        setBlurAmount,
        resetToDefaultGradient,
        exportConfigToJson,
        importConfigFromJson,
        downloadJsonFile,
        resetToDefaultJsonLibrary
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = (): BackgroundContextType => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};
