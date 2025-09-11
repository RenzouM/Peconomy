"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { mockPosts, mockSuggestedUsers, mockProducts, productCategories, Product } from "../../data/mockData";
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

  const posts = mockPosts;
  const suggestedUsers = mockSuggestedUsers;

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
    <>
      {/* Main Content Area */}
      <div className="w-full h-full flex flex-col flex-1 bg-white ">
        {/* Main Content and Right Sidebar */}
        <div className="grid xl:flex h-full gap-x-4 ">
          {/* Left Sidebar */}
          <div className="w-full  min-h-96 pb-4 md:h-[500px] lg:h-full overflow-y-auto scrollbar-thin">
            {activeTab === "FEED" && (
              <div className="w-full h-full">
                {/* Feed Content with Timeline */}
                <div className="flex-1">
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
          <div className="flex flex-col space-y-4 h-full pb-4">
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
    </>
  );
}
