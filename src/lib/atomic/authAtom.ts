import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { User, UserToken } from 'lib/types'

const userAtom = atom<User | null>(null)
const tokenAtom = atomWithStorage<UserToken | null>('user-token', null)

const storeAuth = atom((get) => !!get(tokenAtom))
const fetchAuthAtom = atom(true)
const loadAuthAtom = atom((get) => get(storeAuth) && get(fetchAuthAtom))

export { userAtom, tokenAtom, storeAuth, fetchAuthAtom, loadAuthAtom }
