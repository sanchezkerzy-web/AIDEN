"use client";

import {
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Shield,
} from "lucide-react";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function BarraSuperior() {
  const router = useRouter();
  const pathname = usePathname();

  const [showProfile, setShowProfile] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  // Identificar el rol según la ruta actual
  const role = pathname.includes("/supervisor")
    ? "supervisor"
    : pathname.includes("/operario")
    ? "operario"
    : "admin";

  const roleLabel = {
    admin: "Administrador",
    supervisor: "Supervisor",
    operario: "Operario",
  }[role];

  const userName = {
    admin: "Ana García",
    supervisor: "Carlos Méndez",
    operario: "Luis Torres",
  }[role];

  const notifs = [
    {
      id: 1,
      text: "Alerta de temperatura en Invernadero 2",
      time: "hace 5 min",
    },
    {
      id: 2,
      text: "Lote LT-2024-089 listo para cosecha",
      time: "hace 22 min",
    },
    {
      id: 3,
      text: "Stock bajo: Sustrato Premium < mínimo",
      time: "hace 1 h",
    },
  ];

  // Cambiar de dashboard según el rol
  const cambiarRol = (nuevoRol) => {
    const rutas = {
      admin: "/dashboard/admin",
      supervisor: "/dashboard/supervisor",
      operario: "/dashboard/operario",
    };

    setShowProfile(false);
    router.push(rutas[nuevoRol]);
  };

  return (
    <header className="h-16 bg-white border-b border-[#E5EDE8] flex items-center justify-between px-6 shrink-0 relative z-20">

      {/* Buscador */}
      <section className="flex items-center gap-3">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative"
        >
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            className="pl-9 pr-3 py-1.5 w-64 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
            placeholder="Buscar módulos, lotes, empleados..."
          />
        </form>
      </section>

      {/* Notificaciones y perfil */}
      <section className="flex items-center gap-3">

        {/* Notificaciones */}
        <section className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifs(!showNotifs);
              setShowProfile(false);
            }}
            className="relative w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
            aria-label="Notificaciones"
          >
            <Bell size={18} className="text-slate-500" />

            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {showNotifs && (
            <section className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-xl py-2 shadow-lg z-30">

              <header className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Notificaciones
                </p>
              </header>

              <ul className="divide-y divide-slate-100">
                {notifs.map((n) => (
                  <li
                    key={n.id}
                    className="px-4 py-3 hover:bg-slate-50 cursor-pointer"
                  >
                    <p className="text-sm text-slate-700 leading-snug">
                      {n.text}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {n.time}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>

        {/* Perfil del usuario */}
        <section className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifs(false);
            }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span className="w-7 h-7 bg-emerald-600 rounded-full flex items-center justify-center text-white">
              <User size={14} />
            </span>

            <section className="text-left hidden sm:block">
              <p className="text-sm font-medium text-slate-800 leading-none">
                {userName}
              </p>

              <p className="text-xs text-slate-400 mt-0.5">
                {roleLabel}
              </p>
            </section>

            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {showProfile && (
            <section className="absolute right-0 top-12 w-52 bg-white border border-slate-200 rounded-xl py-2 shadow-lg z-30">

              <header className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-medium text-slate-500">
                  Cambiar rol (demo)
                </p>
              </header>

              <nav aria-label="Selector de roles">
                <ul className="py-1">
                  {["admin", "supervisor", "operario"].map((r) => (
                    <li key={r}>
                      <button
                        type="button"
                        onClick={() => cambiarRol(r)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 ${
                          role === r
                            ? "text-emerald-600 font-semibold"
                            : "text-slate-700"
                        }`}
                      >
                        <Shield size={14} />

                        {r === "admin"
                          ? "Administrador"
                          : r === "supervisor"
                          ? "Supervisor"
                          : "Operario"}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Cerrar sesión */}
              <footer className="border-t border-slate-100 pt-1 mt-1">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                >
                  <LogOut size={14} />
                  Cerrar sesión
                </button>
              </footer>

            </section>
          )}
        </section>
      </section>
    </header>
  );
}