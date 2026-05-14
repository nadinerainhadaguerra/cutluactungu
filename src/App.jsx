import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { SelectionProvider } from './contexts/SelectionContext'
import { MasterSettingsProvider } from './contexts/MasterSettingsContext'
import { SubHeaderProvider } from './contexts/SubHeaderContext'
import { MasterProfileProvider } from './contexts/MasterProfileContext'
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
        <MasterProfileProvider>
          <SelectionProvider>
            <MasterSettingsProvider>
              <SubHeaderProvider>
                <div className="min-h-screen parchment-bg transition-colors duration-300">
                  <AppContent />
                </div>
              </SubHeaderProvider>
            </MasterSettingsProvider>
          </SelectionProvider>
        </MasterProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
