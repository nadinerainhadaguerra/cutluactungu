import { useState } from 'react'
import { storage } from '../services/storage'
import { parseDiceExpression, rollChallengeDice } from '../utils/diceRoller'
import { useSelection } from '../contexts/SelectionContext'
import { TALENTOS, ARMAS, ARQUETIPOS, ANTECEDENTES, CARACTERISTICAS } from '../utils/bookData'

function SectionHeader({ children }) {
  return (
    <div className="inline-block">
      <div className="section-header">{children}</div>
    </div>
  )
}

/* ── Official Talents Catalog Popup ── */
function TalentRow({ t, onAdd, badge }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-achtung-green/20
                    bg-gray-50 dark:bg-gray-800/60 hover:border-achtung-green/40 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-achtung-green-dark dark:text-achtung-green-light">
            {t.nome}
          </span>
          {badge && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40
                             text-amber-700 dark:text-amber-300 border border-amber-300/50 font-semibold">
              {badge}
            </span>
          )}
          {t.avancado && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/40
                             text-orange-700 dark:text-orange-300 border border-orange-300/50 font-semibold">
              Avançado
            </span>
          )}
          {(t.palavrasChave || []).map(kw => (
            <span key={kw} className="text-[10px] px-1.5 py-0.5 rounded-full
                                       bg-achtung-green/10 text-achtung-green-dark dark:text-achtung-green-light
                                       border border-achtung-green/20">
              {kw}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{t.efeito}</p>
      </div>
      <button
        onClick={() => onAdd({ name: t.nome, keyword: (t.palavrasChave || []).join(', '), effect: t.efeito })}
        className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold
                   bg-achtung-green/20 hover:bg-achtung-green/40
                   text-achtung-green-dark dark:text-achtung-green-light transition-colors"
      >
        Adicionar
      </button>
    </div>
  )
}

function OfficialTalentsPopup({ character, onAdd, onClose }) {
  const [search, setSearch] = useState('')
  const [selectedKw, setSelectedKw] = useState('')

  // Resolve character context objects
  const archetypeObj = ARQUETIPOS.find(a => a.nome === character.archetype)
  const backgroundObj = ANTECEDENTES.find(b => b.nome === character.background)
  const characteristicObj = CARACTERISTICAS.find(c => c.nome === character.characteristic)
  const masterExtras = (character.masterPermissions?.extraTalentKeywords) || []

  // Build eligible keyword set
  const eligibleKeywords = new Set()
  if (archetypeObj) eligibleKeywords.add(archetypeObj.nome)
  if (backgroundObj?.palavraChaveTalento) eligibleKeywords.add(backgroundObj.palavraChaveTalento)
  if (characteristicObj?.palavrasChaveTalento) {
    characteristicObj.palavrasChaveTalento.forEach(kw => eligibleKeywords.add(kw))
  }
  masterExtras.forEach(kw => eligibleKeywords.add(kw))

  // Archetype's exclusive talents (sub-array in ARQUETIPOS)
  const archetypeTalents = archetypeObj?.talentos || []

  // Global eligible talents: generic (empty kw) OR matching eligible keywords
  const eligibleGlobal = TALENTOS.filter(t => {
    const isEligible = t.palavrasChave.length === 0 || t.palavrasChave.some(kw => eligibleKeywords.has(kw))
    if (!isEligible) return false
    const matchSearch = !search ||
      t.nome.toLowerCase().includes(search.toLowerCase()) ||
      t.efeito.toLowerCase().includes(search.toLowerCase())
    const matchKw = !selectedKw || t.palavrasChave.includes(selectedKw)
    return matchSearch && matchKw
  })

  const filteredArchetypeTalents = archetypeTalents.filter(t =>
    !search ||
    t.nome.toLowerCase().includes(search.toLowerCase()) ||
    t.efeito.toLowerCase().includes(search.toLowerCase())
  )

  // Keyword chips: only keywords the character has access to
  const kwChips = [...eligibleKeywords].filter(kw =>
    TALENTOS.some(t => t.palavrasChave.includes(kw))
  ).sort()

  const hasMasterExtras = masterExtras.length > 0

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh]
                      flex flex-col border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl shrink-0">
          <span className="font-gothic text-xl">Catálogo de Talentos</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search + keyword chips */}
        <div className="px-4 py-3 border-b border-achtung-green/10 space-y-2 shrink-0">
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setSelectedKw('') }}
            placeholder="Buscar talento..."
            className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                       dark:border-achtung-green/20 bg-white dark:bg-gray-800
                       text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-achtung-green"
          />
          {kwChips.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedKw('')}
                className={`text-xs px-2 py-0.5 rounded-full border transition-colors
                  ${!selectedKw
                    ? 'bg-achtung-green text-white border-achtung-green'
                    : 'border-achtung-green/30 text-gray-600 dark:text-gray-300 hover:bg-achtung-green/10'}`}
              >
                Todos
              </button>
              {kwChips.map(kw => (
                <button key={kw}
                  onClick={() => setSelectedKw(selectedKw === kw ? '' : kw)}
                  className={`text-xs px-2 py-0.5 rounded-full border transition-colors
                    ${selectedKw === kw
                      ? 'bg-achtung-green text-white border-achtung-green'
                      : `border-achtung-green/30 hover:bg-achtung-green/10
                         ${masterExtras.includes(kw)
                           ? 'text-amber-600 dark:text-amber-400 border-amber-400/40'
                           : 'text-gray-600 dark:text-gray-300'}`}`}
                >
                  {kw}{masterExtras.includes(kw) ? ' ★' : ''}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 p-3 space-y-4">
          {/* Archetype exclusive section */}
          {filteredArchetypeTalents.length > 0 && !selectedKw && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-achtung-green-dark
                            dark:text-achtung-green-light mb-2 px-1">
                Talentos de {character.archetype || 'Arquétipo'}
              </p>
              <div className="space-y-2">
                {filteredArchetypeTalents.map((t, i) => (
                  <TalentRow key={`arch-${i}`} t={t} onAdd={onAdd} badge="Do Arquétipo" />
                ))}
              </div>
            </div>
          )}

          {/* Global eligible talents */}
          {eligibleGlobal.length > 0 && (
            <div>
              {filteredArchetypeTalents.length > 0 && !selectedKw && (
                <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500
                              dark:text-gray-400 mb-2 px-1">
                  Talentos Gerais & Palavra-Chave
                </p>
              )}
              <div className="space-y-2">
                {eligibleGlobal.map(t => (
                  <TalentRow key={t.id} t={t} onAdd={onAdd}
                    badge={hasMasterExtras && t.palavrasChave.some(kw => masterExtras.includes(kw)) ? '★ Mestre' : null}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredArchetypeTalents.length === 0 && eligibleGlobal.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
              Nenhum talento encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Official Weapons Catalog Popup ── */
function OfficialWeaponsPopup({ onAdd, onClose }) {
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState('')
  const [selectedOrigin, setSelectedOrigin] = useState('')

  const categorias = [...new Set(ARMAS.map(w => w.categoria))].sort()

  const filtered = ARMAS.filter(w => {
    const matchSearch = !search ||
      w.nome.toLowerCase().includes(search.toLowerCase()) ||
      (w.foco || '').toLowerCase().includes(search.toLowerCase()) ||
      (w.efeito || '').toLowerCase().includes(search.toLowerCase()) ||
      (w.qualidades || '').toLowerCase().includes(search.toLowerCase())
    const matchCat = !selectedCat || w.categoria === selectedCat
    const matchOrigin = !selectedOrigin || w.origem === selectedOrigin
    return matchSearch && matchCat && matchOrigin
  })

  const handleAdd = (w) => {
    onAdd({
      name: w.nome,
      focus: w.foco || '',
      range: w.alcance || '',
      stress: w.estresse || '',
      effect: w.efeito || '',
      barrage: w.barragem || '',
      size: w.tamanho || '',
      qualities: w.qualidades || '',
      restriction: w.restricao || '',
      weight: '',
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh]
                      flex flex-col border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl shrink-0">
          <span className="font-gothic text-xl">Catálogo de Armas</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filters */}
        <div className="px-4 py-3 border-b border-achtung-green/10 space-y-2 shrink-0">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar arma..."
            className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                       dark:border-achtung-green/20 bg-white dark:bg-gray-800
                       text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-achtung-green"
          />
          {/* Origin filter */}
          <div className="flex gap-1.5 flex-wrap">
            {['', 'Aliada', 'Alemã'].map(o => (
              <button
                key={o}
                onClick={() => setSelectedOrigin(o)}
                className={`text-xs px-2 py-0.5 rounded-full border transition-colors
                  ${selectedOrigin === o
                    ? 'bg-achtung-green text-white border-achtung-green'
                    : 'border-achtung-green/30 text-gray-600 dark:text-gray-300 hover:bg-achtung-green/10'}`}
              >
                {o || 'Todas'}
              </button>
            ))}
          </div>
          {/* Category filter */}
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedCat('')}
              className={`text-xs px-2 py-0.5 rounded-full border transition-colors
                ${!selectedCat
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'border-orange-400/30 text-gray-600 dark:text-gray-300 hover:bg-orange-400/10'}`}
            >
              Todas
            </button>
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(selectedCat === cat ? '' : cat)}
                className={`text-xs px-2 py-0.5 rounded-full border transition-colors
                  ${selectedCat === cat
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'border-orange-400/30 text-gray-600 dark:text-gray-300 hover:bg-orange-400/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 p-3 space-y-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">Nenhuma arma encontrada.</p>
          ) : (
            filtered.map(w => (
              <div key={w.id}
                   className="flex items-start gap-3 p-3 rounded-xl border border-achtung-green/20
                              bg-gray-50 dark:bg-gray-800/60 hover:border-achtung-green/40 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold text-achtung-green-dark dark:text-achtung-green-light">
                      {w.nome}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold
                      ${w.origem === 'Aliada'
                        ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300/50'
                        : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-300/50'}`}>
                      {w.origem}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700
                                     text-gray-600 dark:text-gray-300 border border-gray-300/50">
                      {w.categoria}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-0.5 text-xs text-gray-600 dark:text-gray-300">
                    {w.foco && <span><b>Foco:</b> {w.foco}</span>}
                    {w.alcance && <span><b>Alcance:</b> {w.alcance}</span>}
                    {w.estresse && (
                      <span className="flex items-center gap-0.5">
                        <b>Estresse:</b> {w.estresse}
                        <img src="/iconed6.png" alt="d6" className="w-3.5 h-3.5 object-contain inline" />
                      </span>
                    )}
                    {w.efeito && <span><b>Efeito:</b> {w.efeito}</span>}
                    {w.barragem && <span><b>Barragem:</b> {w.barragem}</span>}
                    {w.tamanho && <span><b>Tamanho:</b> {w.tamanho}</span>}
                    {w.qualidades && <span><b>Qualidades:</b> {w.qualidades}</span>}
                    {w.restricao && w.restricao !== '—' && <span><b>Restrição:</b> {w.restricao}</span>}
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(w)}
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

/* ── Talent Form Popup ── */
function TalentFormPopup({ talent, onSave, onClose }) {
  const [form, setForm] = useState(talent || { name: '', keyword: '', effect: '' })
  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = () => {
    if (!form.name.trim()) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
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
    stress: '', effect: '', barrage: '', size: '', qualities: '', restriction: '', weight: '',
  })

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const fields = [
    { key: 'imageUrl', label: 'URL da Arma', placeholder: 'https://...' },
    { key: 'name', label: 'Nome', placeholder: 'Nome da arma' },
    { key: 'focus', label: 'Foco', placeholder: 'Tipo de arma' },
    { key: 'range', label: 'Alcance', placeholder: 'Alcance' },
    { key: 'stress', label: 'Estresse', placeholder: 'Número de dados (ex: 4)' },
    { key: 'effect', label: 'Efeito', placeholder: 'Ex: Feroz, Perfurante 1' },
    { key: 'barrage', label: 'Barragem', placeholder: 'Barragem' },
    { key: 'size', label: 'Tamanho', placeholder: 'Tamanho' },
    { key: 'qualities', label: 'Qualidades', placeholder: 'Ex: Ocultável, Sutil' },
    { key: 'restriction', label: 'Nível de Restrição', placeholder: 'Nível de restrição' },
    { key: 'weight', label: 'Peso (kg)', placeholder: 'Ex: 3.5' },
  ]

  const handleSubmit = () => {
    if (!form.name.trim()) return
    onSave(form)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
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

function WeaponDetailPopup({ weapon, onClose, onDelete, onRollDamage }) {
  const stressN = parseInt(weapon.stress, 10)
  const otherFields = [
    { label: 'Foco', value: weapon.focus },
    { label: 'Alcance', value: weapon.range },
    { label: 'Efeito', value: weapon.effect },
    { label: 'Barragem', value: weapon.barrage },
    { label: 'Tamanho', value: weapon.size },
    { label: 'Qualidades', value: weapon.qualities },
    { label: 'Nível de Restrição', value: weapon.restriction },
    { label: 'Peso (kg)', value: weapon.weight },
  ]

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
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

          {/* Estresse destacado com ícone d6 */}
          {stressN > 0 && (
            <div className="flex items-center justify-between mb-3 p-2 rounded-lg
                            bg-red-500/10 border border-red-500/30">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Estresse:</span>
              <div className="flex items-center gap-1">
                <span className="text-base font-bold text-red-700 dark:text-red-300">{stressN}</span>
                <img src="/iconed6.png" alt="d6" className="w-5 h-5 object-contain" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            {otherFields.map(f => f.value ? (
              <div key={f.label} className="flex justify-between text-sm">
                <span className="font-semibold text-gray-600 dark:text-gray-400">{f.label}:</span>
                <span className="text-gray-900 dark:text-gray-100 text-right ml-2">{f.value}</span>
              </div>
            ) : null)}
          </div>

          {/* Rolar Dano */}
          {stressN > 0 && (
            <button
              onClick={() => { onRollDamage(); onClose() }}
              className="w-full mt-4 py-2.5 rounded-xl font-bold text-sm
                         bg-red-500/20 hover:bg-red-500/40 text-red-700 dark:text-red-300
                         border border-red-500/40 transition-colors flex items-center justify-center gap-2"
            >
              Rolar Dano — {stressN}
              <img src="/iconed6.png" alt="d6" className="w-4 h-4 object-contain" />
            </button>
          )}

          <button
            onClick={() => { onDelete(); onClose() }}
            className="w-full mt-2 py-2 rounded-xl font-semibold text-sm
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

function WeaponCard({ weapon, onClickName, onClickImage, onRollDamage, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false)
  const imgSrc = (!weapon.imageUrl || imgError) ? '/armadefault.png' : weapon.imageUrl
  const stressN = parseInt(weapon.stress, 10)

  return (
    <div className="relative flex flex-col items-center gap-1.5 p-2 rounded-xl
                    bg-gray-50 dark:bg-gray-800/60 border border-achtung-green/20
                    hover:border-achtung-green/40 transition-colors w-28 sm:w-32 group">
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

      {/* Weapon image — click to see details */}
      <button type="button" onClick={onClickImage}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700
                   hover:ring-2 hover:ring-achtung-green transition-all cursor-pointer
                   active:scale-95 flex items-center justify-center"
        title="Ver detalhes da arma">
        <img src={imgSrc} alt={weapon.name} className="w-full h-full object-contain"
          onError={() => setImgError(true)} />
      </button>

      {/* Name */}
      <button type="button" onClick={onClickName}
        className="text-xs font-semibold text-center leading-tight
                   text-achtung-green-dark dark:text-achtung-green-light
                   hover:underline cursor-pointer truncate w-full"
        title="Ver detalhes">
        {weapon.name}
      </button>

      {/* Stress + Roll button */}
      {stressN > 0 && (
        <button type="button" onClick={onRollDamage}
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold
                     bg-red-500/20 hover:bg-red-500/40 border border-red-500/40
                     text-red-700 dark:text-red-300 transition-colors w-full justify-center"
          title="Rolar dano">
          <span>{stressN}</span>
          <img src="/iconed6.png" alt="d6" className="w-3.5 h-3.5 object-contain" />
          <span>Dano</span>
        </button>
      )}
    </div>
  )
}

/* ── Main Component ── */
export default function SheetPage2({ character, updateCharacter, isMaster = false }) {
  const [showWeaponForm, setShowWeaponForm] = useState(false)
  const [editingWeaponIdx, setEditingWeaponIdx] = useState(null)
  const [detailWeaponIdx, setDetailWeaponIdx] = useState(null)
  const [showTalentForm, setShowTalentForm] = useState(false)
  const [editingTalentIdx, setEditingTalentIdx] = useState(null)
  const [expandedTalents, setExpandedTalents] = useState(new Set())
  const [showTalentCatalog, setShowTalentCatalog] = useState(false)
  const [showWeaponCatalog, setShowWeaponCatalog] = useState(false)
  const { activeCharacterName } = useSelection()

  const updateBelonging = (index, value) => {
    updateCharacter(prev => {
      const belongings = [...prev.belongings]
      belongings[index] = value
      return { ...prev, belongings }
    })
  }

  const addContact = () => {
    updateCharacter(prev => ({
      ...prev,
      contacts: [...(prev.contacts || []), ''],
    }))
  }

  const updateContact = (index, value) => {
    updateCharacter(prev => {
      const contacts = [...(prev.contacts || [])]
      contacts[index] = value
      return { ...prev, contacts }
    })
  }

  const removeContact = (index) => {
    updateCharacter(prev => ({
      ...prev,
      contacts: (prev.contacts || []).filter((_, i) => i !== index),
    }))
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
    setExpandedTalents(prev => { const s = new Set(prev); s.delete(index); return s })
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
    const stressStr = weapon.stress || ''
    // Estresse é um número puro de Dados de Desafio (d6 especiais)
    const n = parseInt(stressStr, 10)
    if (!n || n < 1) {
      const message = {
        id: Date.now().toString(),
        sender: activeCharacterName || 'Sistema',
        type: 'message',
        content: `⚔ ${weapon.name} — sem estresse definido`,
        rollData: null,
        systemRollData: null,
        timestamp: new Date().toISOString(),
      }
      await storage.saveMessage(message)
      return
    }

    const result = rollChallengeDice(n)
    const message = {
      id: Date.now().toString(),
      sender: activeCharacterName || 'Sistema',
      type: 'challenge_dice',
      content: `⚔ ${weapon.name}`,
      rollData: null,
      systemRollData: null,
      challengeData: {
        weaponName: weapon.name,
        ...result,
        efeito: weapon.effect || null,
        barragem: weapon.barrage || null,
      },
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
          <button
            type="button"
            onClick={() => setShowTalentCatalog(true)}
            className="px-2.5 h-7 flex items-center gap-1 rounded-full text-xs font-semibold
                       bg-orange-400/20 hover:bg-orange-400/40
                       text-orange-700 dark:text-orange-300
                       border border-orange-400/30 transition-colors"
            title="Catálogo de talentos oficiais"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Oficiais
          </button>
        </div>

        {talents.length === 0 ? (
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-600">
            Nenhum talento adicionado.
          </p>
        ) : (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-start">
            {talents.map((talent) => (
              <TalentCard
                key={talent._idx}
                talent={talent}
                expanded={expandedTalents.has(talent._idx)}
                onToggle={() => setExpandedTalents(prev => { const s = new Set(prev); s.has(talent._idx) ? s.delete(talent._idx) : s.add(talent._idx); return s })}
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
          <button
            type="button"
            onClick={() => setShowWeaponCatalog(true)}
            className="px-2.5 h-7 flex items-center gap-1 rounded-full text-xs font-semibold
                       bg-orange-400/20 hover:bg-orange-400/40
                       text-orange-700 dark:text-orange-300
                       border border-orange-400/30 transition-colors"
            title="Catálogo de armas oficiais"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Oficiais
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
                onClickImage={() => setDetailWeaponIdx(weapon._idx)}
                onRollDamage={() => rollWeaponStress(weapon)}
                onEdit={() => setEditingWeaponIdx(weapon._idx)}
                onDelete={() => deleteWeapon(weapon._idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contatos */}
      <div>
        <div className="flex items-center gap-2">
          <SectionHeader>Contatos</SectionHeader>
          <button
            type="button"
            onClick={addContact}
            className="w-7 h-7 flex items-center justify-center rounded-full
                       bg-achtung-green/20 hover:bg-achtung-green/40
                       text-achtung-green-dark dark:text-achtung-green-light
                       transition-colors"
            title="Adicionar contato"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        {(character.contacts || []).length === 0 ? (
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-600">Nenhum contato adicionado.</p>
        ) : (
          <div className="mt-2 space-y-2">
            {(character.contacts || []).map((contact, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={contact}
                  onChange={e => updateContact(i, e.target.value)}
                  className="sheet-input text-sm flex-1"
                  placeholder={`Contato ${i + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeContact(i)}
                  className="w-7 h-7 flex items-center justify-center rounded
                             text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                             transition-colors shrink-0"
                  title="Remover contato"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
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
      {showTalentCatalog && (
        <OfficialTalentsPopup
          character={character}
          onAdd={(t) => { addTalent(t) }}
          onClose={() => setShowTalentCatalog(false)}
        />
      )}

      {showWeaponCatalog && (
        <OfficialWeaponsPopup
          onAdd={(w) => { addWeapon(w) }}
          onClose={() => setShowWeaponCatalog(false)}
        />
      )}

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
          onRollDamage={() => rollWeaponStress(allWeapons[detailWeaponIdx])}
        />
      )}
    </div>
  )
}
