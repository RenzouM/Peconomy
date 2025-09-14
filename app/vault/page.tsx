import Image from "next/image";
import VaultHeader from "../components/vault/VaultHeader";
import VaultStateProvider from "../components/vault/VaultStateProvider";

export default function PeconomyVaults() {
  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-2 rounded-4xl">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full bg-white rounded-4xl shadow-2xl overflow-hidden border border-gray-200 font-inter relative h-full p-4 gap-4 flex flex-col">
        {/* Header Section - Interactivo */}
        <VaultHeader />

        {/* Estado y contenido interactivo - Se hidrata en el cliente */}
        <VaultStateProvider />
      </div>
    </div>
  );
}
