import { PrismaClient } from "@/src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import Image from "next/image"

const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL!, }),
})

export default async function GamesInfo() {
    const games = await prisma.games.findMany({
        include: { console: true },
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl border-b-2 pb-2 mb-8">Games</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="w-10"> </th>
                            <th>img</th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Developer</th>
                            <th>Release Date</th>
                            <th>Genre</th>
                            <th>Description</th>
                            <th>Console</th>
                        </tr>
                    </thead>

                    <tbody>
                        {games.map((game) => (
                            <tr key={game.id} className="hover">
                                <td>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </td>
                                <td>
                                    <div className="relative w-12 h-16">
                                        <Image
                                            src={game.cover === "no-image.png"
                                                ? "/img/no-image.png"
                                                : `/img/games/${game.cover}`}
                                            alt={game.title}
                                            fill
                                            sizes="48px"
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                </td>
                                <td>{game.id}</td>
                                <td>{game.title}</td>
                                <td>{game.developer}</td>
                                <td>{game.releaseDate?.toLocaleDateString()}</td>
                                <td>{game.genre}</td>
                                <td>{game.description}</td>
                                <td>{game.console.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {games.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No games found</p>
            )}
        </div>
    )
}