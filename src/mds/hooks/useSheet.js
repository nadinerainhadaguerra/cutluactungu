import { useState, useEffect, useRef, useCallback } from 'react'
import { mdsStorage } from '../services/mdsStorage'

const SAVE_DELAY = 500

// Grava `value` no caminho "a.b.c" de uma cópia do objeto.
function setIn(obj, path, value) {
  const keys = path.split('.')
  const root = { ...(obj || {}) }
  let cur = root
  keys.slice(0, -1).forEach(k => {
    cur[k] = { ...(cur[k] || {}) }
    cur = cur[k]
  })
  cur[keys[keys.length - 1]] = value
  return root
}

// Carrega uma ficha em tempo real e salva alterações com atraso curto.
// Edições locais pendentes têm prioridade sobre o que chega do servidor,
// para o texto não "pular" enquanto a pessoa digita.
export function useSheet(sheetId) {
  const [sheet, setSheet] = useState(undefined) // undefined = carregando, null = não existe
  const [saving, setSaving] = useState(false)
  const pending = useRef({})
  const timer = useRef(null)

  const applyPending = (base) => {
    let data = base?.data || {}
    for (const [path, value] of Object.entries(pending.current)) data = setIn(data, path, value)
    return base ? { ...base, data } : base
  }

  const flush = useCallback(async () => {
    clearTimeout(timer.current)
    const patch = pending.current
    if (!sheetId || Object.keys(patch).length === 0) return
    pending.current = {}
    setSaving(true)
    try {
      await mdsStorage.updateSheetData(sheetId, patch)
    } catch {
      // erro já exibido pelo toast; devolve as alterações para tentar de novo
      pending.current = { ...patch, ...pending.current }
    } finally {
      setSaving(false)
    }
  }, [sheetId])

  useEffect(() => {
    if (!sheetId) return undefined
    setSheet(undefined)
    const unsub = mdsStorage.onSheetChanged(sheetId, (doc) => {
      setSheet(applyPending(doc))
    })
    return () => {
      unsub()
      flush()
    }
  }, [sheetId, flush])

  // Salva o que estiver pendente se a aba for fechada
  useEffect(() => {
    const onHide = () => flush()
    window.addEventListener('beforeunload', onHide)
    return () => window.removeEventListener('beforeunload', onHide)
  }, [flush])

  const update = useCallback((path, value) => {
    // O Firestore recusa "a" e "a.b" na mesma gravação: funde caminhos pai/filho.
    const next = {}
    let merged = false
    for (const [p, v] of Object.entries(pending.current)) {
      if (p.startsWith(`${path}.`)) continue // o novo valor substitui o filho
      if (path.startsWith(`${p}.`)) {
        next[p] = setIn(v, path.slice(p.length + 1), value) // grava dentro do pai pendente
        merged = true
      } else {
        next[p] = v
      }
    }
    if (!merged) next[path] = value
    pending.current = next
    setSheet(prev => (prev ? { ...prev, data: setIn(prev.data, path, value) } : prev))
    clearTimeout(timer.current)
    timer.current = setTimeout(flush, SAVE_DELAY)
  }, [flush])

  return { sheet, update, saving, flush }
}
