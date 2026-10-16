import { useState, useEffect } from 'react'
import { mdsStorage } from '../services/mdsStorage'
import { CloseIcon, MdsModal } from './common'

const PER_PAGE = 12

function NoteForm({ initial, onSave, onClose }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [tag, setTag] = useState(initial?.tag || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setSaving(true)
    setError('')
    try {
      await onSave(title.trim(), description.trim(), tag.trim())
      onClose()
    } catch {
      setError('Não foi possível salvar. Nada foi perdido — tente de novo.')
      setSaving(false)
    }
  }

  return (
    <MdsModal title={initial ? 'Editar Nota' : 'Nova Nota'} onClose={onClose}>
      <form onSubmit={submit} className="p-5 space-y-3">
        <input autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" className="mds-input" />
        <input value={tag} onChange={e => setTag(e.target.value)} placeholder="Tag (ex.: Pista, Monstro, Local)" className="mds-input" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={6}
                  placeholder="Descrição" className="mds-input resize-y" />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={!title.trim() || saving} className="mds-btn w-full">
          {saving ? 'Salvando...' : initial ? 'Salvar Alterações' : 'Salvar Nota'}
        </button>
      </form>
    </MdsModal>
  )
}

// Notas por dono (mestre ou jogador). Tudo gravado no Firestore (coleção mds_notes).
export default function MdsNotes({ owner, onClose }) {
  const [notes, setNotes] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [editing, setEditing] = useState(null) // null | 'new' | nota
  const [openId, setOpenId] = useState(null)
  const [tag, setTag] = useState(null)
  const [page, setPage] = useState(0)

  useEffect(() => {
    setLoaded(false)
    return mdsStorage.onNotesChanged(owner, list => { setNotes(list); setLoaded(true) })
  }, [owner])

  const tags = [...new Set(notes.map(n => n.tag).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }))
  const filtered = tag ? notes.filter(n => n.tag === tag) : notes
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(page, pages - 1)
  const visible = filtered.slice(current * PER_PAGE, (current + 1) * PER_PAGE)

  const remove = async (id) => {
    if (!confirm('Excluir esta nota?')) return
    try { await mdsStorage.deleteNote(id) } catch { /* toast */ }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 bg-mds-800 dark:bg-mds-950 text-white">
        <span className="font-mds-title text-2xl tracking-wide">Notas</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setEditing('new')} title="Nova nota"
                  className="w-8 h-8 rounded-lg bg-mds-500 hover:bg-mds-400 text-xl font-bold leading-none">+</button>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded" title="Fechar"><CloseIcon /></button>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="px-3 py-2 flex flex-wrap gap-1.5 border-b border-mds-200 dark:border-mds-800">
          {[null, ...tags].map(t => (
            <button key={t || '_all'} onClick={() => { setTag(t); setPage(0) }}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors
                      ${tag === t ? 'bg-mds-600 text-white' : 'bg-mds-100 dark:bg-mds-900 text-mds-800 dark:text-mds-200 hover:bg-mds-200 dark:hover:bg-mds-800'}`}>
              {t || 'Todas'}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {!loaded ? (
          <p className="text-center text-sm text-gray-400 py-8">Carregando…</p>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400 dark:text-mds-300/60">Nenhuma nota ainda.</p>
            <p className="text-xs text-gray-300 dark:text-mds-300/40 mt-1">Clique em + para criar.</p>
          </div>
        ) : visible.map(n => (
          <div key={n._id} className="mds-card !rounded-lg px-3 py-2">
            <div className="flex items-start gap-2">
              <button onClick={() => setOpenId(openId === n._id ? null : n._id)}
                      className="flex-1 min-w-0 text-left text-sm font-semibold truncate hover:text-mds-600 dark:hover:text-mds-300">
                {n.title}
              </button>
              <button onClick={() => setEditing(n)} title="Editar" className="text-mds-600 dark:text-mds-300 hover:text-mds-800 text-xs">✎</button>
              <button onClick={() => remove(n._id)} title="Excluir" className="text-red-400 hover:text-red-600 text-xs">✕</button>
            </div>
            {n.tag && <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-mds-100 dark:bg-mds-900 text-mds-700 dark:text-mds-200">{n.tag}</span>}
            {openId === n._id && (
              <p className="mt-2 text-sm text-gray-700 dark:text-mds-100 whitespace-pre-wrap break-words">
                {n.description || <span className="italic text-gray-400">Sem descrição.</span>}
              </p>
            )}
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-mds-200 dark:border-mds-800 text-xs">
          <button onClick={() => setPage(Math.max(0, current - 1))} disabled={current === 0} className="mds-btn-ghost !py-1 !px-2 disabled:opacity-30">← Anterior</button>
          <span>{current + 1} / {pages}</span>
          <button onClick={() => setPage(Math.min(pages - 1, current + 1))} disabled={current >= pages - 1} className="mds-btn-ghost !py-1 !px-2 disabled:opacity-30">Próxima →</button>
        </div>
      )}

      {editing && (
        <NoteForm
          initial={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSave={(title, description, t) => editing === 'new'
            ? mdsStorage.createNote(title, description, t, owner)
            : mdsStorage.updateNote(editing._id, title, description, t)}
        />
      )}
    </div>
  )
}
