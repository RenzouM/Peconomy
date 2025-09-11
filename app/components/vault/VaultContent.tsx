"use client";

import { useState } from "react";
import Image from "next/image";

interface VaultContentProps {
  activeTab: string;
}

export default function VaultContent({ activeTab }: VaultContentProps) {
  return (
    <div className="grid w-full gap-4 text-black self-start">
      {activeTab === "private" ? (
        <div className="flex bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-800 mb-2">PRIVATE VAULT</h3>
              <div className="space-y-2 text-red-700 text-sm">
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Your balance and transactions are totally private 🔒</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Only you can see your balance and transactions</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-800 mb-2">PUBLIC VAULT</h3>
              <div className="space-y-2 text-blue-700 text-sm">
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Your balance and transactions are public 🌐</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Transparent and verifiable on the blockchain</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full gap-4 max-w-68 text-center bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl shadow-xl border border-gray-200">
        <div className="w-44 h-auto rounded-full m-auto">
          <svg
            viewBox="0 0 256 256"
            fill="currentColor">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M87.6477 203.403C66.6922 203.403 47.0213 198.931 30 191.095L99.2514 127.885C89.6861 120.038 83.5836 108.126 83.5836 94.7884C83.5836 81.2079 89.9104 69.1052 99.7773 61.2668V52.0015H126.08C126.177 52.0008 126.274 52.0005 126.372 52.0005C137.068 52.0005 146.848 55.9254 154.349 62.4136C161.85 55.926 171.629 52.0015 182.325 52.0015H182.389L182.39 52L182.392 52.0015H208.919V61.2679C218.786 69.1062 225.113 81.209 225.113 94.7894C225.113 111.867 215.108 126.608 200.64 133.47C195.467 148.743 185.737 162.479 172.714 173.652V193.398H139.977C124.227 199.801 106.455 203.403 87.6477 203.403ZM126.371 127.703C134.16 127.703 141.317 124.998 146.954 120.475L154.282 136.976L161.645 120.397C167.296 124.967 174.491 127.703 182.325 127.703C200.502 127.703 215.238 112.967 215.238 94.7895C215.238 76.6117 200.502 61.8757 182.325 61.8757C170.513 61.8757 160.155 68.0975 154.348 77.4425C148.541 68.0975 138.183 61.8757 126.371 61.8757C108.193 61.8757 93.4575 76.6117 93.4575 94.7895C93.4575 112.967 108.193 127.703 126.371 127.703ZM126.371 117.829C139.096 117.829 149.411 107.514 149.411 94.7893C149.411 82.0648 139.096 71.7496 126.371 71.7496C113.647 71.7496 103.331 82.0648 103.331 94.7893C103.331 107.514 113.647 117.829 126.371 117.829ZM126.371 107.955C133.642 107.955 139.537 102.06 139.537 94.7893C139.537 87.5182 133.642 81.6238 126.371 81.6238C119.1 81.6238 113.206 87.5182 113.206 94.7893C113.206 102.06 119.1 107.955 126.371 107.955ZM205.364 94.7893C205.364 107.514 195.049 117.829 182.324 117.829C169.6 117.829 159.285 107.514 159.285 94.7893C159.285 82.0648 169.6 71.7496 182.324 71.7496C195.049 71.7496 205.364 82.0648 205.364 94.7893ZM195.49 94.7893C195.49 102.06 189.596 107.955 182.324 107.955C175.053 107.955 169.159 102.06 169.159 94.7893C169.159 87.5182 175.053 81.6238 182.324 81.6238C189.596 81.6238 195.49 87.5182 195.49 94.7893Z"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-2 my-auto z-50">
          <h4 className="font-semibold text-sm">Recommended Wallet</h4>
          <p className="text-gray-700 text-xs">We highly recommend using CORE WALLET for the best experience and security</p>
        </div>
      </div>

      <div className="flex max-w-84 bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl gap-4 h-auto shadow-xl border border-gray-200 z-50">
        <Image
          src="/card.png"
          alt="Core Wallet"
          width={100}
          height={100}
          className="w-32"
        />
        <div className="grid text-center justify-center gap-2 self-center">
          <p className="text-gray-700">Get the full experience paying with Avalanche CARD all over the world</p>
          <button className="text-gray-100 cursor-pointer rounded-2xl bg-gray-700 px-3 py-1 text-xs">¡Order now!</button>
        </div>
      </div>
    </div>
  );
}
