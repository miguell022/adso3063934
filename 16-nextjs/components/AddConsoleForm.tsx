"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddConsoleForm() {
  const router = useRouter();
  // Este estado representa todo el payload que se enviara a la API.
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    releaseDate: "",
    description: "",
    image: "no-image.png",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Envia los datos a la ruta API que realmente crea la consola en Prisma.
      const res = await fetch("/api/consoles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Consola agregada correctamente");
        setForm({
          name: "",
          manufacturer: "",
          releaseDate: "",
          description: "",
          image: "no-image.png",
        });
        // Cuando sale bien, volvemos al listado para ver la consola creada.
        router.push("/consoles");
        router.refresh();
      } else {
        setError(data.error || "No se pudo agregar la consola");
      }
    } catch {
      setError("Error de red");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Consola</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Nombre"
          required
        />
        <input
          name="manufacturer"
          value={form.manufacturer}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Fabricante"
          required
        />
        <input
          name="releaseDate"
          value={form.releaseDate}
          onChange={handleChange}
          className="input input-bordered w-full"
          type="date"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          placeholder="Descripcion"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Imagen"
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar"}
        </button>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        {success && <div className="text-green-500 text-center mt-2">{success}</div>}
      </form>
    </div>
  );
}
