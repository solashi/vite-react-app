import { request } from 'lib/request'
import { AdminUser } from 'lib/types'

export type CreateAdminUser = {
  name: string
  email: string
  password: string
}

export type UpdateAdminUser = CreateAdminUser & {
  id: number
}

const createAdminUserApi = (values: CreateAdminUser) =>
  request.post<AdminUser>('admin-users', values)

const updateAdminUserApi = (values: UpdateAdminUser) =>
  request.post<AdminUser>(`admin-users/${values.id}?_method=put`, values)

export { createAdminUserApi, updateAdminUserApi }
