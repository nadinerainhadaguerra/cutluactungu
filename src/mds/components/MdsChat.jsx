import { useState, useEffect, useRef } from 'react'
import { mdsStorage } from '../services/mdsStorage'
import { rollMove, rollExpression, outcomeOf } from '../utils/dice'
import { STATS, formatStat } from './sheet/MdsSheet'
import { CloseIcon } from './common'

const OUTCOME_STYLE = {
  full: 'bg-emerald-600 text-white',
  partial: 'bg-amber-500 text-white',
  miss: 'bg-red-600 text-white',
}

function timeOf(iso) {
  try { return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) } catch { return '' }
}

function Message({ m, mine, canDelete, onDelete }) {
  return (
    <div className={`group flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
      <div className="text-[11px] text-gray-500 dark:text-mds-300/70 px-1 flex items-center gap-1">
        <span className="font-semibold">{m.sender}</span>
        <span>{timeOf(m.timestamp)}</span>
        {canDelete && (
          <button onClick={() => onDelete(m._id)} title="Apagar"
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity">✕</button>
        )}
      </div>
      {m.type === 'move' ? (
        <div className="max-w-[90%] rounded-xl px-3 py-2 bg-mds-100 dark:bg-mds-900 border border-mds-300 dark:border-mds-700">
          <div className="text-sm">
            <span className="font-semibold">{m.label}</span>
            <span className="text-gray-500 dark:text-mds-300"> (2d6 {formatStat(m.mod)})</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-sm">[{m.dice.join(' + ')}] {m.mod >= 0 ? '+' : '−'} {Math.abs(m.mod)} =</span>
            <span className="font-mds-title text-3xl leading-none">{m.total}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${OUTCOME_STYLE[m.outcome]}`}>
              {outcomeOf(m.total).label}
            </span>
          </div>
        </div>
      ) : m.type === 'roll' ? (
        <div className="max-w-[90%] rounded-xl px-3 py-2 bg-mds-100 dark:bg-mds-900 border border-mds-300 dark:border-mds-700">
          <span className="font-mono text-sm">{m.expr}: [{m.dice.join(', ')}]{m.mod ? ` ${m.mod > 0 ? '+' : '−'} ${Math.abs(m.mod)}` : ''} = </span>
          <span className="font-mds-title text-2xl leading-none">{m.total}</span>
        </div>
      ) : (
        <div className={`max-w-[90%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap break-words
                         ${mine ? 'bg-mds-600 text-white' : 'bg-white dark:bg-mds-900 border border-mds-200 dark:border-mds-800'}`}>
          {m.text}
        </div>
      )}
    </div>
  )
}

// Chat da mesa (um chat por mestre). `mesas` permite ao jogador escolher a mesa.
export default function MdsChat({ senderName, isMaster, mesa, mesas = [], onMesaChange, onClose, stats }) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    if (mesa === null || mesa === undefined) { setMessages([]); return undefined }
    return mdsStorage.onMessagesChanged(mesa, setMessages)
  }, [mesa])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages.length])

  const send = async (payload) => {
    if (mesa === null || mesa === undefined) return
    setSending(true)
    try { await mdsStorage.sendMessage({ ...payload, sender: senderName, mestre: mesa }) } catch { /* toast */ }
    setSending(false)
  }

  const submit = async (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    const rollMatch = t.match(/^\/r(?:oll)?\s+(.+)$/i)
    const expr = rollMatch ? rollMatch[1] : t
    const r = rollExpression(expr)
    if (r) await send({ type: 'roll', ...r })
    else await send({ type: 'text', text: t })
    setText('')
  }

  const rollStat = (s) => {
    const mod = Number(stats?.[s.key]) || 0
    const r = rollMove(mod)
    send({ type: 'move', label: `+${s.name}`, ...r })
  }

  const noMesa = mesa === null || mesa === undefined

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 bg-mds-800 dark:bg-mds-950 text-white gap-2">
        <span className="font-mds-title text-2xl tracking-wide">Chat &amp; Dados</span>
        <div className="flex items-center gap-2 min-w-0">
          {!isMaster && mesas.length > 1 && (
            <select value={mesa || ''} onChange={e => onMesaChange(e.target.value)}
                    className="text-xs bg-white/10 border border-white/20 rounded px-2 py-1 max-w-[140px]"
                    title="Mesa (mestre)">
              {mesas.map(m => <option key={m} value={m} className="bg-mds-900">{m || 'Sem mestre'}</option>)}
            </select>
          )}
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded" title="Fechar"><CloseIcon /></button>
        </div>
      </div>
      <div className="px-4 py-1.5 text-xs bg-mds-100 dark:bg-mds-900 text-mds-800 dark:text-mds-200 border-b border-mds-200 dark:border-mds-800">
        {noMesa ? 'Selecione um mestre para abrir o chat da mesa.' : <>Mesa: <strong>{mesa || 'Sem mestre'}</strong></>}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && !noMesa && (
          <p className="text-center text-sm text-gray-400 dark:text-mds-300/60 py-8">Nenhuma mensagem ainda.</p>
        )}
        {messages.map(m => (
          <Message key={m._id} m={m} mine={m.sender === senderName} canDelete={isMaster}
                   onDelete={id => mdsStorage.deleteMessage(id).catch(() => {})} />
        ))}
        <div ref={endRef} />
      </div>

      {stats && !noMesa && (
        <div className="px-3 pt-2 flex flex-wrap gap-1.5 border-t border-mds-200 dark:border-mds-800">
          {STATS.map(s => (
            <button key={s.key} onClick={() => rollStat(s)} disabled={sending}
                    className="text-xs px-2 py-1 rounded-full bg-mds-100 hover:bg-mds-200 dark:bg-mds-900 dark:hover:bg-mds-800
                               text-mds-800 dark:text-mds-100 font-semibold transition-colors">
              {s.name} {formatStat(stats[s.key]) || '±0'}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={submit} className="p-3 flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} disabled={noMesa}
               placeholder="Mensagem ou dados (ex.: 2d6+1)" className="mds-input !py-2 text-sm" />
        <button type="submit" disabled={sending || noMesa || !text.trim()} className="mds-btn !px-4">Enviar</button>
      </form>
    </div>
  )
}
