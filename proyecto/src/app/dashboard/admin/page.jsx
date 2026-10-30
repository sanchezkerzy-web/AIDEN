"use client";

import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Users,
  Shield,
  Activity,
  AlertTriangle,
  Sprout,
  TrendingUp,
  Settings,
  Eye,
  UserCheck,
  House,
} from "lucide-react";

import { useRouter } from "next/navigation";
import Link from "next/link";

// Datos de ingresos y costos
const revenueData = [
  { mes: "Mar", ingresos: 84000, costos: 52000 },
  { mes: "Abr", ingresos: 91000, costos: 58000 },
  { mes: "May", ingresos: 88000, costos: 54000 },
  { mes: "Jun", ingresos: 102000, costos: 61000 },
  { mes: "Jul", ingresos: 97000, costos: 59000 },
  { mes: "Ago", ingresos: 115000, costos: 68000 },
];

// Usuarios por rol
const roleData = [
  { name: "Supervisores", value: 5, color: "#0A4F31" },
  { name: "Operarios", value: 18, color: "#157347" },
  { name: "Admins", value: 2, color: "#E9F5EF" },
];

// Registro de auditoría
const auditLog = [
  {
    user: "Ana García",
    action: "Modificó rol de Carlos Méndez → Supervisor",
    time: "hace 12 min",
  },
  {
    user: "Sistema",
    action: "Backup automático completado exitosamente",
    time: "hace 1 h",
  },
  {
    user: "Ana García",
    action: "Creó usuario: Valentina Soto (Operaria)",
    time: "hace 2 h",
  },
  {
    user: "Carlos Méndez",
    action: "Exportó reporte mensual de producción",
    time: "hace 3 h",
  },
  {
    user: "Sistema",
    action: "Alerta de temperatura resuelta automáticamente",
    time: "hace 5 h",
  },
];

// Uso de los módulos
const moduleUsage = [
  { mod: "Producción", uso: 92 },
  { mod: "Inventario", uso: 85 },
  { mod: "Ambiental", uso: 71 },
  { mod: "Calidad", uso: 63 },
  { mod: "Personal", uso: 55 },
  { mod: "Costos", uso: 48 },
];

export default function DashboardAdmin() {
  const router = useRouter();

  // Información de las tarjetas principales
  const kpis = [
    {
      label: "Usuarios Activos",
      value: "25",
      change: "+2 este mes",
      icon: <Users size={20} />,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    },
    {
      label: "Lotes en Sistema",
      value: "48",
      change: "94% con trazabilidad",
      icon: <Sprout size={20} />,
      color: "text-emerald-600",
      bg: "bg-[#E9F5EF]",
    },
    {
      label: "Ingresos del Mes",
      value: "$115K",
      change: "+18.5% vs. anterior",
      icon: <TrendingUp size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Alertas Sistema",
      value: "2",
      change: "Revisión requerida",
      icon: <AlertTriangle size={20} />,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <article className="space-y-6">

      {/* ENCABEZADO */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <section>
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard · Administrador
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Vista general del sistema AiDEN · Agosto 2026
          </p>
        </section>

        <section className="flex gap-2">

           
          <button
            type="button"
            onClick={() => router.push("/configuracion")}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <Settings size={15} />
            Configuración
          </button>

          <button
            type="button"
            onClick={() => router.push("/reportes")}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <Activity size={15} />
            Reportes
          </button>
           <button
             type="button"
              onClick={() => router.push("/")}
             className="px-4 py-2 bg-emerald-600 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
            >
             <House size={15} />
             Volver al inicio
            </button>

        </section>
      </header>

      {/* TARJETAS PRINCIPALES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {kpis.map((kpi) => (
          <article
            key={kpi.label}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
          >

            <span
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${kpi.bg} ${kpi.color}`}
            >
              {kpi.icon}
            </span>

            <p className="text-2xl font-bold text-slate-800 font-sans">
              {kpi.value}
            </p>

            <p className="text-sm text-slate-500 mt-0.5">
              {kpi.label}
            </p>

            <p className="text-xs text-slate-400 mt-2 border-t border-slate-100 pt-2">
              {kpi.change}
            </p>

          </article>
        ))}

      </section>

      {/* GRÁFICAS PRINCIPALES */}
      <section className="grid lg:grid-cols-3 gap-6">

        {/* INGRESOS Y COSTOS */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-2">

          <p className="font-semibold text-slate-800 mb-1">
            Ingresos vs. Costos
          </p>

          <p className="text-xs text-slate-500 mb-5">
            Últimos 6 meses (COP)
          </p>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>

              <defs>
                <linearGradient id="gIng" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0A4F31" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0A4F31" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="gCos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#E5EDE8" />

              <XAxis
                dataKey="mes"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v / 1000}K`}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
                formatter={(v) => [`$${(v / 1000).toFixed(0)}K`]}
              />

              <Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} />

              <Area
                type="monotone"
                dataKey="ingresos"
                stroke="#0A4F31"
                strokeWidth={2}
                fill="url(#gIng)"
                name="Ingresos"
              />

              <Area
                type="monotone"
                dataKey="costos"
                stroke="#DC2626"
                strokeWidth={2}
                fill="url(#gCos)"
                name="Costos"
              />

            </AreaChart>
          </ResponsiveContainer>

        </section>

        {/* USUARIOS POR ROL */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

          <p className="font-semibold text-slate-800 mb-1">
            Usuarios por Rol
          </p>

          <p className="text-xs text-slate-500 mb-4">
            25 usuarios totales
          </p>

          <figure className="flex justify-center">

            <PieChart width={160} height={160}>

              <Pie
                data={roleData}
                cx={75}
                cy={75}
                innerRadius={45}
                outerRadius={70}
                dataKey="value"
                paddingAngle={3}
              >

                {roleData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}

              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
              />

            </PieChart>

          </figure>

          <section className="space-y-2 mt-2">

            {roleData.map((r) => (
              <article
                key={r.name}
                className="flex items-center justify-between text-sm"
              >

                <section className="flex items-center gap-2">

                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      background:
                        r.color === "#E9F5EF" ? "#0A4F31" : r.color,
                      border:
                        r.color === "#E9F5EF"
                          ? "1px solid #C8E0D4"
                          : "none",
                    }}
                  />

                  <span className="text-slate-500 text-xs">
                    {r.name}
                  </span>

                </section>

                <span className="font-medium text-slate-800 text-xs">
                  {r.value}
                </span>

              </article>
            ))}

          </section>

        </section>

      </section>

      {/* AUDITORÍA Y USO DE MÓDULOS */}
      <section className="grid lg:grid-cols-5 gap-6">

        {/* REGISTRO DE AUDITORÍA */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-3">

          <header className="flex items-center gap-2 mb-5">

            <Shield size={16} className="text-emerald-700" />

            <p className="font-semibold text-slate-800">
              Registro de Auditoría
            </p>

          </header>

          <section className="space-y-0">

            {auditLog.map((log, i) => (
              <article
                key={i}
                className="flex gap-3 py-3 border-b border-slate-100 last:border-0"
              >

                <span className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">

                  <UserCheck size={13} className="text-emerald-700" />

                </span>

                <section className="flex-1 min-w-0">

                  <p className="text-sm text-slate-700">
                    {log.action}
                  </p>

                  <section className="flex items-center gap-3 mt-0.5">

                    <span className="text-xs font-medium text-emerald-700">
                      {log.user}
                    </span>

                    <span className="text-xs text-slate-400">
                      {log.time}
                    </span>

                  </section>

                </section>

              </article>
            ))}

          </section>

          <button
            type="button"
            onClick={() => router.push("/configuracion")}
            className="w-full mt-4 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >

            <Eye size={13} />
            Ver auditoría completa

          </button>

        </section>

        {/* USO DE MÓDULOS */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-2">

          <p className="font-semibold text-slate-800 mb-1">
            Uso de Módulos
          </p>

          <p className="text-xs text-slate-500 mb-5">
            Actividad relativa este mes
          </p>

          <ResponsiveContainer width="100%" height={220}>

            <BarChart data={moduleUsage} layout="vertical">

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5EDE8"
                horizontal={false}
              />

              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />

              <YAxis
                dataKey="mod"
                type="category"
                tick={{ fontSize: 10, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                width={65}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 11,
                }}
                formatter={(v) => [`${v}%`, "Uso"]}
              />

              <Bar
                dataKey="uso"
                fill="#157347"
                radius={[0, 4, 4, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </section>

      </section>

    </article>
  );
}