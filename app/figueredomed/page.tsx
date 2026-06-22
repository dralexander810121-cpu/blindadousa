// Página PUENTE desde blindadousa -> figueredomed.com (salud / medicina).
// Self-contained. Todos los enlaces van a figueredomed.com.

export const metadata = {
  title: "FigueredoMed — Salud | Ecosistema",
  description:
    "La plataforma médica del Dr. Alexander Figueredo: enciclopedia, manuales, atlas 3D y herramientas clínicas en español. Visita figueredomed.com.",
};

const FM = "https://figueredomed.com";

const items = [
  { t: "Enciclopedia médica", d: "Patologías explicadas en español claro.", href: `${FM}/patologias` },
  { t: "Manuales y guías", d: "Salud, NCLEX y más, en PDF.", href: `${FM}/manuales` },
  { t: "Atlas 3D de anatomía", d: "Explora el cuerpo humano en 3D.", href: `${FM}/atlas` },
  { t: "Aetheris Med (IA clínica)", d: "IA para consultorios: recepción y notas SOAP.", href: `${FM}/aetheris-med` },
];

export default function PuenteFigueredoMed() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 md:py-14">
      <section className="relative overflow-hidden rounded-3xl shadow-2xl">
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/figueredomed-hero-mobile.jpeg" />
          <img
            src="/images/figueredomed-hero.png"
            alt="FigueredoMed — Plataforma médica digital del Dr. Figueredo"
            className="w-full h-auto object-cover"
          />
        </picture>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
          <p className="text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] text-cyan-400">
            Ecosistema · Salud
          </p>
          <h1 className="mt-2 text-2xl md:text-4xl font-black text-white drop-shadow">
            FigueredoMed
          </h1>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-200">
            La plataforma médica del Dr. Figueredo vive en{" "}
            <strong className="text-cyan-300">figueredomed.com</strong>: medicina en español claro para médicos y pacientes.
          </p>
          <a
            href={FM}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3.5 text-base font-extrabold text-black shadow-lg transition hover:bg-cyan-400"
          >
            Ir a FigueredoMed ↗
          </a>
        </div>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <a
            key={it.t}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/10"
          >
            <div className="text-lg font-extrabold text-white">
              {it.t} <span className="text-cyan-300">↗</span>
            </div>
            <div className="mt-1.5 text-sm text-slate-300">{it.d}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
