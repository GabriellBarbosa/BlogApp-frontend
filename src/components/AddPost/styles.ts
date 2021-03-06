import styled from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled.div`
  padding: 20px;
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
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

export const AddPostText = styled.p`
  font-size: 16px;
`
