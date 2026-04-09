"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function AddConsoleForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let image = form.image;

      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);
        uploadData.append("folder", "consoles");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadJson = await uploadRes.json();

        if (!uploadRes.ok) {
          setError(uploadJson.error || "No se pudo subir la imagen");
          setLoading(false);
          return;
        }

        image = uploadJson.url;

      }

      // Envia los datos a la ruta API que realmente crea la consola en Prisma.
      const res = await fetch("/api/consoles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, image }),
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
        setSelectedFile(null);
        setPreview(null);
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
        <div className="flex justify-center">
          <div
            className="relative h-40 w-40 cursor-pointer overflow-hidden rounded-xl border-2 border-base-300 shadow-xl"
            onClick={handleImageClick}
          >
            <img
              src={preview || "/img/no-image.png"}
              alt="Preview consola"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100">
              <span className="text-sm font-bold text-white">Cambiar imagen</span>
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
