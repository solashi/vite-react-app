import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { User, UserToken } from 'lib/types'

const userAtom = atom<User | null>(null)

const tokenAtom = atomWithStorage<UserToken | null>('user-token', null)

export { userAtom, tokenAtom }
