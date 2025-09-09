"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { createSocialLinks, mockPosts, mockSuggestedUsers, mockSavedUsers, mockProducts, productCategories, Product } from "../data/mockData";
import { sortSocialLinksByFollowers } from "../utils/formatters";
import SocialLinksList from "../components/social/SocialLinksList";
import ProductCard from "../components/marketplace/ProductCard";
import SearchAndFilter from "../components/marketplace/SearchAndFilter";
import Cart from "../components/marketplace/Cart";
import Link from "next/link";
import Image from "next/image";

export default function LinktreeProfile() {
  const [activeTab, setActiveTab] = useState<"FEED" | "REVIEWS" | "SHOP">("FEED");
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Marketplace state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const socialLinks = createSocialLinks();
  const sortedSocialLinks = sortSocialLinksByFollowers(socialLinks);
  const posts = mockPosts;
  const suggestedUsers = mockSuggestedUsers;
  const savedUsers = mockSavedUsers;

  // Simple scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolled && scrollContainerRef.current && scrollContainerRef.current.scrollTop > 20) {
        setIsScrolled(true);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [isScrolled]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()) || product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // Cart handlers
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev => prev.map(item => (item.product.id === productId ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    alert("Checkout functionality would be implemented here!");
    setIsCartOpen(false);
    setCartItems([]);
  };

  const handleViewDetails = (product: Product) => {
    // Implement product details modal or navigation
    alert(`View details for: ${product.name}`);
  };
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center rounded-4xl">
      {/* Screen Container */}
      <div className="w-full h-full flex-1 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col">
        {/* Mobile Layout */}
        <div className="grid w-full px-12 bg-gradient-to-b h-full p-6 from-white to-gray-50 border-r border-gray-200  items-center  sm:hidden">
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

          {/* Social Media Links */}
          <div className="space-y-2">
            <SocialLinksList
              links={sortedSocialLinks}
              variant="desktop"
            />
          </div>

          {/* Action Buttons */}
          <div className="">
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
              <div className={`absolute pt-14 bg-white rounded-2xl bottom-20 left-0 right-0  space-y-2 transition-all duration-500 ease-in-out ${showActionButtons ? "opacity-100 transform translate-y-0 pointer-events-auto" : "opacity-0 transform translate-y-2 pointer-events-none"}`}>
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
                <div className="flex justify-between text-gray-600 pt-3">
                  <button className="bg-gray-100 px-2 py-3 rounded-lg">FEED</button>
                  <button className="bg-gray-100 px-2 py-3 rounded-lg">REVIEWS</button>
                  <button className="bg-gray-100 px-2 py-3 rounded-lg">SHOP</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex h-full">
          {/* Left Sidebar */}
          <div className="grid justify-center xl:w-[280px] 2xl:w-80 bg-gradient-to-b h-full p-6 from-white to-gray-50 border-r border-gray-200  items-center">
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

          {/* Main Content Area */}
          <div className="h-full flex flex-col flex-1 p-4 pt-6 pb-0 gap-y-6 bg-white overflow-y-auto scrollbar-thin">
            {/* Top Section */}
            <div className={`${isScrolled ? "hidden" : "block"}`}>
              <div className="h-[250px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden flex items-center justify-center text-center border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="text-gray-700 group-hover:scale-105 transition-transform h-full">
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
            <div className={`flex justify-center space-x-8 border-b-2 border-gray-100 ${isScrolled ? "h-10" : "h-auto"}`}>
              {(["FEED", "REVIEWS", "SHOP"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pt-2 pb-3 px-5 text-sm font-semibold cursor-pointer  ${activeTab === tab ? "text-gray-900 bg-gray-100 rounded-t-md shadow-inner" : "text-gray-500 hover:text-gray-800"}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Main Content and Right Sidebar */}
            <div
              className="grid xl:flex h-full gap-x-4 overflow-y-auto scrollbar-thin"
              ref={scrollContainerRef}>
              {/* Left Sidebar */}
              <div className="w-full h-full overflow-y-auto scrollbar-thin min-h-96">
                {activeTab === "FEED" && (
                  <div className="w-full h-full">
                    {/* Feed Content with Timeline */}
                    <div className="flex-1 ">
                      <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"></div>

                        {/* Feed Posts */}
                        <div className="space-y-6">
                          {posts.slice(0, 7).map((post, index) => (
                            <div
                              className="relative"
                              key={index}>
                              {/* Timeline Dot */}
                              <div className="absolute left-8 w-4 h-4 top-2 bg-white border-4 border-blue-500 rounded-full z-10 shadow-lg"></div>
                              {/* Time Badge */}
                              <div className="absolute left-0 top-5 w-20 text-center">
                                <div className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">{post.time}</div>
                              </div>
                              {/* Post Content */}
                              <div className="ml-24 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer group">
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
                            <div className="absolute left-8 w-4 h-4 bg-white border-4 border-gray-400 rounded-full z-10"></div>
                            <div className="text-center text-gray-500 text-sm py-2">...</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab Content - Mobile */}
                {activeTab === "REVIEWS" && (
                  <div className="grid w-full h-full gap-6">
                    {/* Filter Bar */}
                    <div className="bg-white p-3 rounded-2xl shadow-xs border border-gray-200">
                      <div className="flex justify-between">
                        <div className="flex space-x-2 overflow-x-auto">
                          <button className="px-4 py-2 bg-red-600/70 text-white rounded-lg text-sm font-medium whitespace-nowrap">All Reviews</button>
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 whitespace-nowrap">Gaming</button>
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 whitespace-nowrap">Tech</button>
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 whitespace-nowrap">Lifestyle</button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600"></span>
                          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Latest</option>
                            <option>Popularity</option>
                            <option>Rating</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Reviews Feed */}
                    <div className="space-y-4 overflow-y-auto scrollbar-thin">
                      {/* Review Card 1 */}
                      <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-xs">
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
                      <div className="bg-white p-3 rounded-2xl shadow-xs border border-gray-200">
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
                      <div className="bg-white p-3 rounded-2xl shadow-xs border border-gray-200">
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
                      {/* <div className="text-center">
                            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">Load More Reviews</button>
                          </div> */}
                    </div>
                  </div>
                )}

                {activeTab === "SHOP" && (
                  <div className="grid w-full h-full gap-6">
                    {/* Mobile Shop Layout */}
                    <div className="block md:hidden">
                      <div className="space-y-4">
                        {/* Search and Filter */}
                        <SearchAndFilter
                          searchQuery={searchQuery}
                          onSearchChange={setSearchQuery}
                          selectedCategory={selectedCategory}
                          onCategoryChange={setSelectedCategory}
                          sortBy={sortBy}
                          onSortChange={setSortBy}
                          categories={productCategories}
                          showFilters={showFilters}
                          onToggleFilters={() => setShowFilters(!showFilters)}
                        />

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 gap-4">
                          {filteredProducts.map(product => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              onAddToCart={handleAddToCart}
                              onViewDetails={handleViewDetails}
                            />
                          ))}
                        </div>

                        {/* Load More Button */}
                        <div className="text-center py-4">
                          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">Load More Products</button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Shop Layout */}
                    <div className="hidden md:block">
                      {/* Search and Filter */}
                      <SearchAndFilter
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        categories={productCategories}
                        showFilters={showFilters}
                        onToggleFilters={() => setShowFilters(!showFilters)}
                      />
                    </div>
                    <div className="hidden md:block overflow-y-auto scrollbar-thin h-full">
                      {/* Products Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProducts.map(product => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>

                      {/* Load More Button */}
                      <div className="text-center py-8">
                        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg">Load More Products</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Right Sidebar */}
              <div className="grid  space-y-4 h-full pb-6">
                {/* Filter Section */}
                <div className="rounded-lg px-4 py-3 border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-sm">Suggestions</h3>
                    <button className="cursor-pointer text-gray-400 text-xs">⚙️</button>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex gap-1">
                      <button className="bg-gray-900 cursor-pointer text-white rounded-md px-2 py-1 text-xs">Latest</button>
                      <button className="bg-gray-100 cursor-pointer text-gray-700 rounded-md px-2 py-1 text-xs hover:bg-gray-200">Interest</button>
                      <button className="bg-gray-100 cursor-pointer text-gray-700 rounded-md px-2 py-1 text-xs hover:bg-gray-200">Similar</button>
                    </div>
                    <div className="flex gap-1">
                      <button className="bg-gray-100 cursor-pointer text-gray-700 rounded-md px-2 py-1 text-xs hover:bg-gray-200">Followed</button>
                      <button className="bg-gray-100 cursor-pointer text-gray-700 rounded-md px-2 py-1 text-xs hover:bg-gray-200">Saved</button>
                    </div>
                  </div>
                </div>

                {/* Suggested Section */}
                <div className="flex gap-2 p-2 border border-gray-200 rounded-lg">
                  <div className="space-y-2">
                    {suggestedUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex cursor-default items-center justify-between p-2 hover:bg-gray-50 rounded-lg group">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-xs">{user.handle.charAt(1).toUpperCase()}</div>
                          <div className="w-24 grid">
                            <div className="font-medium text-gray-900 text-sm">{user.handle}</div>
                            <div className="text-xs text-gray-500 flex flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap">{user.followers?.toLocaleString() || "0"} followers</div>
                            <button className="bg-gray-900 cursor-pointer hover:bg-gray-800 text-white text-xs px-2 py-1 rounded-md">Follow</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {suggestedUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex cursor-default items-center justify-between p-2 hover:bg-gray-50 rounded-lg group">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-xs">{user.handle.charAt(1).toUpperCase()}</div>
                          <div className="w-24 grid">
                            <div className="font-medium text-gray-900 text-sm">{user.handle}</div>
                            <div className="text-xs text-gray-500 flex flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap">{user.followers?.toLocaleString() || "0"} followers</div>
                            <button className="bg-gray-900 cursor-pointer hover:bg-gray-800 text-white text-xs px-2 py-1 rounded-md">Follow</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Section */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 text-sm mb-3">Stats</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-gray-50 rounded-md">
                      <div className="text-lg font-bold text-gray-900">2.1M</div>
                      <div className="text-xs text-gray-600">Followers</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-md">
                      <div className="text-lg font-bold text-gray-900">156</div>
                      <div className="text-xs text-gray-600">Following</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-md">
                      <div className="text-lg font-bold text-gray-900">89</div>
                      <div className="text-xs text-gray-600">Saved</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-md">
                      <div className="text-lg font-bold text-gray-900">24</div>
                      <div className="text-xs text-gray-600">Posts</div>
                    </div>
                  </div>
                </div>
                {/* Account Reach Thermometer */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 hidden 2xl:block">
                  <h3 className="font-semibold text-gray-900 text-sm mb-3">Reach</h3>
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>0%</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>

                {/* Saved Section */}
                {/* <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">Saved</h3>
                    <span className="text-gray-400 text-xs">{savedUsers.length}</span>
                  </div>
                  <div className="space-y-2">
                    {savedUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer group">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-xs">{user.handle.charAt(1).toUpperCase()}</div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{user.handle}</div>
                            <div className="text-xs text-gray-500">{user.lastSeen}</div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Component */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
