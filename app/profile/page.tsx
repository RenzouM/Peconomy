"use client";
import { useState } from "react";
import { createSocialLinks, mockPosts, mockSuggestedUsers, mockSavedUsers } from "../data/mockData";
import { sortSocialLinksByFollowers } from "../utils/formatters";
import SocialLinksList from "../components/social/SocialLinksList";
import Link from "next/link";
import Image from "next/image";

export default function LinktreeProfile() {
  const [activeTab, setActiveTab] = useState<"FEED" | "REVIEWS" | "SHOP">("FEED");
  const [showActionButtons, setShowActionButtons] = useState(false);

  const socialLinks = createSocialLinks();
  const sortedSocialLinks = sortSocialLinksByFollowers(socialLinks);
  const posts = mockPosts;
  const suggestedUsers = mockSuggestedUsers;
  const savedUsers = mockSavedUsers;
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-8">
      <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ">
        {/* Screen Container */}
        <div className="w-full h-full  bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col">
          {/* Mobile Layout */}
          <div className="block md:hidden flex-1 overflow-y-auto">
            <div className="px-6 py-4 space-y-4 h-full grid justify-center items-center">
              {/* Profile Header */}
              <div className="text-center space-y-1">
                <div className="w-42 h-42 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-42 h-42 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-7xl text-white">👤</span>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Creator&apos;s name</h1>
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-gray-700 text-sm">short description of creator profile</p>
                </div>
              </div>

              {/* Interaction Icons */}
              <div className="flex justify-center space-x-6">
                <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 cursor-pointer group">
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#000000">
                      <path
                        fill="#000000"
                        d="M4 8a8 8 0 1 1 16 0v4.697l2 3V20h-5.611a4.502 4.502 0 0 1-8.777 0H2v-4.303l2-3V8Zm5.708 12a2.5 2.5 0 0 0 4.584 0H9.708ZM12 2a6 6 0 0 0-6 6v5.303l-2 3V18h16v-1.697l-2-3V8a6 6 0 0 0-6-6Z"></path>
                    </svg>
                  </span>
                </button>
                <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 cursor-pointer group">
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#000000">
                      <path
                        fill="#000000"
                        d="M15.991 1.035a4 4 0 1 1-.855 6.267l-6.28 3.626a4.007 4.007 0 0 1 0 2.144l6.28 3.626a4.002 4.002 0 0 1 6.32 4.803a4 4 0 0 1-7.32-3.07l-6.28-3.627a4.002 4.002 0 1 1 0-5.608l6.28-3.626a4.002 4.002 0 0 1 1.855-4.535ZM19.723 3.5a2 2 0 1 0-3.464 2a2 2 0 0 0 3.464-2ZM3.071 12.527a2.002 2.002 0 0 0 2.93 1.204a2 2 0 1 0-2.93-1.204Zm15.92 5.242a2 2 0 1 0-2 3.464a2 2 0 0 0 2-3.464Z"></path>
                    </svg>
                  </span>
                </button>
                <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 cursor-pointer group">
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#000000">
                      <path
                        fill="#000000"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C7.52 3 8.08 3 9.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C18 4.52 18 5.08 18 6.2v13.305c0 .486 0 .729-.101.862a.5.5 0 0 1-.37.198c-.167.01-.369-.125-.773-.394L12 17l-4.756 3.17c-.404.27-.606.405-.774.395a.5.5 0 0 1-.369-.198C6 20.234 6 19.991 6 19.505z"></path>
                      <path
                        fill="#000000"
                        d="M6 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C7.52 3 8.08 3 9.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C18 4.52 18 5.08 18 6.2v13.305c0 .486 0 .729-.101.862a.5.5 0 0 1-.37.198c-.167.01-.369-.125-.773-.394L12 17l-4.756 3.17c-.404.27-.606.405-.774.395a.5.5 0 0 1-.369-.198C6 20.234 6 19.991 6 19.505z"
                        opacity=".5"></path>
                    </svg>
                  </span>
                </button>
              </div>

              {/* Social Media Links */}
              <div className="space-y-3">
                <SocialLinksList
                  links={sortedSocialLinks.slice(0, 3)}
                  variant="mobile"
                />
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
                {/* Main Action Button */}
                <button
                  onClick={() => setShowActionButtons(!showActionButtons)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 hover:from-blue-700 hover:to-blue-800 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer group">
                  <span className="transition-transform duration-500 group-hover:rotate-180">{showActionButtons ? "▼" : "▶"}</span>
                  <span>Actions</span>
                  <span className="text-2xl">⚡</span>
                </button>

                {/* Expandable Action Buttons - Absolute Position */}
                <div className="relative">
                  <div className={`absolute bottom-full left-0 right-0 mb-2 space-y-2 transition-all duration-500 ease-in-out ${showActionButtons ? "opacity-100 transform translate-y-0 pointer-events-auto" : "opacity-0 transform translate-y-2 pointer-events-none"}`}>
                    <button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                      <span>Sponsor</span>
                      <span>🗣️</span>
                    </button>
                    <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer">
                      <span>Transfer</span>
                      <Image
                        src="/logo.png"
                        alt="Vault"
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* <div className="flex">
              <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center  hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer z-1">
                <p>Sponsor</p>
              </button>{" "}
              <div className="relative z-50">
                <div className="min-w-24 min-h-24 w-24 h-24 bg-white absolute -left-5 -top-4  rounded-full -z-10"></div>

                <button
                  className="min-w-16 bg-gradient-to-r from-red-700 to-red-600 text-white w-16 h-16 rounded-full flex items-center  justify-center shadow-md hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-10 group cursor-pointer"
                  title="Ver Operaciones">
                  <span className="group-hover:scale-110 transition-transform">
                    <p className="text-4xl font-bold italic">P</p>
                  </span>
                </button>
              </div>
            </div> */}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-1 overflow-y-auto h-full">
            {/* Left Sidebar */}
            <div className="w-80 bg-gradient-to-b h-full from-white to-gray-50 border-r border-gray-200 p-6 space-y-4 overflow-y-auto grid justify-center items-center">
              {/* Profile Header */}
              <div className="text-center space-y-2">
                <div className="w-52 h-52 mx-auto ">
                  <Image
                    src="/luisito.png"
                    alt="Luisito Comunica"
                    width={400}
                    height={400}
                    className="w-full h-full rounded-full shadow-lg"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Luisito Comunica</h1>
                <p className="text-gray-700 text-sm leading-relaxed">El canal más chido de YouTube</p>
              </div>

              {/* Interaction Icons */}
              <div className="flex justify-evenly max-h-12">
                <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 cursor-pointer group">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#000000">
                      <path
                        fill="#000000"
                        d="M4 8a8 8 0 1 1 16 0v4.697l2 3V20h-5.611a4.502 4.502 0 0 1-8.777 0H2v-4.303l2-3V8Zm5.708 12a2.5 2.5 0 0 0 4.584 0H9.708ZM12 2a6 6 0 0 0-6 6v5.303l-2 3V18h16v-1.697l-2-3V8a6 6 0 0 0-6-6Z"></path>
                    </svg>
                  </span>
                </button>
                <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 cursor-pointer group">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#000000">
                      <path
                        fill="#000000"
                        d="M15.991 1.035a4 4 0 1 1-.855 6.267l-6.28 3.626a4.007 4.007 0 0 1 0 2.144l6.28 3.626a4.002 4.002 0 0 1 6.32 4.803a4 4 0 0 1-7.32-3.07l-6.28-3.627a4.002 4.002 0 1 1 0-5.608l6.28-3.626a4.002 4.002 0 0 1 1.855-4.535ZM19.723 3.5a2 2 0 1 0-3.464 2a2 2 0 0 0 3.464-2ZM3.071 12.527a2.002 2.002 0 0 0 2.93 1.204a2 2 0 1 0-2.93-1.204Zm15.92 5.242a2 2 0 1 0-2 3.464a2 2 0 0 0 2-3.464Z"></path>
                    </svg>
                  </span>
                </button>
                <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 cursor-pointer group">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#000000">
                      <path
                        fill="#000000"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C7.52 3 8.08 3 9.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C18 4.52 18 5.08 18 6.2v13.305c0 .486 0 .729-.101.862a.5.5 0 0 1-.37.198c-.167.01-.369-.125-.773-.394L12 17l-4.756 3.17c-.404.27-.606.405-.774.395a.5.5 0 0 1-.369-.198C6 20.234 6 19.991 6 19.505z"></path>
                      <path
                        fill="#000000"
                        d="M6 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C7.52 3 8.08 3 9.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C18 4.52 18 5.08 18 6.2v13.305c0 .486 0 .729-.101.862a.5.5 0 0 1-.37.198c-.167.01-.369-.125-.773-.394L12 17l-4.756 3.17c-.404.27-.606.405-.774.395a.5.5 0 0 1-.369-.198C6 20.234 6 19.991 6 19.505z"
                        opacity=".5"></path>
                    </svg>
                  </span>
                </button>
              </div>

              {/* Social Media Links */}
              <div className="space-y-2">
                <SocialLinksList
                  links={sortedSocialLinks}
                  variant="desktop"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Main Action Button */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowActionButtons(!showActionButtons)}
                    className="w-full flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 py-4 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer">
                    <span className="transition-transform duration-500 group-hover:rotate-180">{showActionButtons ? "▼" : "▶"}</span>
                    <span>Actions</span>
                  </button>
                  <Link
                    href="/vault"
                    className="mx-auto cursor-pointer transition-all duration-300 transform hover:scale-125">
                    <Image
                      src="/logo.png"
                      alt="Vault"
                      width={48}
                      height={48}
                    />
                  </Link>
                </div>

                {/* Expandable Action Buttons - Absolute Position */}
                <div className="relative">
                  <div className={`absolute bg-white rounded-2xl bottom-20 left-0 right-0 mb-2 space-y-2 transition-all duration-500 ease-in-out ${showActionButtons ? "opacity-100 transform translate-y-0 pointer-events-auto" : "opacity-0 transform translate-y-2 pointer-events-none"}`}>
                    <button className="w-full bg-gradient-to-r from-green-800 to-green-700 text-white py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                      <span>Touch</span>
                      <span>👆</span>
                    </button>
                    <button className="w-full bg-gradient-to-r from-purple-800 to-purple-700 text-white-900 py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer">
                      <span>Collab 👥</span>
                    </button>
                    <button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                      <span>Sponsor</span>
                      <span>🗣️</span>
                    </button>
                    <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer">
                      <span>Transfer</span>
                      <Image
                        src="/logo.png"
                        alt="Vault"
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 bg-white overflow-y-auto scrollbar-thin scrollbar-transparent">
              {/* Top Section */}
              <div className="mb-6">
                <div className="h-[250px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl  overflow-hidden flex items-center justify-center text-center border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="text-gray-700 group-hover:scale-105 transition-transform h-full ">
                    <Image
                      src="/luisitoland.png"
                      alt="Luisito Comunica"
                      width={1707}
                      height={282}
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
              <div className="grid xl:flex gap-4">
                {activeTab === "FEED" && (
                  <>
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
                          <div className="relative hidden xl:block">
                            <div className="absolute left-6 w-4 h-4 bg-white border-4 border-gray-400 rounded-full z-10"></div>
                            <div className="text-center text-gray-500 text-sm py-2">...</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-full xl:w-64 space-y-3 flex-1">
                      {/* Filter Section */}
                      <div className="bg-gradient-to-br from-gray-50/5 to-gray-100/5 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 gap-2 grid">
                        <h3 className="font-bold text-gray-900 text-sm">SUGGESTIONS BY</h3>
                        <hr className="border-gray-200" />
                        <div className="space-x-2 flex text-black">
                          <button className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-2 cursor-pointer border border-gray-200 hover:shadow-md transition-all duration-300">Last post</button>
                          <button className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-2 cursor-pointer border border-gray-200 hover:shadow-md transition-all duration-300">General interest</button>
                          <button className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-2 cursor-pointer border border-gray-200 hover:shadow-md transition-all duration-300">Same this</button>
                        </div>
                      </div>

                      {/* Suggested Section */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
                        <div className="space-y-2">
                          {suggestedUsers.map((user, index) => (
                            <div
                              key={index}
                              className="text-gray-700 hover:text-gray-900 transition-colors cursor-pointer font-medium text-sm">
                              {user.handle}
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
                              {user.handle}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "REVIEWS" && (
                  <div>
                    {/* Reviews Tab Content - Mobile */}
                    {activeTab === "REVIEWS" && (
                      <div className="space-y-4">
                        {/* Filter Bar */}
                        <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
                          <div className="flex justify-between">
                            <div className="flex space-x-2 overflow-x-auto">
                              <button className="px-4 py-2 bg-red-600/70 text-white rounded-lg text-sm font-medium whitespace-nowrap">All Reviews</button>
                              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 whitespace-nowrap">Gaming</button>
                              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 whitespace-nowrap">Tech</button>
                              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 whitespace-nowrap">Lifestyle</button>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Sort by:</span>
                              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Latest</option>
                                <option>Most Popular</option>
                                <option>Highest Rated</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Reviews Feed */}
                        <div className="space-y-4">
                          {/* Review Card 1 */}
                          <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
                            <div className="flex items-start space-x-3">
                              <Image
                                src="/luisito.png"
                                alt="Luisito Rey"
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <h3 className="font-semibold text-gray-800 text-sm">Luisito Rey</h3>
                                    <p className="text-xs text-gray-600">Gaming Creator • 2M subscribers</p>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-yellow-500 text-sm">★★★★★</span>
                                    <span className="text-xs text-gray-600">5.0</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 p-2 rounded-xl mb-3">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Image
                                      src="/nft.png"
                                      alt="Product"
                                      width={24}
                                      height={24}
                                    />
                                    <div>
                                      <h4 className="font-medium text-gray-800 text-sm">Peconomy NFT Collection</h4>
                                      <p className="text-xs text-gray-600">Sponsored Review</p>
                                    </div>
                                  </div>
                                  <p className="text-gray-700 text-xs">&ldquo;Increíble colección de NFTs que revoluciona el gaming. La integración con blockchain es perfecta y los beneficios para los creadores son reales. ¡100% recomendado!&rdquo;</p>
                                </div>
                                <div className="flex flex-col space-y-2">
                                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                                    <span>📺 15K views</span>
                                    <span>👍 2.3K likes</span>
                                    <span>💬 156 comments</span>
                                  </div>
                                  <button className="w-full px-4 py-2 bg-red-600/70 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">Watch Review</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Review Card 2 */}
                          <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
                            <div className="flex items-start space-x-3">
                              <Image
                                src="/luisitoland.png"
                                alt="Tech Reviewer"
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <h3 className="font-semibold text-gray-800 text-sm">TechMaster Pro</h3>
                                    <p className="text-xs text-gray-600">Tech Creator • 850K subscribers</p>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-yellow-500 text-sm">★★★★☆</span>
                                    <span className="text-xs text-gray-600">4.5</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 p-2 rounded-xl mb-3">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Image
                                      src="/vault.png"
                                      alt="Product"
                                      width={24}
                                      height={24}
                                    />
                                    <div>
                                      <h4 className="font-medium text-gray-800 text-sm">Peconomy Vault System</h4>
                                      <p className="text-xs text-gray-600">Sponsored Review</p>
                                    </div>
                                  </div>
                                  <p className="text-gray-700 text-xs">&ldquo;El sistema de vaults de Peconomy es innovador. La privacidad y transparencia que ofrece es única en el mercado. Perfecto para inversores serios.&rdquo;</p>
                                </div>
                                <div className="flex flex-col space-y-2">
                                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                                    <span>📺 8.2K views</span>
                                    <span>👍 1.1K likes</span>
                                    <span>💬 89 comments</span>
                                  </div>
                                  <button className="w-full px-4 py-2 bg-red-600/70 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">Watch Review</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Review Card 3 */}
                          <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
                            <div className="flex items-start space-x-3">
                              <Image
                                src="/logo.png"
                                alt="Crypto Expert"
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <h3 className="font-semibold text-gray-800 text-sm">CryptoExpert</h3>
                                    <p className="text-xs text-gray-600">Crypto Creator • 1.2M subscribers</p>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-yellow-500 text-sm">★★★★★</span>
                                    <span className="text-xs text-gray-600">5.0</span>
                                  </div>
                                </div>
                                <div className="bg-gray-50 p-2 rounded-xl mb-3">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Image
                                      src="/usdc.png"
                                      alt="Product"
                                      width={24}
                                      height={24}
                                    />
                                    <div>
                                      <h4 className="font-medium text-gray-800 text-sm">Peconomy USDC Integration</h4>
                                      <p className="text-xs text-gray-600">Sponsored Review</p>
                                    </div>
                                  </div>
                                  <p className="text-gray-700 text-xs">&ldquo;La integración con USDC es perfecta. Transacciones rápidas, fees bajos y total transparencia. Peconomy está cambiando el juego del DeFi.&rdquo;</p>
                                </div>
                                <div className="flex flex-col space-y-2">
                                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                                    <span>📺 12.7K views</span>
                                    <span>👍 1.8K likes</span>
                                    <span>💬 203 comments</span>
                                  </div>
                                  <button className="w-full px-4 py-2 bg-red-600/70 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">Watch Review</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Load More Button */}
                          <div className="text-center">
                            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">Load More Reviews</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* acaaaaa */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
