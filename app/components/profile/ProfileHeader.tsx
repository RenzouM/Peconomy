"use client";

import Image from "next/image";
export default function ProfileHeader() {
  return (
    <div className="min-h-[300px] h-[300px] w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden flex items-center justify-center text-center border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
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
  );
}
