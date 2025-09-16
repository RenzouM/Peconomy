"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { mockProducts, productCategories, Product } from "../../data/mockData";
import { fetchYouTubePosts } from "../../utils/fetchPosts";
import { Post } from "../../types/social";
import { YouTubeIcon } from "../icons/SocialIcons";
import SearchAndFilter from "../marketplace/SearchAndFilter";
import ProductCard from "../marketplace/ProductCard";
import Cart from "../marketplace/Cart";

interface ProfileContentProps {
  activeTab: "FEED" | "REVIEWS" | "SHOP";
  onTabChange: (tab: "FEED" | "REVIEWS" | "SHOP") => void;
}

export default function ProfileContent({ activeTab }: ProfileContentProps) {
  // Marketplace state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  // Fetch YouTube posts on component mount
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoadingPosts(true);
      try {
        const fetchedPosts = await fetchYouTubePosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
        // Fallback to empty array if fetch fails
        setPosts([]);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    loadPosts();
  }, []);

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
    <div className="w-full h-full flex flex-col flex-1 bg-white">
      <div className="grid xl:flex h-full gap-x-4 w-full pb-4   overflow-y-auto scrollbar-thin">
        {activeTab === "FEED" && (
          <div className="grid w-full h-full relative">
            {/* Feed Content with Timeline */}
            {/* Timeline Line */}
            <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-400 via-red-200 to-red-50"></div>

            {/* Loading State */}
            {isLoadingPosts && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                <span className="ml-2 text-gray-600">Loading posts...</span>
              </div>
            )}

            {/* Feed Posts */}
            {!isLoadingPosts && (
              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <div
                      className="relative"
                      key={post.videoId || index}>
                      {/* Timeline Dot */}
                      <div className="absolute left-[37px] w-2 h-2 top-[20px] bg-white border-3 border-red-500 rounded-full z-10 shadow-lg"></div>
                      {/* Time Badge */}
                      <div className="absolute left-0 top-6 w-20 text-center">
                        <div className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-xl shadow-md">{post.time}</div>
                      </div>
                      {/* Post Content */}
                      <div className="ml-24 p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 hover:shadow-sm hover:border-gray-300 transition-all duration-300 group flex items-center space-x-3">
                        {/* Thumbnail */}
                        {post.thumbnailUrl && (
                          <div className="flex-shrink-0 items-center justify-center hidden xl:block group-hover:scale-160 z-50 transition-all duration-300">
                            <Image
                              src={post.thumbnailUrl}
                              alt={post.content}
                              width={480}
                              height={360}
                              className="rounded-2xl object-cover h-16 w-30"
                            />
                          </div>
                        )}

                        <div className="flex">
                          <div className="flex items-center space-x-2">
                            <div className="group-hover:scale-110 transition-transform flex-shrink-0  items-center self-start mt-[2px] hidden xl:block">
                              <YouTubeIcon />
                            </div>
                            <div className="grid">
                              <div className="text-gray-900  font-medium text-sm leading-relaxed mb-1 line-clamp-1">{post.content}</div>
                              {/* {post.author && <div className="text-xs text-gray-600 mb-1">by {post.author}</div>} */}
                              {post.summary && <div className="text-xs font-thin text-gray-500 line-clamp-2">{post.summary}</div>}
                            </div>
                          </div>
                        </div>
                        {post.videoId && (
                          <a
                            href={`https://www.youtube.com/watch?v=${post.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block h-full px-4 py-2 text-center bg-red-500 text-white text-xs rounded-2xl hover:bg-red-600 transition-colors">
                            Watch on YouTube
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">No posts available at the moment.</div>
                )}

                {/* More Posts Indicator */}
                {posts.length > 0 && (
                  <div className="relative hidden xl:block">
                    <div className="absolute left-[37px] w-2 h-2 bg-white border-3 border-red-50 rounded-full z-10"></div>
                    <div className="text-center text-gray-500 text-sm py-2">...</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab Content - Mobile */}
        {activeTab === "REVIEWS" && (
          <div className="grid w-full h-full gap-4">
            {/* Filter Bar */}
            <div className="bg-white p-2 rounded-2xl shadow-xs border border-gray-200">
              <div className="flex justify-between h-9">
                <div className="flex space-x-2 overflow-x-auto">
                  <button className="px-4 bg-red-500 text-white rounded-lg text-sm font-medium whitespace-nowrap">All Reviews</button>
                  <button className="px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 whitespace-nowrap">Gaming</button>
                  <button className="px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 whitespace-nowrap">Tech</button>
                  <button className="px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 whitespace-nowrap">Lifestyle</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600"></span>
                  <select className="px-3 h-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 hover:shadow-sm hover:border-gray-300 transition-all duration-300 group">
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <Image
                      src="/granmalo.png"
                      alt="Luisito Rey"
                      width={40}
                      height={40}
                      className="rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">Gran Malo</h3>
                          <p className="text-xs text-gray-600">Premium Mezcal • 1M subscribers</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500 text-sm">★★★★★</span>
                          <span className="text-xs text-gray-600 font-medium">5.0</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-2xl border border-gray-100 mb-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Image
                            src="/mezcalclassic.webp"
                            alt="Product"
                            width={24}
                            height={24}
                            className="rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">Mezcal Classic</h4>
                            <p className="text-xs text-gray-500">Personal Brand</p>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-1">&ldquo;Gran Malo Mezcal is a bold and artisanal spirit crafted from hand-selected agave. With a smoky, rich flavor profile and a smooth finish, it embodies the true essence of traditional Mexican craftsmanship.&rdquo;</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <span>📺</span>
                            <span>15K views</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>👍</span>
                            <span>2.3K likes</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>💬</span>
                            <span>156 comments</span>
                          </span>
                        </div>
                        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-sm font-medium transition-colors cursor-pointer group-hover:scale-105 transform">Watch Review</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Card 2 */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 hover:shadow-sm hover:border-gray-300 transition-all duration-300 group">
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <Image
                      src="/avalanche.png"
                      alt="Tech Reviewer"
                      width={40}
                      height={40}
                      className="rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">Avalanche</h3>
                          <p className="text-xs text-gray-600">Blockchain Ecosystem • 3M subscribers</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500 text-sm">★★★★★</span>
                          <span className="text-xs text-gray-600 font-medium">5.0</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-2xl border border-gray-100 mb-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Image
                            src="/avacard.svg"
                            alt="Product"
                            width={24}
                            height={24}
                            className="rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">Avalanche Card</h4>
                            <p className="text-xs text-gray-500">Sponsored Review</p>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-1">&ldquo;Avalanche is a high-performance, decentralized blockchain platform designed for building and scaling applications and custom blockchain networks. With its fast transaction finality and low fees, Avalanche aims to offer a scalable and secure infrastructure for decentralized finance (DeFi) and digital assets.&rdquo;</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <span>📺</span>
                            <span>8.2K views</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>👍</span>
                            <span>1.1K likes</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>💬</span>
                            <span>89 comments</span>
                          </span>
                        </div>
                        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-sm font-medium transition-colors cursor-pointer group-hover:scale-105 transform">Watch Review</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Card 3 */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200 hover:shadow-sm hover:border-gray-300 transition-all duration-300 group">
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <Image
                      src="/offthegrid.png"
                      alt="Crypto Expert"
                      width={40}
                      height={40}
                      className="rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">OFF THE GRID</h3>
                          <p className="text-xs text-gray-600">Web3 Game • 1.2M subscribers</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500 text-sm">★★★★★</span>
                          <span className="text-xs text-gray-600 font-medium">5.0</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-2xl border border-gray-100 mb-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Image
                            src="/offthegridnft.png"
                            alt="Product"
                            width={24}
                            height={24}
                            className="rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">NFT Marketplace</h4>
                            <p className="text-xs text-gray-500">Sponsored Review</p>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-1">&ldquo;Off the Grid NFT marketplace is the exclusive hub for trading unique in-game assets from the thrilling Web3 game. Players can buy, sell, and trade NFTs that represent rare items, characters, and land, enhancing their gaming experience in a fully decentralized world.&rdquo;</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <span>📺</span>
                            <span>12.7K views</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>👍</span>
                            <span>1.8K likes</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>💬</span>
                            <span>203 comments</span>
                          </span>
                        </div>
                        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-sm font-medium transition-colors cursor-pointer group-hover:scale-105 transform">Watch Review</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "SHOP" && (
          <div className="grid w-full h-full gap-4">
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
            {/* Products Grid */}
            <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
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
              <button className="px-8 py-4 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-2xl font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">Load More Products</button>
            </div>
          </div>
        )}
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
