import { styled } from '@mui/system'

const DialogTitle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(0, 3)
}))

export { DialogTitle }
