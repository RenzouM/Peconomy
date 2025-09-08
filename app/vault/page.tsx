"use client";

import { usePrivy, useWallets, useSignMessage } from "@privy-io/react-auth";
import { useState } from "react";
import Image from "next/image";
import { deposit } from "../utils/06_deposit";
import { avalancheFuji } from "viem/chains";
import { createWalletClient, custom, type Hex, type WalletClient } from "viem";
import { checkBalance } from "../utils/08_check_balance";
import { transfer } from "../utils/07_transfer";
import { withdraw } from "../utils/09_withdraw";
import { register } from "../utils/03_register-user";
import Link from "next/link";
import { faucet } from "../utils/05_get_faucet";

export default function PeconomyVaults() {
  const { login, logout, authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const { signMessage } = useSignMessage();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");

  // Form states - single amount for each section
  const [amount, setAmount] = useState<string>("");
  const [publicVaultAmount, setPublicVaultAmount] = useState<string>("");

  // Tab state
  const [activeTab, setActiveTab] = useState<"private" | "public" | "defi" | "metrics" | "dashboard">("private");
  const [vaultActiveTabAction, setVaultActiveTabAction] = useState<"swap" | "decrypt" | "transfer" | "encrypt" | "buy">("decrypt");

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

  const handleFaucet = async () => {
    if (!authenticated || !wallets) {
      setError("Please connect your wallet first");
      return;
    }
    const userAddress = wallets[0].address;
    const walletClient = await getWalletClient();
    await faucet(userAddress as `0x${string}`, walletClient as WalletClient);
  };

  const handleRegister = async () => {
    if (!authenticated || !wallets) {
      setError("Please connect your wallet first");
      return;
    }
    const { signature } = await signMessage(
      {
        message: `eERC
Registering user with
 Address:${wallets[0].address.toLowerCase()}`,
      },
      {
        address: wallets[0].address, // Optional: Specify the wallet to use for signing. If not provided, the first wallet will be used.
      }
    );

    try {
      setError("");
      setIsLoading(true);
      console.log("Starting withdraw process...");

      const userAddress = wallets[0].address;
      const walletClient = await getWalletClient();

      // Call the deposit function from 06_deposit.ts
      await register(signature, userAddress, walletClient as WalletClient);

      console.log("User registered successfully!");
      // You might want to refresh the balance or show a success message here
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error instanceof Error ? error.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivateTransfer = async () => {
    if (!authenticated || !wallets) {
      setError("Please connect your wallet first");
      return;
    }
    const { signature } = await signMessage(
      {
        message: `eERC
Registering user with
 Address:${wallets[0].address.toLowerCase()}`,
      },
      {
        address: wallets[0].address, // Optional: Specify the wallet to use for signing. If not provided, the first wallet will be used.
      }
    );

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount to deposit");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      console.log("Starting transfer process...");

      const userAddress = wallets[0].address;
      const walletClient = await getWalletClient();

      const receiverAddress = "0x8e444972A854260e3b37032bEE47945f646B96Aa";

      // Call the deposit function from 06_deposit.ts
      await transfer(userAddress as `0x${string}`, receiverAddress, parseFloat(amount), walletClient as WalletClient, signature);

      console.log("Transfer completed successfully!");
      // You might want to refresh the balance or show a success message here
    } catch (error) {
      console.error("Transfer failed:", error);
      setError(error instanceof Error ? error.message : "Transfer failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrypt = async () => {
    if (!authenticated || !wallets) {
      setError("Please connect your wallet first");
      return;
    }
    const { signature } = await signMessage(
      {
        message: `eERC
Registering user with
 Address:${wallets[0].address.toLowerCase()}`,
      },
      {
        address: wallets[0].address, // Optional: Specify the wallet to use for signing. If not provided, the first wallet will be used.
      }
    );

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount to withdraw");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      console.log("Starting withdraw process...");

      const userAddress = wallets[0].address;
      const walletClient = await getWalletClient();

      // Call the deposit function from 06_deposit.ts
      await withdraw(amount, signature, userAddress, walletClient as WalletClient);

      console.log("Withdraw completed successfully!");
      // You might want to refresh the balance or show a success message here
    } catch (error) {
      console.error("Withdraw failed:", error);
      setError(error instanceof Error ? error.message : "Withdraw failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEncrypt = async () => {
    if (!authenticated || !wallets) {
      setError("Please connect your wallet first");
      return;
    }
    const { signature } = await signMessage(
      {
        message: `eERC
Registering user with
 Address:${wallets[0].address.toLowerCase()}`,
      },
      {
        address: wallets[0].address, // Optional: Specify the wallet to use for signing. If not provided, the first wallet will be used.
      }
    );

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount to deposit");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      console.log("Starting deposit process...");

      const userAddress = wallets[0].address;
      const walletClient = await getWalletClient();

      // Call the deposit function from 06_deposit.ts
      await deposit(amount, signature, userAddress, walletClient as WalletClient);

      console.log("Deposit completed successfully!");
      // You might want to refresh the balance or show a success message here
    } catch (error) {
      console.error("Deposit failed:", error);
      setError(error instanceof Error ? error.message : "Deposit failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCheckEncryptedBalance = async () => {
    if (!authenticated || !wallets) {
      setError("Please connect your wallet first");
      return;
    }
    try {
      const { signature } = await signMessage(
        {
          message: `eERC
Registering user with
 Address:${wallets[0].address.toLowerCase()}`,
        },
        {
          address: wallets[0].address, // Optional: Specify the wallet to use for signing. If not provided, the first wallet will be used.
        }
      );
      const userAddress = wallets[0].address;
      await checkBalance(userAddress, signature);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Check balance failed. Please try again.");
    } finally {
    }
  };

  const handleDisconnect = async () => {
    await logout();
  };

  const getWalletClient = async () => {
    if (wallets.length > 0 && authenticated) {
      try {
        const wallet = wallets[0];
        await wallet.switchChain(avalancheFuji.id);
        const provider = await wallet.getEthereumProvider();

        const walletClient = createWalletClient({
          account: wallet.address as Hex,
          chain: avalancheFuji,
          transport: custom(provider),
        });
        return walletClient;
      } catch (err) {
        console.error("Error initializing wallet:", err);
        setError(err instanceof Error ? err.message : "Error initializing wallet");
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-8">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 font-inter relative h-full p-4 gap-4 flex flex-col">
        {/* Main Container */}
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center cursor-pointer w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md"
                title="Go back">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <Link
                href="/"
                className="flex items-center space-x-4">
                <Image
                  src="/logo.png"
                  alt="Peconomy"
                  width={48}
                  height={48}
                  className="drop-shadow-lg"
                />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent tracking-tight">Peconomy</h1>
              </Link>
            </div>

            <div className="text-right">
              {!authenticated ? (
                <button
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white"
                  onClick={() => login()}>
                  Connect Wallet
                </button>
              ) : (
                <div className="flex  items-end space-y-3">
                  <p className="text-gray-700 text-left my-auto absolute right-38 top-3  font-medium text-sm bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                    <span className="font-bold">Connected address:</span>
                    <br />
                    <span className="font-mono text-xs text-gray-600">{user?.wallet?.address}</span>
                  </p>
                  <button
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white"
                    onClick={handleDisconnect}>
                    Disconnect
                  </button>
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
                strokeWidth="0"
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2 5a2 2 0 0 1 2-2h6v18H4a2 2 0 0 1-2-2V5Zm12-2h6a2 2 0 0 1 2 2v5h-8V3Zm0 11h8v5a2 2 0 0 1-2 2h-6v-7Z"></path>
            </svg>
            <span className="ms-1">Dashboard</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 gap-4">
          {error && (
            <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border-l-4 border-red-500 shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-1">Error</h3>
                  <p className="text-red-700 text-sm leading-relaxed">{error}</p>
                </div>
                <button
                  onClick={() => setError("")}
                  className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="w-full h-full">
            {/* Private Vault Section */}
            <div className={`bg-gradient-to-br h-full grid from-red-50/5 to-red-100/5 p-4 rounded-3xl shadow-sm border border-red-50/5 ${activeTab === "private" ? "block" : "hidden"}`}>
              <div className="flex self-start items-center space-x-2 mb-3">
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
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-800 mb-2 text-center tracking-tight">Available Assets</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: "/logo.png", name: "PECO", value: "100" },
                      { icon: "/peconft.png", name: "pNFT", value: "100" },
                      { icon: "/logo1.png", name: "ePECO", value: "100" },
                    ].map((asset, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                        <Image
                          src={asset.icon}
                          alt={asset.name}
                          width={24}
                          height={24}
                        />
                        <div className="text-center">
                          <p className="text-xs font-semibold text-gray-800">{asset.name}</p>
                          {asset.value && <p className="text-xs text-gray-600">{asset.value}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabs */}
                {/* <h2 className="text-2xl font-semibold text-gray-500 tracking-tight mt-4">Operations</h2> */}
                <div className="grid">
                  <div className="flex space-x-1 bg-gray-100 ms-4 z-50 ">
                    <button
                      onClick={() => setVaultActiveTabAction("decrypt")}
                      className={`px-6 py-3 rounded-t-lg border border-b-0 border-gray-50 cursor-pointer font-semibold transition-all duration-200 flex ${vaultActiveTabAction === "decrypt" ? "bg-white text-gray-600 border-gray-200 -mb-px " : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"}`}>
                      <span>Decrypt</span>
                    </button>{" "}
                    <button
                      onClick={() => setVaultActiveTabAction("swap")}
                      className={`px-6 py-3 rounded-t-lg border border-b-0 border-gray-50 cursor-pointer font-semibold transition-all duration-200 flex ${vaultActiveTabAction === "swap" ? "bg-white text-gray-600 -mb-px border-gray-200" : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"}`}>
                      <span>Swap</span>
                    </button>{" "}
                    <button
                      onClick={() => setVaultActiveTabAction("transfer")}
                      className={`px-6 py-3 rounded-t-lg border border-b-0 border-gray-50 cursor-pointer font-semibold transition-all duration-200 flex ${vaultActiveTabAction === "transfer" ? "bg-white text-gray-600 border-gray-200 -mb-px " : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"}`}>
                      <span>Transfer</span>
                    </button>{" "}
                    <button
                      onClick={() => setVaultActiveTabAction("buy")}
                      className={`px-6 py-3 rounded-t-lg border border-b-0 border-gray-50 cursor-pointer font-semibold transition-all duration-200 flex ${vaultActiveTabAction === "buy" ? "bg-white text-gray-600 -mb-px border-gray-200 " : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"}`}>
                      <span>Buy</span>
                    </button>
                  </div>
                  {/* Swap Interface */}
                  {vaultActiveTabAction == "swap" && (
                    <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
                      <h3 className="text-base font-semibold text-gray-800 mb-2 text-center tracking-tight">Swap Interface</h3>
                      <div className="space-y-2">
                        <div className="bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                          <div className="flex items-center space-x-2">
                            <Image
                              src="/logo1.png"
                              alt="From"
                              width={32}
                              height={32}
                            />
                            <input
                              type="text"
                              value={amount}
                              onChange={e => handleAmountChange(e, setAmount)}
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
                            <Image
                              src="/logo.png"
                              alt="To"
                              width={32}
                              height={32}
                            />
                            <input
                              type="text"
                              value={amount}
                              onChange={e => handleAmountChange(e, setAmount)}
                              className="flex-1 px-2 py-1 text-black text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                        </div>
                        <button
                          onClick={handlePrivateTransfer}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white text-sm tracking-wide">
                          Execute Swap
                        </button>{" "}
                      </div>
                    </div>
                  )}
                  {/* Operations */}
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200">
                    <div className="space-y-2">
                      <div className="flex  p-4 gap-4">
                        <div className="flex gap-2 w-full">
                          <label className="text-xs font-semibold text-gray-700 my-auto">To</label>
                          <div className="flex items-center w-full">
                            <input
                              type="text"
                              value={address}
                              placeholder="0x..."
                              onChange={e => handleAmountChange(e, setAddress)}
                              className="py-1 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-black text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center">
                          <label className="block text-xs font-semibold text-gray-700 my-auto">Amount</label>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleDecrement(setAmount)}
                              className="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-lg transition-colors text-xs">
                              -
                            </button>
                            <input
                              type="text"
                              value={amount}
                              onChange={e => handleAmountChange(e, setAmount)}
                              className="py-1 w-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-black text-sm"
                              placeholder="0"
                            />
                            <button
                              onClick={() => handleIncrement(setAmount)}
                              className="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white font-bold py-1 px-2 rounded-lg transition-colors text-xs">
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={handleRegister}
                          disabled={isLoading}
                          className={`w-full cursor-pointer font-bold py-2 px-4 rounded-xl transition-all duration-300 transform shadow-lg text-white text-sm tracking-wide ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-xl"}`}>
                          {isLoading ? "Registering..." : "Register"}
                        </button>{" "}
                        <button
                          onClick={handleEncrypt}
                          disabled={isLoading}
                          className={`w-full cursor-pointer font-bold py-2 px-4 rounded-xl transition-all duration-300 transform shadow-lg text-white text-sm tracking-wide ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-xl"}`}>
                          {isLoading ? "Depositing..." : "Deposit"}
                        </button>{" "}
                        <button
                          onClick={handleCheckEncryptedBalance}
                          disabled={isLoading}
                          className={`w-full cursor-pointer font-bold py-2 px-4 rounded-xl transition-all duration-300 transform shadow-lg text-white text-sm tracking-wide ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-xl"}`}>
                          {isLoading ? "Checking balance..." : "Check balance"}
                        </button>
                        <button
                          onClick={handlePrivateTransfer}
                          disabled={isLoading}
                          className={`w-full cursor-pointer font-bold py-2 px-4 rounded-xl transition-all duration-300 transform shadow-lg text-white text-sm tracking-wide ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-xl"}`}>
                          {isLoading ? "Transferring..." : "Transfer"}
                        </button>
                        <button
                          onClick={handleDecrypt}
                          disabled={isLoading}
                          className={`w-full cursor-pointer font-bold py-2 px-4 rounded-xl transition-all duration-300 transform shadow-lg text-white text-sm tracking-wide ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-xl"}`}>
                          {isLoading ? "Withdrawing..." : "Withdraw"}
                        </button>
                        <button
                          onClick={handleFaucet}
                          disabled={isLoading}
                          className={`w-full cursor-pointer font-bold py-2 px-4 rounded-xl transition-all duration-300 transform shadow-lg text-white text-sm tracking-wide ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-xl"}`}>
                          {isLoading ? "Faucet..." : "Faucet"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Public Vault Section */}
            <div className={`bg-gradient-to-br grid h-full  from-blue-50/5 to-blue-100/5 p-4 rounded-3xl shadow-sm border border-blue-50/5 ${activeTab === "public" ? "block" : "hidden"}`}>
              <div className="flex self-start items-center space-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="-6 -2 24 24"
                  fill="#000000">
                  <path
                    stroke={activeTab === "public" ? "blue" : "gray"}
                    fill={activeTab === "public" ? "blue" : "gray"}
                    strokeWidth="0"
                    d="M6 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM2 9.528V4a4 4 0 1 1 8 0v1a1 1 0 1 1-2 0V4a2 2 0 1 0-4 0v4.341a6 6 0 1 1-2 1.186zM6 16a2 2 0 1 1 0-4a2 2 0 0 1 0 4z"></path>
                </svg>
                <h2 className="text-2xl font-semibold text-blue-500 tracking-tight">Public Vault</h2>
              </div>

              <div className="grid h-full gap-4">
                {/* Asset Display */}
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-base font-semibold text-gray-800 mb-2 text-center tracking-tight">Available Assets</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ icon: "/usdc.png", name: "USDC", value: "100" }].map((asset, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                        <Image
                          src={asset.icon}
                          alt={asset.name}
                          width={24}
                          height={24}
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
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200">
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
                        onClick={handlePrivateTransfer}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white text-sm tracking-wide">
                        Transfer
                      </button>
                      <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white text-sm tracking-wide">Buy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid w-full gap-4 text-black self-start">
            {activeTab === "private" ? (
              <div className="flex bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-800 mb-2">PRIVATE VAULT</h3>
                    <div className="space-y-2 text-red-700 text-sm">
                      <p className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span>Your balance and transactions are totally private 🔒</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span>Only you can see your balance and transactions</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-blue-800 mb-2">PUBLIC VAULT</h3>
                    <div className="space-y-2 text-blue-700 text-sm">
                      <p className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Your balance and transactions are public 🌐</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Transparent and verifiable on the blockchain</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex w-full gap-4 max-w-68 text-center bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl shadow-xl border border-gray-200">
              <div className="w-44 h-auto rounded-full m-auto">
                <svg
                  viewBox="0 0 256 256"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M87.6477 203.403C66.6922 203.403 47.0213 198.931 30 191.095L99.2514 127.885C89.6861 120.038 83.5836 108.126 83.5836 94.7884C83.5836 81.2079 89.9104 69.1052 99.7773 61.2668V52.0015H126.08C126.177 52.0008 126.274 52.0005 126.372 52.0005C137.068 52.0005 146.848 55.9254 154.349 62.4136C161.85 55.926 171.629 52.0015 182.325 52.0015H182.389L182.39 52L182.392 52.0015H208.919V61.2679C218.786 69.1062 225.113 81.209 225.113 94.7894C225.113 111.867 215.108 126.608 200.64 133.47C195.467 148.743 185.737 162.479 172.714 173.652V193.398H139.977C124.227 199.801 106.455 203.403 87.6477 203.403ZM126.371 127.703C134.16 127.703 141.317 124.998 146.954 120.475L154.282 136.976L161.645 120.397C167.296 124.967 174.491 127.703 182.325 127.703C200.502 127.703 215.238 112.967 215.238 94.7895C215.238 76.6117 200.502 61.8757 182.325 61.8757C170.513 61.8757 160.155 68.0975 154.348 77.4425C148.541 68.0975 138.183 61.8757 126.371 61.8757C108.193 61.8757 93.4575 76.6117 93.4575 94.7895C93.4575 112.967 108.193 127.703 126.371 127.703ZM126.371 117.829C139.096 117.829 149.411 107.514 149.411 94.7893C149.411 82.0648 139.096 71.7496 126.371 71.7496C113.647 71.7496 103.331 82.0648 103.331 94.7893C103.331 107.514 113.647 117.829 126.371 117.829ZM126.371 107.955C133.642 107.955 139.537 102.06 139.537 94.7893C139.537 87.5182 133.642 81.6238 126.371 81.6238C119.1 81.6238 113.206 87.5182 113.206 94.7893C113.206 102.06 119.1 107.955 126.371 107.955ZM205.364 94.7893C205.364 107.514 195.049 117.829 182.324 117.829C169.6 117.829 159.285 107.514 159.285 94.7893C159.285 82.0648 169.6 71.7496 182.324 71.7496C195.049 71.7496 205.364 82.0648 205.364 94.7893ZM195.49 94.7893C195.49 102.06 189.596 107.955 182.324 107.955C175.053 107.955 169.159 102.06 169.159 94.7893C169.159 87.5182 175.053 81.6238 182.324 81.6238C189.596 81.6238 195.49 87.5182 195.49 94.7893Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-2 my-auto z-50">
                <h4 className="font-semibold text-sm">Recommended Wallet</h4>
                <p className="text-gray-700 text-xs">We highly recommend using CORE WALLET for the best experience and security</p>
              </div>
            </div>
            <div className="flex max-w-84 bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl gap-4  h-auto  shadow-xl border border-gray-200  z-50">
              <Image
                src="/card.png"
                alt="Core Wallet"
                width={100}
                height={100}
                className="w-32"
              />
              <div className="grid text-center justify-center gap-2 self-center">
                <p className="text-gray-700">Get the full experience paying with Avalanche CARD all over the world</p>
                <button className="text-gray-100 cursor-pointer rounded-2xl bg-gray-700 px-3 py-1 text-xs">¡Order now!</button>
              </div>
            </div>
          </div>
        </div>

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
