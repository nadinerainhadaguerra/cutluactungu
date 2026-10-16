import { createContext, useContext, useState } from 'react'
import { mdsStorage } from '../services/mdsStorage'

// Sessão da área Monstro da Semana — separada da sessão do Achtung.
// Mestre: { type: 'master' }   Jogador: { type: 'player', name }
const SESSION_KEY = 'mds_session'
const IS_DEV = import.meta.env.DEV

const MdsAuthContext = createContext()

function readSession() {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function writeSession(session) {
  try {
    if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    else sessionStorage.removeItem(SESSION_KEY)
  } catch { /* armazenamento indisponível */ }
}

// Nomes viram IDs de documento no Firestore: não podem ter "/" nem ser "." / "..".
export function validateName(name, label = 'nome') {
  const trimmed = (name || '').trim()
  if (!trimmed) return `Digite um ${label}.`
  if (trimmed.includes('/')) return `O ${label} não pode conter "/".`
  if (trimmed === '.' || trimmed === '..') return `${label[0].toUpperCase()}${label.slice(1)} inválido.`
  if (trimmed.length > 60) return `O ${label} pode ter no máximo 60 caracteres.`
  return null
}

async function checkPassword(password) {
  if (IS_DEV) return true
  const correct = await mdsStorage.getPassword()
  return password === correct
}

export function MdsAuthProvider({ children }) {
  const [user, setUser] = useState(readSession)

  const start = (session) => {
    setUser(session)
    writeSession(session)
  }

  const loginAsMaster = async (password) => {
    try {
      if (!(await checkPassword(password))) return { success: false, error: 'Senha incorreta.' }
      start({ type: 'master' })
      return { success: true }
    } catch {
      return { success: false, error: 'Não foi possível conectar. Tente de novo.' }
    }
  }

  const loginAsPlayer = async (name, password) => {
    try {
      if (!(await checkPassword(password))) return { success: false, error: 'Senha incorreta.' }
      if (!(await mdsStorage.playerExists(name))) return { success: false, error: 'Jogador não encontrado.' }
      start({ type: 'player', name })
      return { success: true }
    } catch {
      return { success: false, error: 'Não foi possível conectar. Tente de novo.' }
    }
  }

  const registerPlayer = async (rawName, password) => {
    const invalid = validateName(rawName, 'nome')
    if (invalid) return { success: false, error: invalid }
    const name = rawName.trim()
    try {
      if (!(await checkPassword(password))) return { success: false, error: 'Senha incorreta.' }
      if (await mdsStorage.playerExists(name)) return { success: false, error: 'Já existe um jogador com esse nome.' }
      await mdsStorage.createPlayer(name)
      start({ type: 'player', name })
      return { success: true }
    } catch {
      return { success: false, error: 'Não foi possível conectar. Tente de novo.' }
    }
  }

  const logout = () => {
    start(null)
    try { sessionStorage.removeItem('mds_active_master') } catch { /* ignore */ }
  }

  return (
    <MdsAuthContext.Provider value={{ user, loginAsMaster, loginAsPlayer, registerPlayer, logout }}>
      {children}
    </MdsAuthContext.Provider>
  )
}

export function useMdsAuth() {
  const context = useContext(MdsAuthContext)
  if (!context) throw new Error('useMdsAuth must be used within MdsAuthProvider')
  return context
}
