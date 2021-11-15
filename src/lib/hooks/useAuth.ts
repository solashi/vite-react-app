import { useAtom } from 'jotai'
import { useAtomCallback, useAtomValue, useUpdateAtom } from 'jotai/utils'
import { loginApi, logoutApi, userApi } from 'lib/api/auth'
import { fetchAuthAtom, loadAuthAtom, tokenAtom, userAtom } from 'lib/atomic'
import { UserLoginArgs } from 'lib/types'
import { useCallback } from 'react'

const useAuth = () => {
  const [user] = useAtom(userAtom)
  const loading = useAtomValue(loadAuthAtom)
  const setToken = useUpdateAtom(tokenAtom)
  const setUser = useUpdateAtom(userAtom)
  const setFetching = useUpdateAtom(fetchAuthAtom)

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
    localStorage.removeItem('user-token')
  }

  const fetchUser = useAtomCallback(
    useCallback(
      async (get) => {
        try {
          const token = get(tokenAtom)
          if (token?.access_token) {
            const res = await userApi()
            setUser(res.data)
          }
          setFetching(false)
        } catch (error) {
          setFetching(false)
          setUser(null)
        }
      },
      [setFetching, setUser]
    )
  )

  return { auth, user, logout, login, fetchUser, loading }
}

export { useAuth }
