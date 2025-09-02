import { SocialPlatform } from "../types/social";

// Mapeo de plataformas con sus configuraciones
export const SOCIAL_PLATFORM_CONFIG = {
  [SocialPlatform.YOUTUBE]: {
    icon: "▶️",
    color: "#FF0000",
    defaultFollowers: 0,
  },
  [SocialPlatform.TIKTOK]: {
    icon: "🎵",
    color: "#000000",
    defaultFollowers: 0,
  },
  [SocialPlatform.TWITTER]: {
    icon: "𝕏",
    color: "#000000",
    defaultFollowers: 0,
  },
  [SocialPlatform.SOUNDCLOUD]: {
    icon: "🎵",
    color: "#FF5500",
    defaultFollowers: 0,
  },
  [SocialPlatform.INSTAGRAM]: {
    icon: "📷",
    color: "#E4405F",
    defaultFollowers: 0,
  },
  [SocialPlatform.TWITCH]: {
    icon: "🎮",
    color: "#9146FF",
    defaultFollowers: 0,
  },
  [SocialPlatform.LINKEDIN]: {
    icon: "💼",
    color: "#0A66C2",
    defaultFollowers: 0,
  },
  [SocialPlatform.FACEBOOK]: {
    icon: "👥",
    color: "#1877F2",
    defaultFollowers: 0,
  },
};
