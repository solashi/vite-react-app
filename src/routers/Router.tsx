import { Layout } from 'components/Layouts'
import { FullScreenLoading } from 'components/Loader'
import { useAuth } from 'lib/hooks'
import { Route, Routes } from 'react-router-dom'
import { Login } from 'screens/auth'
import { Dashboard } from 'screens/dashboard'
import { NoMatch } from 'screens/NoMatch'
import { RequireAuth } from './RequireAuth'

const Router: React.VFC = () => {
  const { loading } = useAuth()

  if (loading) {
    return <FullScreenLoading />
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}

export { Router }
