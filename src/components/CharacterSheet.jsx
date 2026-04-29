import { useState, useEffect, useCallback, useRef } from 'react'
import { storage } from '../services/storage'
import { useSelection } from '../contexts/SelectionContext'
import SheetPage1 from './SheetPage1'
import SheetPage2 from './SheetPage2'
import SheetPage3 from './SheetPage3'
import PlayerTestPopup from './PlayerTestPopup'
import CharacterCreationWizard from './CharacterCreationWizard'
import { TALENTOS } from '../utils/bookData'

const ALL_TALENT_KEYWORDS = [...new Set(TALENTOS.flatMap(t => t.palavrasChave))].sort()
const ALL_TRADITIONS = ['Celta', 'Rúnico', 'Psíquico']

function MasterConfigPopup({ character, updateCharacter, onClose }) {
  const perms = character.masterPermissions || { extraTalentKeywords: [], spellTraditions: [] }
  const [extraKws, setExtraKws] = useState(perms.extraTalentKeywords || [])
  const [spellTraditions, setSpellTraditions] = useState(perms.spellTraditions || [])

  const toggleKw = (kw) =>
    setExtraKws(prev => prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw])

  const toggleTrad = (t) =>
    setSpellTraditions(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const save = () => {
    updateCharacter(prev => ({
      ...prev,
      masterPermissions: { extraTalentKeywords: extraKws, spellTraditions },
    }))
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh]
                      flex flex-col border-2 border-amber-500/30"
           onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-amber-500/20
                        bg-amber-700 text-white rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-gothic text-lg">Permissões — {character.name}</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4 space-y-5">
          {/* Spell Traditions */}
          <div>
            <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">
              Tradições de Magia Liberadas
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Permite que este personagem acesse o catálogo de magias das tradições selecionadas.
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_TRADITIONS.map(t => (
                <button key={t} onClick={() => toggleTrad(t)}
                  className={`text-xs px-3 py-1.5 rounded-full border-2 font-semibold transition-colors
                    ${spellTraditions.includes(t)
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'border-amber-400/40 text-gray-600 dark:text-gray-300 hover:border-amber-400'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Talent Keywords */}
          <div>
            <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1">
              Palavras-Chave de Talentos Extras
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Permite acesso a talentos que o personagem normalmente não teria.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TALENT_KEYWORDS.map(kw => (
                <button key={kw} onClick={() => toggleKw(kw)}
                  className={`text-xs px-2 py-1 rounded-full border transition-colors
                    ${extraKws.includes(kw)
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'border-amber-400/30 text-gray-600 dark:text-gray-300 hover:border-amber-400'}`}>
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-amber-500/20 shrink-0 flex justify-end gap-2">
          <button onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            Cancelar
          </button>
          <button onClick={save}
            className="px-4 py-2 text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
            Salvar Permissões
          </button>
        </div>
      </div>
    </div>
  )
}

const TABS = [
  { id: 1, label: 'Personagem', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 2, label: 'Pertences & Talentos', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { id: 3, label: 'Magias', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
]

const PORTRAIT_W = 160
const PORTRAIT_H = 200

const FRAME_CONFIGS = {
  cutuloframe: { cx: 80, cy: 117, rx: 69, ry: 55 },
  defaultimg:  { cx: 80, cy: 118, rx: 65, ry: 76 },
}
const getOval    = (frame) => FRAME_CONFIGS[frame] || FRAME_CONFIGS.cutuloframe
const makeClip   = (oval)  => `ellipse(${oval.rx}px ${oval.ry}px at ${oval.cx}px ${oval.cy}px)`

const FRAMES = [
  { key: 'cutuloframe', label: 'Cthulhu' },
  { key: 'defaultimg',  label: 'Padrão'  },
]

function PortraitFrame({ url, scale, offsetX, offsetY, naturalWidth, naturalHeight, frame, onChange }) {
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [draftUrl, setDraftUrl] = useState('')
  const [draftFrame, setDraftFrame] = useState(frame || 'cutuloframe')
  const [draft, setDraft] = useState({ scale: 1, offsetX: 0, offsetY: 0, nw: 0, nh: 0 })
  const urlInputRef = useRef(null)

  useEffect(() => {
    if (showUrlInput && urlInputRef.current) urlInputRef.current.focus()
  }, [showUrlInput])

  const openClick = () => {
    setDraftUrl(url || '')
    setDraftFrame(frame || 'cutuloframe')
    if (url) {
      setDraft({ scale: scale || 1, offsetX: offsetX || 0, offsetY: offsetY || 0, nw: naturalWidth || 0, nh: naturalHeight || 0 })
      setShowEditor(true)
    } else {
      setShowUrlInput(true)
    }
  }

  const confirmUrl = () => {
    const trimmed = draftUrl.trim()
    if (!trimmed) { setShowUrlInput(false); return }
    setDraft({ scale: 1, offsetX: 0, offsetY: 0, nw: 0, nh: 0 })
    setShowUrlInput(false)
    setShowEditor(true)
  }

  const handleImgLoad = (e) => {
    const nw = e.target.naturalWidth
    const nh = e.target.naturalHeight
    setDraft(prev => prev.nw ? prev : { ...prev, nw, nh })
  }

  const handleDragStart = (e) => {
    e.preventDefault()
    const sx = e.clientX, sy = e.clientY
    const sox = draft.offsetX, soy = draft.offsetY
    const onMove = (e2) => {
      setDraft(prev => ({
        ...prev,
        offsetX: sox + (e2.clientX - sx),
        offsetY: soy + (e2.clientY - sy),
      }))
    }
    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const confirmEditor = () => {
    onChange({
      portraitUrl: draftUrl,
      portraitScale: draft.scale,
      portraitOffsetX: draft.offsetX,
      portraitOffsetY: draft.offsetY,
      portraitNaturalWidth: draft.nw,
      portraitNaturalHeight: draft.nh,
      portraitFrame: draftFrame,
    })
    setShowEditor(false)
  }

  const portraitStyle = (oval, s, ox, oy, nw, nh) => {
    if (nw && nh) {
      const bs = Math.max((oval.rx * 2) / nw, (oval.ry * 2) / nh)
      const W = nw * bs * (s || 1)
      const H = nh * bs * (s || 1)
      return {
        position: 'absolute',
        left: oval.cx - W / 2 + (ox || 0),
        top: oval.cy - H / 2 + (oy || 0),
        width: W,
        height: 'auto',
        maxWidth: 'none',
        userSelect: 'none',
      }
    }
    return {
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      objectFit: 'cover',
      transformOrigin: `${oval.cx}px ${oval.cy}px`,
      transform: `translate(${ox || 0}px, ${oy || 0}px) scale(${s || 1})`,
      userSelect: 'none',
    }
  }

  return (
    <div className="relative shrink-0" style={{ width: PORTRAIT_W, height: PORTRAIT_H }}>
      {url ? (
        <>
          {/* Portrait clipped to oval — oval varies per frame */}
          <div style={{ position: 'absolute', inset: 0, clipPath: makeClip(getOval(frame)), overflow: 'hidden', zIndex: 0 }}>
            <img src={url} alt="Retrato" draggable={false}
              style={portraitStyle(getOval(frame), scale, offsetX, offsetY, naturalWidth, naturalHeight)}
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>
          {/* Frame overlay — uses saved frame choice */}
          <img src={`/${frame || 'cutuloframe'}.png`} alt="" draggable={false}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
          />
        </>
      ) : (
        /* Default placeholder — click to set portrait */
        <img src="/whochar.png" alt="Retrato padrão" draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
      )}

      {/* Hover/click button */}
      <button
        type="button"
        onClick={openClick}
        title="Definir retrato do personagem"
        className="absolute inset-0 z-[2] opacity-0 hover:opacity-100 transition-opacity
                   flex items-center justify-center hover:bg-black/40"
      >
        <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* URL input popup */}
      {showUrlInput && (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4"
             onClick={() => setShowUrlInput(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-5 w-full max-w-sm
                          border border-achtung-green/30"
               onClick={e => e.stopPropagation()}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              URL da imagem do personagem
            </p>
            <input
              ref={urlInputRef}
              type="url"
              value={draftUrl}
              onChange={e => setDraftUrl(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') confirmUrl(); if (e.key === 'Escape') setShowUrlInput(false) }}
              placeholder="https://..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-achtung-green/50 mb-4"
            />

            {/* Frame selector */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Moldura</p>
            <div className="flex gap-3 mb-4">
              {FRAMES.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDraftFrame(key)}
                  className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border-2 transition-colors
                              ${draftFrame === key
                                ? 'border-achtung-green-dark dark:border-achtung-green-light'
                                : 'border-gray-200 dark:border-gray-700 hover:border-achtung-green/50'}`}
                >
                  <img src={`/${key}.png`} alt={label}
                       className="w-14 h-[72px] object-cover rounded" draggable={false} />
                  <span className="text-[10px] text-gray-600 dark:text-gray-300">{label}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowUrlInput(false)}
                className="px-3 py-1.5 text-sm rounded-lg text-gray-500 hover:bg-gray-100
                           dark:hover:bg-gray-800 transition-colors">
                Cancelar
              </button>
              <button type="button" onClick={confirmUrl}
                className="px-3 py-1.5 text-sm rounded-lg bg-achtung-green-dark text-white
                           hover:bg-achtung-green transition-colors font-semibold">
                Avançar →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image editor popup */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4"
             onClick={() => setShowEditor(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-5
                          border border-achtung-green/30 flex gap-5 items-start"
               onClick={e => e.stopPropagation()}>

            {/* Left column: controls */}
            <div className="flex flex-col justify-between" style={{ width: 220, minHeight: PORTRAIT_H * 2 }}>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
                  Ajustar retrato
                </p>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>Zoom</span>
                    <span>{Math.round(draft.scale * 100)}%</span>
                  </div>
                  <input
                    type="range" min={0.5} max={4} step={0.05}
                    value={draft.scale}
                    onChange={e => setDraft(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                    className="w-full accent-achtung-green"
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  Arraste a imagem para reposicionar
                </p>

                {/* Frame selector inside editor */}
                <div className="mt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Moldura</p>
                  <div className="flex gap-2">
                    {FRAMES.map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setDraftFrame(key)}
                        className={`flex flex-col items-center gap-1 p-1 rounded-lg border-2 transition-colors
                                    ${draftFrame === key
                                      ? 'border-achtung-green-dark dark:border-achtung-green-light'
                                      : 'border-gray-200 dark:border-gray-700 hover:border-achtung-green/50'}`}
                      >
                        <img src={`/${key}.png`} alt={label}
                             className="w-10 h-[52px] object-cover rounded" draggable={false} />
                        <span className="text-[9px] text-gray-600 dark:text-gray-300">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <button type="button" onClick={confirmEditor}
                  className="w-full px-3 py-1.5 text-sm rounded-lg bg-achtung-green-dark text-white
                             hover:bg-achtung-green transition-colors font-semibold text-center">
                  Salvar
                </button>
                <button type="button" onClick={() => setShowEditor(false)}
                  className="w-full px-3 py-1.5 text-sm rounded-lg text-gray-500 hover:bg-gray-100
                             dark:hover:bg-gray-800 transition-colors text-center">
                  Cancelar
                </button>
                <button type="button"
                  onClick={() => { setShowEditor(false); setShowUrlInput(true) }}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline transition-colors text-center">
                  Trocar URL
                </button>
              </div>
            </div>

            {/* Right column: image preview (2× scaled) */}
            <div style={{ width: PORTRAIT_W * 2, height: PORTRAIT_H * 2, position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
              <div style={{ width: PORTRAIT_W, height: PORTRAIT_H, transform: 'scale(2)', transformOrigin: '0 0' }}>
                {(() => {
                  const editorOval = getOval(draftFrame)
                  return (<>
                    <img
                      src={draftUrl}
                      alt="Preview"
                      draggable={false}
                      style={{
                        ...portraitStyle(editorOval, draft.scale, draft.offsetX, draft.offsetY, draft.nw, draft.nh),
                        cursor: 'grab',
                        zIndex: 0,
                      }}
                      onLoad={handleImgLoad}
                      onMouseDown={handleDragStart}
                    />
                    <svg
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
                      viewBox={`0 0 ${PORTRAIT_W} ${PORTRAIT_H}`}
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <mask id="editor-oval-mask">
                          <rect width={PORTRAIT_W} height={PORTRAIT_H} fill="white" />
                          <ellipse cx={editorOval.cx} cy={editorOval.cy} rx={editorOval.rx} ry={editorOval.ry} fill="black" />
                        </mask>
                      </defs>
                      <rect width={PORTRAIT_W} height={PORTRAIT_H} fill="rgba(0,0,0,0.5)" mask="url(#editor-oval-mask)" />
                    </svg>
                  </>)
                })()}
                <img src={`/${draftFrame}.png`} alt="" draggable={false}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
                />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

function MomentumCounter() {
  const [momentum, setMomentum] = useState(0)

  useEffect(() => {
    const unsub = storage.onMomentumChanged(setMomentum)
    return () => unsub()
  }, [])

  const decrease = () => {
    const val = Math.max(0, momentum - 1)
    storage.setMomentum(val)
    setMomentum(val)
  }

  const increase = () => {
    const val = Math.min(6, momentum + 1)
    storage.setMomentum(val)
    setMomentum(val)
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 px-2 sm:px-4 rounded-xl
                    bg-achtung-green/10 dark:bg-achtung-green/5 border border-achtung-green/30">
      <span className="font-gothic text-lg text-achtung-green-dark dark:text-achtung-green-light">
        Ímpeto
      </span>
      <button
        onClick={decrease}
        className="w-8 h-8 flex items-center justify-center rounded-lg
                   bg-achtung-green-dark hover:bg-achtung-green text-white
                   transition-colors text-lg font-bold active:scale-90"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span className="text-3xl font-bold min-w-[2ch] text-center text-achtung-green-dark dark:text-achtung-green-light">
        {momentum}
      </span>
      <button
        onClick={increase}
        className="w-8 h-8 flex items-center justify-center rounded-lg
                   bg-achtung-green-dark hover:bg-achtung-green text-white
                   transition-colors text-lg font-bold active:scale-90"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div className="flex gap-0.5 ml-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i < momentum
                ? 'bg-achtung-green dark:bg-achtung-green-light'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function CharacterSheet({ characterName, isMaster = false, isNpc = false }) {
  const [character, setCharacter] = useState(null)
  const [activeTab, setActiveTab] = useState(1)
  const [activeTest, setActiveTest] = useState(null)
  const [showMasterConfig, setShowMasterConfig] = useState(false)
  const [wizardHighlight, setWizardHighlight] = useState([])
  const { setActiveCharacterName } = useSelection()
  const saveTimerRef = useRef(null)
  const localUpdateRef = useRef(false)

  const listenFn = isNpc ? storage.onNpcChanged : storage.onCharacterChanged
  const saveFn = isNpc ? storage.saveNpc : storage.saveCharacter

  // Listen for active test (only for real players, not NPC/master views)
  useEffect(() => {
    if (isMaster || isNpc) return
    const unsub = storage.onPlayerTestChanged(characterName, setActiveTest)
    return () => unsub()
  }, [characterName, isMaster, isNpc])

  useEffect(() => {
    setActiveCharacterName(characterName)

    // Real-time listener for character data
    const unsub = listenFn(characterName, (data) => {
      // Only update from Firestore if we don't have a pending local save
      if (!localUpdateRef.current) {
        if (data) setCharacter(data)
      }
    })

    return () => {
      unsub()
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [characterName, setActiveCharacterName, listenFn])

  const updateCharacter = useCallback((updater) => {
    setCharacter(prev => {
      if (!prev) return prev
      const updated = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }

      // Block Firestore listener until save completes
      localUpdateRef.current = true

      // Debounced save to Firestore
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      saveTimerRef.current = setTimeout(() => {
        saveFn(updated).then(() => {
          // Only allow Firestore updates after save is confirmed
          localUpdateRef.current = false
        })
      }, 600)

      return updated
    })
  }, [saveFn])

  const updateField = useCallback((field, value) => {
    updateCharacter(prev => ({ ...prev, [field]: value }))
  }, [updateCharacter])

  if (!character) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Carregando ficha...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-2 sm:p-4 lg:p-6">
      {/* Sheet Header */}
      <div className="text-center mb-4 relative">
        <h1 className="font-gothic text-3xl sm:text-4xl text-achtung-green-dark dark:text-achtung-green-light">
          Achtung! Cthulhu
        </h1>
        <div className="flex items-center justify-center gap-3 mt-1">
          <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Ficha de Personagem
          </span>
          <span className="text-xs font-bold text-achtung-green px-2 py-0.5 border border-achtung-green rounded">
            2d20
          </span>
        </div>
        {isMaster && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isNpc && (
              <label className="flex items-center gap-1.5 cursor-pointer select-none
                                px-2 py-1 rounded-lg border border-orange-400/40
                                bg-orange-50 dark:bg-orange-900/20
                                hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                     title="Marcar NPC como Em Cena para usar no chat">
                <input
                  type="checkbox"
                  checked={!!character.emCena}
                  onChange={e => {
                    updateCharacter(prev => ({ ...prev, emCena: e.target.checked }))
                    storage.updateNpcEmCena(characterName, e.target.checked)
                  }}
                  className="w-3.5 h-3.5 accent-orange-500"
                />
                <span className="text-xs font-semibold text-orange-700 dark:text-orange-300 whitespace-nowrap">
                  Em cena
                </span>
              </label>
            )}
            <button
              onClick={() => setShowMasterConfig(true)}
              title="Configurações do Mestre"
              className="p-2 rounded-lg text-amber-600 dark:text-amber-400
                         hover:bg-amber-500/10 border border-amber-500/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Momentum Counter + Portrait */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <MomentumCounter />
        <PortraitFrame
          url={character.portraitUrl || ''}
          scale={character.portraitScale || 1}
          offsetX={character.portraitOffsetX || 0}
          offsetY={character.portraitOffsetY || 0}
          naturalWidth={character.portraitNaturalWidth || 0}
          naturalHeight={character.portraitNaturalHeight || 0}
          frame={character.portraitFrame || 'cutuloframe'}
          onChange={data => updateCharacter(prev => ({ ...prev, ...data }))}
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-achtung-green/30 dark:border-achtung-green/20 mb-4 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => { if (character.setupComplete !== false) setActiveTab(tab.id) }}
            className={`flex items-center justify-center gap-1.5 px-3 py-2.5 flex-1 sm:flex-none sm:px-4 text-xs sm:text-sm font-medium
                        transition-all border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-achtung-green text-achtung-green-dark dark:text-achtung-green-light'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
            </svg>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="card p-3 sm:p-4 lg:p-6">
        {activeTab === 1 && (
          <SheetPage1
            character={character}
            updateField={updateField}
            updateCharacter={updateCharacter}
            wizardHighlight={wizardHighlight}
          />
        )}
        {activeTab === 2 && (
          <SheetPage2
            character={character}
            updateField={updateField}
            updateCharacter={updateCharacter}
            isMaster={isMaster}
          />
        )}
        {activeTab === 3 && (
          <SheetPage3
            character={character}
            updateField={updateField}
            updateCharacter={updateCharacter}
            isMaster={isMaster}
          />
        )}
      </div>

      <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4">
        TM &amp; &copy; 2021 Modiphius Entertainment Ltd.
      </p>

      {/* Player Test Popup */}
      {activeTest && character && !isMaster && !isNpc && (
        <PlayerTestPopup
          character={character}
          test={activeTest}
        />
      )}

      {/* Master Config Popup */}
      {showMasterConfig && character && (
        <MasterConfigPopup
          character={character}
          updateCharacter={updateCharacter}
          onClose={() => setShowMasterConfig(false)}
        />
      )}

      {/* Character Creation Wizard */}
      {character.setupComplete === false && (
        <CharacterCreationWizard
          character={character}
          onComplete={(finalChar) => {
            setWizardHighlight([])
            setActiveTab(1)
            updateCharacter(() => finalChar)
          }}
          onHighlightChange={setWizardHighlight}
        />
      )}
    </div>
  )
}
