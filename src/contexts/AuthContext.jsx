import { createContext, useContext, useState } from 'react'
import { storage } from '../services/storage'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('achtung_session')
    return saved ? JSON.parse(saved) : null
  })

  const loginAsMaster = async (password) => {
    const masterPassword = await storage.getMasterPassword()
    if (password === masterPassword) {
      const session = { type: 'master', name: 'Mestre' }
      setUser(session)
      sessionStorage.setItem('achtung_session', JSON.stringify(session))
      return { success: true }
    }
    return { success: false, error: 'Senha incorreta.' }
  }

  const loginAsPlayer = async (characterName, password) => {
    const character = await storage.getCharacter(characterName)
    if (!character) {
      return { success: false, error: 'Personagem não encontrado.' }
    }
    if (character.password !== password) {
      return { success: false, error: 'Senha incorreta.' }
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
    if (!password.trim()) {
      return { success: false, error: 'Digite uma senha.' }
    }
    const exists = await storage.characterExists(characterName.trim())
    if (exists) {
      return { success: false, error: 'Já existe uma ficha com esse nome.' }
    }
    await storage.createCharacter(characterName.trim(), password)
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
