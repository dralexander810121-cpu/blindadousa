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
    <main style={{ maxWidth: 960, margin: "60px auto", padding: "0 24px", fontFamily: "system-ui, sans-serif", color: "#0f172a" }}>
      <p style={{ color: ACC, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, fontSize: 13, margin: 0 }}>
        Ecosistema · IA clínica
      </p>
      <h1 style={{ fontSize: 40, margin: "6px 0 8px" }}>Aetheris Med</h1>
      <p style={{ color: "#475569", fontSize: 18, marginBottom: 22 }}>
        Software médico de escritorio (Windows) con IA, en 2 ediciones. La base de 40,000+ patologías,
        el vademécum y las <strong>49 calculadoras funcionan sin internet</strong>; la IA usa internet con tu llave.
        Se activa con una huella que envías por <strong style={{ color: "#7c3aed" }}>WhatsApp</strong>. Prueba 7 días gratis.
      </p>

      <a href={WA} target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 8, background: ACC, color: "#fff", fontWeight: 800, padding: "14px 26px", borderRadius: 14, textDecoration: "none", fontSize: 17 }}>
        Pedir Aetheris por WhatsApp ↗
      </a>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16, marginTop: 32 }}>
        {productos.map((pr) => (
          <div key={pr.n} style={{ background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 16, padding: 22 }}>
            <div style={{ fontWeight: 800, fontSize: 20 }}>{pr.n}</div>
            <div style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>{pr.pub}</div>
            <div style={{ marginTop: 10 }}>
              <span style={{ color: "#7c3aed", fontWeight: 800, fontSize: 28 }}>{pr.p}</span>{" "}
              <span style={{ color: "#64748b", fontSize: 14 }}>{pr.anual}</span>
            </div>
            <ul style={{ marginTop: 14, paddingLeft: 18, color: "#334155", fontSize: 15, lineHeight: 1.7 }}>
              {pr.f.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <p style={{ color: "#64748b", fontSize: 14, marginTop: 20 }}>
        Pago por Zelle o efectivo, coordinado por WhatsApp — sin tarjeta en línea. Soporte y activación: WhatsApp +1 305-360-6892.
        Aetheris Med es una herramienta de apoyo; no sustituye la firma de un profesional licenciado.
        Autor: Dr. Alexander J. Figueredo Izaguirre, MD (Cuba) · RP #108356.
      </p>
    </main>
  );
}
