"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Por ahora es una navegación de demostración.
    // La autenticación real se conectará después con el backend.
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex bg-white font-sans text-slate-800">
      {/* Panel izquierdo: imagen y presentación */}
      <aside className="hidden lg:flex flex-col flex-1 relative overflow-hidden">
        <img
           src="/images/fondo-aiden.jpeg"
           alt="Vivero AIDENp"
           className="absolute inset-0 w-full h-full object-cover"
        />

        <section
          className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-emerald-900/70"
          aria-hidden="true"
        />

        <section className="relative z-10 flex flex-col h-full p-12">
          <header className="flex items-center gap-2 mb-auto">
            <span className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
              <Leaf size={18} className="text-white" />
            </span>
            <span className="font-bold text-white text-2xl tracking-tight">
              AiDEN
            </span>
          </header>

          <article className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Inteligencia artificial para la gestión de viveros
            </h2>
            <p className="text-white/75 text-lg leading-relaxed max-w-sm">
              Control total de tu operación agrícola: lotes, inventario,
              personal, costos y trazabilidad.
            </p>

            <section className="flex gap-6 mt-8">
              {[
                ["9", "Módulos"],
                ["48+", "Lotes"],
                ["3", "Roles"],
              ].map(([value, label]) => (
                <article key={label}>
                  <p className="text-3xl font-bold text-white">{value}</p>
                  <p className="text-white/60 text-sm">{label}</p>
                </article>
              ))}
            </section>
          </article>
        </section>
      </aside>

      {/* Panel derecho: formulario de inicio de sesión */}
      <section className="flex flex-col justify-center flex-1 max-w-md w-full mx-auto px-8 py-12">
        <header className="mb-8 lg:hidden flex items-center gap-2">
          <span className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
            <Leaf size={15} className="text-white" />
          </span>
          <span className="font-bold text-emerald-700 text-lg tracking-tight">
            AiDEN
          </span>
        </header>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Bienvenido
        </h1>
        <p className="text-slate-500 mb-8 text-sm">
          Ingresa tus credenciales para acceder a tu panel.
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <section className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm"
              placeholder="carlos@vivero.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </section>

          <section className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <section className="relative">
              <input
                id="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm pr-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700 transition-colors"
                aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </section>
          </section>

          <section className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded"
              />
              <span className="text-sm text-slate-500">Recordarme</span>
            </label>

            <Link
              href="/recuperar-contrasena"
              className="text-sm text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
            >
              Olvidé mi contraseña
            </Link>
          </section>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-sm transition-colors flex justify-center"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-500">
          ¿No tienes cuenta?{" "}
          <Link
            href="/registro"
            className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
          >
            Crear cuenta
          </Link>
        </p>

        <Link
          href="/"
          className="text-center mt-4 text-xs text-slate-400 hover:text-emerald-700 transition-colors block"
        >
          ← Volver al inicio
        </Link>
      </section>
    </main>
  );
}
