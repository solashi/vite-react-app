import Dialog, { DialogUtilsOptions } from 'components/DialogUtils'
import { useModalState } from 'lib/hooks'
import { merge } from 'lodash'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

type DialogContextValues = (options: DialogUtilsOptions) => Promise<unknown>

const DEFAULT_TYPE = 'confirm'

const DEFAULT_OPTIONS: DialogUtilsOptions = {
  type: 'confirm',
  title: '',
  description: '',
  content: null,
  confirmationText: 'Ok',
  cancellationText: 'Cancel',
  dialogProps: {}
}

const DialogUtilsContext = createContext<DialogContextValues>({} as DialogContextValues)

export const useDialog = () => {
  const dialog = useContext(DialogUtilsContext)
  return dialog
}

const buildOptions = (defaultOptions = {}, options: DialogUtilsOptions) => {
  return merge({}, defaultOptions, options || {})
}

type ProviderProps = {
  children: React.ReactNode
  defaultOptions?: DialogUtilsOptions
}

export enum DIALOG_CODE {
  REJECT = 'DIALOG_REJECT'
}

type ResolveReject =
  | [resolveFn: (value?: unknown) => void, rejectFn: (reason?: unknown) => void]
  | []

const DialogUtilsProvider: React.VFC<ProviderProps> = ({ children }) => {
  const [options, setOptions] = useState<DialogUtilsOptions>(DEFAULT_OPTIONS)
  const [resolveReject, setResolveReject] = useState<ResolveReject>([])
  const { isOpen, onOpen, onClose } = useModalState()

  const [resolve, reject] = resolveReject

  const confirm = useCallback((_options: DialogUtilsOptions) => {
    return new Promise((resolve, reject) => {
      setOptions(buildOptions(DEFAULT_OPTIONS, _options))
      setResolveReject([resolve, reject])
    })
  }, [])

  const normal = useCallback(
    (_options: DialogUtilsOptions) => {
      return new Promise(() => {
        setOptions(buildOptions(DEFAULT_OPTIONS, _options))
        onOpen()
      })
    },
    [onOpen]
  )

  const dialog = useCallback(
    (_options: DialogUtilsOptions) => {
      const type = _options.type || DEFAULT_TYPE
      return type === 'normal' ? normal(_options) : confirm(_options)
    },
    [confirm, normal]
  )

  const isNormal = useMemo(() => options.type === 'normal', [options.type])

  const handleClose = useCallback(() => {
    if (isNormal) {
      onClose()
    } else {
      setResolveReject([])
    }
  }, [isNormal, onClose])

  const handleCancel = useCallback(() => {
    if (isNormal && typeof options.onCancel === 'function') {
      options.onCancel()
    } else {
      reject &&
        reject({
          code: DIALOG_CODE.REJECT,
          reason: 'User reject confirm.'
        })
    }

    handleClose()
  }, [isNormal, options, handleClose, reject])

  const handleConfirm = useCallback(() => {
    if (isNormal && typeof options.onConfirm === 'function') {
      options.onConfirm()
    } else {
      resolve && resolve()
    }

    handleClose()
  }, [isNormal, options, resolve, handleClose])

  return (
    <>
      <DialogUtilsContext.Provider value={dialog}>{children}</DialogUtilsContext.Provider>
      <Dialog
        open={resolveReject.length === 2 || isOpen}
        options={options}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  )
}

export default DialogUtilsProvider
