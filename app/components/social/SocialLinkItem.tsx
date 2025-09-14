import React from "react";
import { SocialLink } from "../../types/social";
import { formatFollowers } from "../../utils/formatters";

interface SocialLinkItemProps {
  link: SocialLink;
  variant?: "mobile" | "desktop";
}

export default function SocialLinkItem({ link, variant = "desktop" }: SocialLinkItemProps) {
  const isMobile = variant === "mobile";

  return (
    <div className={`flex justify-between items-center  py-4 px-6 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200/40 hover:shadow-sm hover:border-gray-300 transition-all duration-300 cursor-pointer group`}>
      <div className="flex items-center space-x-3">
        {link.svgIcon ? <span className="group-hover:scale-110 transition-transform">{link.svgIcon}</span> : <span className="text-lg group-hover:scale-110 transition-transform">{link.icon}</span>}
        <span className="text-gray-900 font-semibold text-sm">{link.handle}</span>
      </div>
      <span className={`text-gray-600 font-medium ${isMobile ? "text-sm" : "text-xs"}`}>{formatFollowers(link.followers)} followers</span>
    </div>
  );
}
