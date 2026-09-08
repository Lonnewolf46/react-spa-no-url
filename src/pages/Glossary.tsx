import { useState } from 'react'
import { terms } from '../data/terms'
import TermRow from '../components/TermRow'
import { useData } from '../context/DataContext'


function Glossary() {
  const [search, setSearch] = useState('')
  const filteredTerms = terms.filter((term) => `${term.term} ${term.definition} ${term.category}`.toLowerCase().includes(search.toLowerCase()))

  const { decryptedData } = useData()

  console.log('DATA FROM CONTEXT:', decryptedData)

  return (
    <section className="page-width glossary-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Indice completo</p>
          <h1>Explora los terminos.</h1>
          <p>{JSON.stringify(decryptedData, null, 2)}</p>
        </div>
        <span className="result-count">{filteredTerms.length.toString().padStart(2, '0')} resultados</span>
      </div>
      <label className="search-box"><span aria-hidden="true">/</span>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por palabra o concepto" />
      </label>
      <div className="glossary-list">{filteredTerms.map((term) => <TermRow term={term} key={term.term} />)}</div>
      {filteredTerms.length === 0 && <p className="empty-state">No encontramos ese termino. Prueba con otra palabra.</p>}
    </section>
  )
}

export default Glossary
