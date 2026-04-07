export const dynamic = "force-dynamic";

import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import GamesInfo from "@/components/GamesInfo";
import { PrismaClient } from "@/src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import Paginator from "@/components/paginator";

export default async function GamesPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageParam } = await params;
  const page = Number(pageParam) > 0 ? Number(pageParam) : 1;
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  // Verifica usuario autenticado
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
  });

  const [games, total] = await Promise.all([
    prisma.games.findMany({
      orderBy: { id: "asc" },
      include: { console: true },
      skip,
      take: pageSize,
    }),
    prisma.games.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Logs para depuración
  console.log("Página:", page);
  console.log("Juegos:", games.map((g: any) => g.id));

  return (
    <SideBar currentPath={"/games"}>
      <GamesInfo games={games} />
      <Paginator currentPage={page} totalPages={totalPages} baseUrl="/games" cleanUrl />
    </SideBar>
  );
}