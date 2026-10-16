import { useState, useEffect, useMemo, useCallback } from 'react'
import { useMdsAuth } from '../contexts/MdsAuthContext'
import { useMdsMasters } from '../contexts/MdsMasterContext'
import { mdsStorage } from '../services/mdsStorage'
import SystemSwitchButton from '../../components/SystemSwitchButton'
import { MdsThemeToggle, MdsModal } from './common'
import { CartilhasButton } from './CartilhasPopup'
import SheetList, { NewSheetModal } from './SheetList'
import SheetScreen from './SheetScreen'
import MdsChat from './MdsChat'
import MdsNotes from './MdsNotes'
import MdsScenariosPanel, { MdsScenarioViewer, MdsScenarioDisplay } from './MdsScenarios'

const Icon = ({ d }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
)
const ICONS = {
  notes: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  chat: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  scenes: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
}

function AddMasterModal({ onClose }) {
  const { addMaster, setActiveMaster } = useMdsMasters()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    const r = await addMaster(name)
    if (!r.success) { setError(r.error); return }
    setActiveMaster(r.name)
    onClose()
  }
  return (
    <MdsModal title="Novo Mestre" onClose={onClose}>
      <form onSubmit={submit} className="p-5 space-y-3">
        <input autoFocus value={name} onChange={e => setName(e.target.value)} placeholder="Nome do Mestre" className="mds-input" />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={!name.trim()} className="mds-btn w-full">Adicionar</button>
      </form>
    </MdsModal>
  )
}

function Sidebar({ open, side, width, children }) {
  const pos = side === 'left'
    ? `left-0 border-r ${open ? 'translate-x-0' : '-translate-x-full'}`
    : `right-0 border-l ${open ? 'translate-x-0' : 'translate-x-full'}`
  return (
    <div className={`fixed top-[57px] bottom-0 z-30 w-full ${width} transform transition-transform duration-300 ${pos}
                     bg-white dark:bg-mds-950 border-mds-200 dark:border-mds-800 shadow-2xl`}>
      {open && children}
    </div>
  )
}

export default function MdsLayout() {
  const { user, logout } = useMdsAuth()
  const { masters, activeMaster, setActiveMaster } = useMdsMasters()
  const isMaster = user.type === 'master'

  const [sheets, setSheets] = useState([])
  const [sheetsLoaded, setSheetsLoaded] = useState(false)
  const [openSheetId, setOpenSheetId] = useState(null)
  const [openSheet, setOpenSheet] = useState(null)
  const [newSheet, setNewSheet] = useState(null) // { owner, mestre } da nova ficha
  const [addMaster, setAddMaster] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [scenesOpen, setScenesOpen] = useState(false)
  const [viewingScenario, setViewingScenario] = useState(null)
  const [playerMesa, setPlayerMesa] = useState(null)
  const [actives, setActives] = useState({}) // mestre -> cenário ativo

  // Fichas: do jogador (dono) ou da mesa do mestre ativo
  useEffect(() => {
    setSheetsLoaded(false)
    setSheets([])
    const done = list => { setSheets(list); setSheetsLoaded(true) }
    if (isMaster) {
      if (!activeMaster) return undefined
      return mdsStorage.onSheetsByMestre(activeMaster, done)
    }
    return mdsStorage.onSheetsByOwner(user.name, done)
  }, [isMaster, activeMaster, user.name])

  // Volta para a lista ao trocar de mestre
  useEffect(() => { if (isMaster) setOpenSheetId(null) }, [activeMaster, isMaster])

  // Mesas do jogador = mestres das suas fichas
  const mesas = useMemo(() => {
    if (isMaster) return []
    return [...new Set(sheets.map(s => s.mestre || ''))].sort((a, b) => a.localeCompare(b, 'pt-BR'))
  }, [isMaster, sheets])

  const chatMesa = isMaster
    ? activeMaster
    : (openSheet ? (openSheet.mestre || '') : (mesas.includes(playerMesa) ? playerMesa : (mesas[0] ?? null)))

  // Cenário ativo: mestre acompanha o seu; jogador acompanha todas as suas mesas
  const scenarioMestres = useMemo(
    () => (isMaster ? (activeMaster ? [activeMaster] : []) : mesas.filter(Boolean)),
    [isMaster, activeMaster, mesas],
  )
  useEffect(() => {
    const unsubs = scenarioMestres.map(m => mdsStorage.onActiveScenarioChanged(m, a => setActives(prev => ({ ...prev, [m]: a }))))
    return () => unsubs.forEach(u => u())
  }, [scenarioMestres.join('|')]) // eslint-disable-line react-hooks/exhaustive-deps

  const playersOfMesa = useMemo(() => [...new Set(sheets.map(s => s.owner))].sort((a, b) => a.localeCompare(b, 'pt-BR')), [sheets])

  const deleteSheet = async (s) => {
    if (!confirm(`Excluir a ficha "${s.name}"? Isso não pode ser desfeito.`)) return
    try { await mdsStorage.deleteSheet(s._id) } catch { /* toast */ }
  }

  const onSheetInfo = useCallback((s) => setOpenSheet(s), [])
  const onRolled = useCallback(() => setChatOpen(true), [])

  const toggleLeft = (which) => {
    setNotesOpen(which === 'notes' ? !notesOpen : false)
    setScenesOpen(which === 'scenes' ? !scenesOpen : false)
  }

  const notesOwner = isMaster ? `master_${activeMaster || ''}` : `player_${user.name}`
  const senderName = isMaster ? `Mestre ${activeMaster || ''}`.trim() : (openSheet?.name || user.name)
  const playerActive = !isMaster
    ? Object.values(actives).find(a => a?.imageUrl && a.shownTo?.includes(user.name)) || null
    : null

  return (
    <div className="min-h-screen flex flex-col">
      <header className="mds-header-bar sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <SystemSwitchButton />
            <h1 className="font-mds-title text-2xl sm:text-3xl tracking-wide leading-none truncate">
              <span className="hidden sm:inline">Monstro da Semana</span>
              <span className="sm:hidden">MdS</span>
            </h1>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {isMaster ? (
              <div className="flex items-center gap-1.5">
                <select value={activeMaster || ''} onChange={e => setActiveMaster(e.target.value || null)}
                        className="text-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 outline-none max-w-[150px]">
                  <option value="" className="bg-mds-900">Selecionar Mestre...</option>
                  {masters.map(m => <option key={m} value={m} className="bg-mds-900">{m}</option>)}
                </select>
                <button onClick={() => setAddMaster(true)} title="Adicionar Mestre"
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/25 border border-white/20 font-bold">+</button>
              </div>
            ) : (
              <span className="hidden sm:inline text-sm text-white/85">{user.name}</span>
            )}

            {isMaster && activeMaster && (
              <button onClick={() => toggleLeft('scenes')} className="mds-icon-btn" title="Cenários"><Icon d={ICONS.scenes} /></button>
            )}
            {(!isMaster || activeMaster) && (
              <>
                <button onClick={() => toggleLeft('notes')} className="mds-icon-btn" title="Notas"><Icon d={ICONS.notes} /></button>
                <button onClick={() => setChatOpen(!chatOpen)} className="mds-icon-btn" title="Chat & Dados"><Icon d={ICONS.chat} /></button>
              </>
            )}
            <CartilhasButton />
            <MdsThemeToggle />
            <button onClick={logout} className="px-3 py-1.5 text-sm rounded-lg bg-red-600/80 hover:bg-red-600 transition-colors">Sair</button>
          </div>
        </div>
      </header>

      {isMaster && !activeMaster && (
        <div className="bg-amber-400/15 border-b border-amber-500/30 px-4 py-2 text-center text-sm text-amber-800 dark:text-amber-200">
          {masters.length === 0
            ? 'Nenhum perfil de Mestre ainda — clique em + no topo para criar o seu.'
            : 'Selecione um perfil de Mestre no menu acima para ver as fichas da sua mesa.'}
        </div>
      )}

      <main className={`flex-1 transition-all duration-300 ${chatOpen ? 'md:mr-96' : ''} ${(notesOpen || scenesOpen) ? 'md:ml-80' : ''}`}>
        <div className="max-w-screen-2xl mx-auto p-3 sm:p-5">
          {openSheetId ? (
            <SheetScreen
              sheetId={openSheetId}
              masters={masters}
              backLabel={isMaster ? 'Fichas da mesa' : 'Minhas fichas'}
              onBack={() => { setOpenSheetId(null); setOpenSheet(null) }}
              onRolled={onRolled}
              onSheetInfo={onSheetInfo}
              onNewSheet={setNewSheet}
            />
          ) : isMaster ? (
            activeMaster && (
              <SheetList
                title={`Mesa de ${activeMaster}`}
                sheets={sheets}
                loading={!sheetsLoaded}
                showOwner
                onOpen={setOpenSheetId}
                emptyText="Nenhum jogador escolheu você como mestre ainda. Quando criarem fichas com o seu nome, elas aparecem aqui."
              />
            )
          ) : (
            <SheetList
              title="Minhas fichas"
              sheets={sheets}
              loading={!sheetsLoaded}
              onOpen={setOpenSheetId}
              onNew={() => setNewSheet({ owner: user.name, mestre: mesas.find(Boolean) || '' })}
              onDelete={deleteSheet}
              emptyText="Você ainda não tem fichas. Clique em “+ Nova ficha” para escolher uma cartilha."
            />
          )}
        </div>
      </main>

      <Sidebar open={notesOpen} side="left" width="md:w-80">
        <MdsNotes owner={notesOwner} onClose={() => setNotesOpen(false)} />
      </Sidebar>
      {isMaster && activeMaster && (
        <Sidebar open={scenesOpen} side="left" width="md:w-80">
          <MdsScenariosPanel mestre={activeMaster} players={playersOfMesa} active={actives[activeMaster]}
                             onView={setViewingScenario} onClose={() => setScenesOpen(false)} />
        </Sidebar>
      )}
      <Sidebar open={chatOpen} side="right" width="md:w-96">
        <MdsChat
          senderName={senderName}
          isMaster={isMaster}
          mesa={chatMesa}
          mesas={openSheet ? [] : mesas}
          onMesaChange={setPlayerMesa}
          stats={openSheet?.data?.stats || (openSheet ? {} : null)}
          onClose={() => setChatOpen(false)}
        />
      </Sidebar>

      {newSheet && (
        <NewSheetModal
          owner={newSheet.owner}
          masters={masters}
          defaultMestre={newSheet.mestre}
          onClose={() => setNewSheet(null)}
          onCreated={id => { setNewSheet(null); setOpenSheetId(id) }}
        />
      )}
      {addMaster && <AddMasterModal onClose={() => setAddMaster(false)} />}
      {viewingScenario && isMaster && (
        <MdsScenarioViewer scenario={viewingScenario} active={actives[activeMaster]} mestre={activeMaster}
                           onClose={() => setViewingScenario(null)} />
      )}
      {!isMaster && <MdsScenarioDisplay active={playerActive} playerName={user.name} />}
    </div>
  )
}
