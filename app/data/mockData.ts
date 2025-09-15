import { SocialPlatform, SocialLink, SuggestedUser, SavedUser } from "../types/social";
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

// Note: Posts are now fetched dynamically from YouTube RSS feed
// See fetchPosts.ts for the implementation

export const mockSuggestedUsers: SuggestedUser[] = [
  { handle: "@user1", followers: 50000 },
  { handle: "@user2", followers: 120000 },
  { handle: "@user3", followers: 75000 },
];

export const mockSavedUsers: SavedUser[] = [
  { handle: "@user5", lastSeen: "2 hours ago" },
  { handle: "@user6", lastSeen: "1 day ago" },
];

// Product types for marketplace
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  stock: number;
  tags: string[];
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Peconomy NFT Collection #1",
    description: "Exclusive digital art collection featuring unique blockchain-based artwork",
    price: 0.5,
    originalPrice: 0.8,
    currency: "ETH",
    image: "/peconft.png",
    category: "NFTs",
    rating: 4.9,
    reviewCount: 127,
    isNew: true,
    isFeatured: true,
    isOnSale: true,
    stock: 5,
    tags: ["Digital Art", "Blockchain", "Exclusive"],
    creator: {
      name: "Luisito Comunica",
      avatar: "/luisito.png",
      verified: true,
    },
  },
  {
    id: "2",
    name: "Peconomy Vault Access",
    description: "Premium access to the Peconomy vault system with advanced features",
    price: 99,
    currency: "PECO",
    image: "/vault.png",
    category: "Services",
    rating: 4.8,
    reviewCount: 89,
    isFeatured: true,
    stock: 50,
    tags: ["Premium", "Vault", "Access"],
    creator: {
      name: "Peconomy Team",
      avatar: "/logo.png",
      verified: true,
    },
  },
  {
    id: "3",
    name: "Avalanche Card Premium",
    description: "Exclusive Avalanche card with special benefits and rewards",
    price: 25,
    originalPrice: 35,
    currency: "PECO",
    image: "/card.png",
    category: "Cards",
    rating: 4.7,
    reviewCount: 203,
    isOnSale: true,
    stock: 12,
    tags: ["Card", "Avalanche", "Premium"],
    creator: {
      name: "Avalanche Team",
      avatar: "/logo1.png",
      verified: true,
    },
  },
  {
    id: "4",
    name: "Crypto Trading Course",
    description: "Complete course on cryptocurrency trading and DeFi strategies",
    price: 149,
    currency: "PECO",
    image: "/entrada.png",
    category: "Education",
    rating: 4.9,
    reviewCount: 156,
    isNew: true,
    stock: 100,
    tags: ["Education", "Trading", "Crypto"],
    creator: {
      name: "Crypto Expert",
      avatar: "/logo.png",
      verified: true,
    },
  },
  {
    id: "5",
    name: "Off The Grid Experience",
    description: "Exclusive access to off-the-grid digital experiences and content",
    price: 75,
    currency: "PECO",
    image: "/offthegrid.webp",
    category: "Experiences",
    rating: 4.6,
    reviewCount: 78,
    stock: 25,
    tags: ["Experience", "Exclusive", "Digital"],
    creator: {
      name: "Off The Grid",
      avatar: "/logo.png",
      verified: false,
    },
  },
  {
    id: "6",
    name: "Peconomy Merch Pack",
    description: "Exclusive merchandise pack with Peconomy branded items",
    price: 45,
    originalPrice: 60,
    currency: "PECO",
    image: "/peconft.png",
    category: "Merchandise",
    rating: 4.8,
    reviewCount: 94,
    isOnSale: true,
    stock: 30,
    tags: ["Merchandise", "Branded", "Pack"],
    creator: {
      name: "Peconomy Store",
      avatar: "/logo.png",
      verified: true,
    },
  },
];

export const productCategories = ["All", "NFTs", "Services", "Education", "Merchandise"];
