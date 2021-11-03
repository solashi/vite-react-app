import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { loginApi } from 'lib/api/auth'
import { tokenAtom, userAtom } from 'lib/atomic'
import { UserLoginArgs } from 'lib/types'

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom)
  const setToken = useUpdateAtom(tokenAtom)

  const auth = !!user

  const login = async (args: UserLoginArgs) => {
    const res = await loginApi(args)
    const { user, ...token } = res.data
    setUser(user)
    setToken(token)
  }

  return { auth, login, user }
}

export { useAuth }
