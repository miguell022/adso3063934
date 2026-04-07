import { NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "ID invalido" }, { status: 400 });
  }

  try {
    await prisma.games.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[API] Error al eliminar:", error);
    return NextResponse.json(
      { error: "No se pudo eliminar el juego" },
      { status: 500 }
    );
  }
}
