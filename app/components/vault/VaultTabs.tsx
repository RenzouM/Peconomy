"use client";

import { useState } from "react";

interface VaultTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function VaultTabs({ activeTab, onTabChange }: VaultTabsProps) {
  const tabs = [
    {
      id: "private",
      label: "Private Vault",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="-6 -2 24 24"
          fill="#000000">
          <path
            fill={activeTab === "private" ? "red" : "gray"}
            d="M6 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM2 9.528V4a4 4 0 1 1 8 0v5.528a6 6 0 1 1-8 0zM4 8.34A5.99 5.99 0 0 1 6 8c.701 0 1.374.12 2 .341V4a2 2 0 1 0-4 0v4.341zM6 16a2 2 0 1 1 0-4a2 2 0 0 1 0 4z"></path>
        </svg>
      ),
    },
    {
      id: "public",
      label: "Public Vault",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="-6 -2 24 24"
          fill="#000000">
          <path
            stroke={activeTab === "public" ? "blue" : "gray"}
            fill={activeTab === "public" ? "blue" : "gray"}
            strokeWidth="0"
            d="M6 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM2 9.528V4a4 4 0 1 1 8 0v1a1 1 0 1 1-2 0V4a2 2 0 1 0-4 0v4.341a6 6 0 1 1-2 1.186zM6 16a2 2 0 1 1 0-4a2 2 0 0 1 0 4z"></path>
        </svg>
      ),
    },
    {
      id: "defi",
      label: "DeFi",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#000000">
          <path
            fill="#000000"
            d="M8 13.65V6h3v7.65l-1.5-1.4l-1.5 1.4Zm5 1.5V2h3v10.15l-3 3ZM3 18.6V10h3v5.6l-3 3Zm0 2.45l6.45-6.45L13 17.65l5.6-5.6H17v-2h5v5h-2v-1.6l-6.9 6.9l-3.55-3.05l-3.75 3.75H3Z"></path>
        </svg>
      ),
    },
    {
      id: "metrics",
      label: "Metrics",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 1024 1024"
          fill="#000000">
          <path
            fill="#000000"
            d="M511.984 36.128C230.016 36.128.639 265.536.639 547.504c0 177.152 89.68 339.185 239.903 433.408c14.944 9.472 34.688 4.88 44.097-10.096s4.88-34.72-10.096-44.095c-54.096-33.952-99.04-78.048-133.424-128.88l33.552-19.376c15.311-8.848 20.56-28.4 11.712-43.711c-8.88-15.344-28.464-20.56-43.712-11.712l-33.6 19.391c-24.4-50.511-39.297-105.792-43.281-163.424h35.616c17.68 0 32-14.32 32-32s-14.32-32-32-32H65.95c4.24-58.687 19.776-114.304 44.56-164.592l32.16 18.56a31.745 31.745 0 0 0 15.97 4.288c11.055 0 21.807-5.744 27.743-16c8.847-15.312 3.6-34.88-11.712-43.713l-31.84-18.368c32.112-46.832 72.864-87.296 119.984-119.023l18.016 31.2c5.935 10.288 16.687 16 27.743 16a31.75 31.75 0 0 0 15.969-4.288c15.311-8.848 20.56-28.4 11.712-43.712l-17.953-31.072c49.329-23.792 103.68-38.656 160.976-42.816v39.872c0 17.68 14.32 32 32 32s32-14.32 32-32v-40c58.592 4.08 114.128 19.391 164.384 43.95l-17.36 30.049c-8.848 15.311-3.6 34.88 11.712 43.712a31.745 31.745 0 0 0 15.969 4.288c11.055 0 21.807-5.712 27.743-16l17.28-29.936a451.19 451.19 0 0 1 118.88 118.816l-29.968 17.312c-15.311 8.847-20.56 28.4-11.711 43.71c5.935 10.289 16.687 16 27.743 16c5.44 0 10.944-1.375 15.969-4.287l30.127-17.392C938.638 401.839 954 457.39 958.094 516H922.96c-17.68 0-32 14.32-32 32s14.32 32 32 32h35.12c-4.048 56.88-18.592 111.439-42.496 161.312l-31.68-18.288c-15.28-8.848-34.912-3.568-43.712 11.713c-8.848 15.311-3.6 34.88 11.712 43.712L883.68 796.8c-35.103 52.24-81.44 97.393-137.359 131.824c-15.055 9.28-19.712 29.008-10.464 44.032c6.065 9.808 16.529 15.216 27.28 15.216a31.896 31.896 0 0 0 16.753-4.752c152.464-93.904 243.472-256.784 243.472-435.632c0-281.952-229.408-511.36-511.376-511.36zm236.127 411.6c15.296-8.848 20.544-28.398 11.712-43.71c-8.832-15.296-28.416-20.544-43.712-11.696L542.287 492.674c-9.28-5.248-19.856-8.496-31.28-8.496c-35.28 0-63.84 28.591-63.84 63.807c0 35.248 28.576 63.84 63.84 63.84c35.28 0 63.84-28.592 63.84-63.84c0-.064-.016-.144-.016-.209z"></path>
        </svg>
      ),
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#000000">
          <path
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2 5a2 2 0 0 1 2-2h6v18H4a2 2 0 0 1-2-2V5Zm12-2h6a2 2 0 0 1 2 2v5h-8V3Zm0 11h8v5a2 2 0 0 1-2 2h-6v-7Z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-200 flex items-center ${activeTab === tab.id ? `bg-white text-${tab.id === "private" ? "red" : tab.id === "public" ? "blue" : tab.id === "defi" ? "purple" : tab.id === "metrics" ? "orange" : "green"}-400 shadow-sm` : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}>
          {tab.icon}
          <span className="ml-1">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
