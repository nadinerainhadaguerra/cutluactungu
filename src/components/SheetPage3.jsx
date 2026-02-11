function SectionHeader({ children }) {
  return (
    <div className="inline-block">
      <div className="section-header">{children}</div>
    </div>
  )
}

export default function SheetPage3({ character, updateField, updateCharacter }) {
  const updateSpell = (index, field, value) => {
    updateCharacter(prev => {
      const spells = [...prev.spells]
      spells[index] = { ...spells[index], [field]: value }
      return { ...prev, spells }
    })
  }

  const spellFields = [
    { key: 'name', label: 'NOME', type: 'text' },
    { key: 'skill', label: 'PERÍCIA', type: 'text' },
    { key: 'difficulty', label: 'DIFICULDADE', type: 'text' },
    { key: 'cost', label: 'CUSTO', type: 'text' },
    { key: 'duration', label: 'DURAÇÃO', type: 'text' },
    { key: 'effect', label: 'EFEITO', type: 'textarea' },
    { key: 'momentum', label: 'ÍMPETO', type: 'textarea' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeader>Magias</SectionHeader>
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

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {spellFields.map(f => (
                <th key={f.key} className="table-header">{f.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {character.spells.map((spell, i) => (
              <tr key={i}>
                {spellFields.map(f => (
                  <td key={f.key} className="sheet-cell align-top">
                    {f.type === 'textarea' ? (
                      <textarea
                        value={spell[f.key] || ''}
                        onChange={e => updateSpell(i, f.key, e.target.value)}
                        rows={3}
                        className="w-full bg-transparent outline-none text-sm resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={spell[f.key] || ''}
                        onChange={e => updateSpell(i, f.key, e.target.value)}
                        className="w-full bg-transparent outline-none text-sm"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {character.spells.map((spell, i) => (
          <div key={i} className="border-2 border-achtung-green-muted/30 dark:border-achtung-green/20
                                  rounded-lg p-3 space-y-2">
            <div className="text-xs font-bold text-achtung-green uppercase">
              Magia {i + 1}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {spellFields.map(f => (
                <div key={f.key} className={f.type === 'textarea' ? 'col-span-2' : ''}>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                    {f.label}
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea
                      value={spell[f.key] || ''}
                      onChange={e => updateSpell(i, f.key, e.target.value)}
                      rows={2}
                      className="w-full bg-transparent border border-achtung-green-muted/30
                                 dark:border-achtung-green/20 rounded px-2 py-1 outline-none
                                 text-sm resize-y focus:border-achtung-green transition-colors"
                    />
                  ) : (
                    <input
                      type="text"
                      value={spell[f.key] || ''}
                      onChange={e => updateSpell(i, f.key, e.target.value)}
                      className="w-full bg-transparent border border-achtung-green-muted/30
                                 dark:border-achtung-green/20 rounded px-2 py-1 outline-none
                                 text-sm focus:border-achtung-green transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
