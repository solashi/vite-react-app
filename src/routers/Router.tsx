import { Layout } from 'components/Layouts'
import { FullScreenLoading } from 'components/Loader'
import { useAuth } from 'lib/hooks'
import { Route, Routes } from 'react-router-dom'
import { AdminUser, AdminUserDetail, FormAdminUser } from 'screens/admin-user'
import { Login } from 'screens/auth'
import { CompanyGroup, CompanyGroupDetail, FormCompanyGroup } from 'screens/company-group'
import { CompanyDetail, CustomerCompany, FormCompany } from 'screens/customer-company'
import { Dashboard } from 'screens/dashboard'
import { FormInstructor, Instructor } from 'screens/instructor'
import { NoMatch } from 'screens/NoMatch'
import { FormUser, User, UserDetail } from 'screens/user'
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
        <Route path="/admin-user/:id" element={<AdminUserDetail />} />

        <Route path="/customer-company" element={<CustomerCompany />} />
        <Route path="/customer-company/create" element={<FormCompany />} />
        <Route path="/customer-company/edit/:id" element={<FormCompany />} />
        <Route path="/customer-company/:id" element={<CompanyDetail />} />

        <Route path="/instructor" element={<Instructor />} />
        <Route path="/instructor/create" element={<FormInstructor />} />
        <Route path="/instructor/edit/:id" element={<FormInstructor />} />

        <Route path="/company-group" element={<CompanyGroup />} />
        <Route path="/company-group/create" element={<FormCompanyGroup />} />
        <Route path="/company-group/edit/:id" element={<FormCompanyGroup />} />
        <Route path="/company-group/:id" element={<CompanyGroupDetail />} />

        <Route path="/user" element={<User />} />
        <Route path="/user/create" element={<FormUser />} />
        <Route path="/user/edit/:id" element={<FormUser />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}

export { Router }
