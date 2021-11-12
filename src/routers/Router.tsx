import { Layout } from 'components/Layouts'
import { FullScreenLoading } from 'components/Loader'
import { useAuth } from 'lib/hooks'
import { Route, Routes } from 'react-router-dom'
import { AdminUser, FormAdminUser } from 'screens/admin-user'
import { Login } from 'screens/auth'
import { CustomerCompany } from 'screens/customer-company'
import { Dashboard } from 'screens/dashboard'
import { Instructor } from 'screens/instructor'
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
        <Route path="/admin-user" element={<AdminUser />} />
        <Route path="/admin-user/create" element={<FormAdminUser />} />
        <Route path="/admin-user/edit/:id" element={<FormAdminUser />} />

        <Route path="/customer-company" element={<CustomerCompany />} />
        <Route path="/instructor" element={<Instructor />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}

export { Router }
