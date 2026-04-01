import { useState, useEffect, useRef } from 'react'

export default function ScenarioDisplay({ activeScenario, isTargeted }) {
  const [dismissed, setDismissed] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [lastImageUrl, setLastImageUrl] = useState(null)
  const prevTargeted = useRef(false)
  const prevScenarioId = useRef(null)

  useEffect(() => {
    if (isTargeted && activeScenario?.imageUrl) {
      const id = activeScenario.scenarioId
      // Reset when a new show session starts or a different scenario is shown
      if (!prevTargeted.current || id !== prevScenarioId.current) {
        setDismissed(false)
        setMinimized(false)
        prevScenarioId.current = id
      }
      setLastImageUrl(activeScenario.imageUrl)
    }
    prevTargeted.current = isTargeted
  }, [isTargeted, activeScenario?.imageUrl, activeScenario?.scenarioId])

  const imageUrl = (isTargeted ? activeScenario?.imageUrl : null) || lastImageUrl

  if (!imageUrl || dismissed) return null

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-4 right-4 z-[9990] w-16 h-16 rounded-xl overflow-hidden
                   border-2 border-achtung-green shadow-2xl hover:scale-105 transition-transform"
        title="Abrir cenário"
      >
        <img src={imageUrl} alt="Cenário" className="w-full h-full object-cover" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-[9990] bg-black/85 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={() => setMinimized(true)}
            className="p-1.5 bg-black/60 hover:bg-black/90 rounded-lg text-white transition-colors"
            title="Minimizar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          {!isTargeted && (
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 bg-black/60 hover:bg-black/90 rounded-lg text-white transition-colors"
              title="Fechar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <img
          src={imageUrl}
          alt="Cenário"
          className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />
      </div>
    </div>
  )
}
