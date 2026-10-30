"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Sprout,
  Package,
  AlertTriangle,
  TrendingUp,
  Activity,
  Clock,
  House,
} from "lucide-react";

import { useRouter } from "next/navigation";


// Datos de producción
const productionData = [
  { mes: "Mar", lotes: 38, cosecha: 24 },
  { mes: "Abr", lotes: 42, cosecha: 31 },
  { mes: "May", lotes: 45, cosecha: 37 },
  { mes: "Jun", lotes: 51, cosecha: 40 },
  { mes: "Jul", lotes: 48, cosecha: 43 },
  { mes: "Ago", lotes: 53, cosecha: 46 },
];

// Datos del inventario
const inventoryData = [
  { cat: "Sustrato", stock: 87 },
  { cat: "Semillas", stock: 62 },
  { cat: "Fertiliz.", stock: 45 },
  { cat: "Macetas", stock: 91 },
  { cat: "Herram.", stock: 78 },
];

// Actividades recientes
const activities = [
  {
    time: "08:15",
    user: "Luis Torres",
    action: "Registró siembra en lote LT-2024-091",
    type: "success",
  },
  {
    time: "09:30",
    user: "Ana Ruiz",
    action: "Alerta: temperatura alta en Invernadero 2",
    type: "warning",
  },
  {
    time: "10:45",
    user: "Pedro Vargas",
    action: "Actualización de stock: Sustrato Premium",
    type: "info",
  },
  {
    time: "11:20",
    user: "Sistema",
    action: "Lote LT-2024-078 completó etapa de germinación",
    type: "success",
  },
  {
    time: "12:05",
    user: "Ana Ruiz",
    action: "Incidencia de calidad registrada en rosa roja",
    type: "danger",
  },
];

// Alertas
const alerts = [
  {
    msg: "Temperatura elevada · Invernadero 2 (32°C)",
    sev: "Alta",
    color: "bg-red-100 text-red-700",
  },
  {
    msg: "Stock bajo · Sustrato Premium (15% del mínimo)",
    sev: "Media",
    color: "bg-amber-100 text-amber-700",
  },
];

export default function DashboardSupervisor() {
  const router = useRouter();

  // Indicadores principales
  const kpis = [
    {
      label: "Lotes Activos",
      value: "48",
      change: "+3 esta semana",
      icon: <Sprout size={20} />,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    },
    {
      label: "Inventario Disponible",
      value: "94%",
      change: "2 items bajo mínimo",
      icon: <Package size={20} />,
      color: "text-emerald-600",
      bg: "bg-[#E9F5EF]",
    },
    {
      label: "Producción Mensual",
      value: "1,240",
      change: "+8% vs. mes anterior",
      icon: <TrendingUp size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Alertas Pendientes",
      value: "2",
      change: "1 crítica, 1 media",
      icon: <AlertTriangle size={20} />,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <article className="space-y-6">

      {/* Encabezado */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <section>
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard · Supervisor
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Jueves 29 de octubre, 2026 · Turno mañana
          </p>
        </section>
        
       <section className="flex items-center gap-4">
                  
         <button
           type="button"
           onClick={() => router.push("/reportes")}
           className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
         >
           <Activity size={15} />
           Ver Reportes
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

      {/* Indicadores principales */}
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <article
            key={kpi.label}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
          >
            <header className="flex items-start justify-between mb-4">
              <span
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.bg} ${kpi.color}`}
              >
                {kpi.icon}
              </span>
            </header>

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

      {/* Gráficas */}
      <section className="grid lg:grid-cols-3 gap-6">

        {/* Producción mensual */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-2">
          <header className="flex items-center justify-between mb-5">
            <section>
              <p className="font-semibold text-slate-800">
                Producción Mensual
              </p>

              <p className="text-xs text-slate-500 mt-0.5">
                Lotes activos vs. cosechas realizadas
              </p>
            </section>
          </header>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={productionData}>
              <defs>
                <linearGradient
                  id="gLotes"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#0A4F31"
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="95%"
                    stopColor="#0A4F31"
                    stopOpacity={0}
                  />
                </linearGradient>

                <linearGradient
                  id="gCosecha"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#157347"
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="95%"
                    stopColor="#157347"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5EDE8"
              />

              <XAxis
                dataKey="mes"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
              />

              <Area
                type="monotone"
                dataKey="lotes"
                stroke="#0A4F31"
                strokeWidth={2}
                fill="url(#gLotes)"
                name="Lotes"
              />

              <Area
                type="monotone"
                dataKey="cosecha"
                stroke="#157347"
                strokeWidth={2}
                fill="url(#gCosecha)"
                name="Cosechas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        {/* Stock por categoría */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <p className="font-semibold text-slate-800 mb-1">
            Stock por Categoría
          </p>

          <p className="text-xs text-slate-500 mb-5">
            Porcentaje disponible
          </p>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={inventoryData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5EDE8"
                horizontal={false}
              />

              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
              />

              <YAxis
                dataKey="cat"
                type="category"
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                width={60}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
                formatter={(v) => [`${v}%`, "Stock"]}
              />

              <Bar
                dataKey="stock"
                fill="#0A4F31"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </section>

      {/* Actividades y alertas */}
      <section className="grid lg:grid-cols-3 gap-6">

        {/* Actividades recientes */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-2">
          <p className="font-semibold text-slate-800 mb-5">
            Actividades Recientes
          </p>

          <section className="space-y-0">
            {activities.map((act, i) => (
              <article
                key={i}
                className="flex gap-4 py-3 border-b border-slate-100 last:border-0 group"
              >
                <section className="flex flex-col items-center">
                  <span
                    className="block w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{
                      background:
                        act.type === "success"
                          ? "#16A34A"
                          : act.type === "warning"
                          ? "#D97706"
                          : act.type === "danger"
                          ? "#DC2626"
                          : "#2563EB",
                    }}
                  />

                  {i < activities.length - 1 && (
                    <span className="block w-px flex-1 bg-slate-200 mt-1" />
                  )}
                </section>

                <section className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">
                    {act.action}
                  </p>

                  <section className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500 font-medium">
                      {act.user}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock size={11} />
                      {act.time}
                    </span>
                  </section>
                </section>
              </article>
            ))}
          </section>
        </section>

        {/* Alertas activas */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <p className="font-semibold text-slate-800 mb-5">
            Alertas Activas
          </p>

          <section className="space-y-3">
            {alerts.map((a, i) => (
              <article
                key={i}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <header className="flex items-start justify-between gap-2 mb-2">
                  <AlertTriangle
                    size={15}
                    className="text-amber-500 shrink-0 mt-0.5"
                  />

                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ml-auto ${a.color}`}
                  >
                    {a.sev}
                  </span>
                </header>

                <p className="text-sm text-slate-700 leading-snug">
                  {a.msg}
                </p>
              </article>
            ))}

            <button
              type="button"
              onClick={() => router.push("/calidad")}
              className="w-full mt-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors"
            >
              Ver todas las alertas
            </button>
          </section>
        </section>
      </section>
    </article>
  );
}