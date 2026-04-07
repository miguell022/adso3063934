import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/src/generated/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import EditGameForm from "@/components/EditGameForm";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  }),
});

export default async function EditGamePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  const { id } = await params;
  const gameId = Number(id);
  if (!Number.isInteger(gameId) || gameId <= 0) {
    notFound();
  }

  const game = await prisma.games.findUnique({
    where: { id: gameId },
    include: { console: true },
  });

  const consoles = await prisma.console.findMany({ orderBy: { name: "asc" } });

  if (!game) {
    notFound();
    return null;
  }

  async function updateGame(formData: FormData) {
    "use server";
    let cover = game.cover;
    const file = formData.get("cover") as File | null;
    if (file && typeof file !== "string" && file.size > 0) {
      // Subir imagen a /api/upload
      const uploadData = new FormData();
      uploadData.append("file", file);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/upload`, {
        method: "POST",
        body: uploadData,
      });
      if (res.ok) {
        const data = await res.json();
        cover = data.url;
      }
    }
    const title = formData.get("title") as string;
    const console_id = Number(formData.get("console_id"));
    const price = Number(formData.get("price"));
    const developer = formData.get("developer") as string;
    await prisma.games.update({
      where: { id: gameId },
      data: { cover, title, console_id, price, developer },
    });
    revalidatePath("/games");
    redirect("/games");
  }

  return (
    <SideBar currentPath="/games">
      <form action={updateGame} className="space-y-4 max-w-xl p-4 mx-auto mt-16">
        <EditGameForm game={game} consoles={consoles} />
        <button className="btn btn-primary" type="submit">Guardar cambios</button>
        <Link href="/games" className="btn btn-ghost ml-2">Cancelar</Link>
      </form>
    </SideBar>
  );
}