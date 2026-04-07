import { stackServerApp } from "@/stack/server";
import { PrismaClient } from "@/src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";
import DashboardCharts from "@/components/DashboardCharts";

// Cliente de Prisma conectado a Neon para consultar los datos del dashboard.
const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

export default async function DashboardPage() {
  // Protege el dashboard: si no hay usuario autenticado, vuelve al inicio.
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  // Carga en paralelo los juegos y el total de consolas para mostrar metricas.
  const [games, consoles] = await Promise.all([
    prisma.games.findMany({
      select: {
        id: true,
        releaseDate: true,
        console: {
          select: {
            name: true,
          },
        },
      },
    }),
    prisma.console.count(),
  ]);

  // Estos mapas ayudan a agrupar cuantos juegos hay por consola y por año.
  const gamesPerConsoleMap = new Map<string, number>();
  const gamesPerYearMap = new Map<string, number>();

  for (const game of games) {
    const consoleName = game.console.name;
    gamesPerConsoleMap.set(consoleName, (gamesPerConsoleMap.get(consoleName) || 0) + 1);

    const year = new Date(game.releaseDate).getFullYear().toString();
    gamesPerYearMap.set(year, (gamesPerYearMap.get(year) || 0) + 1);
  }

  // Recharts trabaja mejor con arreglos de objetos que con Maps.
  const gamesPerConsole = Array.from(gamesPerConsoleMap.entries()).map(([console, total]) => ({
    console,
    total,
  }));

  // Ordenamos los años para que la grafica de barras salga en secuencia.
  const gamesPerYear = Array.from(gamesPerYearMap.entries())
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([year, total]) => ({
      year,
      total,
    }));

  return (
    <SideBar currentPath={"/dashboard"}>
      <div className="space-y-8 p-2">
        <section className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight">Dashboard</h1>
          <p className="text-base-content/70">
            Resumen general de juegos, consolas y distribucion por consola.
          </p>
        </section>

        {/* Tarjetas resumen con los indicadores principales del sistema. */}
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-2xl border border-base-300 bg-gradient-to-br from-emerald-500/20 to-emerald-900/10 p-6 shadow-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Total Games</p>
            <p className="mt-3 text-5xl font-black text-white">{games.length}</p>
          </article>

          <article className="rounded-2xl border border-base-300 bg-gradient-to-br from-cyan-500/20 to-cyan-900/10 p-6 shadow-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Total Consoles</p>
            <p className="mt-3 text-5xl font-black text-white">{consoles}</p>
          </article>

          <article className="rounded-2xl border border-base-300 bg-gradient-to-br from-violet-500/20 to-violet-900/10 p-6 shadow-xl md:col-span-2 xl:col-span-1">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Avg Games / Console</p>
            <p className="mt-3 text-5xl font-black text-white">
              {consoles > 0 ? (games.length / consoles).toFixed(1) : "0"}
            </p>
          </article>
        </section>

        {/* Este componente cliente recibe los datos ya agrupados y dibuja las graficas. */}
        <DashboardCharts
          gamesPerConsole={gamesPerConsole}
          gamesPerYear={gamesPerYear}
        />
      </div>
    </SideBar>
  );
}
