import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useSubHeader } from '../contexts/SubHeaderContext'
import { useMasterProfile } from '../contexts/MasterProfileContext'
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

function AddMasterPopup({ onSave, onClose }) {
  const [name, setName] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) return
    onSave(name.trim())
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-xs
                      border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <span className="font-gothic text-xl">Novo Mestre</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Nome do Mestre"
            autoFocus
            className="w-full px-3 py-2 rounded-lg border-2 border-achtung-green-muted/30
                       dark:border-achtung-green/20 bg-white dark:bg-gray-800
                       text-gray-900 dark:text-gray-100 text-sm outline-none
                       focus:border-achtung-green transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg
              ${name.trim()
                ? 'bg-achtung-green hover:bg-achtung-green-dark text-white hover:shadow-xl active:scale-[0.98]'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

function ChangeMestrePopup({ masters, currentMestre, onSelect, onClose }) {
  return createPortal(
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4"
         onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-xs
                      border-2 border-achtung-green/30"
           onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-achtung-green/20
                        bg-achtung-green-dark text-white rounded-t-2xl">
          <span className="font-gothic text-xl">Alterar Mestre</span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-3 space-y-1">
          {masters.map(m => (
            <button
              key={m}
              onClick={() => { onSelect(m); onClose() }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${m === currentMestre
                  ? 'bg-achtung-green/20 text-achtung-green-dark dark:text-achtung-green-light'
                  : 'hover:bg-achtung-green/10 text-gray-700 dark:text-gray-300'
                }`}
            >
              {m === currentMestre && <span className="mr-1">✓</span>}{m}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Layout() {
  const { user, logout, updateMestre } = useAuth()
  const { subHeader } = useSubHeader()
  const { masters, activeMaster, setActiveMaster, addMaster } = useMasterProfile()
  const [chatOpen, setChatOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [scenariosOpen, setScenariosOpen] = useState(false)
  const [testsOpen, setTestsOpen] = useState(false)
  const [viewingScenario, setViewingScenario] = useState(null)
  const [activeScenario, setActiveScenario] = useState(null)
  const [showAddMaster, setShowAddMaster] = useState(false)
  const [showChangeMestre, setShowChangeMestre] = useState(false)
  const [showChangePlayerMestre, setShowChangePlayerMestre] = useState(false)

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

  const sidebarTop = subHeader ? 'top-[94px]' : 'top-[57px]'

  // Which master to use as notes owner
  const notesOwner = user.type === 'master'
    ? (activeMaster ? `master_${activeMaster}` : 'master')
    : user.name

  // Mestre name shown in subheader badge (character's assigned mestre)
  const subHeaderMestre = subHeader?.characterMestre || null
  const subHeaderCharName = subHeader?.characterName || null
  const subHeaderIsNpc = subHeader?.isNpc || false

  const handleChangeMestre = async (newMestre) => {
    if (!subHeaderCharName) return
    if (subHeaderIsNpc) {
      await storage.setNpcMestre(subHeaderCharName, newMestre)
    } else {
      await storage.setCharacterMestre(subHeaderCharName, newMestre)
    }
  }

  const handleChangePlayerMestre = async (newMestre) => {
    await storage.setCharacterMestre(user.name, newMestre)
    updateMestre(newMestre)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-achtung-green-dark dark:bg-gray-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-gothic text-xl sm:text-2xl">Achtung! Cthulhu</h1>
            <span className="hidden sm:inline text-xs text-white/60 uppercase tracking-wider">2d20</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {user.type === 'master' ? (
              <div className="flex items-center gap-1.5">
                <select
                  value={activeMaster || ''}
                  onChange={e => setActiveMaster(e.target.value || null)}
                  className="text-sm bg-white/10 hover:bg-white/20 border border-white/20
                             rounded-lg px-3 py-1.5 text-white outline-none cursor-pointer
                             transition-colors appearance-none min-w-[130px]"
                >
                  <option value="" className="bg-gray-800 text-white">Selecionar Mestre...</option>
                  {masters.map(m => (
                    <option key={m} value={m} className="bg-gray-800 text-white">{m}</option>
                  ))}
                </select>
                <button
                  onClick={() => setShowAddMaster(true)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg
                             bg-white/10 hover:bg-white/25 border border-white/20
                             text-white font-bold text-lg transition-colors"
                  title="Adicionar Mestre"
                >
                  +
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                {user.mestre && (
                  <button
                    onClick={() => setShowChangePlayerMestre(true)}
                    className="text-sm font-semibold text-achtung-green-light hover:text-white
                               transition-colors"
                    title="Clique para alterar o Mestre desta ficha"
                  >
                    {user.mestre}
                  </button>
                )}
                <span className="text-sm text-white/80">{user.name}</span>
              </div>
            )}

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
              className="px-3 py-1.5 text-sm rounded-lg bg-red-600/80 hover:bg-red-600 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Secondary bar: back navigation + mestre badge when master views a character */}
        {subHeader && (
          <div className="border-t border-white/10">
            <div className="max-w-screen-2xl mx-auto px-4 py-2 flex items-center gap-3">
              <button
                onClick={subHeader.onBack}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {subHeader.label}
              </button>
              {subHeaderMestre && (
                <button
                  onClick={() => setShowChangeMestre(true)}
                  className="text-sm font-semibold text-achtung-green-light hover:text-white
                             transition-colors underline underline-offset-2"
                  title="Clique para alterar o Mestre desta ficha"
                >
                  {subHeaderMestre}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Master selector required notice */}
      {user.type === 'master' && !activeMaster && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/30 px-4 py-2 text-center">
          <span className="text-sm text-yellow-700 dark:text-yellow-300">
            Selecione um perfil de Mestre no menu acima para acessar o painel.
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex relative">
        <main className={`flex-1 transition-all duration-300 ${chatOpen ? 'md:mr-96' : ''} ${(notesOpen || scenariosOpen) ? 'md:ml-80' : ''}`}>
          {user.type === 'master' ? (
            activeMaster ? <MasterDashboard activeMaster={activeMaster} /> : null
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
            owner={notesOwner}
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
              activeMaster={activeMaster}
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
            mestre={user.type === 'master' ? activeMaster : user.mestre}
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

      {/* Add Master Popup */}
      {showAddMaster && (
        <AddMasterPopup
          onSave={addMaster}
          onClose={() => setShowAddMaster(false)}
        />
      )}

      {/* Change Mestre Popup (subheader badge click — master view) */}
      {showChangeMestre && subHeaderMestre !== null && (
        <ChangeMestrePopup
          masters={masters}
          currentMestre={subHeaderMestre}
          onSelect={handleChangeMestre}
          onClose={() => setShowChangeMestre(false)}
        />
      )}

      {/* Change Mestre Popup (header badge click — player view) */}
      {showChangePlayerMestre && user.type === 'player' && (
        <ChangeMestrePopup
          masters={masters}
          currentMestre={user.mestre}
          onSelect={handleChangePlayerMestre}
          onClose={() => setShowChangePlayerMestre(false)}
        />
      )}
    </div>
  )
}
