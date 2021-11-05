import { CssBaseline, ThemeProvider } from '@mui/material'
import { useAuth } from 'lib/hooks'
import { queryClient } from 'lib/react-query'
import { Suspense, useEffect } from 'react'
import { QueryClientProvider } from 'react-query'
import { Router } from 'routers'
import { defaultTheme } from 'styles'

function App() {
  const { getUser } = useAuth()

  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Suspense fallback="Loading...">
          <Router />
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
