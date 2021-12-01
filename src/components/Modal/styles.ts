import styled from 'styled-components'
import { Form } from '@unform/web'
import { Modal, Box } from '@mui/material'

export const Container = styled(Modal)`
  display: grid;
  place-items: center;
`

export const Content = styled(Box)`
  outline: none;
  background-color: ${({ theme }) => theme.colors.contentBg};
  background-color: #21262d;
  border-radius: 8px;
`

export const ModalWrapper = styled.div`
  width: 480px;
`

export const Title = styled.h3`
  padding: 20px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.borderColor};
  font-size: 28px;
  text-align: center;
`

export const FormStyled = styled(Form)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  > div {
    margin-bottom: 10px;
  }
  > button {
    margin-top: 20px;
  }
`

export const ButtonsWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  > button:first-child {
    margin-right: 10px;
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
  > button:last-child {
    margin-left: 10px;
  }
`
