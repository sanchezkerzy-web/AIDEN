import "./globals.css";

export const metadata = {
    title: "AiDEN | Gestión de Viveros",
    description: "Plataforma digital para la gestión inteligente de viveros.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}