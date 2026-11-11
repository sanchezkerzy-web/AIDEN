"use client";

import { useMemo, useState } from "react";
import {
  Thermometer,
  Droplets,
  Radio,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Search,
  X,
  Leaf,
  Wind,
  Sun,
  CalendarDays,
} from "lucide-react";

const medicionesIniciales = [
  {
    id: 1,
    sensor: "SEN-001",
    zona: "Invernadero A",
    temperatura: 24.5,
    humedad: 68,
    fecha: "2026-11-03",
    hora: "08:30",
    estado: "Normal",
  },
  {
    id: 2,
    sensor: "SEN-002",
    zona: "Invernadero B",
    temperatura: 31.2,
    humedad: 42,
    fecha: "2026-11-03",
    hora: "09:00",
    estado: "Alerta",
  },
  {
    id: 3,
    sensor: "SEN-003",
    zona: "Cultivo exterior",
    temperatura: 22.8,
    humedad: 75,
    fecha: "2026-11-03",
    hora: "09:30",
    estado: "Normal",
  },
  {
    id: 4,
    sensor: "SEN-004",
    zona: "Invernadero C",
    temperatura: 28.4,
    humedad: 55,
    fecha: "2026-11-03",
    hora: "10:00",
    estado: "Normal",
  },
];

const alertasIniciales = [
  {
    id: 1,
    titulo: "Temperatura elevada",
    detalle: "Invernadero B registra 31.2 °C",
    nivel: "Alta",
    hora: "09:00",
  },
  {
    id: 2,
    titulo: "Humedad por debajo del objetivo",
    detalle: "Invernadero B registra 42 %",
    nivel: "Media",
    hora: "09:00",
  },
];

function Estado({ estado }) {
  const normal = estado === "Normal";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
        normal
          ? "bg-green-100 text-green-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {normal ? (
        <CheckCircle2 size={13} aria-hidden="true" />
      ) : (
        <AlertTriangle size={13} aria-hidden="true" />
      )}
      {estado}
    </span>
  );
}

function Indicador({
  titulo,
  valor,
  unidad,
  descripcion,
  icono: Icono,
  color,
}) {
  return (
    <article className="rounded-2xl border border-[#DCE8DF] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{titulo}</p>

        <span className={`rounded-xl p-3 ${color}`}>
          <Icono size={21} aria-hidden="true" />
        </span>
      </div>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-3xl font-bold text-[#0B2115]">{valor}</span>
        <span className="mb-1 text-sm text-slate-500">{unidad}</span>
      </div>

      <p className="mt-2 text-xs text-slate-500">{descripcion}</p>
    </article>
  );
}

export default function AmbientalPage() {
  const [mediciones, setMediciones] = useState(medicionesIniciales);
  const [alertas, setAlertas] = useState(alertasIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const [formulario, setFormulario] = useState({
    sensor: "",
    zona: "",
    temperatura: "",
    humedad: "",
  });

  const promedioTemperatura = useMemo(
    () =>
      mediciones.length
        ? (
            mediciones.reduce((s, m) => s + m.temperatura, 0) /
            mediciones.length
          ).toFixed(1)
        : "0.0",
    [mediciones]
  );

  const promedioHumedad = useMemo(
    () =>
      mediciones.length
        ? Math.round(
            mediciones.reduce((s, m) => s + m.humedad, 0) /
              mediciones.length
          )
        : 0,
    [mediciones]
  );

  const sensoresActivos = useMemo(
    () => new Set(mediciones.map((m) => m.sensor)).size,
    [mediciones]
  );

  const alertasActivas = alertas.length;

  const medicionesFiltradas = mediciones.filter((m) =>
    `${m.sensor} ${m.zona}`
      .toLowerCase()
      .includes(busqueda.toLowerCase().trim())
  );

  function registrarMedicion(e) {
    e.preventDefault();

    const temperatura = Number(formulario.temperatura);
    const humedad = Number(formulario.humedad);

    if (
      !formulario.sensor.trim() ||
      !formulario.zona.trim() ||
      formulario.temperatura === "" ||
      formulario.humedad === "" ||
      !Number.isFinite(temperatura) ||
      !Number.isFinite(humedad) ||
      temperatura < -10 ||
      temperatura > 60 ||
      humedad < 0 ||
      humedad > 100
    ) {
      window.alert("Completa todos los campos y verifica los valores.");
      return;
    }

    const estado =
      temperatura > 30 ||
      temperatura < 15 ||
      humedad < 45 ||
      humedad > 85
        ? "Alerta"
        : "Normal";

    const nueva = {
      id: Date.now(),
      sensor: formulario.sensor.trim(),
      zona: formulario.zona.trim(),
      temperatura,
      humedad,
      fecha: new Date().toLocaleDateString("en-CA"),
      hora: new Date().toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      estado,
    };

    setMediciones((actuales) => [nueva, ...actuales]);

    if (estado === "Alerta") {
      setAlertas((actuales) => [
        {
          id: nueva.id,
          titulo: "Nueva alerta ambiental",
          detalle: `${nueva.zona}: ${temperatura} °C y ${humedad} % de humedad`,
          nivel: "Alta",
          hora: nueva.hora,
        },
        ...actuales,
      ]);
    }

    setFormulario({
      sensor: "",
      zona: "",
      temperatura: "",
      humedad: "",
    });

    setMostrarModal(false);
  }

  function cerrarModal() {
    setMostrarModal(false);
  }

  return (
    <main className="min-h-full space-y-6 bg-[#EFF4F0]">
      {/* Encabezado */}
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-green-700">
            <Leaf size={17} aria-hidden="true" />
            <span>Gestión agrícola / Ambiental</span>
          </div>

          <h1 className="text-3xl font-bold text-[#0B2115]">
            Monitoreo ambiental
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Consulta las condiciones ambientales de tus zonas de cultivo.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMostrarModal(true)}
          aria-haspopup="dialog"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3 font-semibold text-white shadow-sm hover:bg-green-700"
        >
          <Plus size={18} aria-hidden="true" />
          Registrar medición
        </button>
      </header>

      {/* Indicadores */}
      <section
        aria-label="Indicadores ambientales"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <Indicador
          titulo="Temperatura promedio"
          valor={promedioTemperatura}
          unidad="°C"
          descripcion="Promedio de las mediciones registradas"
          icono={Thermometer}
          color="bg-orange-50 text-orange-600"
        />

        <Indicador
          titulo="Humedad promedio"
          valor={promedioHumedad}
          unidad="%"
          descripcion="Humedad relativa registrada"
          icono={Droplets}
          color="bg-blue-50 text-blue-600"
        />

        <Indicador
          titulo="Sensores registrados"
          valor={sensoresActivos}
          unidad="sensores"
          descripcion="Sensores únicos con mediciones registradas"
          icono={Radio}
          color="bg-green-50 text-green-700"
        />

        <Indicador
          titulo="Alertas activas"
          valor={alertasActivas}
          unidad="alertas"
          descripcion="Registros fuera de los rangos definidos"
          icono={AlertTriangle}
          color="bg-amber-50 text-amber-600"
        />
      </section>

      {/* Condiciones y alertas */}
      <section
        aria-label="Resumen de condiciones y alertas ambientales"
        className="grid grid-cols-1 gap-6 xl:grid-cols-3"
      >
        <section className="rounded-2xl border border-[#DCE8DF] bg-white p-5 shadow-sm xl:col-span-2">
          <header className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#0B2115]">
                Condiciones ambientales
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Resumen de las últimas mediciones registradas
              </p>
            </div>

            <Activity className="text-green-600" aria-hidden="true" />
          </header>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-xl bg-orange-50 p-4">
              <div className="flex items-center gap-2 text-orange-700">
                <Thermometer size={19} aria-hidden="true" />
                <span className="text-sm font-semibold">Temperatura</span>
              </div>

              <p className="mt-3 text-3xl font-bold text-[#0B2115]">
                {promedioTemperatura} °C
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Rango de referencia ilustrativo: 15–30 °C
              </p>
            </article>

            <article className="rounded-xl bg-blue-50 p-4">
              <div className="flex items-center gap-2 text-blue-700">
                <Droplets size={19} aria-hidden="true" />
                <span className="text-sm font-semibold">
                  Humedad relativa
                </span>
              </div>

              <p className="mt-3 text-3xl font-bold text-[#0B2115]">
                {promedioHumedad} %
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Rango de referencia ilustrativo: 45–85 %
              </p>
            </article>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <article className="flex items-center gap-3 rounded-xl border border-[#E5EDE8] p-3">
              <Sun className="text-amber-500" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-slate-700">
                  Radiación solar
                </h3>
                <p className="text-xs text-slate-500">
                  Sin sensor conectado
                </p>
              </div>
            </article>

            <article className="flex items-center gap-3 rounded-xl border border-[#E5EDE8] p-3">
              <Wind className="text-sky-600" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-slate-700">
                  Viento
                </h3>
                <p className="text-xs text-slate-500">
                  Sin sensor conectado
                </p>
              </div>
            </article>

            <article className="flex items-center gap-3 rounded-xl border border-[#E5EDE8] p-3">
              <CalendarDays className="text-green-600" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-slate-700">
                  Registros
                </h3>
                <p className="text-xs text-slate-500">
                  {mediciones.length} mediciones
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Alertas */}
        <section className="rounded-2xl border border-[#DCE8DF] bg-white p-5 shadow-sm">
          <header className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-[#0B2115]">
              Alertas ambientales
            </h2>

            <span
              className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700"
              aria-label={`${alertas.length} alertas activas`}
            >
              {alertas.length}
            </span>
          </header>

          {alertas.length === 0 ? (
            <div
              className="py-8 text-center text-sm text-slate-500"
              role="status"
            >
              <CheckCircle2
                className="mx-auto mb-2 text-green-600"
                size={28}
                aria-hidden="true"
              />
              No hay alertas activas.
            </div>
          ) : (
            <div className="space-y-3" aria-live="polite">
              {alertas.map((alerta) => (
                <article
                  key={alerta.id}
                  className="rounded-xl border border-amber-100 bg-amber-50 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle
                        size={17}
                        className="mt-0.5 shrink-0 text-amber-600"
                        aria-hidden="true"
                      />

                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">
                          {alerta.titulo}
                        </h3>

                        <p className="mt-1 text-xs text-slate-600">
                          {alerta.detalle}
                        </p>
                      </div>
                    </div>

                    <time className="text-xs text-slate-500">
                      {alerta.hora}
                    </time>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-700">
                      {alerta.nivel}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setAlertas((actuales) =>
                          actuales.filter((a) => a.id !== alerta.id)
                        )
                      }
                      aria-label={`Marcar atendida: ${alerta.titulo}`}
                      className="text-xs font-medium text-green-700 hover:underline"
                    >
                      Marcar atendida
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>

      {/* Historial */}
      <section className="rounded-2xl border border-[#DCE8DF] bg-white p-5 shadow-sm">
        <header className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h2 className="font-bold text-[#0B2115]">
              Historial de mediciones
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Consulta los registros ambientales por sensor y zona.
            </p>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
              aria-hidden="true"
            />

            <input
              type="search"
              aria-label="Buscar mediciones por sensor o zona"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar sensor o zona..."
              className="w-full rounded-xl border border-[#DCE8DF] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-green-500 md:w-72"
            />
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <caption className="sr-only">
              Historial de mediciones ambientales registradas por sensor.
            </caption>

            <thead className="bg-[#F1F6F2] text-xs uppercase text-slate-500">
              <tr>
                <th scope="col" className="rounded-l-lg px-4 py-3">
                  Sensor
                </th>
                <th scope="col" className="px-4 py-3">
                  Zona
                </th>
                <th scope="col" className="px-4 py-3">
                  Temperatura
                </th>
                <th scope="col" className="px-4 py-3">
                  Humedad
                </th>
                <th scope="col" className="px-4 py-3">
                  Fecha y hora
                </th>
                <th scope="col" className="rounded-r-lg px-4 py-3">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5EDE8]">
              {medicionesFiltradas.map((m) => (
                <tr key={m.id} className="hover:bg-[#F8FBF8]">
                  <th
                    scope="row"
                    className="px-4 py-4 font-semibold text-[#0B2115]"
                  >
                    {m.sensor}
                  </th>

                  <td className="px-4 py-4 text-slate-600">{m.zona}</td>
                  <td className="px-4 py-4 text-slate-700">
                    {m.temperatura} °C
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {m.humedad} %
                  </td>
                  <td className="px-4 py-4 text-slate-500">
                    <time dateTime={`${m.fecha}T${m.hora}`}>
                      {m.fecha} · {m.hora}
                    </time>
                  </td>
                  <td className="px-4 py-4">
                    <Estado estado={m.estado} />
                  </td>
                </tr>
              ))}

              {medicionesFiltradas.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-slate-500"
                    role="status"
                  >
                    No se encontraron mediciones.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal para registrar mediciones */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal-ambiental"
            aria-describedby="descripcion-modal-ambiental"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <header className="mb-5 flex items-center justify-between">
              <div>
                <h2
                  id="titulo-modal-ambiental"
                  className="text-xl font-bold text-[#0B2115]"
                >
                  Registrar medición
                </h2>

                <p
                  id="descripcion-modal-ambiental"
                  className="mt-1 text-sm text-slate-500"
                >
                  Ingresa los datos del sensor ambiental.
                </p>
              </div>

              <button
                type="button"
                onClick={cerrarModal}
                aria-label="Cerrar ventana de registro"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <form onSubmit={registrarMedicion} className="space-y-4">
              <div>
                <label
                  htmlFor="sensor-ambiental"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Código del sensor
                </label>

                <input
                  id="sensor-ambiental"
                  name="sensor"
                  type="text"
                  required
                  value={formulario.sensor}
                  onChange={(e) =>
                    setFormulario({
                      ...formulario,
                      sensor: e.target.value,
                    })
                  }
                  placeholder="Ej. SEN-005"
                  className="w-full rounded-xl border border-[#DCE8DF] px-3 py-2.5 outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="zona-ambiental"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Zona de cultivo
                </label>

                <input
                  id="zona-ambiental"
                  name="zona"
                  type="text"
                  required
                  value={formulario.zona}
                  onChange={(e) =>
                    setFormulario({
                      ...formulario,
                      zona: e.target.value,
                    })
                  }
                  placeholder="Ej. Invernadero D"
                  className="w-full rounded-xl border border-[#DCE8DF] px-3 py-2.5 outline-none focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="temperatura-ambiental"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Temperatura (°C)
                  </label>

                  <input
                    id="temperatura-ambiental"
                    name="temperatura"
                    required
                    type="number"
                    step="0.1"
                    min="-10"
                    max="60"
                    value={formulario.temperatura}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        temperatura: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-[#DCE8DF] px-3 py-2.5 outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="humedad-ambiental"
                    className="mb-1 block text-sm font-medium text-slate-700"
                  >
                    Humedad (%)
                  </label>

                  <input
                    id="humedad-ambiental"
                    name="humedad"
                    required
                    type="number"
                    min="0"
                    max="100"
                    value={formulario.humedad}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        humedad: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-[#DCE8DF] px-3 py-2.5 outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <footer className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="rounded-xl border border-[#DCE8DF] px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#16A34A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Guardar medición
                </button>
              </footer>
            </form>
          </article>
        </div>
      )}
    </main>
  );
}