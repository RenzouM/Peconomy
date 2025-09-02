import React from "react";
import { SocialLink } from "../../types/social";
import SocialLinkItem from "./SocialLinkItem";

interface SocialLinksListProps {
  links: SocialLink[];
  variant?: "mobile" | "desktop";
  maxItems?: number;
}

export default function SocialLinksList({ links, variant = "desktop", maxItems }: SocialLinksListProps) {
  const displayLinks = maxItems ? links.slice(0, maxItems) : links;

  return (
    <div className={variant === "mobile" ? "space-y-3" : "space-y-2"}>
      {displayLinks.map((link, index) => (
        <SocialLinkItem
          key={index}
          link={link}
          variant={variant}
        />
      ))}
      {maxItems && links.length > maxItems && <div className="text-center text-gray-500 text-sm">...</div>}
    </div>
  );
}
