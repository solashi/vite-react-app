import { CssBaseline, ThemeProvider } from '@mui/material'
import { Router } from 'routers'
import { defaultTheme } from 'styles'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  )
}

export default App
