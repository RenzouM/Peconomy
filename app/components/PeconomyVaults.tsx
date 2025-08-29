"use client";

import YourComponent from "../wallet";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { avalancheFuji } from "viem/chains";

export default function PeconomyVaults() {
  const { login, logout, authenticated, user, ready } = usePrivy();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Form states - single amount for each section
  const [privateVaultAmount, setPrivateVaultAmount] = useState<string>("");
  const [publicVaultAmount, setPublicVaultAmount] = useState<string>("");

  // Tab state
  const [activeTab, setActiveTab] = useState<"private" | "public">("private");

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

  // Amount handlers with increment/decrement
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(prev => {
      const current = parseFloat(prev) || 0;
      return (current + 1).toString();
    });
  };

  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(prev => {
      const current = parseFloat(prev) || 0;
      return Math.max(0, current - 1).toString();
    });
  };

  const handleEncrypt = () => {
    console.log("Encrypting data:", publicVaultAmount);
    // Add encryption logic here
  };

  const handleDecrypt = () => {
    console.log("Decrypting data:", publicVaultAmount);
    // Add decryption logic here
  };

  const handleTransfer = () => {
    console.log("Transferring data:", publicVaultAmount);
    // Add transfer logic here
  };

  const handleBuy = () => {
    console.log("Buying with data:", publicVaultAmount);
    // Add buy logic here
  };

  const handlePrivateDecrypt = () => {
    console.log("Private decrypting data:", privateVaultAmount);
    // Add private decrypt logic here
  };

  const handlePrivateTransfer = () => {
    console.log("Private transferring data:", privateVaultAmount);
    // Add private transfer logic here
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 font-inter relative h-full flex-1">
      {/* Main Container */}
      {/* Header Section */}
      <div className=" p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/logo.png"
              alt="Peconomy"
              className="w-12 h-12 drop-shadow-lg"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent tracking-tight">Peconomy</h1>
          </div>

          <div className="text-right">
            {!authenticated ? (
              <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white">Conectar Wallet</button>
            ) : (
              <div className="flex flex-col items-end space-y-3">
                <p className="text-gray-700 font-medium text-sm bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                  Conectado como:
                  <br />
                  <span className="font-mono text-xs text-gray-600 break-all">{user?.wallet?.address}</span>
                </p>
                <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-3 px-6 rounded-xl cursor-pointer text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-white">Desconectar</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {error && (
          <div className="mb-8 p-4 bg-red-50 rounded-2xl border border-red-200 shadow-sm">
            <p className="text-red-800 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("private")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === "private" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}>
              🔑 Private Vault
            </button>
            <button
              onClick={() => setActiveTab("public")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === "public" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}>
              🌐 Public Vault
            </button>
          </div>
        </div>

        <div className="w-full flex">
          {/* Private Vault Section */}
          <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-3xl shadow-xl border border-blue-200 ${activeTab === "private" ? "block" : "hidden"}`}>
            <div className="flex items-center space-x-3 mb-3">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Private Vault</h2>
              <span className="text-xl">🔑</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Asset Display */}
              <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200 col-span-2">
                <h3 className="text-base font-semibold text-gray-800 mb-2 text-center tracking-tight">Available Assets</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: "/peconft.png", name: "pNFT", value: "100" },
                    { icon: "/nft2.png", name: "eNFT", value: "100" },
                    { icon: "/usdc.png", name: "eUSDC", value: "100" },
                    { icon: "/logo.png", name: "PECO", value: "100" },
                  ].map((asset, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                      <img
                        src={asset.icon}
                        alt={asset.name}
                        className="w-6 h-6"
                      />
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-800">{asset.name}</p>
                        {asset.value && <p className="text-xs text-gray-600">{asset.value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Swap Interface */}
              <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 mb-2 text-center tracking-tight">Swap Interface</h3>
                <div className="space-y-2">
                  <div className="bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/nft2.png"
                        alt="From"
                        className="w-8 h-8"
                      />
                      <input
                        type="text"
                        value={privateVaultAmount}
                        onChange={e => handleAmountChange(e, setPrivateVaultAmount)}
                        className="flex-1 px-2 py-1 text-black text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-blue-500 text-white p-1.5 rounded-full">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/logo.png"
                        alt="To"
                        className="w-8 h-8"
                      />
                      <input
                        type="text"
                        value={privateVaultAmount}
                        onChange={e => handleAmountChange(e, setPrivateVaultAmount)}
                        className="flex-1 px-2 py-1 text-black text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handlePrivateTransfer}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white text-sm tracking-wide">
                    Execute Swap
                  </button>
                </div>
              </div>

              {/* Operations */}
              <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 mb-2 text-center tracking-tight">Operations</h3>
                <div className="space-y-2">
                  <div className="flex gap-2 w-full">
                    <label className="text-xs font-semibold text-gray-700 my-auto">To</label>
                    <div className="flex items-center w-full">
                      <input
                        type="text"
                        value={privateVaultAmount}
                        onChange={e => handleAmountChange(e, setPrivateVaultAmount)}
                        className="py-1 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-black text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <label className="block text-xs font-semibold text-gray-700 my-auto">Amount</label>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleDecrement(setPrivateVaultAmount)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-lg transition-colors text-xs">
                        -
                      </button>
                      <input
                        type="text"
                        value={privateVaultAmount}
                        onChange={e => handleAmountChange(e, setPrivateVaultAmount)}
                        className="py-1 w-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-black text-sm"
                        placeholder="0"
                      />
                      <button
                        onClick={() => handleIncrement(setPrivateVaultAmount)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-lg transition-colors text-xs">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handlePrivateDecrypt}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white text-sm tracking-wide">
                      Decrypt
                    </button>
                    <button
                      onClick={handlePrivateTransfer}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white text-sm tracking-wide">
                      Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Public Vault Section */}
          <div className={`bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-3xl shadow-xl border border-green-200 ${activeTab === "public" ? "block" : "hidden"}`}>
            <div className="flex items-center space-x-3 mb-3">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Public Vault</h2>
              <span className="text-xl">🌐</span>
            </div>

            <div className="grid gap-4">
              {/* Asset Display */}
              <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 mb-2 text-center tracking-tight">Available Assets</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: "/nft2.png", name: "NFT", value: "100" },
                    { icon: "/usdc.png", name: "USDC", value: "100" },
                  ].map((asset, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                      <img
                        src={asset.icon}
                        alt={asset.name}
                        className="w-6 h-6"
                      />
                      <div className="text-center">
                        <p className="text-xs font-semibold text-gray-800">{asset.name}</p>
                        {asset.value && <p className="text-xs text-gray-600">{asset.value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operations */}
              <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 mb-2 text-center tracking-tight">Operations</h3>
                <div className="space-y-2">
                  <div className="flex gap-2 w-full">
                    <label className="text-xs font-semibold text-gray-700 my-auto">To</label>
                    <div className="flex items-center w-full">
                      <input
                        type="text"
                        value={publicVaultAmount}
                        onChange={e => handleAmountChange(e, setPublicVaultAmount)}
                        className="py-1 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-black text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <label className="block text-xs font-semibold text-gray-700 my-auto">Amount</label>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleDecrement(setPublicVaultAmount)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-lg transition-colors text-xs">
                        -
                      </button>
                      <input
                        type="text"
                        value={publicVaultAmount}
                        onChange={e => handleAmountChange(e, setPublicVaultAmount)}
                        className="py-1 border w-20 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-black text-sm"
                        placeholder="0"
                      />
                      <button
                        onClick={() => handleIncrement(setPublicVaultAmount)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-lg transition-colors text-xs">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleEncrypt}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white text-sm tracking-wide">
                      Encrypt
                    </button>
                    <button
                      onClick={handleTransfer}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white text-sm tracking-wide">
                      Transfer
                    </button>
                    <button
                      onClick={handleBuy}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white text-sm tracking-wide">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[300px] text-black">
            <div className="flex flex-col w-full space-y-4">
              <div className="grid w-[300px] rounded-xl bg-blue-200 p-4">
                <p className="text-lg font-bold">PRIVATE VAULT</p>
                <p>Your balance and transactions are totaly private 🔒</p>
                <p>Only you can see your balance and transactions.</p>
              </div>
              <div className="grid w-[300px] rounded-xl bg-green-200 p-4">
                <p className="text-lg font-bold">PUBLIC VAULT</p>
                <p>Your balance and transactions are public 🌐</p>
              </div>
            </div>

            <img
              src="/logo.png"
              alt="PECO"
              className="w-[250px] h-[250px] right-24 relative right-[100px] bottom-[-500px] scale-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
