import { List, ListItem, ListItemText } from '@mui/material'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { DrawerLeft } from './Drawer'

const Sidebar: React.VFC = () => {
  const sidebarAdmin = [
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

  return (
    <DrawerLeft>
      {sidebarAdmin.map((item, index) => (
        <List key={index} disablePadding>
          <Link to={item.path}>
            <ListItem button>
              <ListItemText primary={item.label} />
            </ListItem>
          </Link>
        </List>
      ))}
    </DrawerLeft>
  )
}

export default Sidebar
