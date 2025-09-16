"use client";

import { useState } from "react";
import Image from "next/image";

interface Transaction {
  id: string;
  date: string;
  time: string;
  recipient: string;
  amount: string;
  token: string;
  description: string;
  status: "completed" | "pending" | "failed";
  isEncrypted?: boolean;
}

interface TransactionsTableProps {
  activeTab: "public" | "private";
}

// Mock data para las transacciones
const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2025-09-15",
    time: "14:30:25",
    recipient: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    amount: "?",
    token: "ePECO",
    description: "Payment for sponsored review - Gaming Headset",
    status: "completed",
    isEncrypted: true,
  },
  {
    id: "2",
    date: "2025-09-14",
    time: "09:15:42",
    recipient: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    amount: "?",
    token: "ePECO",
    description: "Referral commission - New user registration",
    status: "completed",
    isEncrypted: true,
  },
  {
    id: "3",
    date: "2025-09-13",
    time: "16:45:18",
    recipient: "0x1234567890123456789012345678901234567890",
    amount: "?",
    token: "ePECO",
    description: "Shop commission - Product sales",
    status: "pending",
    isEncrypted: true,
  },
  {
    id: "4",
    date: "2025-08-12",
    time: "11:20:33",
    recipient: "0x9876543210987654321098765432109876543210",
    amount: "5",
    token: "ePECO",
    description: "Ad slot rental payment",
    status: "completed",
    isEncrypted: false,
  },
  {
    id: "5",
    date: "2025-08-13",
    time: "12:20:33",
    recipient: "0x2876543210987654321098765432109876543210",
    amount: "5",
    token: "ePECO",
    description: "Ad slot rental payment",
    status: "completed",
    isEncrypted: false,
  },
];

// Mock data para los contactos guardados
const savedContacts = [
  { id: "1", name: "GamingBrand Inc.", address: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6" },
  { id: "2", name: "TechReview Co.", address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" },
  { id: "3", name: "Shop Partner", address: "0x1234567890123456789012345678901234567890" },
  { id: "4", name: "Advertiser Pro", address: "0x9876543210987654321098765432109876543210" },
];

export default function TransactionsTable({ activeTab }: TransactionsTableProps) {
  const [selectedContact, setSelectedContact] = useState<string>("all");
  const [revealedTransactions, setRevealedTransactions] = useState<Set<string>>(new Set());

  const handleRevealTransaction = async (transactionId: string) => {
    // Aquí harías el call al contrato para revelar la transacción encriptada
    console.log(`Revealing transaction ${transactionId}`);

    // Simular la revelación
    setRevealedTransactions(prev => new Set([...prev, transactionId]));
  };

  const filteredTransactions = selectedContact === "all" ? mockTransactions : mockTransactions.filter(tx => tx.recipient === selectedContact);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTokenIcon = (token: string) => {
    switch (token) {
      case "ePECO":
        return "/logo.png";
      case "AVAX":
        return "/avacard.svg";
      default:
        return "/usdc.png";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header con filtros */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{activeTab === "public" ? "Public Transactions" : "Private Transactions"}</h2>
          <p className="text-gray-600">{activeTab === "public" ? "Complete transaction history with full details" : "Encrypted transactions - click 'Reveal' to decrypt details"}</p>
        </div>

        {/* Filtro de contactos */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-black">Filter by contact:</label>
          <select
            value={selectedContact}
            onChange={e => setSelectedContact(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-xs font-medium text-black">
            <option
              value="all"
              className="text-xs font-medium text-black">
              All Contacts
            </option>
            {savedContacts.map(contact => (
              <option
                key={contact.id}
                value={contact.address}
                className="text-xs font-medium text-black">
                {contact.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de transacciones */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-sm border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Recipient</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                {activeTab === "private" && <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map(transaction => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-gray-900 font-medium">{transaction.date}</div>
                    <div className="text-xs text-gray-500">{transaction.time}</div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="text-xs text-gray-900 font-mono">
                        {transaction.recipient.slice(0, 6)}...{transaction.recipient.slice(-4)}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Image
                        src={getTokenIcon(transaction.token)}
                        alt={transaction.token}
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded-full"
                      />
                      <div className="text-xs font-semibold text-gray-900">
                        {transaction.amount} {transaction.token}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-900 max-w-xs">{activeTab === "public" || !transaction.isEncrypted ? transaction.description : "🔒 Encrypted transaction"}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>{transaction.status}</span>
                  </td>

                  {activeTab === "private" && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.isEncrypted && !revealedTransactions.has(transaction.id) ? (
                        <button
                          onClick={() => handleRevealTransaction(transaction.id)}
                          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                          Reveal
                        </button>
                      ) : (
                        <span className="text-green-600 text-xs font-medium">✓ Revealed</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer con estadísticas */}
        <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-600">
              Showing {filteredTransactions.length} of {mockTransactions.length} transactions
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Completed: {filteredTransactions.filter(tx => tx.status === "completed").length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Pending: {filteredTransactions.filter(tx => tx.status === "pending").length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
