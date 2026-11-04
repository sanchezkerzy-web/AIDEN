
"use client";

import { useState } from "react";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";

const datosIniciales = [
  { id: 1, nombre: "Fertilizante NPK", categoria: "Fertilizantes", cantidad: 25, unidad: "kg", minimo: 10 },
  { id: 2, nombre: "Sustrato orgánico", categoria: "Sustratos", cantidad: 8, unidad: "bultos", minimo: 10 },
  { id: 3, nombre: "Fungicida Mancozeb", categoria: "Fitosanitarios", cantidad: 4, unidad: "litros", minimo: 5 },
  { id: 4, nombre: "Semillas Café Castillo", categoria: "Semillas", cantidad: 1200, unidad: "unid.", minimo: 200 },
  { id: 5, nombre: "Macetas plásticas 1L", categoria: "Insumos", cantidad: 850, unidad: "unid.", minimo: 100 },
  { id: 6, nombre: "Tierra abonada", categoria: "Sustratos", cantidad: 3, unidad: "bultos", minimo: 8 },
  { id: 7, nombre: "Insecticida Imidacloprid", categoria: "Fitosanitarios", cantidad: 12, unidad: "ml", minimo: 20 },
  { id: 8, nombre: "Regaderas automáticas", categoria: "Equipos", cantidad: 6, unidad: "unid.", minimo: 3 },
];

const formularioVacio = {
  nombre: "",
  categoria: "Insumos",
  cantidad: "",
  unidad: "unid.",
  minimo: "",
};

export default function InventarioPage() {
  const [productos, setProductos] = useState(datosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formulario, setFormulario] = useState(formularioVacio);

  const obtenerEstado = (producto) => {
    if (producto.cantidad === 0) return "Agotado";
    if (producto.cantidad <= producto.minimo) return "Stock bajo";
    return "Disponible";
  };

  const filtrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "Todos" || producto.categoria === categoria;

    return coincideNombre && coincideCategoria;
  });

  const disponibles = productos.filter(
    (p) => obtenerEstado(p) === "Disponible"
  ).length;

  const stockBajo = productos.filter(
    (p) => obtenerEstado(p) === "Stock bajo"
  ).length;

  const agotados = productos.filter(
    (p) => obtenerEstado(p) === "Agotado"
  ).length;

  const abrirNuevo = () => {
    setProductoEditando(null);
    setFormulario(formularioVacio);
    setModalAbierto(true);
  };

  const abrirEditar = (producto) => {
    setProductoEditando(producto);
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      cantidad: String(producto.cantidad),
      unidad: producto.unidad,
      minimo: String(producto.minimo),
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoEditando(null);
    setFormulario(formularioVacio);
  };

  const guardarProducto = (e) => {
    e.preventDefault();

    const nombre = formulario.nombre.trim();

    if (!nombre) return;

    const cantidad = Number(formulario.cantidad);
    const minimo = Number(formulario.minimo);

    if (
      formulario.cantidad === "" ||
      formulario.minimo === "" ||
      !Number.isFinite(cantidad) ||
      !Number.isFinite(minimo) ||
      cantidad < 0 ||
      minimo < 0
    ) {
      alert("Ingresa cantidades válidas, iguales o mayores a cero.");
      return;
    }

    if (productoEditando) {
      setProductos((anteriores) =>
        anteriores.map((p) =>
          p.id === productoEditando.id
            ? {
                ...p,
                ...formulario,
                nombre,
                cantidad,
                minimo,
              }
            : p
        )
      );
    } else {
      const nuevoProducto = {
        id: Date.now(),
        ...formulario,
        nombre,
        cantidad,
        minimo,
      };

      setProductos((anteriores) => [...anteriores, nuevoProducto]);
    }

    cerrarModal();
  };

  const eliminarProducto = (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este insumo?"
    );

    if (confirmar) {
      setProductos((anteriores) =>
        anteriores.filter((p) => p.id !== id)
      );
    }
  };

  return (
    <div className="space-y-6 font-sans text-slate-800">

      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Inventario
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Control y seguimiento de los insumos de AiDEN.
          </p>
        </div>

        <button
          onClick={abrirNuevo}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <Plus size={18} />
          Nuevo insumo
        </button>
      </div>

      {/* Buscador y filtros */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar insumo..."
            className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="min-w-[180px] rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
        >
          <option>Todos</option>
          <option>Fertilizantes</option>
          <option>Sustratos</option>
          <option>Fitosanitarios</option>
          <option>Semillas</option>
          <option>Insumos</option>
          <option>Equipos</option>
        </select>
      </div>

      {/* Indicadores */}
      <div className="flex flex-wrap justify-end gap-2">
        <div className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700">
          {disponibles} disponibles
        </div>

        <div className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold text-amber-700">
          {stockBajo} stock bajo
        </div>

        <div className="rounded-full bg-red-100 px-4 py-2 text-xs font-semibold text-red-700">
          {agotados} agotados
        </div>
      </div>

      {/* Tabla */}
      <section className="overflow-hidden rounded-xl border border-[#DCE8DF] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F1F6F2] text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Insumo</th>
                <th className="px-5 py-4">Categoría</th>
                <th className="px-5 py-4">Cantidad</th>
                <th className="px-5 py-4">Unidad</th>
                <th className="px-5 py-4">Stock mín.</th>
                <th className="px-5 py-4">Estado</th>
                <th className="px-5 py-4">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filtrados.map((producto) => {
                const estado = obtenerEstado(producto);

                return (
                  <tr
                    key={producto.id}
                    className="border-t border-[#E5EDE8] transition hover:bg-[#F8FBF8]"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {producto.nombre}
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {producto.categoria}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {producto.cantidad}
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {producto.unidad}
                    </td>

                    <td className="px-5 py-4">
                      {producto.minimo}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                          estado === "Disponible"
                            ? "bg-emerald-100 text-emerald-700"
                            : estado === "Stock bajo"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {estado}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => abrirEditar(producto)}
                          className="rounded-md border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:bg-slate-100"
                        >
                          <span className="flex items-center gap-1">
                            <Pencil size={13} />
                            Editar
                          </span>
                        </button>

                        <button
                          onClick={() => eliminarProducto(producto.id)}
                          className="rounded-md border border-red-200 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-50"
                        >
                          <span className="flex items-center gap-1">
                            <Trash2 size={13} />
                            Eliminar
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtrados.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-10 text-center text-slate-400">
                    No se encontraron insumos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Formulario para crear o editar */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">
                {productoEditando ? "Editar insumo" : "Nuevo insumo"}
              </h2>

              <button
                onClick={cerrarModal}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={guardarProducto} className="space-y-4">

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Nombre del insumo
                </label>
                <input
                  required
                  value={formulario.nombre}
                  onChange={(e) =>
                    setFormulario({ ...formulario, nombre: e.target.value })
                  }
                  placeholder="Ej. Fertilizante orgánico"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Categoría
                </label>
                <select
                  value={formulario.categoria}
                  onChange={(e) =>
                    setFormulario({ ...formulario, categoria: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                >
                  <option>Fertilizantes</option>
                  <option>Sustratos</option>
                  <option>Fitosanitarios</option>
                  <option>Semillas</option>
                  <option>Insumos</option>
                  <option>Equipos</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Cantidad
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={formulario.cantidad}
                    onChange={(e) =>
                      setFormulario({ ...formulario, cantidad: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Unidad
                  </label>
                  <select
                    value={formulario.unidad}
                    onChange={(e) =>
                      setFormulario({ ...formulario, unidad: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                  >
                    <option>unid.</option>
                    <option>kg</option>
                    <option>gramos</option>
                    <option>litros</option>
                    <option>ml</option>
                    <option>bultos</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Stock mínimo
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  value={formulario.minimo}
                  onChange={(e) =>
                    setFormulario({ ...formulario, minimo: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  {productoEditando ? "Guardar cambios" : "Registrar insumo"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
