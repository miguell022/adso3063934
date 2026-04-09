import { redirect } from "next/navigation";
import { AccountSettings } from "@stackframe/stack";
import { GearIcon, ShieldCheckIcon, UserCircleIcon } from "@phosphor-icons/react/dist/ssr";
import SideBar from "@/components/SideBar";
import { stackServerApp } from "@/stack/server";

export default async function SettingsPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <SideBar currentPath="/settings">
      <div className="min-h-screen bg-base-100 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="flex items-center gap-3 text-3xl font-bold text-white md:text-4xl">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 ring-1 ring-cyan-400/30">
                    <GearIcon size={28} weight="duotone" className="text-cyan-300" />
                  </span>
                  Settings
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
                  Administra la configuracion de tu cuenta, seguridad y preferencias
                  generales desde un solo lugar.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                  <UserCircleIcon size={18} weight="duotone" />
                  Cuenta activa
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                  <ShieldCheckIcon size={18} weight="duotone" />
                  Auth protegido
                </div>
              </div>
            </div>
          </div>

          {/* Main layout */}
          <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
            {/* Side info */}
            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-base-200 p-5 shadow-xl">
                <h2 className="text-lg font-semibold text-white">Panel de cuenta</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Aqui puedes actualizar la informacion principal de tu cuenta,
                  revisar tu acceso y mantener tu perfil al dia.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-base-200 p-5 shadow-xl">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Incluye
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-white/75">
                  <li>Datos del perfil</li>
                  <li>Correo y acceso</li>
                  <li>Configuracion de autenticacion</li>
                  <li>Preferencias de cuenta</li>
                </ul>
              </div>
            </aside>

            {/* Settings card */}
            <section className="rounded-3xl border border-white/10 bg-base-200/95 p-4 shadow-2xl md:p-6">
              <div className="mb-5 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-white">Account Settings</h2>
                <p className="mt-2 text-sm text-white/65">
                  Cambia la configuracion de autenticacion y administra tu perfil.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-base-100/80 p-3 md:p-5">
                <AccountSettings />
              </div>
            </section>
          </div>
        </div>
      </div>
    </SideBar>
  );
}
