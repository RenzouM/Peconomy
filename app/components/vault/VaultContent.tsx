"use client";

import Image from "next/image";
import TransactionsTable from "./TransactionsTable";

interface VaultContentProps {
  activeTab: string;
}

export default function VaultContent({ activeTab }: VaultContentProps) {
  return (
    <div className="flex flex-col p-4 min-w-3/5 h-full gap-4">
      {/* Tabla de transacciones */}
      <TransactionsTable activeTab={activeTab as "public" | "private"} />

      <div className="flex w-full gap-4 text-black justify-evenly">
        <div className="flex h-full items-center max-w-84 bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-3xl gap-4 shadow-xl border border-gray-200 z-50">
          <Image
            src="/corewallet.png"
            alt="Core Wallet"
            width={512}
            height={512}
            className="w-20 h-20 rounded-2xl "
          />
          <div className="grid text-center justify-center gap-2 self-center">
            <p className="text-gray-700 text-sm">
              We highly recommend using
              <span className="font-semibold"> Core Wallet</span> for the best experience and security
            </p>
            <button className="text-gray-100 cursor-pointer rounded-2xl bg-gray-700 px-3 py-1 text-xs">¡Download now!</button>
          </div>
        </div>

        <div className="flex max-w-84 bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-3xl gap-4 shadow-xl border border-gray-200 z-50">
          <Image
            src="/avacard.svg"
            alt="Avalanche Card"
            width={160}
            height={200}
            className="h-20"
          />
          <div className="grid text-center justify-center gap-2 self-center">
            <p className="text-gray-700 text-sm">
              Get the full experience paying with
              <span className="font-semibold"> Avalanche Card</span> all over the world
            </p>
            <button className="text-gray-100 cursor-pointer rounded-2xl bg-gray-700 px-3 py-1 text-xs">¡Order now!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
