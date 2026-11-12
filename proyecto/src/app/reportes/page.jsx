"use client";

import { useState } from "react";
import {
  FileText,
  CircleDot,
  Compass,
  Diamond,
  Crosshair,
  Printer,
} from "lucide-react";

const tiposDeReporte = [
  {
    id: "inventario",
    titulo: "Reporte de inventario",
    descripcion: "Stock actual, consumo y alertas de insumos.",
    icono: FileText,
    columnas: ["Insumo", "Categoría", "Stock actual", "Consumo período", "Estado"],
    filas: [
      ["Fertilizante NPK", "Fertilizantes", "25 kg", "40 kg", "Disponible"],
      ["Sustrato orgánico", "Sustratos", "8 bultos", "14 bultos", "Stock bajo"],
      ["Fungicida Mancozeb", "Fitosanitarios", "4 litros", "6 litros", "Stock bajo"],
      ["Semillas Café Castillo", "Semillas", "1200 unid.", "500 unid.", "Disponible"],
    ],
  },
  {
    id: "produccion",
    titulo: "Reporte de producción",
    descripcion: "Lotes activos, progreso y rendimiento por especie.",
    icono: CircleDot,
    columnas: ["Lote", "Especie", "Plantas activas", "Supervivencia", "Etapa actual"],
    filas: [
      ["L-003", "Café Colombia", "420 unid.", "84%", "Crecimiento vegetativo"],
      ["L-001", "Café Castillo", "585 unid.", "90%", "Listo para trasplante"],
      ["L-002", "Café Caturra", "360 unid.", "88%", "Fertilización foliar"],
      ["L-006", "Café Tabi", "490 unid.", "92%", "Aclimatación externa"],
    ],
  },
  {
    id: "ambiental",
    titulo: "Reporte ambiental",
    descripcion: "Temperatura, humedad y alertas de sensores.",
    icono: Compass,
    columnas: ["Sensor / Zona", "Temp. promedio", "Humedad relativa", "Alertas", "Estado"],
    filas: [
      ["S-01 (Zona A)", "22.4 °C", "76%", "0 alertas", "Óptimo"],
      ["S-02 (Zona B)", "24.8 °C", "68%", "2 alertas", "En revisión"],
      ["S-03 (Zona C)", "21.9 °C", "79%", "0 alertas", "Óptimo"],
    ],
  },
  {
    id: "calidad",
    titulo: "Reporte de calidad",
    descripcion: "Incidencias fitosanitarias y su resolución.",
    icono: Diamond,
    columnas: ["Fecha", "Lote afectado", "Incidencia detectada", "Acción aplicada", "Estado"],
    filas: [
      ["08/08/2026", "L-003", "Presencia de roya (12%)", "Aplicación de fungicida", "En seguimiento"],
      ["24/07/2026", "L-002", "Deficiencia leve de nitrógeno", "Refuerzo NPK foliar", "Resuelta"],
      ["12/07/2026", "L-001", "Exceso de humedad en sustrato", "Ajuste de riego 2×/día", "Resuelta"],
    ],
  },
  {
    id: "trazabilidad",
    titulo: "Reporte de trazabilidad",
    descripcion: "Historial completo de lotes seleccionados.",
    icono: Crosshair,
    columnas: ["Lote", "Especie", "Fecha siembra", "Eventos registrados", "Responsable"],
    filas: [
      ["L-003", "Café Colombia", "28/04/2026", "6 eventos", "Juan Pérez"],
      ["L-001", "Café Castillo", "10/03/2026", "3 eventos", "Carlos Gómez"],
      ["L-002", "Café Caturra", "02/04/2026", "2 eventos", "Ana María Rojas"],
    ],
  },
];

export default function ReportesPage() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState("produccion");
  const [fechaInicial, setFechaInicial] = useState("2026-07-01");
  const [fechaFinal, setFechaFinal] = useState("2026-08-10");
  const [reporteGenerado, setReporteGenerado] = useState(null);
  const [mensajeEstado, setMensajeEstado] = useState("");

  const configuracionActual =
    tiposDeReporte.find((r) => r.id === tipoSeleccionado) || tiposDeReporte[1];

  const formatearFecha = (fechaIso) => {
    if (!fechaIso) return "";
    const [anio, mes, dia] = fechaIso.split("-");
    return `${dia}/${mes}/${anio}`;
  };

  const generarReporte = (e) => {
    e.preventDefault();

    if (fechaInicial && fechaFinal && fechaInicial > fechaFinal) {
      setMensajeEstado(
        "La fecha inicial no puede ser posterior a la fecha final."
      );
      setReporteGenerado(null);
      return;
    }

    setMensajeEstado("");
    setReporteGenerado({
      ...configuracionActual,
      desde: formatearFecha(fechaInicial),
      hasta: formatearFecha(fechaFinal),
    });
  };

  const exportarPdf = () => {
    if (!reporteGenerado) {
      setReporteGenerado({
        ...configuracionActual,
        desde: formatearFecha(fechaInicial),
        hasta: formatearFecha(fechaFinal),
      });
    }

    setMensajeEstado(
      `Preparando documento PDF para "${configuracionActual.titulo}" (${formatearFecha(fechaInicial)} - ${formatearFecha(fechaFinal)})...`
    );

    if (typeof window !== "undefined") {
      setTimeout(() => window.print(), 250);
    }
  };

  return (
    <section
      aria-label="Módulo de reportes del vivero"
      className="space-y-6 font-sans text-slate-800"
    >
      {/* Cuadrícula superior de selección de reporte */}
      <section aria-label="Tipos de reporte disponibles">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tiposDeReporte.map((reporte) => {
            const estaActivo = reporte.id === tipoSeleccionado;
            const IconoReporte = reporte.icono;

            return (
              <li key={reporte.id} className="flex">
                <button
                  type="button"
                  onClick={() => {
                    setTipoSeleccionado(reporte.id);
                    setMensajeEstado("");
                  }}
                  aria-pressed={estaActivo}
                  className={`flex w-full flex-col items-start rounded-2xl border p-5 text-left transition ${
                    estaActivo
                      ? "border-emerald-500 bg-emerald-100/75 shadow-sm"
                      : "border-[#DCE8DF] bg-white shadow-sm hover:border-emerald-300 hover:bg-[#F8FBF8]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mb-4 flex h-7 w-7 items-center justify-center ${
                      estaActivo ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    <IconoReporte size={20} strokeWidth={2} />
                  </span>

                  <span
                    className={`block text-sm font-bold leading-snug ${
                      estaActivo ? "text-emerald-600" : "text-slate-800"
                    }`}
                  >
                    {reporte.titulo}
                  </span>

                  <span className="mt-1.5 block text-xs leading-relaxed text-slate-500">
                    {reporte.descripcion}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Panel de parámetros del reporte */}
      <section
        aria-labelledby="titulo-parametros-reporte"
        className="rounded-2xl border border-[#DCE8DF] bg-white p-6 shadow-sm"
      >
        <h2
          id="titulo-parametros-reporte"
          className="mb-5 text-base font-bold text-slate-800"
        >
          Parámetros del reporte
        </h2>

        <form onSubmit={generarReporte}>
          <fieldset className="flex flex-wrap items-end gap-4">
            <label className="flex min-w-[220px] flex-col gap-2 text-xs font-bold text-slate-800">
              Tipo de reporte
              <select
                value={tipoSeleccionado}
                onChange={(e) => {
                  setTipoSeleccionado(e.target.value);
                  setMensajeEstado("");
                }}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-normal text-slate-700 outline-none transition focus:border-emerald-600"
              >
                {tiposDeReporte.map((reporte) => (
                  <option key={reporte.id} value={reporte.id}>
                    {reporte.titulo}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-w-[175px] flex-col gap-2 text-xs font-bold text-slate-800">
              Fecha inicial
              <input
                type="date"
                required
                value={fechaInicial}
                onChange={(e) => setFechaInicial(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm font-normal text-slate-700 outline-none transition focus:border-emerald-600"
              />
            </label>

            <label className="flex min-w-[175px] flex-col gap-2 text-xs font-bold text-slate-800">
              Fecha final
              <input
                type="date"
                required
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm font-normal text-slate-700 outline-none transition focus:border-emerald-600"
              />
            </label>

            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Generar reporte
            </button>

            <button
              type="button"
              onClick={exportarPdf}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Exportar PDF
            </button>
          </fieldset>
        </form>
      </section>

      {/* Mensaje informativo o de validación */}
      {mensajeEstado && (
        <p
          role="status"
          className="rounded-xl border border-[#DCE8DF] bg-white px-5 py-3.5 text-sm font-medium text-emerald-700 shadow-sm"
        >
          {mensajeEstado}
        </p>
      )}

      {/* Vista previa dinámica del reporte generado */}
      {reporteGenerado && (
        <section
          aria-labelledby="titulo-resultado-reporte"
          className="overflow-hidden rounded-2xl border border-[#DCE8DF] bg-white shadow-sm"
        >
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5EDE8] px-6 py-5">
            <span>
              <h3
                id="titulo-resultado-reporte"
                className="text-base font-bold text-slate-800"
              >
                {reporteGenerado.titulo}
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Período consultado:{" "}
                <time className="font-mono font-semibold text-slate-700">
                  {reporteGenerado.desde}
                </time>{" "}
                al{" "}
                <time className="font-mono font-semibold text-slate-700">
                  {reporteGenerado.hasta}
                </time>
              </p>
            </span>

            <button
              type="button"
              onClick={exportarPdf}
              className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              <Printer size={15} aria-hidden="true" />
              Imprimir / Guardar PDF
            </button>
          </header>

          <section
            aria-label="Tabla de resultados del reporte"
            className="overflow-x-auto"
          >
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Resultados detallados para {reporteGenerado.titulo}
              </caption>

              <thead className="bg-[#F1F6F2] text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  {reporteGenerado.columnas.map((columna) => (
                    <th key={columna} scope="col" className="px-6 py-3.5">
                      {columna}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5EDE8]">
                {reporteGenerado.filas.map((fila, indiceFila) => (
                  <tr
                    key={indiceFila}
                    className="transition hover:bg-[#F8FBF8]"
                  >
                    {fila.map((celda, indiceCelda) =>
                      indiceCelda === 0 ? (
                        <th
                          key={indiceCelda}
                          scope="row"
                          className="px-6 py-4 font-semibold text-slate-800"
                        >
                          {celda}
                        </th>
                      ) : (
                        <td
                          key={indiceCelda}
                          className="px-6 py-4 text-slate-600"
                        >
                          {celda}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      )}
    </section>
  );
}