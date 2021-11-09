import { Button, DialogContentText, DialogProps } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import React from 'react'
import { DialogBase } from './Dialog'

export interface DialogUtilsOptions {
  type?: 'normal' | 'confirm'
  title?: string
  description?: React.ReactNode
  content?: React.ReactNode | null
  confirmationText?: React.ReactNode
  cancellationText?: React.ReactNode
  dialogProps?: Omit<DialogProps, 'open'>
  onCancel?(): void
  onConfirm?(): void
}

type ConfirmDialogProps = {
  options: DialogUtilsOptions
  onCancel(): void
  onConfirm(): void
} & DialogProps

const ConfirmationDialog: React.VFC<ConfirmDialogProps> = ({
  open,
  options,
  onCancel,
  onConfirm,
  onClose
}) => {
  const { title, description, content, confirmationText, cancellationText, dialogProps } = options

  const showCancel = typeof options.onCancel === 'function' || options.type === 'confirm'

  return (
    <DialogBase title={title} fullWidth {...dialogProps} open={open} onClose={onClose || onCancel}>
      {content ? (
        content
      ) : (
        <DialogContentText textAlign="center" py={3}>
          {description}
        </DialogContentText>
      )}
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button onClick={onConfirm}>{confirmationText}</Button>
        {showCancel && <Button onClick={onCancel}>{cancellationText}</Button>}
      </DialogActions>
    </DialogBase>
  )
}

export default ConfirmationDialog
