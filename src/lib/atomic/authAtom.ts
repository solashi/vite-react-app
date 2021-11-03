import { atom } from 'jotai'
import { User } from 'lib/types'

const userAtom = atom<User | null>(null)

export { userAtom }
