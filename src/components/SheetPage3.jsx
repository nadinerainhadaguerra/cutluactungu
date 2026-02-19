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

/* ── Spell Form Popup ── */
function SpellFormPopup({ spell, onSave, onClose }) {
  const [form, setForm] = useState(spell || {
    name: '', skill: '', difficulty: '', cost: '', duration: '', effect: '', momentum: '',
  })
  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const fields = [
    { key: 'name', label: 'Nome', placeholder: 'Nome da magia' },
    { key: 'skill', label: 'Perícia', placeholder: 'Perícia utilizada' },
    { key: 'difficulty', label: 'Dificuldade', placeholder: 'Dificuldade' },
    { key: 'cost', label: 'Custo', placeholder: 'Ex: 2d6 + 1 Sanidade' },
    { key: 'duration', label: 'Duração', placeholder: 'Duração da magia' },
    { key: 'effect', label: 'Efeito', placeholder: 'Efeito da magia', textarea: true },
    { key: 'momentum', label: 'Ímpeto', placeholder: 'Ímpeto', textarea: true },
  ]

  const handleSubmit = () => {
    if (!form.name.trim()) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 pt-[20vh]"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh]
                      overflow-y-auto border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <span className="font-gothic text-xl">{spell ? 'Editar Magia' : 'Nova Magia'}</span>
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
              {f.textarea ? (
                <textarea
                  value={form[f.key] || ''}
                  onChange={e => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                             dark:border-achtung-green/20 bg-white dark:bg-gray-800
                             text-gray-900 dark:text-gray-100 text-sm outline-none
                             focus:border-achtung-green transition-colors resize-y"
                />
              ) : (
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
              )}
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

/* ── Spell Card ── */
function SpellCard({ spell, expanded, onToggle, onSendChat, onRollCost, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-achtung-green/20 bg-gray-50 dark:bg-gray-800/60
                    hover:border-achtung-green/40 transition-colors overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 cursor-pointer" onClick={onToggle}>
        <span className="text-sm font-semibold text-achtung-green-dark dark:text-achtung-green-light truncate">
          {spell.name}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {/* Roll cost */}
          <button type="button" onClick={e => { e.stopPropagation(); onRollCost() }}
            className="w-6 h-6 flex items-center justify-center rounded
                       hover:bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green
                       transition-colors" title="Rolar Magia">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </button>
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
          {spell.skill && (
            <div className="text-xs">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Perícia: </span>
              <span className="text-gray-800 dark:text-gray-200">{spell.skill}</span>
            </div>
          )}
          {spell.difficulty && (
            <div className="text-xs">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Dificuldade: </span>
              <span className="text-gray-800 dark:text-gray-200">{spell.difficulty}</span>
            </div>
          )}
          {spell.cost && (
            <div className="text-xs">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Custo: </span>
              <span className="text-gray-800 dark:text-gray-200">{spell.cost}</span>
            </div>
          )}
          {spell.duration && (
            <div className="text-xs">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Duração: </span>
              <span className="text-gray-800 dark:text-gray-200">{spell.duration}</span>
            </div>
          )}
          {spell.effect && (
            <div className="text-xs">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Efeito: </span>
              <span className="text-gray-800 dark:text-gray-200">{spell.effect}</span>
            </div>
          )}
          {spell.momentum && (
            <div className="text-xs">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Ímpeto: </span>
              <span className="text-gray-800 dark:text-gray-200">{spell.momentum}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Main Component ── */
export default function SheetPage3({ character, updateField, updateCharacter }) {
  const [showSpellForm, setShowSpellForm] = useState(false)
  const [editingSpellIdx, setEditingSpellIdx] = useState(null)
  const [expandedSpell, setExpandedSpell] = useState(null)
  const { activeCharacterName } = useSelection()

  const addSpell = (spell) => {
    updateCharacter(prev => ({
      ...prev,
      spells: [...(prev.spells || []), spell],
    }))
    setShowSpellForm(false)
  }

  const updateSpell = (index, spell) => {
    updateCharacter(prev => {
      const spells = [...prev.spells]
      spells[index] = spell
      return { ...prev, spells }
    })
    setEditingSpellIdx(null)
  }

  const deleteSpell = (index) => {
    updateCharacter(prev => ({
      ...prev,
      spells: prev.spells.filter((_, i) => i !== index),
    }))
    if (expandedSpell === index) setExpandedSpell(null)
  }

  const sendSpellToChat = async (spell) => {
    const lines = [
      `━━━ ✨ MAGIA ━━━`,
      `📌 ${spell.name}`,
    ]
    if (spell.skill) lines.push(`📖 Perícia: ${spell.skill}`)
    if (spell.difficulty) lines.push(`🎯 Dificuldade: ${spell.difficulty}`)
    if (spell.cost) lines.push(`💎 Custo: ${spell.cost}`)
    if (spell.duration) lines.push(`⏱ Duração: ${spell.duration}`)
    if (spell.effect) lines.push(`⚡ Efeito: ${spell.effect}`)
    if (spell.momentum) lines.push(`🔄 Ímpeto: ${spell.momentum}`)
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

  const rollSpellCost = async (spell) => {
    const costField = spell.cost || ''
    const diceMatch = costField.match(/[\dd+\-*/() ]+/i)
    const diceExpr = diceMatch ? diceMatch[0].trim() : ''
    const extraText = costField.replace(diceExpr, '').replace(/^[\s+\-,;:]+/, '').trim()

    if (!diceExpr || !/\d+d\d+/i.test(diceExpr)) {
      const message = {
        id: Date.now().toString(),
        sender: activeCharacterName || 'Sistema',
        type: 'message',
        content: `✨ ${spell.name}${costField ? ` — Custo: ${costField}` : ''}`,
        rollData: null,
        systemRollData: null,
        timestamp: new Date().toISOString(),
      }
      await storage.saveMessage(message)
      return
    }

    const rollData = parseDiceExpression(diceExpr)
    const extraInfo = extraText ? ` | ${extraText}` : ''

    const message = {
      id: Date.now().toString(),
      sender: activeCharacterName || 'Sistema',
      type: rollData.error ? 'error' : 'roll',
      content: rollData.error
        ? rollData.error
        : `✨ ${spell.name} — Custo: ${diceExpr}${extraInfo}`,
      rollData: rollData.error ? null : rollData,
      systemRollData: null,
      timestamp: new Date().toISOString(),
    }
    await storage.saveMessage(message)
  }

  const spells = (character.spells || [])
    .map((s, i) => ({ ...s, _idx: i }))
    .filter(s => s.name && s.name.trim())

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SectionHeader>Magias</SectionHeader>
          <button
            type="button"
            onClick={() => setShowSpellForm(true)}
            className="w-7 h-7 flex items-center justify-center rounded-full
                       bg-achtung-green/20 hover:bg-achtung-green/40
                       text-achtung-green-dark dark:text-achtung-green-light
                       transition-colors"
            title="Adicionar magia"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <SectionHeader>Poder</SectionHeader>
          <input
            type="text"
            value={character.power || ''}
            onChange={e => updateField('power', e.target.value)}
            className="w-20 bg-transparent border-2 border-achtung-green-dark dark:border-achtung-green
                       rounded px-2 py-1 text-center text-lg font-bold outline-none
                       focus:border-achtung-green-light transition-colors"
          />
        </div>
      </div>

      {spells.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-600">
          Nenhuma magia adicionada.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-start">
          {spells.map((spell) => (
            <SpellCard
              key={spell._idx}
              spell={spell}
              expanded={expandedSpell === spell._idx}
              onToggle={() => setExpandedSpell(expandedSpell === spell._idx ? null : spell._idx)}
              onSendChat={() => sendSpellToChat(spell)}
              onRollCost={() => rollSpellCost(spell)}
              onEdit={() => setEditingSpellIdx(spell._idx)}
              onDelete={() => deleteSpell(spell._idx)}
            />
          ))}
        </div>
      )}

      {/* Popups */}
      {showSpellForm && (
        <SpellFormPopup
          spell={null}
          onSave={addSpell}
          onClose={() => setShowSpellForm(false)}
        />
      )}

      {editingSpellIdx !== null && (character.spells || [])[editingSpellIdx] && (
        <SpellFormPopup
          spell={character.spells[editingSpellIdx]}
          onSave={(s) => updateSpell(editingSpellIdx, s)}
          onClose={() => setEditingSpellIdx(null)}
        />
      )}
    </div>
  )
}
