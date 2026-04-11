import { useState, useEffect } from 'react'
import { ARQUETIPOS, ANTECEDENTES, CARACTERISTICAS, TALENTOS, MAGIAS, ITEMS_CATALOG, ARMAS } from '../utils/bookData'
import { ATTRIBUTES, SKILLS_DATA } from '../utils/characterTemplate'
import { NATIONALITIES } from '../utils/nationalities'

// ─── Step definitions ────────────────────────────────────────────────────────
const STEPS = [
  'arquetipo',
  'nacionalidade',
  'antecedente',
  'caracteristica',
  'pontos',
  'focos',
  'talentos',
  'magias',
  'verdades',
  'pertences',
  'confirmacao',
]

const STEP_LABELS = {
  arquetipo: 'Arquétipo',
  nacionalidade: 'Nacionalidade',
  antecedente: 'Antecedente',
  caracteristica: 'Característica',
  pontos: 'Distribuição de Pontos',
  focos: 'Focos',
  talentos: 'Talentos',
  magias: 'Magias',
  verdades: 'Verdades Pessoais',
  pertences: 'Pertences',
  confirmacao: 'Confirmação',
}

export const STEP_HIGHLIGHTS = {
  arquetipo: ['archetype', 'attributes', 'skills'],
  nacionalidade: ['nationality', 'languages'],
  antecedente: ['background', 'attributes', 'skills'],
  caracteristica: ['characteristic', 'attributes', 'skills'],
  pontos: ['attributes', 'skills'],
  focos: ['focuses'],
  talentos: [],
  magias: [],
  verdades: [],
  pertences: [],
  confirmacao: [],
}

// ─── Lookup helpers ──────────────────────────────────────────────────────────
const ATTR_NAMES = Object.fromEntries(ATTRIBUTES.map(a => [a.id, a.name]))
const SKILL_NAMES = Object.fromEntries(SKILLS_DATA.map(s => [s.id, s.name]))
const ALL_TRADITIONS = ['Celta', 'Rúnico', 'Psíquico']

// ─── Small shared sub-components ─────────────────────────────────────────────
function Tag({ children, color = 'green' }) {
  const colors = {
    green: 'bg-achtung-green/15 text-achtung-green-dark dark:text-achtung-green-light border border-achtung-green/30',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    gray: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium ${colors[color]}`}>
      {children}
    </span>
  )
}

function BonusRow({ label, bonusMap }) {
  const entries = Object.entries(bonusMap || {}).filter(([, v]) => v)
  if (!entries.length) return null
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">{label}</p>
      <div className="flex flex-wrap gap-1">
        {entries.map(([id, val]) => (
          <Tag key={id} color="blue">{ATTR_NAMES[id] || SKILL_NAMES[id] || id} +{val}</Tag>
        ))}
      </div>
    </div>
  )
}

// ─── Step 1: Arquétipo ────────────────────────────────────────────────────────
function StepArquetipo({ selectedArq, setSelectedArq, arcTalent, setArcTalent }) {
  return (
    <div className="flex gap-3 h-full min-h-0">
      {/* List */}
      <div className="w-40 shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-700 pr-2 space-y-0.5">
        {ARQUETIPOS.map(arq => (
          <button
            key={arq.id}
            onClick={() => { setSelectedArq(arq); setArcTalent(null) }}
            className={`w-full text-left px-2 py-2 rounded-lg text-sm transition-colors
              ${selectedArq?.id === arq.id
                ? 'bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light font-semibold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            {arq.nome}
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {!selectedArq ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic pt-4">
            Selecione um arquétipo para ver os detalhes.
          </p>
        ) : (
          <>
            <div>
              <h3 className="font-gothic text-xl text-achtung-green-dark dark:text-achtung-green-light">
                {selectedArq.nome}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                {selectedArq.descricao}
              </p>
            </div>

            <BonusRow label="Bônus de Atributos" bonusMap={selectedArq.atributosBonus} />
            <BonusRow label="Bônus de Perícias" bonusMap={selectedArq.periciasBonus} />

            <div>
              <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                Focos Disponíveis
              </p>
              <div className="flex flex-wrap gap-1">
                {selectedArq.focosPermitidos.map(sid => (
                  <Tag key={sid} color="purple">{SKILL_NAMES[sid] || sid}</Tag>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                Pertences
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{selectedArq.pertences}</p>
            </div>

            {/* Talent picker */}
            <div>
              <p className="text-xs font-semibold uppercase text-achtung-green-dark dark:text-achtung-green-light mb-2">
                Talento Exclusivo — Escolha 1
              </p>
              <div className="space-y-2">
                {selectedArq.talentos.map(t => (
                  <div
                    key={t.nome}
                    onClick={() => setArcTalent(t)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-colors
                      ${arcTalent?.nome === t.nome
                        ? 'border-achtung-green bg-achtung-green/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-achtung-green/40'}`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`mt-1 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                        ${arcTalent?.nome === t.nome ? 'border-achtung-green bg-achtung-green' : 'border-gray-400'}`}>
                        {arcTalent?.nome === t.nome && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{t.nome}</p>
                        <div className="flex flex-wrap gap-1 mt-0.5 mb-1">
                          {t.palavrasChave.map(kw => (
                            <Tag key={kw} color="gray">{kw}</Tag>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t.efeito}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Step 2: Nacionalidade ────────────────────────────────────────────────────
function StepNacionalidade({ selectedNat, setSelectedNat, nativeLanguage, setNativeLanguage }) {
  const handleSelectNat = (n) => {
    setSelectedNat(n)
    // Reset native language if new nationality doesn't have the previously chosen one
    setNativeLanguage(prev => n.languages.includes(prev) ? prev : '')
  }

  return (
    <div className="flex gap-3 h-full min-h-0">
      {/* List */}
      <div className="w-44 shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-700 pr-2 space-y-0.5">
        {NATIONALITIES.map(n => (
          <button
            key={n.name}
            onClick={() => handleSelectNat(n)}
            className={`w-full text-left px-2 py-2 rounded-lg text-sm transition-colors
              ${selectedNat?.name === n.name
                ? 'bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light font-semibold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            {n.name}
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {!selectedNat ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic pt-4">
            Selecione uma nacionalidade para ver os idiomas.
          </p>
        ) : (
          <>
            <h3 className="font-gothic text-xl text-achtung-green-dark dark:text-achtung-green-light">
              {selectedNat.name}
            </h3>
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                Idiomas adicionados automaticamente
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedNat.languages.map(lang => (
                  <Tag key={lang} color="green">{lang}</Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-2">
                Língua nativa <span className="text-red-400 normal-case font-normal">(obrigatório — vira uma verdade)</span>
              </p>
              <div className="flex flex-col gap-1.5">
                {selectedNat.languages.map(lang => (
                  <label
                    key={lang}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border cursor-pointer transition-colors
                      ${nativeLanguage === lang
                        ? 'border-achtung-green bg-achtung-green/10 text-achtung-green-dark dark:text-achtung-green-light'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                      ${nativeLanguage === lang ? 'border-achtung-green' : 'border-gray-300 dark:border-gray-600'}`}>
                      {nativeLanguage === lang && (
                        <div className="w-2 h-2 rounded-full bg-achtung-green" />
                      )}
                    </div>
                    <input
                      type="radio"
                      className="sr-only"
                      checked={nativeLanguage === lang}
                      onChange={() => setNativeLanguage(lang)}
                    />
                    <span className="text-sm">{lang}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Step 3: Antecedente ──────────────────────────────────────────────────────
function StepAntecedente({ selectedAnt, setSelectedAnt }) {
  return (
    <div className="flex gap-3 h-full min-h-0">
      {/* List */}
      <div className="w-40 shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-700 pr-2 space-y-0.5">
        {ANTECEDENTES.map(ant => (
          <button
            key={ant.id}
            onClick={() => setSelectedAnt(ant)}
            className={`w-full text-left px-2 py-2 rounded-lg text-sm transition-colors
              ${selectedAnt?.id === ant.id
                ? 'bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light font-semibold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            {ant.nome}
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {!selectedAnt ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic pt-4">
            Selecione um antecedente para ver os detalhes.
          </p>
        ) : (
          <>
            <div>
              <h3 className="font-gothic text-xl text-achtung-green-dark dark:text-achtung-green-light">
                {selectedAnt.nome}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                {selectedAnt.descricao}
              </p>
            </div>

            <BonusRow label="Bônus de Atributos" bonusMap={selectedAnt.atributosBonus} />
            <BonusRow label="Bônus de Perícias" bonusMap={selectedAnt.periciasBonus} />

            {selectedAnt.focoPrincipal && (
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                  Foco Obrigatório
                </p>
                <Tag color="purple">1 foco em {SKILL_NAMES[selectedAnt.focoPrincipal] || selectedAnt.focoPrincipal}</Tag>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                Palavra-chave de Talento
              </p>
              <Tag color="amber">{selectedAnt.palavraChaveTalento}</Tag>
            </div>

            {selectedAnt.verdadesSugeridas?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                  Verdades Sugeridas
                </p>
                <div className="flex flex-wrap gap-1">
                  {selectedAnt.verdadesSugeridas.map(v => (
                    <Tag key={v} color="gray">{v}</Tag>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                Pertences
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{selectedAnt.pertences}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Step 4: Característica ───────────────────────────────────────────────────
function StepCaracteristica({ selectedCar, setSelectedCar }) {
  return (
    <div className="flex gap-3 h-full min-h-0">
      {/* List */}
      <div className="w-44 shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-700 pr-2 space-y-0.5">
        {CARACTERISTICAS.map(car => (
          <button
            key={car.id}
            onClick={() => setSelectedCar(car)}
            className={`w-full text-left px-2 py-2 rounded-lg text-sm transition-colors
              ${selectedCar?.id === car.id
                ? 'bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light font-semibold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            {car.nome}
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {!selectedCar ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic pt-4">
            Selecione uma característica para ver os detalhes.
          </p>
        ) : (
          <>
            <div>
              <h3 className="font-gothic text-xl text-achtung-green-dark dark:text-achtung-green-light">
                {selectedCar.nome}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                {selectedCar.descricao}
              </p>
            </div>

            {Object.keys(selectedCar.atributosFixos || {}).length > 0 && (
              <BonusRow label="Atributos Fixos" bonusMap={selectedCar.atributosFixos} />
            )}

            {selectedCar.atributosLivres > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                  Pontos Livres de Atributo
                </p>
                <Tag color="blue">+{selectedCar.atributosLivres} ponto{selectedCar.atributosLivres > 1 ? 's' : ''} a distribuir</Tag>
              </div>
            )}

            {Object.keys(selectedCar.periciasFixas || {}).length > 0 && (
              <BonusRow label="Perícias Fixas" bonusMap={selectedCar.periciasFixas} />
            )}

            {selectedCar.periciasLivres > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                  Pontos Livres de Perícia
                </p>
                <Tag color="blue">+{selectedCar.periciasLivres} ponto{selectedCar.periciasLivres > 1 ? 's' : ''} a distribuir</Tag>
                {selectedCar.periciasEspecial && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    Restrição: não pode ser usado em Combater ou Táticas
                  </p>
                )}
              </div>
            )}

            {selectedCar.palavrasChaveTalento?.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                  Palavras-chave de Talento
                </p>
                <div className="flex flex-wrap gap-1">
                  {selectedCar.palavrasChaveTalento.map(kw => (
                    <Tag key={kw} color="amber">{kw}</Tag>
                  ))}
                </div>
              </div>
            )}

            {selectedCar.verdadeSugerida && (
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                  Verdade Sugerida
                </p>
                <Tag color="gray">{selectedCar.verdadeSugerida}</Tag>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 mb-1">
                Pertences
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{selectedCar.pertences}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Step 5: Distribuição de Pontos ──────────────────────────────────────────
function StepPontos({ selectedArq, selectedAnt, selectedCar, freeAttr, setFreeAttr, freeSkill, setFreeSkill }) {
  const totalFreeAttr = Object.values(freeAttr).reduce((a, b) => a + b, 0)
  const attrBudget = selectedCar?.atributosLivres || 0
  const totalFreeSkill = Object.values(freeSkill).reduce((a, b) => a + b, 0)
  const skillBudget = selectedCar?.periciasLivres || 0

  const computeAttrBase = (attrId) =>
    (selectedArq?.atributosBonus?.[attrId] || 0) +
    (selectedAnt?.atributosBonus?.[attrId] || 0) +
    (selectedCar?.atributosFixos?.[attrId] || 0)

  const computeSkillBase = (skillId) =>
    (selectedArq?.periciasBonus?.[skillId] || 0) +
    (selectedAnt?.periciasBonus?.[skillId] || 0) +
    (selectedCar?.periciasFixas?.[skillId] || 0)

  const adjustAttr = (attrId, delta) => {
    setFreeAttr(prev => {
      const cur = prev[attrId] || 0
      const newVal = Math.max(0, cur + delta)
      const newTotal = totalFreeAttr - cur + newVal
      if (newTotal > attrBudget) return prev
      return { ...prev, [attrId]: newVal }
    })
  }

  const adjustSkill = (skillId, delta) => {
    // Check restrictions
    if (selectedCar?.periciasEspecial === 'exceto_combater_taticas') {
      if (['combater', 'taticas'].includes(skillId)) return
    }
    setFreeSkill(prev => {
      const cur = prev[skillId] || 0
      const newVal = Math.max(0, cur + delta)
      const newTotal = totalFreeSkill - cur + newVal
      if (newTotal > skillBudget) return prev
      return { ...prev, [skillId]: newVal }
    })
  }

  const isSkillRestricted = (skillId) =>
    selectedCar?.periciasEspecial === 'exceto_combater_taticas' &&
    ['combater', 'taticas'].includes(skillId)

  return (
    <div className="h-full min-h-0 space-y-5 overflow-y-auto pr-1">
      {/* Atributos */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Atributos</p>
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
            totalFreeAttr === attrBudget ? 'bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
          }`}>
            {totalFreeAttr}/{attrBudget} pontos livres usados
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ATTRIBUTES.map(attr => {
            const bonus = computeAttrBase(attr.id)
            const free = freeAttr[attr.id] || 0
            const total = 6 + bonus + free
            return (
              <div key={attr.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">{attr.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-lg font-bold text-achtung-green-dark dark:text-achtung-green-light">
                    {total}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => adjustAttr(attr.id, -1)}
                      disabled={free <= 0}
                      className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30
                                 text-gray-600 dark:text-gray-300 font-bold text-sm flex items-center justify-center
                                 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >−</button>
                    <span className="text-xs text-gray-400 w-4 text-center">{free > 0 ? `+${free}` : ''}</span>
                    <button
                      onClick={() => adjustAttr(attr.id, 1)}
                      disabled={totalFreeAttr >= attrBudget}
                      className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30
                                 text-gray-600 dark:text-gray-300 font-bold text-sm flex items-center justify-center
                                 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >+</button>
                  </div>
                </div>
                {bonus > 0 && (
                  <p className="text-xs text-gray-400 mt-0.5">bônus: +{bonus}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Perícias */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Perícias</p>
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
            totalFreeSkill === skillBudget ? 'bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
          }`}>
            {totalFreeSkill}/{skillBudget} pontos livres usados
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SKILLS_DATA.map(skill => {
            const base = computeSkillBase(skill.id)
            const free = freeSkill[skill.id] || 0
            const total = base + free
            const restricted = isSkillRestricted(skill.id)
            return (
              <div key={skill.id} className={`border rounded-lg p-2 ${
                restricted
                  ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900/50 opacity-50'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
              }`}>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">{skill.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-lg font-bold text-achtung-green-dark dark:text-achtung-green-light">
                    {total || '—'}
                  </span>
                  {!restricted && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => adjustSkill(skill.id, -1)}
                        disabled={free <= 0}
                        className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30
                                   text-gray-600 dark:text-gray-300 font-bold text-sm flex items-center justify-center
                                   disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >−</button>
                      <span className="text-xs text-gray-400 w-4 text-center">{free > 0 ? `+${free}` : ''}</span>
                      <button
                        onClick={() => adjustSkill(skill.id, 1)}
                        disabled={totalFreeSkill >= skillBudget}
                        className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30
                                   text-gray-600 dark:text-gray-300 font-bold text-sm flex items-center justify-center
                                   disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >+</button>
                    </div>
                  )}
                </div>
                {base > 0 && (
                  <p className="text-xs text-gray-400 mt-0.5">base: {base}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Step 6: Focos ────────────────────────────────────────────────────────────
function StepFocos({ selectedArq, selectedAnt, selectedFocuses, setSelectedFocuses }) {
  // Build the list of (skillId → count needed)
  const focusSlots = {}
  selectedArq?.focosPermitidos?.forEach(sid => {
    focusSlots[sid] = (focusSlots[sid] || 0) + 1
  })
  if (selectedAnt?.focoPrincipal) {
    const sid = selectedAnt.focoPrincipal
    focusSlots[sid] = (focusSlots[sid] || 0) + 1
  }

  const toggleFocus = (skillId, focus) => {
    setSelectedFocuses(prev => {
      const cur = prev[skillId] || []
      const needed = focusSlots[skillId] || 1
      if (cur.includes(focus)) {
        return { ...prev, [skillId]: cur.filter(f => f !== focus) }
      }
      if (cur.length >= needed) {
        // Replace the first one (FIFO)
        return { ...prev, [skillId]: [...cur.slice(1), focus] }
      }
      return { ...prev, [skillId]: [...cur, focus] }
    })
  }

  const skillData = SKILLS_DATA.reduce((acc, s) => { acc[s.id] = s; return acc }, {})

  return (
    <div className="h-full min-h-0 space-y-5 overflow-y-auto pr-1">
      {Object.entries(focusSlots).map(([skillId, needed]) => {
        const skill = skillData[skillId]
        const chosen = selectedFocuses[skillId] || []
        const isComplete = chosen.length >= needed
        return (
          <div key={skillId}>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {skill?.name || skillId}
              </p>
              <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                isComplete ? 'bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
              }`}>
                {chosen.length}/{needed} escolhido{needed > 1 ? 's' : ''}
              </span>
              {skillId === selectedAnt?.focoPrincipal && (
                <Tag color="amber">Obrigatório (antecedente)</Tag>
              )}
              {selectedArq?.focosPermitidos?.includes(skillId) && (
                <Tag color="purple">Arquétipo</Tag>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skill?.focuses?.map(focus => {
                const isChosen = chosen.includes(focus)
                return (
                  <button
                    key={focus}
                    onClick={() => toggleFocus(skillId, focus)}
                    className={`text-xs px-3 py-1.5 rounded-full border-2 font-medium transition-colors
                      ${isChosen
                        ? 'border-achtung-green bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light'
                        : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-achtung-green/50'}`}
                  >
                    {focus}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Step 7: Talentos ─────────────────────────────────────────────────────────
function TalentSlot({ label, keyword, keywords, arcTalentNome, selected, onSelect, search }) {
  // Build the eligible list for this slot
  const kwSet = new Set(keywords)
  const pool = TALENTOS.filter(t => {
    if (t.nome === arcTalentNome) return false
    if (!t.palavrasChave.some(kw => kwSet.has(kw))) return false
    if (search && !t.nome.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <div className="shrink-0 mb-2">
        <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">{label}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {keywords.map(kw => <Tag key={kw} color="blue">{kw}</Tag>)}
        </div>
        {selected && (
          <div className="mt-1.5 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-achtung-green/10 border border-achtung-green/30">
            <span className="text-xs font-semibold text-achtung-green-dark dark:text-achtung-green-light truncate">{selected.nome}</span>
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="ml-auto text-gray-400 hover:text-red-500 shrink-0 text-xs"
            >✕</button>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {pool.length === 0 && (
          <p className="text-xs text-gray-400 italic">Nenhum talento encontrado.</p>
        )}
        {pool.map(t => {
          const isSelected = selected?.nome === t.nome
          return (
            <div
              key={t.nome}
              onClick={() => onSelect(isSelected ? null : t)}
              className={`p-2.5 rounded-lg border cursor-pointer transition-colors
                ${isSelected
                  ? 'border-achtung-green bg-achtung-green/10'
                  : 'border-gray-200 dark:border-gray-700 hover:border-achtung-green/40 bg-gray-50 dark:bg-gray-800/50'}`}
            >
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                  ${isSelected ? 'border-achtung-green' : 'border-gray-400'}`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-achtung-green" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-semibold">{t.nome}</span>
                    {t.palavrasChave.map(kw => <Tag key={kw} color="gray">{kw}</Tag>)}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{t.efeito}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StepTalentos({ selectedArq, selectedAnt, selectedCar, arcTalent, antTalent, setAntTalent, carTalent, setCarTalent }) {
  const [search, setSearch] = useState('')
  const [activeSlot, setActiveSlot] = useState('antecedente')

  const antKeywords = selectedAnt?.palavraChaveTalento ? [selectedAnt.palavraChaveTalento] : []
  const carKeywords = selectedCar?.palavrasChaveTalento || []

  return (
    <div className="flex flex-col h-full min-h-0 space-y-3">
      {/* Arquétipo (display only) */}
      {arcTalent && (
        <div className="p-2.5 rounded-lg bg-achtung-green/10 border border-achtung-green/30 shrink-0">
          <p className="text-xs font-semibold text-achtung-green-dark dark:text-achtung-green-light mb-0.5">
            Talento de Arquétipo (já selecionado)
          </p>
          <p className="text-sm font-medium">{arcTalent.nome}</p>
        </div>
      )}

      {/* Slot tabs */}
      <div className="flex gap-1 shrink-0">
        {[
          { key: 'antecedente', label: 'Antecedente', selected: antTalent },
          { key: 'caracteristica', label: 'Característica', selected: carTalent },
        ].map(slot => (
          <button
            key={slot.key}
            onClick={() => setActiveSlot(slot.key)}
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border
              ${activeSlot === slot.key
                ? 'bg-achtung-green text-white border-achtung-green'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            {slot.label} {slot.selected ? '✓' : ''}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar talento..."
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                   bg-white dark:bg-gray-800 text-sm outline-none focus:border-achtung-green shrink-0"
      />

      {/* Active slot */}
      <div className="flex-1 min-h-0 flex flex-col">
        {activeSlot === 'antecedente' ? (
          <TalentSlot
            label="Talento do Antecedente"
            keywords={antKeywords}
            arcTalentNome={arcTalent?.nome}
            selected={antTalent}
            onSelect={setAntTalent}
            search={search}
          />
        ) : (
          <TalentSlot
            label="Talento da Característica"
            keywords={carKeywords}
            arcTalentNome={arcTalent?.nome}
            selected={carTalent}
            onSelect={setCarTalent}
            search={search}
          />
        )}
      </div>
    </div>
  )
}

// ─── Step 8: Magias ───────────────────────────────────────────────────────────
const TRADITION_DESCS = {
  Celta: 'Magia ancestral: cura, proteção e forças naturais destrutivas.',
  Rúnico: 'Runas nórdicas que canalizam o poder dos deuses Viking.',
  Psíquico: 'Poderes mentais: telepatia, telecinese e percepção extrassensorial.',
}

function StepMagias({
  isAmadorTalent,
  conjurerType, setConjurerType,
  selectedTradition, setSelectedTradition,
  amadorMode, setAmadorMode,
  selectedSpells, setSelectedSpells,
}) {
  const [filterTrad, setFilterTrad] = useState('Celta')
  const [search, setSearch] = useState('')

  const spellLimit =
    conjurerType === 'tradicao' ? 3
    : conjurerType === 'pesquisador' ? 2
    : amadorMode === 'imperfeito' ? 2 : 1

  // Build pool based on type
  let pool = MAGIAS
  if (conjurerType === 'tradicao' && selectedTradition) {
    pool = MAGIAS.filter(m => m.tradicao === selectedTradition)
  } else if (conjurerType !== 'tradicao') {
    pool = MAGIAS.filter(m => m.tradicao === filterTrad)
    if (conjurerType === 'amador' && amadorMode === 'imperfeito') {
      pool = pool.filter(m => m.imperfeito !== null)
    }
  }
  const filtered = search
    ? pool.filter(m => m.nome.toLowerCase().includes(search.toLowerCase()))
    : pool

  const isSelected = (m) => selectedSpells.some(s => s.id === m.id)
  const atLimit = selectedSpells.length >= spellLimit

  const toggle = (m) => {
    if (isSelected(m)) {
      setSelectedSpells(prev => prev.filter(s => s.id !== m.id))
    } else if (!atLimit) {
      setSelectedSpells(prev => [...prev, m])
    }
  }

  // ── Phase 1: choose conjurer type (if not auto-detected as amador) ──
  if (!conjurerType) {
    return (
      <div className="flex flex-col h-full min-h-0 space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400 shrink-0">
          Como seu personagem aprendeu magia?
        </p>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {[
            {
              type: 'tradicao',
              label: 'Tradição',
              desc: 'Segue uma prática mística (Celta, Rúnica ou Psíquico). Começa com 3 magias da sua tradição.',
            },
            {
              type: 'pesquisador',
              label: 'Pesquisador',
              desc: 'Aprendeu por tomos e manuscritos proibidos. Começa com 2 magias de qualquer tradição.',
            },
          ].map(({ type, label, desc }) => (
            <button
              key={type}
              onClick={() => setConjurerType(type)}
              className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-achtung-green transition-colors bg-gray-50 dark:bg-gray-800/50"
            >
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── Phase 2: choose tradition (if Traditional) ──
  if (conjurerType === 'tradicao' && !selectedTradition) {
    return (
      <div className="flex flex-col h-full min-h-0 space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400 shrink-0">
          Qual tradição mágica você segue?
        </p>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {ALL_TRADITIONS.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTradition(t)}
              className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-achtung-green transition-colors bg-gray-50 dark:bg-gray-800/50"
            >
              <p className="font-semibold text-sm">{t}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{TRADITION_DESCS[t]}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── Phase 3: spell selection ──
  return (
    <div className="flex flex-col h-full min-h-0 space-y-3">
      {/* Header: type badge + counter + change links */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-achtung-green/15 text-achtung-green-dark dark:text-achtung-green-light">
            {conjurerType === 'tradicao'
              ? `Tradição ${selectedTradition}`
              : conjurerType === 'pesquisador' ? 'Pesquisador' : 'Amador'}
          </span>
          {!isAmadorTalent && (
            <button
              onClick={() => { setConjurerType(null); setSelectedTradition(null); setSelectedSpells([]) }}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline"
            >
              alterar tipo
            </button>
          )}
          {conjurerType === 'tradicao' && selectedTradition && (
            <button
              onClick={() => { setSelectedTradition(null); setSelectedSpells([]) }}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline"
            >
              alterar tradição
            </button>
          )}
        </div>
        <span className={`text-xs font-medium shrink-0 ${selectedSpells.length === spellLimit ? 'text-achtung-green' : 'text-gray-500'}`}>
          {selectedSpells.length}/{spellLimit} {spellLimit === 1 ? 'magia' : 'magias'}
        </span>
      </div>

      {/* Amador mode toggle */}
      {conjurerType === 'amador' && (
        <div className="flex gap-1 shrink-0">
          {[
            { mode: 'normal', label: '1 magia normal' },
            { mode: 'imperfeito', label: '2 magias imperfeitas' },
          ].map(({ mode, label }) => (
            <button
              key={mode}
              onClick={() => { setAmadorMode(mode); setSelectedSpells([]) }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${amadorMode === mode
                  ? 'bg-achtung-green text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Tradition filter tabs (Pesquisador / Amador only) */}
      {conjurerType !== 'tradicao' && (
        <div className="flex gap-1 shrink-0">
          {ALL_TRADITIONS.map(t => (
            <button
              key={t}
              onClick={() => { setFilterTrad(t); setSearch('') }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${filterTrad === t
                  ? 'bg-achtung-green text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar magia..."
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                   bg-white dark:bg-gray-800 text-sm outline-none focus:border-achtung-green shrink-0"
      />

      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            {conjurerType === 'amador' && amadorMode === 'imperfeito'
              ? 'Nenhuma magia imperfeita nesta tradição.'
              : 'Nenhuma magia encontrada.'}
          </p>
        )}
        {filtered.map(m => {
          const sel = isSelected(m)
          const disabled = !sel && atLimit
          return (
            <div
              key={m.id}
              onClick={() => toggle(m)}
              className={`p-2.5 rounded-lg border transition-colors
                ${sel
                  ? 'border-achtung-green bg-achtung-green/10 cursor-pointer'
                  : disabled
                    ? 'border-gray-200 dark:border-gray-700 opacity-40 cursor-not-allowed bg-gray-50 dark:bg-gray-800/50'
                    : 'border-gray-200 dark:border-gray-700 hover:border-achtung-green/40 bg-gray-50 dark:bg-gray-800/50 cursor-pointer'}`}
            >
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors
                  ${sel ? 'border-achtung-green bg-achtung-green' : 'border-gray-400'}`}>
                  {sel && (
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold">{m.nome}</span>
                    {conjurerType !== 'tradicao' && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
                        {m.tradicao}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{m.dificuldade}</span>
                    <span className="text-xs text-gray-400">{m.custo}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{m.efeito}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Step 9: Verdades Pessoais ────────────────────────────────────────────────
function StepVerdades({ selectedNat, nativeLanguage, selectedAnt, selectedCar, personalTruths, setPersonalTruths }) {
  // Slot 0: nacionalidade (fixa)
  // Slot 1: língua nativa (fixa)
  // Slot 2: característica (opcional com sugestão)
  // Slot 3: antecedente (opcional com sugestões)
  // Slot 4: livre

  const updateTruth = (idx, val) => {
    setPersonalTruths(prev => {
      const next = [...prev]
      next[idx] = val
      return next
    })
  }

  const carSugestao = selectedCar?.verdadeSugerida || ''
  const antSugestoes = selectedAnt?.verdadesSugeridas || []

  const slots = [
    {
      label: 'Nacionalidade',
      fixed: true,
      value: selectedNat?.name || '',
      hint: 'Definida pela sua nacionalidade',
    },
    {
      label: 'Língua Nativa',
      fixed: true,
      value: nativeLanguage || '',
      hint: 'Definida pela língua nativa escolhida',
    },
    {
      label: 'Característica',
      fixed: false,
      value: personalTruths[2] ?? '',
      hint: 'Opcional — sugestão do livro ou personalize',
      suggestions: carSugestao ? [carSugestao] : [],
      idx: 2,
    },
    {
      label: 'Antecedente',
      fixed: false,
      value: personalTruths[3] ?? '',
      hint: 'Opcional — sugestão do livro ou personalize',
      suggestions: antSugestoes,
      idx: 3,
    },
    {
      label: 'Livre',
      fixed: false,
      value: personalTruths[4] ?? '',
      hint: 'Verdade totalmente personalizada',
      suggestions: [],
      idx: 4,
    },
  ]

  return (
    <div className="h-full min-h-0 overflow-y-auto pr-1 space-y-3">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        As primeiras duas verdades são fixas. As demais são opcionais — use as sugestões do livro ou escreva a sua.
      </p>
      {slots.map((slot, i) => (
        <div key={i} className={`rounded-xl border p-3 ${
          slot.fixed
            ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
            : 'border-achtung-green/20 bg-white dark:bg-gray-900'
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded ${
              slot.fixed
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                : 'bg-achtung-green/15 text-achtung-green-dark dark:text-achtung-green-light border border-achtung-green/30'
            }`}>
              {slot.label}
            </span>
            {slot.fixed && (
              <span className="text-xs text-gray-400 dark:text-gray-500 italic">bloqueada</span>
            )}
          </div>

          {slot.fixed ? (
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 px-1">
              {slot.value || <span className="text-gray-400 italic">não definida</span>}
            </p>
          ) : (
            <>
              {slot.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {slot.suggestions.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updateTruth(slot.idx, s)}
                      className={`text-xs px-2 py-0.5 rounded-full border transition-colors
                        ${slot.value === s
                          ? 'border-achtung-green bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light'
                          : 'border-achtung-green/40 bg-achtung-green/10 text-achtung-green-dark dark:text-achtung-green-light hover:bg-achtung-green/25'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={slot.value}
                onChange={e => updateTruth(slot.idx, e.target.value)}
                placeholder={slot.hint}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-800 text-sm outline-none focus:border-achtung-green
                           text-gray-700 dark:text-gray-200 placeholder-gray-400"
              />
            </>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Step 10: Confirmação ─────────────────────────────────────────────────────
function StepConfirmacao({ selectedArq, selectedNat, nativeLanguage, selectedAnt, selectedCar, arcTalent, antTalent, carTalent, selectedSpells, freeAttr, freeSkill, selectedFocuses, personalTruths }) {
  const computeAttr = (id) =>
    6 +
    (selectedArq?.atributosBonus?.[id] || 0) +
    (selectedAnt?.atributosBonus?.[id] || 0) +
    (selectedCar?.atributosFixos?.[id] || 0) +
    (freeAttr[id] || 0)

  const computeSkill = (id) =>
    (selectedArq?.periciasBonus?.[id] || 0) +
    (selectedAnt?.periciasBonus?.[id] || 0) +
    (selectedCar?.periciasFixas?.[id] || 0) +
    (freeSkill[id] || 0)

  const attrValues = ATTRIBUTES
  const skillValues = SKILLS_DATA.filter(s => computeSkill(s.id) > 0)

  return (
    <div className="h-full min-h-0 space-y-4 overflow-y-auto pr-1">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Revise suas escolhas antes de confirmar a criação do personagem.
      </p>

      {/* Identity */}
      <div className="grid grid-cols-2 gap-2">
        {[
          ['Arquétipo', selectedArq?.nome],
          ['Nacionalidade', selectedNat?.name],
          ['Antecedente', selectedAnt?.nome],
          ['Característica', selectedCar?.nome],
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
            <p className="text-xs font-semibold text-gray-400 uppercase">{label}</p>
            <p className="text-sm font-medium mt-0.5">{value || '—'}</p>
          </div>
        ))}
      </div>

      {/* Languages */}
      {selectedNat?.languages?.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400 mb-1">Idiomas</p>
          <div className="flex flex-wrap gap-1">
            {selectedNat.languages.map(l => <Tag key={l} color="green">{l}</Tag>)}
          </div>
        </div>
      )}

      {/* Attributes */}
      {attrValues.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400 mb-1">Atributos</p>
          <div className="flex flex-wrap gap-1">
            {attrValues.map(a => (
              <Tag key={a.id} color="blue">{a.name} {computeAttr(a.id)}</Tag>
            ))}
          </div>
        </div>
      )}

      {/* Skills + Focuses */}
      {skillValues.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400 mb-1">Perícias</p>
          <div className="flex flex-wrap gap-1">
            {skillValues.map(s => {
              const focuses = selectedFocuses[s.id] || []
              return (
                <span key={s.id} className="text-xs px-2 py-0.5 rounded font-medium bg-achtung-green/15 text-achtung-green-dark dark:text-achtung-green-light border border-achtung-green/30">
                  {s.name} {computeSkill(s.id)}
                  {focuses.length > 0 && <span className="text-achtung-green/70"> ({focuses.join(', ')})</span>}
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Talents */}
      {(arcTalent || antTalent || carTalent) && (
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400 mb-1">Talentos</p>
          <div className="flex flex-wrap gap-1">
            {arcTalent && <Tag color="amber">{arcTalent.nome}</Tag>}
            {antTalent && <Tag color="amber">{antTalent.nome}</Tag>}
            {carTalent && <Tag color="amber">{carTalent.nome}</Tag>}
          </div>
        </div>
      )}

      {/* Spells */}
      {selectedSpells.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400 mb-1">Magias</p>
          <div className="flex flex-wrap gap-1">
            {selectedSpells.map(m => <Tag key={m.id} color="purple">{m.nome}</Tag>)}
          </div>
        </div>
      )}

      {/* Truths */}
      {(() => {
        const allTruths = [
          selectedNat?.name || '',
          nativeLanguage || '',
          personalTruths[2] || '',
          personalTruths[3] || '',
          personalTruths[4] || '',
        ].filter(Boolean)
        return allTruths.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase text-gray-400 mb-1">Verdades Pessoais</p>
            <div className="flex flex-wrap gap-1">
              {allTruths.map((t, i) => <Tag key={i} color="gray">{t}</Tag>)}
            </div>
          </div>
        )
      })()}
    </div>
  )
}

// ─── Catalog filter helpers ───────────────────────────────────────────────────
const WEAPON_CATEGORIES = ['arma_corporal', 'arma_exotica', 'pistola', 'rifle', 'smg', 'metralhadora', 'arma_pesada', 'granada']
const ARMAS_ALL_CATS    = ['Corporal', 'Exótica', 'Pistola', 'Rifle/Fuzil', 'Submetralhadora/MG', 'Arma Pesada', 'Granada']

function parseArmaRestricao(r) {
  if (r === '—') return 0
  const n = parseInt(r, 10)
  return isNaN(n) ? 0 : n
}

function filterArmas(filtro, maxRestricao, qualidadesNecessarias = []) {
  return ARMAS.filter(arma => {
    if (parseArmaRestricao(arma.restricao) > maxRestricao) return false
    if (filtro === 'arma'         && !ARMAS_ALL_CATS.includes(arma.categoria)) return false
    if (filtro === 'arma_corporal'&& !['Corporal', 'Exótica'].includes(arma.categoria)) return false
    if (filtro === 'pistola'      && arma.categoria !== 'Pistola') return false
    if (filtro === 'rifle'        && arma.categoria !== 'Rifle/Fuzil') return false
    if (qualidadesNecessarias.length > 0) {
      if (!qualidadesNecessarias.every(q => arma.qualidades && arma.qualidades.includes(q))) return false
    }
    return true
  }).map(arma => ({
    nome: arma.nome,
    restricao: arma.restricao,
    qualidades: arma.qualidades ? arma.qualidades.split(', ') : [],
    _armaData: arma,
  }))
}

function filterCatalog(filtro, maxRestricao, qualidadesNecessarias = []) {
  if (filtro === 'kit_pericia') {
    return ITEMS_CATALOG.filter(i => i.categoria === 'kit_pericia' && i.restricao <= maxRestricao)
      .map(i => ({ ...i, _armaData: null }))
  }
  const weaponFiltros = ['arma', 'arma_corporal', 'pistola', 'rifle', 'smg', 'metralhadora', 'arma_pesada', 'granada']
  if (weaponFiltros.includes(filtro)) {
    return filterArmas(filtro, maxRestricao, qualidadesNecessarias)
  }
  if (filtro === 'qualquer') {
    const armas = filterArmas('arma', maxRestricao, qualidadesNecessarias)
    const nonWeapons = ITEMS_CATALOG.filter(item => {
      if (WEAPON_CATEGORIES.includes(item.categoria)) return false
      if (item.restricao > maxRestricao) return false
      if (qualidadesNecessarias?.length > 0 && !qualidadesNecessarias.every(q => item.qualidades.includes(q))) return false
      return true
    }).map(i => ({ ...i, _armaData: null }))
    return [...armas, ...nonWeapons]
  }
  return ITEMS_CATALOG.filter(item => {
    if (item.restricao > maxRestricao) return false
    if (qualidadesNecessarias?.length > 0 && !qualidadesNecessarias.every(q => item.qualidades.includes(q))) return false
    return true
  }).map(i => ({ ...i, _armaData: null }))
}

function armaToWeapon(arma) {
  return {
    imageUrl: '',
    name: arma.nome,
    focus: arma.foco || '',
    range: arma.alcance || '',
    stress: arma.estresse || '',
    effect: arma.efeito || '',
    barrage: arma.barragem || '',
    size: arma.tamanho || '',
    qualities: arma.qualidades || '',
    restriction: arma.restricao || '',
    weight: '',
  }
}

// ─── Step Pertences ───────────────────────────────────────────────────────────
function StepPertences({ selectedArq, selectedAnt, selectedCar, pertencesState, setPertencesState }) {
  const sources = [
    { key: 'arq', data: selectedArq, label: `Arquétipo: ${selectedArq?.nome}` },
    { key: 'ant', data: selectedAnt, label: `Antecedente: ${selectedAnt?.nome}` },
    { key: 'car', data: selectedCar, label: `Característica: ${selectedCar?.nome}` },
  ].filter(s => s.data?.pertencesEstruturado?.length > 0)

  const update = (key, value) => setPertencesState(prev => ({ ...prev, [key]: value }))

  const renderPertence = (p, key) => {
    switch (p.tipo) {
      case 'passivo':
        return (
          <div key={key} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <span className="text-xs px-2 py-0.5 rounded font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 shrink-0">Passivo</span>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{p.descricao}</p>
          </div>
        )
      case 'item':
        return (
          <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <span className="text-xs px-2 py-0.5 rounded font-medium bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 shrink-0">Item</span>
            <p className="text-sm text-gray-700 dark:text-gray-200">{p.nome}</p>
          </div>
        )
      case 'contato':
        return (
          <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <span className="text-xs px-2 py-0.5 rounded font-medium bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 shrink-0">Contato</span>
            <p className="text-sm text-gray-700 dark:text-gray-200">{p.descricao}</p>
          </div>
        )
      case 'livre':
        return (
          <div key={key} className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
            <p className="text-xs text-amber-700 dark:text-amber-400 mb-1.5 font-medium">{p.descricao}</p>
            <input
              type="text"
              value={pertencesState[key] || ''}
              onChange={e => update(key, e.target.value)}
              className="w-full text-sm bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-600 rounded px-2 py-1.5 focus:outline-none focus:border-achtung-green dark:focus:border-achtung-green-light text-gray-800 dark:text-gray-200"
              placeholder="Digite o item escolhido..."
            />
          </div>
        )
      case 'catalogo': {
        const catalogItems = filterCatalog(p.filtro, p.maxRestricao, p.qualidadesNecessarias)
        return (
          <div key={key} className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
            <p className="text-xs text-amber-700 dark:text-amber-400 mb-1.5 font-medium">{p.descricao}</p>
            <select
              value={pertencesState[key] || ''}
              onChange={e => update(key, e.target.value)}
              className="w-full text-sm bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-600 rounded px-2 py-1.5 focus:outline-none focus:border-achtung-green dark:focus:border-achtung-green-light text-gray-800 dark:text-gray-200"
            >
              <option value="">Escolha um item...</option>
              {catalogItems.map(item => (
                <option key={item.nome} value={item.nome}>
                  {item.nome} (Restrição {item.restricao}{item.qualidades.length > 0 ? ` · ${item.qualidades.join(', ')}` : ''})
                </option>
              ))}
            </select>
          </div>
        )
      }
      case 'contato_foco_opcoes':
        return (
          <div key={key} className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
            <p className="text-xs text-purple-700 dark:text-purple-400 mb-2 font-medium">Contato — escolha o foco:</p>
            <div className="flex flex-wrap gap-1.5">
              {p.opcoes.map(op => (
                <button
                  key={op}
                  onClick={() => update(key, op)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors
                    ${pertencesState[key] === op
                      ? 'bg-achtung-green text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        )
      case 'contato_foco_livre':
        return (
          <div key={key} className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
            <p className="text-xs text-purple-700 dark:text-purple-400 mb-1.5 font-medium">Contato — digite o foco (qualquer perícia ou foco):</p>
            <input
              type="text"
              value={pertencesState[key] || ''}
              onChange={e => update(key, e.target.value)}
              className="w-full text-sm bg-white dark:bg-gray-800 border border-purple-300 dark:border-purple-600 rounded px-2 py-1.5 focus:outline-none focus:border-achtung-green dark:focus:border-achtung-green-light text-gray-800 dark:text-gray-200"
              placeholder="Ex: Persuasão, Furtividade, Academia..."
            />
          </div>
        )
      case 'escolha': {
        const selected = pertencesState[key] || []
        const toggleOpt = (idx) => {
          if (selected.includes(idx)) {
            update(key, selected.filter(i => i !== idx))
          } else if (selected.length < p.quantia) {
            update(key, [...selected, idx])
          }
        }
        const updateCatalogChoice = (idx, value) => {
          setPertencesState(prev => ({ ...prev, [`${key}_cat_${idx}`]: value }))
        }
        return (
          <div key={key} className="p-3 rounded-lg border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">
              Escolha {p.quantia} {p.quantia === 1 ? 'opção' : 'opções'} ({selected.length}/{p.quantia}):
            </p>
            <div className="space-y-1.5">
              {p.opcoes.map((op, idx) => {
                const sel = selected.includes(idx)
                const disabled = !sel && selected.length >= p.quantia
                const catalogItems = op.tipo === 'catalogo'
                  ? filterCatalog(op.filtro, op.maxRestricao, op.qualidadesNecessarias)
                  : []
                return (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <label
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-colors
                        ${sel
                          ? 'bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light'
                          : disabled
                            ? 'opacity-40 cursor-not-allowed text-gray-500'
                            : 'hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                      onClick={() => !disabled && toggleOpt(idx)}
                    >
                      <div className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors
                        ${sel ? 'border-achtung-green bg-achtung-green' : 'border-gray-400'}`}>
                        {sel && <div className="w-2 h-2 bg-white rounded-sm" />}
                      </div>
                      <span className="text-sm">
                        {op.tipo === 'item'
                          ? op.nome
                          : op.tipo === 'contato'
                            ? `Contato: ${op.descricao}`
                            : op.descricao}
                      </span>
                      {op.tipo === 'contato' && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 shrink-0">contato</span>
                      )}
                    </label>
                    {sel && op.tipo === 'catalogo' && (
                      <div className="ml-6">
                        <select
                          value={pertencesState[`${key}_cat_${idx}`] || ''}
                          onChange={e => updateCatalogChoice(idx, e.target.value)}
                          onClick={e => e.stopPropagation()}
                          className="w-full text-sm bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-600 rounded px-2 py-1.5 focus:outline-none focus:border-achtung-green dark:focus:border-achtung-green-light text-gray-800 dark:text-gray-200"
                        >
                          <option value="">Escolha um item...</option>
                          {catalogItems.map(item => (
                            <option key={item.nome} value={item.nome}>
                              {item.nome} (Restrição {item.restricao}{item.qualidades.length > 0 ? ` · ${item.qualidades.join(', ')}` : ''})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      }
      default:
        return null
    }
  }

  if (sources.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-sm text-gray-400 italic">Nenhum pertence especial para as suas escolhas.</p>
      </div>
    )
  }

  return (
    <div className="h-full min-h-0 overflow-y-auto space-y-5 pr-1">
      {sources.map(({ key, data, label }) => (
        <div key={key}>
          <p className="text-xs font-semibold uppercase text-achtung-green-dark dark:text-achtung-green-light mb-2">{label}</p>
          <div className="space-y-2">
            {data.pertencesEstruturado.map((p, i) => renderPertence(p, `${key}_${i}`))}
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-400 dark:text-gray-500 italic pb-2">
        Estes pertences são valores iniciais — você poderá editá-los livremente na ficha após a criação.
      </p>
    </div>
  )
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────
export default function CharacterCreationWizard({ character, onComplete, onHighlightChange }) {
  const [stepIdx, setStepIdx] = useState(0)
  const [selectedArq, setSelectedArq] = useState(null)
  const [arcTalent, setArcTalent] = useState(null)
  const [selectedNat, setSelectedNat] = useState(null)
  const [nativeLanguage, setNativeLanguage] = useState('')
  const [selectedAnt, setSelectedAnt] = useState(null)
  const [selectedCar, setSelectedCar] = useState(null)
  const [freeAttr, setFreeAttr] = useState({})
  const [freeSkill, setFreeSkill] = useState({})
  const [selectedFocuses, setSelectedFocuses] = useState({})
  const [antTalent, setAntTalent] = useState(null)
  const [carTalent, setCarTalent] = useState(null)
  const [conjurerType, setConjurerType] = useState(null)   // 'tradicao' | 'pesquisador' | 'amador'
  const [selectedTradition, setSelectedTradition] = useState(null) // 'Celta' | 'Rúnico' | 'Psíquico'
  const [amadorMode, setAmadorMode] = useState('normal')   // 'normal' | 'imperfeito'
  const [selectedSpells, setSelectedSpells] = useState([])
  const [personalTruths, setPersonalTruths] = useState(['', '', '', '', ''])
  const [pertencesState, setPertencesState] = useState({})

  const isConjurador =
    selectedArq?.nome === 'Ocultista' ||
    arcTalent?.palavrasChave?.includes('Conjurador') ||
    antTalent?.palavrasChave?.includes('Conjurador') ||
    carTalent?.palavrasChave?.includes('Conjurador')

  const isAmadorTalent =
    arcTalent?.id === 'ocultista-amador' ||
    antTalent?.id === 'ocultista-amador' ||
    carTalent?.id === 'ocultista-amador'

  // Auto-set conjurer type to 'amador' when the amador talent is selected
  useEffect(() => {
    if (isAmadorTalent && conjurerType !== 'amador') {
      setConjurerType('amador')
      setSelectedTradition(null)
      setSelectedSpells([])
    }
  }, [isAmadorTalent]) // eslint-disable-line react-hooks/exhaustive-deps

  // When characteristic changes, reset free points
  useEffect(() => {
    setFreeAttr({})
    setFreeSkill({})
  }, [selectedCar])

  // Visible steps (skip magias if not conjurador)
  const visibleSteps = STEPS.filter(s => s !== 'magias' || isConjurador)
  const currentStep = STEPS[stepIdx]
  const currentVisibleIdx = visibleSteps.indexOf(currentStep)

  // Notify parent of highlight changes
  useEffect(() => {
    onHighlightChange?.(STEP_HIGHLIGHTS[currentStep] || [])
  }, [currentStep]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Validation ──
  const canProceed = () => {
    switch (currentStep) {
      case 'arquetipo': return !!selectedArq && !!arcTalent
      case 'nacionalidade': return !!selectedNat && !!nativeLanguage
      case 'antecedente': return !!selectedAnt
      case 'caracteristica': return !!selectedCar
      case 'pontos': {
        const ta = Object.values(freeAttr).reduce((a, b) => a + b, 0)
        const ts = Object.values(freeSkill).reduce((a, b) => a + b, 0)
        return ta === (selectedCar?.atributosLivres || 0) && ts === (selectedCar?.periciasLivres || 0)
      }
      case 'focos': {
        const slots = {}
        selectedArq?.focosPermitidos?.forEach(sid => { slots[sid] = (slots[sid] || 0) + 1 })
        if (selectedAnt?.focoPrincipal) {
          const sid = selectedAnt.focoPrincipal
          slots[sid] = (slots[sid] || 0) + 1
        }
        return Object.entries(slots).every(([sid, n]) => (selectedFocuses[sid] || []).length >= n)
      }
      case 'magias': {
        if (!conjurerType) return false
        if (conjurerType === 'tradicao' && !selectedTradition) return false
        const limit = conjurerType === 'tradicao' ? 3
                    : conjurerType === 'pesquisador' ? 2
                    : amadorMode === 'imperfeito' ? 2 : 1
        return selectedSpells.length === limit
      }
      case 'pertences': {
        const ptSources = [
          { key: 'arq', data: selectedArq },
          { key: 'ant', data: selectedAnt },
          { key: 'car', data: selectedCar },
        ]
        for (const { key, data } of ptSources) {
          if (!data?.pertencesEstruturado) continue
          for (let i = 0; i < data.pertencesEstruturado.length; i++) {
            const p = data.pertencesEstruturado[i]
            const k = `${key}_${i}`
            if (p.tipo === 'livre' && !pertencesState[k]) return false
            if (p.tipo === 'catalogo' && !pertencesState[k]) return false
            if (p.tipo === 'contato_foco_opcoes' && !pertencesState[k]) return false
            if (p.tipo === 'contato_foco_livre' && !pertencesState[k]) return false
            if (p.tipo === 'escolha') {
              const selIdx = pertencesState[k] || []
              if (selIdx.length < p.quantia) return false
              for (const idx of selIdx) {
                if (p.opcoes[idx]?.tipo === 'catalogo' && !pertencesState[`${k}_cat_${idx}`]) return false
              }
            }
          }
        }
        return true
      }
      default: return true
    }
  }

  const goNext = () => {
    if (currentStep === 'confirmacao') {
      handleComplete()
      return
    }
    const nextVis = currentVisibleIdx + 1
    if (nextVis >= visibleSteps.length) {
      handleComplete()
      return
    }
    setStepIdx(STEPS.indexOf(visibleSteps[nextVis]))
  }

  const goBack = () => {
    const prevVis = currentVisibleIdx - 1
    if (prevVis < 0) return
    setStepIdx(STEPS.indexOf(visibleSteps[prevVis]))
  }

  const handleComplete = () => {
    const attributes = {}
    ATTRIBUTES.forEach(attr => {
      const total =
        6 +
        (selectedArq?.atributosBonus?.[attr.id] || 0) +
        (selectedAnt?.atributosBonus?.[attr.id] || 0) +
        (selectedCar?.atributosFixos?.[attr.id] || 0) +
        (freeAttr[attr.id] || 0)
      attributes[attr.id] = { graduation: String(total), additionalDamage: '' }
    })

    const skills = {}
    SKILLS_DATA.forEach(skill => {
      const total =
        (selectedArq?.periciasBonus?.[skill.id] || 0) +
        (selectedAnt?.periciasBonus?.[skill.id] || 0) +
        (selectedCar?.periciasFixas?.[skill.id] || 0) +
        (freeSkill[skill.id] || 0)
      const focuses = selectedFocuses[skill.id] || []
      skills[skill.id] = { graduation: total > 0 ? String(total) : '', focuses }
    })

    const talents = []
    if (arcTalent) {
      talents.push({ name: arcTalent.nome, keyword: arcTalent.palavrasChave.join(', '), effect: arcTalent.efeito })
    }
    if (antTalent) talents.push({ name: antTalent.nome, keyword: antTalent.palavrasChave.join(', '), effect: antTalent.efeito })
    if (carTalent) talents.push({ name: carTalent.nome, keyword: carTalent.palavrasChave.join(', '), effect: carTalent.efeito })

    const spells = selectedSpells.map(m => ({
      name: m.nome,
      tradition: m.tradicao,
      skill: SKILL_NAMES[m.pericia] || m.pericia,
      difficulty: m.dificuldade,
      cost: m.custo,
      duration: m.duracao,
      effect: m.efeito,
      momentum: m.impeto || '',
      imperfect: conjurerType === 'amador' && amadorMode === 'imperfeito',
    }))

    const finalTruths = [
      selectedNat?.name || '',
      nativeLanguage || '',
      personalTruths[2] || '',
      personalTruths[3] || '',
      personalTruths[4] || '',
    ]

    // Build belongings, contacts and weapons from pertences choices
    const allBelongings = []
    const allContacts = []
    const allWeapons = []

    const pushCatalogItem = (chosenName) => {
      const arma = ARMAS.find(a => a.nome === chosenName)
      if (arma) allWeapons.push(armaToWeapon(arma))
      else allBelongings.push(chosenName)
    }

    const processPertences = (pertencesEstruturado, sourceKey) => {
      pertencesEstruturado?.forEach((p, i) => {
        const k = `${sourceKey}_${i}`
        if (p.tipo === 'item') {
          allBelongings.push(p.nome)
        } else if (p.tipo === 'contato') {
          allContacts.push(p.descricao)
        } else if (p.tipo === 'livre') {
          if (pertencesState[k]) allBelongings.push(pertencesState[k])
        } else if (p.tipo === 'catalogo') {
          if (pertencesState[k]) pushCatalogItem(pertencesState[k])
        } else if (p.tipo === 'contato_foco_opcoes' || p.tipo === 'contato_foco_livre') {
          if (pertencesState[k]) allContacts.push(pertencesState[k])
        } else if (p.tipo === 'escolha') {
          const selectedIndices = pertencesState[k] || []
          selectedIndices.forEach(idx => {
            const op = p.opcoes[idx]
            if (!op) return
            if (op.tipo === 'item') allBelongings.push(op.nome)
            else if (op.tipo === 'contato') allContacts.push(op.descricao)
            else if (op.tipo === 'livre') allBelongings.push(op.descricao)
            else if (op.tipo === 'catalogo') {
              const chosen = pertencesState[`${k}_cat_${idx}`]
              if (chosen) pushCatalogItem(chosen)
            }
          })
        }
      })
    }
    processPertences(selectedArq?.pertencesEstruturado, 'arq')
    processPertences(selectedAnt?.pertencesEstruturado, 'ant')
    processPertences(selectedCar?.pertencesEstruturado, 'car')
    const finalBelongings = Array(12).fill('').map((_, i) => allBelongings[i] || '')

    onComplete({
      ...character,
      archetype: selectedArq?.nome || '',
      nationality: selectedNat?.name || '',
      background: selectedAnt?.nome || '',
      characteristic: selectedCar?.nome || '',
      attributes,
      skills,
      talents,
      languages: selectedNat?.languages || [],
      spells,
      personalTruths: finalTruths,
      belongings: finalBelongings,
      contacts: allContacts,
      weapons: [...(character.weapons || []), ...allWeapons],
      setupComplete: true,
      updatedAt: new Date().toISOString(),
    })
  }

  const skipWizard = () => {
    onComplete({ ...character, setupComplete: true })
  }

  // ── Step content ──
  const renderStep = () => {
    switch (currentStep) {
      case 'arquetipo':
        return <StepArquetipo selectedArq={selectedArq} setSelectedArq={setSelectedArq} arcTalent={arcTalent} setArcTalent={setArcTalent} />
      case 'nacionalidade':
        return <StepNacionalidade selectedNat={selectedNat} setSelectedNat={setSelectedNat} nativeLanguage={nativeLanguage} setNativeLanguage={setNativeLanguage} />
      case 'antecedente':
        return <StepAntecedente selectedAnt={selectedAnt} setSelectedAnt={setSelectedAnt} />
      case 'caracteristica':
        return <StepCaracteristica selectedCar={selectedCar} setSelectedCar={setSelectedCar} />
      case 'pontos':
        return (
          <StepPontos
            selectedArq={selectedArq} selectedAnt={selectedAnt} selectedCar={selectedCar}
            freeAttr={freeAttr} setFreeAttr={setFreeAttr}
            freeSkill={freeSkill} setFreeSkill={setFreeSkill}
          />
        )
      case 'focos':
        return (
          <StepFocos
            selectedArq={selectedArq} selectedAnt={selectedAnt}
            selectedFocuses={selectedFocuses} setSelectedFocuses={setSelectedFocuses}
          />
        )
      case 'talentos':
        return (
          <StepTalentos
            selectedArq={selectedArq} selectedAnt={selectedAnt} selectedCar={selectedCar}
            arcTalent={arcTalent}
            antTalent={antTalent} setAntTalent={setAntTalent}
            carTalent={carTalent} setCarTalent={setCarTalent}
          />
        )
      case 'magias':
        return (
          <StepMagias
            isAmadorTalent={isAmadorTalent}
            conjurerType={conjurerType} setConjurerType={setConjurerType}
            selectedTradition={selectedTradition} setSelectedTradition={setSelectedTradition}
            amadorMode={amadorMode} setAmadorMode={setAmadorMode}
            selectedSpells={selectedSpells} setSelectedSpells={setSelectedSpells}
          />
        )
      case 'verdades':
        return (
          <StepVerdades
            selectedNat={selectedNat} nativeLanguage={nativeLanguage}
            selectedAnt={selectedAnt} selectedCar={selectedCar}
            personalTruths={personalTruths} setPersonalTruths={setPersonalTruths}
          />
        )
      case 'pertences':
        return (
          <StepPertences
            selectedArq={selectedArq}
            selectedAnt={selectedAnt}
            selectedCar={selectedCar}
            pertencesState={pertencesState}
            setPertencesState={setPertencesState}
          />
        )
      case 'confirmacao':
        return (
          <StepConfirmacao
            selectedArq={selectedArq} selectedNat={selectedNat} nativeLanguage={nativeLanguage}
            selectedAnt={selectedAnt} selectedCar={selectedCar} arcTalent={arcTalent}
            antTalent={antTalent} carTalent={carTalent} selectedSpells={selectedSpells}
            freeAttr={freeAttr} freeSkill={freeSkill} selectedFocuses={selectedFocuses}
            personalTruths={personalTruths}
          />
        )
      default:
        return null
    }
  }

  const isLast = currentStep === 'confirmacao'
  const ok = canProceed()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.55)' }}>
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col
                   w-full max-w-2xl border border-achtung-green/30"
        style={{ maxHeight: '88vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-gothic text-xl text-achtung-green-dark dark:text-achtung-green-light">
              Criação de Personagem
            </h2>
            <span className="text-xs text-gray-400">
              {currentVisibleIdx + 1} / {visibleSteps.length}
            </span>
          </div>

          {/* Progress dots */}
          <div className="flex gap-1.5 items-center mb-2">
            {visibleSteps.map((s, i) => (
              <div
                key={s}
                className={`rounded-full transition-all duration-200 ${
                  i < currentVisibleIdx
                    ? 'w-3 h-3 bg-achtung-green'
                    : i === currentVisibleIdx
                      ? 'w-4 h-4 bg-achtung-green-dark ring-2 ring-achtung-green/40'
                      : 'w-3 h-3 bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {STEP_LABELS[currentStep]}
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden p-5 flex flex-col min-h-0">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700 shrink-0 flex items-center justify-between">
          <div className="flex gap-2">
            {currentVisibleIdx > 0 && (
              <button
                onClick={goBack}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300
                           hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                ← Anterior
              </button>
            )}
            <button
              onClick={skipWizard}
              className="px-3 py-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200
                         hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Criar em branco
            </button>
          </div>

          <button
            onClick={goNext}
            disabled={!ok}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm
              ${ok
                ? 'bg-achtung-green hover:bg-achtung-green-dark text-white hover:shadow-md active:scale-[0.98]'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}
          >
            {isLast ? 'Confirmar Criação' : 'Próximo →'}
          </button>
        </div>
      </div>
    </div>
  )
}
