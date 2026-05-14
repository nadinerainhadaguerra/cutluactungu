import { useState, useEffect } from 'react'
import { storage } from '../services/storage'
import { parseDiceExpression, rollChallengeDice } from '../utils/diceRoller'
import { useSelection } from '../contexts/SelectionContext'
import { useMasterSettings } from '../contexts/MasterSettingsContext'
import { MAGIAS } from '../utils/bookData'
import { ATTRIBUTES, SKILLS_DATA } from '../utils/characterTemplate'

const CONJURADOR_TIPOS = [
  { id: 'tradicional', label: 'Tradicional', base: 2, attrId: 'discernment', attrLabel: 'Discernimento' },
  { id: 'pesquisador',  label: 'Pesquisador',  base: 2, attrId: 'reason',       attrLabel: 'Razão' },
  { id: 'amador',       label: 'Amador',        base: 1, attrId: 'will',         attrLabel: 'Vontade' },
]

// Extra ◆ de Poder por graduação do atributo (tabela p.142 — Poder Extra)
function gradToExtraPoder(grad) {
  const g = parseInt(grad) || 0
  if (g >= 16) return 5
  if (g >= 14) return 4
  if (g >= 12) return 3
  if (g >= 10) return 2
  if (g >= 9)  return 1
  return 0
}

function calcPoder(conjuradorType, attributes) {
  const config = CONJURADOR_TIPOS.find(t => t.id === conjuradorType)
  if (!config) return null
  const grad = attributes?.[config.attrId]?.graduation
  return config.base + gradToExtraPoder(grad)
}

const SKILL_NAMES = {
  academia: 'Academia', atletismo: 'Atletismo', combater: 'Combater',
  engenharia: 'Engenharia', furtividade: 'Furtividade', medicina: 'Medicina',
  observar: 'Observar', persuasao: 'Persuasão', resiliencia: 'Resiliência',
  sobrevivencia: 'Sobrevivência', taticas: 'Táticas', veiculos: 'Veículos',
}

// Mapa inverso: nome em PT → id da perícia
const SKILL_NAME_TO_ID = Object.fromEntries(
  SKILLS_DATA.map(s => [s.name.charAt(0) + s.name.slice(1).toLowerCase(), s.id])
    .concat(Object.entries(SKILL_NAMES).map(([id, name]) => [name, id]))
)

function SectionHeader({ children }) {
  return (
    <div className="inline-block">
      <div className="section-header">{children}</div>
    </div>
  )
}

/* ── Official Spells Catalog Popup ── */
const ALL_TRADITIONS = ['Celta', 'Rúnico', 'Psíquico']

function OfficialSpellsPopup({ onAdd, onClose, availableTraditions }) {
  const [tab, setTab] = useState(availableTraditions[0] || 'Celta')
  const [search, setSearch] = useState('')

  const filtered = MAGIAS.filter(m =>
    m.tradicao === tab &&
    (!search || m.nome.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh]
                      flex flex-col border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl shrink-0">
          <span className="font-gothic text-xl">Catálogo de Magias</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs + Search */}
        <div className="px-4 pt-3 pb-2 border-b border-achtung-green/10 space-y-2 shrink-0">
          <div className="flex gap-1">
            {availableTraditions.map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setSearch('') }}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors
                  ${tab === t
                    ? 'bg-achtung-green text-white'
                    : 'bg-achtung-green/10 text-achtung-green-dark dark:text-achtung-green-light hover:bg-achtung-green/20'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Buscar em ${tab}...`}
            className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                       dark:border-achtung-green/20 bg-white dark:bg-gray-800
                       text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-achtung-green"
          />
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 p-3 space-y-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">Nenhuma magia encontrada.</p>
          ) : (
            filtered.map(m => (
              <div key={m.id}
                   className="flex items-start gap-3 p-3 rounded-xl border border-achtung-green/20
                              bg-gray-50 dark:bg-gray-800/60 hover:border-achtung-green/40 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold text-achtung-green-dark dark:text-achtung-green-light">
                      {m.nome}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-achtung-green/10
                                     text-achtung-green-dark dark:text-achtung-green-light border border-achtung-green/20">
                      {SKILL_NAMES[m.pericia] || m.pericia}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{m.dificuldade}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">
                    Custo: {m.custo} · Duração: {m.duracao}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">{m.efeito}</p>
                  {m.imperfeito && (
                    <p className="text-[10px] text-orange-600 dark:text-orange-400 mt-1 leading-relaxed">
                      Imperfeito: {m.imperfeito}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onAdd({
                    name: m.nome,
                    skill: SKILL_NAMES[m.pericia] || m.pericia,
                    difficulty: m.dificuldade,
                    cost: m.custo,
                    duration: m.duracao,
                    effect: m.efeito,
                    momentum: m.impeto || '',
                  })}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold
                             bg-achtung-green/20 hover:bg-achtung-green/40
                             text-achtung-green-dark dark:text-achtung-green-light transition-colors"
                >
                  Adicionar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
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

/* ── Spell Test Popup ── */
export function SpellTestPopup({ spell, character, characterName, onClose }) {
  const skillId = SKILL_NAME_TO_ID[spell.skill] || null
  const skillData = SKILLS_DATA.find(s => s.id === skillId)
  const skillGrad = parseInt(character.skills?.[skillId]?.graduation) || 0
  const skillFocuses = character.skills?.[skillId]?.focuses || []

  const [selectedAttrId, setSelectedAttrId] = useState('')
  const [purchasedDice, setPurchasedDice] = useState(0)
  const [selectedTruths, setSelectedTruths] = useState([])
  const [selectedFocus, setSelectedFocus] = useState('nenhum')
  const [rollResults, setRollResults] = useState(null)
  const [error, setError] = useState('')
  const [momentum, setMomentum] = useState(0)
  const [useFortune, setUseFortune] = useState(false)
  const mestre = character?.mestre || ''

  useEffect(() => {
    if (!mestre) return
    const unsub = storage.onMomentumChangedForMaster(mestre, setMomentum)
    return () => unsub()
  }, [mestre])

  const truths = (character?.personalTruths || []).filter(t => t.trim())
  const fortune = parseInt(character?.fortune) || 0

  const attrValue = parseInt(character.attributes?.[selectedAttrId]?.graduation) || 0
  const target = attrValue + skillGrad
  const totalDice = 2 + purchasedDice + selectedTruths.length
  const canRoll = !!selectedAttrId

  const toggleTruth = (truth) =>
    setSelectedTruths(prev =>
      prev.includes(truth) ? prev.filter(t => t !== truth) : [...prev, truth]
    )

  const handleRoll = async () => {
    setError('')
    if (!canRoll) { setError('Selecione um atributo.'); return }
    if (useFortune && fortune <= 0) { setError('Fortuna insuficiente!'); return }
    const momentumCost = purchasedDice * (purchasedDice + 1) / 2
    if (momentumCost > momentum) {
      setError(`Ímpeto insuficiente! Disponível: ${momentum}, necessário: ${momentumCost}.`)
      return
    }
    if (purchasedDice > 0 && mestre) storage.setMomentumForMaster(mestre, momentum - momentumCost)
    if (useFortune) await storage.spendFortune(characterName)

    const dice = []
    for (let i = 0; i < totalDice; i++) {
      const value = (useFortune && i === 0) ? 1 : Math.floor(Math.random() * 20) + 1
      dice.push({ value, success: value === 1 || value <= target })
    }

    const hasFocus = selectedFocus !== 'nenhum'
    const criticals = dice.filter(d => d.value === 1).length
    const normalSuccesses = dice.filter(d => d.success && d.value !== 1).length
    const totalSuccesses = hasFocus
      ? normalSuccesses * 2 + criticals * 3
      : normalSuccesses + criticals * 2
    const totalComplications = dice.filter(d => d.value === 20).length

    const attrName = ATTRIBUTES.find(a => a.id === selectedAttrId)?.name || selectedAttrId
    const rollData = {
      attribute: { name: attrName, value: attrValue },
      skill: { name: spell.skill || skillId, graduation: skillGrad },
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
    await storage.saveMessage({
      id: Date.now().toString(),
      sender: characterName || 'Sistema',
      type: 'system_roll',
      content: `✨ ${spell.name} — ${attrName} + ${spell.skill || skillId} (alvo ${target})`,
      rollData: null,
      systemRollData: rollData,
      timestamp: new Date().toISOString(),
    })
    if (totalComplications > 0 && mestre) await storage.addComplicationsForMaster(mestre, totalComplications)
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
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh]
                      overflow-y-auto border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <span className="font-gothic text-xl">Conjurar: {spell.name}</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Info da perícia */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-lg bg-achtung-green/15 text-sm font-semibold
                             text-achtung-green-dark dark:text-achtung-green-light">
              {spell.skill || '—'}: {skillGrad}
            </span>
            {spell.difficulty && (
              <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
                {spell.difficulty}
              </span>
            )}
          </div>

          {/* Seletor de atributo */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Atributo
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {ATTRIBUTES.map(attr => {
                const val = parseInt(character.attributes?.[attr.id]?.graduation) || 0
                const isSelected = selectedAttrId === attr.id
                return (
                  <button
                    key={attr.id}
                    type="button"
                    onClick={() => setSelectedAttrId(isSelected ? '' : attr.id)}
                    className={`px-2 py-2 rounded-lg text-xs font-semibold transition-all
                      ${isSelected
                        ? 'bg-achtung-green text-white shadow-md scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                  >
                    <div>{attr.name}</div>
                    <div className={`text-base font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                      {val}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Alvo calculado */}
          {selectedAttrId && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg bg-achtung-green/15 text-sm font-semibold
                               text-achtung-green-dark dark:text-achtung-green-light">
                {ATTRIBUTES.find(a => a.id === selectedAttrId)?.name}: {attrValue}
              </span>
              <span className="text-gray-400 font-bold">+</span>
              <span className="px-3 py-1 rounded-lg bg-achtung-green/15 text-sm font-semibold
                               text-achtung-green-dark dark:text-achtung-green-light">
                {spell.skill}: {skillGrad}
              </span>
              <span className="text-gray-400 font-bold">=</span>
              <span className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-lg font-bold">
                Alvo: {target}
              </span>
            </div>
          )}

          {!rollResults && (
            <>
              {/* Comprar d20s */}
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
                      type="button"
                      onClick={() => setPurchasedDice(n)}
                      className={`w-10 h-10 rounded-lg font-bold text-sm transition-all
                        ${purchasedDice === n
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
                      -{purchasedDice * (purchasedDice + 1) / 2} ímpeto
                    </span>
                  )}
                </div>
              </div>

              {/* Usar Verdades */}
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

              {/* Usar Foco */}
              {skillFocuses.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Usar Foco <span className="font-normal text-xs text-gray-500">(cada sucesso conta como 2)</span>
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
                    {skillFocuses.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Resumo */}
              <div className="text-center py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total de dados: <span className="font-bold text-lg">{totalDice}d20</span>
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  (2 base{purchasedDice > 0 ? ` + ${purchasedDice} comprados` : ''}
                  {selectedTruths.length > 0 ? ` + ${selectedTruths.length} verdades` : ''})
                </span>
              </div>

              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <button
                onClick={handleRoll}
                disabled={!canRoll}
                className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg
                  ${canRoll
                    ? 'bg-achtung-green hover:bg-achtung-green-dark text-white hover:shadow-xl active:scale-[0.98]'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Conjurar
              </button>
            </>
          )}

          {rollResults && (
            <div className="space-y-3">
              <div className="py-3 px-4 rounded-lg bg-achtung-green/10 border border-achtung-green/20 text-center">
                <p className="text-sm font-semibold text-achtung-green-dark dark:text-achtung-green-light">
                  Resultado enviado ao chat ✨
                </p>
              </div>
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

/* ── Spell Card ── */
function SpellCard({ spell, expanded, onToggle, onSendChat, onRollCost, onRollDamage, onRollTest, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-achtung-green/20 bg-gray-50 dark:bg-gray-800/60
                    hover:border-achtung-green/40 transition-colors overflow-hidden">
      {/* Linha 1: nome + seta */}
      <div className="flex items-center gap-2 px-3 pt-2 pb-1 cursor-pointer" onClick={onToggle}>
        <span className="text-sm font-semibold text-achtung-green-dark dark:text-achtung-green-light flex-1 min-w-0">
          {spell.name}
        </span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${expanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {/* Linha 2: botões */}
      <div className="flex items-center gap-1 px-3 pb-2">
          {/* Roll test */}
          <button type="button" onClick={e => { e.stopPropagation(); onRollTest() }}
            className="w-6 h-6 flex items-center justify-center rounded
                       hover:bg-blue-500/20 text-blue-500 dark:text-blue-400
                       transition-colors" title="Rolar Teste de Conjuração (2d20)">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          {/* Roll cost */}
          <button type="button" onClick={e => { e.stopPropagation(); onRollCost() }}
            className="w-6 h-6 flex items-center justify-center rounded
                       hover:bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green
                       transition-colors" title="Rolar Custo da Magia">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </button>
          {/* Roll damage */}
          <button type="button" onClick={e => { e.stopPropagation(); onRollDamage() }}
            className="w-6 h-6 flex items-center justify-center rounded
                       hover:bg-purple-500/20 text-purple-500 dark:text-purple-400
                       transition-colors" title="Rolar Dano (Poder ◆)">
            <img src="/iconed6.png" alt="d6" className="w-4 h-4 object-contain opacity-80" />
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
function isConjurador(character) {
  const archetypeIsOcultista = character.archetype === 'Ocultista'
  const hasConjuradorTalent = (character.talents || []).some(t =>
    (t.keyword || '').split(',').map(k => k.trim()).includes('Conjurador')
  )
  return archetypeIsOcultista || hasConjuradorTalent
}

export default function SheetPage3({ character, updateField, updateCharacter, isMaster = false }) {
  const [showSpellForm, setShowSpellForm] = useState(false)
  const [editingSpellIdx, setEditingSpellIdx] = useState(null)
  const [expandedSpell, setExpandedSpell] = useState(null)
  const [showSpellCatalog, setShowSpellCatalog] = useState(false)
  const [spellTestIdx, setSpellTestIdx] = useState(null)
  const { activeCharacterName } = useSelection()
  const { settings } = useMasterSettings()

  const conjurador = isConjurador(character)
  const poderCalculado = conjurador ? calcPoder(character.conjuradorType, character.attributes) : null
  const masterSpellTraditions = character.masterPermissions?.spellTraditions || []
  // Available traditions: all 3 if conjurador, otherwise only master-granted
  const availableTraditions = conjurador
    ? ALL_TRADITIONS
    : masterSpellTraditions.length > 0
      ? masterSpellTraditions
      : []
  const canAccessSpells = availableTraditions.length > 0

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
    const message = {
      id: Date.now().toString(),
      sender: activeCharacterName || 'Sistema',
      type: 'item_ref',
      content: spell.name,
      itemRef: {
        type: 'spell',
        name: spell.name,
        skill: spell.skill || '',
        difficulty: spell.difficulty || '',
        cost: spell.cost || '',
        duration: spell.duration || '',
        effect: spell.effect || '',
        momentum: spell.momentum || '',
      },
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

  const rollSpellDamage = async (spell) => {
    const manualPower = parseInt(character.power, 10)
    let n
    if (manualPower > 0) {
      n = manualPower
    } else if (settings.poderDaMagia) {
      n = poderCalculado || 0
    } else {
      const config = CONJURADOR_TIPOS.find(t => t.id === character.conjuradorType)
      n = config ? config.base : 0
    }
    if (!n || n < 1) {
      await storage.saveMessage({
        id: Date.now().toString(),
        sender: activeCharacterName || 'Sistema',
        type: 'message',
        content: `✨ ${spell.name} — Poder não definido, não é possível rolar dano.`,
        rollData: null, systemRollData: null,
        timestamp: new Date().toISOString(),
      })
      return
    }
    const result = rollChallengeDice(n)
    await storage.saveMessage({
      id: Date.now().toString(),
      sender: activeCharacterName || 'Sistema',
      type: 'challenge_dice',
      content: `✨ ${spell.name} — Dano`,
      rollData: null, systemRollData: null,
      challengeData: {
        weaponName: `✨ ${spell.name}`,
        ...result,
        efeito: null,
        barragem: null,
      },
      timestamp: new Date().toISOString(),
    })
  }

  const spells = (character.spells || [])
    .map((s, i) => ({ ...s, _idx: i }))
    .filter(s => s.name && s.name.trim())

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SectionHeader>Magias</SectionHeader>
          {canAccessSpells && (
            <>
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
              <button
                type="button"
                onClick={() => setShowSpellCatalog(true)}
                className="px-2.5 h-7 flex items-center gap-1 rounded-full text-xs font-semibold
                           bg-orange-400/20 hover:bg-orange-400/40
                           text-orange-700 dark:text-orange-300
                           border border-orange-400/30 transition-colors"
                title="Catálogo de magias oficiais"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Oficiais
              </button>
              {!conjurador && masterSpellTraditions.length > 0 && (
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">★ Mestre</span>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {conjurador && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">Tipo:</span>
              <select
                value={character.conjuradorType || ''}
                onChange={e => updateField('conjuradorType', e.target.value)}
                className="text-xs px-2 py-1 rounded border-2 border-achtung-green/30 dark:border-achtung-green/20
                           bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none
                           focus:border-achtung-green transition-colors"
              >
                <option value="">— tipo —</option>
                {CONJURADOR_TIPOS.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <SectionHeader>Poder</SectionHeader>
              <input
                type="text"
                value={character.power || ''}
                onChange={e => updateField('power', e.target.value)}
                placeholder={poderCalculado !== null ? String(poderCalculado) : ''}
                className="w-14 bg-transparent border-2 border-achtung-green-dark dark:border-achtung-green
                           rounded px-2 py-1 text-center text-lg font-bold outline-none
                           focus:border-achtung-green-light transition-colors"
              />
            </div>
            {settings.poderDaMagia && conjurador && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg
                              bg-purple-500/10 border border-purple-500/30">
                <span className="text-[10px] font-semibold text-purple-500 dark:text-purple-400 uppercase tracking-wide">
                  Auto:
                </span>
                {poderCalculado !== null ? (
                  <>
                    <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
                      {poderCalculado} ◆
                    </span>
                    {character.conjuradorType && (
                      <span className="text-[10px] text-purple-500/70 dark:text-purple-400/70">
                        ({CONJURADOR_TIPOS.find(t => t.id === character.conjuradorType)?.attrLabel})
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-[10px] text-purple-400 dark:text-purple-500 italic">
                    selecione o tipo
                  </span>
                )}
              </div>
            )}
            {!settings.poderDaMagia && poderCalculado !== null && (
              <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-1">
                Calculado: {poderCalculado} ◆
                {character.conjuradorType && ` (${CONJURADOR_TIPOS.find(t => t.id === character.conjuradorType)?.attrLabel})`}
              </span>
            )}
          </div>
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
              onRollDamage={() => rollSpellDamage(spell)}
              onRollTest={() => setSpellTestIdx(spell._idx)}
              onEdit={() => setEditingSpellIdx(spell._idx)}
              onDelete={() => deleteSpell(spell._idx)}
            />
          ))}
        </div>
      )}

      {/* Popups */}
      {showSpellCatalog && (
        <OfficialSpellsPopup
          onAdd={(s) => { addSpell(s) }}
          onClose={() => setShowSpellCatalog(false)}
          availableTraditions={availableTraditions}
        />
      )}

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

      {spellTestIdx !== null && (character.spells || [])[spellTestIdx] && (
        <SpellTestPopup
          spell={character.spells[spellTestIdx]}
          character={character}
          characterName={activeCharacterName}
          onClose={() => setSpellTestIdx(null)}
        />
      )}
    </div>
  )
}
