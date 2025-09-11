"use client";

import { useState, useRef, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import ProfileTabs from "./ProfileTabs";

export default function ProfileStateProvider() {
  const [activeTab, setActiveTab] = useState<"FEED" | "REVIEWS" | "SHOP">("FEED");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Usar Intersection Observer para detectar cuando el trigger está visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Cuando el trigger sale de la vista (scroll hacia abajo), ocultar header permanentemente
        if (!entry.isIntersecting) {
          setIsHeaderVisible(false);
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "0px",
        threshold: 0.1, // Se activa cuando el 10% del trigger es visible
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className={`flex flex-col w-full p-4 pb-0 gap-4 ${isHeaderVisible ? "overflow-y-auto  scrollbar-thin" : "overflow-y-hidden"}`}>
      {/* Trigger invisible para detectar scroll */}

      {/* Header Section - Hide */}
      {isHeaderVisible && (
        <>
          <div
            ref={triggerRef}
            className="h-1 w-full -mt-4"
          />
          <ProfileHeader />
        </>
      )}

      {/* Navigation Tabs */}
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content Area */}
      <ProfileContent
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
