import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ARQUETIPOS, ANTECEDENTES, CARACTERISTICAS,
  TALENTOS, MAGIAS, ARMAS, EFEITOS_DESC, QUALIDADES_DESC, ITEMS_CATALOG,
} from '../utils/bookData'

// ── Display name maps ─────────────────────────────────────────────────────────
const ATTR_NAMES = {
  agility: 'Agilidade', strength: 'Força', coordination: 'Coordenação',
  discernment: 'Discernimento', reason: 'Razão', will: 'Vontade',
}
const SKILL_NAMES = {
  academia: 'Academia', atletismo: 'Atletismo', combater: 'Combater',
  engenharia: 'Engenharia', furtividade: 'Furtividade', medicina: 'Medicina',
  observar: 'Observar', persuasao: 'Persuasão', resiliencia: 'Resiliência',
  sobrevivencia: 'Sobrevivência', taticas: 'Táticas', veiculos: 'Veículos',
}
const ITEM_CAT_NAMES = {
  arma_corporal: 'Armas Corporais', arma_exotica: 'Armas Exóticas',
  pistola: 'Pistolas', rifle: 'Rifles', smg: 'Submetralhadoras',
  metralhadora: 'Metralhadoras', arma_pesada: 'Armas Pesadas',
  granada: 'Granadas', armadura: 'Armaduras',
  kit_pericia: 'Kits de Perícia', equipamento: 'Equipamento',
}

const SECTIONS = [
  { id: 'arquetipos',      label: 'Arquétipos' },
  { id: 'antecedentes',   label: 'Antecedentes' },
  { id: 'caracteristicas', label: 'Características' },
  { id: 'talentos',       label: 'Talentos' },
  { id: 'magias',         label: 'Magias' },
  { id: 'armas',          label: 'Armas' },
  { id: 'qualidades',     label: 'Efeitos & Qualidades' },
  { id: 'catalogo',       label: 'Catálogo de Itens' },
]

// ── Shared UI pieces ──────────────────────────────────────────────────────────
function Badge({ children, color = 'gray' }) {
  const colors = {
    gray:   'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
    green:  'bg-achtung-green/10 text-achtung-green-dark dark:text-achtung-green-light',
    amber:  'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
    blue:   'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    purple: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
    red:    'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
  }
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded font-medium whitespace-nowrap ${colors[color]}`}>
      {children}
    </span>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 className="font-gothic text-xl text-achtung-green-dark dark:text-achtung-green-light mb-4 pb-2 border-b border-achtung-green/30">
      {children}
    </h2>
  )
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  )
}

function BonusRow({ atributos, pericias }) {
  const attrList = Object.entries(atributos || {}).filter(([, v]) => v)
  const skillList = Object.entries(pericias || {}).filter(([, v]) => v)
  if (!attrList.length && !skillList.length) return null
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {attrList.map(([k, v]) => <Badge key={k} color="green">{ATTR_NAMES[k] || k} +{v}</Badge>)}
      {skillList.map(([k, v]) => <Badge key={k} color="blue">{SKILL_NAMES[k] || k} +{v}</Badge>)}
    </div>
  )
}

function FilterTabs({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
            ${active === opt.value
              ? 'bg-achtung-green text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ── Section: Arquétipos ───────────────────────────────────────────────────────
function SectionArquetipos() {
  const [expanded, setExpanded] = useState(null)
  const toggle = (id) => setExpanded(prev => prev === id ? null : id)
  return (
    <div className="space-y-3">
      <SectionTitle>Arquétipos</SectionTitle>
      {ARQUETIPOS.map(arq => (
        <Card key={arq.id}>
          <button className="w-full text-left" onClick={() => toggle(arq.id)}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800 dark:text-gray-100">{arq.nome}</span>
              <span className="text-gray-400 text-xs ml-2">{expanded === arq.id ? '▲' : '▼'}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">{arq.descricao}</p>
            <BonusRow atributos={arq.atributosBonus} pericias={arq.periciasBonus} />
          </button>

          {expanded === arq.id && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{arq.descricao}</p>

              {arq.focosPermitidos?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Focos Permitidos</p>
                  <div className="flex flex-wrap gap-1">
                    {arq.focosPermitidos.map(f => <Badge key={f} color="amber">{SKILL_NAMES[f] || f}</Badge>)}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Talentos</p>
                <div className="space-y-2">
                  {arq.talentos.map(t => (
                    <div key={t.nome} className="bg-white dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="font-medium text-sm text-gray-800 dark:text-gray-100">{t.nome}</span>
                        {t.palavrasChave.map(kw => <Badge key={kw} color="purple">{kw}</Badge>)}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{t.efeito}</p>
                    </div>
                  ))}
                </div>
              </div>

              {arq.pertences && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Pertences</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{arq.pertences}</p>
                </div>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

// ── Section: Antecedentes ─────────────────────────────────────────────────────
function SectionAntecedentes() {
  const [expanded, setExpanded] = useState(null)
  const toggle = (id) => setExpanded(prev => prev === id ? null : id)
  return (
    <div className="space-y-3">
      <SectionTitle>Antecedentes</SectionTitle>
      {ANTECEDENTES.map(ant => (
        <Card key={ant.id}>
          <button className="w-full text-left" onClick={() => toggle(ant.id)}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800 dark:text-gray-100">{ant.nome}</span>
              <span className="text-gray-400 text-xs ml-2">{expanded === ant.id ? '▲' : '▼'}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">{ant.descricao}</p>
            <BonusRow atributos={ant.atributosBonus} pericias={ant.periciasBonus} />
          </button>

          {expanded === ant.id && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{ant.descricao}</p>

              <div className="flex flex-wrap gap-2">
                {ant.focoPrincipal && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Foco Principal</p>
                    <Badge color="amber">{SKILL_NAMES[ant.focoPrincipal] || ant.focoPrincipal}</Badge>
                  </div>
                )}
                {ant.palavraChaveTalento && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Palavra-Chave do Talento</p>
                    <Badge color="purple">{ant.palavraChaveTalento}</Badge>
                  </div>
                )}
              </div>

              {ant.pertences && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Pertences</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{ant.pertences}</p>
                </div>
              )}

              {ant.verdadesSugeridas?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Verdades Sugeridas</p>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc list-inside space-y-0.5">
                    {ant.verdadesSugeridas.map(v => <li key={v}>{v}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

// ── Section: Características ──────────────────────────────────────────────────
function SectionCaracteristicas() {
  const [expanded, setExpanded] = useState(null)
  const toggle = (id) => setExpanded(prev => prev === id ? null : id)
  return (
    <div className="space-y-3">
      <SectionTitle>Características</SectionTitle>
      {CARACTERISTICAS.map(car => (
        <Card key={car.id}>
          <button className="w-full text-left" onClick={() => toggle(car.id)}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800 dark:text-gray-100">{car.nome}</span>
              <span className="text-gray-400 text-xs ml-2">{expanded === car.id ? '▲' : '▼'}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">{car.descricao}</p>
          </button>

          {expanded === car.id && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{car.descricao}</p>

              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Bônus</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(car.atributosFixos || {}).map(([k, v]) => (
                    <Badge key={k} color="green">{ATTR_NAMES[k] || k} +{v}</Badge>
                  ))}
                  {car.atributosLivres > 0 && (
                    <Badge color="green">{car.atributosLivres} Atrib. livre{car.atributosLivres > 1 ? 's' : ''}</Badge>
                  )}
                  {Object.entries(car.periciasFixas || {}).map(([k, v]) => (
                    <Badge key={k} color="blue">{SKILL_NAMES[k] || k} +{v}</Badge>
                  ))}
                  {car.periciasLivres > 0 && (
                    <Badge color="blue">{car.periciasLivres} Perícia{car.periciasLivres > 1 ? 's' : ''} livre{car.periciasLivres > 1 ? 's' : ''}</Badge>
                  )}
                </div>
              </div>

              {car.palavrasChaveTalento?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Palavras-Chave do Talento</p>
                  <div className="flex flex-wrap gap-1">
                    {car.palavrasChaveTalento.map(kw => <Badge key={kw} color="purple">{kw}</Badge>)}
                  </div>
                </div>
              )}

              {car.pertences && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Pertences</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{car.pertences}</p>
                </div>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

// ── Section: Talentos ─────────────────────────────────────────────────────────
function SectionTalentos() {
  const [search, setSearch] = useState('')
  const q = search.toLowerCase()
  const filtered = TALENTOS.filter(t =>
    !q ||
    t.nome.toLowerCase().includes(q) ||
    t.palavrasChave.some(kw => kw.toLowerCase().includes(q))
  )
  return (
    <div>
      <SectionTitle>Talentos</SectionTitle>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar por nome ou palavra-chave..."
        className="w-full mb-4 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600
                   bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                   focus:outline-none focus:border-achtung-green dark:focus:border-achtung-green-light"
      />
      <div className="space-y-2">
        {filtered.map(t => (
          <Card key={t.id}>
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="font-semibold text-sm text-gray-800 dark:text-gray-100">{t.nome}</span>
              {t.avancado && <Badge color="amber">Avançado</Badge>}
              {t.periciaSelecionavel && <Badge color="blue">Perícia Variável</Badge>}
              {t.palavrasChave.map(kw => <Badge key={kw} color="purple">{kw}</Badge>)}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{t.efeito}</p>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 italic text-center py-10">Nenhum talento encontrado.</p>
        )}
      </div>
    </div>
  )
}

// ── Section: Magias ───────────────────────────────────────────────────────────
function SectionMagias() {
  const traditions = [...new Set(MAGIAS.map(m => m.tradicao))].sort()
  const [activeTrad, setActiveTrad] = useState(traditions[0])
  const filtered = MAGIAS.filter(m => m.tradicao === activeTrad)
  return (
    <div>
      <SectionTitle>Magias</SectionTitle>
      <FilterTabs
        options={traditions.map(t => ({ value: t, label: t }))}
        active={activeTrad}
        onChange={setActiveTrad}
      />
      <div className="space-y-3">
        {filtered.map(m => (
          <Card key={m.id}>
            <div className="flex items-start justify-between mb-2 gap-2">
              <span className="font-semibold text-gray-800 dark:text-gray-100">{m.nome}</span>
              <Badge color="purple">{SKILL_NAMES[m.pericia] || m.pericia}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Dificuldade:</span> {m.dificuldade}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Custo:</span> {m.custo}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 col-span-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">Duração:</span> {m.duracao}
              </p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{m.efeito}</p>
            {m.impeto && (
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-2 leading-relaxed">
                <span className="font-medium">Ímpeto:</span> {m.impeto}
              </p>
            )}
            {m.imperfeito && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 leading-relaxed">
                <span className="font-medium">Imperfeito:</span> {m.imperfeito}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

// ── Section: Armas ────────────────────────────────────────────────────────────
function SectionArmas() {
  const categories = [...new Set(ARMAS.map(a => a.categoria))]
  const [activeCat, setActiveCat] = useState(categories[0])
  const filtered = ARMAS.filter(a => a.categoria === activeCat)
  return (
    <div>
      <SectionTitle>Armas</SectionTitle>
      <FilterTabs
        options={categories.map(c => ({ value: c, label: c }))}
        active={activeCat}
        onChange={setActiveCat}
      />
      <div className="overflow-x-auto">
        <table className="w-full text-xs min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-gray-700 text-left">
              {['Nome', 'Foco', 'Alcance', 'Estresse', 'Efeito', 'Barragem', 'Tamanho', 'Qualidades', 'Rest.'].map(h => (
                <th key={h} className="py-2 pr-3 last:pr-0 font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="py-2 pr-3 font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">{a.nome}</td>
                <td className="py-2 pr-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.foco || '—'}</td>
                <td className="py-2 pr-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.alcance || '—'}</td>
                <td className="py-2 pr-3 text-gray-600 dark:text-gray-400">{a.estresse}</td>
                <td className="py-2 pr-3 text-gray-600 dark:text-gray-400">{a.efeito || '—'}</td>
                <td className="py-2 pr-3 text-gray-600 dark:text-gray-400">{a.barragem || '—'}</td>
                <td className="py-2 pr-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{a.tamanho || '—'}</td>
                <td className="py-2 pr-3 text-gray-600 dark:text-gray-400">{a.qualidades || '—'}</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">{a.restricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Section: Efeitos & Qualidades ────────────────────────────────────────────
function SectionQualidades() {
  return (
    <div className="space-y-6">
      <SectionTitle>Efeitos &amp; Qualidades de Arma</SectionTitle>

      {/* Efeitos de Arma */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-gothic text-yellow-600 dark:text-yellow-400">Efeitos ⚔</span>
          <span className="flex-1 h-px bg-yellow-400/30" />
          <span className="text-xs text-gray-400 dark:text-gray-500 italic">Ativados ao obter ⚔ nos dados de dano</span>
        </div>
        <div className="space-y-2">
          {Object.entries(EFEITOS_DESC).map(([nome, desc]) => (
            <Card key={nome} className="!p-3 border-yellow-200 dark:border-yellow-900/40">
              <div className="flex gap-3">
                <span className="font-semibold text-sm text-yellow-700 dark:text-yellow-400 shrink-0 w-32">{nome}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Qualidades de Arma */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-gothic text-achtung-green-dark dark:text-achtung-green-light">Qualidades</span>
          <span className="flex-1 h-px bg-achtung-green/30" />
          <span className="text-xs text-gray-400 dark:text-gray-500 italic">Propriedades passivas da arma</span>
        </div>
        <div className="space-y-2">
          {Object.entries(QUALIDADES_DESC).map(([nome, desc]) => (
            <Card key={nome} className="!p-3">
              <div className="flex gap-3">
                <span className="font-semibold text-sm text-achtung-green-dark dark:text-achtung-green-light shrink-0 w-32">{nome}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Section: Catálogo de Itens ────────────────────────────────────────────────
function SectionCatalogo() {
  const categories = [...new Set(ITEMS_CATALOG.map(i => i.categoria))]
  const [activeCat, setActiveCat] = useState(categories[0])
  const filtered = ITEMS_CATALOG.filter(i => i.categoria === activeCat)
  return (
    <div>
      <SectionTitle>Catálogo de Itens</SectionTitle>
      <FilterTabs
        options={categories.map(c => ({ value: c, label: ITEM_CAT_NAMES[c] || c }))}
        active={activeCat}
        onChange={setActiveCat}
      />
      <div className="space-y-1.5">
        {filtered.map(item => (
          <Card key={item.nome} className="!p-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="font-medium text-sm text-gray-800 dark:text-gray-100">{item.nome}</span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  Restrição {item.restricao}
                </span>
                {item.qualidades.map(q => <Badge key={q} color="gray">{q}</Badge>)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ── Main popup ──────────────────────────────────────────────────────────────���─
function EncyclopediaPopup({ onClose }) {
  const [activeSection, setActiveSection] = useState('arquetipos')

  const renderSection = () => {
    switch (activeSection) {
      case 'arquetipos':      return <SectionArquetipos />
      case 'antecedentes':    return <SectionAntecedentes />
      case 'caracteristicas': return <SectionCaracteristicas />
      case 'talentos':        return <SectionTalentos />
      case 'magias':          return <SectionMagias />
      case 'armas':           return <SectionArmas />
      case 'qualidades':      return <SectionQualidades />
      case 'catalogo':        return <SectionCatalogo />
      default:                return null
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex w-full max-w-5xl overflow-hidden"
        style={{ height: '85vh' }}
      >
        {/* Sidebar */}
        <div className="w-44 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0">
          <div className="bg-achtung-green-dark dark:bg-gray-800 px-4 py-3 flex items-center gap-2 flex-shrink-0">
            <img src="/bookcutulo.png" className="w-7 h-7 object-contain flex-shrink-0" alt="" />
            <span className="font-gothic text-white text-sm leading-tight">Enciclopédia</span>
          </div>
          <nav className="flex-1 overflow-y-auto py-1">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-r-2
                  ${activeSection === s.id
                    ? 'bg-achtung-green/10 dark:bg-achtung-green/5 text-achtung-green-dark dark:text-achtung-green-light font-medium border-achtung-green'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-transparent'}`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-end px-5 py-2.5 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
              title="Fechar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ── Export: self-contained button that opens the popup ────────────────────────
export function EncyclopediaButton({ className }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className}
        title="Enciclopédia do Cthulhu"
      >
        <img src="/bookcutulo.png" className="w-5 h-5 object-contain" alt="Enciclopédia" />
      </button>
      {open && <EncyclopediaPopup onClose={() => setOpen(false)} />}
    </>
  )
}
