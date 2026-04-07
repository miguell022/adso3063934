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
  // En Next 16 el parametro dinamico puede llegar como Promise.
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "ID invalido" }, { status: 400 });
  }

  try {
    // Elimina solo la consola cuyo id llega en la URL /api/consoles/[id].
    await prisma.console.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[API] Error al eliminar consola:", error);
    return NextResponse.json(
      { error: "No se pudo eliminar la consola" },
      { status: 500 }
    );
  }
}
