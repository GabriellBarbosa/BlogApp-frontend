import React from 'react'
import GlobalStyle from '@styles/global'
import theme from '@styles/theme'
import { ThemeProvider } from 'styled-components'
import { AppRoutes } from './routes'
import { SnackbarComponent } from '@components/Snackbar'
import { useSnackbar } from '@hooks/useSnackbar'

const App: React.FC = () => {
  const { value } = useSnackbar()

  return (
    <ThemeProvider theme={theme}>
      {value && <SnackbarComponent {...value} />}
      <AppRoutes />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
