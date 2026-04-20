import { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '../services/storage'

const DEFAULT_SETTINGS = {
  poderDaMagia: false,
  resistenciaPorAtributo: false,
  dadoDeDanoPorAtributo: false,
}

const MasterSettingsContext = createContext()

export function MasterSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  useEffect(() => {
    const unsub = storage.onMasterSettingsChanged(setSettings)
    return () => unsub()
  }, [])

  const updateSetting = (key, value) => {
    const next = { ...settings, [key]: value }
    setSettings(next)
    storage.saveMasterSettings(next)
  }

  return (
    <MasterSettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </MasterSettingsContext.Provider>
  )
}

export function useMasterSettings() {
  const context = useContext(MasterSettingsContext)
  if (!context) throw new Error('useMasterSettings must be used within MasterSettingsProvider')
  return context
}
