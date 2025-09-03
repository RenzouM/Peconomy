# Guía: Integrar Private Keys de Privy con Script Backend

## Resumen
Esta guía te muestra cómo extraer private keys de Privy embedded wallets en el frontend y usarlas en scripts backend como `06_deposit.ts`.

## 🚀 Pasos de Implementación

### 1. Instalar dependencias adicionales de Privy

```bash
npm install @privy-io/react-auth
# Ya tienes esto instalado según tu package.json
```

### 2. Archivos creados/modificados

✅ **Frontend (ya implementado):**
- `app/utils/privyKeys.ts` - Hook para extraer private keys
- `app/api/save-private-key/route.ts` - API endpoint para guardar keys
- `app/components/PeconomyVaults.tsx` - Modificado para extraer keys automáticamente

✅ **Backend (pendiente por copiar):**
- `app/utils/backendPrivyKeys.ts` - Copia esto a `eerc-backend-converter/src/utils/privyKeys.ts`

### 3. Cómo usar en tu script `06_deposit.ts`

Reemplaza esta sección en tu script:

```typescript
// ANTES:
const { privateKey: userPrivateKey, formattedPrivateKey, publicKey: derivedPublicKey, signature } = await deriveKeysFromUser(userAddress, wallet);

// DESPUÉS:
import { PRIVY_PRIVATE_KEY, hasPrivyPrivateKey } from "../../src/utils/privyKeys";

// Esta es la CONSTANTE que pedías - asigna el valor de la función .tsx
let userPrivateKey: bigint;
let derivedPublicKey: [bigint, bigint];
let signature: string;

if (hasPrivyPrivateKey(userAddress)) {
  console.log("🔑 Usando private key de Privy...");
  
  // CONSTANTE que obtiene el valor de la función del frontend
  const PRIVY_KEY = await PRIVY_PRIVATE_KEY(userAddress);
  userPrivateKey = BigInt(PRIVY_KEY);
  
  // Derivar public key desde Privy key (implementar según tu sistema)
  // const derivedKeys = deriveKeysFromPrivyKey(PRIVY_KEY);
  // derivedPublicKey = derivedKeys.publicKey;
  // signature = derivedKeys.signature;
  
} else {
  // Fallback al método original
  const derivedKeys = await deriveKeysFromUser(userAddress, wallet);
  userPrivateKey = derivedKeys.privateKey;
  derivedPublicKey = derivedKeys.publicKey;
  signature = derivedKeys.signature;
}
```

## 🔄 Flujo de Trabajo

### Paso 1: Frontend
1. Usuario se conecta con Privy en el frontend
2. Se extrae automáticamente la private key del embedded wallet
3. Se guarda en archivo local y/o se envía al API endpoint

### Paso 2: Backend
1. Script backend verifica si existe private key de Privy
2. Si existe, la usa en lugar de generar una nueva
3. Si no existe, usa el método original de derivación

## 📋 Comandos para Probar

### 1. Extraer keys desde frontend:
```bash
# Ejecutar el frontend
npm run dev

# Abrir http://localhost:3000
# Conectar wallet con Privy
# Las keys se extraerán automáticamente
```

### 2. Usar keys en backend:
```bash
# En el directorio eerc-backend-converter
# Primero copia el archivo de utilidades:
cp ../peconomy-front/app/utils/backendPrivyKeys.ts src/utils/privyKeys.ts

# Luego ejecuta el script modificado
npx hardhat run scripts/converter/06_deposit.ts --network fuji
```

## ⚠️ Consideraciones de Seguridad

1. **Private keys sensibles**: Las private keys se guardan temporalmente en archivos locales
2. **No commitear**: Asegúrate de agregar `/private-keys` a tu `.gitignore`
3. **Eliminar después de uso**: Considera eliminar las keys después de cada sesión
4. **Solo desarrollo**: Esta implementación es para desarrollo/testing, no para producción

## 🔧 Personalización

### Modificar ubicación de archivos:
En `backendPrivyKeys.ts`, cambia esta línea:
```typescript
const frontendKeysPath = path.join(__dirname, "../../../peconomy-front/private-keys");
```

### Usar different storage:
- Modifica `savePrivateKeyToFile()` para usar database
- Modifica `getPrivyPrivateKey()` para leer desde database

## 🎯 Resultado Final

**Sí, puedes crear una constante que se asigna el valor de una función hecha en .tsx:**

```typescript
// En tu script backend:
const PRIVY_KEY = await PRIVY_PRIVATE_KEY(userAddress);
```

Esta constante obtiene la private key extraída desde Privy en el frontend, permitiendo que tus scripts backend usen las mismas wallets que maneja Privy.