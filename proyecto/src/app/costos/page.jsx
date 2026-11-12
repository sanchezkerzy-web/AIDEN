"use client";

import { useState } from "react";

import {
  CalendarDays,
  Sprout,
  Wrench,
  Plus,
  ChartNoAxesColumn,
  Clock,
  Save,
  Search,
  Filter,
  ArrowUpRight,
  Leaf,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import BarraLateral from "../../components/navegacion/BarraLateral";
import BarraSuperior from "../../components/navegacion/BarraSuperior";

// ==========================================
// DATOS DE DEMOSTRACIÓN
// ==========================================

const datosMensuales = [
  { mes: "Abr", total: 6, produccion: 3.5, operativos: 2 },
  { mes: "May", total: 7.2, produccion: 4.1, operativos: 2.5 },
  { mes: "Jun", total: 7.2, produccion: 4, operativos: 2.5 },
  { mes: "Jul", total: 7.9, produccion: 4.8, operativos: 3 },
  { mes: "Ago", total: 8.4, produccion: 5.1, operativos: 3.2 },
  { mes: "Sep", total: 8.8, produccion: 5.2, operativos: 3.2 },
];

const datosCategorias = [
  { nombre: "Insumos", valor: 35, color: "#14532d" },
  { nombre: "Mano de Obra", valor: 25, color: "#16a34a" },
  { nombre: "Agua y Energía", valor: 20, color: "#86efac" },
  { nombre: "Mantenimiento", valor: 10, color: "#94a3b8" },
  { nombre: "Transporte", valor: 10, color: "#8b5cf6" },
];

const lotes = [
  {
    lote: "LT-2024-089",
    planta: "Rosa canina",
    inversion: 450000,
    unidades: 100,
  },
  {
    lote: "LT-2024-091",
    planta: "Begonia bicolor",
    inversion: 320000,
    unidades: 80,
  },
  {
    lote: "LT-2024-094",
    planta: "Crisantemo amarillo",
    inversion: 280000,
    unidades: 70,
  },
];

const registrosIniciales = [
  {
    id: 1,
    fecha: "28/09/2026",
    concepto: "Fertilizante",
    categoria: "Insumos",
    valor: 450000,
  },
  {
    id: 2,
    fecha: "27/09/2026",
    concepto: "Mantenimiento riego",
    categoria: "Mantenimiento",
    valor: 180000,
  },
  {
    id: 3,
    fecha: "25/09/2026",
    concepto: "Pago personal",
    categoria: "Mano de Obra",
    valor: 750000,
  },
];

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

const formatoDinero = (valor) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function CostosPage() {
  const [registros, setRegistros] = useState(registrosIniciales);

  const [buscar, setBuscar] = useState("");

  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    valor: "",
    fecha: "",
    lote: "",
    responsable: "",
  });

  // Actualizar campos del formulario
  const actualizarFormulario = (e) => {
    const { name, value } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  // Registrar un nuevo costo
  const registrarCosto = (e) => {
    e.preventDefault();

    const nuevoRegistro = {
      id: Date.now(),
      fecha: formulario.fecha.split("-").reverse().join("/"),
      concepto: formulario.nombre,
      categoria: formulario.categoria,
      valor: Number(formulario.valor),
    };

    setRegistros((anteriores) => [
      nuevoRegistro,
      ...anteriores,
    ]);

    setFormulario({
      nombre: "",
      categoria: "",
      descripcion: "",
      valor: "",
      fecha: "",
      lote: "",
      responsable: "",
    });
  };

  // Filtrar registros
  const registrosFiltrados = registros.filter((registro) => {
    const coincideBusqueda = registro.concepto
      .toLowerCase()
      .includes(buscar.toLowerCase());

    const coincideCategoria =
      categoriaFiltro === "Todas" ||
      registro.categoria === categoriaFiltro;

    return coincideBusqueda && coincideCategoria;
  });

  // Calcular total de gastos registrados
  const totalRegistros = registros.reduce(
    (total, registro) => total + registro.valor,
    0
  );

  return (
    <section className="flex h-screen bg-slate-100 overflow-hidden text-slate-900">

      {/* BARRA LATERAL */}

      <BarraLateral />

      <section className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* BARRA SUPERIOR */}

        <BarraSuperior />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">

          {/* ENCABEZADO */}

          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

            <section className="flex items-center gap-4">

              <span className="bg-green-100 p-3 rounded-xl">
                <Sprout
                  size={32}
                  className="text-green-700"
                />
              </span>

              <section>
                <h1 className="text-2xl font-bold text-slate-800">
                  Costos
                </h1>

                <p className="text-sm text-slate-500">
                  Control financiero del vivero
                </p>
              </section>

            </section>

            <button
              type="button"
              className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm hover:bg-slate-50"
            >
              <CalendarDays size={17} />
              Últimos 6 meses
            </button>

          </header>

          {/* INDICADORES PRINCIPALES */}

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            <TarjetaIndicador
              titulo="Costos del Mes"
              valor="$8.500.000"
              porcentaje="+12%"
              icono={<CalendarDays size={24} />}
            />

            <TarjetaIndicador
              titulo="Costos de Producción"
              valor="$5.200.000"
              porcentaje="+8%"
              icono={<Sprout size={24} />}
            />

            <TarjetaIndicador
              titulo="Costos Operativos"
              valor="$3.300.000"
              porcentaje="+15%"
              icono={<Wrench size={24} />}
            />

            <TarjetaIndicador
              titulo="Costo Promedio por Planta"
              valor="$4.250"
              porcentaje="+6%"
              icono={<Leaf size={24} />}
            />

          </section>

          {/* GRÁFICAS Y FORMULARIO */}

          <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 mb-6">

            {/* EVOLUCIÓN DE COSTOS */}

            <article className="xl:col-span-5 bg-white rounded-xl p-5 shadow-sm border border-slate-200">

              <header className="mb-5">

                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <ChartNoAxesColumn
                    className="text-green-700"
                    size={21}
                  />

                  Evolución de Costos
                </h2>

              </header>

              <figure className="h-64">

                <ResponsiveContainer width="100%" height="100%">

                  <LineChart data={datosMensuales}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      dataKey="mes"
                      tick={{ fontSize: 12 }}
                    />

                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickFormatter={(valor) => `${valor}M`}
                    />

                    <Tooltip
                      formatter={(valor) => `${valor} millones`}
                    />

                    <Line
                      type="monotone"
                      dataKey="total"
                      name="Costos Totales"
                      stroke="#064e3b"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="produccion"
                      name="Producción"
                      stroke="#16a34a"
                      strokeWidth={2}
                    />

                    <Line
                      type="monotone"
                      dataKey="operativos"
                      name="Operativos"
                      stroke="#14532d"
                      strokeWidth={2}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </figure>

            </article>

            {/* GASTOS POR CATEGORÍA */}

            <article className="xl:col-span-4 bg-white rounded-xl p-5 shadow-sm border border-slate-200">

              <header className="mb-3">

                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <Leaf
                    size={20}
                    className="text-green-700"
                  />

                  Gastos por Categoría
                </h2>

              </header>

              <section className="h-64 flex flex-col sm:flex-row items-center">

                <figure className="w-full sm:w-1/2 h-full">

                  <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                      <Pie
                        data={datosCategorias}
                        dataKey="valor"
                        nameKey="nombre"
                        cx="50%"
                        cy="50%"
                        outerRadius={85}
                        label={({ value }) => `${value}%`}
                      >

                        {datosCategorias.map((item) => (
                          <Cell
                            key={item.nombre}
                            fill={item.color}
                          />
                        ))}

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </figure>

                <ul className="w-full sm:w-1/2 space-y-3">

                  {datosCategorias.map((item) => (
                    <li
                      key={item.nombre}
                      className="flex items-center justify-between gap-2 text-xs"
                    >

                      <span className="flex items-center gap-2 text-slate-600">

                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: item.color,
                          }}
                        />

                        {item.nombre}

                      </span>

                      <strong>
                        {item.valor}%
                      </strong>

                    </li>
                  ))}

                </ul>

              </section>

            </article>

            {/* FORMULARIO REGISTRAR COSTO */}

            <aside className="xl:col-span-3 bg-white rounded-xl p-5 shadow-sm border border-slate-200">

              <header className="mb-5">

                <h2 className="font-bold text-slate-800 flex items-center gap-2">

                  <span className="bg-green-800 text-white p-1.5 rounded-full">
                    <Plus size={19} />
                  </span>

                  Registrar Costo

                </h2>

              </header>

              <form
                onSubmit={registrarCosto}
                className="space-y-3"
              >

                <CampoFormulario
                  titulo="Nombre del Gasto"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={actualizarFormulario}
                  placeholder="Ej: Fertilizante NPK"
                  required
                />

                <section>

                  <label className="block text-sm font-semibold mb-1">
                    Categoría *
                  </label>

                  <select
                    name="categoria"
                    value={formulario.categoria}
                    onChange={actualizarFormulario}
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600"
                  >

                    <option value="">
                      Selecciona una categoría
                    </option>

                    <option value="Insumos">
                      Insumos y Fertilizantes
                    </option>

                    <option value="Mano de Obra">
                      Mano de Obra
                    </option>

                    <option value="Agua y Energía">
                      Agua y Energía
                    </option>

                    <option value="Mantenimiento">
                      Mantenimiento
                    </option>

                    <option value="Transporte">
                      Transporte
                    </option>

                    <option value="Otros">
                      Otros
                    </option>

                  </select>

                </section>

                <section>

                  <label className="block text-sm font-semibold mb-1">
                    Descripción
                  </label>

                  <textarea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={actualizarFormulario}
                    placeholder="Descripción adicional..."
                    rows="2"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600 resize-none"
                  />

                </section>

                <CampoFormulario
                  titulo="Valor"
                  name="valor"
                  type="number"
                  value={formulario.valor}
                  onChange={actualizarFormulario}
                  placeholder="Digite el valor"
                  required
                />

                <CampoFormulario
                  titulo="Fecha"
                  name="fecha"
                  type="date"
                  value={formulario.fecha}
                  onChange={actualizarFormulario}
                  required
                />

                <section>

                  <label className="block text-sm font-semibold mb-1">
                    Lote Relacionado
                    <span className="font-normal text-slate-400">
                      {" "} (opcional)
                    </span>
                  </label>

                  <select
                    name="lote"
                    value={formulario.lote}
                    onChange={actualizarFormulario}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600"
                  >

                    <option value="">
                      Selecciona un lote
                    </option>

                    {lotes.map((lote) => (
                      <option
                        key={lote.lote}
                        value={lote.lote}
                      >
                        {lote.lote}
                      </option>
                    ))}

                  </select>

                </section>

                <CampoFormulario
                  titulo="Responsable"
                  name="responsable"
                  value={formulario.responsable}
                  onChange={actualizarFormulario}
                  placeholder="Nombre del responsable"
                />

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-lg py-3 transition-colors"
                >

                  <Save size={18} />

                  Guardar Costo

                </button>

              </form>

            </aside>

          </section>

          {/* TABLAS INFERIORES */}

          <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">

            {/* COSTOS POR LOTE */}

            <article className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">

              <header className="flex items-center justify-between mb-4">

                <h2 className="font-bold text-slate-800 flex items-center gap-2">

                  <Sprout
                    size={21}
                    className="text-green-700"
                  />

                  Costos por Lote

                </h2>

                <button
                  type="button"
                  className="text-xs font-semibold text-green-800 bg-green-100 px-3 py-2 rounded-lg"
                >
                  Ver Todos →
                </button>

              </header>

              <section className="overflow-x-auto">

                <table className="w-full text-sm text-left">

                  <thead className="bg-slate-100 text-slate-700">

                    <tr>
                      <th className="p-3">Lote</th>
                      <th className="p-3">Planta</th>
                      <th className="p-3">Inversión</th>
                      <th className="p-3">Unidades</th>
                      <th className="p-3">Costo por Planta</th>
                    </tr>

                  </thead>

                  <tbody>

                    {lotes.map((lote) => (
                      <tr
                        key={lote.lote}
                        className="border-b border-slate-100"
                      >

                        <td className="p-3 font-medium">
                          {lote.lote}
                        </td>

                        <td className="p-3">
                          {lote.planta}
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          {formatoDinero(lote.inversion)}
                        </td>

                        <td className="p-3">
                          {lote.unidades}
                        </td>

                        <td className="p-3 font-semibold whitespace-nowrap">
                          {formatoDinero(
                            lote.inversion / lote.unidades
                          )}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </section>

            </article>

            {/* ÚLTIMOS REGISTROS */}

            <article className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">

              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">

                <h2 className="font-bold text-slate-800 flex items-center gap-2">

                  <Clock
                    size={21}
                    className="text-green-700"
                  />

                  Últimos Registros

                </h2>

                <span className="text-xs font-semibold text-green-800 bg-green-100 px-3 py-2 rounded-lg">

                  Total: {formatoDinero(totalRegistros)}

                </span>

              </header>

              {/* BÚSQUEDA Y FILTROS */}

              <section className="flex flex-col sm:flex-row gap-2 mb-4">

                <label className="relative flex-1">

                  <Search
                    size={16}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <input
                    type="search"
                    value={buscar}
                    onChange={(e) => setBuscar(e.target.value)}
                    placeholder="Buscar gasto..."
                    className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600"
                  />

                </label>

                <label className="relative">

                  <Filter
                    size={15}
                    className="absolute left-3 top-3 text-slate-400"
                  />

                  <select
                    value={categoriaFiltro}
                    onChange={(e) => setCategoriaFiltro(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-sm outline-none"
                  >

                    <option value="Todas">
                      Todas
                    </option>

                    <option value="Insumos">
                      Insumos
                    </option>

                    <option value="Mano de Obra">
                      Mano de Obra
                    </option>

                    <option value="Agua y Energía">
                      Agua y Energía
                    </option>

                    <option value="Mantenimiento">
                      Mantenimiento
                    </option>

                    <option value="Transporte">
                      Transporte
                    </option>

                    <option value="Otros">
                      Otros
                    </option>

                  </select>

                </label>

              </section>

              {/* TABLA DE REGISTROS */}

              <section className="overflow-x-auto">

                <table className="w-full text-sm text-left">

                  <thead className="bg-slate-100 text-slate-700">

                    <tr>
                      <th className="p-3">Fecha</th>
                      <th className="p-3">Concepto</th>
                      <th className="p-3">Categoría</th>
                      <th className="p-3">Valor</th>
                    </tr>

                  </thead>

                  <tbody>

                    {registrosFiltrados.map((registro) => (
                      <tr
                        key={registro.id}
                        className="border-b border-slate-100"
                      >

                        <td className="p-3 whitespace-nowrap">
                          <span className="text-green-600 mr-2">
                            ●
                          </span>

                          {registro.fecha}
                        </td>

                        <td className="p-3">
                          {registro.concepto}
                        </td>

                        <td className="p-3">
                          {registro.categoria}
                        </td>

                        <td className="p-3 font-semibold whitespace-nowrap">
                          {formatoDinero(registro.valor)}
                        </td>

                      </tr>
                    ))}

                    {registrosFiltrados.length === 0 && (

                      <tr>
                        <td
                          colSpan="4"
                          className="text-center p-6 text-slate-400"
                        >
                          No se encontraron registros.
                        </td>
                      </tr>

                    )}

                  </tbody>

                </table>

              </section>

            </article>

          </section>

          <footer className="text-center text-xs text-slate-400 py-6">
            AiDEN · Sistema de Gestión de Viveros
          </footer>

        </main>

      </section>

    </section>
  );
}

// ==========================================
// COMPONENTE: TARJETA DE INDICADOR
// ==========================================

function TarjetaIndicador({
  titulo,
  valor,
  porcentaje,
  icono,
}) {
  return (
    <article className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">

      <span className="bg-green-800 text-white rounded-full p-4 shrink-0">
        {icono}
      </span>

      <section className="min-w-0">

        <h2 className="text-sm text-slate-600">
          {titulo}
        </h2>

        <p className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
          {valor}
        </p>

        <p className="text-xs text-green-700 font-semibold mt-2 flex items-center gap-1">

          <ArrowUpRight size={14} />

          {porcentaje} vs. mes anterior

        </p>

      </section>

    </article>
  );
}

// ==========================================
// COMPONENTE: CAMPO DEL FORMULARIO
// ==========================================

function CampoFormulario({
  titulo,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <section>

      <label className="block text-sm font-semibold mb-1">
        {titulo}

        {required && (
          <span className="text-red-500"> *</span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={type === "number" ? "1" : undefined}
        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600"
      />

    </section>
  );
}