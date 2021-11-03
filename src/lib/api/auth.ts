import { request } from 'lib/request'
import { UserLoginArgs, UserLoginRes } from 'lib/types'

const loginApi = (args: UserLoginArgs) => request.post<UserLoginRes>('user/auth', args)

export { loginApi }
