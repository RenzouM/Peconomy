"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Verificar que las variables de entorno estén configuradas
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const clientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID;

  if (!appId || !clientId) {
    console.error("❌ Variables de entorno de Privy no configuradas:");
    console.error("   NEXT_PUBLIC_PRIVY_APP_ID:", appId ? "✅ Configurada" : "❌ Faltante");
    console.error("   NEXT_PUBLIC_PRIVY_CLIENT_ID:", clientId ? "✅ Configurada" : "❌ Faltante");
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-red-200">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error de Configuración</h2>
          <p className="text-gray-700 mb-4">
            Las variables de entorno de Privy no están configuradas.
          </p>
          <div className="text-left bg-gray-100 p-4 rounded-lg">
            <p className="font-mono text-sm">
              Crea un archivo <strong>.env.local</strong> con:
            </p>
            <pre className="text-xs mt-2">
{`NEXT_PUBLIC_PRIVY_APP_ID=tu-app-id
NEXT_PUBLIC_PRIVY_CLIENT_ID=tu-client-id`}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PrivyProvider
      appId={appId}
      clientId={clientId}
      config={{
        // Configuración mejorada para evitar errores
        appearance: {
          theme: "light",
          accentColor: "#ef4444", // Rojo de tu tema
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
            priceDisplay: {
              primary: "fiat-currency",
              secondary: "native-token",
            },
          },
        },
        externalWallets: {
          coinbaseWallet: {
            // Configuración específica para evitar errores de Coinbase
            connectionOptions: "smartWalletOnly",
          },
          walletConnect: {
            enabled: true,
          },
          metamask: {
            enabled: true,
          },
        },
        // Configuraciones adicionales para estabilidad
        supportedChains: ["ethereum", "polygon", "arbitrum", "optimism", "base", "avalanche"],
        defaultChain: "avalanche",
      }}>
      {children}
    </PrivyProvider>
  );
}
