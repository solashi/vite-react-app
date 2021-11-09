import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Dialog, DialogContent, DialogProps, Divider, Typography } from '@mui/material'
import { SxProps } from '@mui/system'
import { DialogTitle } from 'components/Dialog'
import IButton from 'components/IButton'
import React from 'react'

type DialogBaseProps = DialogProps & {
  title?: string
  contentSx?: SxProps
}

const DialogBase: React.VFC<DialogBaseProps> = ({
  open,
  title,
  onClose,
  children,
  contentSx,
  ...props
}) => {
  return (
    <Dialog
      PaperProps={{
        elevation: 2
      }}
      open={open}
      maxWidth="xs"
      fullWidth
      hideBackdrop
      keepMounted
      {...props}
    >
      <DialogTitle>
        <Typography variant="h4" color="text.secondary" py={1.5}>
          {title}
        </Typography>

        <IButton onClick={onClose as () => void} sx={{ position: 'absolute', right: 12 }}>
          <CloseRoundedIcon />
        </IButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 2, px: { xs: 2, md: 4 }, ...contentSx }}>{children}</DialogContent>
    </Dialog>
  )
}

export { DialogBase }
