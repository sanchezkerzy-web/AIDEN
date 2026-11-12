
"use client";

import { useMemo, useState } from "react";
import {
  Settings,
  ShieldCheck,
  Clock,
  Building2,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Eye,
  Download,
  Save,
  Users,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const estructuraInicial = [
  {
    id: 1,
    tipo: "Vivero / sede",
    nombre: "Vivero Popayán - Sede Norte",
    descripcion: "Operación, propagación y reparto de especies",
    responsables: "Todos",
    estado: "Obligatorio",
  },
  {
    id: 2,
    tipo: "Bodega",
    nombre: "Bodega insumos químicos",
    descripcion: "Ubicación de inventario, equipos y otros insumos",
    responsables: "Inventario, Costos, Calidad",
    estado: "En operación",
  },
  {
    id: 3,
    tipo: "Centro de costo",
    nombre: "Producción vivero - Café",
    descripcion: "Imputación de insumos, mano de obra y costos",
    responsables: "Cultivos, Personal, Reportes",
    estado: "No configurado",
  },
  {
    id: 4,
    tipo: "Zona productiva",
    nombre: "Germinación norte - Café 1",
    descripcion: "Área asignada para germinación y producción",
    responsables: "Cultivos, Ambiental, Personal",
    estado: "Vinculada",
  },
];

const parametrosIniciales = [
  {
    id: 1,
    area: "Tipo de cultivo",
    elementos: "Tomate, lechuga, café, aromáticas",
    validacion: "Nombres únicos",
    uso: "Cultivos, lotes, semillas, reportes",
    estado: "Activo",
  },
  {
    id: 2,
    area: "Unidades de medida",
    elementos: "kg, L, unidad, saco, m²",
    validacion: "Duplicados rechazados",
    uso: "Inventario, insumos, consumos",
    estado: "Activo",
  },
  {
    id: 3,
    area: "Categorías y subcategorías de insumos",
    elementos: "Fertilizantes, nutrición, sustratos, protección",
    validacion: "Subcategorías independientes",
    uso: "Inventario, tratamientos, reportes",
    estado: "Activo",
  },
  {
    id: 4,
    area: "Tipos de actividad",
    elementos: "Riego, fertilización, poda, germinación, cosecha",
    validacion: "Nombre único por catálogo",
    uso: "Actividades, tareas, informes",
    estado: "Activo",
  },
  {
    id: 5,
    area: "Zonas y variables ambientales",
    elementos: "Germinación, PN, CO₂, luz",
    validacion: "Ubicación con sensor",
    uso: "Sensores, riego y controles",
    estado: "1 variable crítica",
  },
  {
    id: 6,
    area: "Proveedores y terceros",
    elementos: "BioTierra, AgroAndes, servicio externo",
    validacion: "NIT/documento único",
    uso: "Compras, inventario, costos y reportes",
    estado: "Activo",
  },
];

const usuariosIniciales = [
  {
    id: 1,
    nombre: "Administrador AIDEN",
    correo: "admin@aiden.com",
    rol: "Administrador",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Supervisor Vivero",
    correo: "supervisor@aiden.com",
    rol: "Supervisor",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Operario Vivero",
    correo: "operario@aiden.com",
    rol: "Operario",
    estado: "Activo",
  },
];

const auditoriaInicial = [
  {
    id: 1,
    fecha: "2026-05-08 09:12",
    usuario: "Administrador AIDEN",
    modulo: "Parámetros",
    campo: "Zona",
    detalle: "Inventario 1",
    resultado: "Registrado",
  },
  {
    id: 2,
    fecha: "2026-05-08 08:45",
    usuario: "Supervisor Vivero",
    modulo: "Seguridad",
    campo: "Acceso",
    detalle: "Intento de acceso",
    resultado: "Bloqueado por rol",
  },
];

const permisosIniciales = [
  {
    modulo: "Inventario",
    administrador: true,
    supervisor: true,
    operario: true,
  },
  {
    modulo: "Producción",
    administrador: true,
    supervisor: true,
    operario: true,
  },
  {
    modulo: "Ambiental",
    administrador: true,
    supervisor: true,
    operario: false,
  },
  {
    modulo: "Configuración",
    administrador: true,
    supervisor: false,
    operario: false,
  },
  {
    modulo: "Reportes",
    administrador: true,
    supervisor: true,
    operario: false,
  },
];

const formularioVacio = {
  area: "",
  elementos: "",
  validacion: "",
  uso: "",
};

const estructuraVacia = {
  tipo: "Centro de costo",
  nombre: "",
  descripcion: "",
  responsables: "",
  estado: "En operación",
};

const usuarioVacio = {
  nombre: "",
  correo: "",
  rol: "Operario",
};

export default function ConfiguracionPage() {
  const [estructura, setEstructura] = useState(estructuraInicial);
  const [parametros, setParametros] = useState(parametrosIniciales);
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [auditoria, setAuditoria] = useState(auditoriaInicial);
  const [permisos, setPermisos] = useState(permisosIniciales);

  const [busqueda, setBusqueda] = useState("");
  const [busquedaEstructura, setBusquedaEstructura] = useState("");

  const [modal, setModal] = useState(null);
  const [editando, setEditando] = useState(null);

  const [formulario, setFormulario] = useState(formularioVacio);
  const [formEstructura, setFormEstructura] = useState(estructuraVacia);
  const [formUsuario, setFormUsuario] = useState(usuarioVacio);

  const [mensaje, setMensaje] = useState("");

  const parametrosFiltrados = useMemo(() => {
    return parametros.filter((item) =>
      `${item.area} ${item.elementos} ${item.uso}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
  }, [parametros, busqueda]);

  const estructuraFiltrada = useMemo(() => {
    return estructura.filter((item) =>
      `${item.tipo} ${item.nombre} ${item.descripcion}`
        .toLowerCase()
        .includes(busquedaEstructura.toLowerCase())
    );
  }, [estructura, busquedaEstructura]);

  const registrarAuditoria = (modulo, campo, detalle) => {
    const nuevoRegistro = {
      id: Date.now(),
      fecha: new Date().toLocaleString("es-CO"),
      usuario: "Administrador AIDEN",
      modulo,
      campo,
      detalle,
      resultado: "Registrado",
    };

    setAuditoria((anterior) => [nuevoRegistro, ...anterior]);
  };

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    window.setTimeout(() => setMensaje(""), 3500);
  };

  const abrirNuevoParametro = () => {
    setEditando(null);
    setFormulario(formularioVacio);
    setModal("parametro");
  };

  const abrirEditarParametro = (item) => {
    setEditando(item);
    setFormulario({
      area: item.area,
      elementos: item.elementos,
      validacion: item.validacion,
      uso: item.uso,
    });
    setModal("parametro");
  };

  const guardarParametro = (e) => {
    e.preventDefault();

    const area = formulario.area.trim();

    if (!area || !formulario.elementos.trim()) {
      mostrarMensaje("Completa los campos obligatorios.");
      return;
    }

    const duplicado = parametros.some(
      (p) =>
        p.area.toLowerCase() === area.toLowerCase() &&
        p.id !== editando?.id
    );

    if (duplicado) {
      mostrarMensaje("Ya existe un parámetro con ese nombre.");
      return;
    }

    if (editando) {
      setParametros((anterior) =>
        anterior.map((p) =>
          p.id === editando.id
            ? { ...p, ...formulario, area }
            : p
        )
      );

      registrarAuditoria("Parámetros", area, "Parámetro actualizado");
      mostrarMensaje("Parámetro actualizado correctamente.");
    } else {
      const nuevo = {
        id: Date.now(),
        ...formulario,
        area,
        estado: "Activo",
      };

      setParametros((anterior) => [...anterior, nuevo]);

      registrarAuditoria("Parámetros", area, "Nuevo parámetro creado");
      mostrarMensaje("Parámetro creado correctamente.");
    }

    setModal(null);
  };

  const eliminarParametro = (item) => {
    const confirmar = window.confirm(
      `¿Deseas eliminar el parámetro "${item.area}"?`
    );

    if (!confirmar) return;

    setParametros((anterior) =>
      anterior.filter((p) => p.id !== item.id)
    );

    registrarAuditoria("Parámetros", item.area, "Parámetro eliminado");
    mostrarMensaje("Parámetro eliminado.");
  };

  const abrirNuevaEstructura = () => {
    setEditando(null);
    setFormEstructura(estructuraVacia);
    setModal("estructura");
  };

  const abrirEditarEstructura = (item) => {
    setEditando(item);
    setFormEstructura({
      tipo: item.tipo,
      nombre: item.nombre,
      descripcion: item.descripcion,
      responsables: item.responsables,
      estado: item.estado,
    });
    setModal("estructura");
  };

  const guardarEstructura = (e) => {
    e.preventDefault();

    const nombre = formEstructura.nombre.trim();

    if (!nombre) {
      mostrarMensaje("Debes ingresar el nombre.");
      return;
    }

    if (editando) {
      setEstructura((anterior) =>
        anterior.map((item) =>
          item.id === editando.id
            ? { ...item, ...formEstructura, nombre }
            : item
        )
      );

      registrarAuditoria("Estructura ERP", nombre, "Registro actualizado");
      mostrarMensaje("Registro actualizado.");
    } else {
      const nuevo = {
        id: Date.now(),
        ...formEstructura,
        nombre,
      };

      setEstructura((anterior) => [...anterior, nuevo]);

      registrarAuditoria("Estructura ERP", nombre, "Nuevo registro creado");
      mostrarMensaje("Registro creado correctamente.");
    }

    setModal(null);
  };

  const eliminarEstructura = (item) => {
    if (!window.confirm(`¿Eliminar "${item.nombre}"?`)) return;

    setEstructura((anterior) =>
      anterior.filter((registro) => registro.id !== item.id)
    );

    registrarAuditoria("Estructura ERP", item.nombre, "Registro eliminado");
    mostrarMensaje("Registro eliminado.");
  };

  const abrirNuevoUsuario = () => {
    setEditando(null);
    setFormUsuario(usuarioVacio);
    setModal("usuario");
  };

  const guardarUsuario = (e) => {
    e.preventDefault();

    const nombre = formUsuario.nombre.trim();
    const correo = formUsuario.correo.trim().toLowerCase();

    if (!nombre || !correo) {
      mostrarMensaje("Completa todos los campos del usuario.");
      return;
    }

    const duplicado = usuarios.some(
      (u) => u.correo.toLowerCase() === correo && u.id !== editando?.id
    );

    if (duplicado) {
      mostrarMensaje("Este correo ya está registrado.");
      return;
    }

    if (editando) {
      setUsuarios((anterior) =>
        anterior.map((u) =>
          u.id === editando.id
            ? { ...u, ...formUsuario, nombre, correo }
            : u
        )
      );
      registrarAuditoria("Usuarios", nombre, "Usuario actualizado");
      mostrarMensaje("Usuario actualizado.");
    } else {
      const nuevo = {
        id: Date.now(),
        ...formUsuario,
        nombre,
        correo,
        estado: "Activo",
      };

      setUsuarios((anterior) => [...anterior, nuevo]);
      registrarAuditoria("Usuarios", nombre, "Usuario creado");
      mostrarMensaje("Usuario creado correctamente.");
    }

    setModal(null);
  };

  const editarUsuario = (usuario) => {
    setEditando(usuario);
    setFormUsuario({
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    });
    setModal("usuario");
  };

  const cambiarEstadoUsuario = (usuario) => {
    const nuevoEstado =
      usuario.estado === "Activo" ? "Inactivo" : "Activo";

    setUsuarios((anterior) =>
      anterior.map((u) =>
        u.id === usuario.id ? { ...u, estado: nuevoEstado } : u
      )
    );

    registrarAuditoria(
      "Usuarios",
      usuario.nombre,
      `Usuario ${nuevoEstado.toLowerCase()}`
    );

    mostrarMensaje(`Usuario ${nuevoEstado.toLowerCase()}.`);
  };

  const cambiarPermiso = (indice, rol) => {
    setPermisos((anterior) =>
      anterior.map((permiso, i) =>
        i === indice
          ? { ...permiso, [rol]: !permiso[rol] }
          : permiso
      )
    );

    registrarAuditoria(
      "Seguridad",
      rol,
      "Permisos actualizados"
    );
  };

  const exportarParametros = () => {
    const encabezados = [
      "Área",
      "Elementos",
      "Validación",
      "Uso en sistema",
      "Estado",
    ];

    const filas = parametros.map((p) => [
      p.area,
      p.elementos,
      p.validacion,
      p.uso,
      p.estado,
    ]);

    const contenido = [encabezados, ...filas]
      .map((fila) =>
        fila.map((valor) => `"${String(valor).replaceAll('"', '""')}"`).join(";")
      )
      .join("\n");

    const archivo = new Blob(["\uFEFF" + contenido], {
      type: "text/csv;charset=utf-8;",
    });

    const enlace = document.createElement("a");
    const url = URL.createObjectURL(archivo);

    enlace.href = url;
    enlace.download = "parametros-aiden.csv";
    enlace.click();

    URL.revokeObjectURL(url);

    mostrarMensaje("Archivo exportado correctamente.");
  };

  const cerrarModal = () => {
    setModal(null);
    setEditando(null);
  };

  const activos = usuarios.filter((u) => u.estado === "Activo").length;

  return (
    <main className="space-y-6 font-sans text-slate-800">
      {/* Encabezado */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <Settings size={15} aria-hidden="true" />
            Módulo 01 · Administración
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            Configuración del sistema
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Administra los parámetros, usuarios, permisos y estructura ERP de AIDEN.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => mostrarMensaje("La bitácora está disponible más abajo.")}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Eye size={17} aria-hidden="true" />
            Ver auditoría
          </button>

          <button
            type="button"
            onClick={abrirNuevaEstructura}
            className="flex items-center gap-2 rounded-lg bg-[#0b5738] px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <Plus size={17} aria-hidden="true" />
            Nuevo centro
          </button>
        </div>
      </header>

      {/* Mensajes de operación */}
      {mensaje && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
        >
          <CheckCircle2 size={18} aria-hidden="true" />
          {mensaje}
        </div>
      )}

      {/* Indicadores */}
      <section
        aria-label="Resumen de configuración"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <article className="rounded-xl border border-[#DCE8DF] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Parámetros maestros
            </span>
            <Settings className="text-emerald-700" size={21} aria-hidden="true" />
          </div>
          <p className="text-3xl font-bold text-slate-800">
            {parametros.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Catálogos configurables
          </p>
        </article>

        <article className="rounded-xl border border-[#DCE8DF] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Roles oficiales
            </span>
            <ShieldCheck className="text-blue-700" size={21} aria-hidden="true" />
          </div>
          <p className="text-3xl font-bold text-slate-800">3</p>
          <p className="mt-1 text-xs text-slate-500">
            Administrador, supervisor y operario
          </p>
        </article>

        <article className="rounded-xl border border-[#DCE8DF] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Sesión
            </span>
            <Clock className="text-blue-700" size={21} aria-hidden="true" />
          </div>
          <p className="text-3xl font-bold text-slate-800">30 min</p>
          <p className="mt-1 text-xs text-slate-500">
            Tiempo de sesión de referencia
          </p>
        </article>

        <article className="rounded-xl border border-[#DCE8DF] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Centros y usuarios
            </span>
            <Building2 className="text-emerald-700" size={21} aria-hidden="true" />
          </div>
          <p className="text-3xl font-bold text-slate-800">
            {estructura.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {activos} usuarios activos
          </p>
        </article>
      </section>

      {/* Estructura ERP */}
      <section
        aria-labelledby="titulo-estructura"
        className="overflow-hidden rounded-xl border border-[#DCE8DF] bg-white shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EDE8] p-5">
          <div>
            <h2 id="titulo-estructura" className="font-bold text-slate-800">
              Estructura ERP del vivero
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Define las sedes, bodegas, centros de costo y zonas productivas.
            </p>
          </div>

          <button
            type="button"
            onClick={abrirNuevaEstructura}
            className="flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
          >
            <Plus size={15} aria-hidden="true" />
            Nuevo registro
          </button>
        </div>

        <div className="border-b border-[#E5EDE8] p-4">
          <label htmlFor="buscar-estructura" className="sr-only">
            Buscar en la estructura ERP
          </label>
          <div className="relative max-w-md">
            <Search
              size={17}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="buscar-estructura"
              type="search"
              value={busquedaEstructura}
              onChange={(e) => setBusquedaEstructura(e.target.value)}
              placeholder="Buscar sede, bodega o centro..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <caption className="sr-only">
              Registros de la estructura ERP del vivero.
            </caption>
            <thead className="bg-[#F1F6F2] text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-5 py-4">Tipo</th>
                <th scope="col" className="px-5 py-4">Elemento</th>
                <th scope="col" className="px-5 py-4">Descripción</th>
                <th scope="col" className="px-5 py-4">Módulos relacionados</th>
                <th scope="col" className="px-5 py-4">Estado</th>
                <th scope="col" className="px-5 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estructuraFiltrada.map((item) => (
                <tr key={item.id} className="border-t border-[#E5EDE8] hover:bg-[#F8FBF8]">
                  <th scope="row" className="px-5 py-4 font-semibold text-slate-800">
                    {item.tipo}
                  </th>
                  <td className="px-5 py-4 font-medium text-slate-700">
                    {item.nombre}
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {item.descripcion}
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {item.responsables}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.estado === "Obligatorio"
                        ? "bg-blue-100 text-blue-700"
                        : item.estado === "No configurado"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => abrirEditarEstructura(item)}
                        aria-label={`Editar ${item.nombre}`}
                        className="rounded-lg p-2 text-blue-700 hover:bg-blue-50"
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => eliminarEstructura(item)}
                        aria-label={`Eliminar ${item.nombre}`}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {estructuraFiltrada.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                    No se encontraron registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Parámetros maestros */}
      <section
        aria-labelledby="titulo-parametros"
        className="overflow-hidden rounded-xl border border-[#DCE8DF] bg-white shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EDE8] p-5">
          <div>
            <h2 id="titulo-parametros" className="font-bold text-slate-800">
              Parámetros maestros configurables
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Catálogos centrales que utilizan los diferentes módulos del sistema.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportarParametros}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              <Download size={15} aria-hidden="true" />
              Exportar Excel (CSV)
            </button>

            <button
              type="button"
              onClick={abrirNuevoParametro}
              className="flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
            >
              <Plus size={15} aria-hidden="true" />
              Nuevo parámetro
            </button>
          </div>
        </div>

        <div className="border-b border-[#E5EDE8] p-4">
          <label htmlFor="buscar-parametro" className="sr-only">
            Buscar parámetros
          </label>
          <div className="relative max-w-md">
            <Search
              size={17}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="buscar-parametro"
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar parámetro..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <caption className="sr-only">
              Tabla de parámetros maestros configurables.
            </caption>
            <thead className="bg-[#F1F6F2] text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-5 py-4">Área</th>
                <th scope="col" className="px-5 py-4">Elementos activos</th>
                <th scope="col" className="px-5 py-4">Validación</th>
                <th scope="col" className="px-5 py-4">Uso en sistema</th>
                <th scope="col" className="px-5 py-4">Estado</th>
                <th scope="col" className="px-5 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {parametrosFiltrados.map((item) => (
                <tr key={item.id} className="border-t border-[#E5EDE8] hover:bg-[#F8FBF8]">
                  <th scope="row" className="px-5 py-4 font-semibold text-slate-800">
                    {item.area}
                  </th>
                  <td className="px-5 py-4 text-slate-600">{item.elementos}</td>
                  <td className="px-5 py-4 text-slate-500">{item.validacion}</td>
                  <td className="px-5 py-4 text-slate-500">{item.uso}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.estado === "Activo"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => abrirEditarParametro(item)}
                        aria-label={`Editar ${item.area}`}
                        className="rounded-lg p-2 text-blue-700 hover:bg-blue-50"
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => eliminarParametro(item)}
                        aria-label={`Eliminar ${item.area}`}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {parametrosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                    No se encontraron parámetros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usuarios y permisos */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <section
          aria-labelledby="titulo-usuarios"
          className="rounded-xl border border-[#DCE8DF] bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Users size={19} className="text-emerald-700" aria-hidden="true" />
                <h2 id="titulo-usuarios" className="font-bold text-slate-800">
                  Gestión de usuarios y roles
                </h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Administra los usuarios y sus responsabilidades.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirNuevoUsuario}
              className="flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
            >
              <Plus size={15} aria-hidden="true" />
              Nuevo usuario
            </button>
          </div>

          <div className="space-y-3">
            {usuarios.map((usuario) => (
              <article
                key={usuario.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-100 p-3"
              >
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {usuario.nombre}
                  </h3>
                  <p className="text-xs text-slate-500">{usuario.correo}</p>
                  <p className="mt-1 text-xs font-medium text-blue-700">
                    {usuario.rol}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    usuario.estado === "Activo"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {usuario.estado}
                  </span>

                  <button
                    type="button"
                    onClick={() => editarUsuario(usuario)}
                    aria-label={`Editar usuario ${usuario.nombre}`}
                    className="rounded-lg p-2 text-blue-700 hover:bg-blue-50"
                  >
                    <Pencil size={16} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => cambiarEstadoUsuario(usuario)}
                    aria-label={`Cambiar estado de ${usuario.nombre}`}
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                  >
                    <ShieldCheck size={16} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="titulo-permisos"
          className="rounded-xl border border-[#DCE8DF] bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck size={19} className="text-emerald-700" aria-hidden="true" />
            <h2 id="titulo-permisos" className="font-bold text-slate-800">
              Permisos por rol
            </h2>
          </div>

          <p className="mb-4 text-xs text-slate-500">
            Define el acceso de cada perfil a los módulos de AIDEN.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] text-sm">
              <caption className="sr-only">
                Permisos de acceso por módulo y rol.
              </caption>
              <thead className="bg-[#F1F6F2] text-xs uppercase text-slate-500">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left">Módulo</th>
                  <th scope="col" className="px-3 py-3 text-center">Admin.</th>
                  <th scope="col" className="px-3 py-3 text-center">Supervisor</th>
                  <th scope="col" className="px-3 py-3 text-center">Operario</th>
                </tr>
              </thead>
              <tbody>
                {permisos.map((permiso, indice) => (
                  <tr key={permiso.modulo} className="border-t border-slate-100">
                    <th scope="row" className="px-3 py-3 text-left font-medium">
                      {permiso.modulo}
                    </th>

                    {["administrador", "supervisor", "operario"].map((rol) => (
                      <td key={rol} className="px-3 py-3 text-center">
                        <label className="inline-flex cursor-pointer items-center justify-center">
                          <input
                            type="checkbox"
                            checked={permiso[rol]}
                            onChange={() => cambiarPermiso(indice, rol)}
                            aria-label={`${permiso.modulo}: acceso para ${rol}`}
                            className="h-4 w-4 rounded accent-emerald-700"
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Los cambios de esta matriz son demostrativos y se mantienen mientras la página permanezca abierta.
          </p>
        </section>
      </div>

      {/* Auditoría */}
      <section
        aria-labelledby="titulo-auditoria"
        className="overflow-hidden rounded-xl border border-[#DCE8DF] bg-white shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EDE8] p-5">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList size={19} className="text-emerald-700" aria-hidden="true" />
              <h2 id="titulo-auditoria" className="font-bold text-slate-800">
                Bitácora de auditoría y seguridad
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Registro de las operaciones realizadas en esta demostración.
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
            {auditoria.length} registros
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <caption className="sr-only">
              Historial de auditoría y seguridad.
            </caption>
            <thead className="bg-[#F1F6F2] text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th scope="col" className="px-5 py-4">Fecha</th>
                <th scope="col" className="px-5 py-4">Usuario</th>
                <th scope="col" className="px-5 py-4">Módulo</th>
                <th scope="col" className="px-5 py-4">Campo</th>
                <th scope="col" className="px-5 py-4">Detalle</th>
                <th scope="col" className="px-5 py-4">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {auditoria.map((registro) => (
                <tr key={registro.id} className="border-t border-[#E5EDE8] hover:bg-[#F8FBF8]">
                  <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                    {registro.fecha}
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-700">
                    {registro.usuario}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {registro.modulo}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {registro.campo}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {registro.detalle}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      registro.resultado === "Registrado"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {registro.resultado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pie del módulo */}
      <footer className="flex flex-wrap items-center justify-between gap-2 px-1 pb-3 text-xs text-slate-400">
        <p>AIDEN · Administración del sistema</p>
        <p>Configuración y control de parámetros</p>
      </footer>

      {/* Modal de parámetros */}
      {modal === "parametro" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) cerrarModal();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-parametro"
            className="my-6 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
          >
            <header className="mb-5 flex items-center justify-between">
              <h2 id="titulo-modal-parametro" className="text-lg font-bold text-slate-800">
                {editando ? "Editar parámetro" : "Nuevo parámetro"}
              </h2>
              <button
                type="button"
                onClick={cerrarModal}
                aria-label="Cerrar ventana"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </header>

            <form onSubmit={guardarParametro} className="space-y-4">
              <div>
                <label htmlFor="param-area" className="mb-1 block text-sm font-medium">
                  Nombre del área *
                </label>
                <input
                  id="param-area"
                  required
                  value={formulario.area}
                  onChange={(e) => setFormulario({ ...formulario, area: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                  placeholder="Ej. Tipos de cultivo"
                />
              </div>

              <div>
                <label htmlFor="param-elementos" className="mb-1 block text-sm font-medium">
                  Elementos activos *
                </label>
                <textarea
                  id="param-elementos"
                  required
                  rows={3}
                  value={formulario.elementos}
                  onChange={(e) => setFormulario({ ...formulario, elementos: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                  placeholder="Escribe los elementos separados por comas"
                />
              </div>

              <div>
                <label htmlFor="param-validacion" className="mb-1 block text-sm font-medium">
                  Validación
                </label>
                <input
                  id="param-validacion"
                  value={formulario.validacion}
                  onChange={(e) => setFormulario({ ...formulario, validacion: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                  placeholder="Reglas de validación"
                />
              </div>

              <div>
                <label htmlFor="param-uso" className="mb-1 block text-sm font-medium">
                  Uso en el sistema
                </label>
                <input
                  id="param-uso"
                  value={formulario.uso}
                  onChange={(e) => setFormulario({ ...formulario, uso: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                  placeholder="Módulos relacionados"
                />
              </div>

              <footer className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  <Save size={16} aria-hidden="true" />
                  Guardar
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}

      {/* Modal de estructura ERP */}
      {modal === "estructura" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) cerrarModal();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-estructura"
            className="my-6 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
          >
            <header className="mb-5 flex items-center justify-between">
              <h2 id="titulo-modal-estructura" className="text-lg font-bold text-slate-800">
                {editando ? "Editar estructura ERP" : "Nuevo registro ERP"}
              </h2>
              <button
                type="button"
                onClick={cerrarModal}
                aria-label="Cerrar ventana"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </header>

            <form onSubmit={guardarEstructura} className="space-y-4">
              <div>
                <label htmlFor="estructura-tipo" className="mb-1 block text-sm font-medium">
                  Tipo de registro
                </label>
                <select
                  id="estructura-tipo"
                  value={formEstructura.tipo}
                  onChange={(e) => setFormEstructura({ ...formEstructura, tipo: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
                >
                  <option>Vivero / sede</option>
                  <option>Bodega</option>
                  <option>Centro de costo</option>
                  <option>Zona productiva</option>
                </select>
              </div>

              <div>
                <label htmlFor="estructura-nombre" className="mb-1 block text-sm font-medium">
                  Nombre *
                </label>
                <input
                  id="estructura-nombre"
                  required
                  value={formEstructura.nombre}
                  onChange={(e) => setFormEstructura({ ...formEstructura, nombre: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
                  placeholder="Nombre del registro"
                />
              </div>

              <div>
                <label htmlFor="estructura-descripcion" className="mb-1 block text-sm font-medium">
                  Descripción
                </label>
                <textarea
                  id="estructura-descripcion"
                  rows={2}
                  value={formEstructura.descripcion}
                  onChange={(e) => setFormEstructura({ ...formEstructura, descripcion: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label htmlFor="estructura-responsables" className="mb-1 block text-sm font-medium">
                  Módulos relacionados
                </label>
                <input
                  id="estructura-responsables"
                  value={formEstructura.responsables}
                  onChange={(e) => setFormEstructura({ ...formEstructura, responsables: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
                  placeholder="Ej. Inventario, Producción"
                />
              </div>

              <footer className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  <Save size={16} aria-hidden="true" />
                  Guardar
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}

      {/* Modal de usuarios */}
      {modal === "usuario" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) cerrarModal();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-usuario"
            className="my-6 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
          >
            <header className="mb-5 flex items-center justify-between">
              <h2 id="titulo-modal-usuario" className="text-lg font-bold text-slate-800">
                {editando ? "Editar usuario" : "Nuevo usuario"}
              </h2>
              <button
                type="button"
                onClick={cerrarModal}
                aria-label="Cerrar ventana"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </header>

            <form onSubmit={guardarUsuario} className="space-y-4">
              <div>
                <label htmlFor="usuario-nombre" className="mb-1 block text-sm font-medium">
                  Nombre completo *
                </label>
                <input
                  id="usuario-nombre"
                  required
                  value={formUsuario.nombre}
                  onChange={(e) => setFormUsuario({ ...formUsuario, nombre: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label htmlFor="usuario-correo" className="mb-1 block text-sm font-medium">
                  Correo electrónico *
                </label>
                <input
                  id="usuario-correo"
                  type="email"
                  required
                  value={formUsuario.correo}
                  onChange={(e) => setFormUsuario({ ...formUsuario, correo: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label htmlFor="usuario-rol" className="mb-1 block text-sm font-medium">
                  Rol
                </label>
                <select
                  id="usuario-rol"
                  value={formUsuario.rol}
                  onChange={(e) => setFormUsuario({ ...formUsuario, rol: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
                >
                  <option>Administrador</option>
                  <option>Supervisor</option>
                  <option>Operario</option>
                </select>
              </div>

              <footer className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  <Save size={16} aria-hidden="true" />
                  Guardar usuario
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
