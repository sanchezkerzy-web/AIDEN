"use client";

import { useState } from "react";
import { Plus, X, Check } from "lucide-react";

const usuariosIniciales = [
  {
    id: 1,
    iniciales: "LM",
    nombre: "Laura Martínez",
    rol: "Administrador",
    estado: "Activo",
    ultimaActividad: "Hoy, 09:15",
    colorAvatar: "bg-emerald-600",
    correo: "laura.martinez@aiden.co",
  },
  {
    id: 2,
    iniciales: "JP",
    nombre: "Juan Pérez",
    rol: "Supervisor",
    estado: "Activo",
    ultimaActividad: "Hoy, 08:45",
    colorAvatar: "bg-sky-600",
    correo: "juan.perez@aiden.co",
  },
  {
    id: 3,
    iniciales: "AT",
    nombre: "Ana Torres",
    rol: "Operario",
    estado: "Activo",
    ultimaActividad: "Hoy, 08:30",
    colorAvatar: "bg-purple-600",
    correo: "ana.torres@aiden.co",
  },
  {
    id: 4,
    iniciales: "CR",
    nombre: "Carlos Ruiz",
    rol: "Operario",
    estado: "Activo",
    ultimaActividad: "Hoy, 07:50",
    colorAvatar: "bg-amber-600",
    correo: "carlos.ruiz@aiden.co",
  },
  {
    id: 5,
    iniciales: "PG",
    nombre: "Pedro Gómez",
    rol: "Operario",
    estado: "Inactivo",
    ultimaActividad: "08/08/2026",
    colorAvatar: "bg-red-600",
    correo: "pedro.gomez@aiden.co",
  },
];

const tareasIniciales = [
  {
    id: 1,
    descripcion: "Inspeccionar lote L-003 por presencia de roya",
    responsable: "Juan Pérez",
    prioridad: "Alta",
    estado: "Pendiente",
  },
  {
    id: 2,
    descripcion: "Registrar fertilización del lote L-002",
    responsable: "Carlos Ruiz",
    prioridad: "Media",
    estado: "En proceso",
  },
  {
    id: 3,
    descripcion: "Verificar sensor ambiental S-02 (Zona B)",
    responsable: "Ana Torres",
    prioridad: "Media",
    estado: "Pendiente",
  },
  {
    id: 4,
    descripcion: "Trasplante de plántulas lote L-006 a zona externa",
    responsable: "Ana Torres",
    prioridad: "Baja",
    estado: "En proceso",
  },
  {
    id: 5,
    descripcion: "Actualizar registro de inventario de sustratos",
    responsable: "Laura Martínez",
    prioridad: "Baja",
    estado: "Pendiente",
  },
];

const coloresAvatarDisponibles = [
  "bg-emerald-600",
  "bg-sky-600",
  "bg-purple-600",
  "bg-amber-600",
  "bg-red-600",
];

const estilosRol = {
  Administrador: "bg-purple-100 text-purple-700",
  Supervisor: "bg-sky-100 text-sky-700",
  Operario: "bg-emerald-100 text-emerald-700",
};

const estilosPrioridad = {
  Alta: "bg-red-100 text-red-600",
  Media: "bg-amber-100 text-amber-700",
  Baja: "bg-slate-100 text-slate-600",
};

const estilosEstadoTarea = {
  Pendiente: "bg-slate-100 text-slate-600",
  "En proceso": "bg-sky-100 text-sky-600",
  Completada: "bg-emerald-100 text-emerald-700",
};

const formularioUsuarioVacio = {
  nombre: "",
  correo: "",
  rol: "Operario",
  estado: "Activo",
};

const formularioTareaVacio = {
  descripcion: "",
  responsable: "Juan Pérez",
  prioridad: "Media",
  estado: "Pendiente",
};

export default function PersonalPage() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [tareas, setTareas] = useState(tareasIniciales);

  const [modalUsuarioAbierto, setModalUsuarioAbierto] = useState(false);
  const [modalTareaAbierto, setModalTareaAbierto] = useState(false);
  const [usuarioPerfil, setUsuarioPerfil] = useState(null);

  const [nuevoUsuario, setNuevoUsuario] = useState(formularioUsuarioVacio);
  const [nuevaTarea, setNuevaTarea] = useState(formularioTareaVacio);

  const cantidadPendientes = tareas.filter(
    (tarea) => tarea.estado === "Pendiente"
  ).length;

  const contarTareasUsuario = (nombreUsuario) => {
    if (nombreUsuario === "Pedro Gómez") return 0;
    const activas = tareas.filter(
      (t) => t.responsable === nombreUsuario && t.estado !== "Completada"
    ).length;
    const baseHistorica = {
      "Laura Martínez": 2,
      "Juan Pérez": 4,
      "Ana Torres": 2,
      "Carlos Ruiz": 2,
    };
    return (baseHistorica[nombreUsuario] || 0) + activas;
  };

  const generarIniciales = (nombreCompleto) => {
    const partes = nombreCompleto.trim().split(/\s+/);
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
    return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    const nombre = nuevoUsuario.nombre.trim();
    if (!nombre) return;

    const colorSeleccionado =
      coloresAvatarDisponibles[usuarios.length % coloresAvatarDisponibles.length];

    const usuarioCreado = {
      id: Date.now(),
      iniciales: generarIniciales(nombre),
      nombre,
      rol: nuevoUsuario.rol,
      estado: nuevoUsuario.estado,
      ultimaActividad: "Recién agregado",
      colorAvatar: colorSeleccionado,
      correo: nuevoUsuario.correo.trim() || "sin.correo@aiden.co",
    };

    setUsuarios((anteriores) => [...anteriores, usuarioCreado]);
    setNuevoUsuario(formularioUsuarioVacio);
    setModalUsuarioAbierto(false);
  };

  const guardarTarea = (e) => {
    e.preventDefault();
    const descripcion = nuevaTarea.descripcion.trim();
    if (!descripcion) return;

    const tareaCreada = {
      id: Date.now(),
      descripcion,
      responsable: nuevaTarea.responsable,
      prioridad: nuevaTarea.prioridad,
      estado: nuevaTarea.estado,
    };

    setTareas((anteriores) => [tareaCreada, ...anteriores]);
    setNuevaTarea(formularioTareaVacio);
    setModalTareaAbierto(false);
  };

  const alternarEstadoTarea = (idTarea) => {
    const secuencia = {
      Pendiente: "En proceso",
      "En proceso": "Completada",
      Completada: "Pendiente",
    };

    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === idTarea
          ? { ...tarea, estado: secuencia[tarea.estado] || "Pendiente" }
          : tarea
      )
    );
  };

  const alternarEstadoUsuario = (idUsuario) => {
    setUsuarios((anteriores) =>
      anteriores.map((usuario) => {
        if (usuario.id !== idUsuario) return usuario;
        const nuevoEstado =
          usuario.estado === "Activo" ? "Inactivo" : "Activo";
        const actualizado = { ...usuario, estado: nuevoEstado };
        setUsuarioPerfil(actualizado);
        return actualizado;
      })
    );
  };

  return (
    <section
      aria-label="Módulo de gestión de personal"
      className="space-y-6 font-sans text-slate-800"
    >
      {/* Tarjeta principal: Equipo del vivero */}
      <section
        aria-labelledby="titulo-equipo"
        className="overflow-hidden rounded-2xl border border-[#DCE8DF] bg-white shadow-sm"
      >
        <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <h2 id="titulo-equipo" className="text-base font-bold text-slate-800">
            Equipo del vivero
          </h2>

          <button
            type="button"
            onClick={() => setModalUsuarioAbierto(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Plus size={17} aria-hidden="true" />
            Agregar usuario
          </button>
        </header>

        <section
          aria-label="Listado del personal del vivero"
          className="overflow-x-auto"
        >
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Tabla de integrantes del vivero, roles, estados, tareas asignadas y última actividad.
            </caption>

            <thead className="border-y border-[#E5EDE8] bg-[#F1F6F2] text-xs font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th scope="col" className="px-6 py-3.5">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3.5">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3.5">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3.5">
                  Tareas asignadas
                </th>
                <th scope="col" className="px-6 py-3.5">
                  Última actividad
                </th>
                <th scope="col" className="px-6 py-3.5 text-right">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5EDE8]">
              {usuarios.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="transition hover:bg-[#F8FBF8]"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-left font-semibold text-slate-800"
                  >
                    <span className="flex items-center gap-3.5">
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${usuario.colorAvatar}`}
                      >
                        {usuario.iniciales}
                      </span>
                      <span>{usuario.nombre}</span>
                    </span>
                  </th>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        estilosRol[usuario.rol] || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {usuario.rol}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        usuario.estado === "Activo"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {usuario.estado}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-mono text-sm font-medium text-slate-700">
                    {contarTareasUsuario(usuario.nombre)}
                  </td>

                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
                    {usuario.ultimaActividad}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setUsuarioPerfil(usuario)}
                      className="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                    >
                      Ver perfil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>

      {/* Tarjeta inferior: Tareas pendientes */}
      <section
        aria-labelledby="titulo-tareas"
        className="overflow-hidden rounded-2xl border border-[#DCE8DF] bg-white shadow-sm"
      >
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5EDE8] px-6 py-5">
          <span className="flex items-center gap-2.5">
            <h2
              id="titulo-tareas"
              className="text-base font-bold text-slate-800"
            >
              Tareas pendientes
            </h2>
            <span
              aria-label={`${cantidadPendientes} tareas en estado pendiente`}
              className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-100 px-2 text-xs font-bold text-red-600"
            >
              {cantidadPendientes}
            </span>
          </span>

          <button
            type="button"
            onClick={() => setModalTareaAbierto(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Plus size={16} aria-hidden="true" />
            Asignar tarea
          </button>
        </header>

        <ul className="divide-y divide-[#E5EDE8]">
          {tareas.map((tarea) => {
            const enProceso = tarea.estado === "En proceso";
            const completada = tarea.estado === "Completada";

            return (
              <li
                key={tarea.id}
                className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 transition hover:bg-[#F8FBF8]"
              >
                <span className="flex items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => alternarEstadoTarea(tarea.id)}
                    aria-label={`Cambiar estado de la tarea: ${tarea.descripcion}`}
                    title="Clic para avanzar estado"
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition ${
                      completada
                        ? "bg-emerald-600 text-white"
                        : enProceso
                        ? "bg-emerald-600"
                        : "border-2 border-slate-300 bg-white hover:border-emerald-500"
                    }`}
                  >
                    {completada && <Check size={11} aria-hidden="true" />}
                  </button>

                  <p
                    className={`text-sm font-medium ${
                      completada
                        ? "text-slate-400 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {tarea.descripcion}
                  </p>
                </span>

                <span className="flex flex-wrap items-center gap-3 sm:gap-5">
                  <span className="text-xs font-medium text-slate-500">
                    {tarea.responsable}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      estilosPrioridad[tarea.prioridad]
                    }`}
                  >
                    {tarea.prioridad}
                  </span>

                  <button
                    type="button"
                    onClick={() => alternarEstadoTarea(tarea.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      estilosEstadoTarea[tarea.estado]
                    }`}
                  >
                    {tarea.estado}
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Modal 1: Agregar nuevo usuario */}
      {modalUsuarioAbierto && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-modal-usuario"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <article className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <header className="mb-5 flex items-center justify-between">
              <h2
                id="titulo-modal-usuario"
                className="text-lg font-bold text-slate-800"
              >
                Agregar usuario al vivero
              </h2>

              <button
                type="button"
                onClick={() => setModalUsuarioAbierto(false)}
                aria-label="Cerrar ventana"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <form onSubmit={guardarUsuario} className="space-y-4">
              <label className="flex flex-col gap-1 text-sm font-medium">
                Nombre completo
                <input
                  type="text"
                  required
                  value={nuevoUsuario.nombre}
                  onChange={(e) =>
                    setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
                  }
                  placeholder="Ej. Camila Andrea Gómez"
                  className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-600"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium">
                Correo institucional
                <input
                  type="email"
                  required
                  value={nuevoUsuario.correo}
                  onChange={(e) =>
                    setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })
                  }
                  placeholder="Ej. camila.gomez@aiden.co"
                  className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-600"
                />
              </label>

              <fieldset className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Rol asignado
                  <select
                    value={nuevoUsuario.rol}
                    onChange={(e) =>
                      setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })
                    }
                    className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-600"
                  >
                    <option value="Operario">Operario</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium">
                  Estado inicial
                  <select
                    value={nuevoUsuario.estado}
                    onChange={(e) =>
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        estado: e.target.value,
                      })
                    }
                    className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-600"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </label>
              </fieldset>

              <footer className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalUsuarioAbierto(false)}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Registrar usuario
                </button>
              </footer>
            </form>
          </article>
        </section>
      )}

      {/* Modal 2: Asignar nueva tarea */}
      {modalTareaAbierto && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-modal-tarea"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <article className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <header className="mb-5 flex items-center justify-between">
              <h2
                id="titulo-modal-tarea"
                className="text-lg font-bold text-slate-800"
              >
                Asignar nueva tarea
              </h2>

              <button
                type="button"
                onClick={() => setModalTareaAbierto(false)}
                aria-label="Cerrar ventana"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <form onSubmit={guardarTarea} className="space-y-4">
              <label className="flex flex-col gap-1 text-sm font-medium">
                Descripción de la tarea
                <input
                  type="text"
                  required
                  value={nuevaTarea.descripcion}
                  onChange={(e) =>
                    setNuevaTarea({
                      ...nuevaTarea,
                      descripcion: e.target.value,
                    })
                  }
                  placeholder="Ej. Revisar humedad en cama de germinación 2"
                  className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-600"
                />
              </label>

              <fieldset className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Responsable
                  <select
                    value={nuevaTarea.responsable}
                    onChange={(e) =>
                      setNuevaTarea({
                        ...nuevaTarea,
                        responsable: e.target.value,
                      })
                    }
                    className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-600"
                  >
                    {usuarios
                      .filter((u) => u.estado === "Activo")
                      .map((usuario) => (
                        <option key={usuario.id} value={usuario.nombre}>
                          {usuario.nombre}
                        </option>
                      ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium">
                  Prioridad
                  <select
                    value={nuevaTarea.prioridad}
                    onChange={(e) =>
                      setNuevaTarea({
                        ...nuevaTarea,
                        prioridad: e.target.value,
                      })
                    }
                    className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-emerald-600"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </label>
              </fieldset>

              <footer className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalTareaAbierto(false)}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Guardar tarea
                </button>
              </footer>
            </form>
          </article>
        </section>
      )}

      {/* Modal 3: Ver perfil de usuario */}
      {usuarioPerfil && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-perfil-usuario"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <article className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <header className="mb-5 flex items-center justify-between">
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${usuarioPerfil.colorAvatar}`}
                >
                  {usuarioPerfil.iniciales}
                </span>
                <span>
                  <h2
                    id="titulo-perfil-usuario"
                    className="text-lg font-bold text-slate-800"
                  >
                    {usuarioPerfil.nombre}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {usuarioPerfil.correo}
                  </p>
                </span>
              </span>

              <button
                type="button"
                onClick={() => setUsuarioPerfil(null)}
                aria-label="Cerrar perfil"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <dl className="grid grid-cols-2 gap-4 rounded-xl border border-[#DCE8DF] bg-[#F8FBF8] p-4 text-sm">
              <span>
                <dt className="text-xs font-medium text-slate-500">Rol</dt>
                <dd className="mt-1 font-semibold text-slate-800">
                  {usuarioPerfil.rol}
                </dd>
              </span>

              <span>
                <dt className="text-xs font-medium text-slate-500">Estado</dt>
                <dd className="mt-1 font-semibold text-slate-800">
                  {usuarioPerfil.estado}
                </dd>
              </span>

              <span>
                <dt className="text-xs font-medium text-slate-500">
                  Tareas asignadas
                </dt>
                <dd className="mt-1 font-mono font-semibold text-slate-800">
                  {contarTareasUsuario(usuarioPerfil.nombre)}
                </dd>
              </span>

              <span>
                <dt className="text-xs font-medium text-slate-500">
                  Última actividad
                </dt>
                <dd className="mt-1 font-mono text-xs font-semibold text-slate-800">
                  {usuarioPerfil.ultimaActividad}
                </dd>
              </span>
            </dl>

            <footer className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => alternarEstadoUsuario(usuarioPerfil.id)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {usuarioPerfil.estado === "Activo"
                  ? "Marcar como inactivo"
                  : "Reactivar usuario"}
              </button>

              <button
                type="button"
                onClick={() => setUsuarioPerfil(null)}
                className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
              >
                Cerrar
              </button>
            </footer>
          </article>
        </section>
      )}
    </section>
  );
}