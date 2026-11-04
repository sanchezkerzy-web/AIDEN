
"use client";

import { useMemo, useState } from "react";
import {
  Sprout,
  Package,
  Flower2,
  Leaf,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
  CalendarDays,
  Users,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";

const etapas = [
  "Siembra",
  "Germinación",
  "Crecimiento",
  "Desarrollo",
  "Trasplante",
];

const coloresEtapa = {
  Siembra: "bg-blue-50 text-blue-700",
  Germinación: "bg-yellow-50 text-yellow-700",
  Crecimiento: "bg-green-50 text-green-700",
  Desarrollo: "bg-emerald-50 text-emerald-700",
  Trasplante: "bg-purple-50 text-purple-700",
};

const lotesIniciales = [
  {
    id: 1,
    codigo: "LOT-001",
    especie: "Tomate",
    variedad: "Chonto",
    fechaSiembra: "2026-10-20",
    cantidad: 500,
    etapa: "Germinación",
    responsable: "Carlos Pérez",
  },
  {
    id: 2,
    codigo: "LOT-002",
    especie: "Lechuga",
    variedad: "Batavia",
    fechaSiembra: "2026-10-15",
    cantidad: 350,
    etapa: "Crecimiento",
    responsable: "María López",
  },
  {
    id: 3,
    codigo: "LOT-003",
    especie: "Cilantro",
    variedad: "Común",
    fechaSiembra: "2026-10-05",
    cantidad: 200,
    etapa: "Desarrollo",
    responsable: "Andrés Ruiz",
  },
  {
    id: 4,
    codigo: "LOT-004",
    especie: "Pimentón",
    variedad: "California",
    fechaSiembra: "2026-09-25",
    cantidad: 150,
    etapa: "Trasplante",
    responsable: "Laura Gómez",
  },
];

const formularioInicial = {
  especie: "",
  variedad: "",
  fechaSiembra: "",
  cantidad: "",
  etapa: "Siembra",
  responsable: "",
};

export default function ProduccionPage() {
  const [lotes, setLotes] = useState(lotesIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEtapa, setFiltroEtapa] = useState("Todas");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [loteEditando, setLoteEditando] = useState(null);
  const [loteDetalle, setLoteDetalle] = useState(null);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [error, setError] = useState("");

  const totalPlantas = lotes.reduce(
    (total, lote) => total + Number(lote.cantidad),
    0
  );

  const lotesActivos = lotes.filter(
    (lote) => lote.etapa !== "Trasplante"
  ).length;

  const lotesFinalizados = lotes.filter(
    (lote) => lote.etapa === "Trasplante"
  ).length;

  const conteoEtapas = etapas.map((etapa) => ({
    nombre: etapa,
    cantidad: lotes.filter((lote) => lote.etapa === etapa).length,
  }));

  const lotesFiltrados = useMemo(() => {
    return lotes.filter((lote) => {
      const texto = busqueda.toLowerCase();

      const coincideBusqueda =
        lote.codigo.toLowerCase().includes(texto) ||
        lote.especie.toLowerCase().includes(texto) ||
        lote.variedad.toLowerCase().includes(texto) ||
        lote.responsable.toLowerCase().includes(texto);

      const coincideEtapa =
        filtroEtapa === "Todas" || lote.etapa === filtroEtapa;

      return coincideBusqueda && coincideEtapa;
    });
  }, [lotes, busqueda, filtroEtapa]);

  function abrirNuevoLote() {
    setLoteEditando(null);
    setFormulario(formularioInicial);
    setError("");
    setModalAbierto(true);
  }

  function abrirEdicion(lote) {
    setLoteEditando(lote);
    setFormulario({
      especie: lote.especie,
      variedad: lote.variedad,
      fechaSiembra: lote.fechaSiembra,
      cantidad: String(lote.cantidad),
      etapa: lote.etapa,
      responsable: lote.responsable,
    });
    setError("");
    setModalAbierto(true);
  }

  function guardarLote(e) {
    e.preventDefault();

    if (
      !formulario.especie.trim() ||
      !formulario.variedad.trim() ||
      !formulario.fechaSiembra ||
      !formulario.cantidad ||
      !formulario.responsable.trim()
    ) {
      setError("Completa todos los campos para continuar.");
      return;
    }

    if (Number(formulario.cantidad) <= 0) {
      setError("La cantidad debe ser mayor que cero.");
      return;
    }

    const datos = {
      especie: formulario.especie.trim(),
      variedad: formulario.variedad.trim(),
      fechaSiembra: formulario.fechaSiembra,
      cantidad: Number(formulario.cantidad),
      etapa: formulario.etapa,
      responsable: formulario.responsable.trim(),
    };

    if (loteEditando) {
      setLotes((anteriores) =>
        anteriores.map((lote) =>
          lote.id === loteEditando.id ? { ...lote, ...datos } : lote
        )
      );
    } else {
      const nuevoId =
        lotes.length > 0
          ? Math.max(...lotes.map((lote) => lote.id)) + 1
          : 1;

      const nuevoCodigo = `LOT-${String(nuevoId).padStart(3, "0")}`;

      setLotes((anteriores) => [
        ...anteriores,
        {
          id: nuevoId,
          codigo: nuevoCodigo,
          ...datos,
        },
      ]);
    }

    setModalAbierto(false);
    setFormulario(formularioInicial);
    setLoteEditando(null);
    setError("");
  }

  function eliminarLote(id) {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este lote?"
    );

    if (!confirmar) return;

    setLotes((anteriores) =>
      anteriores.filter((lote) => lote.id !== id)
    );

    if (loteDetalle?.id === id) {
      setLoteDetalle(null);
    }
  }

  function cambiarEtapa(lote, direccion) {
    const indiceActual = etapas.indexOf(lote.etapa);
    const nuevoIndice = indiceActual + direccion;

    if (nuevoIndice < 0 || nuevoIndice >= etapas.length) return;

    const nuevaEtapa = etapas[nuevoIndice];

    setLotes((anteriores) =>
      anteriores.map((item) =>
        item.id === lote.id
          ? { ...item, etapa: nuevaEtapa }
          : item
      )
    );

    setLoteDetalle((actual) =>
      actual?.id === lote.id
        ? { ...actual, etapa: nuevaEtapa }
        : actual
    );
  }

  function actualizarCampo(campo, valor) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  return (
    <div className="min-h-full space-y-6 bg-[#EFF4F0] p-1 sm:p-2">

      {/* ENCABEZADO */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#16A34A]">
            <Sprout size={18} />
            Gestión agrícola
          </div>

          <h1 className="text-3xl font-bold text-[#0B2115]">
            Producción
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Administra los lotes y controla sus etapas de cultivo.
          </p>
        </div>

        <button
          onClick={abrirNuevoLote}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#009F6B] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#00885B]"
        >
          <Plus size={19} />
          Nuevo lote
        </button>
      </div>

      {/* INDICADORES */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TarjetaIndicador
          titulo="Total de lotes"
          valor={lotes.length}
          descripcion="Lotes registrados"
          icono={<Package size={23} />}
          color="text-[#16A34A]"
        />

        <TarjetaIndicador
          titulo="Lotes activos"
          valor={lotesActivos}
          descripcion="En proceso de cultivo"
          icono={<Sprout size={23} />}
          color="text-[#16A34A]"
        />

        <TarjetaIndicador
          titulo="Finalizados"
          valor={lotesFinalizados}
          descripcion="Lotes en trasplante"
          icono={<Flower2 size={23} />}
          color="text-purple-500"
        />

        <TarjetaIndicador
          titulo="Total de plantas"
          valor={totalPlantas.toLocaleString("es-CO")}
          descripcion="Unidades registradas"
          icono={<Leaf size={23} />}
          color="text-emerald-600"
        />
      </div>

      {/* SEGUIMIENTO DE ETAPAS */}
      <section className="rounded-2xl border border-[#DCE8DF] bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-[#0B2115]">
            Etapas del cultivo
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Consulta los lotes que se encuentran en cada etapa de producción.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {conteoEtapas.map((etapa, index) => (
            <button
              key={etapa.nombre}
              onClick={() =>
                setFiltroEtapa(
                  filtroEtapa === etapa.nombre ? "Todas" : etapa.nombre
                )
              }
              className={`rounded-xl border p-4 text-left transition hover:shadow-md ${
                filtroEtapa === etapa.nombre
                  ? "border-[#16A34A] bg-green-50"
                  : "border-[#DCE8DF] bg-[#F8FBF8]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-600">
                  {etapa.nombre}
                </span>
                <span className="text-xs font-bold text-[#16A34A]">
                  0{index + 1}
                </span>
              </div>

              <p className="mt-3 text-2xl font-bold text-[#0B2115]">
                {etapa.cantidad}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {etapa.cantidad === 1
                  ? "Lote registrado"
                  : "Lotes registrados"}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* REGISTRO DE LOTES */}
      <section className="rounded-2xl border border-[#DCE8DF] bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#0B2115]">
              Registro de lotes
            </h2>
            <p className="text-sm text-slate-500">
              Consulta y administra los cultivos registrados.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar lote o especie..."
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#16A34A] sm:w-64"
              />
            </div>

            <select
              value={filtroEtapa}
              onChange={(e) => setFiltroEtapa(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#16A34A]"
            >
              <option value="Todas">Todas las etapas</option>
              {etapas.map((etapa) => (
                <option key={etapa} value={etapa}>
                  {etapa}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="bg-[#F1F6F2] text-xs font-semibold uppercase text-slate-600">
                <th className="rounded-l-lg px-4 py-4">Código</th>
                <th className="px-4 py-4">Especie</th>
                <th className="px-4 py-4">Fecha de siembra</th>
                <th className="px-4 py-4">Cantidad</th>
                <th className="px-4 py-4">Etapa</th>
                <th className="px-4 py-4">Responsable</th>
                <th className="rounded-r-lg px-4 py-4 text-center">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {lotesFiltrados.map((lote) => (
                <tr
                  key={lote.id}
                  className="border-b border-[#E5EDE8] transition hover:bg-[#F8FBF8]"
                >
                  <td className="px-4 py-5 font-semibold text-[#16A34A]">
                    {lote.codigo}
                  </td>

                  <td className="px-4 py-5">
                    <p className="font-semibold text-slate-800">
                      {lote.especie}
                    </p>
                    <p className="text-xs text-slate-400">
                      {lote.variedad}
                    </p>
                  </td>

                  <td className="px-4 py-5 text-sm text-slate-600">
                    {lote.fechaSiembra}
                  </td>

                  <td className="px-4 py-5 text-sm text-slate-600">
                    {Number(lote.cantidad).toLocaleString("es-CO")} plantas
                  </td>

                  <td className="px-4 py-5">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        coloresEtapa[lote.etapa]
                      }`}
                    >
                      {lote.etapa}
                    </span>
                  </td>

                  <td className="px-4 py-5 text-sm text-slate-600">
                    {lote.responsable}
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        title="Ver detalles"
                        onClick={() => setLoteDetalle(lote)}
                        className="text-blue-500 transition hover:text-blue-700"
                      >
                        <Eye size={19} />
                      </button>

                      <button
                        title="Editar lote"
                        onClick={() => abrirEdicion(lote)}
                        className="text-[#16A34A] transition hover:text-green-700"
                      >
                        <Pencil size={19} />
                      </button>

                      <button
                        title="Eliminar lote"
                        onClick={() => eliminarLote(lote.id)}
                        className="text-red-500 transition hover:text-red-700"
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {lotesFiltrados.length === 0 && (
            <div className="py-12 text-center">
              <ClipboardList
                size={35}
                className="mx-auto mb-3 text-slate-300"
              />
              <p className="font-semibold text-slate-600">
                No se encontraron lotes
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Prueba con otra búsqueda o selecciona otra etapa.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-slate-400">
          Mostrando {lotesFiltrados.length} de {lotes.length} lotes.
        </div>
      </section>

      {/* MODAL NUEVO / EDITAR */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#0B2115]">
                  {loteEditando ? "Editar lote" : "Registrar nuevo lote"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Ingresa la información del cultivo.
                </p>
              </div>

              <button
                onClick={() => setModalAbierto(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={guardarLote} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <CampoFormulario
                  etiqueta="Especie"
                  valor={formulario.especie}
                  cambiar={(v) => actualizarCampo("especie", v)}
                  placeholder="Ej. Tomate"
                />

                <CampoFormulario
                  etiqueta="Variedad"
                  valor={formulario.variedad}
                  cambiar={(v) => actualizarCampo("variedad", v)}
                  placeholder="Ej. Chonto"
                />

                <CampoFormulario
                  etiqueta="Fecha de siembra"
                  tipo="date"
                  valor={formulario.fechaSiembra}
                  cambiar={(v) => actualizarCampo("fechaSiembra", v)}
                />

                <CampoFormulario
                  etiqueta="Cantidad de plantas"
                  tipo="number"
                  valor={formulario.cantidad}
                  cambiar={(v) => actualizarCampo("cantidad", v)}
                  placeholder="Ej. 500"
                />

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Etapa del cultivo
                  </label>
                  <select
                    value={formulario.etapa}
                    onChange={(e) =>
                      actualizarCampo("etapa", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#16A34A]"
                  >
                    {etapas.map((etapa) => (
                      <option key={etapa} value={etapa}>
                        {etapa}
                      </option>
                    ))}
                  </select>
                </div>

                <CampoFormulario
                  etiqueta="Responsable"
                  valor={formulario.responsable}
                  cambiar={(v) => actualizarCampo("responsable", v)}
                  placeholder="Nombre del responsable"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="flex flex-col-reverse justify-end gap-3 pt-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#009F6B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#00885B]"
                >
                  {loteEditando ? "Guardar cambios" : "Registrar lote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETALLES */}
      {loteDetalle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0B2115]">
                Detalles del lote
              </h2>
              <button
                onClick={() => setLoteDetalle(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-[#F1F6F2] p-4">
                <p className="text-xs text-slate-500">Código del lote</p>
                <p className="mt-1 text-lg font-bold text-[#16A34A]">
                  {loteDetalle.codigo}
                </p>
              </div>

              <DetalleDato etiqueta="Especie" valor={loteDetalle.especie} />
              <DetalleDato etiqueta="Variedad" valor={loteDetalle.variedad} />
              <DetalleDato
                etiqueta="Fecha de siembra"
                valor={loteDetalle.fechaSiembra}
              />
              <DetalleDato
                etiqueta="Cantidad"
                valor={`${Number(loteDetalle.cantidad).toLocaleString("es-CO")} plantas`}
              />
              <DetalleDato
                etiqueta="Responsable"
                valor={loteDetalle.responsable}
              />

              <div className="border-t border-slate-100 pt-4">
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  Etapa actual
                </p>

                <span
                  className={`rounded-full px-3 py-2 text-sm font-semibold ${
                    coloresEtapa[loteDetalle.etapa]
                  }`}
                >
                  {loteDetalle.etapa}
                </span>
              </div>

              <div className="pt-3">
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  Actualizar etapa del cultivo
                </p>

                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => cambiarEtapa(loteDetalle, -1)}
                    disabled={etapas.indexOf(loteDetalle.etapa) === 0}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronLeft size={17} />
                    Anterior
                  </button>

                  <button
                    onClick={() => cambiarEtapa(loteDetalle, 1)}
                    disabled={
                      etapas.indexOf(loteDetalle.etapa) ===
                      etapas.length - 1
                    }
                    className="flex items-center gap-1 rounded-lg bg-[#009F6B] px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Siguiente
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                <CheckCircle2 size={18} />
                Los cambios de etapa se reflejan en el resumen de producción.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* COMPONENTES AUXILIARES */

function TarjetaIndicador({ titulo, valor, descripcion, icono, color }) {
  return (
    <div className="rounded-2xl border border-[#DCE8DF] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{titulo}</p>
        <span className={color}>{icono}</span>
      </div>

      <p className="mt-3 text-3xl font-bold text-[#0B2115]">
        {valor}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {descripcion}
      </p>
    </div>
  );
}

function CampoFormulario({
  etiqueta,
  valor,
  cambiar,
  tipo = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {etiqueta}
      </label>
      <input
        type={tipo}
        value={valor}
        onChange={(e) => cambiar(e.target.value)}
        placeholder={placeholder}
        min={tipo === "number" ? "1" : undefined}
        required
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#16A34A]"
      />
    </div>
  );
}

function DetalleDato({ etiqueta, valor }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
      <span className="text-sm text-slate-500">{etiqueta}</span>
      <span className="text-right text-sm font-semibold text-slate-800">
        {valor}
      </span>
    </div>
  );
}
