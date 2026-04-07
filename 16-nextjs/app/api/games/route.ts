import { NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

export async function POST(request: Request) {
  try {
    // Lee los datos enviados desde el formulario cliente.
    const body = await request.json();

    // Normaliza el payload para validar y guardar tipos correctos en Prisma.
    const title = String(body.title || "").trim();
    const developer = String(body.developer || "").trim();
    const genre = String(body.genre || "").trim();
    const description = String(body.description || "").trim();
    const cover = String(body.cover || "no-image.png").trim() || "no-image.png";
    const releaseDate = String(body.releaseDate || "").trim();
    const price = Number(body.price);
    const console_id = Number(body.console_id);

    if (!title || !developer || !genre || !description || !releaseDate) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben estar completos" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json(
        { error: "El precio no es valido" },
        { status: 400 }
      );
    }

    if (!Number.isInteger(console_id) || console_id <= 0) {
      return NextResponse.json(
        { error: "Debes seleccionar una consola valida" },
        { status: 400 }
      );
    }

    // Antes de crear el juego, comprobamos que la consola exista.
    const consoleExists = await prisma.console.findUnique({
      where: { id: console_id },
      select: { id: true },
    });

    if (!consoleExists) {
      return NextResponse.json(
        { error: "La consola seleccionada no existe" },
        { status: 400 }
      );
    }

    // Si todo es valido, Prisma inserta el nuevo juego en Neon/Postgres.
    const game = await prisma.games.create({
      data: {
        title,
        developer,
        genre,
        description,
        cover,
        releaseDate: new Date(releaseDate),
        price,
        console_id,
      },
      select: { id: true, title: true },
    });

    return NextResponse.json({ ok: true, game }, { status: 201 });
  } catch (error: unknown) {
    // P2002 = violacion de unique, en este caso titulo repetido.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ya existe un juego con ese titulo" },
        { status: 409 }
      );
    }

    console.error("[API] Error al crear juego:", error);

    return NextResponse.json(
      { error: "No se pudo crear el juego" },
      { status: 500 }
    );
  }
}
