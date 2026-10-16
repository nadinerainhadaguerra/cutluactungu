import { useRef, useCallback, useEffect, useState } from 'react'
import { useSheet } from '../hooks/useSheet'
import { mdsStorage } from '../services/mdsStorage'
import { CARTILHAS_BY_ID } from '../data/cartilhas'
import MdsSheet from './sheet/MdsSheet'
import { rollMove } from '../utils/dice'

// Tela de uma ficha: carrega em tempo real, salva automaticamente e rola dados no chat.
export default function SheetScreen({ sheetId, onBack, backLabel, masters, onRolled, onSheetInfo, onNewSheet }) {
  const { sheet, update, saving } = useSheet(sheetId)
  const nameTimer = useRef(null)
  const [others, setOthers] = useState([])

  // Outros caçadores da mesma mesa (de outros jogadores), para o histórico
  const mestre = sheet?.mestre || ''
  const owner = sheet?.owner || ''
  useEffect(() => {
    if (!mestre) { setOthers([]); return undefined }
    return mdsStorage.onSheetsByMestre(mestre, list => setOthers(list.filter(s => s._id !== sheetId && s.owner !== owner)))
  }, [mestre, owner, sheetId])

  const changeCartilha = useCallback((cartilha) => {
    mdsStorage.updateSheetMeta(sheetId, { cartilha }).catch(() => {})
  }, [sheetId])

  useEffect(() => { onSheetInfo?.(sheet || null) }, [sheet, onSheetInfo])
  useEffect(() => () => clearTimeout(nameTimer.current), [])

  const updateName = useCallback((name) => {
    clearTimeout(nameTimer.current)
    nameTimer.current = setTimeout(() => {
      if (name.trim()) mdsStorage.updateSheetMeta(sheetId, { name: name.trim() }).catch(() => {})
    }, 600)
  }, [sheetId])

  const onRoll = useCallback(async (stat) => {
    if (!sheet) return
    const mod = Number(sheet.data?.stats?.[stat.key]) || 0
    const r = rollMove(mod)
    try {
      await mdsStorage.sendMessage({
        type: 'move', label: `+${stat.name}`, ...r,
        sender: sheet.name, mestre: sheet.mestre || '',
      })
      onRolled?.(sheet.mestre || '')
    } catch { /* toast */ }
  }, [sheet, onRolled])

  if (sheet === undefined) {
    return <div className="text-center py-20 text-mds-700 dark:text-mds-200">Carregando ficha…</div>
  }
  if (sheet === null) {
    return (
      <div className="text-center py-20 space-y-3">
        <p>Esta ficha não existe mais.</p>
        <button onClick={onBack} className="mds-btn">{backLabel}</button>
      </div>
    )
  }

  const cartilha = CARTILHAS_BY_ID[sheet.cartilha]

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={onBack} className="mds-btn-ghost text-sm">← {backLabel}</button>
        <div className="text-sm text-mds-800 dark:text-mds-200">
          <span className="font-semibold">{cartilha?.titulo || sheet.cartilha}</span>
          <span className="opacity-60"> · jogador {sheet.owner}</span>
        </div>
        <label className="text-sm flex items-center gap-1.5 ml-auto">
          <span className="opacity-70">Mestre:</span>
          <select
            value={sheet.mestre || ''}
            onChange={e => mdsStorage.updateSheetMeta(sheetId, { mestre: e.target.value }).catch(() => {})}
            className="mds-input !w-auto !py-1 !px-2 text-sm"
          >
            <option value="">Sem mestre</option>
            {masters.map(m => <option key={m} value={m}>{m}</option>)}
            {sheet.mestre && !masters.includes(sheet.mestre) && <option value={sheet.mestre}>{sheet.mestre}</option>}
          </select>
        </label>
        <span className={`text-xs ${saving ? 'text-amber-600' : 'text-emerald-600 dark:text-emerald-400'}`}>
          {saving ? 'Salvando…' : 'Salvo'}
        </span>
      </div>
      {cartilha ? (
        <MdsSheet cartilha={cartilha} sheet={sheet} update={update} updateName={updateName} onRoll={onRoll}
                  others={others} onChangeCartilha={changeCartilha}
                  onNewSheet={onNewSheet ? () => onNewSheet({ owner: sheet.owner, mestre: sheet.mestre || '' }) : undefined} />
      ) : (
        <p className="text-red-500">Cartilha desconhecida: {sheet.cartilha}</p>
      )}
    </div>
  )
}
