import { createContext, useContext, useState, useEffect } from 'react'
import { storage } from '../services/storage'
import { useMasterProfile } from './MasterProfileContext'

const DEFAULT_SETTINGS = {
  poderDaMagia: false,
  resistenciaPorAtributo: false,
  dadoDeDanoPorAtributo: false,
}

const MasterSettingsContext = createContext()

export function MasterSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const { activeMaster } = useMasterProfile()

  useEffect(() => {
    if (!activeMaster) {
      setSettings(DEFAULT_SETTINGS)
      return
    }
    const unsub = storage.onMasterSettingsChangedForMaster(activeMaster, setSettings)
    return () => unsub()
  }, [activeMaster])

  const updateSetting = (key, value) => {
    const next = { ...settings, [key]: value }
    setSettings(next)
    if (activeMaster) storage.saveMasterSettingsForMaster(activeMaster, next)
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
