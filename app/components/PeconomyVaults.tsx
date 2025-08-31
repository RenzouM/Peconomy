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
  const [activeTab, setActiveTab] = useState<"private" | "public" | "defi" | "metrics" | "dashboard">("private");

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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 font-inter relative h-full p-4 gap-4 flex flex-col">
      {/* Main Container */}
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-4">
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

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("private")}
          className={`px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-200 flex ${activeTab === "private" ? "bg-white text-red-400 shadow-sm" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="-6 -2 24 24"
            fill="#000000">
            <path
              fill={activeTab === "public" ? "gray" : "red"}
              d="M6 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM2 9.528V4a4 4 0 1 1 8 0v5.528a6 6 0 1 1-8 0zM4 8.34A5.99 5.99 0 0 1 6 8c.701 0 1.374.12 2 .341V4a2 2 0 1 0-4 0v4.341zM6 16a2 2 0 1 1 0-4a2 2 0 0 1 0 4z"></path>
          </svg>
          <span>Private Vault</span>
        </button>
        <button
          onClick={() => setActiveTab("public")}
          className={`px-6 py-3 flex items-center rounded-lg font-semibold transition-all duration-200 cursor-pointer ${activeTab === "public" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="-6 -2 24 24"
            fill="#000000">
            <path
              stroke={activeTab === "public" ? "blue" : "gray"}
              fill={activeTab === "public" ? "blue" : "gray"}
              stroke-width="0"
              d="M6 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM2 9.528V4a4 4 0 1 1 8 0v1a1 1 0 1 1-2 0V4a2 2 0 1 0-4 0v4.341a6 6 0 1 1-2 1.186zM6 16a2 2 0 1 1 0-4a2 2 0 0 1 0 4z"></path>
          </svg>
          <span>Public Vault</span>
        </button>{" "}
        <button
          onClick={() => setActiveTab("defi")}
          className={`px-6 py-3 flex items-center rounded-lg font-semibold transition-all duration-200 cursor-pointer ${activeTab === "defi" ? "bg-white text-purple-600 shadow-sm" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}>
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
          <span className="ms-1">DeFi</span>
        </button>
        <button
          onClick={() => setActiveTab("metrics")}
          className={`px-6 py-3 flex items-center rounded-lg font-semibold transition-all duration-200 cursor-pointer ${activeTab === "metrics" ? "bg-white text-orange-600 shadow-sm" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}>
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
          <span className="ms-1">Metrics</span>
        </button>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-6 py-3 flex items-center rounded-lg font-semibold transition-all duration-200 cursor-pointer ${activeTab === "dashboard" ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="#000000">
            <path
              fill="none"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2 5a2 2 0 0 1 2-2h6v18H4a2 2 0 0 1-2-2V5Zm12-2h6a2 2 0 0 1 2 2v5h-8V3Zm0 11h8v5a2 2 0 0 1-2 2h-6v-7Z"></path>
          </svg>
          <span className="ms-1">Dashboard</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex gap-4">
        {error && (
          <div className="mb-8 p-4 bg-red-50 rounded-2xl border border-red-200 shadow-sm">
            <p className="text-red-800 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="w-full h-full">
          {/* Private Vault Section */}
          <div className={`bg-gradient-to-br from-red-50/5 to-red-100/5 p-4 rounded-3xl shadow-xl border border-red-50/5 ${activeTab === "private" ? "block" : "hidden"}`}>
            <div className="flex items-center space-x-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="-6 -2 24 24"
                fill="#000000">
                <path
                  fill={activeTab === "public" ? "gray" : "red"}
                  d="M6 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM2 9.528V4a4 4 0 1 1 8 0v5.528a6 6 0 1 1-8 0zM4 8.34A5.99 5.99 0 0 1 6 8c.701 0 1.374.12 2 .341V4a2 2 0 1 0-4 0v4.341zM6 16a2 2 0 1 1 0-4a2 2 0 0 1 0 4z"></path>
              </svg>
              <h2 className="text-2xl font-semibold text-red-400 tracking-tight">Private Vault</h2>
            </div>

            <div className="grid gap-4">
              {/* Asset Display */}
              <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 mb-2 text-center tracking-tight">Available Assets</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: "/usdc.png", name: "eUSDC", value: "100" },
                    { icon: "/peconft.png", name: "pNFT", value: "100" },
                    { icon: "/logo1.png", name: "ePECO", value: "100" },
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
          <div className={`bg-gradient-to-br from-blue-50/5 to-blue-100/5 p-4 rounded-3xl shadow-xl border border-blue-50/5 ${activeTab === "public" ? "block" : "hidden"}`}>
            <div className="flex items-center space-x-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="-6 -2 24 24"
                fill="#000000">
                <path
                  stroke={activeTab === "public" ? "blue" : "gray"}
                  fill={activeTab === "public" ? "blue" : "gray"}
                  stroke-width="0"
                  d="M6 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM2 9.528V4a4 4 0 1 1 8 0v1a1 1 0 1 1-2 0V4a2 2 0 1 0-4 0v4.341a6 6 0 1 1-2 1.186zM6 16a2 2 0 1 1 0-4a2 2 0 0 1 0 4z"></path>
              </svg>
              <h2 className="text-2xl font-semibold text-blue-500 tracking-tight">Public Vault</h2>
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
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white text-sm tracking-wide">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start w-full gap-4 text-black">
          {activeTab === "private" ? (
            <div className="grid rounded-xl bg-red-200 p-4">
              <p className="text-lg font-bold">PRIVATE VAULT</p>
              <p>Your balance and transactions are totaly private 🔒</p>
              <p>Only you can see your balance and transactions.</p>
            </div>
          ) : (
            <div className="grid rounded-xl bg-blue-200 p-4">
              <p className="text-lg font-bold">PUBLIC VAULT</p>
              <p>Your balance and transactions are public 🌐</p>
            </div>
          )}
          <div className="flex flex-col justify-center max-w-52 text-center bg-black/20 p-2 rounded-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="full"
              height="full"
              viewBox="0 0 256 256"
              fill="none">
              <rect
                width="256"
                height="256"
                rx="128"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M87.6477 203.403C66.6922 203.403 47.0213 198.931 30 191.095L99.2514 127.885C89.6861 120.038 83.5836 108.126 83.5836 94.7884C83.5836 81.2079 89.9104 69.1052 99.7773 61.2668V52.0015H126.08C126.177 52.0008 126.274 52.0005 126.372 52.0005C137.068 52.0005 146.848 55.9254 154.349 62.4136C161.85 55.926 171.629 52.0015 182.325 52.0015H182.389L182.39 52L182.392 52.0015H208.919V61.2679C218.786 69.1062 225.113 81.209 225.113 94.7894C225.113 111.867 215.108 126.608 200.64 133.47C195.467 148.743 185.737 162.479 172.714 173.652V193.398H139.977C124.227 199.801 106.455 203.403 87.6477 203.403ZM126.371 127.703C134.16 127.703 141.317 124.998 146.954 120.475L154.282 136.976L161.645 120.397C167.296 124.967 174.491 127.703 182.325 127.703C200.502 127.703 215.238 112.967 215.238 94.7895C215.238 76.6117 200.502 61.8757 182.325 61.8757C170.513 61.8757 160.155 68.0975 154.348 77.4425C148.541 68.0975 138.183 61.8757 126.371 61.8757C108.193 61.8757 93.4575 76.6117 93.4575 94.7895C93.4575 112.967 108.193 127.703 126.371 127.703ZM126.371 117.829C139.096 117.829 149.411 107.514 149.411 94.7893C149.411 82.0648 139.096 71.7496 126.371 71.7496C113.647 71.7496 103.331 82.0648 103.331 94.7893C103.331 107.514 113.647 117.829 126.371 117.829ZM126.371 107.955C133.642 107.955 139.537 102.06 139.537 94.7893C139.537 87.5182 133.642 81.6238 126.371 81.6238C119.1 81.6238 113.206 87.5182 113.206 94.7893C113.206 102.06 119.1 107.955 126.371 107.955ZM205.364 94.7893C205.364 107.514 195.049 117.829 182.324 117.829C169.6 117.829 159.285 107.514 159.285 94.7893C159.285 82.0648 169.6 71.7496 182.324 71.7496C195.049 71.7496 205.364 82.0648 205.364 94.7893ZM195.49 94.7893C195.49 102.06 189.596 107.955 182.324 107.955C175.053 107.955 169.159 102.06 169.159 94.7893C169.159 87.5182 175.053 81.6238 182.324 81.6238C189.596 81.6238 195.49 87.5182 195.49 94.7893Z"
                fill="white"
              />
            </svg>
            <p className="text-gray-50 font-thin">We higly recommend using CORE WALLET</p>
          </div>
        </div>
      </div>

      <img
        src="/logo.png"
        alt="PECO"
        className="absolute w-[550px] h-[550px] right-24  right-[-50px] bottom-[-120px]"
      />
    </div>
  );
}
