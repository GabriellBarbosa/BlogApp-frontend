import styled from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled.ul``

export const Post = styled.li`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #21262d;
  &:last-child {
    border: none;
  }
`

export const PostWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`
export const ContentWrapper = styled.div`
  margin: 10px 0 0 10px;
  width: 100%;
`

export const PostInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 10px;
`

export const UserName = styled.span`
  display: block;
`

export const PostDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightText};
`

export const Delete = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.error};
  background-color: transparent;
  transition: 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.borderColor};
  }
  > svg {
    width: 24px;
    height: 24px;
  }
`

export const Edit = styled(Delete)`
  color: ${({ theme }) => theme.colors.lightText};
  margin-left: 10px;
`

export const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.contentBg};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.borderColor};
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
`

export const Content = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 10px;
`

export const Category = styled.p`
  color: ${props => props.theme.colors.lightText};
  font-size: 12px;
  text-decoration: underline;
  text-transform: lowercase;
`

// modal styles

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
