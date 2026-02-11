import { createContext, useContext, useState } from 'react'

const SelectionContext = createContext()

export function SelectionProvider({ children }) {
  const [selectedAttribute, setSelectedAttribute] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [activeCharacterName, setActiveCharacterName] = useState(null)

  return (
    <SelectionContext.Provider value={{
      selectedAttribute, setSelectedAttribute,
      selectedSkill, setSelectedSkill,
      activeCharacterName, setActiveCharacterName,
    }}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection() {
  const context = useContext(SelectionContext)
  if (!context) throw new Error('useSelection must be used within SelectionProvider')
  return context
}
