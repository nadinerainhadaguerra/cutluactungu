import { useState } from 'react'
import { CARTILHAS } from '../data/cartilhas'
import { MdsModal } from './common'
import MdsSheet from './sheet/MdsSheet'

// Botão do canto superior direito: lista as 13 cartilhas e abre cada uma em modo leitura.
export function CartilhasButton({ className = 'mds-icon-btn' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} className={className} title="Cartilhas">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </button>
      {open && <CartilhasPopup onClose={() => setOpen(false)} />}
    </>
  )
}

export function CartilhaGrid({ onPick, selected }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {CARTILHAS.map(c => (
        <button
          key={c.id}
          type="button"
          onClick={() => onPick(c)}
          className={`text-left px-3 py-2.5 rounded-lg border-2 transition-colors
            ${selected === c.id
              ? 'border-mds-600 bg-mds-600 text-white dark:border-mds-300 dark:bg-mds-300 dark:text-mds-950'
              : 'border-mds-200 dark:border-mds-800 hover:border-mds-500 hover:bg-mds-50 dark:hover:bg-mds-900'}`}
        >
          <span className="font-mds-title text-2xl tracking-wide leading-none block">{c.titulo}</span>
        </button>
      ))}
    </div>
  )
}

export default function CartilhasPopup({ onClose }) {
  const [viewing, setViewing] = useState(null)

  if (viewing) {
    return (
      <MdsModal title={viewing.titulo} onClose={onClose} maxWidth="max-w-7xl">
        <div className="p-3 sm:p-4 bg-mds-50/60 dark:bg-mds-950/60">
          <button onClick={() => setViewing(null)} className="mds-btn-ghost mb-3 text-sm">
            ← Todas as cartilhas
          </button>
          <MdsSheet cartilha={viewing} readOnly />
        </div>
      </MdsModal>
    )
  }

  return (
    <MdsModal title="Cartilhas" onClose={onClose} maxWidth="max-w-2xl">
      <div className="p-4">
        <CartilhaGrid onPick={setViewing} />
      </div>
    </MdsModal>
  )
}
