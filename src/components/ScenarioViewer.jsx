import { useState, useEffect, useCallback } from 'react'
import { storage } from '../services/storage'

export default function ScenarioViewer({ scenario, onClose, activeScenario }) {
  const isActive = activeScenario?.scenarioId === scenario._id
  const [currentIndex, setCurrentIndex] = useState(
    isActive ? (activeScenario.imageIndex ?? 0) : 0
  )
  const images = scenario.images || []

  const navigateTo = useCallback(async (index) => {
    if (index < 0 || index >= images.length) return
    setCurrentIndex(index)
    if (isActive) {
      await storage.updateActiveImage(images[index], index)
    }
  }, [images, isActive])

  const handleClose = useCallback(async () => {
    if (isActive) await storage.hideScenario()
    onClose()
  }, [isActive, onClose])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') navigateTo(currentIndex - 1)
    else if (e.key === 'ArrowRight') navigateTo(currentIndex + 1)
    else if (e.key === 'Escape') handleClose()
  }, [currentIndex, navigateTo, handleClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="fixed inset-0 bg-black/92 z-[9998] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-white font-gothic text-xl">{scenario.title}</span>
          {isActive && (
            <span className="text-xs bg-achtung-green text-white px-2.5 py-0.5 rounded-full font-medium">
              Exibindo para {activeScenario.shownTo?.length || 0} jogador(es)
            </span>
          )}
        </div>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
          title="Fechar (Esc)"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 gap-3 px-4 pb-4 overflow-hidden">
        {/* Main image + arrows */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <button
            onClick={() => navigateTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="flex-shrink-0 p-2 rounded-lg text-white hover:bg-white/20
                       disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex-1 flex items-center justify-center h-full min-w-0">
            {images[currentIndex] ? (
              <img
                src={images[currentIndex]}
                alt={`${scenario.title} ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />
            ) : (
              <p className="text-gray-500 text-sm">Imagem não disponível</p>
            )}
          </div>

          <button
            onClick={() => navigateTo(currentIndex + 1)}
            disabled={currentIndex >= images.length - 1}
            className="flex-shrink-0 p-2 rounded-lg text-white hover:bg-white/20
                       disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail strip — only if multiple images */}
        {images.length > 1 && (
          <div className="w-24 flex-shrink-0 overflow-y-auto space-y-2 py-1">
            {images.map((url, i) => (
              <button
                key={i}
                onClick={() => navigateTo(i)}
                className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all
                  ${i === currentIndex
                    ? 'border-achtung-green scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-white/40'
                  }`}
              >
                <img
                  src={url}
                  alt={`Miniatura ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none' }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
