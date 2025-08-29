"use client";

import Profile from "./components/Profile";
import PeconomyVaults from "./components/PeconomyVaults";
import { useState } from "react";

export default function Home() {
  const [showOperations, setShowOperations] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100  p-4 lg:px-12 xl:px-24">
      {!showOperations ? <Profile /> : <PeconomyVaults />}

      {/* Floating Action Button to switch views */}
      <button
        onClick={() => setShowOperations(!showOperations)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-red-700 to-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 group cursor-pointer"
        title={showOperations ? "Ver Perfil" : "Ver Operaciones"}>
        <span className="text-2xl group-hover:scale-110 transition-transform">
          {showOperations ? (
            "👤"
          ) : (
            <div className="flex">
              <p className="text-4xl font-bold italic">P</p>
            </div>
          )}
        </span>
      </button>
    </div>
  );
}
