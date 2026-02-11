import { useState, useEffect } from 'react'
import { storage } from '../services/storage'
import CharacterSheet from './CharacterSheet'

export default function MasterDashboard() {
  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  useEffect(() => {
    const unsub = storage.onCharactersChanged(setCharacters)
    return () => unsub()
  }, [])

  if (selectedCharacter) {
    return (
      <div>
        <div className="sticky top-[57px] z-10 bg-achtung-parchment-dark/90 dark:bg-gray-900/90
                        backdrop-blur-sm border-b border-achtung-green/20 px-4 py-2">
          <button
            onClick={() => setSelectedCharacter(null)}
            className="flex items-center gap-2 text-sm text-achtung-green-dark dark:text-achtung-green-light
                       hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para lista
          </button>
        </div>
        <CharacterSheet characterName={selectedCharacter} isMaster />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="font-gothic text-3xl text-achtung-green-dark dark:text-achtung-green-light mb-2">
          Painel do Mestre
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {characters.length} ficha{characters.length !== 1 ? 's' : ''} criada{characters.length !== 1 ? 's' : ''}
        </p>
      </div>

      {characters.length === 0 ? (
        <div className="card p-8 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">
            Nenhuma ficha criada ainda.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Jogadores podem criar fichas pela tela de login.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map(char => (
            <button
              key={char.name}
              onClick={() => setSelectedCharacter(char.name)}
              className="card p-4 text-left hover:shadow-2xl hover:scale-[1.02]
                         transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-achtung-green-dark dark:text-achtung-green-light
                                 truncate group-hover:text-achtung-green">
                    {char.name}
                  </h3>
                  {char.archetype && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {char.archetype}
                    </p>
                  )}
                  {char.nationality && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {char.nationality}
                    </p>
                  )}
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-achtung-green transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {char.rank && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-achtung-green/10
                                   text-achtung-green-dark dark:text-achtung-green-light">
                    {char.rank}
                  </span>
                )}
                {char.background && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700
                                   text-gray-600 dark:text-gray-400">
                    {char.background}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
                Atualizado: {char.updatedAt ? new Date(char.updatedAt).toLocaleDateString('pt-BR') : '-'}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
