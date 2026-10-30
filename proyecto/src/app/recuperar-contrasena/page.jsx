"use client";

import { Leaf, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecuperarContrasena() {
    const router = useRouter();
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-slate-800">
            <section className="w-full max-w-sm">
                <header className="flex justify-center mb-8">
                    <section className="flex flex-col items-center gap-3">
                        <span className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center shadow-lg text-white">
                            <Leaf size={22} />
                        </span>
                        <span className="font-bold text-emerald-800 text-xl tracking-tight">
                            AiDEN
                        </span>
                    </section>
                </header>

                <article className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                    {!sent ? (
                        <form onSubmit={handleSubmit}>
                            <span className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 mx-auto text-emerald-700 inline-flex">
                                <Mail size={22} />
                            </span>

                            <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                                Recuperar contraseña
                            </h1>
                            <p className="text-sm text-slate-500 text-center mb-8 leading-relaxed">
                                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                            </p>

                            <section className="space-y-4">
                                <section className="flex flex-col gap-1.5">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                        Correo electrónico
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm"
                                        placeholder="tu@vivero.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </section>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-sm transition-colors flex justify-center"
                                >
                                    Enviar enlace de recuperación
                                </button>
                            </section>
                        </form>
                    ) : (
                        <section className="text-center">
                            <span className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 mx-auto text-emerald-700 inline-flex">
                                <CheckCircle2 size={22} />
                            </span>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">
                                Solicitud registrada
                            </h2>
                            <p className="text-sm text-slate-500 leading-relaxed mb-6">
                                Esta es una demostración visual. Todavía no se ha enviado un correo real a{" "}
                                <strong>{email}</strong>. Cuando conectemos la autenticación, podremos enviar las instrucciones para restablecer la contraseña.
                            </p>
                            <button
                                type="button"
                                onClick={() => setSent(false)}
                                className="w-full py-2.5 px-4 border border-slate-300 hover:bg-slate-50 rounded-lg text-sm font-semibold text-slate-700 transition-colors"
                            >
                                Intentar de nuevo
                            </button>
                        </section>
                    )}
                </article>

                <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="flex items-center justify-center gap-2 mx-auto mt-6 text-sm text-slate-500 hover:text-emerald-700 transition-colors"
                >
                    <ArrowLeft size={15} />
                    Volver al inicio de sesión
                </button>
            </section>
        </main>
    );
}
