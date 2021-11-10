import { request } from 'lib/request'
import { AdminUser } from 'lib/types'

const createAdminUserApi = (values: FormData) => request.post<AdminUser>('admin-users', values)

type UpdateAdminUser = {
  id: number
  formData: FormData
}

const updateAdminUserApi = (values: UpdateAdminUser) =>
  request.post<UpdateAdminUser>(`admin-users/${values.id}?_method=put`, values.formData)

export { createAdminUserApi, updateAdminUserApi }
