import { PrismaClient } from "@/src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import AddGameForm from "@/components/AddGameForm";
import SideBar from "@/components/SideBar";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function AddGamePage() {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
  });

  // Cargamos las consolas para llenar el select del formulario.
  const consoles = await prisma.console.findMany({
    select: { id: true, name: true },
  });

  return (
    <SideBar currentPath="/games">
      <AddGameForm consoles={consoles} />
    </SideBar>
  );
}
