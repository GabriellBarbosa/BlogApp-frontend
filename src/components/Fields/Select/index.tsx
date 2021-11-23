import React, { SelectHTMLAttributes } from 'react'
import { Container, Label, SelectStyled } from '../styles'
import { CategoryProps } from '@interfaces/category'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: CategoryProps[]
}

export const Select: React.FC<Props> = ({ label, options }) => {
  return (
    <Container>
      <Label htmlFor="">{label}</Label>
      <SelectStyled name="" id="">
        {options.map(({ id, slug, name }) => (
          <option key={id} value={slug}>
            {name}
          </option>
        ))}
      </SelectStyled>
    </Container>
  )
}
