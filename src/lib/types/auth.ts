import { AdminUser } from '.'

type UserLoginArgs = {
  email: string
  password: string
}

type UserLoginError = {
  message: string
}

type UserToken = {
  access_token: string
  refresh_token: string
  expires_in: number
}

type UserLoginRes = {
  user: AdminUser
} & UserToken

export type { UserLoginArgs, UserLoginRes, UserToken, UserLoginError }
