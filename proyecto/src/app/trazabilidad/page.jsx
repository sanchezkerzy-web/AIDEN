"use client";

import { useState } from "react";
import {
  Sprout,
  Leaf,
  FlaskConical,
  Search,
  Droplet,
  AlertTriangle,
  Plus,
  X,
} from "lucide-react";

const lotesIniciales = [
  {
    codigo: "L-003",
    especie: "Café Colombia",
    fechaSiembra: "28/04/2026",
    responsable: "Juan Pérez",
    eventos: [
      {
        id: 1,
        tipo: "siembra",
        titulo: "Siembra",
        descripcion: "500 semillas registradas en zona A.",
        fecha: "28/04/2026",
      },
      {
        id: 2,
        tipo: "germinacion",
        titulo: "Germinación",
        descripcion: "420 plantas germinadas (84% de éxito).",
        fecha: "05/05/2026",
      },
      {
        id: 3,
        tipo: "fertilizacion",
        titulo: "Fertilización",
        descripcion: "Aplicación de fertilizante NPK 20 kg.",
        fecha: "15/05/2026",
      },
      {
        id: 4,
        tipo: "inspeccion",
        titulo: "Inspección fitosanitaria",
        descripcion: "Sin incidencias detectadas.",
        fecha: "22/05/2026",
      },
      {
        id: 5,
        tipo: "riego",
        titulo: "Riego programado",
        descripcion: "Sistema automático configurado a 2×/día.",
        fecha: "01/06/2026",
      },
      {
        id: 6,
        tipo: "alerta",
        titulo: "Alerta: Roya detectada",
        descripcion:
          "Se identificó presencia de roya en 12% de las plantas. Equipo notificado.",
        fecha: "08/08/2026",
      },
    ],
  },
  {
    codigo: "L-001",
    especie: "Café Castillo",
    fechaSiembra: "10/03/2026",
    responsable: "Carlos Gómez",
    eventos: [
      {
        id: 101,
        tipo: "siembra",
        titulo: "Siembra",
        descripcion: "650 semillas registradas en zona B.",
        fecha: "10/03/2026",
      },
      {
        id: 102,
        tipo: "germinacion",
        titulo: "Germinación",
        descripcion: "585 plantas germinadas (90% de éxito).",
        fecha: "19/03/2026",
      },
      {
        id: 103,
        tipo: "inspeccion",
        titulo: "Inspección fitosanitaria",
        descripcion: "Follaje vigoroso y sin presencia de plagas.",
        fecha: "02/04/2026",
      },
    ],
  },
  {
    codigo: "L-002",
    especie: "Café Caturra",
    fechaSiembra: "02/04/2026",
    responsable: "Ana María Rojas",
    eventos: [
      {
        id: 201,
        tipo: "siembra",
        titulo: "Siembra",
        descripcion: "400 semillas registradas en zona C.",
        fecha: "02/04/2026",
      },
      {
        id: 202,
        tipo: "riego",
        titulo: "Riego programado",
        descripcion: "nebulización ajustada a 3×/día por temporada seca.",
        fecha: "12/04/2026",
      },
    ],
  },
];

const configuracionEventos = {
  siembra: {
    icono: Sprout,
    circulo: "border-emerald-300 bg-emerald-100 text-emerald-600",
    tarjeta: "border-slate-200/80 bg-[#F4F7F5]",
    titulo: "text-emerald-700",
  },
  germinacion: {
    icono: Leaf,
    circulo: "border-sky-300 bg-sky-100 text-sky-600",
    tarjeta: "border-slate-200/80 bg-[#F4F7F5]",
    titulo: "text-sky-600",
  },
  fertilizacion: {
    icono: FlaskConical,
    circulo: "border-purple-300 bg-purple-100 text-purple-600",
    tarjeta: "border-slate-200/80 bg-[#F4F7F5]",
    titulo: "text-purple-700",
  },
  inspeccion: {
    icono: Search,
    circulo: "border-slate-300 bg-slate-100 text-slate-600",
    tarjeta: "border-slate-200/80 bg-[#F4F7F5]",
    titulo: "text-slate-800",
  },
  riego: {
    icono: Droplet,
    circulo: "border-sky-300 bg-sky-100 text-sky-500",
    tarjeta: "border-slate-200/80 bg-[#F4F7F5]",
    titulo: "text-sky-600",
  },
  alerta: {
    icono: AlertTriangle,
    circulo: "border-red-300 bg-red-100 text-red-600",
    tarjeta: "border-red-200 bg-red-50/80",
    titulo: "text-red-700",
  },
};

const formularioEventoVacio = {
  tipo: "siembra",
  titulo: "",
  descripcion: "",
  fecha: "",
};

export default function TrazabilidadPage() {
  const [lotes, setLotes] = useState(lotesIniciales);
  const [codigoBuscado, setCodigoBuscado] = useState("");
  const [codigoActivo, setCodigoActivo] = useState("L-003");
  const [mensajeError, setMensajeError] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState(formularioEventoVacio);

  const loteActual = lotes.find(
    (lote) => lote.codigo.toLowerCase() === codigoActivo.toLowerCase()
  );

  const consultarLote = (e) => {
    e.preventDefault();
    const consulta = codigoBuscado.trim().toUpperCase();

    if (!consulta) return;

    const encontrado = lotes.find((l) => l.codigo === consulta);

    if (encontrado) {
      setCodigoActivo(encontrado.codigo);
      setMensajeError("");
    } else {
      setMensajeError(`No se encontró ningún lote con el código "${consulta}".`);
    }
  };

  const seleccionarAccesoRapido = (codigo) => {
    setCodigoActivo(codigo);
    setCodigoBuscado(codigo);
    setMensajeError("");
  };

  const formatearFecha = (fechaIso) => {
    if (!fechaIso) return "";
    const [anio, mes, dia] = fechaIso.split("-");
    return `${dia}/${mes}/${anio}`;
  };

  const guardarEvento = (e) => {
    e.preventDefault();
    const titulo = nuevoEvento.titulo.trim();
    const descripcion = nuevoEvento.descripcion.trim();

    if (!titulo || !descripcion || !nuevoEvento.fecha || !loteActual) return;

    const eventoCreado = {
      id: Date.now(),
      tipo: nuevoEvento.tipo,
      titulo,
      descripcion,
      fecha: formatearFecha(nuevoEvento.fecha),
    };

    setLotes((anteriores) =>
      anteriores.map((lote) =>
        lote.codigo === loteActual.codigo
          ? { ...lote, eventos: [...lote.eventos, eventoCreado] }
          : lote
      )
    );

    setNuevoEvento(formularioEventoVacio);
    setModalAbierto(false);
  };

  return (
    <section
      aria-label="Módulo de trazabilidad de lotes"
      className="space-y-6 font-sans text-slate-800"
    >
      {/* Tarjeta superior de consulta y accesos rápidos */}
      <section
        aria-label="Consulta de lote por código"
        className="flex flex-wrap items-end justify-between gap-6 rounded-2xl border border-[#DCE8DF] bg-white p-6 shadow-sm"
      >
        <form onSubmit={consultarLote} className="flex flex-wrap items-end gap-3">
          <fieldset className="flex flex-col gap-2">
            <label
              htmlFor="campo-codigo-lote"
              className="text-sm font-bold text-slate-800"
            >
              Buscar lote por código
            </label>

            <span className="flex flex-wrap items-center gap-3">
              <input
                id="campo-codigo-lote"
                type="search"
                value={codigoBuscado}
                onChange={(e) => setCodigoBuscado(e.target.value)}
                placeholder="Ej: L-003"
                className="min-w-[230px] rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm text-slate-700 outline-none transition focus:border-emerald-600"
              />

              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Consultar
              </button>
            </span>
          </fieldset>
        </form>

        <nav
          aria-label="Lotes disponibles para consulta rápida"
          className="flex flex-wrap items-center gap-2.5 border-t border-slate-200 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0"
        >
          {lotes.map((lote) => {
            const estaActivo = lote.codigo === codigoActivo && !mensajeError;

            return (
              <button
                key={lote.codigo}
                type="button"
                onClick={() => seleccionarAccesoRapido(lote.codigo)}
                aria-pressed={estaActivo}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs font-semibold transition ${
                  estaActivo
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-700"
                }`}
              >
                {lote.codigo}
              </button>
            );
          })}
        </nav>
      </section>

      {/* Aviso si el código consultado no existe */}
      {mensajeError && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
        >
          {mensajeError}
        </p>
      )}

      {/* Ficha resumen oscura del lote seleccionado */}
      {loteActual && !mensajeError && (
        <>
          <article
            aria-label={`Información general del lote ${loteActual.codigo}`}
            className="rounded-2xl bg-[#0D2115] px-7 py-5 text-white shadow-sm"
          >
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <span className="flex flex-col">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200/70">
                  LOTE
                </dt>
                <dd className="mt-1 font-mono text-base font-bold text-white">
                  {loteActual.codigo}
                </dd>
              </span>

              <span className="flex flex-col">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200/70">
                  ESPECIE
                </dt>
                <dd className="mt-1 text-base font-bold text-white">
                  {loteActual.especie}
                </dd>
              </span>

              <span className="flex flex-col">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200/70">
                  FECHA DE SIEMBRA
                </dt>
                <dd className="mt-1 font-mono text-base font-bold text-white">
                  {loteActual.fechaSiembra}
                </dd>
              </span>

              <span className="flex flex-col">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200/70">
                  RESPONSABLE
                </dt>
                <dd className="mt-1 text-base font-bold text-white">
                  {loteActual.responsable}
                </dd>
              </span>
            </dl>
          </article>

          {/* Línea de tiempo de eventos */}
          <section
            aria-labelledby="titulo-linea-tiempo"
            className="rounded-2xl border border-[#DCE8DF] bg-white p-6 shadow-sm"
          >
            <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2
                id="titulo-linea-tiempo"
                className="text-base font-bold text-slate-800"
              >
                Línea de tiempo — {loteActual.eventos.length} eventos registrados
              </h2>

              <button
                type="button"
                onClick={() => setModalAbierto(true)}
                className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                <Plus size={15} aria-hidden="true" />
                Registrar evento
              </button>
            </header>

            <ol className="relative space-y-4">
              {loteActual.eventos.map((evento, indice) => {
                const estilo =
                  configuracionEventos[evento.tipo] ||
                  configuracionEventos.siembra;
                const IconoEvento = estilo.icono;
                const esUltimo = indice === loteActual.eventos.length - 1;

                return (
                  <li
                    key={evento.id}
                    className="relative flex items-start gap-4"
                  >
                    {/* Línea conectora vertical */}
                    {!esUltimo && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-[-1rem] left-5 top-10 w-0.5 bg-emerald-400/60"
                      />
                    )}

                    {/* Indicador circular con ícono */}
                    <span
                      aria-hidden="true"
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${estilo.circulo}`}
                    >
                      <IconoEvento size={18} />
                    </span>

                    {/* Tarjeta de detalle del evento */}
                    <article
                      className={`flex-1 rounded-xl border px-5 py-4 transition ${estilo.tarjeta}`}
                    >
                      <header className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className={`text-sm font-bold ${estilo.titulo}`}>
                          {evento.titulo}
                        </h3>
                        <time className="font-mono text-xs text-slate-500">
                          {evento.fecha}
                        </time>
                      </header>

                      <p className="mt-1 text-sm text-slate-600">
                        {evento.descripcion}
                      </p>
                    </article>
                  </li>
                );
              })}
            </ol>
          </section>
        </>
      )}

      {/* Modal para agregar nuevo evento al lote */}
      {modalAbierto && loteActual && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-modal-evento"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <article className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <header className="mb-5 flex items-center justify-between">
              <h2
                id="titulo-modal-evento"
                className="text-lg font-bold text-slate-800"
              >
                Nuevo evento — Lote {loteActual.codigo}
              </h2>

              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                aria-label="Cerrar ventana"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <form onSubmit={guardarEvento} className="space-y-4">
              <fieldset className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Tipo de evento
                  <select
                    value={nuevoEvento.tipo}
                    onChange={(e) =>
                      setNuevoEvento({ ...nuevoEvento, tipo: e.target.value })
                    }
                    className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-600"
                  >
                    <option value="siembra">Siembra</option>
                    <option value="germinacion">Germinación</option>
                    <option value="fertilizacion">Fertilización</option>
                    <option value="inspeccion">Inspección fitosanitaria</option>
                    <option value="riego">Riego programado</option>
                    <option value="alerta">Alerta fitosanitaria</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium">
                  Fecha
                  <input
                    type="date"
                    required
                    value={nuevoEvento.fecha}
                    onChange={(e) =>
                      setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })
                    }
                    className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-600"
                  />
                </label>
              </fieldset>

              <label className="flex flex-col gap-1 text-sm font-medium">
                Título del evento
                <input
                  type="text"
                  required
                  value={nuevoEvento.titulo}
                  onChange={(e) =>
                    setNuevoEvento({ ...nuevoEvento, titulo: e.target.value })
                  }
                  placeholder="Ej. Aplicación de abono foliar"
                  className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-600"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium">
                Descripción
                <textarea
                  rows={3}
                  required
                  value={nuevoEvento.descripcion}
                  onChange={(e) =>
                    setNuevoEvento({
                      ...nuevoEvento,
                      descripcion: e.target.value,
                    })
                  }
                  placeholder="Detalle técnico registrado en vivero..."
                  className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-600"
                />
              </label>

              <footer className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Guardar evento
                </button>
              </footer>
            </form>
          </article>
        </section>
      )}
    </section>
  );
}