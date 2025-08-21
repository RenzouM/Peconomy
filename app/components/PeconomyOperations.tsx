"use client";

import YourComponent from "../wallet";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { avalancheFuji } from "viem/chains";

export default function PeconomyOperations() {
  const { login, logout, authenticated, user, ready } = usePrivy();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Form states
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });

  const publicClient = createPublicClient({
    chain: avalancheFuji,
    transport: http("https://api.avax-test.network/ext/bc/C/rpc"),
  });

  // Función para verificar estado actual en la blockchain
  const checkBlockchainStatus = async () => {
    if (!authenticated || !user?.wallet?.address) return;

    try {
      setLoading(true);
    } catch (err) {
      console.error("Error al verificar estado:", err);
    } finally {
      setLoading(false);
    }
  };

  // Verificar estado cuando cambia la autenticación o wallet
  useEffect(() => {
    if (ready) {
      checkBlockchainStatus();
    }
  }, [authenticated, ready, user?.wallet?.address]);

  // Manejar cambio de wallet
  const handleDisconnect = async () => {
    await logout();
    setError("");
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEncrypt = () => {
    console.log("Encrypting data:", formData);
    // Add encryption logic here
  };

  const handleDecrypt = () => {
    console.log("Decrypting data:", formData);
    // Add decryption logic here
  };

  const handleTransfer = () => {
    console.log("Transferring data:", formData);
    // Add transfer logic here
  };

  const handleBuy = () => {
    console.log("Buying with data:", formData);
    // Add buy logic here
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex items-center justify-center">
      {/* Screen Container */}
      <div className="w-full h-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <main className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <h1 className="text-5xl font-bold text-red-600 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text">Peconomy</h1>

              <div className="text-right">
                {!authenticated ? (
                  <div className="flex flex-col items-end">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold py-3 px-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={login}>
                      Conectar Wallet
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-end">
                    <p className="text-gray-700 font-medium text-sm mb-2">Conectado como: {user?.wallet?.address}</p>
                    <button
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-2 px-4 rounded-xl cursor-pointer text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      onClick={logout}>
                      Desconectar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-100 rounded-xl border border-red-200">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Form Section */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl shadow-2xl border border-gray-200">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Operations</h2>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Encrypt</label>
                  <input
                    type="text"
                    name="input1"
                    value={formData.input1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base bg-white hover:border-gray-300 cursor-text"
                    placeholder="Ingresa valor 1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Decrypt</label>
                  <input
                    type="text"
                    name="input2"
                    value={formData.input2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base bg-white hover:border-gray-300 cursor-text"
                    placeholder="Ingresa valor 2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Transfer</label>
                  <input
                    type="text"
                    name="input3"
                    value={formData.input3}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base bg-white hover:border-gray-300 cursor-text"
                    placeholder="Ingresa valor 3"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Buy</label>
                  <input
                    type="text"
                    name="input4"
                    value={formData.input4}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base bg-white hover:border-gray-300 cursor-text"
                    placeholder="Ingresa valor 4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={handleEncrypt}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-base">
                  Encrypt
                </button>
                <button
                  onClick={handleDecrypt}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-base">
                  Decrypt
                </button>
                <button
                  onClick={handleTransfer}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-base">
                  Transfer
                </button>
                <button
                  onClick={handleBuy}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-base">
                  Buy
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
