import { Button, List, ListItem, ListItemText } from '@mui/material'
import { styled } from '@mui/system'
import { useAuth } from 'lib/hooks'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { grey } from 'styles'
import { DrawerLeft } from './Drawer'

const ButtonLogout = styled(Button)({
  position: 'absolute',
  bottom: '15px',
  right: '15px',
  color: grey[600],
  backgroundColor: grey[300],
  '&:hover': {
    backgroundColor: grey[600],
    color: grey[800]
  }
})

const sidebarAdmin = [
  {
    label: 'ダッシュボード',
    path: '/'
  },
  {
    label: '企業管理',
    path: '/customer-company'
  },
  {
    label: 'グループ管理',
    path: '/customer-company-group'
  },
  {
    label: 'ユーザー管理',
    path: '/customer-company-user'
  },
  {
    label: 'ニュース管理',
    path: '/new'
  },
  {
    label: 'FAQ管理',
    path: '/faq'
  },
  {
    label: 'イベント管理',
    path: '/event'
  },
  {
    label: 'コンシェルジュ管理',
    path: '/concierge'
  },
  {
    label: '管理者管理',
    path: '/admin-user'
  }
]

const ListDrawer = styled(List)(({ theme }) => ({
  '& a': {
    color: theme.palette.grey[800],
    textDecoration: 'none'
  }
}))

const Sidebar: React.VFC = () => {
  const { logout, auth } = useAuth()

  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      if (auth) {
        await logout()
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DrawerLeft>
      {sidebarAdmin.map((item, index) => (
        <ListDrawer key={index} disablePadding>
          <Link to={item.path}>
            <ListItem button>
              <ListItemText primary={item.label} />
            </ListItem>
          </Link>
        </ListDrawer>
      ))}
      <ButtonLogout onClick={handleLogout}>ログアウト</ButtonLogout>
    </DrawerLeft>
  )
}

export default Sidebar
