
"use client";

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
  ChartColumn,
  Settings,
  Leaf,
} from "lucide-react";

const menu = [
  { nombre: "Dashboard", ruta: "/dashboard/admin", icono: LayoutDashboard },
  { nombre: "Inventario", ruta: "/inventario", icono: Package },
  { nombre: "Producción", ruta: "/produccion", icono: Sprout },
  { nombre: "Trazabilidad", ruta: "/trazabilidad", icono: GitBranch },
  { nombre: "Ambiental", ruta: "/ambiental", icono: Thermometer },
  { nombre: "Calidad", ruta: "/calidad", icono: ShieldCheck },
  { nombre: "Costos", ruta: "/costos", icono: CircleDollarSign },
  { nombre: "Personal", ruta: "/personal", icono: Users },
  { nombre: "Reportes", ruta: "/reportes", icono: ChartColumn },
  { nombre: "Configuración", ruta: "/configuracion", icono: Settings },
];

export default function ConfiguracionLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#009966] text-white">
            <Leaf size={21} />
          </div>
          <span className="text-xl font-bold text-[#009966]">AiDEN</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {menu.map((item) => {
            const Icon = item.icono;
            const activo = pathname === item.ruta;

            return (
              <Link
                key={item.ruta}
                href={item.ruta}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  activo
                    ? "bg-[#ECFDF5] font-semibold text-[#009966]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#009966]"
                }`}
              >
                <Icon size={19} />
                {item.nombre}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
}
