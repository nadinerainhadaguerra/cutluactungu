// Camada de dados da área Monstro da Semana.
// Usa SOMENTE coleções com prefixo "mds_" — nunca lê nem grava dados do Achtung.
// Consultas usam no máximo um filtro de igualdade e ordenam no cliente, para não
// depender de índices compostos do Firestore (sem índice a lista viria vazia).
import { db } from '../../services/firebase'
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc,
  collection, addDoc, query, where, onSnapshot,
} from 'firebase/firestore'

const COL = {
  masters: 'mds_masters',
  players: 'mds_players',
  sheets: 'mds_sheets',
  messages: 'mds_messages',
  notes: 'mds_notes',
  scenarios: 'mds_scenarios',
  config: 'mds_config',
}

const DEFAULT_PASSWORD = 'NadineAmelhor'
const settingsDoc = () => doc(db, COL.config, 'settings')
const activeScenarioDoc = (mestre) => doc(db, COL.config, `activeScenario_${mestre || '_'}`)

// ---- Aviso de erros para a interface (toast) ----
export function reportMdsError(context, error) {
  console.error(`[MdS] ${context}:`, error)
  window.dispatchEvent(new CustomEvent('mds-error', {
    detail: { context, message: error?.message || String(error) },
  }))
}

// Envolve operações async: registra e repassa o erro para a interface, e relança.
async function guard(context, fn) {
  try {
    return await fn()
  } catch (error) {
    reportMdsError(context, error)
    throw error
  }
}

function listen(context, q, map, callback) {
  return onSnapshot(
    q,
    snap => callback(map(snap)),
    error => reportMdsError(context, error),
  )
}

const byDateDesc = (field) => (a, b) => (b[field] || '').localeCompare(a[field] || '')
const byDateAsc = (field) => (a, b) => (a[field] || '').localeCompare(b[field] || '')
const docsWithId = (snap) => snap.docs.map(d => ({ ...d.data(), _id: d.id }))
const nowIso = () => new Date().toISOString()

export const mdsStorage = {
  // ---------- Senha ----------
  async getPassword() {
    return guard('Ler senha', async () => {
      const snap = await getDoc(settingsDoc())
      return (snap.exists() && snap.data().password) || DEFAULT_PASSWORD
    })
  },

  // ---------- Mestres ----------
  onMastersChanged(callback) {
    return listen('Carregar mestres', collection(db, COL.masters),
      snap => snap.docs.map(d => d.data().name).filter(Boolean).sort((a, b) => a.localeCompare(b, 'pt-BR')),
      callback)
  },

  async createMaster(name) {
    return guard('Criar mestre', () => setDoc(doc(db, COL.masters, name), { name, createdAt: nowIso() }))
  },

  // ---------- Jogadores (logins) ----------
  onPlayersChanged(callback) {
    return listen('Carregar jogadores', collection(db, COL.players),
      snap => snap.docs.map(d => d.data().name).filter(Boolean).sort((a, b) => a.localeCompare(b, 'pt-BR')),
      callback)
  },

  async playerExists(name) {
    return guard('Verificar jogador', async () => (await getDoc(doc(db, COL.players, name))).exists())
  },

  async createPlayer(name) {
    return guard('Criar jogador', () => setDoc(doc(db, COL.players, name), { name, createdAt: nowIso() }))
  },

  // ---------- Fichas ----------
  async createSheet({ owner, mestre, name, cartilha }) {
    return guard('Criar ficha', async () => {
      const ref = await addDoc(collection(db, COL.sheets), {
        owner, mestre: mestre || '', name, cartilha,
        data: {}, createdAt: nowIso(), updatedAt: nowIso(),
      })
      return ref.id
    })
  },

  // Atualiza campos de dados da ficha. `patch` usa caminhos "data.x" do Firestore.
  async updateSheetData(id, patch) {
    const prefixed = Object.fromEntries(Object.entries(patch).map(([k, v]) => [`data.${k}`, v]))
    return guard('Salvar ficha', () => updateDoc(doc(db, COL.sheets, id), { ...prefixed, updatedAt: nowIso() }))
  },

  async updateSheetMeta(id, meta) {
    return guard('Salvar ficha', () => updateDoc(doc(db, COL.sheets, id), { ...meta, updatedAt: nowIso() }))
  },

  async deleteSheet(id) {
    return guard('Excluir ficha', () => deleteDoc(doc(db, COL.sheets, id)))
  },

  onSheetChanged(id, callback) {
    return onSnapshot(
      doc(db, COL.sheets, id),
      snap => callback(snap.exists() ? { ...snap.data(), _id: snap.id } : null),
      error => reportMdsError('Carregar ficha', error),
    )
  },

  onSheetsByOwner(owner, callback) {
    return listen('Carregar fichas', query(collection(db, COL.sheets), where('owner', '==', owner)),
      snap => docsWithId(snap).sort(byDateAsc('createdAt')), callback)
  },

  onSheetsByMestre(mestre, callback) {
    return listen('Carregar fichas do mestre', query(collection(db, COL.sheets), where('mestre', '==', mestre)),
      snap => docsWithId(snap).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')), callback)
  },

  // ---------- Chat ----------
  async sendMessage(message) {
    return guard('Enviar mensagem', () => addDoc(collection(db, COL.messages), { ...message, timestamp: nowIso() }))
  },

  onMessagesChanged(mestre, callback) {
    return listen('Carregar chat', query(collection(db, COL.messages), where('mestre', '==', mestre || '')),
      snap => docsWithId(snap).sort(byDateAsc('timestamp')), callback)
  },

  async deleteMessage(id) {
    return guard('Apagar mensagem', () => deleteDoc(doc(db, COL.messages, id)))
  },

  // ---------- Notas ----------
  async createNote(title, description, tag, owner) {
    return guard('Criar nota', () => addDoc(collection(db, COL.notes), {
      title, description, tag: tag || '', owner, createdAt: nowIso(),
    }))
  },

  async updateNote(id, title, description, tag) {
    return guard('Salvar nota', () => updateDoc(doc(db, COL.notes, id), { title, description, tag: tag || '' }))
  },

  async deleteNote(id) {
    return guard('Excluir nota', () => deleteDoc(doc(db, COL.notes, id)))
  },

  onNotesChanged(owner, callback) {
    return listen('Carregar notas', query(collection(db, COL.notes), where('owner', '==', owner)),
      snap => docsWithId(snap).sort(byDateDesc('createdAt')), callback)
  },

  // ---------- Cenários ----------
  async createScenario(scenario) {
    return guard('Criar cenário', () => addDoc(collection(db, COL.scenarios), { ...scenario, createdAt: nowIso() }))
  },

  async updateScenario(id, patch) {
    return guard('Salvar cenário', () => updateDoc(doc(db, COL.scenarios, id), patch))
  },

  async deleteScenario(id) {
    return guard('Excluir cenário', () => deleteDoc(doc(db, COL.scenarios, id)))
  },

  onScenariosChanged(mestre, callback) {
    return listen('Carregar cenários', query(collection(db, COL.scenarios), where('mestre', '==', mestre || '')),
      snap => docsWithId(snap).sort(byDateDesc('createdAt')), callback)
  },

  async setActiveScenario(mestre, active) {
    return guard('Mostrar cenário', () => setDoc(activeScenarioDoc(mestre), { active: active || null, updatedAt: nowIso() }))
  },

  onActiveScenarioChanged(mestre, callback) {
    return onSnapshot(
      activeScenarioDoc(mestre),
      snap => callback(snap.exists() ? snap.data().active || null : null),
      error => reportMdsError('Carregar cenário ativo', error),
    )
  },
}
