import { useState, useEffect, useMemo, useCallback } from 'react'
import RichText from './RichText'
import { Box, BoxRow, LineInput, H, StatBlock } from './parts'
import { regrasDe, derive, groupsOf, PREFIXO, efeitosAoMarcar, efeitosAoDesmarcar, aplicarPatch } from './rules'
import CreationTab, { creationSteps } from './CreationTab'
import LevelTab from './LevelTab'
import ActionsTab from './ActionsTab'

export { STATS } from './rules'
export { formatStat } from './parts'

// Ficha de uma cartilha do Monstro da Semana. A "Página 1" tem a parte fixa (nome, classificações,
// Sorte, Dano) e, ao lado, a aba escolhida no menu: Criação do caçador, Subir de nível ou Ações.
// Sem `update`, fica em modo leitura (visualização das cartilhas).

const TABS = [
  { key: 'criacao', label: 'Criação do caçador', short: 'Criação', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { key: 'nivel', label: 'Subir de nível', short: 'Nível', icon: 'M5 10l7-7m0 0l7 7m-7-7v18' },
  { key: 'acoes', label: 'Ações', short: 'Ações', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
]

const tabStorageKey = (id) => `mds_sheet_tab_${id}`
const readTab = (id) => { try { return localStorage.getItem(tabStorageKey(id)) } catch { return null } }
const writeTab = (id, tab) => { try { localStorage.setItem(tabStorageKey(id), tab) } catch { /* sem armazenamento */ } }

function FixedPart({ c, sheet, data, set, setName, ro, onRoll, d }) {
  return (
    <div>
      <div className="flex items-end gap-1 mt-2">
        <LineInput
          value={sheet?.name ?? ''}
          onChange={setName}
          disabled={ro || !setName}
          placeholder="Nome do caçador"
          className="flex-1 text-xl font-semibold font-sans"
        />
        <span className="text-2xl leading-none">,</span>
      </div>
      <h2 className="font-mds-title text-6xl leading-none tracking-wide text-mds-800 dark:text-mds-100 mt-3">
        {c.titulo}
      </h2>
      <div className="italic text-gray-700 dark:text-mds-200 px-3 space-y-0.5">
        {c.lema.map((l, i) => <p key={i}><RichText text={l} /></p>)}
      </div>
      {(d.aposentado || d.maligno) && (
        <div className="mt-2 px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-900 dark:text-amber-200 font-sans text-sm">
          {d.maligno ? 'Tornou-se maligno: agora é uma ameaça do Guardião.' : 'Aposentado: seguro, sob os cuidados do Guardião.'}
        </div>
      )}

      <StatBlock data={data} set={set} ro={ro} onRoll={onRoll} />

      <H>Sorte</H>
      <p>Marque uma caixa de Sorte para alterar uma rolagem para 12 <em>ou</em> evitar todo o dano de um ferimento.</p>
      <div className="flex items-center gap-2 flex-wrap mt-1">
        <span>Salvo</span>
        <BoxRow values={data.sorte} count={7} disabled={ro} label="Sorte" onChange={v => set('sorte', v)} />
        <span>Condenado</span>
      </div>
      {c.sorteEspecial && <p className="mt-1"><RichText text={c.sorteEspecial} /></p>}

      <H>Dano</H>
      <p>Quando você chegar em 4 ou mais, marque ‘Instável’.</p>
      <div className="flex items-center gap-2 flex-wrap mt-1">
        <span>Ileso</span>
        <BoxRow values={data.dano?.slice(0, 3)} count={3} disabled={ro} label="Dano"
                onChange={v => set('dano', [...v, ...Array.from({ length: 4 }, (_, i) => !!data.dano?.[3 + i])])} />
        <span className="text-mds-600 dark:text-mds-300 font-bold">|</span>
        <BoxRow values={data.dano?.slice(3, 7)} count={4} disabled={ro} label="Dano"
                onChange={v => set('dano', [...Array.from({ length: 3 }, (_, i) => !!data.dano?.[i]), ...v])} />
        <span>Morrendo</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span>Instável:</span>
        <Box checked={!!data.instavel} disabled={ro} onToggle={() => set('instavel', !data.instavel)} title="Instável" />
        <span className="italic text-sm">(Lesões instáveis pioraram com o tempo)</span>
      </div>
    </div>
  )
}

function Menu({ tab, setTab, badges }) {
  return (
    <nav className="order-2 lg:order-1 grid grid-cols-3 lg:flex lg:flex-col gap-1.5 lg:w-44 shrink-0 lg:sticky lg:top-20 lg:self-start">
      {TABS.map(t => {
        const active = tab === t.key
        const b = badges[t.key]
        return (
          <button key={t.key} type="button" onClick={() => setTab(t.key)}
                  className={`min-w-0 flex items-center gap-1.5 lg:gap-2 px-2 lg:px-2.5 py-2 rounded-lg font-sans text-sm font-semibold text-left transition-colors
                              ${active ? 'bg-mds-700 text-white dark:bg-mds-300 dark:text-mds-950 shadow'
                                       : 'bg-mds-100 hover:bg-mds-200 text-mds-800 dark:bg-mds-900 dark:hover:bg-mds-800 dark:text-mds-100'}`}>
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={t.icon} />
            </svg>
            <span className="flex-1 min-w-0 leading-tight truncate lg:whitespace-normal"><span className="lg:hidden">{t.short}</span><span className="hidden lg:inline">{t.label}</span></span>
            {b && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap
                                ${b.alert ? 'bg-amber-400 text-amber-950' : b.ok ? 'bg-emerald-600 text-white' : active ? 'bg-white/25' : 'bg-mds-200 dark:bg-mds-800'}`}>
                {b.text}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}

export default function MdsSheet({ cartilha: c, sheet, update, updateName, onRoll, readOnly = false, others, onNewSheet, onChangeCartilha }) {
  const ro = readOnly || !update
  const data = useMemo(() => sheet?.data || {}, [sheet?.data])
  const set = useMemo(() => (ro ? () => {} : update), [ro, update])
  const R = regrasDe(c)
  const d = useMemo(() => derive(c, data), [c, data])
  const groups = useMemo(() => groupsOf(c, data, d), [c, data, d])

  const [editing, setEditingMap] = useState({})
  const setEditing = useCallback((k, v) => setEditingMap(p => ({ ...p, [k]: v })), [])
  useEffect(() => { setEditingMap({}) }, [c.id])

  const isChecked = useCallback(id => !!data.checks?.[id], [data])

  // Marcar aplica os bônus fixos que couberem; desmarcar desfaz tudo que o movimento somou
  // e esquece as escolhas internas (ver efeitosAoMarcar/efeitosAoDesmarcar)
  const toggleOpt = useCallback((id) => {
    const on = !data.checks?.[id]
    const patch = on ? efeitosAoMarcar(R, id, PREFIXO.proprio(), data) : efeitosAoDesmarcar(R, id, PREFIXO.proprio(), data)
    set(`checks.${id}`, on)
    aplicarPatch(set, patch)
  }, [data, set, R])

  const ctx = { c, R, data, set, ro, d, groups, editing, setEditing, isChecked, toggleOpt }

  const creation = creationSteps(ctx, sheet, others)
  const storageId = sheet?._id || `ro_${c.id}`
  const [tab, setTabState] = useState(() => readTab(storageId) || (ro || creation.done >= creation.total ? 'acoes' : 'criacao'))
  const setTab = useCallback((t) => { setTabState(t); writeTab(storageId, t) }, [storageId])

  const xpCount = (data.xp || []).filter(Boolean).length
  const badges = ro ? {} : {
    criacao: creation.done >= creation.total ? { text: '✓', ok: true } : { text: `${creation.done}/${creation.total}` },
    nivel: { text: `XP ${xpCount}/5`, alert: xpCount >= 5 },
  }

  return (
    <div className="mds-sheet">
      <section className="mds-card p-4 sm:p-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-mds-500 dark:text-mds-400 mb-2 font-sans">Página 1</div>
        <div className="flex flex-col lg:flex-row gap-5">
          <Menu tab={tab} setTab={setTab} badges={badges} />
          <div className="order-1 lg:order-2 w-full lg:w-[21rem] shrink-0 lg:pr-5 lg:border-r border-mds-300/70 dark:border-mds-700/60">
            <FixedPart c={c} sheet={sheet} data={data} set={set} setName={ro ? null : updateName} ro={ro}
                       onRoll={ro ? null : onRoll} d={d} />
          </div>
          <div className="order-3 flex-1 min-w-0 pt-1">
            {tab === 'criacao' && <CreationTab ctx={ctx} sheet={sheet} setName={ro ? null : updateName} others={others} />}
            {tab === 'nivel' && <LevelTab ctx={ctx} onNewSheet={onNewSheet} onChangeCartilha={onChangeCartilha} goto={setTab} />}
            {tab === 'acoes' && <ActionsTab ctx={ctx} />}
          </div>
        </div>
      </section>
    </div>
  )
}
