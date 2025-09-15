import { Post } from "../types/social";
import { SocialPlatform } from "../types/social";

// Interface for YouTube RSS item structure (currently unused but kept for future use)
// interface YouTubeRSSItem {
//   title: string;
//   link: string;
//   published: string;
//   author: string;
//   id: string;
//   summary: string;
//   "media:group": {
//     "media:thumbnail": {
//       "@_url": string;
//     };
//     "media:description": string;
//   };
// }

// Interface for YouTube RSS feed structure (currently unused but kept for future use)
// interface YouTubeRSSFeed {
//   feed: {
//     entry: YouTubeRSSItem[];
//   };
// }

export async function fetchYouTubePosts(): Promise<Post[]> {
  try {
    const RSS_URL = "https://www.youtube.com/feeds/videos.xml?channel_id=UCECJDeK0MNapZbpaOzxrUPA";

    // Use a CORS proxy to fetch the RSS feed
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`;

    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const xmlText = data.contents;

    // Parse XML to extract video information
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const entries = xmlDoc.querySelectorAll("entry");
    const posts: Post[] = [];

    entries.forEach(entry => {
      const title = entry.querySelector("title")?.textContent || "";
      const published = entry.querySelector("published")?.textContent || "";
      const author = entry.querySelector("author name")?.textContent || "";
      const videoId = entry.querySelector("yt\\:videoId")?.textContent || entry.querySelector("videoId")?.textContent || "";
      const summary = entry.querySelector("description")?.textContent || "";

      // Extract thumbnail URL
      const thumbnailElement = entry.querySelector("media\\:thumbnail") || entry.querySelector("thumbnail");
      const thumbnailUrl = thumbnailElement?.getAttribute("url") || "";

      // Convert published date to relative time
      const publishedDate = new Date(published);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));

      let timeAgo: string;
      if (diffInHours < 1) {
        timeAgo = "Just now";
      } else if (diffInHours < 24) {
        timeAgo = `${diffInHours} hours ago`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) {
          timeAgo = "Yesterday";
        } else if (diffInDays < 7) {
          timeAgo = `${diffInDays} days ago`;
        } else {
          timeAgo = publishedDate.toLocaleDateString();
        }
      }

      // Create a post object
      const post: Post = {
        time: timeAgo,
        content: title,
        platform: SocialPlatform.YOUTUBE,
        icon: "youtube",
        videoId: videoId,
        author: author,
        summary: summary,
        publishedDate: publishedDate.toISOString(),
        thumbnailUrl: thumbnailUrl,
      };

      posts.push(post);
    });

    // Return only the first 7 posts to match the original mock data
    return posts.slice(0, 7);
  } catch (error) {
    console.error("Error fetching YouTube posts:", error);

    // Return fallback mock data if RSS fetch fails
    return [
      { time: "Today", content: "All about Avalanche Card!", platform: SocialPlatform.YOUTUBE, icon: "youtube", thumbnailUrl: "https://i3.ytimg.com/vi/placeholder1/hqdefault.jpg" },
      { time: "Yesterday", content: "Have you already checked the new Avalanche eERC20? read more...", platform: SocialPlatform.TWITTER, icon: "twitter" },
      { time: "2 days ago", content: "Mixing some chill jazz, live now!", platform: SocialPlatform.TWITCH, icon: "twitch" },
      { time: "3 days ago", content: "Trying Luisito Comunica Mezcal", platform: SocialPlatform.YOUTUBE, icon: "youtube", thumbnailUrl: "https://i3.ytimg.com/vi/placeholder2/hqdefault.jpg" },
      { time: "3 days ago", content: "Trying Luisito Comunica Mezcal", platform: SocialPlatform.YOUTUBE, icon: "youtube", thumbnailUrl: "https://i3.ytimg.com/vi/placeholder3/hqdefault.jpg" },
      { time: "3 days ago", content: "Trying Luisito Comunica Mezcal", platform: SocialPlatform.YOUTUBE, icon: "youtube", thumbnailUrl: "https://i3.ytimg.com/vi/placeholder4/hqdefault.jpg" },
      { time: "3 days ago", content: "Trying Luisito Comunica Mezcal", platform: SocialPlatform.YOUTUBE, icon: "youtube", thumbnailUrl: "https://i3.ytimg.com/vi/placeholder5/hqdefault.jpg" },
    ];
  }
}

// Alternative implementation using a different CORS proxy
export async function fetchYouTubePostsAlternative(): Promise<Post[]> {
  try {
    const RSS_URL = "https://www.youtube.com/feeds/videos.xml?channel_id=UCECJDeK0MNapZbpaOzxrUPA";

    // Using cors-anywhere as alternative
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${RSS_URL}`;

    const response = await fetch(proxyUrl, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();

    // Parse XML to extract video information
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const entries = xmlDoc.querySelectorAll("entry");
    const posts: Post[] = [];

    entries.forEach(entry => {
      const title = entry.querySelector("title")?.textContent || "";
      const published = entry.querySelector("published")?.textContent || "";
      const author = entry.querySelector("author name")?.textContent || "";
      const videoId = entry.querySelector("yt\\:videoId")?.textContent || entry.querySelector("videoId")?.textContent || "";
      const summary = entry.querySelector("summary")?.textContent || "";

      // Extract thumbnail URL
      const thumbnailElement = entry.querySelector("media\\:thumbnail") || entry.querySelector("thumbnail");
      const thumbnailUrl = thumbnailElement?.getAttribute("url") || "";

      // Convert published date to relative time
      const publishedDate = new Date(published);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));

      let timeAgo: string;
      if (diffInHours < 1) {
        timeAgo = "Just now";
      } else if (diffInHours < 24) {
        timeAgo = `${diffInHours} hours ago`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) {
          timeAgo = "Yesterday";
        } else if (diffInDays < 7) {
          timeAgo = `${diffInDays} days ago`;
        } else {
          timeAgo = publishedDate.toLocaleDateString();
        }
      }

      // Create a post object
      const post: Post = {
        time: timeAgo,
        content: title,
        platform: SocialPlatform.YOUTUBE,
        icon: "youtube",
        videoId: videoId,
        author: author,
        summary: summary,
        publishedDate: publishedDate.toISOString(),
        thumbnailUrl: thumbnailUrl,
      };

      posts.push(post);
    });

    // Return only the first 7 posts to match the original mock data
    return posts.slice(0, 7);
  } catch (error) {
    console.error("Error fetching YouTube posts (alternative):", error);

    // Return fallback mock data if RSS fetch fails
    return [
      { time: "Today", content: "All about Avalanche Card!", platform: SocialPlatform.YOUTUBE, icon: "youtube", thumbnailUrl: "https://i3.ytimg.com/vi/placeholder1/hqdefault.jpg" },
      { time: "Yesterday", content: "Have you already checked the new Avalanche eERC20? read more...", platform: SocialPlatform.TWITTER, icon: "twitter" },
      { time: "2 days ago", content: "Mixing some chill jazz, live now!", platform: SocialPlatform.TWITCH, icon: "twitch" },
      { time: "3 days ago", content: "Trying Luisito Comunica Mezcal", platform: SocialPlatform.YOUTUBE, icon: "youtube", thumbnailUrl: "https://i3.ytimg.com/vi/placeholder2/hqdefault.jpg" },
      { time: "3 days ago", content: "Trying Luisito Comunica Mezcal", platform: SocialPlatform.YOUTUBE, icon: "youtube", thumbnailUrl: "https://i3.ytimg.com/vi/placeholder3/hqdefault.jpg" },
      { time: "3 days ago", content: "Trying Luisito Comunica Mezcal", platform: SocialPlatform.YOUTUBE, icon: "youtube", thumbnailUrl: "https://i3.ytimg.com/vi/placeholder4/hqdefault.jpg" },
      { time: "3 days ago", content: "Trying Luisito Comunica Mezcal", platform: SocialPlatform.YOUTUBE, icon: "youtube", thumbnailUrl: "https://i3.ytimg.com/vi/placeholder5/hqdefault.jpg" },
    ];
  }
}
