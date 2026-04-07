import { PrismaClient } from "@/src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import Image from "next/image";
import SideBar from "@/components/SideBar";

// Página de detalle de un juego
export default async function ShowGamePage({ params }: { params: Promise<{ id: string }> }) {
    // Inicializa Prisma con el adaptador Neon
    const prisma = new PrismaClient({
        adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
    });

    // Obtiene el parámetro id de la URL
    const { id } = await params;
    const gameId = Number(id);

    // Valida que el id sea un número válido
    if (!Number.isInteger(gameId) || gameId <= 0) {
        return <div className="p-8 text-center text-red-500">ID inválido</div>;
    }

    // Busca el juego por id e incluye la consola relacionada
    const game = await prisma.games.findUnique({
        where: { id: gameId },
        include: { console: true },
    });

    // Si no existe el juego, muestra mensaje de error
    if (!game) {
        return <div className="p-8 text-center text-red-500">Juego no encontrado</div>;
    }

    // Renderiza los detalles del juego con estilos tipo card y el sidebar
    return (
        <SideBar currentPath="/games">
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="bg-base-200 rounded-xl shadow-lg p-8 w-full max-w-2xl">
                    <h1 className="text-4xl font-bold mb-6 text-center">{game.title}</h1>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative w-32 h-44 flex-shrink-0">
                            <Image
                                src={game.cover === "no-image.png"
                                    ? "/img/no-image.png"
                                    : `/img/games/${game.cover}`}
                                alt={game.title}
                                fill
                                sizes="128px"
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex-1 space-y-2 text-lg">
                            <p><span className="font-semibold">Developer:</span> {game.developer}</p>
                            <p><span className="font-semibold">Console:</span> {game.console.name}</p>
                            <p><span className="font-semibold">Price:</span> ${game.price}</p>
                            {/* Puedes agregar más campos aquí si lo deseas */}
                        </div>
                    </div>
                    <div className="flex justify-between mt-8">
                        <a href="/games" className="btn btn-outline">Volver a la lista</a>
                        <a href={`/games/edit/${game.id}`} className="btn btn-primary">Editar</a>
                    </div>
                </div>
            </div>
        </SideBar>
    );
}