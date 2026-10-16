import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../../contexts/ThemeContext'

export function MdsThemeToggle({ className = 'mds-icon-btn' }) {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme} className={className} title={isDark ? 'Tema Claro' : 'Tema Escuro'}>
      {isDark ? (
        <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-mds-100" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  )
}

export function CloseIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

// Janela modal roxa padrão
export function MdsModal({ title, onClose, children, maxWidth = 'max-w-sm' }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className={`mds-card w-full ${maxWidth} max-h-[90vh] flex flex-col overflow-hidden`}
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 bg-mds-800 dark:bg-mds-900 text-white">
          <span className="font-mds-title text-2xl tracking-wide">{title}</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors" title="Fechar">
            <CloseIcon />
          </button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

// Campo com busca e lista suspensa (lista de jogadores no login)
export function MdsSearchSelect({ options, value, onChange, placeholder, emptyText = 'Nada encontrado.' }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [style, setStyle] = useState({})
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    const onDown = (e) => {
      if (inputRef.current?.contains(e.target) || listRef.current?.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const openList = () => {
    const rect = inputRef.current?.getBoundingClientRect()
    if (rect) setStyle({ position: 'fixed', top: rect.bottom + 4, left: rect.left, width: rect.width })
    setOpen(true)
    setSearch('')
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        className="mds-input"
        placeholder={placeholder}
        value={open ? search : value}
        onChange={e => { setSearch(e.target.value); if (!open) openList() }}
        onFocus={openList}
      />
      {open && createPortal(
        <div ref={listRef} style={style}
             className="z-[9999] mds-card !rounded-lg max-h-48 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-2 text-sm italic text-gray-500 dark:text-mds-300">{emptyText}</div>
          ) : filtered.map(name => (
            <button
              key={name}
              type="button"
              className="w-full text-left px-4 py-2 text-sm hover:bg-mds-100 dark:hover:bg-mds-800 transition-colors"
              onClick={() => { onChange(name); setOpen(false); setSearch('') }}
            >
              {name}
            </button>
          ))}
        </div>,
        document.body,
      )}
    </div>
  )
}

// Toast de erro: escuta o evento "mds-error" disparado pela camada de dados
export function MdsErrorToast() {
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const onError = (e) => {
      const id = Date.now() + Math.random()
      setErrors(prev => [...prev.slice(-2), { id, ...e.detail }])
      setTimeout(() => setErrors(prev => prev.filter(x => x.id !== id)), 7000)
    }
    window.addEventListener('mds-error', onError)
    return () => window.removeEventListener('mds-error', onError)
  }, [])

  if (errors.length === 0) return null
  return createPortal(
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10000] space-y-2 w-[min(92vw,420px)]">
      {errors.map(err => (
        <div key={err.id} className="bg-red-700 text-white rounded-lg shadow-2xl px-4 py-3 text-sm">
          <div className="font-semibold">Erro: {err.context}</div>
          <div className="text-white/80 break-words">{err.message}</div>
        </div>
      ))}
    </div>,
    document.body,
  )
}
