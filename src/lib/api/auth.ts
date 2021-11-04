import { request } from 'lib/request'
import { User, UserLoginArgs, UserLoginRes } from 'lib/types'

const loginApi = (args: UserLoginArgs) => request.post<UserLoginRes>('user/auth', args)

const logoutApi = () => request.post('user/auth/logout')

const userApi = () => request.get<User>('user')

export { loginApi, logoutApi, userApi }
