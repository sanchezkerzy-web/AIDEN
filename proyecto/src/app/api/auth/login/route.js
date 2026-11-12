import { NextResponse } from "next/server";
import { createHmac } from "node:crypto";


const usuarios = [
  {
    email: "admin@aiden.com",
    password: "Admin123",
    nombre: "Administrador",
    rol: "admin",
  },
  {
    email: "supervisor@aiden.com",
    password: "Super123",
    nombre: "Supervisor",
    rol: "supervisor",
  },
  {
    email: "operario@aiden.com",
    password: "Opera123",
    nombre: "Operario",
    rol: "operario",
  },
];

const generarFirma = (datos) => {
  return createHmac("sha256", process.env.SESSION_SECRET)
    .update(datos)
    .digest("base64url");
};

export async function POST(request) {
  try {
    const { email, password, remember } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Debes ingresar correo y contraseña." },
        { status: 400 }
      );
    }

    const usuario = usuarios.find(
      (item) =>
        item.email === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!usuario) {
      return NextResponse.json(
        { message: "Correo o contraseña incorrectos." },
        { status: 401 }
      );
    }

    const expiracion =
      Date.now() + (remember ? 7 : 1) * 24 * 60 * 60 * 1000;

    const datos = Buffer.from(
      JSON.stringify({
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
        exp: expiracion,
      })
    ).toString("base64url");

    const firma = generarFirma(datos);

    const respuesta = NextResponse.json({
      message: "Inicio de sesión exitoso.",
      rol: usuario.rol,
    });

    respuesta.cookies.set("aiden_session", `${datos}.${firma}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: remember ? 7 * 24 * 60 * 60 : 24 * 60 * 60,
    });

    return respuesta;
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);

    return NextResponse.json(
      { message: "No se pudo procesar el inicio de sesión." },
      { status: 500 }
    );
  }
}