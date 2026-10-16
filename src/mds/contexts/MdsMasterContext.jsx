import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { mdsStorage } from '../services/mdsStorage'
import { validateName } from './MdsAuthContext'

// Perfis de Mestre da área Monstro da Semana (independentes dos do Achtung).
const ACTIVE_KEY = 'mds_active_master'

const MdsMasterContext = createContext()

export function MdsMasterProvider({ children }) {
  const [masters, setMasters] = useState([])
  const [activeMaster, setActiveMasterState] = useState(() => {
    try { return sessionStorage.getItem(ACTIVE_KEY) || null } catch { return null }
  })

  useEffect(() => mdsStorage.onMastersChanged(setMasters), [])

  const setActiveMaster = useCallback((name) => {
    setActiveMasterState(name || null)
    try {
      if (name) sessionStorage.setItem(ACTIVE_KEY, name)
      else sessionStorage.removeItem(ACTIVE_KEY)
    } catch { /* ignore */ }
  }, [])

  const addMaster = useCallback(async (rawName) => {
    const invalid = validateName(rawName, 'nome do mestre')
    if (invalid) return { success: false, error: invalid }
    const name = rawName.trim()
    if (masters.includes(name)) return { success: false, error: 'Esse mestre já existe.' }
    try {
      await mdsStorage.createMaster(name)
      return { success: true, name }
    } catch {
      return { success: false, error: 'Não foi possível criar o mestre.' }
    }
  }, [masters])

  return (
    <MdsMasterContext.Provider value={{ masters, activeMaster, setActiveMaster, addMaster }}>
      {children}
    </MdsMasterContext.Provider>
  )
}

export function useMdsMasters() {
  const context = useContext(MdsMasterContext)
  if (!context) throw new Error('useMdsMasters must be used within MdsMasterProvider')
  return context
}
