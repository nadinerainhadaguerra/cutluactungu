import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { storage } from '../services/storage'

function ThemeToggleSmall() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 dark:bg-gray-800/50
                 hover:bg-white/40 dark:hover:bg-gray-700/50 transition-colors"
      title={isDark ? 'Tema Claro' : 'Tema Escuro'}
    >
      {isDark ? (
        <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  )
}

function SearchableDropdown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)

  const filtered = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        className="w-full px-4 py-2.5 rounded-lg border-2 border-achtung-green-muted/50
                   dark:border-achtung-green/30 bg-white dark:bg-gray-800
                   text-gray-900 dark:text-gray-100 focus:border-achtung-green
                   dark:focus:border-achtung-green-light outline-none transition-colors"
        placeholder={placeholder}
        value={isOpen ? search : value}
        onChange={e => {
          setSearch(e.target.value)
          if (!isOpen) setIsOpen(true)
        }}
        onFocus={() => {
          setIsOpen(true)
          setSearch('')
        }}
      />
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border-2
                        border-achtung-green/30 rounded-lg shadow-xl max-h-48 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm italic">
              Nenhuma ficha encontrada.
            </div>
          ) : (
            filtered.map(name => (
              <button
                key={name}
                className="w-full text-left px-4 py-2 hover:bg-achtung-green/10
                           dark:hover:bg-achtung-green/20 transition-colors text-sm
                           text-gray-800 dark:text-gray-200"
                onClick={() => {
                  onChange(name)
                  setIsOpen(false)
                  setSearch('')
                }}
              >
                {name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default function LoginScreen() {
  const { loginAsMaster, loginAsPlayer, loginAsNewPlayer } = useAuth()

  const [masterPassword, setMasterPassword] = useState('')
  const [masterError, setMasterError] = useState('')
  const [loading, setLoading] = useState(false)

  const [playerName, setPlayerName] = useState('')
  const [playerPassword, setPlayerPassword] = useState('')
  const [playerError, setPlayerError] = useState('')

  const [newPlayerName, setNewPlayerName] = useState('')
  const [newPlayerPassword, setNewPlayerPassword] = useState('')
  const [newPlayerError, setNewPlayerError] = useState('')

  const [characterNames, setCharacterNames] = useState([])

  useEffect(() => {
    storage.getCharacterNames().then(setCharacterNames)
    // Real-time listener for character list
    const unsub = storage.onCharactersChanged(chars => {
      setCharacterNames(chars.map(c => c.name))
    })
    return () => unsub()
  }, [])

  const handleMasterLogin = async (e) => {
    e.preventDefault()
    setMasterError('')
    setLoading(true)
    const result = await loginAsMaster(masterPassword)
    setLoading(false)
    if (!result.success) setMasterError(result.error)
  }

  const handlePlayerLogin = async (e) => {
    e.preventDefault()
    setPlayerError('')
    if (!playerName) {
      setPlayerError('Selecione um personagem.')
      return
    }
    setLoading(true)
    const result = await loginAsPlayer(playerName, playerPassword)
    setLoading(false)
    if (!result.success) setPlayerError(result.error)
  }

  const handleNewPlayer = async (e) => {
    e.preventDefault()
    setNewPlayerError('')
    setLoading(true)
    const result = await loginAsNewPlayer(newPlayerName, newPlayerPassword)
    setLoading(false)
    if (!result.success) setNewPlayerError(result.error)
  }

  return (
    <div className="min-h-screen parchment-bg flex items-center justify-center p-4 relative">
      <ThemeToggleSmall />

      <div className="w-full max-w-md space-y-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="font-gothic text-4xl sm:text-5xl text-achtung-green-dark dark:text-achtung-green-light mb-2">
            Achtung! Cthulhu
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest">
            Ficha de Personagem &bull; 2d20
          </p>
        </div>

        {/* Mestre Login */}
        <div className="card p-6">
          <div className="section-header mb-4">Mestre</div>
          <form onSubmit={handleMasterLogin} className="space-y-3">
            <input
              type="password"
              placeholder="Senha do Mestre"
              value={masterPassword}
              onChange={e => setMasterPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-achtung-green-muted/50
                         dark:border-achtung-green/30 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 focus:border-achtung-green
                         dark:focus:border-achtung-green-light outline-none transition-colors"
            />
            {masterError && (
              <p className="text-red-500 text-sm">{masterError}</p>
            )}
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar como Mestre'}
            </button>
          </form>
        </div>

        {/* Jogador Login */}
        <div className="card p-6">
          <div className="section-header mb-4">Jogador</div>
          <form onSubmit={handlePlayerLogin} className="space-y-3">
            <SearchableDropdown
              options={characterNames}
              value={playerName}
              onChange={setPlayerName}
              placeholder="Buscar personagem..."
            />
            <input
              type="password"
              placeholder="Senha"
              value={playerPassword}
              onChange={e => setPlayerPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-achtung-green-muted/50
                         dark:border-achtung-green/30 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 focus:border-achtung-green
                         dark:focus:border-achtung-green-light outline-none transition-colors"
            />
            {playerError && (
              <p className="text-red-500 text-sm">{playerError}</p>
            )}
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        {/* Novo Jogador */}
        <div className="card p-6">
          <div className="section-header mb-4">Novo Jogador</div>
          <form onSubmit={handleNewPlayer} className="space-y-3">
            <input
              type="text"
              placeholder="Nome do personagem"
              value={newPlayerName}
              onChange={e => setNewPlayerName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-achtung-green-muted/50
                         dark:border-achtung-green/30 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 focus:border-achtung-green
                         dark:focus:border-achtung-green-light outline-none transition-colors"
            />
            <input
              type="password"
              placeholder="Senha da ficha"
              value={newPlayerPassword}
              onChange={e => setNewPlayerPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-achtung-green-muted/50
                         dark:border-achtung-green/30 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 focus:border-achtung-green
                         dark:focus:border-achtung-green-light outline-none transition-colors"
            />
            {newPlayerError && (
              <p className="text-red-500 text-sm">{newPlayerError}</p>
            )}
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Criando...' : 'Criar nova ficha'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-600 mt-6">
          TM &amp; &copy; 2021 Modiphius Entertainment Ltd.
        </p>
      </div>
    </div>
  )
}
