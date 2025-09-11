"use client";

import { usePrivy, useWallets, useSignMessage } from "@privy-io/react-auth";
import { useState } from "react";
import { createWalletClient, custom, type Hex, type WalletClient } from "viem";
import { peconomyNetwork } from "../../config/network";
import { deposit } from "../../utils/06_deposit";
import { checkBalance } from "../../utils/08_check_balance";
import { transfer } from "../../utils/07_transfer";
import { withdraw } from "../../utils/09_withdraw";
import { register } from "../../utils/03_register-user";
import { faucet } from "../../utils/05_get_faucet";

interface VaultOperationsProps {
  activeTab: string;
  vaultActiveTabAction: string;
  onVaultTabActionChange: (action: string) => void;
}

export default function VaultOperations({ activeTab, vaultActiveTabAction, onVaultTabActionChange }: VaultOperationsProps) {
  const { authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const { signMessage } = useSignMessage();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [publicVaultAmount, setPublicVaultAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");

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

  const getWalletClient = async () => {
    if (wallets.length > 0 && authenticated) {
      try {
        const wallet = wallets[0];
        await wallet.switchChain(peconomyNetwork.id);
        const provider = await wallet.getEthereumProvider();

        const walletClient = createWalletClient({
          account: wallet.address as Hex,
          chain: peconomyNetwork,
          transport: custom(provider),
        });
        return walletClient;
      } catch (err) {
        console.error("Error initializing wallet:", err);
        setError(err instanceof Error ? err.message : "Error initializing wallet");
      }
    }
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
        address: wallets[0].address,
      }
    );

    try {
      setError("");
      setIsLoading(true);
      console.log("Starting registration process...");

      const userAddress = wallets[0].address;
      const walletClient = await getWalletClient();

      await register(signature, userAddress, walletClient as WalletClient);

      console.log("User registered successfully!");
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
        address: wallets[0].address,
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

      await transfer(userAddress as `0x${string}`, receiverAddress, parseFloat(amount), walletClient as WalletClient, signature);

      console.log("Transfer completed successfully!");
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
        address: wallets[0].address,
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

      await withdraw(amount, signature, userAddress, walletClient as WalletClient);

      console.log("Withdraw completed successfully!");
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
        address: wallets[0].address,
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

      await deposit(amount, signature, userAddress, walletClient as WalletClient);

      console.log("Deposit completed successfully!");
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
          address: wallets[0].address,
        }
      );
      const userAddress = wallets[0].address;
      await checkBalance(userAddress, signature);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Check balance failed. Please try again.");
    } finally {
    }
  };

  return (
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
        {activeTab === "private" && (
          <div className="bg-gradient-to-br h-full grid from-red-50/5 to-red-100/5 p-4 rounded-3xl shadow-sm border border-red-50/5">
            <div className="flex self-start items-center space-x-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="-6 -2 24 24"
                fill="#000000">
                <path
                  fill="red"
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
                  ].map((asset, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                      <img
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
              <div className="grid">
                <div className="flex space-x-1 bg-gray-100 ms-4 z-50">
                  <button
                    onClick={() => onVaultTabActionChange("decrypt")}
                    className={`px-6 py-3 rounded-t-lg border border-b-0 border-gray-50 cursor-pointer font-semibold transition-all duration-200 flex ${vaultActiveTabAction === "decrypt" ? "bg-white text-gray-600 border-gray-200 -mb-px" : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"}`}>
                    <span>Decrypt</span>
                  </button>
                  <button
                    onClick={() => onVaultTabActionChange("swap")}
                    className={`px-6 py-3 rounded-t-lg border border-b-0 border-gray-50 cursor-pointer font-semibold transition-all duration-200 flex ${vaultActiveTabAction === "swap" ? "bg-white text-gray-600 -mb-px border-gray-200" : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"}`}>
                    <span>Swap</span>
                  </button>
                  <button
                    onClick={() => onVaultTabActionChange("transfer")}
                    className={`px-6 py-3 rounded-t-lg border border-b-0 border-gray-50 cursor-pointer font-semibold transition-all duration-200 flex ${vaultActiveTabAction === "transfer" ? "bg-white text-gray-600 border-gray-200 -mb-px" : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"}`}>
                    <span>Transfer</span>
                  </button>
                  <button
                    onClick={() => onVaultTabActionChange("buy")}
                    className={`px-6 py-3 rounded-t-lg border border-b-0 border-gray-50 cursor-pointer font-semibold transition-all duration-200 flex ${vaultActiveTabAction === "buy" ? "bg-white text-gray-600 -mb-px border-gray-200" : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"}`}>
                    <span>Buy</span>
                  </button>
                </div>

                {/* Swap Interface */}
                {vaultActiveTabAction === "swap" && (
                  <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-200">
                    <h3 className="text-base font-semibold text-gray-800 mb-2 text-center tracking-tight">Swap Interface</h3>
                    <div className="space-y-2">
                      <div className="bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                        <div className="flex items-center space-x-2">
                          <img
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
                          <img
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
                      </button>
                    </div>
                  </div>
                )}

                {/* Operations */}
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200">
                  <div className="space-y-2">
                    <div className="flex p-4 gap-4">
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
                      </button>
                      <button
                        onClick={handleEncrypt}
                        disabled={isLoading}
                        className={`w-full cursor-pointer font-bold py-2 px-4 rounded-xl transition-all duration-300 transform shadow-lg text-white text-sm tracking-wide ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-xl"}`}>
                        {isLoading ? "Depositing..." : "Deposit"}
                      </button>
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
        )}

        {/* Public Vault Section */}
        {activeTab === "public" && (
          <div className="bg-gradient-to-br grid h-full from-blue-50/5 to-blue-100/5 p-4 rounded-3xl shadow-sm border border-blue-50/5">
            <div className="flex self-start items-center space-x-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="-6 -2 24 24"
                fill="#000000">
                <path
                  stroke="blue"
                  fill="blue"
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
                      <img
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
        )}
      </div>
    </div>
  );
}
