import { NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

export async function POST(request: Request) {
  try {
    // Recibe el JSON enviado desde AddConsoleForm.
    const body = await request.json();

    // Normaliza el payload antes de validar y guardar.
    const name = String(body.name || "").trim();
    const manufacturer = String(body.manufacturer || "").trim();
    const description = String(body.description || "").trim();
    const releaseDate = String(body.releaseDate || "").trim();
    const image = String(body.image || "no-image.png").trim() || "no-image.png";

    if (!name || !manufacturer || !description || !releaseDate) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben estar completos" },
        { status: 400 }
      );
    }

    // Prisma crea la consola en Neon/Postgres.
    const consoleItem = await prisma.console.create({
      data: {
        name,
        manufacturer,
        description,
        releaseDate: new Date(releaseDate),
        image,
      },
      select: { id: true, name: true },
    });

    return NextResponse.json({ ok: true, console: consoleItem }, { status: 201 });
  } catch (error: unknown) {
    // P2002 aparece cuando se repite un valor unico, aqui el nombre.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ya existe una consola con ese nombre" },
        { status: 409 }
      );
    }

    console.error("[API] Error al crear consola:", error);
    return NextResponse.json(
      { error: "No se pudo crear la consola" },
      { status: 500 }
    );
  }
}
