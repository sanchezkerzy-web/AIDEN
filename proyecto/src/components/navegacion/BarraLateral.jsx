"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  Sprout,
  GitBranch,
  Thermometer,
  ShieldCheck,
  CircleDollarSign,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard/admin", icon: <LayoutDashboard size={18} /> },
  { label: "Inventario", path: "/inventario", icon: <Package size={18} /> },
  { label: "Producción", path: "/produccion", icon: <Sprout size={18} /> },
  { label: "Trazabilidad", path: "/trazabilidad", icon: <GitBranch size={18} /> },
  { label: "Ambiental", path: "/ambiental", icon: <Thermometer size={18} /> },
  { label: "Calidad", path: "/calidad", icon: <ShieldCheck size={18} /> },
  { label: "Costos", path: "/costos", icon: <CircleDollarSign size={18} /> },
  { label: "Personal", path: "/personal", icon: <Users size={18} /> },
  { label: "Reportes", path: "/reportes", icon: <BarChart3 size={18} /> },
  { label: "Configuración", path: "/configuracion", icon: <Settings size={18} /> },
];

export default function BarraLateral() {
  const [colapsado, setColapsado] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`flex flex-col bg-white border-r border-[#E5EDE8] h-full relative transition-all duration-200 ease-in-out shrink-0 ${
        colapsado ? "w-16" : "w-60"
      }`}
    >
      {/* Encabezado */}
      <header className="flex items-center px-4 h-16 min-h-[64px] border-b border-[#E5EDE8]">
        {!colapsado ? (
          <section className="flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Leaf size={16} />
            </span>

            <span className="font-bold text-emerald-700 text-lg tracking-tight font-sans">
              AiDEN
            </span>
          </section>
        ) : (
          <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white mx-auto">
            <Leaf size={16} />
          </span>
        )}
      </header>

      {/* Menú de navegación */}
      <nav
        aria-label="Menú principal"
        className="flex-1 px-3 py-4 space-y-1 overflow-y-auto"
      >
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.label === "Dashboard"
                ? pathname.startsWith("/dashboard")
                : pathname === item.path ||
                  pathname.startsWith(`${item.path}/`);

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  title={colapsado ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    colapsado ? "justify-center" : "justify-start"
                  } ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 font-medium"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>

                  {!colapsado && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Botón para contraer o expandir */}
      <button
        type="button"
        onClick={() => setColapsado(!colapsado)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-[#E5EDE8] rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors z-10"
        aria-label={
          colapsado
            ? "Expandir barra lateral"
            : "Colapsar barra lateral"
        }
      >
        {colapsado ? (
          <ChevronRight size={12} className="text-slate-500" />
        ) : (
          <ChevronLeft size={12} className="text-slate-500" />
        )}
      </button>
    </aside>
  );
}