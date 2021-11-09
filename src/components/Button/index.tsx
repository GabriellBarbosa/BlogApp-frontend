import React from 'react'
import { Container, Loading } from './styles'

interface Props {
  loading?: boolean
  disabled?: boolean
}

export const Button: React.FC<Props> = ({ loading, disabled, children }) => {
  return (
    <Container disabled={disabled} className={loading ? 'loading' : ''}>
      {loading && <Loading />}
      {children}
    </Container>
  )
}
