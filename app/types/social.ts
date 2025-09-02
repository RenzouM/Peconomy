import React from "react";

// Enum para las plataformas sociales
export enum SocialPlatform {
  YOUTUBE = "youtube",
  TIKTOK = "tiktok",
  TWITTER = "twitter",
  SOUNDCLOUD = "soundcloud",
  INSTAGRAM = "instagram",
  TWITCH = "twitch",
  LINKEDIN = "linkedin",
  FACEBOOK = "facebook",
}

// Interface para los enlaces sociales con SVG
export interface SocialLink {
  platform: SocialPlatform;
  handle: string;
  followers: number;
  icon: string;
  svgIcon?: React.ReactNode;
}

// Interface para los posts
export interface Post {
  time: string;
  content: string;
  platform: SocialPlatform;
  icon: string;
}

// Interface para usuarios sugeridos
export interface SuggestedUser {
  handle: string;
  avatar?: string;
  followers?: number;
}

// Interface para usuarios guardados
export interface SavedUser {
  handle: string;
  avatar?: string;
  lastSeen?: string;
}
