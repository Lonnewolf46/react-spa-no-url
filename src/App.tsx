import { useEffect, useState } from 'react'
import About from './pages/About'
import Glossary from './pages/Glossary'
import Home from './pages/Home'
import type { Page } from './types'

function App() {
  const [page, setPage] = useState<Page>('inicio')

  const navigate = (nextPage: Page) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => navigate('inicio')}
          aria-label="Ir al inicio"
        >
          <span className="brand-mark">GS</span>
          <span>
            Glosario<span className="brand-dot">.</span>
          </span>
        </button>

        <nav aria-label="Navegacion principal">
          {(['inicio', 'glosario', 'acerca'] as Page[]).map((item) => (
            <button
              className={page === item ? 'nav-link active' : 'nav-link'}
              key={item}
              onClick={() => navigate(item)}
            >
              {item === 'inicio'
                ? 'Inicio'
                : item === 'glosario'
                  ? 'Explorar terminos'
                  : 'Acerca del proyecto'}
            </button>
          ))}
        </nav>

        <span className="header-note">Edicion 2025</span>
      </header>

      <main>
        {page === 'inicio' && <Home onNavigate={navigate} />}
        {page === 'glosario' && <Glossary />}
        {page === 'acerca' && <About onNavigate={navigate} />}
      </main>

      <footer className="site-footer">
        <span>Conocimiento que protege decisiones.</span>
        <span>Glosario de Seguros / SPA React</span>
      </footer>
    </div>
  )
}

export default App
