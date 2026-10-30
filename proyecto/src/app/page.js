"use client";

import {
  Leaf,
  Package,
  Sprout,
  GitBranch,
  Thermometer,
  ShieldCheck,
  CircleDollarSign,
  Users,
  FileText,
  ArrowRight,
  CheckCircle2,
  Shield,
  Eye,
  Database,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Inicio() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const modules = [
    { icon: <Package size={20} />, name: "Inventario", desc: "Control de stock, entradas y salidas con alertas de mínimos." },
    { icon: <Sprout size={20} />, name: "Producción", desc: "Gestión de lotes, etapas de crecimiento y responsables." },
    { icon: <Thermometer size={20} />, name: "Ambiental", desc: "Monitoreo de sensores, temperatura, humedad y luminosidad." },
    { icon: <ShieldCheck size={20} />, name: "Calidad", desc: "Sistema de incidencias con severidad, estado y seguimiento." },
    { icon: <GitBranch size={20} />, name: "Trazabilidad", desc: "Timeline completo de eventos e historial por lote." },
    { icon: <CircleDollarSign size={20} />, name: "Costos", desc: "Dashboard financiero con centros de costo y gastos por lote." },
    { icon: <Users size={20} />, name: "Personal", desc: "Empleados, roles, tareas asignadas y desempeño operativo." },
    { icon: <FileText size={20} />, name: "Reportes", desc: "Biblioteca de reportes con exportación PDF/Excel y KPIs." },
  ];

  const roles = [
    {
      role: "admin",
      title: "Administrador",
      color: "#0A4F31",
      bg: "#E9F5EF",
      path: "/dashboard/admin",
      features: ["Gestión de usuarios y roles", "Auditoría completa del sistema", "Configuración avanzada", "Acceso a todos los módulos", "Reportes estratégicos"],
    },
    {
      role: "supervisor",
      title: "Supervisor",
      color: "#157347",
      bg: "#F0FDF4",
      path: "/dashboard/supervisor",
      features: ["Dashboard operativo completo", "Gestión de lotes y producción", "Control de inventario", "Monitoreo ambiental", "Incidencias de calidad"],
    },
    {
      role: "operario",
      title: "Operario",
      color: "#2563EB",
      bg: "#EFF6FF",
      path: "/dashboard/operario",
      features: ["Tareas del día asignadas", "Registro de actividades", "Lotes a cargo", "Incidencias propias", "Producción personal"],
    },
  ];

  return (
    <article className="min-h-full bg-white font-sans text-slate-800">
      {/* Navegación Superior */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <section className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <section className="flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center text-white">
              <Leaf size={16} />
            </span>
            <span className="font-bold text-emerald-800 text-xl tracking-tight">
              AiDEN
            </span>
          </section>

          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">
              Inicio
            </a>
            <a href="#que-es" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">
              ¿Qué es?
            </a>
            <a href="#modulos" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">
              Módulos
            </a>
            <a href="#acceso" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors">
              Acceso
            </a>
          </nav>

          <section className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/registro"
              className="px-4 py-2 bg-emerald-700 rounded-lg text-sm font-semibold text-white hover:bg-emerald-800 transition-colors"
            >
              Registrarse
            </Link>
          </section>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </section>

        {mobileMenuOpen && (
          <nav aria-label="Navegación móvil" className="md:hidden px-6 pb-4 border-t border-slate-200 pt-4 space-y-2 bg-white">
            <a href="#inicio" className="block py-2 text-sm text-slate-600 hover:text-emerald-700">
              Inicio
            </a>
            <a href="#que-es" className="block py-2 text-sm text-slate-600 hover:text-emerald-700">
              ¿Qué es?
            </a>
            <a href="#modulos" className="block py-2 text-sm text-slate-600 hover:text-emerald-700">
              Módulos
            </a>
            <a href="#acceso" className="block py-2 text-sm text-slate-600 hover:text-emerald-700">
              Acceso
            </a>
            <section className="flex gap-3 pt-2">
              <Link
                href="/login"
                className="flex-1 text-center py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/registro"
                className="flex-1 text-center py-2 bg-emerald-700 rounded-lg text-sm font-semibold text-white"
              >
                Registrarse
              </Link>
            </section>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="bg-slate-50 border-b border-slate-200">
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <section className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-emerald-800">AiDEN</span>
          </section>

          <section className="grid lg:grid-cols-2 gap-16 items-center">
            <section>
              <h1 className="text-5xl font-bold text-slate-900 leading-[1.1] mb-6">
                AiDEN organiza la{" "}
                <span className="text-emerald-700">operación diaria</span>{" "}
                del vivero
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                Control integral de lotes, inventario, costos, alertas, personal y trazabilidad.
                Toda la gestión de tu vivero agrícola en una plataforma moderna e inteligente.
              </p>

              <section className="flex flex-wrap gap-3 mb-12">
                <Link
                  href="/login"
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-sm flex items-center gap-2 transition-colors"
                >
                  Iniciar Sesión
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/dashboard"
                  className="px-6 py-3 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-sm transition-colors"
                >
                  Ver Panel Demo
                </Link>
                <a
                  href="#modulos"
                  className="px-6 py-3 text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors flex items-center"
                >
                  Explorar Módulos ↓
                </a>
              </section>

              <section className="grid grid-cols-3 gap-6">
                {[
                  { value: "3", label: "Roles Demo" },
                  { value: "9", label: "Módulos Operativos" },
                  { value: "ERP", label: "Vivero Inteligente" },
                ].map((m) => (
                  <section key={m.label}>
                    <p className="text-2xl font-bold text-emerald-700">
                      {m.value}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">{m.label}</p>
                  </section>
                ))}
              </section>
            </section>

            <figure className="relative">
              <section className="bg-white border border-slate-200 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&h=500&fit=crop&auto=format"
                  alt="Panel de gestión de vivero AiDEN"
                  className="w-full h-64 object-cover"
                />
                <figcaption className="p-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Lotes Activos", value: "48", trend: "+3" },
                    { label: "Inventario", value: "94%", trend: "OK" },
                    { label: "Alertas", value: "2", trend: "↓" },
                  ].map((kpi) => (
                    <section key={kpi.label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <p className="text-xs text-slate-500">{kpi.label}</p>
                      <p className="text-xl font-bold text-slate-800 mt-1">
                        {kpi.value}
                      </p>
                      <span className="text-xs text-emerald-600 font-medium">{kpi.trend}</span>
                    </section>
                  ))}
                </figcaption>
              </section>
            </figure>
          </section>
        </section>
      </section>

      {/* Sección: Gestión Centralizada */}
      <section id="que-es" className="py-20 bg-white border-b border-slate-100">
        <section className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">
              Gestión Centralizada
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Todo lo que necesita tu vivero, en un solo lugar
            </h2>
          </header>

          <section className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Eye size={24} className="text-emerald-700" />,
                title: "Operación Visible",
                desc: "Monitorea en tiempo real el estado de lotes, inventarios, personal y condiciones ambientales desde un dashboard unificado.",
              },
              {
                icon: <Database size={24} className="text-emerald-600" />,
                title: "Recursos Controlados",
                desc: "Gestiona materiales, herramientas, insumos y presupuestos con alertas automáticas de stock mínimo y desvíos de costo.",
              },
              {
                icon: <Shield size={24} className="text-emerald-700" />,
                title: "Historial Consultable",
                desc: "Trazabilidad completa de cada lote: desde la siembra hasta la venta, con registros de inspecciones, incidencias y actividades.",
              },
            ].map((card) => (
              <section key={card.title} className="bg-white border border-slate-200 rounded-xl p-7 hover:shadow-md transition-shadow group">
                <span className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform inline-flex">
                  {card.icon}
                </span>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </section>
            ))}
          </section>
        </section>
      </section>

      {/* Sección: Módulos Operativos */}
      <section id="modulos" className="py-20 bg-slate-50 border-b border-slate-200">
        <section className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">
              Módulos Operativos
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              9 módulos diseñados para el vivero
            </h2>
          </header>

          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((mod) => (
              <section
                key={mod.name}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <span className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors inline-flex">
                  {mod.icon}
                </span>
                <h3 className="font-semibold text-slate-800 mb-2">{mod.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{mod.desc}</p>
              </section>
            ))}
          </section>
        </section>
      </section>

      {/* Sección: Acceso por Rol */}
      <section id="acceso" className="py-20 bg-white">
        <section className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-3">
              Acceso por Rol
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Cada usuario ve lo que necesita
            </h2>
          </header>

          <section className="grid md:grid-cols-3 gap-6">
            {roles.map((r) => (
              <section key={r.title} className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
                <section>
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 inline-flex"
                    style={{ background: r.bg }}
                  >
                    <Shield size={22} style={{ color: r.color }} />
                  </span>
                  <h3 className="text-xl font-bold mb-4" style={{ color: r.color }}>
                    {r.title}
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {r.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={14} style={{ color: r.color }} className="shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
                <button
                  type="button"
                  onClick={() => router.push(r.path)}
                  className="w-full py-2.5 px-4 border rounded-lg font-semibold text-sm transition-colors text-center"
                  style={{ borderColor: r.color + "40", color: r.color }}
                >
                  Ver demo como {r.title}
                </button>
              </section>
            ))}
          </section>
        </section>
      </section>

      {/* Pie de Página */}
      <footer className="bg-emerald-900 text-white py-16 border-t border-emerald-950">
        <section className="max-w-7xl mx-auto px-6">
          <section className="grid md:grid-cols-4 gap-10 mb-12">
            <section>
              <section className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Leaf size={16} className="text-white" />
                </span>
                <span className="font-bold text-xl">AiDEN</span>
              </section>
              <p className="text-sm text-white/70 leading-relaxed">
                Sistema ERP para gestión integral de viveros agrícolas. Inteligente, moderno y preparado para producción.
              </p>
            </section>

            {[
              {
                title: "Plataforma",
                links: ["Inicio", "¿Qué es AiDEN?", "Módulos", "Acceso Demo"],
              },
              {
                title: "Módulos",
                links: ["Inventario", "Producción", "Trazabilidad", "Ambiental", "Calidad"],
              },
              {
                title: "Acceso",
                links: ["Iniciar Sesión", "Registrarse", "Recuperar Contraseña"],
              },
            ].map((col) => (
              <section key={col.title}>
                <p className="font-semibold text-sm mb-4 text-white/90">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#inicio" className="text-sm text-white/60 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </section>

          <section className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © 2026 AiDEN · Artificial Intelligence for Nursery Management
            </p>
            <section className="flex gap-2">
              <Link
                href="/login"
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-white/80 transition-colors"
              >
                Acceso
              </Link>
            </section>
          </section>
        </section>
      </footer>
    </article>
  );
}