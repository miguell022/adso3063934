"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type GamesPerConsole = {
  console: string;
  total: number;
};

type GamesPerYear = {
  year: string;
  total: number;
};

// Paleta simple para repartir colores entre las porciones del grafico circular.
const COLORS = ["#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function DashboardCharts({
  gamesPerConsole,
  gamesPerYear,
}: {
  gamesPerConsole: GamesPerConsole[];
  gamesPerYear: GamesPerYear[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-base-300 bg-base-200 p-5 shadow-xl">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Juegos por consola</h2>
          <p className="text-sm text-base-content/70">
            Distribucion actual de juegos registrados por consola.
          </p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Grafica circular: muestra cuantos juegos tiene cada consola. */}
              <Pie
                data={gamesPerConsole}
                dataKey="total"
                nameKey="console"
                innerRadius={55}
                outerRadius={100}
                paddingAngle={3}
              >
                {gamesPerConsole.map((entry, index) => (
                  <Cell key={entry.console} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "0.75rem",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-2xl border border-base-300 bg-base-200 p-5 shadow-xl">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Juegos por año</h2>
          <p className="text-sm text-base-content/70">
            Cantidad de juegos segun su fecha de lanzamiento.
          </p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {/* Grafica de barras: compara cuantos juegos hay en cada año. */}
            <BarChart data={gamesPerYear}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis allowDecimals={false} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "0.75rem",
                  color: "#fff",
                }}
              />
              <Bar dataKey="total" radius={[10, 10, 0, 0]} fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
