import styled from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled.div`
  max-width: 720px;
  padding: 0 20px;
  margin: 40px auto;
`

export const Comments = styled.div`
  margin-left: 49px;
`

export const CommentWrapper = styled.div`
  margin-top: 20px;
`

export const FirstCommentCall = styled.p`
  margin-top: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightText};
`

export const FormStyled = styled(Form)`
  margin-top: 20px;
  > button {
    margin-top: 10px;
  }
`
