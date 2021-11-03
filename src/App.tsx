import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'jotai'
import { queryClient } from 'lib/react-query'
import { Suspense } from 'react'
import { QueryClientProvider } from 'react-query'
import { Router } from 'routers'
import { defaultTheme } from 'styles'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <CssBaseline />
          <Suspense fallback="Loading...">
            <Router />
          </Suspense>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
