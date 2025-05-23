import { IdleProvider } from '../features/useInactivityRedirect/IdleContext'
import './App.css'
import { AppRouter } from './AppRouter'

function App() {

  return (
    <IdleProvider>
      <AppRouter/>
    </IdleProvider>
  )
}

export default App
