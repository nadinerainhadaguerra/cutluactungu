import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import CharacterSheet from './CharacterSheet'
import MasterDashboard from './MasterDashboard'
import Chat from './Chat'

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
  const [chatOpen, setChatOpen] = useState(false)

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
      </header>

      {/* Main Content */}
      <div className="flex-1 flex relative">
        <main className={`flex-1 transition-all duration-300 ${chatOpen ? 'lg:mr-80' : ''}`}>
          {user.type === 'master' ? (
            <MasterDashboard />
          ) : (
            <CharacterSheet characterName={user.name} />
          )}
        </main>

        {/* Chat Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 z-30 w-full sm:w-96 lg:w-80 transform transition-transform
                      duration-300 ${chatOpen ? 'translate-x-0' : 'translate-x-full'}
                      top-[57px] bg-white dark:bg-gray-900 border-l border-achtung-green/20
                      dark:border-achtung-green/10 shadow-2xl`}
        >
          <Chat
            senderName={user.type === 'master' ? 'Mestre' : user.name}
            onClose={() => setChatOpen(false)}
          />
        </div>

        {/* Overlay for mobile */}
        {chatOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden top-[57px]"
            onClick={() => setChatOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
