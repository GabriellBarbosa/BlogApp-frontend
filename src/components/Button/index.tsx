import React, { HTMLAttributes } from 'react'
import { Container, Loading } from './styles'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  disabled?: boolean
}

export const Button: React.FC<Props> = ({
  loading,
  disabled,
  children,
  ...rest
}) => {
  return (
    <Container
      disabled={disabled}
      className={loading ? 'loading' : ''}
      {...rest}
    >
      <div>
        {loading && <Loading />}
        {children}
      </div>
    </Container>
  )
}
