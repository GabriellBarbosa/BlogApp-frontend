import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input: React.FC<Props> = ({ label, name, ...rest }) => {
  if (!name) return null
  const inputRef = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    console.log(inputRef.current)
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [])

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input ref={inputRef} name={name} {...rest} />
    </div>
  )
}
