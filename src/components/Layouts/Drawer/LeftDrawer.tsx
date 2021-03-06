import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Logo from 'assets/images/logo.png'

export const drawerWidth = 240

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

const DrawerLeft: React.FC = ({ children }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none'
        }
      }}
      elevation={0}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <DrawerHeader>
        <img src={Logo} alt="logo" />
      </DrawerHeader>
      {children}
    </Drawer>
  )
}

export { DrawerLeft }
