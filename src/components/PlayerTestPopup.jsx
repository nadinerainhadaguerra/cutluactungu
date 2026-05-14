import { useState, useEffect } from 'react'
import { storage } from '../services/storage'
import { ATTRIBUTES, SKILLS_DATA } from '../utils/characterTemplate'
import { useDraggable } from '../hooks/useDraggable'

export default function PlayerTestPopup({ character, test }) {
  const [momentum, setMomentum] = useState(0)
  const [purchasedDice, setPurchasedDice] = useState(0)
  const [selectedTruths, setSelectedTruths] = useState([])
  const [useFortune, setUseFortune] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const { pos, onDragStart } = useDraggable({
    x: Math.max(0, Math.floor((window.innerWidth - 448) / 2)),
    y: Math.max(0, Math.floor((window.innerHeight - 500) / 2)),
  })

  const mestre = character?.mestre || ''

  useEffect(() => {
    if (!mestre) return
    const unsub = storage.onMomentumChangedForMaster(mestre, setMomentum)
    return () => unsub()
  }, [mestre])

  const attrData = ATTRIBUTES.find(a => a.id === test.attribute)
  const skillData = SKILLS_DATA.find(s => s.id === test.skill)

  const attrValue = parseInt(character.attributes?.[test.attribute]?.graduation) || 0
  const skillValue = parseInt(character.skills?.[test.skill]?.graduation) || 0
  const target = attrValue + skillValue

  const hasFocus = test.focus
    ? (character.skills?.[test.skill]?.focuses || []).includes(test.focus)
    : false

  const truths = (character.personalTruths || []).filter(t => t && t.trim() !== '')
  const fortune = parseInt(character.fortune) || 0
  const totalDice = 2 + purchasedDice + selectedTruths.length
  const momentumCost = purchasedDice * (purchasedDice + 1) / 2

  const toggleTruth = (truth) => {
    setSelectedTruths(prev =>
      prev.includes(truth) ? prev.filter(t => t !== truth) : [...prev, truth]
    )
  }

  const handleRoll = async () => {
    if (momentumCost > momentum) return
    if (useFortune && fortune <= 0) return

    if (useFortune) {
      await storage.spendFortune(character.name)
    }

    const dice = []
    for (let i = 0; i < totalDice; i++) {
      let value
      if (useFortune && i === 0) {
        value = 1
      } else {
        value = Math.floor(Math.random() * 20) + 1
      }
      dice.push({ value, success: value === 1 || value <= target })
    }

    const criticals = dice.filter(d => d.value === 1).length
    const normalSuccesses = dice.filter(d => d.success && d.value !== 1).length
    const totalSuccesses = hasFocus
      ? normalSuccesses * 2 + criticals * 3
      : normalSuccesses + criticals * 2
    const totalComplications = dice.filter(d => d.value === 20).length

    const excess = Math.max(0, totalSuccesses - test.requiredSuccesses)
    let newMomentum = momentum - momentumCost
    if (excess > 0) newMomentum = Math.min(6, newMomentum + excess)
    if (mestre) await storage.setMomentumForMaster(mestre, newMomentum)

    if (totalComplications > 0 && mestre) {
      await storage.addComplicationsForMaster(mestre, totalComplications)
    }

    const rollData = {
      attribute: { name: attrData?.name, value: attrValue },
      skill: { name: skillData?.name, graduation: skillValue },
      target,
      focus: test.focus && hasFocus ? test.focus : null,
      dice,
      totalSuccesses,
      totalComplications,
      purchasedDice,
      truthsUsed: [...selectedTruths],
      requiredSuccesses: test.requiredSuccesses,
      excessToMomentum: excess,
      usedFortune: useFortune,
    }
    const message = {
      id: Date.now().toString(),
      sender: character.name,
      type: 'system_roll',
      content: `${attrData?.name} + ${skillData?.name} (alvo ${target})`,
      rollData: null,
      systemRollData: rollData,
      timestamp: new Date().toISOString(),
    }
    await storage.saveMessage(message)
    await storage.clearActiveTest(character.name)
  }

  return (
    <div
      className="fixed z-50 w-full max-w-md shadow-2xl rounded-2xl border-2 border-achtung-green/30 overflow-hidden"
      style={{ left: pos.x, top: pos.y }}
    >
      {/* Header */}
      <div
        onMouseDown={onDragStart}
        onTouchStart={onDragStart}
        className="flex items-center justify-between px-5 py-3
                   bg-achtung-green-dark text-white cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center gap-2">
          <img src="/dadocutulo.png" className="w-5 h-5 object-contain" alt="teste" />
          <span className="font-gothic text-lg">Teste do Mestre</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMinimized(prev => !prev)}
            className="p-1.5 hover:bg-white/20 rounded transition-colors"
            title={minimized ? 'Expandir' : 'Minimizar'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={minimized ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
            </svg>
          </button>
          <button
            onClick={() => storage.clearActiveTest(character.name)}
            className="p-1.5 hover:bg-white/20 rounded transition-colors"
            title="Fechar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      {!minimized && (
        <div className="max-h-[70vh] overflow-y-auto relative"
             style={{ backgroundImage: "url('/dadocutulo.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-white/85 dark:bg-gray-900/85" />
          <div className="relative p-5 space-y-4">
            {/* Target info */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg bg-achtung-green/15 text-sm font-semibold
                               text-achtung-green-dark dark:text-achtung-green-light">
                {attrData?.name}: {attrValue}
              </span>
              <span className="text-gray-400 font-bold">+</span>
              <span className="px-3 py-1 rounded-lg bg-achtung-green/15 text-sm font-semibold
                               text-achtung-green-dark dark:text-achtung-green-light">
                {skillData?.name}: {skillValue}
              </span>
              <span className="text-gray-400 font-bold">=</span>
              <span className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-lg font-bold
                               text-gray-800 dark:text-gray-100">
                Alvo: {target}
              </span>
            </div>

            {/* Required successes */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Sucessos necessários:{' '}
              <span className="font-bold text-gray-800 dark:text-gray-200">{test.requiredSuccesses}</span>
            </div>

            {/* Focus */}
            {test.focus && (
              <div className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                hasFocus
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-400 text-green-700 dark:text-green-400'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-400 text-red-700 dark:text-red-400'
              }`}>
                Foco: {test.focus}
                {hasFocus
                  ? ' ✓ — você tem este foco (sucessos dobrados)'
                  : ' ✗ — você não tem este foco'}
              </div>
            )}

            {/* Buy dice */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Comprar d20s extras
                <span className="font-normal text-xs text-gray-500 ml-1">
                  (custo: 1/2/3 ímpeto | disponível: {momentum})
                </span>
              </label>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map(n => (
                  <button
                    key={n}
                    onClick={() => setPurchasedDice(n)}
                    disabled={n * (n + 1) / 2 > momentum}
                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                      purchasedDice === n
                        ? 'bg-achtung-green text-white shadow-md scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    } ${n * (n + 1) / 2 > momentum ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {n}
                  </button>
                ))}
                {purchasedDice > 0 && (
                  <span className="text-xs text-purple-600 dark:text-purple-400 ml-2">
                    -{momentumCost} ímpeto
                  </span>
                )}
              </div>
            </div>

            {/* Truths */}
            {truths.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Usar Verdades <span className="font-normal text-xs text-gray-500">(+1d20 cada)</span>
                </label>
                <div className="space-y-1.5">
                  {truths.map((truth, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedTruths.includes(truth)}
                        onChange={() => toggleTruth(truth)}
                        className="w-4 h-4 accent-achtung-green"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-achtung-green transition-colors">
                        {truth}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Dice count */}
            <div className="text-center py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Total de dados: <span className="font-bold text-lg">{totalDice}d20</span>
              </span>
              <span className="text-xs text-gray-500 ml-2">
                (2 base
                {purchasedDice > 0 ? ` + ${purchasedDice} comprados` : ''}
                {selectedTruths.length > 0 ? ` + ${selectedTruths.length} verdades` : ''})
              </span>
            </div>

            {/* Usar Fortuna */}
            {fortune > 0 && (
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
            )}

            <button
              onClick={handleRoll}
              disabled={momentumCost > momentum || (useFortune && fortune <= 0)}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg ${
                momentumCost <= momentum && (!useFortune || fortune > 0)
                  ? 'bg-achtung-green hover:bg-achtung-green-dark text-white hover:shadow-xl active:scale-[0.98]'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Realizar Teste
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
