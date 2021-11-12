import { CssBaseline, ThemeProvider } from '@mui/material'
import { useAuth } from 'lib/hooks'
import DialogUtilsProvider from 'lib/providers/DialogProvider'
import { queryClient } from 'lib/react-query'
import { Suspense, useEffect } from 'react'
import { QueryClientProvider } from 'react-query'
import { Router } from 'routers'
import { defaultTheme } from 'styles'

function App() {
  const { fetchUser } = useAuth()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Suspense fallback="Loading...">
          <DialogUtilsProvider>
            <Router />
          </DialogUtilsProvider>
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
