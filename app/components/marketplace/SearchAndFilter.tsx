"use client";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  categories: string[];
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function SearchAndFilter({ searchQuery, onSearchChange, selectedCategory, onCategoryChange, sortBy, onSortChange, categories, showFilters, onToggleFilters }: SearchAndFilterProps) {
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-4 text-black">
      {/* Filter Toggle and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <button
          onClick={onToggleFilters}
          className="flex cursor-pointer items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span>Filters</span>
          <span className={`transform transition-transform ${showFilters ? "rotate-180" : ""}`}>▼</span>
        </button>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
          />
        </div>

        <div className="flex">
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            className="w-40 cursor-pointer text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-full">
            {sortOptions.map(option => (
              <option
                key={option.value}
                value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-1 cursor-pointer rounded-lg text-sm font-medium transition-all duration-300 ${selectedCategory === category ? "bg-gray-900 text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
