import { useState, useEffect, useCallback, useRef } from 'react'
import { storage } from '../services/storage'
import { useSelection } from '../contexts/SelectionContext'
import SheetPage1 from './SheetPage1'
import SheetPage2 from './SheetPage2'
import SheetPage3 from './SheetPage3'

const TABS = [
  { id: 1, label: 'Personagem', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 2, label: 'Pertences & Talentos', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { id: 3, label: 'Magias', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
]

function MomentumCounter() {
  const [momentum, setMomentum] = useState(0)

  useEffect(() => {
    const unsub = storage.onMomentumChanged(setMomentum)
    return () => unsub()
  }, [])

  const decrease = () => {
    const val = Math.max(0, momentum - 1)
    storage.setMomentum(val)
    setMomentum(val)
  }

  const increase = () => {
    const val = Math.min(6, momentum + 1)
    storage.setMomentum(val)
    setMomentum(val)
  }

  return (
    <div className="flex items-center justify-center gap-3 py-2 px-4 rounded-xl
                    bg-achtung-green/10 dark:bg-achtung-green/5 border border-achtung-green/30">
      <span className="font-gothic text-lg text-achtung-green-dark dark:text-achtung-green-light">
        Ímpeto
      </span>
      <button
        onClick={decrease}
        className="w-8 h-8 flex items-center justify-center rounded-lg
                   bg-achtung-green-dark hover:bg-achtung-green text-white
                   transition-colors text-lg font-bold active:scale-90"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span className="text-3xl font-bold min-w-[2ch] text-center text-achtung-green-dark dark:text-achtung-green-light">
        {momentum}
      </span>
      <button
        onClick={increase}
        className="w-8 h-8 flex items-center justify-center rounded-lg
                   bg-achtung-green-dark hover:bg-achtung-green text-white
                   transition-colors text-lg font-bold active:scale-90"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div className="flex gap-0.5 ml-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i < momentum
                ? 'bg-achtung-green dark:bg-achtung-green-light'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function CharacterSheet({ characterName, isMaster = false, isNpc = false }) {
  const [character, setCharacter] = useState(null)
  const [activeTab, setActiveTab] = useState(1)
  const { setActiveCharacterName } = useSelection()
  const saveTimerRef = useRef(null)
  const localUpdateRef = useRef(false)

  const listenFn = isNpc ? storage.onNpcChanged.bind(storage) : storage.onCharacterChanged.bind(storage)
  const saveFn = isNpc ? storage.saveNpc.bind(storage) : storage.saveCharacter.bind(storage)

  useEffect(() => {
    setActiveCharacterName(characterName)

    // Real-time listener for character data
    const unsub = listenFn(characterName, (data) => {
      // Only update from Firestore if we don't have a pending local save
      if (!localUpdateRef.current) {
        if (data) setCharacter(data)
      }
    })

    return () => {
      unsub()
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [characterName, setActiveCharacterName, listenFn])

  const updateCharacter = useCallback((updater) => {
    setCharacter(prev => {
      if (!prev) return prev
      const updated = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }

      // Block Firestore listener until save completes
      localUpdateRef.current = true

      // Debounced save to Firestore
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      saveTimerRef.current = setTimeout(() => {
        saveFn(updated).then(() => {
          // Only allow Firestore updates after save is confirmed
          localUpdateRef.current = false
        })
      }, 600)

      return updated
    })
  }, [saveFn])

  const updateField = useCallback((field, value) => {
    updateCharacter(prev => ({ ...prev, [field]: value }))
  }, [updateCharacter])

  if (!character) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Carregando ficha...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-2 sm:p-4 lg:p-6">
      {/* Sheet Header */}
      <div className="text-center mb-4">
        <h1 className="font-gothic text-3xl sm:text-4xl text-achtung-green-dark dark:text-achtung-green-light">
          Achtung! Cthulhu
        </h1>
        <div className="flex items-center justify-center gap-3 mt-1">
          <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Ficha de Personagem
          </span>
          <span className="text-xs font-bold text-achtung-green px-2 py-0.5 border border-achtung-green rounded">
            2d20
          </span>
        </div>
      </div>

      {/* Momentum Counter */}
      <div className="flex justify-center mb-4">
        <MomentumCounter />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-achtung-green/30 dark:border-achtung-green/20 mb-4 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap
                        transition-all border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-achtung-green text-achtung-green-dark dark:text-achtung-green-light'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="card p-3 sm:p-4 lg:p-6">
        {activeTab === 1 && (
          <SheetPage1
            character={character}
            updateField={updateField}
            updateCharacter={updateCharacter}
          />
        )}
        {activeTab === 2 && (
          <SheetPage2
            character={character}
            updateField={updateField}
            updateCharacter={updateCharacter}
          />
        )}
        {activeTab === 3 && (
          <SheetPage3
            character={character}
            updateField={updateField}
            updateCharacter={updateCharacter}
          />
        )}
      </div>

      <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4">
        TM &amp; &copy; 2021 Modiphius Entertainment Ltd.
      </p>
    </div>
  )
}
