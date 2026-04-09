"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function AddGameForm({
  consoles,
}: {
  consoles: { id: number; name: string }[];
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    developer: "",
    price: "",
    genre: "",
    description: "",
    releaseDate: "",
    cover: "no-image.png",
    console_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      setError("");

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("folder", "games");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No se pudo subir la imagen");
      }

      setForm((prev) => ({
        ...prev,
        cover: data.url,
      }));
    } catch (error) {
      console.error(error);
      setError("No se pudo subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Juego agregado correctamente");
        setForm({
          title: "",
          developer: "",
          price: "",
          genre: "",
          description: "",
          releaseDate: "",
          cover: "no-image.png",
          console_id: "",
        });
        setPreview(null);
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
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Juego</h2>

        <div className="flex justify-center">
          <div
            className="relative h-48 w-36 cursor-pointer overflow-hidden rounded-xl border-2 border-base-300 shadow-xl"
            onClick={handleImageClick}
          >
            <img
              src={preview || (form.cover === "no-image.png" ? "/img/no-image.png" : form.cover)}
              alt="Preview juego"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100">
              <span className="text-sm font-bold text-white">
                {uploading ? "Subiendo..." : "Cambiar imagen"}
              </span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Título"
          required
        />

        <input
          name="developer"
          value={form.developer}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Desarrollador"
          required
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Precio"
          type="number"
          min="0"
          step="0.01"
          required
        />

        <input
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Género"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          placeholder="Descripción"
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

        <select
          name="console_id"
          value={form.console_id}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Selecciona una consola</option>
          {consoles.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary w-full" disabled={loading || uploading}>
          {loading ? "Agregando..." : "Agregar"}
        </button>

        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        {success && <div className="text-green-500 text-center mt-2">{success}</div>}
      </form>
    </div>
  );
}
