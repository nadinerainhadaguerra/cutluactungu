import { useState, useEffect } from 'react'
import { useMdsAuth } from '../contexts/MdsAuthContext'
import { mdsStorage } from '../services/mdsStorage'
import SystemSwitchButton from '../../components/SystemSwitchButton'
import { MdsThemeToggle, MdsSearchSelect } from './common'
import { CartilhasButton } from './CartilhasPopup'

const IS_DEV = import.meta.env.DEV

function PasswordInput({ value, onChange }) {
  if (IS_DEV) return null
  return (
    <input type="password" placeholder="Senha" value={value}
           onChange={e => onChange(e.target.value)} className="mds-input" />
  )
}

export default function MdsLoginScreen() {
  const { loginAsMaster, loginAsPlayer, registerPlayer } = useMdsAuth()
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)

  const [masterPassword, setMasterPassword] = useState('')
  const [masterError, setMasterError] = useState('')

  const [playerName, setPlayerName] = useState('')
  const [playerPassword, setPlayerPassword] = useState('')
  const [playerError, setPlayerError] = useState('')

  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newError, setNewError] = useState('')

  useEffect(() => mdsStorage.onPlayersChanged(setPlayers), [])

  const run = async (fn, setError) => {
    setError('')
    setLoading(true)
    const result = await fn()
    setLoading(false)
    if (!result.success) setError(result.error)
  }

  const handleMaster = (e) => {
    e.preventDefault()
    run(() => loginAsMaster(masterPassword), setMasterError)
  }

  const handlePlayer = (e) => {
    e.preventDefault()
    if (!playerName) { setPlayerError('Selecione seu nome.'); return }
    run(() => loginAsPlayer(playerName, playerPassword), setPlayerError)
  }

  const handleNew = (e) => {
    e.preventDefault()
    run(() => registerPlayer(newName, newPassword), setNewError)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-4 left-4">
        <SystemSwitchButton />
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <CartilhasButton className="p-2 rounded-lg bg-mds-700/80 hover:bg-mds-600 text-white transition-colors" />
        <MdsThemeToggle className="p-2 rounded-lg bg-mds-700/80 hover:bg-mds-600 transition-colors" />
      </div>

      <div className="w-full max-w-md space-y-4 pt-14 sm:pt-0">
        <div className="text-center mb-8">
          <h1 className="mds-title text-6xl sm:text-7xl leading-none">Monstro da Semana</h1>
          <p className="text-sm text-mds-700/80 dark:text-mds-300/80 uppercase tracking-widest mt-2">
            Cartilhas de Caçadores &bull; 2d6
          </p>
        </div>

        <div className="mds-card p-6">
          <div className="mds-section-label mb-4">Mestre</div>
          <form onSubmit={handleMaster} className="space-y-3">
            <PasswordInput value={masterPassword} onChange={setMasterPassword} />
            {masterError && <p className="text-red-500 text-sm">{masterError}</p>}
            <button type="submit" className="mds-btn w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar como Mestre'}
            </button>
          </form>
        </div>

        <div className="mds-card p-6">
          <div className="mds-section-label mb-4">Jogador</div>
          <form onSubmit={handlePlayer} className="space-y-3">
            <MdsSearchSelect
              options={players}
              value={playerName}
              onChange={setPlayerName}
              placeholder="Buscar seu nome..."
              emptyText="Nenhum jogador encontrado."
            />
            <PasswordInput value={playerPassword} onChange={setPlayerPassword} />
            {playerError && <p className="text-red-500 text-sm">{playerError}</p>}
            <button type="submit" className="mds-btn w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <div className="mds-card p-6">
          <div className="mds-section-label mb-4">Novo Jogador</div>
          <form onSubmit={handleNew} className="space-y-3">
            <input type="text" placeholder="Seu nome (não o do personagem)" value={newName}
                   onChange={e => setNewName(e.target.value)} className="mds-input" />
            <PasswordInput value={newPassword} onChange={setNewPassword} />
            {newError && <p className="text-red-500 text-sm">{newError}</p>}
            <button type="submit" className="mds-btn w-full" disabled={loading}>
              {loading ? 'Criando...' : 'Criar jogador'}
            </button>
            <p className="text-xs text-gray-500 dark:text-mds-300/70">
              Depois de entrar você poderá criar quantas fichas quiser.
            </p>
          </form>
        </div>

        <p className="text-center text-xs text-mds-800/60 dark:text-mds-300/50 mt-6">
          Monstro da Semana &copy; Michael Sands &bull; Tradução Luiz Borges
        </p>
      </div>
    </div>
  )
}
