import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import ConsolesInfo from "@/components/ConsolesInfo";
import { PrismaClient } from "@/src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
  });

  const consoles = await prisma.console.findMany({
    orderBy: { id: "asc" },
    include: {
      _count: {
        select: {
          games: true,
        },
      },
    },
  });

  return (
    <SideBar currentPath="/consoles">
      <ConsolesInfo consoles={consoles} />
    </SideBar>
  );
}
