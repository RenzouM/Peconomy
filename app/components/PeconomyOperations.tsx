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

  // Form states - single amount for each section
  const [privateVaultAmount, setPrivateVaultAmount] = useState<string>("");
  const [publicVaultAmount, setPublicVaultAmount] = useState<string>("");

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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Peconomy</h1>
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

        <div className="space-x-8 flex justify-evenly">
          {/* Private Vault Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-3xl shadow-xl border border-blue-200">
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Private Vault</h2>
              <span className="text-2xl">🔑</span>
            </div>

            <div className="grid grid-cols-2  gap-6">
              {/* Asset Display */}
              <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200 col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Available Assets</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: "/nft2.png", name: "eNFT", value: "1" },
                    { icon: "/nft1.png", name: "eNFT", value: "100" },
                    { icon: "/nft.png", name: "eNFT", value: "1000" },
                    { icon: "/usdc.png", name: "eUSDC", value: "1" },
                    { icon: "/logo.png", name: "PECO", value: "1" },
                  ].map((asset, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                      <img
                        src={asset.icon}
                        alt={asset.name}
                        className="w-8 h-8"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{asset.name}</p>
                        {asset.value && <p className="text-sm text-gray-600">{asset.value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Swap Interface */}
              <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Swap Interface</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/nft2.png"
                        alt="From"
                        className="w-10 h-10"
                      />
                      <input
                        type="text"
                        value={privateVaultAmount}
                        onChange={e => handleAmountChange(e, setPrivateVaultAmount)}
                        className="flex-1 px-3 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <svg
                        className="w-4 h-4"
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

                  <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/logo.png"
                        alt="To"
                        className="w-10 h-10"
                      />
                      <input
                        type="text"
                        value={privateVaultAmount}
                        onChange={e => handleAmountChange(e, setPrivateVaultAmount)}
                        className="flex-1 px-3 py-2 text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handlePrivateTransfer}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white">
                    Execute Swap
                  </button>
                </div>
              </div>

              {/* Operations */}
              <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Operations</h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">Amount</label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDecrement(setPrivateVaultAmount)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors">
                        -
                      </button>
                      <input
                        type="text"
                        value={privateVaultAmount}
                        onChange={e => handleAmountChange(e, setPrivateVaultAmount)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                        placeholder="0"
                      />
                      <button
                        onClick={() => handleIncrement(setPrivateVaultAmount)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handlePrivateDecrypt}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white">
                      Decrypt
                    </button>
                    <button
                      onClick={handlePrivateTransfer}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white">
                      Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Public Vault Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-3xl shadow-xl border border-green-200">
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Public Vault</h2>
              <span className="text-2xl">🌐</span>
            </div>

            <div className="grid gap-6">
              {/* Asset Display */}
              <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Available Assets</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "/nft2.png", name: "NFT", value: "1" },
                    { icon: "/nft1.png", name: "NFT", value: "100" },
                    { icon: "/nft.png", name: "NFT", value: "1000" },
                    { icon: "/usdc.png", name: "USDC", value: "" },
                  ].map((asset, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                      <img
                        src={asset.icon}
                        alt={asset.name}
                        className="w-8 h-8"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{asset.name}</p>
                        {asset.value && <p className="text-sm text-gray-600">{asset.value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operations */}
              <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Operations</h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">Amount</label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDecrement(setPublicVaultAmount)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors">
                        -
                      </button>
                      <input
                        type="text"
                        value={publicVaultAmount}
                        onChange={e => handleAmountChange(e, setPublicVaultAmount)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                        placeholder="0"
                      />
                      <button
                        onClick={() => handleIncrement(setPublicVaultAmount)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg transition-colors">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={handleEncrypt}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white">
                      Encrypt
                    </button>
                    <button
                      onClick={handleTransfer}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white">
                      Transfer
                    </button>
                    <button
                      onClick={handleBuy}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
