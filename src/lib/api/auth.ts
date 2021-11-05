import { request } from 'lib/request'
import { User, UserLoginArgs, UserLoginRes } from 'lib/types'

const loginApi = (args: UserLoginArgs) => request.post<UserLoginRes>('auth/login', args)

const logoutApi = () => request.post('auth/logout')

const userApi = () => request.get<User>('me')

export { loginApi, logoutApi, userApi }
