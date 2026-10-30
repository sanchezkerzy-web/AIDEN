"use client";

import { useState } from "react";
import { Leaf, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
const router = useRouter();

const [showPass, setShowPass] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");

const handleRegister = (e) => {
    e.preventDefault();

    if (password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
    }

    setError("");

    // Por ahora, el registro es una demostración visual.
    // Más adelante se conectará con la autenticación y la base de datos.
    router.push("/login");
};

return (
    <main className="min-h-screen flex bg-white font-sans text-slate-800">

        {/* Panel izquierdo: imagen y presentación */}
        <aside className="hidden lg:flex flex-col flex-1 relative overflow-hidden">

            <img
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=1000&fit=crop&auto=format"
                alt="Invernadero agrícola"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <section
                className="absolute inset-0 bg-gradient-to-br from-emerald-800/85 via-emerald-900/80 to-emerald-950/90"
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
                        Empieza a gestionar tu vivero hoy
                    </h2>

                    <p className="text-white/75 text-lg leading-relaxed max-w-sm">
                        Crea tu cuenta y accede a todas las herramientas operativas de AiDEN.
                    </p>
                </article>

            </section>
        </aside>

        {/* Panel derecho: formulario de registro */}
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
                Crear cuenta
            </h1>

            <p className="text-slate-500 mb-8 text-sm">
                Completa el formulario para unirte a AiDEN.
            </p>

            <form className="space-y-4" onSubmit={handleRegister}>

                {/* Nombre completo */}
                <section className="flex flex-col gap-1.5">
                    <label
                        htmlFor="nombre"
                        className="text-sm font-medium text-slate-700"
                    >
                        Nombre completo
                    </label>

                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        autoComplete="name"
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm"
                        placeholder="María González Torres"
                        required
                    />
                </section>

                {/* Correo electrónico */}
                <section className="flex flex-col gap-1.5">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-slate-700"
                    >
                        Correo electrónico
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm"
                        placeholder="maria@vivero.com"
                        required
                    />
                </section>

                {/* Contraseña */}
                <section className="flex flex-col gap-1.5">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-700"
                    >
                        Contraseña
                    </label>

                    <section className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPass ? "text" : "password"}
                            autoComplete="new-password"
                            minLength={8}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm pr-10"
                            placeholder="Mínimo 8 caracteres"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700 transition-colors"
                            aria-label={
                                showPass
                                    ? "Ocultar contraseña"
                                    : "Mostrar contraseña"
                            }
                        >
                            {showPass ? (
                                <EyeOff size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                        </button>
                    </section>
                </section>

                {/* Confirmar contraseña */}
                <section className="flex flex-col gap-1.5">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-slate-700"
                    >
                        Confirmar contraseña
                    </label>

                    <section className="relative">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            autoComplete="new-password"
                            minLength={8}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError("");
                            }}
                            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm pr-10"
                            placeholder="Repite tu contraseña"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-700 transition-colors"
                            aria-label={
                                showConfirm
                                    ? "Ocultar contraseña"
                                    : "Mostrar contraseña"
                            }
                        >
                            {showConfirm ? (
                                <EyeOff size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                        </button>
                    </section>
                </section>

                {/* Mensaje de error */}
                {error && (
                    <p
                        role="alert"
                        className="text-sm text-red-600"
                    >
                        {error}
                    </p>
                )}

                {/* Términos y condiciones */}
                <section className="flex items-start gap-2 pt-1">
                    <input
                        id="terminos"
                        name="terminos"
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 accent-emerald-600 rounded"
                        required
                    />

                    <label
                        htmlFor="terminos"
                        className="text-xs text-slate-500 leading-relaxed"
                    >
                        Acepto los{" "}
                        <a
                            href="#terminos"
                            className="text-emerald-600 hover:underline"
                        >
                            Términos de Uso
                        </a>{" "}
                        y la{" "}
                        <a
                            href="#privacidad"
                            className="text-emerald-600 hover:underline"
                        >
                            Política de Privacidad
                        </a>{" "}
                        de AiDEN.
                    </label>
                </section>

                {/* Botón de registro */}
                <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-sm transition-colors flex justify-center"
                >
                    Crear cuenta
                </button>

            </form>

            {/* Ir al Login */}
            <p className="text-center mt-6 text-sm text-slate-500">
                ¿Ya tienes cuenta?{" "}

                <Link
                    href="/login"
                    className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
                >
                    Iniciar sesión
                </Link>
            </p>

            {/* Volver al Home */}
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