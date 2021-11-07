import { styled, Typography } from '@mui/material'

const Empty = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 48,
  backgroundColor: theme.palette.grey[100],
  marginBottom: theme.spacing(2),
  width: '100%'
}))

const EmptyTable: React.VFC = () => {
  return (
    <Empty>
      <Typography variant="h6" color="text.secondary">
        Empty data.
      </Typography>
    </Empty>
  )
}

export default EmptyTable
