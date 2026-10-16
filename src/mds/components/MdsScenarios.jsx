import { useState, useEffect, useCallback, useRef } from 'react'
import { mdsStorage } from '../services/mdsStorage'
import { CloseIcon, MdsModal } from './common'

const MAX_IMAGES = 30

// ---------- formulário ----------
function ScenarioForm({ initial, onSave, onClose }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [images, setImages] = useState(initial?.images?.length ? initial.images : [''])
  const [saving, setSaving] = useState(false)
  const valid = images.map(u => u.trim()).filter(Boolean)

  const submit = async (e) => {
    e.preventDefault()
    if (!title.trim() || valid.length === 0) return
    setSaving(true)
    try { await onSave(title.trim(), valid); onClose() } catch { setSaving(false) }
  }

  return (
    <MdsModal title={initial ? 'Editar Cenário' : 'Novo Cenário'} onClose={onClose} maxWidth="max-w-lg">
      <form onSubmit={submit} className="p-5 space-y-3">
        <input autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="Título do cenário" className="mds-input" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Imagens (links) {images.length}/{MAX_IMAGES}</span>
          {images.length < MAX_IMAGES && (
            <button type="button" onClick={() => setImages([...images, ''])} className="mds-btn-ghost !py-1 !px-2 text-sm">+ Imagem</button>
          )}
        </div>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {images.map((url, i) => (
            <div key={i} className="flex gap-2 items-center">
              {url.trim() && <img src={url} alt="" className="w-10 h-10 object-cover rounded" onError={e => { e.target.style.visibility = 'hidden' }} />}
              <input value={url} onChange={e => setImages(images.map((u, j) => (j === i ? e.target.value : u)))}
                     placeholder="https://..." className="mds-input !py-1.5 text-sm" />
              {images.length > 1 && (
                <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))}
                        className="text-red-400 hover:text-red-600 px-1" title="Remover">✕</button>
              )}
            </div>
          ))}
        </div>
        <button type="submit" disabled={!title.trim() || valid.length === 0 || saving} className="mds-btn w-full">
          {saving ? 'Salvando...' : 'Salvar Cenário'}
        </button>
      </form>
    </MdsModal>
  )
}

// ---------- escolher jogadores ----------
function PlayerPicker({ players, onConfirm, onClose }) {
  const [chosen, setChosen] = useState(players)
  const toggle = (p) => setChosen(chosen.includes(p) ? chosen.filter(x => x !== p) : [...chosen, p])
  return (
    <MdsModal title="Mostrar para…" onClose={onClose}>
      <div className="p-5 space-y-2">
        {players.length === 0 && <p className="text-sm text-gray-500">Nenhum jogador tem ficha com este mestre ainda.</p>}
        {players.map(p => (
          <label key={p} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={chosen.includes(p)} onChange={() => toggle(p)} className="accent-mds-600 w-4 h-4" />
            <span>{p}</span>
          </label>
        ))}
        <button onClick={() => onConfirm(chosen)} disabled={chosen.length === 0} className="mds-btn w-full mt-3">Mostrar</button>
      </div>
    </MdsModal>
  )
}

// ---------- visualizador do mestre ----------
export function MdsScenarioViewer({ scenario, active, mestre, onClose }) {
  const isActive = active?.scenarioId === scenario._id
  const images = scenario.images || []
  const [index, setIndex] = useState(isActive ? (active.imageIndex ?? 0) : 0)

  const goTo = useCallback((i) => {
    if (i < 0 || i >= images.length) return
    setIndex(i)
    if (isActive) mdsStorage.setActiveScenario(mestre, { ...active, imageUrl: images[i], imageIndex: i }).catch(() => {})
  }, [images, isActive, active, mestre])

  const close = useCallback(() => {
    if (isActive) mdsStorage.setActiveScenario(mestre, null).catch(() => {})
    onClose()
  }, [isActive, mestre, onClose])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goTo(index - 1)
      else if (e.key === 'ArrowRight') goTo(index + 1)
      else if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, goTo, close])

  return (
    <div className="fixed inset-0 bg-black/92 z-[9998] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <span className="font-mds-title text-2xl tracking-wide">{scenario.title}</span>
          {isActive && (
            <span className="text-xs bg-mds-600 px-2.5 py-0.5 rounded-full">
              Mostrando para {active.shownTo?.length || 0} jogador(es) — fechar esconde
            </span>
          )}
        </div>
        <button onClick={close} className="p-2 hover:bg-white/20 rounded-lg" title="Fechar (Esc)"><CloseIcon className="w-6 h-6" /></button>
      </div>
      <div className="flex flex-1 gap-3 px-4 pb-4 overflow-hidden">
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <button onClick={() => goTo(index - 1)} disabled={index === 0} className="p-2 text-white text-3xl disabled:opacity-20">‹</button>
          <div className="flex-1 flex items-center justify-center h-full min-w-0">
            <img src={images[index]} alt="" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
          </div>
          <button onClick={() => goTo(index + 1)} disabled={index >= images.length - 1} className="p-2 text-white text-3xl disabled:opacity-20">›</button>
        </div>
        {images.length > 1 && (
          <div className="w-24 flex-shrink-0 overflow-y-auto space-y-2 py-1">
            {images.map((url, i) => (
              <button key={i} onClick={() => goTo(i)}
                      className={`w-full aspect-square rounded-lg overflow-hidden border-2 ${i === index ? 'border-mds-400' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ---------- painel lateral do mestre ----------
export default function MdsScenariosPanel({ mestre, players, active, onView, onClose }) {
  const [scenarios, setScenarios] = useState([])
  const [editing, setEditing] = useState(null)
  const [picking, setPicking] = useState(null)

  useEffect(() => mdsStorage.onScenariosChanged(mestre, setScenarios), [mestre])

  const show = async (scenario, shownTo) => {
    try {
      await mdsStorage.setActiveScenario(mestre, {
        scenarioId: scenario._id, title: scenario.title,
        imageUrl: scenario.images[0], imageIndex: 0, shownTo,
      })
      setPicking(null)
      onView(scenario)
    } catch { /* toast */ }
  }

  const remove = async (s) => {
    if (!confirm(`Excluir o cenário "${s.title}"?`)) return
    try {
      if (active?.scenarioId === s._id) await mdsStorage.setActiveScenario(mestre, null)
      await mdsStorage.deleteScenario(s._id)
    } catch { /* toast */ }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 bg-mds-800 dark:bg-mds-950 text-white">
        <span className="font-mds-title text-2xl tracking-wide">Cenários</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setEditing('new')} title="Novo cenário"
                  className="w-8 h-8 rounded-lg bg-mds-500 hover:bg-mds-400 text-xl font-bold leading-none">+</button>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded" title="Fechar"><CloseIcon /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {scenarios.length === 0 && <p className="text-center text-sm text-gray-400 py-10">Nenhum cenário. Clique em + para criar.</p>}
        {scenarios.map(s => {
          const live = active?.scenarioId === s._id
          return (
            <div key={s._id} className={`mds-card !rounded-lg p-2 flex gap-2 items-center ${live ? 'ring-2 ring-mds-500' : ''}`}>
              <button onClick={() => onView(s)} className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 bg-mds-100 dark:bg-mds-900">
                {s.images?.[0] && <img src={s.images[0]} alt="" className="w-full h-full object-cover" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{s.title}</div>
                <div className="text-xs text-gray-500 dark:text-mds-300/70">{s.images?.length || 0} imagem(ns){live ? ' · ao vivo' : ''}</div>
                <div className="flex gap-2 mt-1 text-xs">
                  <button onClick={() => setPicking(s)} className="text-mds-600 dark:text-mds-300 font-semibold hover:underline">Mostrar</button>
                  <button onClick={() => setEditing(s)} className="hover:underline">Editar</button>
                  <button onClick={() => remove(s)} className="text-red-500 hover:underline">Excluir</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {editing && (
        <ScenarioForm
          initial={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSave={(title, images) => editing === 'new'
            ? mdsStorage.createScenario({ title, images, mestre })
            : mdsStorage.updateScenario(editing._id, { title, images })}
        />
      )}
      {picking && <PlayerPicker players={players} onClose={() => setPicking(null)} onConfirm={to => show(picking, to)} />}
    </div>
  )
}

// ---------- exibição para o jogador ----------
export function MdsScenarioDisplay({ active, playerName }) {
  const targeted = !!(active?.imageUrl && active.shownTo?.includes(playerName))
  const [minimized, setMinimized] = useState(false)
  const lastId = useRef(null)

  useEffect(() => {
    if (targeted && active.scenarioId !== lastId.current) {
      lastId.current = active.scenarioId
      setMinimized(false)
    }
    if (!targeted) lastId.current = null
  }, [targeted, active?.scenarioId])

  if (!targeted) return null

  if (minimized) {
    return (
      <button onClick={() => setMinimized(false)} title="Abrir cenário"
              className="fixed bottom-4 right-4 z-[9990] w-16 h-16 rounded-xl overflow-hidden border-2 border-mds-400 shadow-2xl hover:scale-105 transition-transform">
        <img src={active.imageUrl} alt="Cenário" className="w-full h-full object-cover" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-[9990] bg-black/85 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        <div className="absolute top-2 right-2 z-10">
          <button onClick={() => setMinimized(true)} title="Minimizar"
                  className="px-2 py-1 bg-black/60 hover:bg-black/90 rounded-lg text-white text-sm">— Minimizar</button>
        </div>
        {active.title && <div className="text-white font-mds-title text-2xl tracking-wide mb-2">{active.title}</div>}
        <img src={active.imageUrl} alt="Cenário" className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl" />
      </div>
    </div>
  )
}
