import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import * as React from 'react'
import { DrawerLeft } from './Drawer'

const Sidebar: React.VFC = () => {
  return (
    <DrawerLeft>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </DrawerLeft>
  )
}

export default Sidebar
