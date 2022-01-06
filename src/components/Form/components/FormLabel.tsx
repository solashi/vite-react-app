import { FormLabel as MFormLabel, styled } from '@mui/material'

const FormLabel = styled(MFormLabel)(({ theme }) => ({
  fontSize: 15,
  marginBottom: theme.spacing(0.5),
  fontWeight: 700,
  color: theme.palette.common.black,
  display: 'flex',
  alignItems: 'center'
}))

export { FormLabel }
