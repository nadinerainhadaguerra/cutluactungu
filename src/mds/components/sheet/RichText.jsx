import { Fragment } from 'react'

// Converte a marcação das cartilhas em elementos:
//   **negrito**   _itálico_   {{campo}} (campo de texto dentro da frase)
// `renderField(index)` desenha o n-ésimo campo; sem ele, o campo vira uma linha em branco.
export default function RichText({ text, renderField }) {
  if (!text) return null
  let fieldIndex = 0
  const tokens = text.split(/(\*\*|_|\{\{campo\}\})/)
  const out = []
  let bold = false
  let italic = false

  tokens.forEach((tok, i) => {
    if (tok === '**') { bold = !bold; return }
    if (tok === '_') { italic = !italic; return }
    if (tok === '{{campo}}') {
      const idx = fieldIndex++
      out.push(
        <Fragment key={i}>
          {renderField ? renderField(idx) : <span className="inline-block w-28 border-b border-current align-baseline" />}
        </Fragment>,
      )
      return
    }
    if (!tok) return
    let node = tok
    if (italic) node = <em>{node}</em>
    if (bold) node = <strong className="font-bold">{node}</strong>
    out.push(<Fragment key={i}>{node}</Fragment>)
  })

  return <>{out}</>
}
