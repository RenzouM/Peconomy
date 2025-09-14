"use client";

import { useState } from "react";
import VaultTabs from "./VaultTabs";
import VaultOperations from "./VaultOperations";
import VaultContent from "./VaultContent";

export default function VaultStateProvider() {
  const [activeTab, setActiveTab] = useState<"private" | "public" | "defi" | "metrics" | "dashboard">("private");
  const [vaultActiveTabAction, setVaultActiveTabAction] = useState<"swap" | "decrypt" | "transfer" | "encrypt" | "buy">("decrypt");

  return (
    <>
      {/* Tabs - Interactivo */}
      <VaultTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex h-full gap-x-4 overflow-y-auto">
        {/* Operations - Interactivo */}
        <VaultOperations
          activeTab={activeTab}
          vaultActiveTabAction={vaultActiveTabAction}
          onVaultTabActionChange={setVaultActiveTabAction}
        />
        {/* Content - Interactivo */}
        <VaultContent activeTab={activeTab} />
      </div>
    </>
  );
}
