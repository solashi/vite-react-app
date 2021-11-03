import { useAtom } from 'jotai'
import { userAtom } from 'lib/atomic'

const useAuth = () => {
  const [user] = useAtom(userAtom)

  const auth = !!user

  return { auth }
}

export { useAuth }
