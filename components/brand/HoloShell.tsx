/** Capa global al estilo Figueredo Med — vignette + skip link */
export function HoloShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <div className="holo-vignette" aria-hidden="true" />
      {children}
    </>
  )
}
