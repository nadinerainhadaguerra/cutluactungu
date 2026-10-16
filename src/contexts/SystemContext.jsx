import { createContext, useContext, useState, useEffect } from 'react'

// Sistemas de jogo disponíveis no site. Cada um tem login, dados e visual independentes.
export const SYSTEMS = {
  achtung: { id: 'achtung', name: 'Achtung! Cthulhu', short: 'Achtung!', title: 'Achtung! Cthulhu - RPG' },
  mds: { id: 'mds', name: 'Monstro da Semana', short: 'MdS', title: 'Monstro da Semana - RPG' },
}

const STORAGE_KEY = 'rpg_active_system'

const SystemContext = createContext()

export function SystemProvider({ children }) {
  const [system, setSystem] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return SYSTEMS[saved] ? saved : 'achtung'
    } catch {
      return 'achtung'
    }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, system) } catch { /* armazenamento indisponível */ }
    document.title = SYSTEMS[system].title
    // Classe no <html> permite que o CSS global (fundo, scrollbar) mude por sistema
    const root = document.documentElement
    Object.keys(SYSTEMS).forEach(id => root.classList.toggle(`system-${id}`, id === system))
  }, [system])

  const toggleSystem = () => setSystem(prev => (prev === 'achtung' ? 'mds' : 'achtung'))

  return (
    <SystemContext.Provider value={{ system, setSystem, toggleSystem }}>
      {children}
    </SystemContext.Provider>
  )
}

export function useSystem() {
  const context = useContext(SystemContext)
  if (!context) throw new Error('useSystem must be used within SystemProvider')
  return context
}
