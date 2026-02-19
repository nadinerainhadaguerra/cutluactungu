import { useState, useEffect } from 'react'
import { storage } from '../services/storage'
import CharacterSheet from './CharacterSheet'

function CharacterCard({ char, onClick, onEdit, onDelete, onResetPassword }) {
  return (
    <div className="card p-4 text-left hover:shadow-2xl hover:scale-[1.02]
                    transition-all duration-200 group relative cursor-pointer"
         onClick={onClick}>
      {/* Action buttons (visible on hover) */}
      {(onEdit || onDelete || onResetPassword) && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {onResetPassword && (
            <button
              onClick={e => { e.stopPropagation(); onResetPassword() }}
              className="w-7 h-7 flex items-center justify-center rounded-lg
                         bg-yellow-500/80 hover:bg-yellow-500 text-white transition-colors"
              title="Redefinir senha"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </button>
          )}
          {onEdit && (
            <button
              onClick={e => { e.stopPropagation(); onEdit() }}
              className="w-7 h-7 flex items-center justify-center rounded-lg
                         bg-achtung-green/80 hover:bg-achtung-green text-white transition-colors"
              title="Editar nome"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={e => { e.stopPropagation(); onDelete() }}
              className="w-7 h-7 flex items-center justify-center rounded-lg
                         bg-red-500/80 hover:bg-red-500 text-white transition-colors"
              title="Excluir"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-achtung-green-dark dark:text-achtung-green-light
                         truncate group-hover:text-achtung-green">
            {char.name}
          </h3>
          {char.archetype && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {char.archetype}
            </p>
          )}
          {char.nationality && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {char.nationality}
            </p>
          )}
        </div>
        <svg className="w-5 h-5 text-gray-400 group-hover:text-achtung-green transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {char.rank && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-achtung-green/10
                           text-achtung-green-dark dark:text-achtung-green-light">
            {char.rank}
          </span>
        )}
        {char.background && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700
                           text-gray-600 dark:text-gray-400">
            {char.background}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
        Atualizado: {char.updatedAt ? new Date(char.updatedAt).toLocaleDateString('pt-BR') : '-'}
      </p>
    </div>
  )
}

function ResetPasswordPopup({ characterName, onSave, onClose }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!password.trim()) { setError('Digite uma nova senha.'); return }
    if (password !== confirm) { setError('As senhas não coincidem.'); return }
    onSave(password)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm
                      border-2 border-yellow-500/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-yellow-500/20
                        bg-yellow-600 text-white rounded-t-2xl">
          <span className="font-gothic text-xl">Redefinir Senha — {characterName}</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
              Nova Senha
            </label>
            <input
              type="text"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Nova senha"
              autoFocus
              className="w-full px-3 py-2 rounded-lg border-2 border-yellow-400/30
                         dark:border-yellow-500/20 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 text-sm outline-none
                         focus:border-yellow-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
              Confirmar Senha
            </label>
            <input
              type="text"
              value={confirm}
              onChange={e => { setConfirm(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Repita a senha"
              className="w-full px-3 py-2 rounded-lg border-2 border-yellow-400/30
                         dark:border-yellow-500/20 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 text-sm outline-none
                         focus:border-yellow-500 transition-colors"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={!password.trim()}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg
              ${password.trim()
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white hover:shadow-xl active:scale-[0.98]'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
          >
            Redefinir Senha
          </button>
        </div>
      </div>
    </div>
  )
}

function NpcNamePopup({ onSave, onClose }) {
  const [name, setName] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) return
    onSave(name.trim())
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm
                      border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <span className="font-gothic text-xl">Novo NPC</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
              Nome do NPC
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Nome do NPC"
              autoFocus
              className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                         dark:border-achtung-green/20 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 text-sm outline-none
                         focus:border-achtung-green transition-colors"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg
              ${name.trim()
                ? 'bg-achtung-green hover:bg-achtung-green-dark text-white hover:shadow-xl active:scale-[0.98]'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  )
}

function NpcEditPopup({ currentName, onSave, onClose }) {
  const [name, setName] = useState(currentName)

  const handleSubmit = () => {
    if (!name.trim() || name.trim() === currentName) return
    onSave(name.trim())
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm
                      border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <span className="font-gothic text-xl">Editar NPC</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
              Nome do NPC
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoFocus
              className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                         dark:border-achtung-green/20 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 text-sm outline-none
                         focus:border-achtung-green transition-colors"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!name.trim() || name.trim() === currentName}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg
              ${name.trim() && name.trim() !== currentName
                ? 'bg-achtung-green hover:bg-achtung-green-dark text-white hover:shadow-xl active:scale-[0.98]'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MasterDashboard() {
  const [characters, setCharacters] = useState([])
  const [npcs, setNpcs] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [selectedNpc, setSelectedNpc] = useState(null)
  const [showNpcPopup, setShowNpcPopup] = useState(false)
  const [editingNpc, setEditingNpc] = useState(null)

  useEffect(() => {
    const unsubChars = storage.onCharactersChanged(setCharacters)
    const unsubNpcs = storage.onNpcsChanged(setNpcs)
    return () => { unsubChars(); unsubNpcs() }
  }, [])

  const createNpc = async (name) => {
    await storage.createNpc(name)
    setShowNpcPopup(false)
  }

  const renameNpc = async (oldName, newName) => {
    const npc = npcs.find(n => n.name === oldName)
    if (!npc) return
    const updated = { ...npc, name: newName }
    await storage.saveNpc(updated)
    await storage.deleteNpc(oldName)
    setEditingNpc(null)
  }

  const deleteNpc = async (name) => {
    if (!confirm(`Excluir o NPC "${name}"? Esta ação não pode ser desfeita.`)) return
    await storage.deleteNpc(name)
  }

  const deleteCharacter = async (name) => {
    if (!confirm(`Excluir a ficha de "${name}"? Esta ação não pode ser desfeita.`)) return
    await storage.deleteCharacter(name)
  }

  // Viewing a player character sheet
  if (selectedCharacter) {
    return (
      <div>
        <div className="sticky top-[57px] z-10 bg-achtung-parchment-dark/90 dark:bg-gray-900/90
                        backdrop-blur-sm border-b border-achtung-green/20 px-4 py-2">
          <button
            onClick={() => setSelectedCharacter(null)}
            className="flex items-center gap-2 text-sm text-achtung-green-dark dark:text-achtung-green-light
                       hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para lista
          </button>
        </div>
        <CharacterSheet characterName={selectedCharacter} isMaster />
      </div>
    )
  }

  // Viewing an NPC sheet
  if (selectedNpc) {
    return (
      <div>
        <div className="sticky top-[57px] z-10 bg-achtung-parchment-dark/90 dark:bg-gray-900/90
                        backdrop-blur-sm border-b border-achtung-green/20 px-4 py-2">
          <button
            onClick={() => setSelectedNpc(null)}
            className="flex items-center gap-2 text-sm text-achtung-green-dark dark:text-achtung-green-light
                       hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para lista
          </button>
        </div>
        <CharacterSheet characterName={selectedNpc} isMaster isNpc />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="font-gothic text-3xl text-achtung-green-dark dark:text-achtung-green-light mb-2">
          Painel do Mestre
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {characters.length} ficha{characters.length !== 1 ? 's' : ''} de jogador{characters.length !== 1 ? 'es' : ''}
          {' · '}
          {npcs.length} NPC{npcs.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Fichas de Jogadores */}
      <div className="mb-8">
        <h3 className="font-gothic text-xl text-achtung-green-dark dark:text-achtung-green-light mb-3">
          Fichas dos Jogadores
        </h3>
        {characters.length === 0 ? (
          <div className="card p-8 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">
              Nenhuma ficha criada ainda.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Jogadores podem criar fichas pela tela de login.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map(char => (
              <CharacterCard
                key={char.name}
                char={char}
                onClick={() => setSelectedCharacter(char.name)}
                onDelete={() => deleteCharacter(char.name)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fichas NPCs */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="font-gothic text-xl text-achtung-green-dark dark:text-achtung-green-light">
            Fichas NPCs
          </h3>
          <button
            onClick={() => setShowNpcPopup(true)}
            className="px-3 py-1.5 text-sm font-semibold rounded-lg
                       bg-achtung-green hover:bg-achtung-green-dark text-white
                       transition-colors active:scale-95"
          >
            Criar Ficha NPC
          </button>
        </div>

        {npcs.length === 0 ? (
          <div className="card p-8 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum NPC criado ainda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {npcs.map(npc => (
              <CharacterCard
                key={npc.name}
                char={npc}
                onClick={() => setSelectedNpc(npc.name)}
                onEdit={() => setEditingNpc(npc.name)}
                onDelete={() => deleteNpc(npc.name)}
              />
            ))}
          </div>
        )}
      </div>

      {/* NPC Name Popup */}
      {showNpcPopup && (
        <NpcNamePopup
          onSave={createNpc}
          onClose={() => setShowNpcPopup(false)}
        />
      )}

      {/* NPC Edit Popup */}
      {editingNpc && (
        <NpcEditPopup
          currentName={editingNpc}
          onSave={(newName) => renameNpc(editingNpc, newName)}
          onClose={() => setEditingNpc(null)}
        />
      )}


    </div>
  )
}
