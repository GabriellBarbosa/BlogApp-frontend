import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { Container, Label, InputStyled, HelperText } from './styles'
import { useField } from '@unform/core'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export const Input: React.FC<Props> = ({ label, name, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [])

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <InputStyled ref={inputRef} name={name} {...rest} />
      {error && <HelperText>{error}</HelperText>}
    </Container>
  )
}
