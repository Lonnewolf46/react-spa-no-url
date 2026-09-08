import { terms } from '../data/terms'
import type { Page } from '../types'
import TermRow from '../components/TermRow'

type HomeProps = {
  onNavigate: (page: Page) => void
}

function Home({ onNavigate }: HomeProps) {
  return (
    <>
      <section className="hero page-width">
        <div className="hero-copy">
          <p className="eyebrow">Una guia para hablar claro</p>
          <h1>El lenguaje del seguro, <em>sin letra pequena.</em></h1>
          <p className="hero-intro">Encuentra el significado de los terminos que aparecen en tu poliza y toma decisiones con mayor confianza.</p>
          <button className="primary-button" onClick={() => onNavigate('glosario')}>Explorar el glosario <span aria-hidden="true">-&gt;</span></button>
        </div>
        <div className="hero-index" aria-label="Resumen del glosario">
          <span className="index-label">Indice actual</span>
          <strong>04</strong>
          <span>terminos esenciales</span>
          <div className="index-rule" />
          <span>Actualizado en mayo 2025</span>
        </div>
      </section>
      <section className="featured-band">
        <div className="page-width featured-content">
          <div>
            <p className="eyebrow">Para empezar</p>
            <h2>Las palabras importan<br />cuando algo importa.</h2>
          </div>
          <div className="featured-list">
            {terms.slice(0, 3).map((term) => <TermRow term={term} key={term.term} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
