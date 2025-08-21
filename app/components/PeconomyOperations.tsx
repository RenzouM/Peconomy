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
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex items-center justify-center">
      {/* Screen Container */}
      <div className="w-full h-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <main className="flex flex-col h-full space-y-4">
            <div className="flex justify-between items-start mb-8">
              <img
                src="/logo.png"
                alt="Peconomy"
                className="w-16 h-16"
              />
              <h1 className="text-5xl my-auto me-auto ms-2 font-bold text-red-600 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text">Peconomy</h1>

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
                    <p className="text-gray-700 font-medium text-sm mb-2">
                      Conectado como:<br></br> {user?.wallet?.address}
                    </p>
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

            {/* Form Section - Private Vault */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-3xl shadow-2xl border border-gray-200">
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 w-full">Private Vault 🔑</h2>
              <div className="flex justify-evenly">
                <div className="grid grid-cols-3 w-1/2 gap-2 p-4 justify-center items-center">
                  <div className="flex gap-2 items-center text-black font-bold text-2xl border border-gray-300 p-2 rounded-xl bg-gray-100">
                    <img
                      src="/nft2.png"
                      alt="eNFT 1"
                      className="w-14 h-14"
                    />{" "}
                    <p>eNFT</p>
                  </div>{" "}
                  <div className="flex gap-2 items-center text-black font-bold text-2xl border border-gray-300 p-2 rounded-xl bg-gray-100">
                    <img
                      src="/nft1.png"
                      alt="eNFT 100"
                      className="w-14 h-14"
                    />{" "}
                    <p>eNFT</p>
                  </div>{" "}
                  <div className="flex gap-2 items-center text-black font-bold text-2xl border border-gray-300 p-2 rounded-xl bg-gray-100">
                    <img
                      src="/nft.png"
                      alt="eNFT 1000"
                      className="w-14 h-14"
                    />{" "}
                    <p>eNFT</p>
                  </div>{" "}
                  <div className="flex gap-2 items-center text-black font-bold text-2xl border border-gray-300 p-2 rounded-xl bg-gray-100">
                    <img
                      src="/usdc.png"
                      alt="eUSDC"
                      className="w-14 h-14"
                    />{" "}
                    <p>eUSDC</p>
                  </div>{" "}
                  <div className="flex gap-2 items-center text-black font-bold text-2xl border border-gray-300 p-2 rounded-xl bg-gray-100">
                    <img
                      src="/logo.png"
                      alt="Peconomy"
                      className="w-14 h-14"
                    />{" "}
                    <p>PECO</p>
                  </div>
                </div>
                <div className="grid ">
                  <div className="flex mb-6 gap-2">
                    <div className="w-full">
                      <label className="block text-sm font-semibold text-gray-800 mb-2 text-center">To</label>
                      <div className="flex items-center justify-center space-x-2">
                        <input
                          type="text"
                          value={publicVaultAmount}
                          onChange={e => handleAmountChange(e, setPublicVaultAmount)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base bg-white text-black hover:border-gray-300 cursor-text text-center"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="w-52">
                      <label className="block text-sm font-semibold text-gray-800 mb-2 text-center">Units</label>
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleDecrement(setPublicVaultAmount)}
                          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                          -
                        </button>
                        <input
                          type="text"
                          value={publicVaultAmount}
                          onChange={e => handleAmountChange(e, setPublicVaultAmount)}
                          className="w-[100px] px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base bg-white text-black hover:border-gray-300 cursor-text text-center"
                          placeholder="0"
                        />
                        <button
                          onClick={() => handleIncrement(setPublicVaultAmount)}
                          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <button
                      onClick={handlePrivateDecrypt}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-base">
                      Decrypt
                    </button>
                    <button
                      onClick={handlePrivateTransfer}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-base">
                      Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section - Public Vault */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-3xl shadow-2xl border border-gray-200">
              <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Public Vault 🌐</h2>
              <div className="flex justify-evenly">
                <div className="grid grid-cols-3 w-1/2 gap-2 p-4 justify-center items-center">
                  <div className="flex gap-2 items-center text-black font-bold text-2xl border border-gray-300 p-2 rounded-xl bg-gray-100">
                    <img
                      src="/nft2.png"
                      alt="NFT 1"
                      className="w-14 h-14"
                    />{" "}
                    <p>NFT</p>
                  </div>{" "}
                  <div className="flex gap-2 items-center text-black font-bold text-2xl border border-gray-300 p-2 rounded-xl bg-gray-100">
                    <img
                      src="/nft1.png"
                      alt="NFT 100"
                      className="w-14 h-14"
                    />{" "}
                    <p>NFT</p>
                  </div>{" "}
                  <div className="flex gap-2 items-center text-black font-bold text-2xl border border-gray-300 p-2 rounded-xl bg-gray-100">
                    <img
                      src="/nft.png"
                      alt="NFT 1000"
                      className="w-14 h-14"
                    />{" "}
                    <p>NFT</p>
                  </div>{" "}
                  <div className="flex gap-2 items-center text-black font-bold text-2xl border border-gray-300 p-2 rounded-xl bg-gray-100">
                    <img
                      src="/usdc.png"
                      alt="USDC"
                      className="w-14 h-14"
                    />{" "}
                    <p>USDC</p>
                  </div>{" "}
                </div>
                <div className="grid">
                  <div className="flex mb-6 gap-2">
                    <div className="w-full">
                      <label className="block text-sm font-semibold text-gray-800 mb-2 text-center">To</label>
                      <div className="flex items-center justify-center space-x-2">
                        <input
                          type="text"
                          value={publicVaultAmount}
                          onChange={e => handleAmountChange(e, setPublicVaultAmount)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base bg-white text-black hover:border-gray-300 cursor-text text-center"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="w-52">
                      <label className="block text-sm font-semibold text-gray-800 mb-2 text-center">Units</label>
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleDecrement(setPublicVaultAmount)}
                          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                          -
                        </button>
                        <input
                          type="text"
                          value={publicVaultAmount}
                          onChange={e => handleAmountChange(e, setPublicVaultAmount)}
                          className="w-[100px] px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base bg-white text-black hover:border-gray-300 cursor-text text-center"
                          placeholder="0"
                        />
                        <button
                          onClick={() => handleIncrement(setPublicVaultAmount)}
                          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <button
                      onClick={handleEncrypt}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-base">
                      Encrypt
                    </button>
                    <button
                      onClick={handleTransfer}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-base">
                      Transfer
                    </button>
                    <button
                      onClick={handleBuy}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-base">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
