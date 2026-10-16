import { useState } from 'react'
import { mdsStorage } from '../services/mdsStorage'
import { CARTILHAS_BY_ID } from '../data/cartilhas'
import { CartilhaGrid } from './CartilhasPopup'
import { MdsModal } from './common'
import { validateName } from '../contexts/MdsAuthContext'

export function NewSheetModal({ owner, masters, defaultMestre = '', onCreated, onClose }) {
  const [name, setName] = useState('')
  const [cartilha, setCartilha] = useState(null)
  const [mestre, setMestre] = useState(defaultMestre)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const invalid = validateName(name, 'nome do personagem')
    if (invalid) { setError(invalid); return }
    if (!cartilha) { setError('Escolha uma cartilha.'); return }
    setSaving(true)
    setError('')
    try {
      const id = await mdsStorage.createSheet({ owner, mestre, name: name.trim(), cartilha: cartilha.id })
      onCreated(id)
    } catch {
      setError('Não foi possível criar a ficha.')
      setSaving(false)
    }
  }

  return (
    <MdsModal title="Nova Ficha" onClose={onClose} maxWidth="max-w-2xl">
      <form onSubmit={submit} className="p-5 space-y-4">
        <input autoFocus value={name} onChange={e => setName(e.target.value)} placeholder="Nome do personagem" className="mds-input" />
        <div>
          <div className="text-sm font-semibold mb-2">Cartilha</div>
          <CartilhaGrid selected={cartilha?.id} onPick={setCartilha} />
        </div>
        <label className="block">
          <span className="text-sm font-semibold">Mestre</span>
          <select value={mestre} onChange={e => setMestre(e.target.value)} className="mds-input mt-1">
            <option value="">Sem mestre (escolher depois)</option>
            {masters.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={saving} className="mds-btn w-full">{saving ? 'Criando...' : 'Criar ficha'}</button>
      </form>
    </MdsModal>
  )
}

function SheetCard({ sheet, onOpen, onDelete, showOwner }) {
  const c = CARTILHAS_BY_ID[sheet.cartilha]
  const thumb = c?.pagina2.flat().find(i => i.k === 'img')?.src || c?.imagensPagina1?.[0]?.src
  return (
    <div className="mds-card overflow-hidden flex flex-col">
      <button onClick={onOpen} className="flex-1 text-left p-4 flex gap-3 items-center hover:bg-mds-50 dark:hover:bg-mds-900/60 transition-colors">
        <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-mds-50 dark:bg-mds-900 flex items-center justify-center overflow-hidden">
          {thumb && <img src={thumb} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply dark:invert dark:mix-blend-screen" />}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-lg truncate">{sheet.name}</div>
          <div className="font-mds-title text-xl tracking-wide text-mds-700 dark:text-mds-300 leading-none">{c?.titulo || sheet.cartilha}</div>
          <div className="text-xs text-gray-500 dark:text-mds-300/70 mt-1">
            {showOwner && <>Jogador: {sheet.owner} · </>}Mestre: {sheet.mestre || '—'}
          </div>
        </div>
      </button>
      {onDelete && (
        <div className="border-t border-mds-200 dark:border-mds-800 px-4 py-1.5 text-right">
          <button onClick={onDelete} className="text-xs text-red-500 hover:underline">Excluir ficha</button>
        </div>
      )}
    </div>
  )
}

export default function SheetList({ sheets, loading, onOpen, onNew, onDelete, showOwner, emptyText, title }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="mds-title text-4xl">{title}</h2>
        {onNew && <button onClick={onNew} className="mds-btn">+ Nova ficha</button>}
      </div>
      {loading ? (
        <p className="text-mds-700 dark:text-mds-200">Carregando…</p>
      ) : sheets.length === 0 ? (
        <div className="mds-card p-8 text-center text-gray-500 dark:text-mds-300/80">{emptyText}</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {sheets.map(s => (
            <SheetCard key={s._id} sheet={s} showOwner={showOwner}
                       onOpen={() => onOpen(s._id)}
                       onDelete={onDelete ? () => onDelete(s) : null} />
          ))}
        </div>
      )}
    </div>
  )
}
