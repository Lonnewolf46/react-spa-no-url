import type { Page } from '../types'

type AboutProps = {
  onNavigate: (page: Page) => void
}

function About({ onNavigate }: AboutProps) {
  return (
    <section className="page-width about-page">
      <p className="eyebrow">El proyecto</p>
      <h1>Traducimos la poliza<br />
        <em>a lenguaje humano.</em>
      </h1>
      <div className="about-grid">
        <p>Este espacio reune definiciones breves y practicas para que puedas leer tus documentos de seguros con menos friccion. Es un punto de partida, no un sustituto de las condiciones particulares de tu contrato.</p>
        <div className="about-note">
          <strong>Hecho para consultar.</strong>
          <span>Una interfaz pequena, rapida y enfocada en encontrar respuestas.</span>
          <button className="text-button" onClick={() => onNavigate('glosario')}>Ver terminos -&gt;</button>
        </div>
      </div>
    </section>
  )
}

export default About
