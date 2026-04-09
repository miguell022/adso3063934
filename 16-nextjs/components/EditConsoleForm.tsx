"use client";

import { useRef, useState } from "react";

type Console = {
  id: number;
  name: string;
  image: string;
  manufacturer: string;
  description: string;
  releaseDate: Date | string;
};

export default function EditConsoleForm({ consoleItem }: { consoleItem: Console }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(
    !consoleItem.image || consoleItem.image === "no-image.png"
      ? "no-image.png"
      : consoleItem.image
  );
  const [uploading, setUploading] = useState(false);

  const releaseDateValue =
    typeof consoleItem.releaseDate === "string"
      ? consoleItem.releaseDate.slice(0, 10)
      : new Date(consoleItem.releaseDate).toISOString().slice(0, 10);

  const currentImage =
    !imageUrl || imageUrl === "no-image.png"
      ? "/img/no-image.png"
      : imageUrl.startsWith("/img/")
        ? imageUrl
        : `/img/consoles/${imageUrl}`;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("folder", "consoles");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No se pudo subir la imagen");
      }

      setImageUrl(data.url);
    } catch (error) {
      console.error(error);
      alert("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <input type="hidden" name="image" value={imageUrl} />

      <div className="bg-base-200 rounded-xl shadow-2xl p-6 flex gap-12 items-center w-full max-w-5xl border border-base-300">
        <div className="flex flex-col items-center w-64">
          <div
            className="relative w-56 h-56 cursor-pointer rounded-xl overflow-hidden border-2 border-base-300 shadow-xl"
            onClick={handleImageClick}
          >
            <img
              src={preview || currentImage}
              alt={consoleItem.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/img/no-image.png";
              }}
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

        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Editar consola</h2>

          <div>
            <label className="block font-semibold">Nombre</label>
            <input
              className="input input-bordered w-full"
              name="name"
              defaultValue={consoleItem.name}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Fabricante</label>
            <input
              className="input input-bordered w-full"
              name="manufacturer"
              defaultValue={consoleItem.manufacturer}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Fecha de lanzamiento</label>
            <input
              className="input input-bordered w-full"
              name="releaseDate"
              type="date"
              defaultValue={releaseDateValue}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Descripcion</label>
            <textarea
              className="textarea textarea-bordered w-full min-h-32"
              name="description"
              defaultValue={consoleItem.description}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
