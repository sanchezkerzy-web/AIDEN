"use client";

import { useMemo, useState } from "react";

import {
  Plus,
  Search,
  X,
  Check,
  Eye,
  Bell,
  AlertCircle,
  ClipboardList,
  ChevronDown,
  CircleHelp,
  CalendarDays,
} from "lucide-react";

// DATOS INICIALES

const datosIniciales = [
  {
    id: 1,
    lote: "L-003",
    tipo: "Roya",
    fecha: "08/08/2026",
    severidad: "Media",
    estado: "En revisión",
    responsable: "Juan Pérez",
    descripcion:
      "Se observan manchas anaranjadas en las hojas de varias plantas del lote.",
    observacion:
      "Se está realizando seguimiento para controlar la propagación.",
  },
  {
    id: 2,
    lote: "L-005",
    tipo: "Plaga (mosca blanca)",
    fecha: "07/08/2026",
    severidad: "Alta",
    estado: "Pendiente",
    responsable: "Ana Torres",
    descripcion:
      "Presencia de mosca blanca en el envés de las hojas.",
    observacion:
      "Se requiere intervención para controlar la plaga.",
  },
  {
    id: 3,
    lote: "L-001",
    tipo: "Deficiencia nutricional",
    fecha: "02/08/2026",
    severidad: "Baja",
    estado: "Resuelto",
    responsable: "Carlos Ruiz",
    descripcion:
      "Se detectó amarillamiento en algunas hojas del cultivo.",
    observacion:
      "Se realizó corrección nutricional.",
  },
  {
    id: 4,
    lote: "L-002",
    tipo: "Mildiu",
    fecha: "29/07/2026",
    severidad: "Media",
    estado: "Resuelto",
    responsable: "Pedro Gómez",
    descripcion:
      "Se identificaron signos de mildiu en algunas hojas.",
    observacion:
      "Se aplicó el tratamiento correspondiente.",
  },
];

// OPCIONES

const severidades = ["Baja", "Media", "Alta"];

const estados = ["Pendiente", "En revisión", "Resuelto"];

const formularioInicial = {
  lote: "",
  tipo: "",
  fecha: "2026-11-12",
  severidad: "Media",
  responsable: "",
  descripcion: "",
  observacion: "",
};

// FUNCIONES AUXILIARES

function formatearFecha(fecha) {
  const [year, month, day] = fecha.split("-");

  return `${day}/${month}/${year}`;
}

// TARJETAS DE ESTADÍSTICAS

function TarjetaEstadistica({ numero, titulo, color }) {
  const colores = {
    total: "bg-slate-100 text-slate-600",
    pendiente: "bg-red-100/80 text-red-700",
    revision: "bg-blue-100 text-blue-700",
    resuelta: "bg-green-100 text-green-700",
  };

  return (
    <article
      className={`flex min-h-[105px] flex-col justify-center gap-1 rounded-xl p-5 ${colores[color]}`}
    >
      <strong className="text-3xl font-bold">
        {numero}
      </strong>

      <span className="text-sm">
        {titulo}
      </span>
    </article>
  );
}

// ETIQUETAS DE SEVERIDAD

function EtiquetaSeveridad({ severidad }) {
  const colores = {
    Alta: "border-red-200 bg-red-100 text-red-700",
    Media: "border-amber-200 bg-yellow-100 text-amber-800",
    Baja: "border-slate-200 bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${colores[severidad]}`}
    >
      {severidad}
    </span>
  );
}

// ETIQUETAS DE ESTADO

function EtiquetaEstado({ estado }) {
  const colores = {
    Pendiente: "border-amber-200 bg-yellow-100 text-amber-800",
    "En revisión": "border-blue-200 bg-blue-100 text-blue-800",
    Resuelto: "border-green-200 bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${colores[estado]}`}
    >
      {estado}
    </span>
  );
}

// COMPONENTE PRINCIPAL

export default function Calidad() {
  const [incidencias, setIncidencias] = useState(datosIniciales);

  const [modal, setModal] = useState("");

  const [incidenciaSeleccionada, setIncidenciaSeleccionada] =
    useState(null);

  const [busqueda, setBusqueda] = useState("");

  const [filtro, setFiltro] = useState("Todos");

  const [notificaciones, setNotificaciones] = useState(false);

  const [ayuda, setAyuda] = useState(false);

  const [formulario, setFormulario] = useState(formularioInicial);

  const [edicion, setEdicion] = useState({
    estado: "",
    responsable: "",
    observacion: "",
  });

  // ESTADÍSTICAS DINÁMICAS

  const estadisticas = useMemo(() => {
    return {
      total: incidencias.length,

      pendientes: incidencias.filter(
        (item) => item.estado === "Pendiente"
      ).length,

      revision: incidencias.filter(
        (item) => item.estado === "En revisión"
      ).length,

      resueltas: incidencias.filter(
        (item) => item.estado === "Resuelto"
      ).length,
    };
  }, [incidencias]);

  // BÚSQUEDA Y FILTROS

  const incidenciasFiltradas = incidencias.filter((item) => {
    const coincideEstado =
      filtro === "Todos" || item.estado === filtro;

    const texto = busqueda.toLowerCase().trim();

    const coincideBusqueda = [
      item.lote,
      item.tipo,
      item.responsable,
    ].some((valor) => valor.toLowerCase().includes(texto));

    return coincideEstado && coincideBusqueda;
  });

  // ACTUALIZAR FORMULARIO

  function cambiarFormulario(evento) {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  }

  // REGISTRAR INCIDENCIA

  function registrarIncidencia(evento) {
    evento.preventDefault();

    const codigoExiste = incidencias.some(
      (item) =>
        item.lote.toLowerCase() ===
        formulario.lote.trim().toLowerCase()
      &&
        item.tipo.toLowerCase() ===
        formulario.tipo.trim().toLowerCase()
      &&
        item.estado !== "Resuelto"
    );

    if (codigoExiste) {
      alert(
        "Ya existe una incidencia activa de este tipo para el lote indicado."
      );

      return;
    }

    const nuevaIncidencia = {
      ...formulario,
      id: Date.now(),
      lote: formulario.lote.trim().toUpperCase(),
      tipo: formulario.tipo.trim(),
      responsable: formulario.responsable.trim(),
      fecha: formatearFecha(formulario.fecha),
      estado: "Pendiente",
    };

    setIncidencias((actuales) => [
      nuevaIncidencia,
      ...actuales,
    ]);

    setFormulario(formularioInicial);

    setBusqueda("");

    setFiltro("Todos");

    setModal("");
  }

  // ABRIR MODALES

  function abrirModal(tipo, incidencia = null) {
    setIncidenciaSeleccionada(incidencia);

    if (incidencia) {
      setEdicion({
        estado: incidencia.estado,
        responsable: incidencia.responsable,
        observacion: incidencia.observacion,
      });
    }

    setModal(tipo);
  }

  // GESTIONAR INCIDENCIA

  function guardarCambios(evento) {
    evento.preventDefault();

    if (!incidenciaSeleccionada) {
      return;
    }

    const incidenciaActualizada = {
      ...incidenciaSeleccionada,
      estado: edicion.estado,
      responsable: edicion.responsable.trim(),
      observacion: edicion.observacion,
    };

    setIncidencias((actuales) =>
      actuales.map((item) =>
        item.id === incidenciaSeleccionada.id
          ? incidenciaActualizada
          : item
      )
    );

    setIncidenciaSeleccionada(incidenciaActualizada);

    setModal("");
  }

  return (
    <main className="min-h-screen bg-[#f0f4f1] text-[#10251d]">

      {/* CONTENIDO PRINCIPAL */}

      <section className="mx-auto max-w-[1600px] px-4 py-7 sm:px-8">

        {/* ESTADÍSTICAS */}

        <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">

          <TarjetaEstadistica
            numero={estadisticas.total}
            titulo="Total incidencias"
            color="total"
          />

          <TarjetaEstadistica
            numero={estadisticas.pendientes}
            titulo="Pendientes"
            color="pendiente"
          />

          <TarjetaEstadistica
            numero={estadisticas.revision}
            titulo="En revisión"
            color="revision"
          />

          <TarjetaEstadistica
            numero={estadisticas.resueltas}
            titulo="Resueltas"
            color="resuelta"
          />

        </section>

        {/* HERRAMIENTAS */}

        <section className="my-6 flex flex-col-reverse justify-between gap-4 lg:flex-row lg:items-center">

          <nav className="flex flex-col gap-3 sm:flex-row">

            {/* BUSCADOR */}

            <label className="flex h-11 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-gray-400 sm:w-72">

              <Search size={17} />

              <input
                type="search"
                placeholder="Buscar incidencia..."
                value={busqueda}
                onChange={(evento) =>
                  setBusqueda(evento.target.value)
                }
                className="w-full bg-transparent text-sm text-gray-700 outline-none"
              />

            </label>

            {/* FILTRO */}

            <label className="flex h-11 items-center rounded-lg border border-gray-200 bg-white px-3">

              <select
                value={filtro}
                onChange={(evento) =>
                  setFiltro(evento.target.value)
                }
                aria-label="Filtrar incidencias"
                className="min-w-36 bg-transparent text-sm text-gray-600 outline-none"
              >

                <option value="Todos">
                  Todos los estados
                </option>

                {estados.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}

              </select>

            </label>

          </nav>

          {/* REGISTRAR INCIDENCIA */}

          <button
            onClick={() => abrirModal("crear")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-700"
          >
            <Plus size={18} />

            Registrar incidencia
          </button>

        </section>

        {/* TABLA DE INCIDENCIAS */}

        <section className="overflow-hidden rounded-xl border border-[#d6e3da] bg-white">

          <section className="overflow-x-auto">

            <table className="w-full min-w-[1000px] border-collapse text-left">

              <thead className="bg-[#f1f5f2]">

                <tr>

                  <th className="px-5 py-4 text-xs font-bold tracking-wide text-[#61766a]">
                    LOTE
                  </th>

                  <th className="px-5 py-4 text-xs font-bold tracking-wide text-[#61766a]">
                    TIPO DE INCIDENCIA
                  </th>

                  <th className="px-5 py-4 text-xs font-bold tracking-wide text-[#61766a]">
                    FECHA
                  </th>

                  <th className="px-5 py-4 text-xs font-bold tracking-wide text-[#61766a]">
                    SEVERIDAD
                  </th>

                  <th className="px-5 py-4 text-xs font-bold tracking-wide text-[#61766a]">
                    ESTADO
                  </th>

                  <th className="px-5 py-4 text-xs font-bold tracking-wide text-[#61766a]">
                    RESPONSABLE
                  </th>

                  <th className="px-5 py-4 text-xs font-bold tracking-wide text-[#61766a]">
                    ACCIONES
                  </th>

                </tr>

              </thead>

              <tbody>

                {incidenciasFiltradas.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t border-[#d6e3da] transition hover:bg-green-50/40"
                  >

                    <td className="px-5 py-4 font-mono font-bold text-gray-800">
                      {item.lote}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-gray-800">
                      {item.tipo}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-500">
                      {item.fecha}
                    </td>

                    <td className="px-5 py-4">
                      <EtiquetaSeveridad severidad={item.severidad} />
                    </td>

                    <td className="px-5 py-4">
                      <EtiquetaEstado estado={item.estado} />
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.responsable}
                    </td>

                    <td className="px-5 py-4">

                      <nav className="flex items-center gap-2">

                        <button
                          onClick={() => abrirModal("ver", item)}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100"
                        >
                          Ver
                        </button>

                        <button
                          onClick={() =>
                            abrirModal("gestionar", item)
                          }
                          className="rounded-lg border border-green-200 px-3 py-2 text-sm text-green-700 transition hover:bg-green-50"
                        >
                          Gestionar
                        </button>

                      </nav>

                    </td>

                  </tr>

                ))}

                {incidenciasFiltradas.length === 0 && (

                  <tr>

                    <td
                      colSpan="7"
                      className="px-5 py-12 text-center text-sm text-gray-500"
                    >
                      No se encontraron incidencias.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </section>

          {/* PIE DE TABLA */}

          <footer className="flex min-h-11 items-center justify-between border-t border-gray-100 px-5 text-xs text-gray-500">

            <span>
              Mostrando{" "}
              <strong>{incidenciasFiltradas.length}</strong> de{" "}
              <strong>{estadisticas.total}</strong> incidencias
            </span>

            <span className="flex items-center gap-2">
              <i className="h-2 w-2 rounded-full bg-green-500" />
              Información actualizada
            </span>

          </footer>

        </section>

      </section>

      {/* BOTÓN DE AYUDA */}

      <button
        onClick={() => setAyuda(!ayuda)}
        aria-label="Centro de ayuda"
        className="fixed bottom-4 right-4 z-20 grid h-11 w-11 place-items-center rounded-full border-2 border-gray-600 bg-[#252525] text-white shadow-lg transition hover:scale-105"
      >
        <CircleHelp size={23} />
      </button>

      {ayuda && (

        <aside className="fixed bottom-20 right-4 z-30 w-64 rounded-xl border border-gray-200 bg-white p-5 shadow-xl">

          <h3 className="font-bold text-gray-800">
            Centro de ayuda
          </h3>

          <p className="my-3 text-sm leading-relaxed text-gray-500">
            Desde este módulo puedes registrar incidencias,
            consultar sus detalles y realizar seguimiento
            de los problemas de calidad y sanidad.
          </p>

          <button
            onClick={() => setAyuda(false)}
            className="text-sm font-semibold text-green-700"
          >
            Entendido
          </button>

        </aside>

      )}

      {/* VENTANAS MODALES */}

      {modal && (

        <section
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget) {
              setModal("");
            }
          }}
        >

          <article
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >

            {/* ENCABEZADO DEL MODAL */}

            <header className="mb-6 flex items-start justify-between">

              <section>

                <span className="text-[10px] font-bold tracking-widest text-green-600">
                  GESTIÓN DE CALIDAD
                </span>

                <h2
                  id="modal-title"
                  className="mt-1 text-xl font-bold text-gray-800"
                >
                  {modal === "crear"
                    ? "Registrar incidencia"
                    : modal === "gestionar"
                    ? "Gestionar incidencia"
                    : "Detalle de incidencia"}
                </h2>

              </section>

              <button
                onClick={() => setModal("")}
                aria-label="Cerrar modal"
                className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </header>

            {/* FORMULARIO DE REGISTRO */}

            {modal === "crear" && (

              <form
                className="flex flex-col gap-4"
                onSubmit={registrarIncidencia}
              >

                <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">

                  Lote

                  <input
                    required
                    name="lote"
                    placeholder="Ej. L-006"
                    value={formulario.lote}
                    onChange={cambiarFormulario}
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />

                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">

                  Tipo de incidencia

                  <input
                    required
                    name="tipo"
                    placeholder="Ej. Presencia de plaga"
                    value={formulario.tipo}
                    onChange={cambiarFormulario}
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />

                </label>

                <section className="grid gap-4 sm:grid-cols-2">

                  <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">

                    Fecha

                    <input
                      required
                      type="date"
                      name="fecha"
                      value={formulario.fecha}
                      onChange={cambiarFormulario}
                      className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                    />

                  </label>

                  <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">

                    Severidad

                    <select
                      name="severidad"
                      value={formulario.severidad}
                      onChange={cambiarFormulario}
                      className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                    >

                      {severidades.map((severidad) => (
                        <option key={severidad} value={severidad}>
                          {severidad}
                        </option>
                      ))}

                    </select>

                  </label>

                </section>

                <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">

                  Responsable

                  <input
                    required
                    name="responsable"
                    placeholder="Nombre del responsable"
                    value={formulario.responsable}
                    onChange={cambiarFormulario}
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />

                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">

                  Descripción

                  <textarea
                    rows="3"
                    name="descripcion"
                    placeholder="Describe brevemente la incidencia..."
                    value={formulario.descripcion}
                    onChange={cambiarFormulario}
                    className="w-full resize-y rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />

                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">

                  Observaciones

                  <textarea
                    rows="2"
                    name="observacion"
                    placeholder="Observaciones adicionales..."
                    value={formulario.observacion}
                    onChange={cambiarFormulario}
                    className="w-full resize-y rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />

                </label>

                <footer className="mt-2 flex justify-end gap-3 border-t border-gray-100 pt-5">

                  <button
                    type="button"
                    onClick={() => setModal("")}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className={buttonPrimary}
                  >
                    <Check size={16} />
                    Guardar incidencia
                  </button>

                </footer>

              </form>

            )}

            {/* VER DETALLES */}

            {modal === "ver" && incidenciaSeleccionada && (

              <section className="flex flex-col gap-5">

                <section className="grid grid-cols-2 gap-5">

                  <article>
                    <small className="text-xs text-gray-400">
                      Lote
                    </small>

                    <strong className="mt-1 block text-sm text-gray-800">
                      {incidenciaSeleccionada.lote}
                    </strong>
                  </article>

                  <article>
                    <small className="text-xs text-gray-400">
                      Fecha
                    </small>

                    <strong className="mt-1 block text-sm text-gray-800">
                      {incidenciaSeleccionada.fecha}
                    </strong>
                  </article>

                  <article>
                    <small className="text-xs text-gray-400">
                      Tipo de incidencia
                    </small>

                    <strong className="mt-1 block text-sm text-gray-800">
                      {incidenciaSeleccionada.tipo}
                    </strong>
                  </article>

                  <article>
                    <small className="text-xs text-gray-400">
                      Responsable
                    </small>

                    <strong className="mt-1 block text-sm text-gray-800">
                      {incidenciaSeleccionada.responsable}
                    </strong>
                  </article>

                  <article>
                    <small className="mb-2 block text-xs text-gray-400">
                      Severidad
                    </small>

                    <EtiquetaSeveridad
                      severidad={incidenciaSeleccionada.severidad}
                    />
                  </article>

                  <article>
                    <small className="mb-2 block text-xs text-gray-400">
                      Estado
                    </small>

                    <EtiquetaEstado
                      estado={incidenciaSeleccionada.estado}
                    />
                  </article>

                </section>

                <aside className="rounded-xl border border-gray-100 bg-gray-50 p-4">

                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Descripción
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {incidenciaSeleccionada.descripcion ||
                      "No hay descripción registrada."}
                  </p>

                </aside>

                <aside className="rounded-xl border border-green-100 bg-green-50 p-4">

                  <h3 className="text-xs font-bold uppercase tracking-wide text-green-700">
                    Observaciones
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {incidenciaSeleccionada.observacion ||
                      "No hay observaciones registradas."}
                  </p>

                </aside>

                <footer className="flex justify-end border-t border-gray-100 pt-4">

                  <button
                    onClick={() => setModal("")}
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cerrar
                  </button>

                </footer>

              </section>

            )}

            {/* GESTIONAR INCIDENCIA */}

            {modal === "gestionar" && incidenciaSeleccionada && (

              <form
                className="flex flex-col gap-4"
                onSubmit={guardarCambios}
              >

                <article className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">

                  <ClipboardList size={23} className="text-green-600" />

                  <section>
                    <strong className="block text-sm text-gray-800">
                      {incidenciaSeleccionada.lote}
                    </strong>

                    <small className="text-gray-500">
                      {incidenciaSeleccionada.tipo}
                    </small>
                  </section>

                </article>

                <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">

                  Estado de la incidencia

                  <select
                    value={edicion.estado}
                    onChange={(evento) =>
                      setEdicion({
                        ...edicion,
                        estado: evento.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  >

                    {estados.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}

                  </select>

                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">

                  Responsable

                  <input
                    required
                    value={edicion.responsable}
                    onChange={(evento) =>
                      setEdicion({
                        ...edicion,
                        responsable: evento.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />

                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">

                  Observaciones de gestión

                  <textarea
                    rows="4"
                    value={edicion.observacion}
                    onChange={(evento) =>
                      setEdicion({
                        ...edicion,
                        observacion: evento.target.value,
                      })
                    }
                    placeholder="Describe las acciones realizadas..."
                    className="w-full resize-y rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />

                </label>

                <footer className="mt-2 flex justify-end gap-3 border-t border-gray-100 pt-5">

                  <button
                    type="button"
                    onClick={() => setModal("")}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className={buttonPrimary}
                  >
                    <Check size={16} />
                    Guardar cambios
                  </button>

                </footer>

              </form>

            )}

          </article>

        </section>

      )}

    </main>
  );
}