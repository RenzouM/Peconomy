import { SocialPlatform, SocialLink, Post, SuggestedUser, SavedUser } from "../types/social";
import { SOCIAL_PLATFORM_CONFIG } from "../config/socialPlatforms";
import { SOCIAL_ICONS } from "../components/icons/SocialIcons";

// Función para crear enlaces sociales usando el enum
export const createSocialLinks = (): SocialLink[] => [
  {
    platform: SocialPlatform.YOUTUBE,
    handle: "@youtube",
    followers: 105000,
    icon: SOCIAL_PLATFORM_CONFIG[SocialPlatform.YOUTUBE].icon,
    svgIcon: SOCIAL_ICONS.youtube(),
  },
  {
    platform: SocialPlatform.TIKTOK,
    handle: "@tiktok",
    followers: 1500000,
    icon: SOCIAL_PLATFORM_CONFIG[SocialPlatform.TIKTOK].icon,
    svgIcon: SOCIAL_ICONS.tiktok(),
  },
  {
    platform: SocialPlatform.TWITTER,
    handle: "@twitter",
    followers: 215000,
    icon: SOCIAL_PLATFORM_CONFIG[SocialPlatform.TWITTER].icon,
    svgIcon: SOCIAL_ICONS.twitter(),
  },
  {
    platform: SocialPlatform.SOUNDCLOUD,
    handle: "@soundcloud",
    followers: 10000,
    icon: SOCIAL_PLATFORM_CONFIG[SocialPlatform.SOUNDCLOUD].icon,
    svgIcon: SOCIAL_ICONS.soundcloud(),
  },
  {
    platform: SocialPlatform.INSTAGRAM,
    handle: "@instagram",
    followers: 89000,
    icon: SOCIAL_PLATFORM_CONFIG[SocialPlatform.INSTAGRAM].icon,
    svgIcon: SOCIAL_ICONS.instagram(),
  },
  {
    platform: SocialPlatform.TWITCH,
    handle: "@twitch",
    followers: 45000,
    icon: SOCIAL_PLATFORM_CONFIG[SocialPlatform.TWITCH].icon,
    svgIcon: SOCIAL_ICONS.twitch(),
  },
];

export const mockPosts: Post[] = [
  { time: "Today", content: "All about Avalanche Card!", platform: SocialPlatform.YOUTUBE, icon: "▶️" },
  { time: "Yesterday", content: "Have you already checked the new Avalanche eERC20? read more...", platform: SocialPlatform.TWITTER, icon: "𝕏" },
  { time: "2 days ago", content: "Mixing some chill jazz, live now!", platform: SocialPlatform.TWITCH, icon: "🎮" },
  { time: "3 days ago", content: "Trying Luisito Comunica Mezcal", platform: SocialPlatform.YOUTUBE, icon: "▶️" },
];

export const mockSuggestedUsers: SuggestedUser[] = [
  { handle: "@user1", followers: 50000 },
  { handle: "@user2", followers: 120000 },
  { handle: "@user3", followers: 75000 },
  { handle: "@user4", followers: 200000 },
];

export const mockSavedUsers: SavedUser[] = [
  { handle: "@user5", lastSeen: "2 hours ago" },
  { handle: "@user6", lastSeen: "1 day ago" },
  { handle: "@user7", lastSeen: "3 days ago" },
  { handle: "@user8", lastSeen: "1 week ago" },
];
