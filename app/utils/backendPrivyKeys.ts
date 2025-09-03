/**
 * Función que puedes copiar al backend converter para leer private keys de Privy
 * Archivo: eerc-backend-converter/src/utils/privyKeys.ts
 */

import * as fs from "fs";
import * as path from "path";
import { ethers } from "ethers";

interface PrivyKeyData {
  address: string;
  privateKey: string;
  timestamp: string;
  source: string;
  savedAt?: string;
}

/**
 * Lee las private keys guardadas desde el frontend (Privy)
 * @param userAddress - La dirección del usuario para buscar sus keys
 * @returns Private key del usuario o null si no se encuentra
 */
export const getPrivyPrivateKey = async (userAddress: string): Promise<string | null> => {
  try {
    // Ruta donde se guardan las private keys desde el frontend
    // Ajusta esta ruta según tu configuración
    const frontendKeysPath = path.join(__dirname, "../../../peconomy-front/private-keys");
    const keyFilePath = path.join(frontendKeysPath, `${userAddress.toLowerCase()}.json`);
    
    if (!fs.existsSync(keyFilePath)) {
      console.log(`⚠️  No se encontró private key para ${userAddress}`);
      console.log("💡 Asegúrate de conectar tu wallet en el frontend primero");
      return null;
    }

    const keyData: PrivyKeyData = JSON.parse(fs.readFileSync(keyFilePath, "utf8"));
    
    // Verificar que la private key sea válida
    if (!keyData.privateKey) {
      throw new Error("Private key no encontrada en el archivo");
    }

    // Verificar que la private key corresponde a la dirección
    const wallet = new ethers.Wallet(keyData.privateKey);
    if (wallet.address.toLowerCase() !== userAddress.toLowerCase()) {
      throw new Error("La private key no corresponde a la dirección proporcionada");
    }

    console.log("✅ Private key de Privy cargada exitosamente");
    console.log(`📅 Guardada el: ${keyData.savedAt || keyData.timestamp}`);
    
    return keyData.privateKey;

  } catch (error) {
    console.error("❌ Error al leer private key de Privy:", error);
    return null;
  }
};

/**
 * Constante que obtiene la private key de Privy para usar en scripts
 * @param userAddress - La dirección del usuario
 * @returns Promise con la private key o lanza error si no se encuentra
 */
export const PRIVY_PRIVATE_KEY = async (userAddress: string): Promise<string> => {
  const privateKey = await getPrivyPrivateKey(userAddress);
  
  if (!privateKey) {
    throw new Error(
      "🚫 No se pudo obtener la private key de Privy.\n" +
      "💡 Pasos para solucionarlo:\n" +
      "   1. Abre el frontend (npm run dev)\n" +
      "   2. Conecta tu wallet con Privy\n" +
      "   3. La private key se guardará automáticamente\n" +
      "   4. Ejecuta este script nuevamente"
    );
  }
  
  return privateKey;
};

/**
 * Verifica si existe una private key para el usuario
 */
export const hasPrivyPrivateKey = (userAddress: string): boolean => {
  const frontendKeysPath = path.join(__dirname, "../../../peconomy-front/private-keys");
  const keyFilePath = path.join(frontendKeysPath, `${userAddress.toLowerCase()}.json`);
  return fs.existsSync(keyFilePath);
};