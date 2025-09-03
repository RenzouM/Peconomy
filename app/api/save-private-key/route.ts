import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function POST(request: NextRequest) {
  try {
    const { address, privateKey, timestamp, source } = await request.json();

    if (!address || !privateKey) {
      return NextResponse.json(
        { error: "Dirección y private key son requeridas" },
        { status: 400 }
      );
    }

    const keyData = {
      address,
      privateKey,
      timestamp,
      source,
      savedAt: new Date().toISOString()
    };

    // Guardar en un archivo seguro (fuera del directorio web)
    const keysDir = path.join(process.cwd(), "private-keys");
    if (!fs.existsSync(keysDir)) {
      fs.mkdirSync(keysDir, { recursive: true });
    }

    const keyFilePath = path.join(keysDir, `${address.toLowerCase()}.json`);
    fs.writeFileSync(keyFilePath, JSON.stringify(keyData, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: "Private key guardada exitosamente",
      filePath: keyFilePath 
    });

  } catch (error) {
    console.error("Error saving private key:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Dirección es requerida" },
        { status: 400 }
      );
    }

    const keyFilePath = path.join(process.cwd(), "private-keys", `${address.toLowerCase()}.json`);
    
    if (!fs.existsSync(keyFilePath)) {
      return NextResponse.json(
        { error: "Private key no encontrada para esta dirección" },
        { status: 404 }
      );
    }

    const keyData = JSON.parse(fs.readFileSync(keyFilePath, "utf8"));
    
    return NextResponse.json({
      success: true,
      data: keyData
    });

  } catch (error) {
    console.error("Error reading private key:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}