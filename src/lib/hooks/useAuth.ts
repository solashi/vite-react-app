import { useAtom } from 'jotai'
import { useAtomCallback, useUpdateAtom } from 'jotai/utils'
import { loginApi, logoutApi, userApi } from 'lib/api/auth'
import { tokenAtom, userAtom } from 'lib/atomic'
import { UserLoginArgs } from 'lib/types'
import { useCallback } from 'react'

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom)
  const setToken = useUpdateAtom(tokenAtom)
  const updateUser = useUpdateAtom(userAtom)

  const auth = !!user

  const login = async (args: UserLoginArgs) => {
    const res = await loginApi(args)
    const { user, ...token } = res.data
    setUser(user)
    setToken(token)
  }

  const logout = async () => {
    await logoutApi()
    setUser(null)
    setToken(null)
  }

  const getUser = useAtomCallback(
    useCallback(async (get) => {
      try {
        const token = get(tokenAtom)

        if (token?.access_token) {
          const res = await userApi()
          updateUser(res.data)
        }
      } catch (error) {
        updateUser(null)
      }
    }, [])
  )

  return { auth, user, logout, login, getUser }
}

export { useAuth }
