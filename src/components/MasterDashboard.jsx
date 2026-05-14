import { useState, useEffect } from 'react'
import { storage } from '../services/storage'
import CharacterSheet from './CharacterSheet'
import { useMasterSettings } from '../contexts/MasterSettingsContext'
import { useSubHeader } from '../contexts/SubHeaderContext'

function CharacterCard({ char, onClick, onEdit, onDelete, onResetPassword, onEmCenaChange }) {
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

      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Atualizado: {char.updatedAt ? new Date(char.updatedAt).toLocaleDateString('pt-BR') : '-'}
        </p>
        {onEmCenaChange && (
          <label
            className="flex items-center gap-1.5 cursor-pointer select-none
                       px-2 py-0.5 rounded-lg border border-orange-400/40
                       bg-orange-50 dark:bg-orange-900/20
                       hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
            onClick={e => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={!!char.emCena}
              onChange={e => onEmCenaChange(e.target.checked)}
              className="w-3.5 h-3.5 accent-orange-500"
            />
            <span className="text-xs font-semibold text-orange-700 dark:text-orange-300 whitespace-nowrap">
              Em cena
            </span>
          </label>
        )}
      </div>
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

function DeleteConfirmPopup({ name, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm
                      border-2 border-red-500/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-red-500/20
                        bg-red-600 text-white rounded-t-2xl">
          <span className="font-gothic text-xl">Apagar Ficha</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-5">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Deseja realmente apagar a ficha <span className="font-bold text-gray-900 dark:text-white">"{name}"</span>?
            <br />
            <span className="text-red-500 text-xs mt-1 block">Esta ação não pode ser desfeita.</span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all
                         bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                         text-gray-700 dark:text-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg
                         bg-red-500 hover:bg-red-600 text-white hover:shadow-xl active:scale-[0.98]"
            >
              Apagar
            </button>
          </div>
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

function CampaignSettingsPopup({ activeMaster, onClose }) {
  const [orgs, setOrgs] = useState([])
  const [showAddOrg, setShowAddOrg] = useState(false)
  const [newOrgName, setNewOrgName] = useState('')
  const [addingAffOrg, setAddingAffOrg] = useState(null)
  const [newAffName, setNewAffName] = useState('')

  useEffect(() => {
    if (!activeMaster) return
    const unsub = storage.onCampaignSettingsChangedForMaster(activeMaster, data => {
      setOrgs(data.organizations || [])
    })
    return () => unsub()
  }, [activeMaster])

  const save = (newOrgs) => {
    storage.saveCampaignSettingsForMaster(activeMaster, { organizations: newOrgs })
  }

  const toggleOrg = (orgName) => {
    save(orgs.map(o => o.name === orgName ? { ...o, active: !o.active } : o))
  }

  const addOrg = () => {
    const trimmed = newOrgName.trim()
    if (!trimmed) return
    save([...orgs, { name: trimmed, active: false, affiliations: [] }])
    setNewOrgName('')
    setShowAddOrg(false)
  }

  const addAffiliation = () => {
    const trimmed = newAffName.trim()
    if (!trimmed || !addingAffOrg) return
    save(orgs.map(o => o.name === addingAffOrg
      ? { ...o, affiliations: [...o.affiliations, trimmed] }
      : o
    ))
    setNewAffName('')
    setAddingAffOrg(null)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh]
                      flex flex-col border-2 border-purple-500/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-500/20
                        bg-purple-700 text-white rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚔</span>
            <span className="font-gothic text-xl">Configuração da Campanha</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4 space-y-3">
          {orgs.map(org => (
            <div key={org.name} className="border border-purple-200 dark:border-purple-800/50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                  Filiações {org.name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (addingAffOrg === org.name) { setAddingAffOrg(null); setNewAffName('') }
                      else { setAddingAffOrg(org.name); setNewAffName('') }
                    }}
                    className="text-xs px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30
                               text-purple-700 dark:text-purple-300 hover:bg-purple-200
                               dark:hover:bg-purple-900/50 transition-colors"
                  >
                    + Filiação
                  </button>
                  <button
                    onClick={() => toggleOrg(org.name)}
                    title={org.active ? 'Ativo — clique para desativar' : 'Inativo — clique para ativar'}
                    className={`relative shrink-0 w-10 h-6 rounded-full transition-colors duration-200
                      ${org.active ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
                      ${org.active ? 'left-5' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              {org.affiliations.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {org.affiliations.map(aff => (
                    <span key={aff}
                      className="text-xs px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800
                                 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                      {aff}
                    </span>
                  ))}
                </div>
              )}

              {addingAffOrg === org.name && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newAffName}
                    onChange={e => setNewAffName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addAffiliation()}
                    placeholder="Nome da filiação"
                    autoFocus
                    className="flex-1 px-2 py-1.5 text-sm rounded-lg border border-purple-300 dark:border-purple-700
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                               outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={addAffiliation}
                    disabled={!newAffName.trim()}
                    className="px-3 py-1.5 text-sm font-semibold bg-purple-600 hover:bg-purple-700
                               text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
          ))}

          {showAddOrg ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newOrgName}
                onChange={e => setNewOrgName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addOrg()}
                placeholder="Nome da organização"
                autoFocus
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-purple-300 dark:border-purple-700
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                           outline-none focus:border-purple-500"
              />
              <button
                onClick={addOrg}
                disabled={!newOrgName.trim()}
                className="px-3 py-2 text-sm font-semibold bg-purple-600 hover:bg-purple-700
                           text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Criar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddOrg(true)}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-purple-300 dark:border-purple-700/50
                         text-purple-600 dark:text-purple-400 text-sm font-semibold
                         hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              + Adicionar Organização
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function MasterSettingsPopup({ onClose }) {
  const { settings, updateSetting } = useMasterSettings()

  const toggles = [
    {
      key: 'poderDaMagia',
      label: 'Poder da Magia',
      desc: 'Adiciona botão de rolar dano nas magias usando ◆ igual ao Poder do conjurador.',
    },
    {
      key: 'resistenciaPorAtributo',
      label: 'Resistência por Atributo',
      desc: 'Exibe Resistência Física (Armadura + Cobertura) e Mental (Coragem + Moral) calculadas automaticamente na ficha.',
    },
    {
      key: 'dadoDeDanoPorAtributo',
      label: 'Dado de Dano por Atributo',
      desc: 'Adiciona ◆ extras ao rolar dano de arma com base no atributo relevante (Força para corpo-a-corpo, Coordenação para à distância).',
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-gothic text-xl">Configurações da Sessão</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Regras opcionais que se aplicam a todos os jogadores da sessão.
          </p>
          {toggles.map(t => (
            <div key={t.key} className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => updateSetting(t.key, !settings[t.key])}
                className={`relative shrink-0 mt-0.5 w-10 h-6 rounded-full overflow-hidden transition-colors duration-200
                  ${settings[t.key] ? 'bg-achtung-green' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span className={`absolute top-1 left-0 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
                  ${settings[t.key] ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CounterBar({ masterName }) {
  const [momentum, setMomentum] = useState(0)
  const [complications, setComplications] = useState(0)

  useEffect(() => {
    if (!masterName) return
    const unsubMomentum = storage.onMomentumChangedForMaster(masterName, setMomentum)
    const unsubComplications = storage.onComplicationsChangedForMaster(masterName, setComplications)
    return () => { unsubMomentum(); unsubComplications() }
  }, [masterName])

  const changeMomentum = (delta) => storage.setMomentumForMaster(masterName, momentum + delta)
  const changeComplications = (delta) => storage.setComplicationsForMaster(masterName, complications + delta)

  return (
    <div className="card px-5 py-3 mb-6 flex items-center gap-6 flex-wrap w-fit mx-auto">
      {/* Ímpeto */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-semibold text-achtung-green-dark dark:text-achtung-green-light whitespace-nowrap">
          Ímpeto
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => changeMomentum(-1)}
            disabled={momentum <= 0}
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
                       bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                       text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ▼
          </button>
          <span className="w-10 text-center text-xl font-bold text-achtung-green-dark dark:text-achtung-green-light">
            {momentum}
          </span>
          <button
            onClick={() => changeMomentum(1)}
            disabled={momentum >= 6}
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
                       bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                       text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ▲
          </button>
        </div>
      </div>

      <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />

      {/* Complicações */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 whitespace-nowrap">
          Complicações
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => changeComplications(-1)}
            disabled={complications <= 0}
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
                       bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                       text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ▼
          </button>
          <span className="w-10 text-center text-xl font-bold text-orange-600 dark:text-orange-400">
            {complications}
          </span>
          <button
            onClick={() => changeComplications(1)}
            disabled={complications >= 6}
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
                       bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                       text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ▲
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MasterDashboard({ activeMaster }) {
  const [allCharacters, setAllCharacters] = useState([])
  const [allNpcs, setAllNpcs] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [selectedNpc, setSelectedNpc] = useState(null)
  const [showNpcPopup, setShowNpcPopup] = useState(false)
  const [editingNpc, setEditingNpc] = useState(null)
  const [deletingChar, setDeletingChar] = useState(null)
  const [deletingNpc, setDeletingNpc] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showCampaignSettings, setShowCampaignSettings] = useState(false)
  const { setSubHeader } = useSubHeader()

  const characters = allCharacters.filter(c => c.mestre === activeMaster)
  const npcs = allNpcs.filter(n => n.mestre === activeMaster)

  useEffect(() => {
    const unsubChars = storage.onCharactersChanged(setAllCharacters)
    const unsubNpcs = storage.onNpcsChanged(setAllNpcs)
    return () => { unsubChars(); unsubNpcs() }
  }, [])

  // Reset selected sheet when master changes
  useEffect(() => {
    setSelectedCharacter(null)
    setSelectedNpc(null)
  }, [activeMaster])

  useEffect(() => {
    if (selectedCharacter) {
      const char = allCharacters.find(c => c.name === selectedCharacter)
      setSubHeader({
        label: 'Voltar para lista',
        onBack: () => setSelectedCharacter(null),
        characterName: selectedCharacter,
        characterMestre: char?.mestre || activeMaster,
        isNpc: false,
      })
    } else if (selectedNpc) {
      const npc = allNpcs.find(n => n.name === selectedNpc)
      setSubHeader({
        label: 'Voltar para lista',
        onBack: () => setSelectedNpc(null),
        characterName: selectedNpc,
        characterMestre: npc?.mestre || activeMaster,
        isNpc: true,
      })
    } else {
      setSubHeader(null)
    }
    return () => setSubHeader(null)
  }, [selectedCharacter, selectedNpc, allCharacters, allNpcs, activeMaster, setSubHeader])

  const createNpc = async (name) => {
    await storage.createNpc(name, activeMaster)
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
    await storage.deleteNpc(name)
    setDeletingNpc(null)
  }

  const deleteCharacter = async (name) => {
    await storage.deleteCharacter(name)
    setDeletingChar(null)
  }

  // Viewing a player character sheet
  if (selectedCharacter) {
    return <CharacterSheet characterName={selectedCharacter} isMaster />
  }

  // Viewing an NPC sheet
  if (selectedNpc) {
    return <CharacterSheet characterName={selectedNpc} isMaster isNpc />
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-gothic text-3xl text-achtung-green-dark dark:text-achtung-green-light mb-2">
            {activeMaster}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {characters.length} ficha{characters.length !== 1 ? 's' : ''} de jogador{characters.length !== 1 ? 'es' : ''}
            {' · '}
            {npcs.length} NPC{npcs.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
        <button
          onClick={() => setShowCampaignSettings(true)}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl
                     bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20
                     text-purple-700 dark:text-purple-400 transition-colors text-base"
          title="Configuração da campanha"
        >
          ⚔
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl
                     bg-achtung-green/10 hover:bg-achtung-green/20 border border-achtung-green/20
                     text-achtung-green-dark dark:text-achtung-green-light transition-colors"
          title="Configurações da sessão"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        </div>
      </div>

      <CounterBar masterName={activeMaster} />

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
                onDelete={() => setDeletingChar(char.name)}
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
                onDelete={() => setDeletingNpc(npc.name)}
                onEmCenaChange={checked => storage.updateNpcEmCena(npc.name, checked)}
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

      {/* Delete Character Confirm */}
      {deletingChar && (
        <DeleteConfirmPopup
          name={deletingChar}
          onConfirm={() => deleteCharacter(deletingChar)}
          onClose={() => setDeletingChar(null)}
        />
      )}

      {/* Delete NPC Confirm */}
      {deletingNpc && (
        <DeleteConfirmPopup
          name={deletingNpc}
          onConfirm={() => deleteNpc(deletingNpc)}
          onClose={() => setDeletingNpc(null)}
        />
      )}

      {showSettings && (
        <MasterSettingsPopup onClose={() => setShowSettings(false)} />
      )}

      {showCampaignSettings && (
        <CampaignSettingsPopup
          activeMaster={activeMaster}
          onClose={() => setShowCampaignSettings(false)}
        />
      )}

    </div>
  )
}
