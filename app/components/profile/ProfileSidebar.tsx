"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createSocialLinks, Product } from "../../data/mockData";
import { sortSocialLinksByFollowers } from "../../utils/formatters";
import SocialLinksList from "../social/SocialLinksList";

export default function ProfileSidebar() {
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [cartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [, setIsCartOpen] = useState(false);

  const socialLinks = createSocialLinks();
  const sortedSocialLinks = sortSocialLinksByFollowers(socialLinks);

  return (
    <div className="grid gap-4 w-full h-full sm:max-w-[280px] 2xl:max-w-80 px-12  bg-gradient-to-b py-12 from-white to-gray-50 border-r border-gray-200">
      {/* Profile Header */}
      <div className="grid text-center gap-2 self-top align-top items-start mb-auto">
        <Image
          src="/luisito.png"
          alt="Luisito Comunica"
          width={400}
          height={400}
          className="w-52 h-52 mx-auto rounded-full shadow-lg"
        />
        <h1 className="text-2xl font-bold text-gray-900">Luisito Comunica</h1>
        <p className="text-gray-700 text-sm leading-relaxed">El canal más chido de YouTube</p>

        {/* Interaction Icons */}
        <div className="flex justify-evenly">
          <button className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 cursor-pointer group">
            <span className="text-xl group-hover:scale-110 transition-transform">
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
          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 cursor-pointer group">
            <span className="text-xl group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </span>
            {cartItems.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>}
          </button>
        </div>
      </div>

      <div className="flex flex-col align-bottom self-bottom mt-auto gap-6">
        {/* Social Media Links */}
        <SocialLinksList
          links={sortedSocialLinks}
          variant="desktop"
        />

        <div className="flex justify-between text-gray-600 sm:hidden h-6">
          <button className=" w-full border-r">FEED</button>
          <button className=" w-full border-r">REVIEWS</button>
          <button className="w-full">SHOP</button>
        </div>

        {/* Action Buttons */}
        {/* Main Action Button */}
        <div className="flex gap-x-4 relative h-12">
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

          {/* Expandable Action Buttons - Absolute Position */}
          <div className={`absolute bg-white rounded-2xl bottom-20 left-0 right-0 mb-2 space-y-2 transition-all duration-500 ease-in-out ${showActionButtons ? "opacity-100 transform translate-y-0 pointer-events-auto" : "opacity-0 transform translate-y-2 pointer-events-none"}`}>
            <button className="w-full bg-gradient-to-r from-blue-800 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
              <span>My Profile</span>
              <span>⚙️</span>
            </button>
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
  );
}
