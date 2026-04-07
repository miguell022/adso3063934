"use client";

type Console = {
  id: number;
  name: string;
  image: string;
  manufacturer: string;
  description: string;
  releaseDate: Date | string;
};

export default function EditConsoleForm({ consoleItem }: { consoleItem: Console }) {
  const releaseDateValue =
    typeof consoleItem.releaseDate === "string"
      ? consoleItem.releaseDate.slice(0, 10)
      : new Date(consoleItem.releaseDate).toISOString().slice(0, 10);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-base-200 rounded-xl shadow-2xl p-6 flex gap-12 items-center w-full max-w-5xl border border-base-300">
        <div className="flex flex-col items-center w-64">
          <div className="relative w-56 h-56 rounded-xl overflow-hidden border-2 border-base-300 shadow-xl">
            <img
              src={
                !consoleItem.image || consoleItem.image === "no-image.png"
                  ? "/img/no-image.png"
                  : `/img/consoles/${consoleItem.image}`
              }
              alt={consoleItem.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/img/no-image.png";
              }}
            />
          </div>
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
            <label className="block font-semibold">Imagen</label>
            <input
              className="input input-bordered w-full"
              name="image"
              defaultValue={consoleItem.image}
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
