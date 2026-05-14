import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { storage } from '../services/storage'

const MasterProfileContext = createContext()

const DEFAULT_MASTERS = ['Léo', 'Nicolas']
const MIGRATION_DEFAULT = 'Léo'

export function MasterProfileProvider({ children }) {
  const [masters, setMasters] = useState([])
  const [activeMaster, setActiveMasterState] = useState(() => {
    const saved = sessionStorage.getItem('achtung_active_master')
    return saved || null
  })

  useEffect(() => {
    const unsub = storage.onMastersChanged(async (list) => {
      if (list.length === 0) {
        // First run: seed default masters and migrate existing data
        for (const name of DEFAULT_MASTERS) {
          await storage.createMaster(name)
        }
        await storage.migrateToMaster(MIGRATION_DEFAULT)
      } else {
        setMasters(list.sort())
      }
    })
    return () => unsub()
  }, [])

  const setActiveMaster = useCallback((name) => {
    setActiveMasterState(name)
    if (name) {
      sessionStorage.setItem('achtung_active_master', name)
    } else {
      sessionStorage.removeItem('achtung_active_master')
    }
  }, [])

  const addMaster = useCallback(async (name) => {
    const trimmed = name.trim()
    if (!trimmed || masters.includes(trimmed)) return
    await storage.createMaster(trimmed)
  }, [masters])

  const clearActiveMaster = useCallback(() => {
    setActiveMasterState(null)
    sessionStorage.removeItem('achtung_active_master')
  }, [])

  return (
    <MasterProfileContext.Provider value={{ masters, activeMaster, setActiveMaster, addMaster, clearActiveMaster }}>
      {children}
    </MasterProfileContext.Provider>
  )
}

export function useMasterProfile() {
  const context = useContext(MasterProfileContext)
  if (!context) throw new Error('useMasterProfile must be used within MasterProfileProvider')
  return context
}
