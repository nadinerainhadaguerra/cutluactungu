import { useState, useEffect, useRef } from 'react'
import { storage } from '../services/storage'

const NOTES_PER_PAGE = 12
const SIDEBAR_WIDTH = 320 // lg:w-80
const HEADER_HEIGHT = 57  // top-[57px]

function NoteFormPopup({ onSave, onClose, initialValues = null }) {
  const [title, setTitle] = useState(initialValues?.title || '')
  const [description, setDescription] = useState(initialValues?.description || '')
  const [tag, setTag] = useState(initialValues?.tag || '')
  const isEdit = !!initialValues

  const handleSubmit = () => {
    if (!title.trim()) return
    onSave(title.trim(), description.trim(), tag.trim())
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm
                      border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <span className="font-gothic text-xl">{isEdit ? 'Editar Nota' : 'Nova Nota'}</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Título da nota"
              autoFocus
              className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                         dark:border-achtung-green/20 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 text-sm outline-none
                         focus:border-achtung-green transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
              Tag
            </label>
            <input
              type="text"
              value={tag}
              onChange={e => setTag(e.target.value)}
              placeholder="Ex: NPC, Local, Enredo..."
              className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                         dark:border-achtung-green/20 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 text-sm outline-none
                         focus:border-achtung-green transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descrição da nota"
              rows={4}
              className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                         dark:border-achtung-green/20 bg-white dark:bg-gray-800
                         text-gray-900 dark:text-gray-100 text-sm outline-none
                         focus:border-achtung-green transition-colors resize-none"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg
              ${title.trim()
                ? 'bg-achtung-green hover:bg-achtung-green-dark text-white hover:shadow-xl active:scale-[0.98]'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
          >
            {isEdit ? 'Salvar Alterações' : 'Salvar Nota'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Tooltip({ note, onClose, excludeRef }) {
  const tooltipRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    const handleMouseDown = (e) => {
      if (tooltipRef.current && tooltipRef.current.contains(e.target)) return
      if (excludeRef.current && excludeRef.current.contains(e.target)) return
      onCloseRef.current()
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [excludeRef])

  return (
    <div
      ref={tooltipRef}
      style={{ top: HEADER_HEIGHT, left: SIDEBAR_WIDTH }}
      className="fixed z-[9999] w-64 bg-white dark:bg-gray-900 rounded-xl shadow-2xl
                 border border-achtung-green/30 dark:border-achtung-green/20 p-4"
    >
      <p className="text-sm font-bold text-achtung-green-dark dark:text-achtung-green-light mb-2 break-words">
        {note.title}
      </p>
      {note.tag && (
        <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-achtung-green/10
                         text-achtung-green-dark dark:text-achtung-green-light mb-2">
          {note.tag}
        </span>
      )}
      <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words">
        {note.description || <span className="italic text-gray-400">Sem descrição.</span>}
      </p>
    </div>
  )
}

function NoteCard({ note, onDelete, onEdit, openTooltipId, setOpenTooltipId }) {
  const titleRef = useRef(null)
  const isOpen = openTooltipId === note._id

  const handleTitleClick = () => {
    setOpenTooltipId(isOpen ? null : note._id)
  }

  return (
    <>
      <div className="card px-3 py-2 flex items-start gap-2 overflow-hidden">
        <div className="flex gap-1 flex-shrink-0 mt-0.5">
          <button
            onClick={() => onDelete(note._id)}
            className="w-6 h-6 flex items-center justify-center rounded
                       text-red-400 hover:text-red-500 hover:bg-red-50
                       dark:hover:bg-red-900/20 transition-colors"
            title="Excluir"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            onClick={() => onEdit(note)}
            className="w-6 h-6 flex items-center justify-center rounded
                       text-achtung-green hover:text-achtung-green-dark
                       hover:bg-achtung-green/10 transition-colors"
            title="Editar"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        <button
          ref={titleRef}
          onClick={handleTitleClick}
          className={`text-sm text-left leading-snug flex-1 min-w-0 truncate transition-colors
            ${isOpen
              ? 'text-achtung-green font-semibold'
              : 'text-gray-800 dark:text-gray-200 hover:text-achtung-green'
            }`}
        >
          {note.title}
        </button>
      </div>

      {isOpen && (
        <Tooltip
          note={note}
          onClose={() => setOpenTooltipId(null)}
          excludeRef={titleRef}
        />
      )}
    </>
  )
}

export default function NotesPanel({ onClose, owner }) {
  const [notes, setNotes] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [page, setPage] = useState(0)
  const [activeTag, setActiveTag] = useState(null)
  const [openTooltipId, setOpenTooltipId] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    const unsub = storage.onNotesChanged(setNotes, owner)
    return () => unsub()
  }, [owner])

  const allTags = [...new Set(notes.map(n => n.tag).filter(Boolean))].sort((a, b) => {
    const aIsNum = /^\d/.test(a)
    const bIsNum = /^\d/.test(b)
    if (aIsNum && !bIsNum) return -1
    if (!aIsNum && bIsNum) return 1
    return a.localeCompare(b, 'pt-BR', { numeric: true, sensitivity: 'base' })
  })
  const filteredNotes = activeTag ? notes.filter(n => n.tag === activeTag) : notes
  const totalPages = Math.max(1, Math.ceil(filteredNotes.length / NOTES_PER_PAGE))

  useEffect(() => {
    if (page >= totalPages) setPage(Math.max(0, totalPages - 1))
  }, [filteredNotes.length, page, totalPages])

  useEffect(() => { setPage(0) }, [activeTag])

  const createNote = async (title, description, tag) => {
    await storage.createNote(title, description, tag, owner)
    setShowPopup(false)
    setPage(0)
  }

  const updateNote = async (title, description, tag) => {
    await storage.updateNote(editingNote._id, title, description, tag)
    setEditingNote(null)
  }

  const deleteNote = async (id) => {
    if (!confirm('Excluir esta nota?')) return
    await storage.deleteNote(id)
    setOpenTooltipId(null)
  }

  const pageNotes = filteredNotes.slice(page * NOTES_PER_PAGE, (page + 1) * NOTES_PER_PAGE)

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-achtung-green/20
                        bg-achtung-green-dark dark:bg-gray-900">
          <span className="font-gothic text-lg text-white">Notas</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPopup(true)}
              className="w-8 h-8 flex items-center justify-center rounded-lg
                         bg-achtung-green hover:bg-achtung-green/80 text-white
                         transition-colors text-xl font-bold leading-none"
              title="Nova nota"
            >
              +
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors text-white"
              title="Fechar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="border-b border-achtung-green/10">
            <button
              onClick={() => setFilterOpen(o => !o)}
              className="w-full flex items-center justify-between px-3 py-2
                         text-xs font-semibold text-achtung-green-dark dark:text-achtung-green-light
                         hover:bg-achtung-green/5 transition-colors"
            >
              <span>Filtros {activeTag && <span className="text-achtung-green">· {activeTag}</span>}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${filterOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {filterOpen && (
              <div className="px-3 pb-2 grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors font-medium text-center
                    ${!activeTag
                      ? 'bg-achtung-green text-white'
                      : 'bg-achtung-green/10 text-achtung-green-dark dark:text-achtung-green-light hover:bg-achtung-green/20'
                    }`}
                >
                  Todas
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`text-xs px-2.5 py-1 rounded-full transition-colors font-medium text-center truncate
                      ${activeTag === tag
                        ? 'bg-achtung-green text-white'
                        : 'bg-achtung-green/10 text-achtung-green-dark dark:text-achtung-green-light hover:bg-achtung-green/20'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm text-gray-400 dark:text-gray-500">Nenhuma nota ainda.</p>
              <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">Clique em + para criar.</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <p className="text-sm text-gray-400 dark:text-gray-500">Nenhuma nota com essa tag.</p>
            </div>
          ) : (
            pageNotes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={deleteNote}
                onEdit={setEditingNote}
                openTooltipId={openTooltipId}
                setOpenTooltipId={setOpenTooltipId}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-3 py-2 border-t border-achtung-green/20">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="text-xs px-2 py-1 rounded bg-achtung-green/10 hover:bg-achtung-green/20
                         text-achtung-green-dark dark:text-achtung-green-light
                         disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Anterior
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="text-xs px-2 py-1 rounded bg-achtung-green/10 hover:bg-achtung-green/20
                         text-achtung-green-dark dark:text-achtung-green-light
                         disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Próxima →
            </button>
          </div>
        )}
      </div>

      {showPopup && (
        <NoteFormPopup
          onSave={createNote}
          onClose={() => setShowPopup(false)}
        />
      )}

      {editingNote && (
        <NoteFormPopup
          initialValues={editingNote}
          onSave={updateNote}
          onClose={() => setEditingNote(null)}
        />
      )}
    </>
  )
}
