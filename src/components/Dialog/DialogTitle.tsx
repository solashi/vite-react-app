import { styled } from '@mui/system'

const DialogTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1, 3)
}))

export { DialogTitle }
