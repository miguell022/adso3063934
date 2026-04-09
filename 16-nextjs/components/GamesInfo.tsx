"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { ViewIcon, EditIcon, DeleteIcon } from "@/components/Icons";

type Game = {
  id: number;
  title: string;
  cover: string;
  developer: string;
  price: number;
  console: {
    name: string;
  };
};

function getConsoleBadgeClass(consoleName: string) {
  const name = consoleName.toLowerCase();

  if (name.includes("playstation")) {
    return {
      wrapper: "border-[#0651d4] bg-[#0651d4]/10 text-[#6eb6ff]",
      dot: "bg-[#0651d4]",
    };
  }

  if (name.includes("xbox")) {
    return {
      wrapper: "border-[#22c528] bg-[#22c528]/10 text-[#52f35b]",
      dot: "bg-[#22c528]",
    };
  }

  if (name.includes("nintendo")) {
    return {
      wrapper: "border-[#e41818] bg-[#e41818]/10 text-[#ff6b6b]",
      dot: "bg-[#e41818]",
    };
  }

  if (name.includes("steam")) {
    return {
      wrapper: "border-[#f63b6a] bg-[#f63b6a]/10 text-[#ff7ea2]",
      dot: "bg-[#f63b6a]",
    };
  }

  if (name.includes("pc")) {
    return {
      wrapper: "border-[#6b6862] bg-[#6b6862]/10 text-[#d6d3d1]",
      dot: "bg-[#6b6862]",
    };
  }

  return {
    wrapper: "border-[#64748b] bg-[#64748b]/10 text-[#cbd5e1]",
    dot: "bg-[#64748b]",
  };
}

export default function GamesInfo({ games }: { games: Game[] }) {
  const router = useRouter();
  const [gamesList, setGamesList] = useState(games);
  const [search, setSearch] = useState("");
  const [selectedConsole, setSelectedConsole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Mantiene la tabla sincronizada cuando la lista llega actualizada desde el servidor.
  useEffect(() => {
    setGamesList(games);
  }, [games]);

  // Extrae una lista unica de consolas para poblar el select de filtro.
  const consoles = Array.from(
    new Set(gamesList.map((game) => game.console.name))
  ).sort();

  // Aplica filtro por texto y por consola al mismo tiempo.
  const filteredGames = gamesList.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    const matchesConsole =
      selectedConsole === "" || game.console.name === selectedConsole;

    return matchesSearch && matchesConsole;
  });

  async function handleDelete(id: number, title: string) {
    // Confirmacion visual antes de ejecutar el DELETE por API.
    const result = await Swal.fire({
      title: "Eliminar juego",
      text: `Seguro que quieres eliminar \"${title}\"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    setDeletingId(id);
    setError(null);

    try {
      // El borrado se hace por API para evitar navegar a una pagina intermedia.
      const res = await fetch(`/api/games/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "No se pudo eliminar el juego");
        await Swal.fire({
          title: "Error",
          text: data.error || "No se pudo eliminar el juego",
          icon: "error",
        });
        return;
      }

      // Actualiza la UI local inmediatamente para que la fila desaparezca al instante.
      setGamesList((currentGames) => currentGames.filter((game) => game.id !== id));

      await Swal.fire({
        title: "Juego eliminado",
        text: `\"${title}\" fue eliminado correctamente`,
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });

      router.refresh();
    } catch {
      setError("Error de red");
      await Swal.fire({
        title: "Error de red",
        text: "No se pudo conectar con el servidor",
        icon: "error",
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      {/* Encabezado de la vista con buscador, filtro y acceso al formulario de creacion. */}
      <div className="mb-6 mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-bold sm:text-4xl">Games</h1>

        <div className="w-full lg:flex lg:flex-1 lg:justify-center">
          <div className="flex w-full max-w-3xl flex-col gap-3 lg:flex-row">
            <form onSubmit={(e) => e.preventDefault()} className="flex-1">
              <input
                type="text"
                name="search"
                placeholder="Buscar juego..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered w-full"
              />
            </form>

            <select
              value={selectedConsole}
              onChange={(e) => setSelectedConsole(e.target.value)}
              className="select select-bordered w-full lg:max-w-xs"
            >
              <option value="">Todas las consolas</option>
              {consoles.map((consoleName) => (
                <option key={consoleName} value={consoleName}>
                  {consoleName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Link href="/games/add" className="btn btn-success w-full sm:w-auto">
          Add Game
        </Link>
      </div>

      {/* Tabla principal del CRUD de juegos. */}
      <div className="overflow-x-auto mt-8">
        <table className="table w-full min-w-[900px]">
          <thead>
            <tr>
              <th>img</th>
              <th>ID</th>
              <th className="max-w-xs text-center">Title</th>
              <th>Developer</th>
              <th>Console</th>
              <th>Price</th>
              <th className="text-center align-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.map((game) => {
              const consoleBadge = getConsoleBadgeClass(game.console.name);

              return (
                <tr key={game.id} className="hover">
                  <td>
                    <div className="relative w-12 h-16">
                      <Image
                        src={
                          !game.cover || game.cover === "no-image.png"
                            ? "/img/no-image.png"
                            : game.cover.startsWith("/img/")
                              ? game.cover
                              : `/img/games/${game.cover}`
                        }
                        alt={game.title}
                        fill
                        sizes="48px"
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </td>
                  <td>{game.id}</td>
                  <td className="max-w-xs truncate text-center">{game.title}</td>
                  <td>{game.developer}</td>
                  <td>
                    <span
                      className={`inline-flex min-w-[190px] items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium tracking-wide shadow-[0_0_16px_rgba(255,255,255,0.03)] transition ${consoleBadge.wrapper}`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full shadow-[0_0_10px_currentColor] ${consoleBadge.dot}`}
                      ></span>
                      {game.console.name}
                    </span>
                  </td>
                  <td>{game.price}</td>
                  <td className="align-middle text-center">
                    <div className="flex h-10 items-center justify-center gap-1 sm:gap-2">
                      <button
                        className="rounded p-2 hover:bg-base-300"
                        title="Ver"
                        onClick={() => router.push(`/games/show/${game.id}`)}
                      >
                        <ViewIcon size={24} />
                      </button>
                      <button
                        className="rounded p-2 hover:bg-base-300"
                        title="Editar"
                        onClick={() => router.push(`/games/edit/${game.id}`)}
                      >
                        <EditIcon size={24} />
                      </button>
                      <button
                        className="rounded p-2 hover:bg-base-300 disabled:opacity-50"
                        title="Eliminar"
                        onClick={() => handleDelete(game.id, game.title)}
                        disabled={deletingId === game.id}
                      >
                        <DeleteIcon size={24} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredGames.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No games found</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </>
  );
}
