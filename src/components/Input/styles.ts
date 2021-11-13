import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  font-size: 16px;
`

export const InputStyled = styled.input`
  display: block;
  margin: 6px 0;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.borderColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 16px;
  padding: 10px;
  color: ${({ theme }) => theme.colors.lightText};
  outline: none;
  &:hover {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.borderColor};
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const HelperText = styled.span`
  padding: 0 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`
