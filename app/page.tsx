"use client";

import Profile from "./components/Profile";
import PeconomyOperations from "./components/PeconomyOperations";
import { useState } from "react";

export default function Home() {
  const [showOperations, setShowOperations] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100  py-12 px-36">
      {!showOperations ? (
        <Profile />
      ) : (
        <div className="relative">
          <PeconomyOperations />
        </div>
      )}

      {/* Floating Action Button to switch views */}
      <button
        onClick={() => setShowOperations(!showOperations)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-red-700 to-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 group cursor-pointer"
        title={showOperations ? "Ver Perfil" : "Ver Operaciones"}>
        <span className="text-2xl group-hover:scale-110 transition-transform">
          {showOperations ? (
            "👤"
          ) : (
            <div className="flex">
              <img
                src="/vault.png"
                alt="PECO"
                className="w-8 h-8 scale-150"
              />
            </div>
          )}
        </span>
      </button>
    </div>
  );
}
