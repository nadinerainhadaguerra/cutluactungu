import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { SelectionProvider } from './contexts/SelectionContext'
import LoginScreen from './components/LoginScreen'
import Layout from './components/Layout'

function AppContent() {
  const { user } = useAuth()

  if (!user) {
    return <LoginScreen />
  }

  return <Layout />
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SelectionProvider>
          <div className="min-h-screen parchment-bg transition-colors duration-300">
            <AppContent />
          </div>
        </SelectionProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
