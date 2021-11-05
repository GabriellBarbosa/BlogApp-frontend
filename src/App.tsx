import React from 'react'
import GlobalStyle from '@styles/global'
import theme from '@styles/theme'
import { ThemeProvider } from 'styled-components'
import { AppRoutes } from './routes'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
