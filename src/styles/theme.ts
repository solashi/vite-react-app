import { createTheme } from '@mui/material'
import { grey, yellow } from './colors'
import { textBoldButton } from './customStyles'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    textBold: true
  }
}

const defaultTheme = createTheme({
  palette: {
    secondary: {
      main: yellow[600],
      light: yellow[300]
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          padding: 0,
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }
      },
      defaultProps: {
        disableRipple: true
      },
      variants: [
        {
          props: { variant: 'textBold' },
          style: textBoldButton
        }
      ]
    }
  }
})

export { defaultTheme }
