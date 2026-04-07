import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/src/generated/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import EditConsoleForm from "@/components/EditConsoleForm";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  }),
});

export default async function EditConsolePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  const { id } = await params;
  const consoleId = Number(id);
  if (!Number.isInteger(consoleId) || consoleId <= 0) {
    notFound();
  }

  const consoleItem = await prisma.console.findUnique({
    where: { id: consoleId },
  });

  if (!consoleItem) {
    notFound();
    return null;
  }

  async function updateConsole(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const manufacturer = formData.get("manufacturer") as string;
    const releaseDate = formData.get("releaseDate") as string;
    const image = (formData.get("image") as string) || "no-image.png";
    const description = formData.get("description") as string;

    await prisma.console.update({
      where: { id: consoleId },
      data: {
        name,
        manufacturer,
        releaseDate: new Date(releaseDate),
        image,
        description,
      },
    });

    revalidatePath("/consoles");
    redirect("/consoles");
  }

  return (
    <SideBar currentPath="/consoles">
      <form action={updateConsole} className="space-y-4 max-w-5xl p-4 mx-auto mt-16">
        <EditConsoleForm consoleItem={consoleItem} />
        <button className="btn btn-primary" type="submit">
          Guardar cambios
        </button>
        <Link href="/consoles" className="btn btn-ghost ml-2">
          Cancelar
        </Link>
      </form>
    </SideBar>
  );
}
