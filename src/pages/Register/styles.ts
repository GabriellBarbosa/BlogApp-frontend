import styled from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`

export const FormStyled = styled(Form)`
  padding: 40px;
  width: 380px;
  background-color: #161b22;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const FieldsWrapper = styled.div`
  > div {
    margin-bottom: 10px;
  }
`
