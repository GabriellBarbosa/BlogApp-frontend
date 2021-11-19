import React, { useState, useEffect } from 'react'
import GlobalStyle from '@styles/global'
import theme from '@styles/theme'
import { ThemeProvider } from 'styled-components'
import { AppRoutes } from './routes'
import { SnackbarComponent } from '@components/Snackbar'
import { useSnackbar } from '@hooks/useSnackbar'
import { AlertProps } from '@interfaces/alert'

const App: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertProps[] | null | undefined>(null)
  const { value } = useSnackbar()

  useEffect(() => {
    setAlerts(value)
  }, [value])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRoutes />
      <SnackbarComponent alerts={alerts} />
    </ThemeProvider>
  )
}

export default App
