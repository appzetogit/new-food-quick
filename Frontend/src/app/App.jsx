import { useLocation } from 'react-router-dom'
import AppRoutes from './routes'
import ErrorBoundary from './ErrorBoundary'

function App() {
  const { pathname } = useLocation()
  return (
    <ErrorBoundary resetKey={pathname}>
      <AppRoutes />
    </ErrorBoundary>
  )
}

export default App
