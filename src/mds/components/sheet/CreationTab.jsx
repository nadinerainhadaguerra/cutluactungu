import RichText from './RichText'
import { SectionView } from './Choices'
import { LineInput, OptionLine, TextArea, Chip, SmallBtn, formatStat } from './parts'
import { STATS, sectionsOf, sectionComplete, statBonus, plain } from './rules'

// Aba "Criação do caçador": todos os passos da cartilha, na ordem que o texto de criação manda.

const tituloBonito = (h) => {
  const t = h.split(',')[0].trim().toLowerCase()
  return t.charAt(0).toUpperCase() + t.slice(1)
}

const temEscolha = (c, R, section) =>
  section.items.some(it => it.k === 'opt' && !it.fixed) ||
  section.items.some(it => it.k === 'opt' && (R.subs?.[it.id] || R.eliminar?.opt === it.id)) ||
  section.items.some(it => it.k === 'p' && (R.paragrafos || []).some(p => plain(it.t).startsWith(p.inicio) && p.max))

const appearanceOptions = (list) => list.split(',').map(o => o.trim()).filter(Boolean)

// Passos com estado (usado também pelo contador do menu)
export function creationSteps(ctx, sheet, others) {
  const { c, R, data, groups, d } = ctx
  const sections = sectionsOf(c)
  const steps = [
    { key: 'nome', titulo: 'Nome', done: !!sheet?.name?.trim() },
    { key: 'aparencia', titulo: 'Aparência', sub: 'escolha uma em cada lista', done: c.aparencia.every((_, i) => data.aparencia?.[i]) },
    { key: 'cls', titulo: 'Classificações', sub: 'escolha uma linha', done: data.cls !== undefined && data.cls !== null },
  ]
  for (const h of R.ordem || []) {
    const section = sections.find(s => s.titulo === h)
    if (!section) continue
    const info = !temEscolha(c, R, section)
    steps.push({ key: h, titulo: tituloBonito(h), section, info, done: info || sectionComplete(c, section, data, groups, d) })
  }
  steps.push({ key: 'apresentacoes', titulo: 'Apresentações', info: true, done: true })
  const outros = others || []
  steps.push({
    key: 'historico', titulo: 'Histórico', info: outros.length === 0,
    done: outros.every(o => data.historicoEscolhas?.[o._id] !== undefined && data.historicoEscolhas?.[o._id] !== null),
  })
  const counted = steps.filter(s => !s.info)
  return { steps, done: counted.filter(s => s.done).length, total: counted.length }
}

function Step({ n, step, children }) {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 border-b border-mds-300/70 dark:border-mds-700/60 pb-1 mb-2">
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-sans shrink-0
                          ${step.info ? 'bg-mds-200 text-mds-800 dark:bg-mds-800 dark:text-mds-100'
                                      : step.done ? 'bg-emerald-600 text-white' : 'bg-mds-700 text-white dark:bg-mds-300 dark:text-mds-950'}`}>
          {!step.info && step.done ? '✓' : n}
        </span>
        <h3 className="mds-sheet-h !my-0">{step.titulo}</h3>
        {step.sub && <span className="italic text-sm text-gray-600 dark:text-mds-300">— {step.sub}</span>}
      </div>
      <div className="sm:pl-8">{children}</div>
    </section>
  )
}

function Aparencia({ ctx }) {
  const { c, data, set, ro, editing, setEditing } = ctx
  const all = c.aparencia.every((_, i) => data.aparencia?.[i])
  const collapsed = !ro && all && !editing.aparencia
  if (collapsed) {
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold">{c.aparencia.map((_, i) => data.aparencia[i]).join(' · ')}</span>
        <SmallBtn onClick={() => setEditing('aparencia', true)}>Editar</SmallBtn>
      </div>
    )
  }
  return (
    <div className="space-y-2">
      {c.aparencia.map((list, i) => {
        const value = data.aparencia?.[i] || ''
        return (
          <div key={i} className="flex flex-wrap gap-1">
            {appearanceOptions(list).map(o => (
              <Chip key={o} on={value === o} disabled={ro} onClick={() => set(`aparencia.${i}`, value === o ? '' : o)}>{o}</Chip>
            ))}
          </div>
        )
      })}
      {!ro && editing.aparencia && (
        <SmallBtn onClick={() => setEditing('aparencia', false)} disabled={!all}>Concluir</SmallBtn>
      )}
    </div>
  )
}

function Classificacoes({ ctx }) {
  const { c, data, set, ro, editing, setEditing } = ctx
  const chosen = data.cls !== undefined && data.cls !== null
  const collapsed = !ro && chosen && !editing.cls

  const pick = (i) => {
    if (data.cls === i) { set('cls', null); return }
    // linha escolhida + o que melhorias e movimentos já somam
    const b = statBonus(c, data)
    const row = c.classificacoes[i]
    set('cls', i)
    set('stats', Object.fromEntries(STATS.map(s => [s.key, row[s.key] + (b[s.key] || 0)])))
  }
  const line = (row) => STATS.map((s, j) => <span key={s.key}>{s.name} {formatStat(row[s.key])}{j < 4 ? ', ' : ''}</span>)

  if (collapsed) {
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold">{line(c.classificacoes[data.cls])}</span>
        <SmallBtn onClick={() => setEditing('cls', true)}>Editar</SmallBtn>
      </div>
    )
  }
  return (
    <div>
      {c.classificacoes.map((row, i) => (
        <OptionLine key={i} checked={data.cls === i} ro={ro} onToggle={() => pick(i)}>{line(row)}</OptionLine>
      ))}
      {!ro && (
        <div className="flex items-center justify-between gap-2 mt-1">
          <p className="text-xs italic text-mds-600 dark:text-mds-300 font-sans">
            A linha vai para os círculos (somando o que melhorias e movimentos dão).
          </p>
          {editing.cls && <SmallBtn onClick={() => setEditing('cls', false)} disabled={!chosen}>Concluir</SmallBtn>}
        </div>
      )}
    </div>
  )
}

function Historico({ ctx, others }) {
  const { c, data, set, ro } = ctx
  const outros = others || []
  return (
    <div>
      <p><RichText text={c.historicoIntro} /></p>
      {outros.length > 0 && !ro ? (
        <div className="space-y-3 mt-2">
          {outros.map(o => {
            const idx = data.historicoEscolhas?.[o._id]
            const has = idx !== undefined && idx !== null
            return (
              <div key={o._id} className="rounded-lg border border-mds-300/70 dark:border-mds-700/60 p-2">
                <div className="flex flex-wrap items-center gap-2 font-sans text-sm">
                  <span className="font-semibold">{o.name}</span>
                  <span className="opacity-60">({o.owner})</span>
                  <select value={has ? idx : ''} onChange={e => set(`historicoEscolhas.${o._id}`, e.target.value === '' ? null : Number(e.target.value))}
                          className="mds-input !w-auto !py-1 !px-2 text-sm ml-auto max-w-full">
                    <option value="">Escolher vínculo…</option>
                    {c.historico.map((h, i) => {
                      const t = plain(h)
                      return <option key={i} value={i}>{t.length > 70 ? `${t.slice(0, 70)}…` : t}</option>
                    })}
                  </select>
                </div>
                {has && <p className="mt-1 text-[14px]"><RichText text={c.historico[idx]} /></p>}
              </div>
            )
          })}
        </div>
      ) : (
        <ul className="space-y-1 mt-1">
          {c.historico.map((h, i) => (
            <li key={i} className="flex gap-1.5"><span className="text-mds-600 dark:text-mds-300">•</span><span><RichText text={h} /></span></li>
          ))}
        </ul>
      )}
      {!ro && outros.length === 0 && (
        <p className="text-xs italic font-sans text-mds-600 dark:text-mds-300 mt-1">
          Os outros caçadores da mesa aparecem aqui quando esta ficha tiver um mestre e outros jogadores entrarem na mesma mesa.
          Seus próprios caçadores não entram no histórico.
        </p>
      )}
      {(!ro || data.historicoNotas) && (
        <TextArea value={data.historicoNotas} disabled={ro} onChange={v => set('historicoNotas', v)}
                  placeholder="Anotações sobre o histórico (o que os outros escolheram para você…)" />
      )}
    </div>
  )
}

export default function CreationTab({ ctx, sheet, setName, others }) {
  const { c, ro } = ctx
  const { steps } = creationSteps(ctx, sheet, others)
  let n = 0
  return (
    <div className="max-w-4xl">
      <p className="italic text-gray-700 dark:text-mds-200 mb-4"><RichText text={c.criacao} /></p>
      {steps.map(step => {
        n += 1
        let body = null
        if (step.key === 'nome') {
          body = (
            <LineInput value={sheet?.name ?? ''} onChange={setName || (() => {})} disabled={ro || !setName}
                       placeholder="Nome do caçador" className="w-full max-w-md text-lg font-semibold font-sans" />
          )
        } else if (step.key === 'aparencia') body = <Aparencia ctx={ctx} />
        else if (step.key === 'cls') body = <Classificacoes ctx={ctx} />
        else if (step.key === 'apresentacoes') body = <p><RichText text={c.apresentacoes} /></p>
        else if (step.key === 'historico') body = <Historico ctx={ctx} others={others} />
        else body = <SectionView ctx={ctx} section={step.section} showImages={false} showTitle={false} />
        return <Step key={step.key} n={n} step={step}>{body}</Step>
      })}
    </div>
  )
}
