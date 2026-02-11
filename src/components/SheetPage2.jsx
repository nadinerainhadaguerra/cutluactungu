import { useState } from 'react'
import { storage } from '../services/storage'
import { parseDiceExpression } from '../utils/diceRoller'
import { useSelection } from '../contexts/SelectionContext'

function SectionHeader({ children }) {
  return (
    <div className="inline-block">
      <div className="section-header">{children}</div>
    </div>
  )
}

/* ── Talent Form Popup ── */
function TalentFormPopup({ talent, onSave, onClose }) {
  const [form, setForm] = useState(talent || { name: '', keyword: '', effect: '' })
  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = () => {
    if (!form.name.trim()) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md
                      border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <span className="font-gothic text-xl">{talent ? 'Editar Talento' : 'Novo Talento'}</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">Nome</label>
            <input type="text" value={form.name} onChange={e => update('name', e.target.value)}
              placeholder="Nome do talento"
              className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                         dark:border-achtung-green/20 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 text-sm outline-none
                         focus:border-achtung-green transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">Palavra-Chave</label>
            <input type="text" value={form.keyword} onChange={e => update('keyword', e.target.value)}
              placeholder="Palavra-chave do talento"
              className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                         dark:border-achtung-green/20 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 text-sm outline-none
                         focus:border-achtung-green transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">Efeito</label>
            <textarea value={form.effect} onChange={e => update('effect', e.target.value)}
              placeholder="Efeito do talento" rows={4}
              className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                         dark:border-achtung-green/20 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 text-sm outline-none
                         focus:border-achtung-green transition-colors resize-y" />
          </div>
          <button onClick={handleSubmit} disabled={!form.name.trim()}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg mt-2
              ${form.name.trim()
                ? 'bg-achtung-green hover:bg-achtung-green-dark text-white hover:shadow-xl active:scale-[0.98]'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Talent Card ── */
function TalentCard({ talent, expanded, onToggle, onSendChat, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-achtung-green/20 bg-gray-50 dark:bg-gray-800/60
                    hover:border-achtung-green/40 transition-colors overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 cursor-pointer" onClick={onToggle}>
        <span className="text-sm font-semibold text-achtung-green-dark dark:text-achtung-green-light truncate">
          {talent.name}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {/* Send to chat */}
          <button type="button" onClick={e => { e.stopPropagation(); onSendChat() }}
            className="w-6 h-6 flex items-center justify-center rounded
                       hover:bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green
                       transition-colors" title="Enviar no chat">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
          {/* Edit */}
          <button type="button" onClick={e => { e.stopPropagation(); onEdit() }}
            className="w-6 h-6 flex items-center justify-center rounded
                       hover:bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green
                       transition-colors" title="Editar">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          {/* Delete */}
          <button type="button" onClick={e => { e.stopPropagation(); onDelete() }}
            className="w-6 h-6 flex items-center justify-center rounded
                       hover:bg-red-500/20 text-red-500 transition-colors" title="Excluir">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Expand arrow */}
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-achtung-green/10 space-y-1.5">
          {talent.keyword && (
            <div className="text-xs">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Palavra-Chave: </span>
              <span className="text-gray-800 dark:text-gray-200">{talent.keyword}</span>
            </div>
          )}
          {talent.effect && (
            <div className="text-xs">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Efeito: </span>
              <span className="text-gray-800 dark:text-gray-200">{talent.effect}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Weapon Popups ── */
function WeaponFormPopup({ weapon, onSave, onClose }) {
  const [form, setForm] = useState(weapon || {
    imageUrl: '', name: '', focus: '', range: '',
    stress: '', barrage: '', size: '', qualities: '', restriction: '',
  })

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const fields = [
    { key: 'imageUrl', label: 'URL da Arma', placeholder: 'https://...' },
    { key: 'name', label: 'Nome', placeholder: 'Nome da arma' },
    { key: 'focus', label: 'Foco', placeholder: 'Tipo de arma' },
    { key: 'range', label: 'Alcance', placeholder: 'Alcance' },
    { key: 'stress', label: 'Estresse', placeholder: 'Ex: 3d6 + Intenso' },
    { key: 'barrage', label: 'Barragem', placeholder: 'Barragem' },
    { key: 'size', label: 'Tamanho', placeholder: 'Tamanho' },
    { key: 'qualities', label: 'Qualidade', placeholder: 'Qualidade' },
    { key: 'restriction', label: 'Nível de Restrição', placeholder: 'Nível de restrição' },
  ]

  const handleSubmit = () => {
    if (!form.name.trim()) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh]
                      overflow-y-auto border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <span className="font-gothic text-xl">{weapon ? 'Editar Arma' : 'Nova Arma'}</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-3">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
                {f.label}
              </label>
              <input
                type="text"
                value={form[f.key] || ''}
                onChange={e => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                           dark:border-achtung-green/20 bg-white dark:bg-gray-800
                           text-gray-900 dark:text-gray-100 text-sm outline-none
                           focus:border-achtung-green transition-colors"
              />
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={!form.name.trim()}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg mt-2
              ${form.name.trim()
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

function WeaponDetailPopup({ weapon, onClose, onDelete }) {
  const fields = [
    { label: 'Foco', value: weapon.focus },
    { label: 'Alcance', value: weapon.range },
    { label: 'Estresse', value: weapon.stress },
    { label: 'Barragem', value: weapon.barrage },
    { label: 'Tamanho', value: weapon.size },
    { label: 'Qualidade', value: weapon.qualities },
    { label: 'Nível de Restrição', value: weapon.restriction },
  ]

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm
                      border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <span className="font-gothic text-xl">{weapon.name}</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5">
          {weapon.imageUrl && (
            <img
              src={weapon.imageUrl}
              alt={weapon.name}
              className="w-full h-40 object-contain rounded-lg mb-4 bg-gray-100 dark:bg-gray-800"
              onError={e => { e.target.src = '/armadefault.png' }}
            />
          )}
          <div className="space-y-2">
            {fields.map(f => f.value ? (
              <div key={f.label} className="flex justify-between text-sm">
                <span className="font-semibold text-gray-600 dark:text-gray-400">{f.label}:</span>
                <span className="text-gray-900 dark:text-gray-100 text-right ml-2">{f.value}</span>
              </div>
            ) : null)}
          </div>
          <button
            onClick={() => { onDelete(); onClose() }}
            className="w-full mt-4 py-2 rounded-xl font-semibold text-sm
                       bg-red-500/10 hover:bg-red-500/20 text-red-500
                       border border-red-500/30 transition-colors"
          >
            Remover Arma
          </button>
        </div>
      </div>
    </div>
  )
}

function WeaponCard({ weapon, onClickName, onClickImage, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false)
  const imgSrc = (!weapon.imageUrl || imgError) ? '/armadefault.png' : weapon.imageUrl

  return (
    <div className="relative flex flex-col items-center gap-1.5 p-2 rounded-xl
                    bg-gray-50 dark:bg-gray-800/60 border border-achtung-green/20
                    hover:border-achtung-green/40 transition-colors w-32 group">
      <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button type="button" onClick={onEdit}
          className="w-5 h-5 flex items-center justify-center rounded bg-achtung-green/80
                     hover:bg-achtung-green text-white transition-colors" title="Editar">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button type="button" onClick={onDelete}
          className="w-5 h-5 flex items-center justify-center rounded bg-red-500/80
                     hover:bg-red-500 text-white transition-colors" title="Excluir">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <button type="button" onClick={onClickImage}
        className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700
                   hover:ring-2 hover:ring-achtung-green transition-all cursor-pointer
                   active:scale-95 flex items-center justify-center"
        title="Rolar estresse da arma">
        <img src={imgSrc} alt={weapon.name} className="w-full h-full object-contain"
          onError={() => setImgError(true)} />
      </button>
      <button type="button" onClick={onClickName}
        className="text-xs font-semibold text-center leading-tight
                   text-achtung-green-dark dark:text-achtung-green-light
                   hover:underline cursor-pointer truncate w-full"
        title="Ver detalhes">
        {weapon.name}
      </button>
    </div>
  )
}

/* ── Main Component ── */
export default function SheetPage2({ character, updateCharacter }) {
  const [showWeaponForm, setShowWeaponForm] = useState(false)
  const [editingWeaponIdx, setEditingWeaponIdx] = useState(null)
  const [detailWeaponIdx, setDetailWeaponIdx] = useState(null)
  const [showTalentForm, setShowTalentForm] = useState(false)
  const [editingTalentIdx, setEditingTalentIdx] = useState(null)
  const [expandedTalent, setExpandedTalent] = useState(null)
  const { activeCharacterName } = useSelection()

  const updateBelonging = (index, value) => {
    updateCharacter(prev => {
      const belongings = [...prev.belongings]
      belongings[index] = value
      return { ...prev, belongings }
    })
  }

  /* ── Talent methods ── */
  const addTalent = (talent) => {
    updateCharacter(prev => ({
      ...prev,
      talents: [...(prev.talents || []), talent],
    }))
    setShowTalentForm(false)
  }

  const updateTalent = (index, talent) => {
    updateCharacter(prev => {
      const talents = [...prev.talents]
      talents[index] = talent
      return { ...prev, talents }
    })
    setEditingTalentIdx(null)
  }

  const deleteTalent = (index) => {
    updateCharacter(prev => ({
      ...prev,
      talents: prev.talents.filter((_, i) => i !== index),
    }))
    if (expandedTalent === index) setExpandedTalent(null)
  }

  const sendTalentToChat = async (talent) => {
    const lines = [
      `━━━ 🎭 TALENTO ━━━`,
      `📌 ${talent.name}`,
    ]
    if (talent.keyword) lines.push(`🔑 Palavra-Chave: ${talent.keyword}`)
    if (talent.effect) lines.push(`⚡ Efeito: ${talent.effect}`)
    lines.push(`━━━━━━━━━━━━━━━`)

    const message = {
      id: Date.now().toString(),
      sender: activeCharacterName || 'Sistema',
      type: 'message',
      content: lines.join('\n'),
      rollData: null,
      systemRollData: null,
      timestamp: new Date().toISOString(),
    }
    await storage.saveMessage(message)
  }

  /* ── Weapon methods ── */
  const addWeapon = (weapon) => {
    updateCharacter(prev => ({
      ...prev,
      weapons: [...(prev.weapons || []), weapon],
    }))
    setShowWeaponForm(false)
  }

  const updateWeapon = (index, weapon) => {
    updateCharacter(prev => {
      const weapons = [...prev.weapons]
      weapons[index] = weapon
      return { ...prev, weapons }
    })
    setEditingWeaponIdx(null)
  }

  const deleteWeapon = (index) => {
    updateCharacter(prev => ({
      ...prev,
      weapons: prev.weapons.filter((_, i) => i !== index),
    }))
  }

  const rollWeaponStress = async (weapon) => {
    const stressField = weapon.stress || ''
    const diceMatch = stressField.match(/[\dd+\-*/() ]+/i)
    const diceExpr = diceMatch ? diceMatch[0].trim() : ''
    const effectText = stressField.replace(diceExpr, '').replace(/^[\s+\-,;:]+/, '').trim()

    if (!diceExpr || !/\d+d\d+/i.test(diceExpr)) {
      const message = {
        id: Date.now().toString(),
        sender: activeCharacterName || 'Sistema',
        type: 'message',
        content: `⚔ ${weapon.name}${stressField ? ` — Estresse: ${stressField}` : ''}${weapon.barrage ? ` | Barragem: ${weapon.barrage}` : ''}`,
        rollData: null,
        systemRollData: null,
        timestamp: new Date().toISOString(),
      }
      await storage.saveMessage(message)
      return
    }

    const rollData = parseDiceExpression(diceExpr)
    const extras = []
    if (effectText) extras.push(`Efeito: ${effectText}`)
    if (weapon.barrage) extras.push(`Barragem: ${weapon.barrage}`)
    const extraInfo = extras.length > 0 ? ` | ${extras.join(' | ')}` : ''

    const message = {
      id: Date.now().toString(),
      sender: activeCharacterName || 'Sistema',
      type: rollData.error ? 'error' : 'roll',
      content: rollData.error
        ? rollData.error
        : `⚔ ${weapon.name}: ${diceExpr}${extraInfo}`,
      rollData: rollData.error ? null : rollData,
      systemRollData: null,
      timestamp: new Date().toISOString(),
    }
    await storage.saveMessage(message)
  }

  const allWeapons = character.weapons || []
  const weapons = allWeapons
    .map((w, i) => ({ ...w, _idx: i }))
    .filter(w => w.name && w.name.trim())

  const talents = (character.talents || [])
    .map((t, i) => ({ ...t, _idx: i }))
    .filter(t => t.name && t.name.trim())

  return (
    <div className="space-y-6">
      {/* Pertences */}
      <div>
        <SectionHeader>Pertences</SectionHeader>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {character.belongings.map((item, i) => (
            <input
              key={i}
              type="text"
              value={item}
              onChange={e => updateBelonging(i, e.target.value)}
              className="sheet-input text-sm"
              placeholder={`Item ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Talentos */}
      <div>
        <div className="flex items-center gap-2">
          <SectionHeader>Talentos</SectionHeader>
          <button
            type="button"
            onClick={() => setShowTalentForm(true)}
            className="w-7 h-7 flex items-center justify-center rounded-full
                       bg-achtung-green/20 hover:bg-achtung-green/40
                       text-achtung-green-dark dark:text-achtung-green-light
                       transition-colors"
            title="Adicionar talento"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {talents.length === 0 ? (
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-600">
            Nenhum talento adicionado.
          </p>
        ) : (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 items-start">
            {talents.map((talent) => (
              <TalentCard
                key={talent._idx}
                talent={talent}
                expanded={expandedTalent === talent._idx}
                onToggle={() => setExpandedTalent(expandedTalent === talent._idx ? null : talent._idx)}
                onSendChat={() => sendTalentToChat(talent)}
                onEdit={() => setEditingTalentIdx(talent._idx)}
                onDelete={() => deleteTalent(talent._idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Armas */}
      <div>
        <div className="flex items-center gap-2">
          <SectionHeader>Armas</SectionHeader>
          <button
            type="button"
            onClick={() => setShowWeaponForm(true)}
            className="w-7 h-7 flex items-center justify-center rounded-full
                       bg-achtung-green/20 hover:bg-achtung-green/40
                       text-achtung-green-dark dark:text-achtung-green-light
                       transition-colors"
            title="Adicionar arma"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {weapons.length === 0 ? (
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-600">
            Nenhuma arma adicionada.
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-3">
            {weapons.map((weapon) => (
              <WeaponCard
                key={weapon._idx}
                weapon={weapon}
                onClickName={() => setDetailWeaponIdx(weapon._idx)}
                onClickImage={() => rollWeaponStress(weapon)}
                onEdit={() => setEditingWeaponIdx(weapon._idx)}
                onDelete={() => deleteWeapon(weapon._idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Biografia */}
      <div>
        <SectionHeader>Biografia</SectionHeader>
        <textarea
          value={character.biography || ''}
          onChange={e => updateCharacter(prev => ({ ...prev, biography: e.target.value }))}
          rows={12}
          className="mt-2 w-full bg-transparent border-2 border-achtung-green-muted/50
                     dark:border-achtung-green/30 rounded-lg p-3 outline-none text-sm
                     focus:border-achtung-green dark:focus:border-achtung-green-light
                     resize-y transition-colors"
          placeholder="Escreva a biografia do personagem..."
        />
      </div>

      {/* ── Popups ── */}
      {showTalentForm && (
        <TalentFormPopup
          talent={null}
          onSave={addTalent}
          onClose={() => setShowTalentForm(false)}
        />
      )}

      {editingTalentIdx !== null && (character.talents || [])[editingTalentIdx] && (
        <TalentFormPopup
          talent={character.talents[editingTalentIdx]}
          onSave={(t) => updateTalent(editingTalentIdx, t)}
          onClose={() => setEditingTalentIdx(null)}
        />
      )}

      {showWeaponForm && (
        <WeaponFormPopup
          weapon={null}
          onSave={addWeapon}
          onClose={() => setShowWeaponForm(false)}
        />
      )}

      {editingWeaponIdx !== null && allWeapons[editingWeaponIdx] && (
        <WeaponFormPopup
          weapon={allWeapons[editingWeaponIdx]}
          onSave={(w) => updateWeapon(editingWeaponIdx, w)}
          onClose={() => setEditingWeaponIdx(null)}
        />
      )}

      {detailWeaponIdx !== null && allWeapons[detailWeaponIdx] && (
        <WeaponDetailPopup
          weapon={allWeapons[detailWeaponIdx]}
          onClose={() => setDetailWeaponIdx(null)}
          onDelete={() => deleteWeapon(detailWeaponIdx)}
        />
      )}
    </div>
  )
}
