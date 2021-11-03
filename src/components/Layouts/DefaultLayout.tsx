import { Box, styled } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { drawerWidth } from './Drawer'
import Sidebar from './Sidebar'

const DefaultLayout: React.VFC = () => {
  return (
    <Box sx={{ display: 'flex' }} bgcolor="secondary.main">
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </Box>
  )
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open = true }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}))

export { DefaultLayout }
