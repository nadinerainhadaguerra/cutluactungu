import { MdsAuthProvider, useMdsAuth } from './contexts/MdsAuthContext'
import { MdsMasterProvider } from './contexts/MdsMasterContext'
import MdsLoginScreen from './components/MdsLoginScreen'
import MdsLayout from './components/MdsLayout'
import { MdsErrorToast } from './components/common'

function MdsContent() {
  const { user } = useMdsAuth()
  return user ? <MdsLayout /> : <MdsLoginScreen />
}

// Raiz da área Monstro da Semana: login, dados e visual próprios.
export default function MdsApp() {
  return (
    <MdsAuthProvider>
      <MdsMasterProvider>
        <div className="min-h-screen text-gray-900 dark:text-mds-50">
          <MdsContent />
        </div>
        <MdsErrorToast />
      </MdsMasterProvider>
    </MdsAuthProvider>
  )
}
