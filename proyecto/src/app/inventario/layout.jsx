
import BarraLateral from "../../components/navegacion/BarraLateral";
import BarraSuperior from "../../components/navegacion/BarraSuperior";

export default function InventarioLayout({ children }) {
  return (
    <section className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <BarraLateral />

      <section className="flex flex-col flex-1 overflow-hidden">
        <BarraSuperior />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </section>
    </section>
  );
}
