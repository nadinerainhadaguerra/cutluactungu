import { useState, useEffect } from 'react'
import { storage } from '../services/storage'
import { ATTRIBUTES, SKILLS_DATA } from '../utils/characterTemplate'
import { useDraggable } from '../hooks/useDraggable'

export default function TestsPopup({ onClose }) {
  const [characters, setCharacters] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [selectedAttribute, setSelectedAttribute] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [selectedFocus, setSelectedFocus] = useState(null)
  const [requiredSuccesses, setRequiredSuccesses] = useState(1)
  const [applied, setApplied] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const { pos, onDragStart } = useDraggable({
    x: Math.max(0, Math.floor((window.innerWidth - 448) / 2)),
    y: Math.max(0, Math.floor((window.innerHeight - 500) / 2)),
  })

  useEffect(() => {
    const unsub = storage.onCharactersChanged(setCharacters)
    return () => unsub()
  }, [])

  const skillFocuses = selectedSkill
    ? (SKILLS_DATA.find(s => s.id === selectedSkill)?.focuses || [])
    : []

  const canApply = selectedPlayers.length > 0 && selectedAttribute && selectedSkill && parseInt(requiredSuccesses) > 0

  const handleApply = async () => {
    if (!canApply) return
    const testData = {
      attribute: selectedAttribute,
      skill: selectedSkill,
      focus: selectedFocus || null,
      requiredSuccesses: parseInt(requiredSuccesses),
    }
    for (const player of selectedPlayers) {
      await storage.setActiveTest(player, testData)
    }
    setApplied(true)
  }

  const togglePlayer = (name) => {
    setSelectedPlayers(prev =>
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
    )
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
          <img src="/dadocutulo.png" className="w-5 h-5 object-contain" alt="testes" />
          <span className="font-gothic text-lg">Aplicar Teste</span>
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
            onClick={onClose}
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
          <div className="relative p-5 space-y-5">
            {/* Players */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Jogadores
              </label>
              {characters.length === 0 ? (
                <p className="text-sm text-gray-400">Nenhuma ficha cadastrada.</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {characters.map(char => (
                    <label key={char.name} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPlayers.includes(char.name)}
                        onChange={() => togglePlayer(char.name)}
                        className="w-4 h-4 accent-achtung-green"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{char.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Attributes */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Atributo
              </label>
              <div className="flex flex-wrap gap-2">
                {ATTRIBUTES.map(attr => (
                  <button
                    key={attr.id}
                    onClick={() => setSelectedAttribute(selectedAttribute === attr.id ? null : attr.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      selectedAttribute === attr.id
                        ? 'bg-achtung-green text-white border-achtung-green'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-achtung-green'
                    }`}
                  >
                    {attr.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Perícia
              </label>
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATA.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => {
                      setSelectedSkill(selectedSkill === skill.id ? null : skill.id)
                      setSelectedFocus(null)
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      selectedSkill === skill.id
                        ? 'bg-achtung-green text-white border-achtung-green'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-achtung-green'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Focuses */}
            {skillFocuses.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Foco <span className="font-normal text-gray-400 text-xs">(opcional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillFocuses.map(focus => (
                    <button
                      key={focus}
                      onClick={() => setSelectedFocus(selectedFocus === focus ? null : focus)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                        selectedFocus === focus
                          ? 'bg-achtung-green text-white border-achtung-green'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-achtung-green'
                      }`}
                    >
                      {focus}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Required Successes */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Sucessos Necessários
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={requiredSuccesses}
                onChange={e => setRequiredSuccesses(e.target.value)}
                className="w-24 px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                           dark:border-achtung-green/20 bg-white dark:bg-gray-800
                           text-gray-900 dark:text-gray-100 text-base outline-none
                           focus:border-achtung-green transition-colors"
              />
            </div>

            {applied && (
              <p className="text-sm text-achtung-green font-semibold text-center">
                Teste enviado para os jogadores selecionados!
              </p>
            )}

            <button
              onClick={handleApply}
              disabled={!canApply}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg ${
                canApply
                  ? 'bg-achtung-green hover:bg-achtung-green-dark text-white hover:shadow-xl active:scale-[0.98]'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Aplicar Teste
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
