import { useState, useRef, useEffect } from 'react'
import { ATTRIBUTES, SKILLS_DATA } from '../utils/characterTemplate'
import { useSelection } from '../contexts/SelectionContext'

const NATIONALITIES = [
  { name: 'Australiana', languages: ['Inglês', 'Australiano nativo'] },
  { name: 'Canadense', languages: ['Inglês', 'Francês', 'Primeiro Canadense'] },
  { name: 'Checoslováquia', languages: ['Checo', 'Eslovaco', 'Alemão', 'Húngaro', 'Iídiche'] },
  { name: 'Francesa', languages: ['Francês'] },
  { name: 'Indiana', languages: ['Inglês', 'Urdu', 'Hindu', 'Bengali'] },
  { name: 'Norueguesa', languages: ['Norueguês'] },
  { name: 'Polonesa', languages: ['Polonês'] },
  { name: 'Britânica', languages: ['Inglês', 'Irlandês'] },
  { name: 'Estadunidense', languages: ['Inglês', 'Línguas nativas Norte Americanas'] },
  { name: 'URSS', languages: ['Russa'] },
  { name: 'Belga', languages: ['Holandês', 'Francês', 'Alemão'] },
  { name: 'Camaronesa', languages: ['Inglês', 'Francês'] },
  { name: 'Ceilão', languages: ['Inglês', 'Sinhala', 'Tamil'] },
  { name: 'Ciprus', languages: ['Grego', 'Turco'] },
  { name: 'Dinamarquesa', languages: ['Dinamarquês'] },
  { name: 'Gambia', languages: ['Inglês', 'Línguas Tribais diversas'] },
  { name: 'Ghanesa', languages: ['Inglês', 'Uma das 80 línguas tribais'] },
  { name: 'Grega', languages: ['Grego'] },
  { name: 'Queniana', languages: ['Inglês', 'Suaíli'] },
  { name: 'Luxemburguesa', languages: ['Luxemburguês', 'Francês', 'Alemão'] },
  { name: 'Malta', languages: ['Maltês', 'Inglês'] },
  { name: 'Neozelandesa', languages: ['Inglês', 'Maori'] },
  { name: 'Nigeriana', languages: ['Inglês', 'Hausa', 'Igbo', 'Yoruba'] },
  { name: 'Rhodesia', languages: ['Inglês', 'Shona', 'Nbele'] },
  { name: 'Sul africana', languages: ['Inglês', 'Holandês', 'Africâner', 'Línguas Africanas Nativas'] },
  { name: 'Espanhola', languages: ['Espanhol', 'Catalão', 'Basco'] },
  { name: 'Caribenha', languages: ['Inglês', 'Francês', 'Espanhol', 'Holandês', 'Creole'] },
  { name: 'Holandesa', languages: ['Holandês', 'Inglês', 'Alemão', 'Francês'] },
  { name: 'Yugolavávia', languages: ['Serbo-croata'] },
]

function SectionHeader({ children, className = '' }) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="section-header">{children}</div>
    </div>
  )
}

function StressBox({ checked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`stress-box ${checked ? 'stress-box-checked' : 'stress-box-unchecked'}`}
    >
      {checked && (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  )
}

export default function SheetPage1({ character, updateField, updateCharacter }) {
  const {
    selectedAttribute, setSelectedAttribute,
    selectedSkill, setSelectedSkill,
  } = useSelection()

  const toggleStress = (index) => {
    updateCharacter(prev => {
      const stress = [...prev.stress]
      stress[index] = !stress[index]
      return { ...prev, stress }
    })
  }

  const toggleWound = (index) => {
    updateCharacter(prev => {
      const wounds = [...prev.wounds]
      wounds[index] = !wounds[index]
      return { ...prev, wounds }
    })
  }

  const updateAttribute = (attrId, field, value) => {
    updateCharacter(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attrId]: { ...prev.attributes[attrId], [field]: value },
      },
    }))
  }

  const updateSkillGraduation = (skillId, value) => {
    updateCharacter(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skillId]: { ...prev.skills[skillId], graduation: value },
      },
    }))
  }

  const toggleFocus = (skillId, focusName) => {
    updateCharacter(prev => {
      const skill = prev.skills[skillId]
      const focuses = skill.focuses.includes(focusName)
        ? skill.focuses.filter(f => f !== focusName)
        : [...skill.focuses, focusName]
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [skillId]: { ...skill, focuses },
        },
      }
    })
  }

  const [newLang, setNewLang] = useState('')
  const [showLangInput, setShowLangInput] = useState(false)
  const [natSearch, setNatSearch] = useState('')
  const [natOpen, setNatOpen] = useState(false)
  const natRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (natRef.current && !natRef.current.contains(e.target)) {
        setNatOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredNationalities = NATIONALITIES.filter(n =>
    n.name.toLowerCase().includes(natSearch.toLowerCase())
  )

  const addLanguage = (lang) => {
    const trimmed = lang.trim()
    if (!trimmed) return
    updateCharacter(prev => {
      if (prev.languages.some(l => l.toLowerCase() === trimmed.toLowerCase())) return prev
      return { ...prev, languages: [...prev.languages, trimmed] }
    })
  }

  const removeLanguage = (index) => {
    updateCharacter(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }))
  }

  const handleNationalityChange = (value) => {
    updateField('nationality', value)
    const nat = NATIONALITIES.find(n => n.name === value)
    if (nat) {
      updateCharacter(prev => {
        const existing = prev.languages.map(l => l.toLowerCase())
        const toAdd = nat.languages.filter(l => !existing.includes(l.toLowerCase()))
        return { ...prev, languages: [...prev.languages, ...toAdd] }
      })
    }
  }

  const updateTruth = (index, value) => {
    updateCharacter(prev => {
      const personalTruths = [...prev.personalTruths]
      personalTruths[index] = value
      return { ...prev, personalTruths }
    })
  }

  const handleSelectAttribute = (attr) => {
    const value = character.attributes[attr.id]?.graduation || ''
    if (selectedAttribute?.id === attr.id) {
      setSelectedAttribute(null)
    } else {
      setSelectedAttribute({ id: attr.id, name: attr.name, value })
    }
  }

  const handleSelectSkill = (skill) => {
    const graduation = character.skills[skill.id]?.graduation || ''
    const skillData = SKILLS_DATA.find(s => s.id === skill.id)
    if (selectedSkill?.id === skill.id) {
      setSelectedSkill(null)
    } else {
      setSelectedSkill({
        id: skill.id,
        name: skill.name,
        graduation,
        allFocuses: skillData?.focuses || [],
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Row 1: Nome, Nacionalidade, Posto */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
        <div className="sm:col-span-3">
          <SectionHeader>Nome</SectionHeader>
          <input
            type="text"
            value={character.name}
            readOnly
            className="sheet-input mt-2 font-semibold text-lg bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
          />
        </div>
        <div className="sm:col-span-2 relative" ref={natRef}>
          <SectionHeader>Nacionalidade</SectionHeader>
          <input
            type="text"
            value={natOpen ? natSearch : (character.nationality || '')}
            onChange={e => {
              setNatSearch(e.target.value)
              if (!natOpen) setNatOpen(true)
            }}
            onFocus={() => {
              setNatSearch('')
              setNatOpen(true)
            }}
            placeholder="Buscar nacionalidade..."
            className="sheet-input mt-2"
          />
          {natOpen && (
            <ul className="absolute z-30 left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-lg shadow-lg
                           border-2 border-achtung-green/30
                           bg-white dark:bg-gray-800
                           text-gray-900 dark:text-gray-100">
              {filteredNationalities.length === 0 ? (
                <li className="px-3 py-2 text-sm text-gray-400 dark:text-gray-500">
                  Nenhuma nacionalidade encontrada
                </li>
              ) : (
                filteredNationalities.map(n => (
                  <li
                    key={n.name}
                    onClick={() => {
                      handleNationalityChange(n.name)
                      setNatOpen(false)
                      setNatSearch('')
                    }}
                    className={`px-3 py-2 text-sm cursor-pointer transition-colors
                      hover:bg-achtung-green/20 hover:text-achtung-green-dark dark:hover:text-achtung-green-light
                      ${character.nationality === n.name
                        ? 'bg-achtung-green/15 font-semibold text-achtung-green-dark dark:text-achtung-green-light'
                        : 'text-gray-800 dark:text-gray-200'
                      }`}
                  >
                    {n.name}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
        <div className="sm:col-span-1">
          <SectionHeader>Posto</SectionHeader>
          <input
            type="text"
            value={character.rank || ''}
            onChange={e => updateField('rank', e.target.value)}
            className="sheet-input mt-2"
          />
        </div>
      </div>

      {/* Row 2: Arquétipo, Antecedente, Característica */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <SectionHeader>Arquétipo</SectionHeader>
          <input
            type="text"
            value={character.archetype || ''}
            onChange={e => updateField('archetype', e.target.value)}
            className="sheet-input mt-2"
          />
        </div>
        <div>
          <SectionHeader>Antecedente</SectionHeader>
          <input
            type="text"
            value={character.background || ''}
            onChange={e => updateField('background', e.target.value)}
            className="sheet-input mt-2"
          />
        </div>
        <div>
          <SectionHeader>Característica</SectionHeader>
          <input
            type="text"
            value={character.characteristic || ''}
            onChange={e => updateField('characteristic', e.target.value)}
            className="sheet-input mt-2"
          />
        </div>
      </div>

      {/* Verdades Pessoais e Cicatrizes */}
      <div>
        <SectionHeader>Verdades Pessoais e Cicatrizes</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
          {character.personalTruths.map((truth, i) => (
            <input
              key={i}
              type="text"
              value={truth}
              onChange={e => updateTruth(i, e.target.value)}
              className="sheet-input"
              placeholder={`Verdade ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Middle Section: Estresse, Coragem/Armadura/Fortuna, Ferimentos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Estresse */}
        <div className="lg:col-span-1">
          <SectionHeader>Estresse</SectionHeader>
          <div className="mt-2 space-y-1.5">
            <div className="grid grid-cols-12 gap-1">
              {character.stress.slice(0, 12).map((checked, i) => (
                <StressBox key={i} checked={checked} onClick={() => toggleStress(i)} />
              ))}
            </div>
            <div className="grid grid-cols-12 gap-1">
              {character.stress.slice(12, 24).map((checked, i) => (
                <StressBox key={i + 12} checked={checked} onClick={() => toggleStress(i + 12)} />
              ))}
            </div>
          </div>

          {/* Línguas */}
          <div className="mt-4">
            <SectionHeader>Línguas</SectionHeader>
            <div className="mt-2 min-h-[60px] p-2 rounded-lg border-2 border-achtung-green-muted/30
                            dark:border-achtung-green/20 bg-white dark:bg-gray-800">
              <div className="flex flex-wrap gap-1.5 items-center">
                {character.languages.map((lang, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                               bg-achtung-green/15 text-achtung-green-dark dark:text-achtung-green-light
                               border border-achtung-green/30"
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => removeLanguage(i)}
                      className="hover:text-red-500 transition-colors ml-0.5"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                {showLangInput ? (
                  <input
                    type="text"
                    value={newLang}
                    onChange={e => setNewLang(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addLanguage(newLang)
                        setNewLang('')
                        setShowLangInput(false)
                      } else if (e.key === 'Escape') {
                        setNewLang('')
                        setShowLangInput(false)
                      }
                    }}
                    onBlur={() => {
                      if (newLang.trim()) addLanguage(newLang)
                      setNewLang('')
                      setShowLangInput(false)
                    }}
                    autoFocus
                    placeholder="Nova língua..."
                    className="text-xs px-2 py-0.5 rounded border border-achtung-green/40
                               bg-transparent outline-none focus:border-achtung-green
                               text-gray-900 dark:text-gray-100 w-28"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowLangInput(true)}
                    className="w-6 h-6 flex items-center justify-center rounded-full
                               bg-achtung-green/20 hover:bg-achtung-green/40
                               text-achtung-green-dark dark:text-achtung-green-light
                               transition-colors"
                    title="Adicionar nova língua"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Coragem, Armadura, Fortuna */}
        <div className="lg:col-span-1 space-y-3">
          <div>
            <SectionHeader>Coragem</SectionHeader>
            <input
              type="text"
              value={character.courage || ''}
              onChange={e => updateField('courage', e.target.value)}
              className="sheet-input mt-2 text-center text-xl font-bold"
            />
          </div>
          <div>
            <SectionHeader>Armadura</SectionHeader>
            <input
              type="text"
              value={character.armor || ''}
              onChange={e => updateField('armor', e.target.value)}
              className="sheet-input mt-2 text-center text-xl font-bold"
            />
          </div>
          <div>
            <SectionHeader>Fortuna</SectionHeader>
            <input
              type="text"
              value={character.fortune || ''}
              onChange={e => updateField('fortune', e.target.value)}
              className="sheet-input mt-2 text-center text-xl font-bold"
            />
          </div>
        </div>

        {/* Ferimentos */}
        <div className="lg:col-span-1">
          <SectionHeader>Ferimentos</SectionHeader>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {character.wounds.map((checked, i) => (
              <StressBox key={i} checked={checked} onClick={() => toggleWound(i)} />
            ))}
          </div>
        </div>
      </div>

      {/* Atributos */}
      <div>
        <SectionHeader>Atributos</SectionHeader>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
          Clique no nome do atributo para selecioná-lo para rolagem.
        </p>
        <div className="mt-1 overflow-x-auto">
          <table className="w-full border-collapse min-w-[500px]">
            <thead>
              <tr>
                <th className="table-header w-28"></th>
                {ATTRIBUTES.map(attr => {
                  const isSelected = selectedAttribute?.id === attr.id
                  return (
                    <th
                      key={attr.id}
                      onClick={() => handleSelectAttribute(attr)}
                      className={`table-header cursor-pointer transition-all select-none
                        ${isSelected
                          ? 'ring-2 ring-yellow-400 bg-achtung-green-light scale-105 shadow-lg'
                          : 'hover:bg-achtung-green-light/80'
                        }`}
                    >
                      {attr.name}
                      {isSelected && <span className="ml-1 text-yellow-300">&#9670;</span>}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sheet-cell font-bold text-xs uppercase bg-achtung-green/5 dark:bg-achtung-green/5">
                  Graduação
                </td>
                {ATTRIBUTES.map(attr => {
                  const isSelected = selectedAttribute?.id === attr.id
                  return (
                    <td key={attr.id} className={`sheet-cell ${isSelected ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                      <input
                        type="text"
                        value={character.attributes[attr.id]?.graduation || ''}
                        onChange={e => updateAttribute(attr.id, 'graduation', e.target.value)}
                        className="w-full bg-transparent text-center outline-none text-lg font-bold"
                      />
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td className="sheet-cell font-bold text-xs uppercase bg-achtung-green/5 dark:bg-achtung-green/5">
                  Dano Adicional
                </td>
                {ATTRIBUTES.map(attr => {
                  const isSelected = selectedAttribute?.id === attr.id
                  return (
                    <td key={attr.id} className={`sheet-cell ${isSelected ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
                      <input
                        type="text"
                        value={character.attributes[attr.id]?.additionalDamage || ''}
                        onChange={e => updateAttribute(attr.id, 'additionalDamage', e.target.value)}
                        className="w-full bg-transparent text-center outline-none"
                      />
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Perícias */}
      <div>
        <SectionHeader>Perícias</SectionHeader>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
          Clique no nome da perícia para selecioná-la para rolagem.
        </p>
        <div className="mt-1 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="table-header w-32 text-left">Perícia</th>
                <th className="table-header w-20">Graduação</th>
                <th className="table-header text-left">Focos</th>
              </tr>
            </thead>
            <tbody>
              {SKILLS_DATA.map(skill => {
                const isSelected = selectedSkill?.id === skill.id
                return (
                  <tr key={skill.id} className={`group transition-colors ${
                    isSelected ? 'ring-2 ring-inset ring-yellow-400' : ''
                  }`}>
                    <td
                      onClick={() => handleSelectSkill(skill)}
                      className={`sheet-cell font-bold text-xs uppercase cursor-pointer select-none
                                   transition-all
                                   ${isSelected
                                     ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                                     : 'bg-achtung-green/5 dark:bg-achtung-green/5 text-achtung-green-dark dark:text-achtung-green-light hover:bg-achtung-green/15'
                                   }`}
                    >
                      {skill.name}
                      {isSelected && <span className="ml-1">&#9670;</span>}
                    </td>
                    <td className={`sheet-cell ${isSelected ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}`}>
                      <input
                        type="text"
                        value={character.skills[skill.id]?.graduation || ''}
                        onChange={e => updateSkillGraduation(skill.id, e.target.value)}
                        className="w-full bg-transparent text-center outline-none font-bold"
                      />
                    </td>
                    <td className={`sheet-cell ${isSelected ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}`}>
                      <div className="flex flex-wrap">
                        {skill.focuses.map(focus => {
                          const isActive = character.skills[skill.id]?.focuses?.includes(focus)
                          return (
                            <span
                              key={focus}
                              onClick={() => toggleFocus(skill.id, focus)}
                              className={`skill-focus ${isActive ? 'skill-focus-active' : 'skill-focus-inactive'}`}
                            >
                              {focus}
                            </span>
                          )
                        })}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
