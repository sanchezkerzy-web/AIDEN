"use client";

import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sprout,
  ListChecks,
  Circle,
  House,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";


const tasks = [
  { id: 1, title: "Riego matutino · Invernadero A (Zona 1-3)", priority: "Alta", done: false, time: "08:00" },
  { id: 2, title: "Aplicar fungicida en lote LT-2024-089", priority: "Alta", done: true, time: "09:30" },
  { id: 3, title: "Trasplante de begonias · 40 unidades", priority: "Media", done: false, time: "10:00" },
  { id: 4, title: "Registro ambiental de tarde · Sensores 1-4", priority: "Baja", done: false, time: "15:00" },
  { id: 5, title: "Limpieza de herramientas y bodega", priority: "Baja", done: true, time: "16:30" },
];

const myLots = [
  { code: "LT-2024-089", species: "Rosa roja (Rosa canina)", stage: "Floración", progress: 85 },
  { code: "LT-2024-091", species: "Begonia bicolor", stage: "Trasplante", progress: 40 },
  { code: "LT-2024-094", species: "Crisantemo amarillo", stage: "Germinación", progress: 20 },
];

export default function DashboardOperario() {

  const router = useRouter();

  const [tasksDone, setTasksDone] = useState(
    tasks.map((task) => task.done)
  );

  const completed = tasksDone.filter(Boolean).length;

  const pct = Math.round((completed / tasks.length) * 100);

  return (
    <article className="space-y-6">

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <section>
         <h1 className="text-2xl font-bold text-slate-800">
           Mi Panel · Operario
         </h1>

         <p className="text-sm text-slate-500 mt-1">
           Jueves 29 de octubre, 2026 · Hola, Luis Torres
         </p>
       </section>
        <section className="flex flex-wrap gap-2">
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

      

      {/* Summary */}

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {[
          {
            label: "Tareas del Día",
            value: `${completed}/${tasks.length}`,
            icon: <ListChecks size={18} />,
            bg: "bg-emerald-50",
            color: "text-emerald-700"
          },
          {
            label: "Lotes a Cargo",
            value: "3",
            icon: <Sprout size={18} />,
            bg: "bg-emerald-50",
            color: "text-emerald-600"
          },
          {
            label: "Pendientes",
            value: String(tasks.length - completed),
            icon: <Clock size={18} />,
            bg: "bg-amber-50",
            color: "text-amber-600"
          },
          {
            label: "Incidencias",
            value: "1",
            icon: <AlertTriangle size={18} />,
            bg: "bg-red-50",
            color: "text-red-600"
          },
        ].map((kpi) => (

          <article
            key={kpi.label}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
          >

            <span className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${kpi.bg} ${kpi.color}`}>
              {kpi.icon}
            </span>

            <p className="text-2xl font-bold text-slate-800 font-sans">
              {kpi.value}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              {kpi.label}
            </p>

          </article>

        ))}

      </section>

      <section className="grid lg:grid-cols-5 gap-6">

        {/* Tasks */}

        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-3">

          <header className="flex items-center justify-between mb-4">

            <p className="font-semibold text-slate-800">
              Tareas de Hoy
            </p>

            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
              {pct}% completado
            </span>

          </header>

          <section className="w-full bg-slate-100 rounded-full h-1.5 mb-5">

            <span
              className="block bg-emerald-600 h-1.5 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />

          </section>

          <section className="space-y-0">

            {tasks.map((task, i) => (

              <article
                key={task.id}
                className="flex items-start gap-3 py-3.5 border-b border-slate-100 last:border-0 cursor-pointer group"
                onClick={() => {
                  const next = [...tasksDone];
                  next[i] = !next[i];
                  setTasksDone(next);
                }}
              >

                <span className="mt-0.5 shrink-0">

                  {tasksDone[i] ? (
                    <CheckCircle2
                      size={18}
                      className="text-emerald-500"
                    />
                  ) : (
                    <Circle
                      size={18}
                      className="text-slate-300 group-hover:text-emerald-500 transition-colors"
                    />
                  )}

                </span>

                <section className="flex-1 min-w-0">

                  <p className={`text-sm ${tasksDone[i] ? "line-through text-slate-400" : "text-slate-700"}`}>
                    {task.title}
                  </p>

                  <section className="flex items-center gap-3 mt-1">

                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={10} />
                      {task.time}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        task.priority === "Alta"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Media"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {task.priority}
                    </span>

                  </section>

                </section>

              </article>

            ))}

          </section>

        </section>

        {/* My Lots */}

        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm lg:col-span-2">

          <p className="font-semibold text-slate-800 mb-5">
            Mis Lotes
          </p>

          <section className="space-y-4">

            {myLots.map((lot) => (

              <article
                key={lot.code}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100"
              >

                <header className="flex items-start justify-between mb-2">

                  <section>

                    <p className="text-xs font-mono font-semibold text-emerald-700">
                      {lot.code}
                    </p>

                    <p className="text-sm text-slate-800 mt-0.5">
                      {lot.species}
                    </p>

                  </section>

                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-semibold rounded-full">
                    {lot.stage}
                  </span>

                </header>

                <section className="mt-3">

                  <section className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Progreso</span>
                    <span>{lot.progress}%</span>
                  </section>

                  <section className="w-full bg-slate-200 rounded-full h-1.5">

                    <span
                      className="block bg-emerald-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${lot.progress}%` }}
                    />

                  </section>

                </section>

              </article>

            ))}

          </section>

          <button
            type="button"
            onClick={() => router.push("/produccion")}
            className="w-full mt-4 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors"
          >
            Ver todos los lotes
          </button>

        </section>

      </section>

      {/* Incident */}

      <section
        className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm border-l-4"
        style={{ borderLeftColor: "#D97706" }}
      >

        <article className="flex items-start gap-3">

          <AlertTriangle
            size={18}
            className="text-amber-500 shrink-0 mt-0.5"
          />

          <section>

            <p className="text-sm font-semibold text-slate-800 mb-1">
              Incidencia abierta · Calidad
            </p>

            <p className="text-sm text-slate-500">
              Presencia de hongos detectada en lote LT-2024-089
              (Rosa canina). Registrada hoy a las 10:15. Estado:
              <strong> En revisión</strong>.
            </p>

            <button
              type="button"
              onClick={() => router.push("/calidad")}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-medium mt-2 transition-colors"
            >
              Ver incidencia →
            </button>

          </section>

        </article>

      </section>

    </article>
  );
}