import { useSystem, SYSTEMS } from '../contexts/SystemContext'

// Botão do canto superior esquerdo que alterna entre os sistemas de jogo.
// Mostra para qual sistema o clique leva.
export default function SystemSwitchButton({ className = '' }) {
  const { system, toggleSystem } = useSystem()
  const target = SYSTEMS[system === 'achtung' ? 'mds' : 'achtung']
  const toMds = target.id === 'mds'

  return (
    <button
      onClick={toggleSystem}
      title={`Trocar para ${target.name}`}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold
                  border transition-colors shadow-sm
                  ${toMds
                    ? 'bg-purple-700/90 hover:bg-purple-600 border-purple-400/40 text-white'
                    : 'bg-achtung-green-dark/90 hover:bg-achtung-green border-achtung-green-light/40 text-white'}
                  ${className}`}
    >
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4" />
      </svg>
      <span className="hidden sm:inline whitespace-nowrap">{target.name}</span>
      <span className="sm:hidden">{target.short}</span>
    </button>
  )
}
