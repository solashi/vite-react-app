import { useCallback, useState } from 'react'

export type UseModalStateValue = {
  isOpen: boolean
  onClose(): void
  onOpen(): void
  onToggle(): void
}

const useModalState = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const onToggle = useCallback(() => {
    setIsOpen((state) => !state)
  }, [])

  return { onOpen, onClose, isOpen, onToggle }
}

export { useModalState }
