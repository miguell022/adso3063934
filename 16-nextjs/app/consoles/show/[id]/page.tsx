import { PrismaClient } from "@/src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import Link from "next/link";

export default async function ShowConsolePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
  });

  const { id } = await params;
  const consoleId = Number(id);

  if (!Number.isInteger(consoleId) || consoleId <= 0) {
    return <div className="p-8 text-center text-red-500">ID invalido</div>;
  }

  const consoleItem = await prisma.console.findUnique({
    where: { id: consoleId },
    include: {
      _count: {
        select: { games: true },
      },
    },
  });

  if (!consoleItem) {
    return <div className="p-8 text-center text-red-500">Consola no encontrada</div>;
  }

  return (
    <SideBar currentPath="/consoles">
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-base-200 rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-6 text-center">{consoleItem.name}</h1>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-40 h-40 flex-shrink-0">
              <Image
                src={
                  consoleItem.image === "no-image.png"
                    ? "/img/no-image.png"
                    : `/img/consoles/${consoleItem.image}`
                }
                alt={consoleItem.name}
                fill
                sizes="160px"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 space-y-2 text-lg">
              <p>
                <span className="font-semibold">Fabricante:</span>{" "}
                {consoleItem.manufacturer}
              </p>
              <p>
                <span className="font-semibold">Lanzamiento:</span>{" "}
                {new Date(consoleItem.releaseDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Juegos asociados:</span>{" "}
                {consoleItem._count.games}
              </p>
              <p>
                <span className="font-semibold">Descripcion:</span>{" "}
                {consoleItem.description}
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <Link href="/consoles" className="btn btn-outline">
              Volver a la lista
            </Link>
            <Link href={`/consoles/edit/${consoleItem.id}`} className="btn btn-primary">
              Editar
            </Link>
          </div>
        </div>
      </div>
    </SideBar>
  );
}
