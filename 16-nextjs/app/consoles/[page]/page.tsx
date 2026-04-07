export const dynamic = "force-dynamic";

import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import ConsolesInfo from "@/components/ConsolesInfo";
import { PrismaClient } from "@/src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import Paginator from "@/components/paginator";

export default async function ConsolesPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageParam } = await params;
  const page = Number(pageParam) > 0 ? Number(pageParam) : 1;
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
  });

  const [consoles, total] = await Promise.all([
    prisma.console.findMany({
      orderBy: { id: "asc" },
      include: {
        _count: {
          select: {
            games: true,
          },
        },
      },
      skip,
      take: pageSize,
    }),
    prisma.console.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <SideBar currentPath="/consoles">
      <ConsolesInfo consoles={consoles} />
      <Paginator currentPage={page} totalPages={totalPages} baseUrl="/consoles" cleanUrl />
    </SideBar>
  );
}
