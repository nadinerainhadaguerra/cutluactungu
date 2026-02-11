import { db } from './firebase'
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc,
  collection, getDocs, addDoc, query, orderBy, writeBatch,
  onSnapshot,
} from 'firebase/firestore'
import { createCharacterTemplate } from '../utils/characterTemplate'

// Firestore collections
const CHARACTERS_COL = 'characters'
const MESSAGES_COL = 'messages'
const CONFIG_DOC = doc(db, 'config', 'settings')

export const storage = {
  // --- Config / Master Password ---
  async getMasterPassword() {
    const snap = await getDoc(CONFIG_DOC)
    return snap.exists() ? (snap.data().masterPassword || 'NadineAmelhor') : 'NadineAmelhor'
  },

  async setMasterPassword(password) {
    await setDoc(CONFIG_DOC, { masterPassword: password }, { merge: true })
  },

  // --- Momentum ---
  async getMomentum() {
    const snap = await getDoc(CONFIG_DOC)
    if (snap.exists() && typeof snap.data().momentum === 'number') {
      return snap.data().momentum
    }
    return 0
  },

  async setMomentum(value) {
    const clamped = Math.max(0, Math.min(6, value))
    await setDoc(CONFIG_DOC, { momentum: clamped }, { merge: true })
  },

  // --- Characters ---
  async getCharacters() {
    const snap = await getDocs(collection(db, CHARACTERS_COL))
    return snap.docs.map(d => d.data())
  },

  async getCharacter(name) {
    const snap = await getDoc(doc(db, CHARACTERS_COL, name))
    return snap.exists() ? snap.data() : null
  },

  async characterExists(name) {
    // Check case-insensitive by fetching all names
    const chars = await this.getCharacters()
    return chars.some(c => c.name.toLowerCase() === name.toLowerCase())
  },

  async createCharacter(name, password) {
    const character = createCharacterTemplate(name, password)
    await setDoc(doc(db, CHARACTERS_COL, name), character)
    return character
  },

  async saveCharacter(character) {
    character.updatedAt = new Date().toISOString()
    await setDoc(doc(db, CHARACTERS_COL, character.name), character)
  },

  async deleteCharacter(name) {
    await deleteDoc(doc(db, CHARACTERS_COL, name))
  },

  async getCharacterNames() {
    const chars = await this.getCharacters()
    return chars.map(c => c.name)
  },

  // --- Messages ---
  async getMessages() {
    const q = query(collection(db, MESSAGES_COL), orderBy('timestamp', 'asc'))
    const snap = await getDocs(q)
    return snap.docs.map(d => d.data())
  },

  async saveMessage(message) {
    await addDoc(collection(db, MESSAGES_COL), message)
  },

  async clearMessages() {
    const snap = await getDocs(collection(db, MESSAGES_COL))
    const batch = writeBatch(db)
    snap.docs.forEach(d => batch.delete(d.ref))
    await batch.commit()
  },

  // --- Real-time listeners ---
  onMessagesChanged(callback) {
    const q = query(collection(db, MESSAGES_COL), orderBy('timestamp', 'asc'))
    return onSnapshot(q, snap => {
      callback(snap.docs.map(d => d.data()))
    })
  },

  onMomentumChanged(callback) {
    return onSnapshot(CONFIG_DOC, snap => {
      if (snap.exists() && typeof snap.data().momentum === 'number') {
        callback(snap.data().momentum)
      } else {
        callback(0)
      }
    })
  },

  onCharactersChanged(callback) {
    return onSnapshot(collection(db, CHARACTERS_COL), snap => {
      callback(snap.docs.map(d => d.data()))
    })
  },

  onCharacterChanged(name, callback) {
    return onSnapshot(doc(db, CHARACTERS_COL, name), snap => {
      callback(snap.exists() ? snap.data() : null)
    })
  },
}
