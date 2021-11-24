import React, {
  ReactElement,
  SelectHTMLAttributes,
  useEffect,
  useRef
} from 'react'
import { Container, Label, SelectStyled } from '../styles'
import { useField } from '@unform/core'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
}

export const Select: React.FC<Props> = ({ label, name, children, ...rest }) => {
  const optionRefs = useRef<HTMLOptionElement[]>([])
  const { registerField, fieldName } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: optionRefs.current,
      getValue: (refs: HTMLOptionElement[]) => {
        return refs.find(ref => ref.selected)?.value || ''
      },
      setValue: (refs: HTMLOptionElement[], value: string) => {
        const option = refs.find(ref => ref.value === value)

        if (option) option.selected = true
      },
      clearValue: (refs: HTMLOptionElement[]) => {
        refs.forEach(ref => (ref.selected = false))
      }
    })
  }, [])

  return (
    <Container>
      <Label htmlFor="">{label}</Label>
      <SelectStyled name={name} {...rest}>
        {React.Children.map(children, child =>
          React.cloneElement(child as ReactElement, {
            ref: (ref: HTMLOptionElement) => optionRefs.current.push(ref)
          })
        )}
      </SelectStyled>
    </Container>
  )
}
