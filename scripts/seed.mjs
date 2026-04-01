/**
 * Script de inicialização do banco de dados Firestore
 *
 * Uso: node scripts/seed.mjs
 *
 * O que faz:
 *   - Cria o documento config/settings com senha padrão e momentum inicial
 *   - Não sobrescreve dados existentes (usa merge)
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDNXCTlXKmiZgr2YBEjK58rMEEgsCnidEc',
  authDomain: 'cutuloactung.firebaseapp.com',
  projectId: 'cutuloactung',
  storageBucket: 'cutuloactung.firebasestorage.app',
  messagingSenderId: '777415049345',
  appId: '1:777415049345:web:f9245c722d15dbdc5e4d80',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seed() {
  console.log('Conectando ao Firestore...')

  const configRef = doc(db, 'config', 'settings')
  const snap = await getDoc(configRef)

  if (snap.exists()) {
    console.log('config/settings já existe:')
    console.log('  masterPassword:', snap.data().masterPassword)
    console.log('  momentum:', snap.data().momentum)
    console.log('\nNenhuma alteração feita.')
  } else {
    await setDoc(configRef, {
      masterPassword: 'NadineAmelhor',
      momentum: 0,
    })
    console.log('config/settings criado com sucesso!')
    console.log('  masterPassword: NadineAmelhor')
    console.log('  momentum: 0')
  }

  console.log('\nBanco de dados pronto.')
  process.exit(0)
}

seed().catch(err => {
  console.error('Erro:', err.message)
  process.exit(1)
})
