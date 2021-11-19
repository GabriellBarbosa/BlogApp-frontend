import React from 'react'
import { Container } from './styles'
import { AlertProps as Props } from '@interfaces/alert'
import { Alert } from './Alert'

interface OwnProps {
  alerts: Props[] | null | undefined
}

export const SnackbarComponent: React.FC<OwnProps> = ({ alerts }) => {
  return (
    <Container>
      {alerts &&
        alerts.length &&
        alerts.map((alert, index) => (
          <Alert
            key={index}
            message={alert.message}
            severity={alert.severity}
          />
        ))}
    </Container>
  )
}
