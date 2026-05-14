import { createContext, useContext, useState } from 'react'
import { storage } from '../services/storage'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('achtung_session')
    return saved ? JSON.parse(saved) : null
  })

  const loginAsMaster = async (password) => {
    if (!import.meta.env.DEV) {
      const masterPassword = await storage.getMasterPassword()
      if (password !== masterPassword) return { success: false, error: 'Senha incorreta.' }
    }
    const session = { type: 'master', name: 'Mestre' }
    setUser(session)
    sessionStorage.setItem('achtung_session', JSON.stringify(session))
    return { success: true }
  }

  const loginAsPlayer = async (characterName, password) => {
    if (!import.meta.env.DEV) {
      const correctPassword = await storage.getMasterPassword()
      if (password !== correctPassword) return { success: false, error: 'Senha incorreta.' }
    }
    const character = await storage.getCharacter(characterName)
    if (!character) {
      return { success: false, error: 'Personagem não encontrado.' }
    }
    const session = { type: 'player', name: characterName, mestre: character.mestre || '' }
    setUser(session)
    sessionStorage.setItem('achtung_session', JSON.stringify(session))
    return { success: true }
  }

  const loginAsNewPlayer = async (characterName, password, mestre = '') => {
    if (!characterName.trim()) {
      return { success: false, error: 'Digite um nome para o personagem.' }
    }
    if (!import.meta.env.DEV) {
      const correctPassword = await storage.getMasterPassword()
      if (password !== correctPassword) return { success: false, error: 'Senha incorreta.' }
    }
    const exists = await storage.characterExists(characterName.trim())
    if (exists) {
      return { success: false, error: 'Já existe uma ficha com esse nome.' }
    }
    await storage.createCharacter(characterName.trim(), '', mestre)
    const session = { type: 'player', name: characterName.trim(), mestre }
    setUser(session)
    sessionStorage.setItem('achtung_session', JSON.stringify(session))
    return { success: true }
  }

  const updateMestre = (mestre) => {
    setUser(prev => {
      if (!prev) return prev
      const updated = { ...prev, mestre }
      sessionStorage.setItem('achtung_session', JSON.stringify(updated))
      return updated
    })
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('achtung_session')
    sessionStorage.removeItem('achtung_active_master')
  }

  return (
    <AuthContext.Provider value={{ user, loginAsMaster, loginAsPlayer, loginAsNewPlayer, logout, updateMestre }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
