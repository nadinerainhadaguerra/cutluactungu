import { useState, useRef, useEffect } from 'react'
import { storage } from '../services/storage'
import { parseDiceExpression } from '../utils/diceRoller'
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

function SystemRollMessage({ data }) {
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
          Comprou {data.purchasedDice}d20 (-{data.purchasedDice} impeto)
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {data.dice.map((die, i) => (
          <div
            key={i}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg
              border-2 ${
              die.success
                ? data.focus
                  ? 'border-yellow-500 bg-yellow-500/20 text-yellow-500 shadow-md shadow-yellow-500/20'
                  : 'border-green-500 bg-green-500/20 text-green-500'
                : 'border-red-500 bg-red-500/20 text-red-500'
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
    </div>
  )
}

function DiceRollPopup({ characterName, onClose, onRollComplete }) {
  const { selectedAttribute, selectedSkill } = useSelection()
  const [purchasedDice, setPurchasedDice] = useState(0)
  const [selectedTruths, setSelectedTruths] = useState([])
  const [selectedFocus, setSelectedFocus] = useState('nenhum')
  const [rollResults, setRollResults] = useState(null)
  const [error, setError] = useState('')
  const [momentum, setMomentum] = useState(0)
  const [character, setCharacter] = useState(null)

  useEffect(() => {
    const unsub = storage.onMomentumChanged(setMomentum)
    return () => unsub()
  }, [])

  useEffect(() => {
    if (characterName) {
      storage.getCharacter(characterName).then(setCharacter)
    }
  }, [characterName])

  const truths = character?.personalTruths?.filter(t => t.trim()) || []

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

  const handleRoll = () => {
    setError('')

    if (!canRoll) {
      setError('Selecione um atributo e uma pericia na ficha primeiro.')
      return
    }

    if (purchasedDice > momentum) {
      setError(`Impeto insuficiente! Disponivel: ${momentum}, necessario: ${purchasedDice}.`)
      return
    }

    if (purchasedDice > 0) {
      const newMomentum = momentum - purchasedDice
      storage.setMomentum(newMomentum)
    }

    const dice = []
    for (let i = 0; i < totalDice; i++) {
      const value = Math.floor(Math.random() * 20) + 1
      dice.push({
        value,
        success: value <= target,
      })
    }

    const totalSuccesses = dice.filter(d => d.success).length
    const totalComplications = dice.filter(d => !d.success).length

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
    }

    setRollResults(rollData)
    onRollComplete(rollData)
  }

  const resetRoll = () => {
    setRollResults(null)
    setPurchasedDice(0)
    setSelectedTruths([])
    setSelectedFocus('nenhum')
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
                    (custo: 1 impeto cada | disponivel: {momentum})
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
                      } ${n > momentum ? 'opacity-40 cursor-not-allowed' : ''}`}
                      disabled={n > momentum}
                    >
                      {n}
                    </button>
                  ))}
                  {purchasedDice > 0 && (
                    <span className="text-xs text-purple-600 dark:text-purple-400 ml-2">
                      -{purchasedDice} impeto
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

              {/* Usar Foco */}
              {canRoll && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Usar Foco
                    <span className="font-normal text-xs text-gray-500 ml-1">(sucessos em dourado)</span>
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

export default function Chat({ senderName, onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [showDicePopup, setShowDicePopup] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { activeCharacterName } = useSelection()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Real-time listener for messages
  useEffect(() => {
    const unsub = storage.onMessagesChanged(setMessages)
    return () => unsub()
  }, [])

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
  }

  const clearChat = async () => {
    await storage.clearMessages()
  }

  const formatTime = (iso) => {
    const d = new Date(iso)
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
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
          {/* Dice Roll Button */}
          <button
            onClick={() => setShowDicePopup(true)}
            className="p-1.5 rounded hover:bg-white/20 transition-colors text-white/70 hover:text-white"
            title="Rolagem de dados"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z"/>
            </svg>
          </button>
          {/* Clear Chat Button */}
          <button
            onClick={clearChat}
            className="p-1.5 rounded hover:bg-white/20 transition-colors text-white/70 hover:text-white"
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
            className="p-1.5 rounded hover:bg-white/20 transition-colors text-white/70 hover:text-white"
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
          <div className="text-center text-gray-400 dark:text-gray-600 text-sm py-8">
            <p>Nenhuma mensagem ainda.</p>
            <p className="mt-2 text-xs">
              Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/r 2d6+3</code> ou{' '}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/roll 4d4+6</code> para rolar dados.
            </p>
            <p className="mt-1 text-xs">
              Ou clique no dado para rolagem do sistema 2d20.
            </p>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} className={`${msg.sender === senderName ? 'ml-4' : 'mr-4'}`}>
            <div className={`rounded-lg p-3 ${
              msg.sender === senderName
                ? 'bg-achtung-green/15 dark:bg-achtung-green/10 ml-auto'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-achtung-green-dark dark:text-achtung-green-light">
                  {msg.sender}
                </span>
                <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
              </div>

              {msg.type === 'message' && (
                <p className="text-sm">{msg.content}</p>
              )}

              {msg.type === 'roll' && msg.rollData && (
                <RollMessage rollData={msg.rollData} />
              )}

              {msg.type === 'system_roll' && msg.systemRollData && (
                <SystemRollMessage data={msg.systemRollData} />
              )}

              {msg.type === 'error' && (
                <p className="text-sm text-red-500">Erro: {msg.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-3 border-t border-achtung-green/20 dark:border-achtung-green/10">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Mensagem ou /r 2d6+3..."
            className="flex-1 px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                       dark:border-achtung-green/20 bg-white dark:bg-gray-800
                       text-gray-900 dark:text-gray-100 text-sm
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
          onClose={() => setShowDicePopup(false)}
          onRollComplete={handleSystemRoll}
        />
      )}
    </div>
  )
}
