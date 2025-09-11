import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
      title: "Unified Creator Hub",
      description: "One app for all your content, reviews, and monetization. No more juggling multiple platforms.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
      ),
      title: "Private Economy",
      description: "Built on encrypted eERC20 tokens for secure, private transactions and payments.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z" />
        </svg>
      ),
      title: "AI-Powered Growth",
      description: "Smart recommendations, speech-to-text, and sponsorship matching to boost your reach.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
        </svg>
      ),
      title: "Multiple Revenue Streams",
      description: "Sponsored reviews, referral NFTs, shop commissions, and ad slot rentals.",
    },
  ];

  const stats = [
    { number: "3", label: "Core Modules" },
    { number: "4", label: "Revenue Streams" },
    { number: "∞", label: "Growth Potential" },
    { number: "100%", label: "Private" },
  ];

  const tiers = [
    {
      name: "Free",
      price: "$0",
      features: ["Basic Feed & Reviews", "Shop Access", "Community Features"],
      popular: false,
    },
    {
      name: "Creator",
      price: "$5",
      features: ["AI Features", "Referral Program", "Advanced Analytics", "Priority Support"],
      popular: true,
    },
    {
      name: "Pro",
      price: "$10",
      features: ["Creator Badge", "Premium Features", "Advanced Tools", "Exclusive Content"],
      popular: false,
    },
    {
      name: "Sponsor",
      price: "$25",
      features: ["Campaign Analytics", "AI Insights", "Premium Tools", "Dedicated Support"],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-4xl">
      {/* Enhanced Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b p-1 rounded-4xl border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent italic">Peconomy</span>
                {/* <span className="text-xs text-gray-500 font-medium italic">Private Economy</span> */}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <a
                href="#features"
                className="px-4 py-2 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-lg hover:bg-red-50 font-medium">
                Features
              </a>
              <a
                href="#pricing"
                className="px-4 py-2 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-lg hover:bg-red-50 font-medium">
                Pricing
              </a>
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/profile"
                className="text-gray-700 cursor-pointer hover:text-red-600 transition-colors duration-300 font-medium">
                Sign In
              </Link>
              <Link
                href="/profile"
                className="bg-gradient-to-r cursor-pointer from-red-600 via-red-500 to-red-700 text-white px-5 py-2 rounded-3xl hover:from-red-700 hover:via-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button className="text-gray-700 hover:text-red-600 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu - CSS Only */}
          <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium">
                Features
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium">
                Pricing
              </a>
              <a
                href="#roadmap"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium">
                Roadmap
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium">
                About
              </a>
              <div className="pt-4 space-y-2">
                <button className="w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium">Sign In</button>
                <button className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white px-3 py-2 rounded-lg hover:from-red-700 hover:via-red-600 hover:to-red-800 transition-all duration-300 font-semibold">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden mt-6 rounded-4xl border-t-2 border-red-600 shadow-2xl/15 border-b-1 border-b-gray-200">
        <Image
          src="/logo.png"
          alt="Peconomy Logo"
          width={580}
          height={580}
          className="absolute -bottom-24 -left-32 animate-float"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-8xl font-bold text-gray-900 mb-6 leading-tight ">
              The Creator&apos;s
              <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">Coin</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">Unify your content, monetize with privacy, and grow with AI. Peconomy is the all-in-one platform that transforms how creators build, earn, and thrive in the digital age.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/profile"
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-3xl text-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center">
                Start Building Your Empire
                <svg
                  className="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </Link>
              <Link
                href="/profile"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-3xl text-lg font-semibold hover:border-red-600 hover:text-red-600 transition-all duration-300 flex items-center">
                <svg
                  className="mr-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50/40 to-white/60 rounded-3xl mt-8 mx-6">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/70 transition-all duration-300 hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-3 tracking-tight">{stat.number}</div>
                <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-gradient-to-br from-gray-50/50 to-white/80">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Peconomy combines the power of social media, e-commerce, and blockchain technology to create the ultimate creator platform.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-sm border border-white/20 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-24 bg-gradient-to-br from-gray-50/30 to-white/60 rounded-3xl mt-8 mx-6 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">Three Powerful Modules, One Platform</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feed Module */}
            <div className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-sm border border-white/20 hover:shadow-xl hover:shadow-blue-200/30 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-blue-100/10 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <svg
                    className="w-10 h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Feed</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">Aggregate all your social media content in one place. AI-powered sponsorship recommendations help brands discover the perfect creators for their campaigns.</p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">Cross-platform content aggregation</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">Vector database for smart search</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">AI sponsorship matching</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reviews Module */}
            <div className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-sm border border-white/20 hover:shadow-xl hover:shadow-purple-200/30 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 to-purple-100/10 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <svg
                    className="w-10 h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Reviews</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">Create sponsored product reviews with AI-powered speech-to-text. Boost your SEO visibility while earning from brand partnerships.</p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">AI speech-to-text generation</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">SEO-optimized content</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">Direct sponsor payments</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Shop Module */}
            <div className="group relative bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-sm border border-white/20 hover:shadow-xl hover:shadow-green-200/30 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-green-100/10 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <svg
                    className="w-10 h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Shop</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">Sell your own products or earn commissions through referrals. Each referral gets an NFT, creating a gamified growth system.</p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">Referral NFT rewards</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">Commission-based sales</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">Multi-tier affiliate system</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Seller Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50/40 to-white/60 rounded-3xl mt-8 mx-6">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">Top Seller of the Month</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Meet our most successful creator who&apos;s dominating the platform this month</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-sm border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mr-4">👑</div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">@GameMaster</h3>
                    <p className="text-gray-600 text-lg">Off The Grid Gaming Expert</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">+$12,450</div>
                    <div className="text-gray-600 font-medium">This Month</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">156</div>
                    <div className="text-gray-600 font-medium">Streams</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">Top Off The Grid gameplay content</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">Avalanche blockchain integration</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="text-base">Gaming NFT collections & streams</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200/50">
                  <p className="text-gray-700 italic text-lg leading-relaxed">&ldquo;Peconomy revolutionized my gaming content! Streaming Off The Grid on Avalanche with AI-powered features and private economy tokens helped me build an amazing community and increase my earnings by 300% this month!&rdquo;</p>
                  <div className="mt-4 text-sm text-gray-600 font-medium">- @GameMaster, Top Gaming Creator</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative group">
                <Image
                  src="/offthegrid.webp"
                  alt="Top Seller - Off The Grid Gaming Creator"
                  width={500}
                  height={500}
                  className="rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>

                {/* Floating stats */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">#1</div>
                    <div className="text-sm text-gray-600 font-medium">This Month</div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-700">Live Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-24 bg-gradient-to-br from-gray-50/30 to-white/60 rounded-3xl mt-8 mx-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">Choose Your Growth Path</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Start free and scale up as you grow. Each tier unlocks powerful features to accelerate your success.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`group relative bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-sm border border-white/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${tier.popular ? "border-red-300/50 shadow-red-200/30" : "hover:shadow-gray-200/50"}`}>
                <div className={`absolute inset-0 rounded-3xl ${tier.popular ? "bg-gradient-to-br from-red-50/30 to-red-100/20" : "bg-gradient-to-br from-white/40 to-white/20"}`}></div>

                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 w-[137px]">
                    <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">Most Popular</span>
                  </div>
                )}

                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">{tier.name}</h3>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {tier.price}
                      {tier.price !== "$0" && <span className="text-lg text-gray-500">/month</span>}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        <span className="text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-4 cursor-pointer px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${tier.popular ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{tier.price === "$0" ? "Get Started" : "Choose Plan"}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Incentive Section */}
      <section className="py-20 my-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-50/80 via-emerald-50/80 to-teal-50/80"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Earn Money Instantly!
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Start <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Generating Income</span> Right Now
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join our referral system and earn <strong className="text-green-600">up to $1 USD per referral (lifetime)</strong> instantly. No waiting, no complications. Money goes straight to your account!
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">Instant payment in USDC</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">No referral limits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">Custom referral code</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">Real-time earnings dashboard</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                  <span className="flex items-center justify-center">
                    Start Referring
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
                <button className="group border-2 border-green-600 text-green-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <span className="flex items-center justify-center">
                    See How It Works
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Content - USDC Image */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-lg">
                      <Image
                        src="/usdc.png"
                        alt="USDC"
                        width={100}
                        height={100}
                        className="w-24 h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">Instant Payments</h3>
                      <p className="text-gray-600">Receive your earnings directly in USDC</p>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">$1 USD</div>
                        <div className="text-sm text-green-700 font-medium">per referral (lifetime)</div>
                        <div className="text-xs text-green-600 mt-1">Instant payment</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden rounded-t-4xl">
        <Image
          src="/card.png"
          alt="Avalanche Card"
          width={330}
          height={330}
          className="absolute bottom-0 right-32 transition-all duration-300 ease-out z-10"
        />

        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-700"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/90 via-red-500/90 to-red-700/90"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Transform Your <span className="bg-gradient-to-r from-white via-red-50 to-white bg-clip-text text-transparent">Creator Journey?</span>
          </h2>
          <p className="text-xl text-red-100 mb-12 leading-relaxed max-w-3xl mx-auto">Join thousands of creators who are already building their private economy on Peconomy. Start earning, growing, and thriving today.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/profile"
              className="group bg-white/90 backdrop-blur-sm text-red-600 px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-white/20 cursor-pointer">
              <span className="flex items-center justify-center">
                Start Building Now
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
            <Link
              href="/profile"
              className="group border-2 border-white/80 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:border-white">
              <span className="flex items-center justify-center">Explore</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden rounded-b-4xl">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12">
              {/* Brand Section */}
              <div className="group">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-red-400 via-red-300 to-red-500 bg-clip-text text-transparent italic">Peconomy</span>
                </div>
                <p className="text-gray-400 leading-relaxed text-lg">The next-generation private digital economy for creators, brands, and consumers.</p>

                {/* Social Links */}
                <div className="flex space-x-4 mt-6">
                  {["twitter", "linkedin", "github", "discord"].map(social => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-110 border border-gray-700/50">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Platform Links */}
              <div className="group">
                <h4 className="text-xl font-bold text-white mb-6 group-hover:text-red-400 transition-colors duration-300">Platform</h4>
                <ul className="space-y-4">
                  {["Feed", "Reviews", "Shop", "Vault"].map(item => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-red-400 transition-all duration-300 flex items-center group/item">
                        <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover/item:bg-red-400 transition-colors duration-300"></span>
                        {item}
                        <svg
                          className="w-4 h-4 ml-2 opacity-0 group-hover/item:opacity-100 transform -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div className="group">
                <h4 className="text-xl font-bold text-white mb-6 group-hover:text-red-400 transition-colors duration-300">Company</h4>
                <ul className="space-y-4">
                  {["About", "Blog", "Careers", "Contact"].map(item => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-red-400 transition-all duration-300 flex items-center group/item">
                        <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover/item:bg-red-400 transition-colors duration-300"></span>
                        {item}
                        <svg
                          className="w-4 h-4 ml-2 opacity-0 group-hover/item:opacity-100 transform -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div className="group">
                <h4 className="text-xl font-bold text-white mb-6 group-hover:text-red-400 transition-colors duration-300">Legal</h4>
                <ul className="space-y-4">
                  {["Privacy", "Terms", "Security"].map(item => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-red-400 transition-all duration-300 flex items-center group/item">
                        <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover/item:bg-red-400 transition-colors duration-300"></span>
                        {item}
                        <svg
                          className="w-4 h-4 ml-2 opacity-0 group-hover/item:opacity-100 transform -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Signup */}
            {/* <div className="mt-16 pt-12 border-t border-gray-800/50">
              <div className="max-w-2xl mx-auto text-center">
                <h4 className="text-2xl font-bold text-white mb-4">Stay Updated</h4>
                <p className="text-gray-400 mb-6">Get the latest updates on new features and creator success stories.</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                  />
                  <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-3xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">Subscribe</button>
                </div>
              </div>
            </div> */}

            {/* Copyright */}
            <div className="mt-16 pt-8 border-t border-gray-800/50 text-center">
              <p className="text-gray-400 text-lg">&copy; 2025 Peconomy.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
