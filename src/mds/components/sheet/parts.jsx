import { useState, useEffect } from 'react'
import { STATS } from './rules'

// Peças básicas da ficha (caixas, campos, bloco de classificações).

export const formatStat = (v) => {
  if (v === '' || v === undefined || v === null || Number.isNaN(Number(v))) return ''
  const n = Number(v)
  if (n === 0) return '±0'
  return n > 0 ? `+${n}` : `−${Math.abs(n)}`
}

const parseStat = (s) => {
  const t = String(s).trim().replace('−', '-').replace('±', '')
  if (t === '' || t === '-' || t === '+') return ''
  const n = parseInt(t, 10)
  return Number.isNaN(n) ? '' : Math.max(-3, Math.min(4, n))
}

export function Box({ checked, onToggle, disabled, fixed, title }) {
  const on = checked || fixed
  return (
    <button
      type="button"
      title={title}
      disabled={disabled || fixed}
      onClick={onToggle}
      className={`mds-box ${on ? 'mds-box-on' : ''} ${disabled || fixed ? 'cursor-default hover:bg-transparent' : ''}`}
      aria-pressed={!!on}
    >
      {on && (
        <svg className="w-3 h-3 text-white dark:text-mds-950" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path d="M2 6.5l2.5 2.5L10 3.5" />
        </svg>
      )}
    </button>
  )
}

export function BoxRow({ values, count, onChange, disabled, label }) {
  return (
    <span className="inline-flex gap-1 align-middle">
      {Array.from({ length: count }, (_, i) => (
        <Box
          key={i}
          checked={!!values?.[i]}
          disabled={disabled}
          title={`${label} ${i + 1}`}
          onToggle={() => {
            const next = Array.from({ length: count }, (_, j) => !!values?.[j])
            next[i] = !next[i]
            onChange(next)
          }}
        />
      ))}
    </span>
  )
}

// Campo de texto com estado local (evita cursor pulando enquanto salva)
export function LineInput({ value, onChange, disabled, className = '', placeholder = '', ...rest }) {
  const [local, setLocal] = useState(value || '')
  const [focused, setFocused] = useState(false)
  useEffect(() => { if (!focused) setLocal(value || '') }, [value, focused])
  return (
    <input
      type="text"
      value={local}
      disabled={disabled}
      placeholder={disabled ? '' : placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={e => { setLocal(e.target.value); onChange(e.target.value) }}
      className={`mds-line-input disabled:opacity-100 disabled:cursor-default ${className}`}
      {...rest}
    />
  )
}

export function TextArea({ value, onChange, disabled, placeholder, rows = 3 }) {
  const [local, setLocal] = useState(value || '')
  const [focused, setFocused] = useState(false)
  useEffect(() => { if (!focused) setLocal(value || '') }, [value, focused])
  return (
    <textarea
      value={local}
      rows={rows}
      disabled={disabled}
      placeholder={disabled ? '' : placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={e => { setLocal(e.target.value); onChange(e.target.value) }}
      className="w-full mt-1 px-2 py-1.5 rounded-md border border-mds-300 dark:border-mds-700 bg-white/70 dark:bg-mds-950/50
                 outline-none focus:border-mds-500 font-sans text-sm resize-y disabled:opacity-80"
    />
  )
}

export const H = ({ children, className = '' }) => <h3 className={`mds-sheet-h ${className}`}>{children}</h3>

export function Illustration({ src }) {
  return (
    <img src={src} alt="" loading="lazy"
         className="block mx-auto my-3 max-h-72 w-auto mix-blend-multiply dark:invert dark:mix-blend-screen opacity-90" />
  )
}

export function OptionLine({ checked, onToggle, ro, fixed, disabled, struck, children }) {
  const clickable = !ro && !fixed && !disabled
  // Clicar na linha inteira marca a opção (menos em campos de texto/botões dentro dela)
  const onLineClick = (e) => {
    if (!clickable || e.target.closest('input, textarea, select, button')) return
    onToggle()
  }
  return (
    <div onClick={onLineClick}
         className={`flex gap-1.5 items-start py-[1px] rounded ${clickable ? 'cursor-pointer hover:bg-mds-100/60 dark:hover:bg-mds-900/40' : ''}
                     ${disabled && !checked ? 'opacity-45' : ''}`}>
      <span className="pt-[3px]"><Box checked={checked} fixed={fixed} disabled={ro || disabled} onToggle={onToggle} /></span>
      <div className={`min-w-0 flex-1 ${struck ? 'line-through opacity-60' : ''}`}>{children}</div>
    </div>
  )
}

// Botões pequenos de escolha (listas dentro de opções, aparência…)
export function Chip({ on, disabled, onClick, title, children }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={`px-2 py-0.5 rounded-full border text-[13px] font-sans transition-colors
        ${on ? 'bg-mds-600 border-mds-600 text-white dark:bg-mds-300 dark:border-mds-300 dark:text-mds-950 font-semibold'
             : 'border-mds-300 dark:border-mds-700 hover:bg-mds-100 dark:hover:bg-mds-800'}
        ${disabled && !on ? 'opacity-40 cursor-default hover:bg-transparent dark:hover:bg-transparent' : ''}
        ${disabled && on ? 'cursor-default' : ''}`}
    >
      {children}
    </button>
  )
}

export function SmallBtn({ onClick, children, disabled, title, variant = 'ghost' }) {
  const cls = variant === 'solid'
    ? 'bg-mds-600 hover:bg-mds-700 text-white dark:bg-mds-400 dark:hover:bg-mds-300 dark:text-mds-950'
    : 'bg-mds-100 hover:bg-mds-200 text-mds-800 dark:bg-mds-900 dark:hover:bg-mds-800 dark:text-mds-100'
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold font-sans transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${cls}`}>
      {children}
    </button>
  )
}

function StatInput({ value, ro, label, onCommit }) {
  const [text, setText] = useState(formatStat(value))
  const [focused, setFocused] = useState(false)
  useEffect(() => { if (!focused) setText(formatStat(value)) }, [value, focused])
  return (
    <input
      type="text"
      disabled={ro}
      value={text}
      onFocus={() => setFocused(true)}
      onBlur={() => { setFocused(false); setText(formatStat(value)) }}
      onChange={e => {
        setText(e.target.value)
        const v = parseStat(e.target.value)
        if (v !== '') onCommit(v)
      }}
      className="w-10 h-10 rounded-full border-2 border-mds-800 dark:border-mds-300 text-center font-bold text-lg
                 bg-white dark:bg-mds-950 outline-none focus:border-mds-500 font-sans disabled:opacity-100"
      aria-label={label}
    />
  )
}

export function StatBlock({ data, set, ro, onRoll }) {
  return (
    <div className="border-2 border-mds-800 dark:border-mds-300 shadow-[4px_4px_0_0] shadow-mds-800/70 dark:shadow-mds-300/40
                    bg-white/60 dark:bg-mds-950/40 px-3 py-2 my-3 space-y-1.5">
      {STATS.map(s => (
        <div key={s.key} className="flex items-center gap-2">
          <div className="flex-1 text-right text-[12px] italic leading-tight text-gray-700 dark:text-mds-200">
            {s.moves.map(m => <div key={m}>{m}</div>)}
          </div>
          <StatInput value={data.stats?.[s.key]} ro={ro} label={s.name}
                     onCommit={v => set(`stats.${s.key}`, v)} />
          {onRoll ? (
            <button type="button" onClick={() => onRoll(s)} title={`Rolar 2d6 + ${s.name}`}
                    className="w-28 text-left font-mds-title text-2xl tracking-wide text-mds-800 dark:text-mds-100
                               hover:text-mds-500 dark:hover:text-mds-300 transition-colors">
              {s.name}
            </button>
          ) : (
            <span className="w-28 font-mds-title text-2xl tracking-wide text-mds-800 dark:text-mds-100">{s.name}</span>
          )}
        </div>
      ))}
    </div>
  )
}
