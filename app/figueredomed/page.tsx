// Página PUENTE desde blindadousa -> figueredomed.com (salud / medicina).
// Ecosistema enlazado. Self-contained (estilos inline) para no depender del
// design system y no romper el build. Todos los enlaces van a figueredomed.com.

export const metadata = {
  title: "FigueredoMed — Salud | Ecosistema",
  description:
    "La plataforma médica del Dr. Alexander Figueredo: enciclopedia, manuales, atlas 3D y herramientas clínicas en español. Visita figueredomed.com.",
};

const FM = "https://figueredomed.com";
const ACC = "#22d3ee";

const items = [
  { t: "Enciclopedia médica", d: "Patologías explicadas en español claro.", href: `${FM}/patologias` },
  { t: "Manuales y guías", d: "Salud, NCLEX y más, en PDF.", href: `${FM}/manuales` },
  { t: "Atlas 3D de anatomía", d: "Explora el cuerpo humano en 3D.", href: `${FM}/atlas` },
  { t: "Aetheris Med (IA clínica)", d: "IA para consultorios: recepción y notas SOAP.", href: `${FM}/aetheris-med` },
];

export default function PuenteFigueredoMed() {
  return (
    <main style={{ maxWidth: 920, margin: "60px auto", padding: "0 24px", fontFamily: "system-ui, sans-serif", color: "#0f172a" }}>
      <p style={{ color: ACC, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, fontSize: 13, margin: 0 }}>
        Ecosistema · Salud
      </p>
      <h1 style={{ fontSize: 40, margin: "6px 0 8px", color: "#0f172a" }}>FigueredoMed</h1>
      <p style={{ color: "#475569", fontSize: 18, marginBottom: 24 }}>
        La plataforma médica del Dr. Figueredo vive en{" "}
        <strong style={{ color: "#0e7490" }}>figueredomed.com</strong>: medicina en español claro para médicos y pacientes.
      </p>

      <a href={FM} target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 8, background: ACC, color: "#06121a", fontWeight: 800, padding: "14px 26px", borderRadius: 14, textDecoration: "none", fontSize: 17 }}>
        Ir a FigueredoMed ↗
      </a>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginTop: 36 }}>
        {items.map((it) => (
          <a key={it.t} href={it.href} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", background: "#f0fdff", border: "1px solid #a5f3fc", borderRadius: 14, padding: 20, textDecoration: "none", color: "#0f172a" }}>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{it.t} ↗</div>
            <div style={{ color: "#475569", marginTop: 6, fontSize: 15 }}>{it.d}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
