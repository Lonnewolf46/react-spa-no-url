import type { Term } from '../types'

type TermRowProps = {
  term: Term
}

function TermRow({ term }: TermRowProps) {
  return (
    <article className="term-row">
      <span className={`term-marker ${term.accent}`} aria-hidden="true" />
      <div>
        <h3>{term.term}</h3>
        <p>{term.definition}</p>
      </div>
      <span className="term-category">{term.category}</span>
    </article>
  )
}

export default TermRow
