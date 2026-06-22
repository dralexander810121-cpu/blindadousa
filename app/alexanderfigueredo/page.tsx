// Página PUENTE desde blindadousa -> alexanderfigueredo.com (política / Cuba).
// Self-contained. Todos los enlaces van a alexanderfigueredo.com.

export const metadata = {
  title: "Alexander Figueredo — Política y Cuba | Ecosistema",
  description:
    "La voz del Dr. Alexander Figueredo sobre Cuba y el exilio: «Expediente Clínico: Cuba», opinión y activismo. Visita alexanderfigueredo.com.",
};

const AX = "https://alexanderfigueredo.com";

const items = [
  { t: "Expediente Clínico: Cuba", d: "12 tomos sobre el castrismo, gratis para descargar.", href: `${AX}/expediente-clinico-cuba` },
  { t: "Opinión y activismo", d: "Artículos y reflexiones sin filtros sobre Cuba.", href: `${AX}/articulos` },
  { t: "Boletín «Libertad y Salud»", d: "Política, exilio y verdad, en tu correo.", href: `${AX}/newsletter` },
  { t: "Sobre el Dr. Figueredo", d: "Médico cubano exiliado, autor y voz del exilio.", href: `${AX}/sobre-mi` },
];

export default function PuenteAlexander() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 md:py-14">
      {/* Hero con el banner del Dr. Figueredo de fondo */}
      <section className="relative overflow-hidden rounded-3xl shadow-2xl">
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/alexander-hero-mobile.jpeg" />
          <img
            src="/images/alexander-hero.png"
            alt="Dr. Alexander Figueredo — Médico, Autor y Activista"
            className="w-full h-auto object-cover"
          />
        </picture>

        {/* Degradado para legibilidad del contenido inferior */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Contenido sobre el banner */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
          <p className="text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">
            Ecosistema · Política
          </p>
          <h1 className="mt-2 text-2xl md:text-4xl font-black text-white drop-shadow">
            Alexander Figueredo
          </h1>
          <p className="mt-2 max-w-xl text-sm md:text-base text-slate-200">
            La voz del Dr. Figueredo sobre Cuba y el exilio vive en{" "}
            <strong className="text-red-400">alexanderfigueredo.com</strong>.
          </p>
          <a
            href={AX}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 text-base font-extrabold text-white shadow-lg transition hover:bg-red-500"
          >
            Ir a alexanderfigueredo.com ↗
          </a>
        </div>
      </section>

      {/* Tarjetas */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <a
            key={it.t}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-red-500/40 hover:bg-white/10"
          >
            <div className="text-lg font-extrabold text-white">
              {it.t} <span className="text-red-400">↗</span>
            </div>
            <div className="mt-1.5 text-sm text-slate-300">{it.d}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
