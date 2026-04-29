import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useSubHeader } from '../contexts/SubHeaderContext'
import { EncyclopediaButton } from './EncyclopediaPopup'
import CharacterSheet from './CharacterSheet'
import MasterDashboard from './MasterDashboard'
import Chat from './Chat'
import NotesPanel from './NotesPanel'
import ScenariosPanel from './ScenariosPanel'
import ScenarioViewer from './ScenarioViewer'
import ScenarioDisplay from './ScenarioDisplay'
import TestsPopup from './TestsPopup'
import { storage } from '../services/storage'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-700/50 transition-colors"
      title={isDark ? 'Tema Claro' : 'Tema Escuro'}
    >
      {isDark ? (
        <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  )
}

export default function Layout() {
  const { user, logout } = useAuth()
  const { subHeader } = useSubHeader()
  const [chatOpen, setChatOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [scenariosOpen, setScenariosOpen] = useState(false)
  const [testsOpen, setTestsOpen] = useState(false)
  const [viewingScenario, setViewingScenario] = useState(null)
  const [activeScenario, setActiveScenario] = useState(null)

  useEffect(() => {
    const unsub = storage.onActiveScenarioChanged(setActiveScenario)
    return () => unsub()
  }, [])

  const toggleNotes = () => {
    if (notesOpen) { setNotesOpen(false) }
    else { setNotesOpen(true); setScenariosOpen(false) }
  }

  const toggleScenarios = () => {
    if (scenariosOpen) { setScenariosOpen(false) }
    else { setScenariosOpen(true); setNotesOpen(false) }
  }

  // Sidebar top offset: accounts for secondary header bar when master views a character
  const sidebarTop = subHeader ? 'top-[94px]' : 'top-[57px]'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-achtung-green-dark dark:bg-gray-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-gothic text-xl sm:text-2xl">Achtung! Cthulhu</h1>
            <span className="hidden sm:inline text-xs text-white/60 uppercase tracking-wider">2d20</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-sm text-white/80 hidden sm:inline">
              {user.type === 'master' ? 'Mestre' : user.name}
            </span>

            {user.type === 'master' && (
              <>
                <button
                  onClick={toggleScenarios}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors relative"
                  title="Cenários da Sessão"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setTestsOpen(prev => !prev)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors relative"
                  title="Testes"
                >
                  <img src="/dadocutulo.png" className="w-5 h-5 object-contain" alt="Testes" />
                </button>
              </>
            )}

            <button
              onClick={toggleNotes}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors relative"
              title="Notas"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>

            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors relative"
              title="Chat & Dados"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            <EncyclopediaButton className="p-2 rounded-lg hover:bg-white/20 transition-colors" />
            <ThemeToggle />

            <button
              onClick={logout}
              className="px-3 py-1.5 text-sm rounded-lg bg-red-600/80 hover:bg-red-600
                         transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Secondary bar: back navigation when master views a character/NPC sheet */}
        {subHeader && (
          <div className="border-t border-white/10">
            <div className="max-w-screen-2xl mx-auto px-4 py-2">
              <button
                onClick={subHeader.onBack}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {subHeader.label}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex relative">
        <main className={`flex-1 transition-all duration-300 ${chatOpen ? 'md:mr-96' : ''} ${(notesOpen || scenariosOpen) ? 'md:ml-80' : ''}`}>
          {user.type === 'master' ? (
            <MasterDashboard />
          ) : (
            <CharacterSheet characterName={user.name} />
          )}
        </main>

        {/* Notes Sidebar (left) */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-full md:w-80 transform transition-transform
                      duration-300 ${notesOpen ? 'translate-x-0' : '-translate-x-full'}
                      ${sidebarTop} bg-white dark:bg-gray-900 border-r border-achtung-green/20
                      dark:border-achtung-green/10 shadow-2xl`}
        >
          <NotesPanel
            onClose={() => setNotesOpen(false)}
            owner={user.type === 'master' ? 'master' : user.name}
          />
        </div>

        {/* Scenarios Sidebar (left) - master only */}
        {user.type === 'master' && (
          <div
            className={`fixed inset-y-0 left-0 z-30 w-full md:w-80 transform transition-transform
                        duration-300 ${scenariosOpen ? 'translate-x-0' : '-translate-x-full'}
                        ${sidebarTop} bg-white dark:bg-gray-900 border-r border-achtung-green/20
                        dark:border-achtung-green/10 shadow-2xl`}
          >
            <ScenariosPanel
              onClose={() => setScenariosOpen(false)}
              activeScenario={activeScenario}
              onViewScenario={setViewingScenario}
            />
          </div>
        )}

        {/* Chat Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 z-30 w-full md:w-96 transform transition-transform
                      duration-300 ${chatOpen ? 'translate-x-0' : 'translate-x-full'}
                      ${sidebarTop} bg-white dark:bg-gray-900 border-l border-achtung-green/20
                      dark:border-achtung-green/10 shadow-2xl`}
        >
          <Chat
            senderName={user.type === 'master' ? 'Mestre' : user.name}
            onClose={() => setChatOpen(false)}
            isVisible={chatOpen}
          />
        </div>

        {/* Overlay for mobile */}
        {chatOpen && (
          <div
            className={`fixed inset-0 bg-black/50 z-20 md:hidden ${sidebarTop}`}
            onClick={() => setChatOpen(false)}
          />
        )}
        {notesOpen && (
          <div
            className={`fixed inset-0 bg-black/50 z-20 md:hidden ${sidebarTop}`}
            onClick={() => setNotesOpen(false)}
          />
        )}
        {scenariosOpen && (
          <div
            className={`fixed inset-0 bg-black/50 z-20 md:hidden ${sidebarTop}`}
            onClick={() => setScenariosOpen(false)}
          />
        )}
      </div>

      {/* Scenario Viewer - master only */}
      {viewingScenario && (
        <ScenarioViewer
          scenario={viewingScenario}
          onClose={() => setViewingScenario(null)}
          activeScenario={activeScenario}
        />
      )}

      {/* Scenario Display - players */}
      {user.type === 'player' && (
        <ScenarioDisplay
          activeScenario={activeScenario}
          isTargeted={!!(activeScenario?.shownTo?.includes(user.name) && activeScenario?.imageUrl)}
        />
      )}

      {/* Tests Popup - master only */}
      {testsOpen && user.type === 'master' && (
        <TestsPopup onClose={() => setTestsOpen(false)} />
      )}
    </div>
  )
}
