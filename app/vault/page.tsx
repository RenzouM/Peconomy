import Image from "next/image";
import VaultHeader from "../components/vault/VaultHeader";
import VaultStateProvider from "../components/vault/VaultStateProvider";

export default function PeconomyVaults() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-4xl">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 font-inter relative h-full p-4 gap-4 flex flex-col">
        {/* Header Section - Interactivo */}
        <VaultHeader />

        {/* Estado y contenido interactivo - Se hidrata en el cliente */}
        <VaultStateProvider />

        {/* Background Logo - Estático */}
        <Image
          src="/logo.png"
          alt="PECO"
          width={550}
          height={550}
          className="absolute right-[-50px] bottom-[-120px] opacity-50"
        />
      </div>
    </div>
  );
}
