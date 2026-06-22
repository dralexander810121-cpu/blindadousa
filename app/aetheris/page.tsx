// Página interna de Aetheris Med en blindadousa (ecosistema).
// FUENTE DE VERDAD: figueredomed src/lib/pricing/aetheris.js (modelo vigente).
// Aetheris = software de escritorio Windows, 2 productos. Base + 49 calculadoras
// SIN internet; la IA usa internet. Activación por huella -> WhatsApp.
// Solo 2 precios: Enfermería $25/mes, Clínicas $50/mes. Self-contained (sin imports).

export const metadata = {
  title: "Aetheris Med — software médico con IA | Ecosistema",
  description:
    "Software de escritorio (Windows) con IA médica: Aetheris Clínicas ($50/mes) y Aetheris Enfermería ($25/mes). Base de 40,000+ patologías y 49 calculadoras sin internet. Acceso por WhatsApp.",
};

const WA =
  "https://wa.me/13053606892?text=" +
  encodeURIComponent("Hola Dr. Figueredo, quiero información de Aetheris Med.");
const ACC = "#a855f7";

const productos = [
  {
    n: "Aetheris Clínicas",
    p: "$50/mes",
    anual: "o $500/año (2 meses gratis)",
    pub: "Médicos (MD/DO), nurse practitioners (NP) y asistentes médicos (MA).",
    f: [
      "Nota SOAP con ICD-10, impresión diagnóstica y diferenciales",
      "Qué exámenes pedir e interpretación del laboratorio",
      "Tratamiento con dosis",
      "Codificación y superbill (ICD-10/CPT) y cobertura del seguro",
      "Certificado de reposo, dieta y medicina preventiva",
    ],
  },
  {
    n: "Aetheris Enfermería",
    p: "$25/mes",
    anual: "o $250/año (2 meses gratis)",
    pub: "Enfermería a domicilio, hospital y cuidador en casa (HHA/CNA).",
    f: [
      "Valoración, nota de enfermería y plan de cuidados (NANDA/NIC/NOC)",
      "Te avisa qué documento falta antes de cerrar el turno",
      "Imprime OASIS, Plan de Cuidado (485), nota de visita, MAR y checklist",
      "Grabar y transcribir la visita",
      "Educación al paciente y al cuidador",
    ],
  },
];

export default function PuenteAetheris() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 md:py-14" style={{ fontFamily: "system-ui, sans-serif" }}>
      <section className="relative overflow-hidden rounded-3xl shadow-2xl">
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/aetheris-hero-mobile.jpeg" />
          <img
            src="/images/aetheris-hero.png"
            alt="Aetheris Med AI — software médico con inteligencia artificial"
            className="w-full h-auto object-cover"
          />
        </picture>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
          <p className="text-xs md:text-sm font-extrabold uppercase tracking-[0.2em]" style={{ color: ACC }}>
            Ecosistema · IA clínica
          </p>
          <h1 className="mt-2 text-2xl md:text-4xl font-black text-white drop-shadow">Aetheris Med</h1>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-200">
            Software médico de escritorio (Windows) con IA, en 2 ediciones. La base de 40,000+ patologías,
            el vademécum y las <strong className="text-white">49 calculadoras funcionan sin internet</strong>.
            Se activa por <strong className="text-purple-300">WhatsApp</strong>. Prueba 7 días gratis.
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-base font-extrabold text-white shadow-lg transition hover:brightness-110"
            style={{ background: ACC }}
          >
            Pedir Aetheris por WhatsApp ↗
          </a>
        </div>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {productos.map((pr) => (
          <div key={pr.n} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xl font-extrabold text-white">{pr.n}</div>
            <div className="mt-1 text-sm text-slate-400">{pr.pub}</div>
            <div className="mt-2.5">
              <span className="text-3xl font-black text-purple-300">{pr.p}</span>{" "}
              <span className="text-sm text-slate-400">{pr.anual}</span>
            </div>
            <ul className="mt-3.5 list-disc pl-5 text-sm leading-relaxed text-slate-300">
              {pr.f.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm text-slate-400">
        Pago por Zelle o efectivo, coordinado por WhatsApp — sin tarjeta en línea. Soporte y activación: WhatsApp +1 305-360-6892.
        Aetheris Med es una herramienta de apoyo; no sustituye la firma de un profesional licenciado.
        Autor: Dr. Alexander J. Figueredo Izaguirre, MD (Cuba) · RP #108356.
      </p>
    </main>
  );
}
