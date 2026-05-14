import { useState, useEffect } from 'react'
import { storage } from '../services/storage'

function ScenarioFormPopup({ onSave, onClose, initialValues = null }) {
  const [title, setTitle] = useState(initialValues?.title || '')
  const [images, setImages] = useState(
    initialValues?.images?.length ? initialValues.images : ['']
  )
  const isEdit = !!initialValues

  const addImage = () => {
    if (images.length < 30) setImages(prev => [...prev, ''])
  }

  const updateImage = (i, val) => {
    setImages(prev => prev.map((img, idx) => idx === i ? val : img))
  }

  const removeImage = (i) => {
    if (images.length === 1) return
    setImages(prev => prev.filter((_, idx) => idx !== i))
  }

  const handleSubmit = () => {
    const valid = images.filter(u => u.trim())
    if (!title.trim() || valid.length === 0) return
    onSave(title.trim(), valid)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm
                      border-2 border-achtung-green/30 max-h-[90vh] flex flex-col"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl flex-shrink-0">
          <span className="font-gothic text-xl">{isEdit ? 'Editar Cenário' : 'Novo Cenário'}</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Nome do cenário"
              autoFocus
              className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                         dark:border-achtung-green/20 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 text-sm outline-none
                         focus:border-achtung-green transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Imagens ({images.length}/30)
              </label>
              {images.length < 30 && (
                <button
                  onClick={addImage}
                  className="text-xs px-2 py-0.5 rounded bg-achtung-green text-white
                             hover:bg-achtung-green-dark transition-colors font-bold"
                >
                  + Adicionar
                </button>
              )}
            </div>
            <div className="space-y-2">
              {images.map((url, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={url}
                    onChange={e => updateImage(i, e.target.value)}
                    placeholder={`https://... (imagem ${i + 1})`}
                    className="flex-1 px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                               dark:border-achtung-green/20 bg-white dark:bg-gray-800
                               text-gray-900 dark:text-gray-100 text-sm outline-none
                               focus:border-achtung-green transition-colors"
                  />
                  {images.length > 1 && (
                    <button
                      onClick={() => removeImage(i)}
                      className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                      title="Remover"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 flex-shrink-0">
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !images.some(u => u.trim())}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg
              ${title.trim() && images.some(u => u.trim())
                ? 'bg-achtung-green hover:bg-achtung-green-dark text-white hover:shadow-xl active:scale-[0.98]'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
          >
            {isEdit ? 'Salvar Alterações' : 'Criar Cenário'}
          </button>
        </div>
      </div>
    </div>
  )
}

function PlayerSelectPopup({ players, currentShownTo = [], onConfirm, onClose }) {
  const [selected, setSelected] = useState(new Set(currentShownTo))

  const toggle = (name) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const toggleAll = () => {
    if (selected.size === players.length) setSelected(new Set())
    else setSelected(new Set(players))
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-xs
                      border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <span className="font-gothic text-xl">Exibir para...</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {players.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              Nenhum jogador cadastrado.
            </p>
          ) : (
            <>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <label className="flex items-center gap-3 cursor-pointer px-2 py-1 rounded
                                  hover:bg-achtung-green/5 transition-colors border-b
                                  border-achtung-green/10 pb-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selected.size === players.length}
                    onChange={toggleAll}
                    className="accent-achtung-green w-4 h-4"
                  />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Todos</span>
                </label>
                {players.map(name => (
                  <label key={name}
                         className="flex items-center gap-3 cursor-pointer px-2 py-1 rounded
                                    hover:bg-achtung-green/5 transition-colors">
                    <input
                      type="checkbox"
                      checked={selected.has(name)}
                      onChange={() => toggle(name)}
                      className="accent-achtung-green w-4 h-4"
                    />
                    <span className="text-sm text-gray-800 dark:text-gray-200">{name}</span>
                  </label>
                ))}
              </div>
            </>
          )}
          <button
            onClick={() => onConfirm([...selected])}
            disabled={selected.size === 0}
            className={`w-full mt-4 py-2.5 rounded-xl font-bold transition-all
              ${selected.size > 0
                ? 'bg-achtung-green hover:bg-achtung-green-dark text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
          >
            Exibir
          </button>
        </div>
      </div>
    </div>
  )
}

function ScenarioCard({ scenario, onDelete, onEdit, onShow, onView, isActive }) {
  const thumb = scenario.images?.[0]

  return (
    <div className={`card overflow-hidden ${isActive ? 'ring-2 ring-achtung-green' : ''}`}>
      <div
        className="w-full h-28 bg-gray-100 dark:bg-gray-800 cursor-pointer overflow-hidden
                   flex items-center justify-center"
        onClick={onView}
        title="Visualizar cenário"
      >
        {thumb ? (
          <img
            src={thumb}
            alt={scenario.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={e => { e.target.style.display = 'none' }}
          />
        ) : (
          <svg className="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>

      <div className="px-3 py-2 flex items-center gap-1">
        <span className="flex-1 text-sm truncate text-gray-800 dark:text-gray-200 font-medium min-w-0">
          {scenario.title}
        </span>
        {isActive && (
          <span className="w-2 h-2 rounded-full bg-achtung-green flex-shrink-0" title="Em exibição" />
        )}

        {/* Show/hide button */}
        <button
          onClick={onShow}
          className={`w-7 h-7 flex items-center justify-center rounded transition-colors flex-shrink-0
            ${isActive
              ? 'text-achtung-green hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              : 'text-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
          title={isActive ? 'Parar exibição' : 'Exibir para jogadores'}
        >
          {isActive ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>

        {/* Edit button */}
        <button
          onClick={onEdit}
          className="w-7 h-7 flex items-center justify-center rounded transition-colors flex-shrink-0
                     text-achtung-green hover:text-achtung-green-dark hover:bg-achtung-green/10"
          title="Editar"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>

        {/* Delete button */}
        <button
          onClick={onDelete}
          className="w-7 h-7 flex items-center justify-center rounded transition-colors flex-shrink-0
                     text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          title="Excluir"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function ScenariosPanel({ onClose, activeScenario, onViewScenario, activeMaster }) {
  const [allScenarios, setAllScenarios] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [editingScenario, setEditingScenario] = useState(null)
  const [playerSelectFor, setPlayerSelectFor] = useState(null)
  const [players, setPlayers] = useState([])

  const scenarios = allScenarios.filter(s => s.mestre === activeMaster)

  useEffect(() => {
    const unsub = storage.onScenariosChanged(setAllScenarios)
    return () => unsub()
  }, [])

  useEffect(() => {
    storage.getCharacterNames().then(setPlayers)
  }, [])

  const createScenario = async (title, images) => {
    await storage.createScenario(title, images, activeMaster)
    setShowPopup(false)
  }

  const updateScenario = async (title, images) => {
    await storage.updateScenario(editingScenario._id, title, images)
    setEditingScenario(null)
  }

  const deleteScenario = async (id) => {
    if (!confirm('Excluir este cenário?')) return
    if (activeScenario?.scenarioId === id) await storage.hideScenario()
    await storage.deleteScenario(id)
  }

  const handleShow = (scenario) => {
    if (activeScenario?.scenarioId === scenario._id) {
      storage.hideScenario()
    } else {
      setPlayerSelectFor(scenario)
    }
  }

  const confirmShow = async (selectedPlayers) => {
    await storage.showScenario(
      playerSelectFor._id,
      playerSelectFor.images[0],
      0,
      selectedPlayers
    )
    onViewScenario(playerSelectFor)
    setPlayerSelectFor(null)
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-3 border-b border-achtung-green/20
                        bg-achtung-green-dark dark:bg-gray-900">
          <span className="font-gothic text-lg text-white">Cenários da Sessão</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPopup(true)}
              className="w-8 h-8 flex items-center justify-center rounded-lg
                         bg-achtung-green hover:bg-achtung-green/80 text-white
                         transition-colors text-xl font-bold leading-none"
              title="Novo cenário"
            >
              +
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors text-white"
              title="Fechar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {scenarios.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-400 dark:text-gray-500">Nenhum cenário ainda.</p>
              <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">Clique em + para criar.</p>
            </div>
          ) : (
            scenarios.map(scenario => (
              <ScenarioCard
                key={scenario._id}
                scenario={scenario}
                isActive={activeScenario?.scenarioId === scenario._id}
                onDelete={() => deleteScenario(scenario._id)}
                onEdit={() => setEditingScenario(scenario)}
                onShow={() => handleShow(scenario)}
                onView={() => onViewScenario(scenario)}
              />
            ))
          )}
        </div>
      </div>

      {showPopup && (
        <ScenarioFormPopup
          onSave={createScenario}
          onClose={() => setShowPopup(false)}
        />
      )}

      {editingScenario && (
        <ScenarioFormPopup
          initialValues={editingScenario}
          onSave={updateScenario}
          onClose={() => setEditingScenario(null)}
        />
      )}

      {playerSelectFor && (
        <PlayerSelectPopup
          players={players}
          currentShownTo={activeScenario?.shownTo || []}
          onConfirm={confirmShow}
          onClose={() => setPlayerSelectFor(null)}
        />
      )}
    </>
  )
}
