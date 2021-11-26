import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { Container, Label, TextareaStyled, HelperText } from '../styles'
import { useField } from '@unform/core'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
}

export const Textarea: React.FC<Props> = ({ label, name, ...rest }) => {
  const textareaRef = useRef(null)
  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value'
    })
  }, [])

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <TextareaStyled ref={textareaRef} name={name} {...rest} />
      {error && <HelperText>{error}</HelperText>}
    </Container>
  )
}
