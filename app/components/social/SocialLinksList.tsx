import React, { useState } from "react";
import { SocialLink } from "../../types/social";
import SocialLinkItem from "./SocialLinkItem";

interface SocialLinksListProps {
  links: SocialLink[];
  variant?: "mobile" | "desktop";
  maxItems?: number;
}

export default function SocialLinksList({ links, variant = "desktop", maxItems }: SocialLinksListProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(links.length / itemsPerPage);

  const displayLinks = maxItems ? links.slice(0, maxItems) : links;
  const paginatedLinks = displayLinks.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextPage = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  // Si hay 4 o menos items, mostrar sin carousel
  if (displayLinks.length <= itemsPerPage) {
    return (
      <div className={variant === "mobile" ? "space-y-3" : "space-y-2"}>
        {displayLinks.map((link, index) => (
          <SocialLinkItem
            key={index}
            link={link}
            variant={variant}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {/* Grid de 4 items */}
      <div className="h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-y-2 mb-4">
        {paginatedLinks.map((link, index) => (
          <SocialLinkItem
            key={currentPage * itemsPerPage + index}
            link={link}
            variant={variant}
          />
        ))}
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-center items-center space-x-2 h-10">
        <button
          onClick={prevPage}
          className="flex items-center justify-center w-10 h-10  rounded-full hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 shadow-xs"
          aria-label="Página anterior">
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

        {/* Indicadores de página */}
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentPage ? "bg-red-300/50 w-6" : "bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Ir a página ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          className="flex items-center justify-center w-10 h-10  rounded-full hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 shadow-xs"
          aria-label="Página siguiente">
          <svg
            className="w-5 h-5 text-gray-600"
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
        </button>
      </div>
    </div>
  );
}
