import { User } from '.'

type UserLoginArgs = {
  email: string
  password: string
}

type UserToken = {
  access_token: string
  refresh_token: string
  expires_in: number
}

type UserLoginRes = {
  user: User
} & UserToken

export type { UserLoginArgs, UserLoginRes, UserToken }
