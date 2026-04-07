"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { ViewIcon, EditIcon, DeleteIcon } from "@/components/Icons";

type ConsoleItem = {
  id: number;
  name: string;
  image: string;
  manufacturer: string;
  releaseDate: Date | string;
  _count?: {
    games: number;
  };
};

export default function ConsolesInfo({ consoles }: { consoles: ConsoleItem[] }) {
  const router = useRouter();
  const [consolesList, setConsolesList] = useState(consoles);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Sincroniza la tabla local cuando el servidor refresca la lista.
  useEffect(() => {
    setConsolesList(consoles);
  }, [consoles]);

  const filteredConsoles = consolesList.filter((consoleItem) =>
    consoleItem.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: number, name: string) {
    // Confirmacion antes de llamar al endpoint DELETE.
    const result = await Swal.fire({
      title: "Eliminar consola",
      text: `Seguro que quieres eliminar "${name}"?`,
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
      // Borra una consola puntual usando la ruta dinamica /api/consoles/[id].
      const res = await fetch(`/api/consoles/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "No se pudo eliminar la consola");
        await Swal.fire({
          title: "Error",
          text: data.error || "No se pudo eliminar la consola",
          icon: "error",
        });
        return;
      }

      // Actualiza la tabla al instante sin esperar una recarga completa.
      setConsolesList((current) => current.filter((consoleItem) => consoleItem.id !== id));

      await Swal.fire({
        title: "Consola eliminada",
        text: `"${name}" fue eliminada correctamente`,
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
      <div className="flex items-center justify-between mb-6 mt-10">
        <h1 className="text-4xl font-bold">Consoles</h1>
        <div className="flex-1 flex justify-center">
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input
              type="text"
              name="search"
              placeholder="Buscar consola..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-72"
            />
            <button type="submit"></button>
          </form>
        </div>
        <Link href="/consoles/add" className="btn btn-success">
          Add Console
        </Link>
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="table w-full">
          <thead>
            <tr>
              <th>img</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fabricante</th>
              <th>Lanzamiento</th>
              <th>Juegos</th>
              <th className="text-center align-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredConsoles.map((consoleItem) => (
              <tr key={consoleItem.id} className="hover">
                <td>
                  <div className="relative w-16 h-16">
                    <Image
                      src={
                        consoleItem.image === "no-image.png"
                          ? "/img/no-image.png"
                          : `/img/consoles/${consoleItem.image}`
                      }
                      alt={consoleItem.name}
                      fill
                      sizes="64px"
                      className="object-cover rounded-lg"
                    />
                  </div>
                </td>
                <td>{consoleItem.id}</td>
                <td>{consoleItem.name}</td>
                <td>{consoleItem.manufacturer}</td>
                <td>{new Date(consoleItem.releaseDate).toLocaleDateString()}</td>
                <td>{consoleItem._count?.games ?? 0}</td>
                <td className="align-middle text-center">
                  <div className="flex items-center justify-center gap-2 h-10">
                    <button
                      className="p-2 hover:bg-base-300 rounded"
                      title="Ver"
                      onClick={() => router.push(`/consoles/show/${consoleItem.id}`)}
                    >
                      <ViewIcon size={24} />
                    </button>
                    <button
                      className="p-2 hover:bg-base-300 rounded"
                      title="Editar"
                      onClick={() => router.push(`/consoles/edit/${consoleItem.id}`)}
                    >
                      <EditIcon size={24} />
                    </button>
                    <button
                      className="p-2 hover:bg-base-300 rounded disabled:opacity-50"
                      title="Eliminar"
                      // Reemplaza la navegacion vieja a una pagina de delete.
                      onClick={() => handleDelete(consoleItem.id, consoleItem.name)}
                      disabled={deletingId === consoleItem.id}
                    >
                      <DeleteIcon size={24} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredConsoles.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No consoles found</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </>
  );
}
