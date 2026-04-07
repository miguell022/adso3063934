"use client";
import React, { useRef, useState } from "react";

type Game = {
  id: number;
  cover: string;
  title: string;
  price: number;
  developer: string;
  console_id: number;
  console?: { id: number; name: string };
};

type Console = {
  id: number;
  name: string;
};

export default function EditGameForm({ game, consoles = [] }: { game: Game; consoles?: Console[] }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const currentImage = !game.cover || game.cover === "no-image.png"
    ? "/img/no-image.png"
    : game.cover.startsWith("/img/")
      ? game.cover
      : `/img/games/${game.cover}`;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-base-200 rounded-xl shadow-2xl p-6 flex gap-12 items-center w-full max-w-5xl border border-base-300">
        {/* Imagen a la izquierda */}
        <div className="flex flex-col items-center w-64">
          <div
            className="relative cursor-pointer group"
            onClick={handleImageClick}
          >
            <img
              src={preview || currentImage}
              alt={game.title}
              className="rounded-lg object-cover w-56 h-72 border-2 border-base-300 shadow-xl group-hover:opacity-80 transition"
              onError={e => (e.currentTarget.src = "/img/no-image.png")}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 rounded-lg">
              <span className="text-white text-lg font-bold">Cambiar foto</span>
            </div>
          </div>
          {/* Input file oculto */}
          <input
            ref={fileInputRef}
            className="hidden"
            name="cover"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {/* Formulario a la derecha */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Editar juego</h2>
          <div>
            <label className="block font-semibold">Título</label>
            <input
              className="input input-bordered w-full"
              name="title"
              defaultValue={game.title}
            />
          </div>
          <div>
            <label className="block font-semibold">Consola</label>
            <select
              className="select select-bordered w-full"
              name="console_id"
              defaultValue={game.console_id}
              required
            >
              <option value="" disabled>
                Selecciona una consola
              </option>
              {consoles.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">Precio</label>
            <input
              className="input input-bordered w-full"
              name="price"
              type="number"
              step="0.01"
              defaultValue={game.price}
            />
          </div>
          <div>
            <label className="block font-semibold">Desarrollador</label>
            <input
              className="input input-bordered w-full"
              name="developer"
              defaultValue={game.developer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}