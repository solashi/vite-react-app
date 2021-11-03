import { DefaultLayout } from 'components/Layouts'
import { Route, Routes } from 'react-router-dom'
import { Login } from 'screens/auth'
import { Dashboard } from 'screens/dashboard'
import { NoMatch } from 'screens/NoMatch'
import { RequireAuth } from './RequireAuth'

const Router: React.VFC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <DefaultLayout />
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
