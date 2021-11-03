import { createTheme } from '@mui/material'
import { grey, yellow } from './colors'

const defaultTheme = createTheme({
  palette: {
    secondary: {
      main: yellow[600]
    },
    grey: {
      900: grey[900],
      600: grey[600],
      300: grey[300],
      200: grey[200],
      100: grey[100]
    }
  },
  typography: {
    fontFamily: ['"Noto Sans JP"', 'sans-serif'].join(', ')
  }
})

export { defaultTheme }
