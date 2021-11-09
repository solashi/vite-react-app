import { request } from 'lib/request'
import { AdminUser, UserLoginArgs, UserLoginRes } from 'lib/types'

const loginApi = (args: UserLoginArgs) => request.post<UserLoginRes>('auth/login', args)

const logoutApi = () => request.post('auth/logout')

const userApi = () => request.get<AdminUser>('me')

export { loginApi, logoutApi, userApi }
