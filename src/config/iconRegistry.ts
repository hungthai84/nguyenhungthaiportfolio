/**
 * Icon Registry for the Fluent 3D / Microsoft Fluent Emoji 3D style icons
 * Maps semantic business modules and website sections to premium 3D volumetric gradient vectors.
 */
export const fluent3DIcons = {
  // 12 Main Enterprise Modules (Microsoft Fluent 3D equivalents)
  SDP: "systems",       // Stacked layers 3D
  CSC: "skills",        // Customer support headset & chat bubble 3D
  CRM: "about",         // People / profile card 3D
  ERP: "experience",    // Business briefcase 3D
  HRM: "about",         // Employee profile card 3D
  BPM: "projects",      // Clipboard task 3D
  OKR: "education",     // Trophy / achievement 3D
  CLP: "memories",      // Heart star 3D
  LMS: "education",     // Open book 3D
  BI: "projects",       // Chart increasing 3D
  AI: "systems",        // AI Robot / systems 3D
  POS: "systems",       // Desktop computer / terminal 3D

  // Direct Website Sections (14 main categories)
  home: "home",
  letter: "letter",
  about: "about",
  domains: "domains",
  education: "education",
  experience: "experience",
  skills: "skills",
  projects: "projects",
  systems: "systems",
  wallpapers: "wallpapers",
  memories: "memories",
  interview: "interview",
  tuvi: "tuvi",
  contact: "contact"
} as const;

export type Fluent3DIconName = keyof typeof fluent3DIcons;
