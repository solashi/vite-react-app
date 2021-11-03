import { createTheme } from '@mui/material'
import { grey } from './colors'

const defaultTheme = createTheme({
  palette: {
    grey: {
      900: grey[900],
      600: grey[600],
      300: grey[300],
      200: grey[200],
      100: grey[100]
    }
  }
})

export { defaultTheme }
