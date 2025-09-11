"use client";

interface ProfileTabsProps {
  activeTab: "FEED" | "REVIEWS" | "SHOP";
  onTabChange: (tab: "FEED" | "REVIEWS" | "SHOP") => void;
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabs = ["FEED", "REVIEWS", "SHOP"] as const;

  return (
    <div className="flex justify-center space-x-8 border-b-2 border-gray-100">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pt-2 pb-3 px-5 text-sm font-semibold cursor-pointer transition-all duration-200 ${activeTab === tab ? "text-gray-900 bg-gray-100 rounded-t-md shadow-inner" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-t-md"}`}>
          {tab}
        </button>
      ))}
    </div>
  );
}
