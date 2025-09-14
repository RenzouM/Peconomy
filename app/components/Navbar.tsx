"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface NavbarProps {
  session: any;
  signInAction: () => Promise<void>;
  signOutAction: () => Promise<void>;
}

export default function Navbar({ session, signInAction, signOutAction }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b p-1 rounded-4xl border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center h-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex flex-col">
          <span className="flex items-center space-x-4 text-2xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent italic">Peconomy</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-1">
          <a
            href="#features"
            className="px-4 py-2 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-4xl hover:bg-red-50 font-medium">
            Features
          </a>
          <a
            href="#pricing"
            className="px-4 py-2 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-4xl hover:bg-red-50 font-medium">
            Pricing
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden xl:flex items-center space-x-3">
          {session?.user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-4xl py-1 px-3 cursor-pointer text-gray-700  hover:text-red-600 transition-colors duration-300 font-medium">
              <Image
                src={session.user.image || ""}
                alt="User Avatar"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <p className="text-sm">{session.user.name}</p>
            </Link>
          ) : (
            ""
          )}

          {session?.user ? (
            <form action={signOutAction}>
              <button
                type="submit"
                className="bg-gradient-to-r cursor-pointer from-red-600 via-red-500 to-red-700 text-white px-5 py-2 rounded-4xl hover:from-red-700 hover:via-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
                Sign Out
              </button>
            </form>
          ) : (
            <form action={signInAction}>
              <button
                type="submit"
                className="bg-gradient-to-r cursor-pointer from-red-600 via-red-500 to-red-700 text-white px-5 py-2 rounded-4xl hover:from-red-700 hover:via-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
                Sign In with Google
              </button>
            </form>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-red-600 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium">
              Features
            </a>
            <a
              href="#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium">
              Pricing
            </a>
            <a
              href="#roadmap"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium">
              Roadmap
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium">
              About
            </a>
            <div className="pt-4 space-y-2">
              {session?.user ? (
                <form action={signOutAction}>
                  <button
                    type="submit"
                    className="w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium">
                    Sign Out
                  </button>
                </form>
              ) : (
                <form action={signInAction}>
                  <button
                    type="submit"
                    className="w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium">
                    Sign In
                  </button>
                </form>
              )}
              <button className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white px-3 py-2 rounded-lg hover:from-red-700 hover:via-red-600 hover:to-red-800 transition-all duration-300 font-semibold">Get Started</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
