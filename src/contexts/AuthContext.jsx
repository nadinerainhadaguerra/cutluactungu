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
    const session = { type: 'player', name: characterName }
    setUser(session)
    sessionStorage.setItem('achtung_session', JSON.stringify(session))
    return { success: true }
  }

  const loginAsNewPlayer = async (characterName, password) => {
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
    await storage.createCharacter(characterName.trim(), '')
    const session = { type: 'player', name: characterName.trim() }
    setUser(session)
    sessionStorage.setItem('achtung_session', JSON.stringify(session))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('achtung_session')
  }

  return (
    <AuthContext.Provider value={{ user, loginAsMaster, loginAsPlayer, loginAsNewPlayer, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
