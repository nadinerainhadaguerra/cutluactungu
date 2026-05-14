import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { storage } from '../services/storage'
import { parseDiceExpression, rollChallengeDice } from '../utils/diceRoller'
import { QUALIDADES_DESC } from '../utils/bookData'
import { useMasterSettings } from '../contexts/MasterSettingsContext'
import { SpellTestPopup } from './SheetPage3'

// Conjurador config (mirrors SheetPage3)
const CONJURADOR_TIPOS = [
  { id: 'tradicional', base: 2, attrId: 'discernment' },
  { id: 'pesquisador', base: 2, attrId: 'reason' },
  { id: 'amador',      base: 1, attrId: 'will' },
]
function gradToExtraPoder(grad) {
  const g = parseInt(grad) || 0
  if (g >= 16) return 5
  if (g >= 14) return 4
  if (g >= 12) return 3
  if (g >= 10) return 2
  if (g >= 9)  return 1
  return 0
}
function calcPoderFromChar(conjuradorType, attributes) {
  const config = CONJURADOR_TIPOS.find(t => t.id === conjuradorType)
  if (!config) return 0
  const grad = attributes?.[config.attrId]?.graduation
  return config.base + gradToExtraPoder(grad)
}

function ChallengeDiceMessage({ data }) {
  // data: { weaponName, dice, totalDamage, totalEffects, count, efeito, barragem }
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0, placement: 'above' })
  const tooltipRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!showTooltip) return
    function handleClick(e) {
      const inTooltip = tooltipRef.current && tooltipRef.current.contains(e.target)
      const inButton = buttonRef.current && buttonRef.current.contains(e.target)
      if (!inTooltip && !inButton) setShowTooltip(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showTooltip])

  const handleToggle = () => {
    if (!showTooltip && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const TW = 256, TH = 220
      const above = rect.top >= TH + 8
      let left = rect.left
      if (left + TW > window.innerWidth - 8) left = window.innerWidth - TW - 8
      if (left < 8) left = 8
      setTooltipPos({
        top: above ? rect.top - 8 : rect.bottom + 8,
        left,
        placement: above ? 'above' : 'below',
      })
    }
    setShowTooltip(v => !v)
  }

  const qualityEntries = data.efeito
    ? data.efeito.split(',').map(q => q.trim()).filter(Boolean)
    : []

  return (
    <div className="bg-red-900/20 dark:bg-red-900/30 rounded-lg p-2 mt-1 border border-red-500/30">
      <div className="flex items-center gap-1.5 mb-2">
        <img src="/iconed6.png" alt="d6" className="w-4 h-4 object-contain" />
        <span className="text-xs font-bold text-red-300">
          ⚔ {data.weaponName} — {data.count}
          <img src="/iconed6.png" alt="d6" className="inline w-3.5 h-3.5 mx-0.5 object-contain" />
        </span>
      </div>

      {/* Individual dice */}
      <div className="flex flex-wrap gap-1 mb-2">
        {data.dice.map((d, i) => (
          <div key={i}
            className={`w-8 h-8 rounded flex flex-col items-center justify-center leading-none border
              ${d.effect
                ? 'bg-orange-500/30 border-orange-400/60 text-orange-200'
                : d.face === 2
                  ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                  : d.face === 1
                    ? 'bg-blue-500/20 border-blue-400/50 text-blue-300'
                    : 'bg-gray-700/60 border-gray-500/40 text-gray-200'}`}
          >
            {d.effect && <span className="text-[9px] font-bold">⚔</span>}
            <span className="text-[11px] font-bold">{d.face}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex gap-3 text-xs items-center">
        <span className="font-semibold text-white">
          Dano: <span className="text-red-300 text-base font-bold">{data.totalDamage}</span>
        </span>
        {data.totalEffects > 0 && (
          <>
            <button
              ref={buttonRef}
              type="button"
              onClick={handleToggle}
              className="font-semibold text-yellow-300 hover:text-yellow-100 underline decoration-dotted cursor-pointer transition-colors"
            >
              Efeitos ⚔: <span className="text-base font-bold">{data.totalEffects}</span>
            </button>
            {showTooltip && ReactDOM.createPortal(
              <div
                ref={tooltipRef}
                style={{
                  position: 'fixed',
                  top: tooltipPos.top,
                  left: tooltipPos.left,
                  transform: tooltipPos.placement === 'above' ? 'translateY(-100%)' : 'none',
                  zIndex: 9999,
                }}
                className="bg-gray-900 border border-yellow-500/40 rounded-lg p-2.5 shadow-2xl w-64 text-[10px]"
              >
                <div className="text-yellow-400 font-bold text-[11px] mb-2">Efeitos ⚔</div>
                {qualityEntries.length > 0 ? (
                  qualityEntries.map((q, i) => {
                    const baseName = q.replace(/\s+\d+$/, '')
                    const desc = QUALIDADES_DESC[q] || QUALIDADES_DESC[baseName]
                    return (
                      <div key={i} className="mb-2 last:mb-0">
                        <span className="font-bold text-yellow-300">{q}</span>
                        {desc
                          ? <p className="text-gray-300 mt-0.5 leading-relaxed">{desc}</p>
                          : <p className="text-gray-500 mt-0.5 italic">Sem descrição.</p>
                        }
                      </div>
                    )
                  })
                ) : (
                  <span className="text-gray-400 italic">Sem efeitos especiais.</span>
                )}
              </div>,
              document.body
            )}
          </>
        )}
      </div>

      {data.barragem && (
        <div className="mt-1 text-[10px] text-blue-300">
          Barragem disponível: {data.barragem}
        </div>
      )}
    </div>
  )
}
import { useSelection } from '../contexts/SelectionContext'

function RollMessage({ rollData }) {
  return (
    <div className="bg-achtung-green/10 dark:bg-achtung-green/5 rounded-lg p-2 mt-1">
      <div className="text-xs text-achtung-green-dark dark:text-achtung-green-light font-mono mb-1">
        {rollData.expression}
      </div>
      {rollData.details.map((d, i) => (
        <div key={i} className="text-xs text-gray-600 dark:text-gray-400">
          {d.notation}: [{d.rolls.join(', ')}] = {d.sum}
        </div>
      ))}
      <div className="text-lg font-bold text-achtung-green-dark dark:text-achtung-green-light mt-1">
        Resultado: {rollData.result}
      </div>
    </div>
  )
}

function SystemRollMessage({ data, canReroll, onReroll }) {
  return (
    <div className="bg-gray-900/5 dark:bg-white/5 rounded-lg p-3 mt-1 space-y-2">
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-0.5 rounded bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light font-semibold">
          {data.attribute.name}: {data.attribute.value}
        </span>
        <span className="text-gray-400">+</span>
        <span className="px-2 py-0.5 rounded bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light font-semibold">
          {data.skill.name}: {data.skill.graduation}
        </span>
        <span className="text-gray-400">=</span>
        <span className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 font-bold">
          Alvo: {data.target}
        </span>
      </div>

      {data.focus && (
        <div className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">
          Foco: {data.focus}
        </div>
      )}

      {data.truthsUsed?.length > 0 && (
        <div className="text-xs text-blue-600 dark:text-blue-400">
          Verdades: {data.truthsUsed.join(', ')}
        </div>
      )}

      {data.purchasedDice > 0 && (
        <div className="text-xs text-purple-600 dark:text-purple-400">
          Comprou {data.purchasedDice}d20 (-{data.purchasedDice * (data.purchasedDice + 1) / 2} impeto)
        </div>
      )}

      {data.usedFortune && (
        <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
          <img src="/fortunacutulo.png" className="w-3.5 h-3.5 object-contain" alt="" />
          Usar Fortuna (1º dado = 1)
        </div>
      )}

      {data.fortuneReroll && (
        <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
          <img src="/fortunacutulo.png" className="w-3.5 h-3.5 object-contain" alt="" />
          Rerolar com Fortuna
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {data.dice.map((die, i) => (
          <div
            key={i}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg
              border-2 ${
              die.value === 20
                ? 'border-orange-500 bg-orange-500/20 text-orange-500 shadow-md shadow-orange-500/20'
                : die.value === 1
                  ? 'border-blue-500 bg-blue-500/20 text-blue-500 shadow-md shadow-blue-500/20'
                  : die.success
                    ? data.focus
                      ? 'border-yellow-500 bg-yellow-500/20 text-yellow-500 shadow-md shadow-yellow-500/20'
                      : 'border-green-500 bg-green-500/20 text-green-500'
                    : 'border-red-400 bg-red-400/10 text-red-400'
            }`}
          >
            {die.value}
          </div>
        ))}
      </div>

      <div className="flex gap-4 text-sm font-bold mt-1">
        <span className={data.focus ? 'text-yellow-500' : 'text-green-500'}>
          Sucessos: {data.totalSuccesses}
        </span>
        <span className="text-red-500">
          Complicacoes: {data.totalComplications}
        </span>
      </div>

      {canReroll && (
        <button
          onClick={onReroll}
          className="flex items-center gap-1 mt-1 px-2.5 py-1.5 rounded-lg
                     bg-amber-50 dark:bg-amber-900/20 border border-amber-400
                     hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
          title="Rerolar com Fortuna"
        >
          <img src="/fortunacutulo.png" className="w-4 h-4 object-contain" alt="" />
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">-1</span>
        </button>
      )}
    </div>
  )
}

// Portrait avatar
// Strategy: use background-image positioned so the oval center (cx=80,cy=112 in 160×200 sheet)
// maps to avatar center (18,18). AV_K scales sheet→avatar so oval height = 30px (3px padding each side).
const AVATAR_SIZE = 36
const OVAL_AV = { cx: 80, cy: 112, rx: 58, ry: 57 }
const AV_K = 32 / (OVAL_AV.ry * 2) // 30/114 ≈ 0.2632

function PortraitAvatar({ portrait, name }) {
  if (portrait?.url) {
    const nw = portrait.naturalWidth
    const nh = portrait.naturalHeight
    const half = AVATAR_SIZE / 2 // 18

    let bgStyle
    if (nw && nh) {
      const bs = Math.max((OVAL_AV.rx * 2) / nw, (OVAL_AV.ry * 2) / nh)
      const W = nw * bs * (portrait.scale || 1)
      const H = nh * bs * (portrait.scale || 1)
      const W_bg = W * AV_K
      const H_bg = H * AV_K
      const ox = portrait.offsetX || 0
      const oy = portrait.offsetY || 0
      // Oval center maps to avatar y=24 (shifted down 6px from center).
      // This puts the face top at y≈9 where the circle is ~31px wide, fully showing the forehead.
      const targetY = half + -13
      const bgX = (half-2) - (W / 2 - ox) * AV_K
      const bgY = targetY - (H / 2 - oy) * AV_K
      bgStyle = {
        backgroundImage: `url("${portrait.url}")`,
        backgroundSize: `${W_bg}px ${H_bg}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundRepeat: 'no-repeat',
      }
    } else {
      // Fallback when naturalWidth/naturalHeight not saved: show upper portion where faces usually are
      bgStyle = {
        backgroundImage: `url("${portrait.url}")`,
        backgroundSize: '110% auto',
        backgroundPosition: 'center 15%',
      }
    }

    return (
      <div style={{
        width: AVATAR_SIZE, height: AVATAR_SIZE,
        borderRadius: '50%', flexShrink: 0,
        boxShadow: '0 0 0 1px rgba(74,124,63,0.3)',
        ...bgStyle,
      }} />
    )
  }
  return (
    <div style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, flexShrink: 0 }}
         className="rounded-full border border-achtung-green/30 bg-achtung-green-dark/20
                    flex items-center justify-center text-xs font-bold
                    text-achtung-green-dark dark:text-achtung-green-light">
      {(name || '?')[0].toUpperCase()}
    </div>
  )
}

function ItemRefMessage({ data }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0, placement: 'above' })
  const tooltipRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!showTooltip) return
    function handleClick(e) {
      const inTooltip = tooltipRef.current && tooltipRef.current.contains(e.target)
      const inButton = buttonRef.current && buttonRef.current.contains(e.target)
      if (!inTooltip && !inButton) setShowTooltip(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showTooltip])

  const handleToggle = () => {
    if (!showTooltip && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const TW = 288, TH = 260
      const above = rect.top >= TH + 8
      let left = rect.left
      if (left + TW > window.innerWidth - 8) left = window.innerWidth - TW - 8
      if (left < 8) left = 8
      setTooltipPos({
        top: above ? rect.top - 8 : rect.bottom + 8,
        left,
        placement: above ? 'above' : 'below',
      })
    }
    setShowTooltip(v => !v)
  }

  const icon = data.type === 'spell' ? '✨' : data.type === 'contact' ? '👤' : '🎭'
  const fields = data.type === 'spell'
    ? [
        data.skill      && { label: 'Perícia',      value: data.skill },
        data.difficulty && { label: 'Dificuldade',  value: data.difficulty },
        data.cost       && { label: 'Custo',         value: data.cost },
        data.duration   && { label: 'Duração',       value: data.duration },
        data.effect     && { label: 'Efeito',        value: data.effect },
        data.momentum   && { label: 'Ímpeto',        value: data.momentum },
      ].filter(Boolean)
    : data.type === 'contact'
    ? [
        data.keyword && { label: 'Tipo',      value: data.keyword },
        data.effect  && { label: 'Descrição', value: data.effect },
      ].filter(Boolean)
    : [
        data.keyword && { label: 'Palavra-Chave', value: data.keyword },
        data.effect  && { label: 'Efeito',         value: data.effect },
      ].filter(Boolean)

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className="inline-flex items-center gap-1 text-sm font-semibold
                   text-achtung-green-dark dark:text-achtung-green-light
                   hover:underline decoration-dotted cursor-pointer transition-colors"
      >
        <span>{icon}</span>
        <span>{data.name}</span>
      </button>
      {showTooltip && ReactDOM.createPortal(
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: tooltipPos.top,
            left: tooltipPos.left,
            transform: tooltipPos.placement === 'above' ? 'translateY(-100%)' : 'none',
            zIndex: 9999,
          }}
          className="bg-gray-900 border border-achtung-green/40 rounded-lg p-3 shadow-2xl w-72 text-[11px]"
        >
          <div className="text-achtung-green-light font-bold text-xs mb-2">{icon} {data.name}</div>
          {fields.map((f, i) => (
            <div key={i} className="mb-1.5 last:mb-0">
              <span className="font-semibold text-gray-400">{f.label}: </span>
              <span className="text-gray-200 leading-relaxed">{f.value}</span>
            </div>
          ))}
          {fields.length === 0 && (
            <span className="text-gray-500 italic">Sem detalhes.</span>
          )}
        </div>,
        document.body
      )}
    </>
  )
}

function DiceRollPopup({ characterName, mestre, onClose, onRollComplete }) {
  const { selectedAttribute, selectedSkill } = useSelection()
  const [purchasedDice, setPurchasedDice] = useState(0)
  const [selectedTruths, setSelectedTruths] = useState([])
  const [selectedFocus, setSelectedFocus] = useState('nenhum')
  const [rollResults, setRollResults] = useState(null)
  const [error, setError] = useState('')
  const [momentum, setMomentum] = useState(0)
  const [character, setCharacter] = useState(null)
  const [useFortune, setUseFortune] = useState(false)

  useEffect(() => {
    if (!mestre) return
    const unsub = storage.onMomentumChangedForMaster(mestre, setMomentum)
    return () => unsub()
  }, [mestre])

  useEffect(() => {
    if (characterName) {
      const unsub = storage.onCharacterChanged(characterName, setCharacter)
      return () => unsub()
    }
  }, [characterName])

  const truths = character?.personalTruths?.filter(t => t.trim()) || []
  const fortune = parseInt(character?.fortune) || 0

  const availableFocuses = selectedSkill?.allFocuses || []

  const attrValue = parseInt(selectedAttribute?.value) || 0
  const skillValue = parseInt(selectedSkill?.graduation) || 0
  const target = attrValue + skillValue

  const totalDice = 2 + purchasedDice + selectedTruths.length

  const canRoll = selectedAttribute && selectedSkill

  const toggleTruth = (truth) => {
    setSelectedTruths(prev =>
      prev.includes(truth) ? prev.filter(t => t !== truth) : [...prev, truth]
    )
  }

  const handleRoll = async () => {
    setError('')

    if (!canRoll) {
      setError('Selecione um atributo e uma pericia na ficha primeiro.')
      return
    }

    if (useFortune && fortune <= 0) {
      setError('Fortuna insuficiente!')
      return
    }

    const momentumCost = purchasedDice * (purchasedDice + 1) / 2
    if (momentumCost > momentum) {
      setError(`Impeto insuficiente! Disponivel: ${momentum}, necessario: ${momentumCost}.`)
      return
    }

    if (purchasedDice > 0 && mestre) {
      const newMomentum = momentum - momentumCost
      storage.setMomentumForMaster(mestre, newMomentum)
    }

    if (useFortune) {
      await storage.spendFortune(characterName)
    }

    const dice = []
    for (let i = 0; i < totalDice; i++) {
      let value
      if (useFortune && i === 0) {
        value = 1
      } else {
        value = Math.floor(Math.random() * 20) + 1
      }
      dice.push({
        value,
        success: value === 1 || value <= target,
      })
    }

    const hasFocus = selectedFocus !== 'nenhum'
    const criticals = dice.filter(d => d.value === 1).length
    const normalSuccesses = dice.filter(d => d.success && d.value !== 1).length
    const totalSuccesses = hasFocus
      ? normalSuccesses * 2 + criticals * 3
      : normalSuccesses + criticals * 2
    const totalComplications = dice.filter(d => d.value === 20).length

    const rollData = {
      attribute: { name: selectedAttribute.name, value: attrValue },
      skill: { name: selectedSkill.name, graduation: skillValue },
      target,
      focus: selectedFocus !== 'nenhum' ? selectedFocus : null,
      dice,
      totalSuccesses,
      totalComplications,
      purchasedDice,
      truthsUsed: [...selectedTruths],
      usedFortune: useFortune,
    }

    setRollResults(rollData)
    onRollComplete(rollData)
  }

  const resetRoll = () => {
    setRollResults(null)
    setPurchasedDice(0)
    setSelectedTruths([])
    setSelectedFocus('nenhum')
    setUseFortune(false)
    setError('')
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh]
                      overflow-y-auto border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z"/>
            </svg>
            <span className="font-gothic text-xl">Rolagem de Dados</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Selection Status */}
          {!canRoll ? (
            <div className="text-center py-3 px-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20
                            border border-yellow-300 dark:border-yellow-700">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Selecione um atributo e uma pericia na ficha antes de rolar.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-lg bg-achtung-green/15 text-sm font-semibold
                                 text-achtung-green-dark dark:text-achtung-green-light">
                  {selectedAttribute.name}: {attrValue}
                </span>
                <span className="text-gray-400 font-bold">+</span>
                <span className="px-3 py-1 rounded-lg bg-achtung-green/15 text-sm font-semibold
                                 text-achtung-green-dark dark:text-achtung-green-light">
                  {selectedSkill.name}: {skillValue}
                </span>
                <span className="text-gray-400 font-bold">=</span>
                <span className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-lg font-bold">
                  Alvo: {target}
                </span>
              </div>
            </div>
          )}

          {!rollResults && (
            <>
              {/* Comprar d20s */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Comprar d20s extras
                  <span className="font-normal text-xs text-gray-500 ml-1">
                    (custo: 1/2/3 impeto | disponivel: {momentum})
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3].map(n => (
                    <button
                      key={n}
                      onClick={() => setPurchasedDice(n)}
                      className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                        purchasedDice === n
                          ? 'bg-achtung-green text-white shadow-md scale-105'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      } ${n * (n + 1) / 2 > momentum ? 'opacity-40 cursor-not-allowed' : ''}`}
                      disabled={n * (n + 1) / 2 > momentum}
                    >
                      {n}
                    </button>
                  ))}
                  {purchasedDice > 0 && (
                    <span className="text-xs text-purple-600 dark:text-purple-400 ml-2">
                      -{purchasedDice * (purchasedDice + 1) / 2} impeto
                    </span>
                  )}
                </div>
              </div>

              {/* Usar Verdades */}
              {truths.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Usar Verdades
                    <span className="font-normal text-xs text-gray-500 ml-1">(+1d20 cada)</span>
                  </label>
                  <div className="space-y-1.5">
                    {truths.map((truth, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedTruths.includes(truth)}
                          onChange={() => toggleTruth(truth)}
                          className="w-4 h-4 rounded border-achtung-green text-achtung-green
                                     focus:ring-achtung-green accent-achtung-green"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-achtung-green
                                         transition-colors">
                          {truth}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Usar Fortuna */}
              {fortune > 0 && (
                <div>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useFortune}
                      onChange={e => setUseFortune(e.target.checked)}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <img src="/fortunacutulo.png" className="w-5 h-5 object-contain" alt="" />
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">-1</span>
                  </label>
                </div>
              )}

              {/* Usar Foco */}
              {canRoll && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Usar Foco
                    <span className="font-normal text-xs text-gray-500 ml-1">(cada sucesso conta como 2)</span>
                  </label>
                  <select
                    value={selectedFocus}
                    onChange={e => setSelectedFocus(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                               dark:border-achtung-green/20 bg-white dark:bg-gray-800
                               text-gray-900 dark:text-gray-100 text-sm outline-none
                               focus:border-achtung-green transition-colors"
                  >
                    <option value="nenhum">Nenhum</option>
                    {availableFocuses.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Summary */}
              <div className="text-center py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total de dados: <span className="font-bold text-lg">{totalDice}d20</span>
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  (2 base{purchasedDice > 0 ? ` + ${purchasedDice} comprados` : ''}
                  {selectedTruths.length > 0 ? ` + ${selectedTruths.length} verdades` : ''})
                </span>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              {/* Roll Button */}
              <button
                onClick={handleRoll}
                disabled={!canRoll}
                className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg
                  ${canRoll
                    ? 'bg-achtung-green hover:bg-achtung-green-dark text-white hover:shadow-xl active:scale-[0.98]'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Rolar os dados
              </button>
            </>
          )}

          {/* Results */}
          {rollResults && (
            <div className="space-y-3">
              <SystemRollMessage data={rollResults} />
              <button
                onClick={resetRoll}
                className="w-full py-2.5 rounded-xl font-semibold bg-achtung-green hover:bg-achtung-green-dark
                           text-white transition-all"
              >
                Rolar novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Chat({ senderName, mestre, onClose, isVisible = false }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [showDicePopup, setShowDicePopup] = useState(false)
  const [senderFortune, setSenderFortune] = useState(0)
  const [portraits, setPortraits] = useState({})
  const portraitSubsRef = useRef({})
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { activeCharacterName } = useSelection()
  const { settings } = useMasterSettings()

  // Floating actions state
  const isMaster = senderName === 'Mestre'
  const [playerChar, setPlayerChar] = useState(null)
  const [emCenaNpcs, setEmCenaNpcs] = useState([])
  const [floatingMenu, setFloatingMenu] = useState(null)      // 'weapons'|'spells'|'talents'
  const [floatingNpcSel, setFloatingNpcSel] = useState(null)  // pending type awaiting NPC choice
  const [selectedNpcName, setSelectedNpcName] = useState(null)
  const [floatingSpellTest, setFloatingSpellTest] = useState(null)
  const floatingPanelRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Real-time listener for messages
  useEffect(() => {
    const unsub = storage.onMessagesChanged(setMessages)
    return () => unsub()
  }, [])

  // Listen to sender's fortune + full character data (players only)
  useEffect(() => {
    if (isMaster) return
    const unsub = storage.onCharacterChanged(senderName, char => {
      setSenderFortune(parseInt(char?.fortune) || 0)
      setPlayerChar(char)
    })
    return () => unsub()
  }, [senderName, isMaster])

  // Load Em cena NPCs for master
  useEffect(() => {
    if (!isMaster) return
    const unsub = storage.onNpcsChanged(npcs => {
      setEmCenaNpcs(npcs.filter(n => n.emCena))
    })
    return () => unsub()
  }, [isMaster])

  // Subscribe to portrait data for each unique sender as messages arrive
  useEffect(() => {
    const seen = portraitSubsRef.current
    messages.forEach(msg => {
      const name = msg.sender
      if (!name || name === 'Sistema' || seen[name]) return
      seen[name] = true
      const setPortrait = char => {
        if (char) setPortraits(p => ({
          ...p,
          [name]: {
            url: char.portraitUrl || '',
            scale: char.portraitScale || 1,
            offsetX: char.portraitOffsetX || 0,
            offsetY: char.portraitOffsetY || 0,
            naturalWidth: char.portraitNaturalWidth || 0,
            naturalHeight: char.portraitNaturalHeight || 0,
          },
        }))
      }
      storage.onCharacterChanged(name, setPortrait)
      storage.onNpcChanged(name, setPortrait)
    })
  }, [messages])

  // Click-outside handler for floating panel
  useEffect(() => {
    if (!floatingMenu && !floatingNpcSel) return
    const handler = (e) => {
      if (floatingPanelRef.current && !floatingPanelRef.current.contains(e.target)) {
        closeFloating()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [floatingMenu, floatingNpcSel])

  // ── Floating panel helpers ──────────────────────────────────────────────
  const floatingChar = isMaster
    ? emCenaNpcs.length === 1 ? emCenaNpcs[0] : emCenaNpcs.find(n => n.name === selectedNpcName) || null
    : playerChar
  const floatingCharName = floatingChar?.name || (isMaster ? null : senderName)

  const fWeapons = (floatingChar?.weapons || []).filter(w => w.name?.trim())
  const fSpells  = (floatingChar?.spells  || []).filter(s => s.name?.trim())
  const fTalents = (floatingChar?.talents || []).filter(t => t.name?.trim())

  const hasTypeAnywhere = (type) => {
    const chars = isMaster ? emCenaNpcs : (playerChar ? [playerChar] : [])
    return chars.some(c => {
      const arr = type === 'weapons' ? c.weapons : type === 'spells' ? c.spells : c.talents
      return (arr || []).some(i => i?.name?.trim())
    })
  }
  const showWeaponsBtn = hasTypeAnywhere('weapons')
  const showSpellsBtn  = hasTypeAnywhere('spells')
  const showTalentsBtn = hasTypeAnywhere('talents')
  const showFloatingBar = isVisible && (showWeaponsBtn || showSpellsBtn || showTalentsBtn)

  const closeFloating = () => {
    setFloatingMenu(null)
    setFloatingNpcSel(null)
    setSelectedNpcName(null)
  }

  const handleFloatingBtn = (type) => {
    if (floatingMenu === type) { closeFloating(); return }
    if (floatingNpcSel === type) { setFloatingNpcSel(null); return }
    setFloatingNpcSel(null)
    if (isMaster && emCenaNpcs.length > 1 && !selectedNpcName) {
      setFloatingNpcSel(type)
      setFloatingMenu(null)
    } else {
      setFloatingMenu(type)
    }
  }

  const handleSelectNpc = (npcName) => {
    setSelectedNpcName(npcName)
    setFloatingMenu(floatingNpcSel)
    setFloatingNpcSel(null)
  }

  // Roll functions for floating panel
  const rollWeaponFromFloating = async (weapon) => {
    let n = parseInt(weapon.stress, 10)
    if (!n || n < 1) {
      await storage.saveMessage({
        id: Date.now().toString(), sender: floatingCharName || 'Sistema',
        type: 'message', content: `⚔ ${weapon.name} — sem estresse definido`,
        rollData: null, systemRollData: null, timestamp: new Date().toISOString(),
      })
      return
    }
    if (settings.dadoDeDanoPorAtributo && floatingChar) {
      const range = (weapon.range || '').trim().toLowerCase()
      const isMelee = !range || ['n/a','corpo a corpo','adjacente','nenhum'].includes(range)
      const attrId = isMelee ? 'strength' : 'coordination'
      const grad = parseInt(floatingChar.attributes?.[attrId]?.graduation || '0') || 0
      let extra = 0
      if (grad >= 11) extra = 3
      else if (grad >= 9) extra = 2
      else if (grad >= 7) extra = 1
      n += extra
    }
    const result = rollChallengeDice(n)
    await storage.saveMessage({
      id: Date.now().toString(), sender: floatingCharName || 'Sistema',
      type: 'challenge_dice', content: `⚔ ${weapon.name}`,
      rollData: null, systemRollData: null,
      challengeData: { weaponName: weapon.name, ...result, efeito: weapon.effect || null, barragem: weapon.barrage || null },
      timestamp: new Date().toISOString(),
    })
  }

  const rollSpellCostFromFloating = async (spell) => {
    const costField = spell.cost || ''
    const diceMatch = costField.match(/[\dd+\-*/() ]+/i)
    const diceExpr = diceMatch ? diceMatch[0].trim() : ''
    const extraText = costField.replace(diceExpr, '').replace(/^[\s+\-,;:]+/, '').trim()
    if (!diceExpr || !/\d+d\d+/i.test(diceExpr)) {
      await storage.saveMessage({
        id: Date.now().toString(), sender: floatingCharName || 'Sistema',
        type: 'message', content: `✨ ${spell.name}${costField ? ` — Custo: ${costField}` : ''}`,
        rollData: null, systemRollData: null, timestamp: new Date().toISOString(),
      })
      return
    }
    const rollData = parseDiceExpression(diceExpr)
    await storage.saveMessage({
      id: Date.now().toString(), sender: floatingCharName || 'Sistema',
      type: rollData.error ? 'error' : 'roll',
      content: rollData.error ? rollData.error : `✨ ${spell.name} — Custo: ${diceExpr}${extraText ? ` | ${extraText}` : ''}`,
      rollData: rollData.error ? null : rollData, systemRollData: null, timestamp: new Date().toISOString(),
    })
  }

  const rollSpellDamageFromFloating = async (spell) => {
    if (!floatingChar) return
    const manualPower = parseInt(floatingChar.power, 10)
    const poderCalc = calcPoderFromChar(floatingChar.conjuradorType, floatingChar.attributes)
    let n
    if (manualPower > 0) {
      n = manualPower
    } else if (settings.poderDaMagia) {
      n = poderCalc || 0
    } else {
      const cfg = CONJURADOR_TIPOS.find(t => t.id === floatingChar.conjuradorType)
      n = cfg ? cfg.base : 0
    }
    if (!n || n < 1) {
      await storage.saveMessage({
        id: Date.now().toString(), sender: floatingCharName || 'Sistema',
        type: 'message', content: `✨ ${spell.name} — Poder não definido.`,
        rollData: null, systemRollData: null, timestamp: new Date().toISOString(),
      })
      return
    }
    const result = rollChallengeDice(n)
    await storage.saveMessage({
      id: Date.now().toString(), sender: floatingCharName || 'Sistema',
      type: 'challenge_dice', content: `✨ ${spell.name} — Dano`,
      rollData: null, systemRollData: null,
      challengeData: { weaponName: `✨ ${spell.name}`, ...result, efeito: null, barragem: null },
      timestamp: new Date().toISOString(),
    })
  }

  const sendTalentFromFloating = async (talent) => {
    await storage.saveMessage({
      id: Date.now().toString(), sender: floatingCharName || 'Sistema',
      type: 'item_ref', content: talent.name,
      itemRef: { type: 'talent', name: talent.name, keyword: talent.keyword || '', effect: talent.effect || '' },
      rollData: null, systemRollData: null, timestamp: new Date().toISOString(),
    })
  }
  // ─────────────────────────────────────────────────────────────────────────

  const sendMessage = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const isRoll = /^\/r(?:oll)?\s+/i.test(text)

    if (isRoll) {
      const expression = text.replace(/^\/r(?:oll)?\s+/i, '')
      const rollData = parseDiceExpression(expression)

      const message = {
        id: Date.now().toString(),
        sender: senderName,
        type: rollData.error ? 'error' : 'roll',
        content: rollData.error || expression,
        rollData: rollData.error ? null : rollData,
        systemRollData: null,
        timestamp: new Date().toISOString(),
      }
      await storage.saveMessage(message)
    } else {
      const message = {
        id: Date.now().toString(),
        sender: senderName,
        type: 'message',
        content: text,
        rollData: null,
        systemRollData: null,
        timestamp: new Date().toISOString(),
      }
      await storage.saveMessage(message)
    }

    setInput('')
    inputRef.current?.focus()
  }

  const handleSystemRoll = async (rollData) => {
    const message = {
      id: Date.now().toString(),
      sender: senderName,
      type: 'system_roll',
      content: `${rollData.attribute.name} + ${rollData.skill.name} (alvo ${rollData.target})`,
      rollData: null,
      systemRollData: rollData,
      timestamp: new Date().toISOString(),
    }
    await storage.saveMessage(message)
    if (rollData.totalComplications > 0 && mestre) {
      await storage.addComplicationsForMaster(mestre, rollData.totalComplications)
    }
  }

  const handleReroll = async (msg) => {
    const data = msg.systemRollData
    await storage.spendFortune(senderName)

    const dice = []
    for (let i = 0; i < data.dice.length; i++) {
      const value = Math.floor(Math.random() * 20) + 1
      dice.push({ value, success: value === 1 || value <= data.target })
    }

    const hasFocus = !!data.focus
    const criticals = dice.filter(d => d.value === 1).length
    const normalSuccesses = dice.filter(d => d.success && d.value !== 1).length
    const totalSuccesses = hasFocus
      ? normalSuccesses * 2 + criticals * 3
      : normalSuccesses + criticals * 2
    const totalComplications = dice.filter(d => d.value === 20).length

    const rollData = {
      ...data,
      dice,
      totalSuccesses,
      totalComplications,
      fortuneReroll: true,
      usedFortune: false,
    }

    const message = {
      id: Date.now().toString(),
      sender: senderName,
      type: 'system_roll',
      content: `${data.attribute.name} + ${data.skill.name} (alvo ${data.target})`,
      rollData: null,
      systemRollData: rollData,
      timestamp: new Date().toISOString(),
    }
    await storage.saveMessage(message)
    if (totalComplications > 0 && mestre) {
      await storage.addComplicationsForMaster(mestre, totalComplications)
    }
  }

  const clearChat = async () => {
    await storage.clearMessages()
  }

  const formatTime = (iso) => {
    const d = new Date(iso)
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b
                      border-achtung-green/20 dark:border-achtung-green/10 bg-achtung-green-dark dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="font-gothic text-lg text-white">Chat & Dados</span>
        </div>
        <div className="flex items-center gap-1">
          {/* Clear Chat Button */}
          <button
            onClick={clearChat}
            className="p-2 rounded hover:bg-white/20 transition-colors text-white/70 hover:text-white"
            title="Limpar chat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-white/20 transition-colors text-white/70 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-white text-sm py-8">
            <p>Nenhuma mensagem ainda.</p>
            <p className="mt-2 text-xs">
              Use <code className="bg-white/20 px-1 rounded">/r 2d6+3</code> ou{' '}
              <code className="bg-white/20 px-1 rounded">/roll 4d4+6</code> para rolar dados.
            </p>
            <p className="mt-1 text-xs">
              Ou clique no dado para rolagem do sistema 2d20.
            </p>
          </div>
        )}

        {messages.map(msg => {
          const portrait = portraits[msg.sender]
          return (
          <div key={msg.id} className="flex items-start gap-2">
            {/* Sender portrait avatar */}
            <PortraitAvatar portrait={portrait} name={msg.sender} />

            {/* Message bubble */}
            <div className={`flex-1 rounded-lg p-3 ${
              msg.sender === senderName
                ? 'bg-achtung-green/15 dark:bg-achtung-green/10'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-achtung-green-dark dark:text-achtung-green-light">
                  {msg.sender}
                </span>
                <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
              </div>

              {msg.type === 'message' && (
                <div className="text-sm whitespace-pre-line">{msg.content}</div>
              )}

              {msg.type === 'item_ref' && msg.itemRef && (
                <ItemRefMessage data={msg.itemRef} />
              )}
              {msg.type === 'item_ref' && !msg.itemRef && (
                <div className="text-sm">{msg.content}</div>
              )}

              {msg.type === 'roll' && msg.rollData && (
                <RollMessage rollData={msg.rollData} />
              )}

              {msg.type === 'challenge_dice' && msg.challengeData && (
                <ChallengeDiceMessage data={msg.challengeData} />
              )}

              {msg.type === 'system_roll' && msg.systemRollData && (
                <SystemRollMessage
                  data={msg.systemRollData}
                  canReroll={msg.sender === senderName && senderFortune > 0 && senderName !== 'Mestre'}
                  onReroll={() => handleReroll(msg)}
                />
              )}

              {msg.type === 'error' && (
                <p className="text-sm text-red-500">Erro: {msg.content}</p>
              )}
            </div>
          </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-3 border-t border-achtung-green/20 dark:border-achtung-green/10">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowDicePopup(true)}
            className="p-2 rounded-lg border-2 border-achtung-green-muted/30 dark:border-achtung-green/20
                       bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400
                       hover:border-achtung-green transition-colors"
            title="Rolagem de dados"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path className="text-achtung-green" fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
              <path fill="#000" d="M7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z"/>
            </svg>
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Mensagem ou /r 2d6+3..."
            className="flex-1 px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                       dark:border-achtung-green/20 bg-white dark:bg-gray-800
                       text-gray-900 dark:text-gray-100 text-base
                       focus:border-achtung-green dark:focus:border-achtung-green-light
                       outline-none transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-achtung-green hover:bg-achtung-green-dark text-white
                       rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1.5">
          Dados: /r ou /roll + expressao (ex: 2d6+3, 4d4*2-1d8)
        </p>
      </form>

      {/* Dice Roll Popup */}
      {showDicePopup && (
        <DiceRollPopup
          characterName={activeCharacterName}
          mestre={mestre}
          onClose={() => setShowDicePopup(false)}
          onRollComplete={handleSystemRoll}
        />
      )}

      {/* Spell Test from floating */}
      {floatingSpellTest && (
        <SpellTestPopup
          spell={floatingSpellTest.spell}
          character={floatingSpellTest.char}
          characterName={floatingSpellTest.charName}
          onClose={() => setFloatingSpellTest(null)}
        />
      )}
    </div>

    {/* ── Floating action buttons — anchored to the left edge of the sidebar ── */}
    {showFloatingBar && (
      <div
        ref={floatingPanelRef}
        className="absolute right-full bottom-4 z-10 flex flex-col gap-2 items-end"
      >
        {/* NPC selector panel */}
        {floatingNpcSel && (
          <div className="rounded-xl border border-achtung-green/30 bg-white dark:bg-gray-900 shadow-2xl p-2 w-48">
            <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 px-1 mb-1.5 uppercase tracking-wide">
              Qual personagem?
            </p>
            {emCenaNpcs
              .filter(n => {
                const arr = floatingNpcSel === 'weapons' ? n.weapons : floatingNpcSel === 'spells' ? n.spells : n.talents
                return (arr || []).some(i => i?.name?.trim())
              })
              .map(n => (
                <button key={n.name} type="button" onClick={() => handleSelectNpc(n.name)}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold
                             text-achtung-green-dark dark:text-achtung-green-light
                             hover:bg-achtung-green/10 transition-colors">
                  {n.name}
                </button>
              ))
            }
            <button type="button" onClick={() => setFloatingNpcSel(null)}
              className="w-full mt-1 text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-center py-0.5 transition-colors">
              Cancelar
            </button>
          </div>
        )}

        {/* Mini-menu panel */}
        {floatingMenu && floatingChar && (
          <div className="rounded-xl border border-achtung-green/30 bg-white dark:bg-gray-900 shadow-2xl w-60 max-h-72 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-achtung-green/20 sticky top-0 bg-white dark:bg-gray-900 rounded-t-xl">
              <span className="text-xs font-bold text-achtung-green-dark dark:text-achtung-green-light">
                {floatingMenu === 'weapons' ? '⚔ Armas' : floatingMenu === 'spells' ? '✨ Magias' : '🎭 Talentos'}
                {isMaster && <span className="font-normal text-gray-400 ml-1">— {floatingChar.name}</span>}
              </span>
              <button type="button" onClick={closeFloating}
                className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-2 space-y-1">
              {/* Weapons list */}
              {floatingMenu === 'weapons' && fWeapons.map((w, i) => (
                <div key={i} className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg
                                       bg-gray-50 dark:bg-gray-800/60">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate flex-1">{w.name}</span>
                  {parseInt(w.stress) > 0 && (
                    <button type="button" onClick={() => rollWeaponFromFloating(w)}
                      className="shrink-0 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold
                                 bg-red-500/20 hover:bg-red-500/40 border border-red-500/40
                                 text-red-700 dark:text-red-300 transition-colors"
                      title="Rolar dano">
                      <span>{w.stress}</span>
                      <img src="/iconed6.png" alt="d6" className="w-3 h-3 object-contain" />
                    </button>
                  )}
                </div>
              ))}

              {/* Spells list */}
              {floatingMenu === 'spells' && fSpells.map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-1 px-2 py-1.5 rounded-lg
                                       bg-gray-50 dark:bg-gray-800/60">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate flex-1">{s.name}</span>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button type="button"
                      onClick={() => setFloatingSpellTest({ spell: s, char: floatingChar, charName: floatingCharName })}
                      className="w-5 h-5 flex items-center justify-center rounded hover:bg-blue-500/20 text-blue-500 transition-colors"
                      title="Teste de Conjuração">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                    <button type="button" onClick={() => rollSpellCostFromFloating(s)}
                      className="w-5 h-5 flex items-center justify-center rounded hover:bg-achtung-green/20
                                 text-achtung-green-dark dark:text-achtung-green transition-colors"
                      title="Rolar Custo">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </button>
                    <button type="button" onClick={() => rollSpellDamageFromFloating(s)}
                      className="w-5 h-5 flex items-center justify-center rounded hover:bg-purple-500/20 text-purple-500 transition-colors"
                      title="Rolar Dano">
                      <img src="/iconed6.png" alt="d6" className="w-3.5 h-3.5 object-contain" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Talents list */}
              {floatingMenu === 'talents' && fTalents.map((t, i) => (
                <div key={i} className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg
                                       bg-gray-50 dark:bg-gray-800/60">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 truncate flex-1">{t.name}</span>
                  <button type="button" onClick={() => sendTalentFromFloating(t)}
                    className="shrink-0 w-5 h-5 flex items-center justify-center rounded
                               hover:bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green transition-colors"
                    title="Enviar no chat">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* The 3 action buttons */}
        <div className="flex flex-col gap-3">
          {showWeaponsBtn && (
            <button type="button" onClick={() => handleFloatingBtn('weapons')}
              className={`w-[54px] h-[54px] flex items-center justify-center rounded-xl shadow-lg text-2xl
                         border-2 transition-all
                         ${floatingMenu === 'weapons' || floatingNpcSel === 'weapons'
                           ? 'bg-red-500 border-red-600 text-white scale-105'
                           : 'bg-white dark:bg-gray-900 border-red-400/50 text-red-500 hover:border-red-500 hover:scale-105'}`}
              title="Armas">
              ⚔
            </button>
          )}
          {showSpellsBtn && (
            <button type="button" onClick={() => handleFloatingBtn('spells')}
              className={`w-[54px] h-[54px] flex items-center justify-center rounded-xl shadow-lg text-2xl
                         border-2 transition-all
                         ${floatingMenu === 'spells' || floatingNpcSel === 'spells'
                           ? 'bg-purple-500 border-purple-600 text-white scale-105'
                           : 'bg-white dark:bg-gray-900 border-purple-400/50 text-purple-500 hover:border-purple-500 hover:scale-105'}`}
              title="Magias">
              ✨
            </button>
          )}
          {showTalentsBtn && (
            <button type="button" onClick={() => handleFloatingBtn('talents')}
              className={`w-[54px] h-[54px] flex items-center justify-center rounded-xl shadow-lg text-2xl
                         border-2 transition-all
                         ${floatingMenu === 'talents' || floatingNpcSel === 'talents'
                           ? 'bg-achtung-green border-achtung-green-dark text-white scale-105'
                           : 'bg-white dark:bg-gray-900 border-achtung-green/50 text-achtung-green-dark dark:text-achtung-green hover:border-achtung-green hover:scale-105'}`}
              title="Talentos">
              🎭
            </button>
          )}
        </div>
      </div>
    )}
    </>
  )
}
