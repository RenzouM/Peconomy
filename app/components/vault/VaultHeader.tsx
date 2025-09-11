"use client";

import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import Link from "next/link";

export default function VaultHeader() {
  const { login, logout, authenticated, user } = usePrivy();

  const handleDisconnect = async () => {
    await logout();
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center cursor-pointer w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md"
            title="Go back">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <Link
            href="/"
            className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="Peconomy"
              width={48}
              height={48}
              className="drop-shadow-lg"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent tracking-tight">Peconomy</h1>
          </Link>
        </div>

        <div className="text-right">
          {!authenticated ? (
            <button
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white"
              onClick={() => login()}>
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-end space-y-3">
              <p className="text-gray-700 text-left my-auto absolute right-38 top-3 font-medium text-sm bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                <span className="font-bold">Connected address:</span>
                <br />
                <span className="font-mono text-xs text-gray-600">{user?.wallet?.address}</span>
              </p>
              <button
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white"
                onClick={handleDisconnect}>
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
