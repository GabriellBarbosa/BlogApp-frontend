import styled from 'styled-components'
import { TextField } from '@mui/material'

export const Container = styled.div`
  padding: 20px;
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
`
export const ModalWrapper = styled.div`
  width: 380px;
`

export const Title = styled.h3`
  padding: 20px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.borderColor};
  font-size: 28px;
  text-align: center;
`

export const Form = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const Content = styled(TextField)`
  .MuiInputLabel-root,
  .MuiInputLabel-root.Mui-focused,
  .MuiOutlinedInput-root {
    color: ${({ theme }) => theme.colors.text};
  }
  .MuiOutlinedInput-root {
    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.lightText};
    }
    .MuiSvgIcon-root {
      fill: ${({ theme }) => theme.colors.text};
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline,
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export const Category = styled(Content)`
  .MuiFormHelperText-root {
    color: ${({ theme }) => theme.colors.text};
  }
`
