"use client";

import { useState } from "react";

interface SocialLink {
  platform: string;
  handle: string;
  followers: number;
  icon: string;
}

interface Post {
  time: string;
  content: string;
  platform: string;
  icon: string;
}

export default function LinktreeProfile() {
  const [activeTab, setActiveTab] = useState<"FEED" | "REVIEWS" | "SHOP">("FEED");

  const socialLinks: SocialLink[] = [
    { platform: "youtube", handle: "@youtube", followers: 105000, icon: "▶️" },
    { platform: "tiktok", handle: "@tiktok", followers: 1500000, icon: "🎵" },
    { platform: "twitter", handle: "@twitter", followers: 215000, icon: "𝕏" },
    { platform: "soundcloud", handle: "@soundcloud", followers: 10000, icon: "🎵" },
  ];

  // Sort social links by follower count from highest to lowest
  const sortedSocialLinks = [...socialLinks].sort((a, b) => b.followers - a.followers);

  // Function to format follower count with K or M
  const formatFollowers = (followers: number): string => {
    if (followers >= 1000000) {
      return (followers / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (followers >= 1000) {
      return (followers / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return followers.toString();
  };

  const posts: Post[] = [
    { time: "Today", content: "All about Avalanche Card!", platform: "youtube", icon: "▶️" },
    { time: "Yesterday", content: "Have you already checked the new Avalanche eERC20? read more...", platform: "twitter", icon: "𝕏" },
    { time: "2 days ago", content: "Mixing some chill jazz, live now!", platform: "twitch", icon: "🎮" },
    { time: "3 days ago", content: "Trying Luisito Comunica Mezcal", platform: "youtube", icon: "▶️" },
  ];

  const suggestedUsers = ["@user1", "@user2", "@user3", "@user4"];
  const savedUsers = ["@user5", "@user6", "@user7", "@user8"];

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      {/* Screen Container */}
      <div className="w-full h-full  bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col">
        {/* Mobile Layout */}
        <div className="block md:hidden flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Profile Header */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xl text-white">👤</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">creator&apos;s name</h1>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-gray-500">?</span>
                <p className="text-gray-700 text-sm">short description of creator profile</p>
              </div>
            </div>

            {/* Interaction Icons */}
            <div className="flex justify-center space-x-6">
              <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 cursor-pointer group">
                <span className="text-lg group-hover:scale-110 transition-transform">🔔</span>
              </button>
              <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 cursor-pointer group">
                <span className="text-lg group-hover:scale-110 transition-transform">📤</span>
              </button>
              <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 cursor-pointer group">
                <span className="text-lg group-hover:scale-110 transition-transform">🔖</span>
              </button>
            </div>

            {/* Social Media Links */}
            <div className="space-y-3">
              {sortedSocialLinks.slice(0, 3).map((link, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="text-gray-900 font-semibold text-sm">{link.handle}</span>
                  </div>
                  <span className="text-gray-600 font-medium text-sm">{formatFollowers(link.followers)} followers</span>
                </div>
              ))}
              <div className="text-center text-gray-500 text-sm">...</div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center space-x-8 border-b-2 border-gray-200">
              {(["FEED", "REVIEWS", "SHOP"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-2 text-sm font-semibold transition-all duration-300 cursor-pointer border-b-2  ${activeTab === tab ? "text-gray-900  border-gray-900" : "text-gray-500 hover:text-gray-700  border-white"}`}>
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                <span>Sponsor</span>
                <span>🗣️</span>
              </button>
              <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer">
                <span>Transfer</span>
                <img
                  src="/logo.png"
                  alt="Vault"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-80 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 p-6 space-y-4 overflow-y-auto grid">
            {/* Profile Header */}
            <div className="text-center space-y-2">
              <div className="w-52 h-52 mx-auto ">
                <img
                  src="/luisito.png"
                  alt="Luisito Comunica"
                  className="w-full h-full rounded-full shadow-lg"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Luisito Comunica</h1>
              <p className="text-gray-700 text-sm leading-relaxed">El canal más chido de YouTube</p>
            </div>

            {/* Interaction Icons */}
            <div className="flex justify-evenly max-h-12">
              <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 cursor-pointer group">
                <span className="text-xl group-hover:scale-110 transition-transform">🔔</span>
              </button>
              <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 cursor-pointer group">
                <span className="text-xl group-hover:scale-110 transition-transform">📤</span>
              </button>
              <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 cursor-pointer group">
                <span className="text-xl group-hover:scale-110 transition-transform">🔖</span>
              </button>
            </div>

            {/* Social Media Links */}
            <div className="space-y-2">
              {sortedSocialLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="text-gray-900 font-semibold text-sm">{link.handle}</span>
                  </div>
                  <span className="text-gray-600 font-medium text-xs">{formatFollowers(link.followers)} followers</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                <span>Sponsor</span>
                <span>🗣️</span>
              </button>
              <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer">
                <span>Transfer</span>
                <img
                  src="/logo.png"
                  alt="Vault"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 bg-white overflow-y-auto">
            {/* Top Section */}
            <div className="mb-6">
              <div className="h-[250px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl  overflow-hidden flex items-center justify-center text-center border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="text-gray-700 group-hover:scale-105 transition-transform h-full ">
                  <img
                    src="/luisitoland.png"
                    alt="Luisito Comunica"
                    className="w-full h-full shadow-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center space-x-8 border-b-2 border-gray-200 mb-4">
              {(["FEED", "REVIEWS", "SHOP"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-2 text-sm font-semibold transition-all duration-300 cursor-pointer border-b-2  ${activeTab === tab ? "text-gray-900  border-gray-900" : "text-gray-500 hover:text-gray-700  border-white"}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Main Content and Right Sidebar */}
            <div className="flex gap-4">
              {/* Feed Content with Timeline */}
              <div className="flex-1 ">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"></div>

                  {/* Feed Posts */}
                  <div className="space-y-6">
                    {posts.slice(0, 3).map((post, index) => (
                      <div
                        className="relative"
                        key={index}>
                        {/* Timeline Dot */}
                        <div className="absolute left-6 w-4 h-4 top-2 bg-white border-4 border-blue-500 rounded-full z-10 shadow-lg"></div>
                        {/* Time Badge */}
                        <div className="absolute -left-2 top-5 w-20 text-center">
                          <div className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">{post.time}</div>
                        </div>
                        {/* Post Content */}
                        <div className="ml-20 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer group">
                          <div className="flex items-start space-x-3">
                            <span className="text-lg group-hover:scale-110 transition-transform">{post.icon}</span>
                            <div className="flex-1">
                              <div className="text-gray-900 text-sm leading-relaxed">{post.content}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* More Posts Indicator */}
                    <div className="relative ">
                      <div className="absolute left-6 w-4 h-4 bg-white border-4 border-gray-400 rounded-full z-10"></div>
                      <div className="text-center text-gray-500 text-sm py-2">...</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-64 space-y-3">
                {/* Suggested Section */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-sm">SUGGESTED</h3>
                    <span className="text-gray-500 text-lg cursor-pointer hover:text-gray-700 transition-colors">▼</span>
                  </div>
                  <div className="space-y-2">
                    {suggestedUsers.map((user, index) => (
                      <div
                        key={index}
                        className="text-gray-700 hover:text-gray-900 transition-colors cursor-pointer font-medium text-sm">
                        {user}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saved Section */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-sm">SAVED</h3>
                    <span className="text-gray-500 text-lg cursor-pointer hover:text-gray-700 transition-colors">▼</span>
                  </div>
                  <div className="space-y-2">
                    {savedUsers.map((user, index) => (
                      <div
                        key={index}
                        className="text-gray-700 hover:text-gray-900 transition-colors cursor-pointer font-medium text-sm">
                        {user}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
