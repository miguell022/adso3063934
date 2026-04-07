"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddGameForm({ consoles }: { consoles: { id: number, name: string }[] }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    developer: "",
    price: "",
    genre: "",
    description: "",
    releaseDate: "",
    cover: "no-image.png",
    console_id: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Envia el formulario a la ruta API que realmente crea el registro.
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Juego agregado correctamente");
        setForm({ title: "", developer: "", price: "", genre: "", description: "", releaseDate: "", cover: "no-image.png", console_id: "" });
        // Volvemos al listado para ver el nuevo juego y refrescamos datos del servidor.
        router.push("/games");
        router.refresh();
      } else {
        setError(data.error || "No se pudo agregar el juego");
      }
    } catch {
      setError("Error de red");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <form onSubmit={handleSubmit} className="bg-base-200 p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Juego</h2>
        <input name="title" value={form.title} onChange={handleChange} className="input input-bordered w-full" placeholder="Título" required />
        <input name="developer" value={form.developer} onChange={handleChange} className="input input-bordered w-full" placeholder="Desarrollador" required />
        <input name="price" value={form.price} onChange={handleChange} className="input input-bordered w-full" placeholder="Precio" type="number" min="0" step="0.01" required />
        <input name="genre" value={form.genre} onChange={handleChange} className="input input-bordered w-full" placeholder="Género" required />
        <textarea name="description" value={form.description} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Descripción" required />
        <input name="releaseDate" value={form.releaseDate} onChange={handleChange} className="input input-bordered w-full" placeholder="Fecha de lanzamiento" type="date" required />
        <select name="console_id" value={form.console_id} onChange={handleChange} className="select select-bordered w-full" required>
          <option value="">Selecciona una consola</option>
          {consoles.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input name="cover" value={form.cover} onChange={handleChange} className="input input-bordered w-full" placeholder="Imagen (opcional)" />
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? "Agregando..." : "Agregar"}</button>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        {success && <div className="text-green-500 text-center mt-2">{success}</div>}
      </form>
    </div>
  );
}
