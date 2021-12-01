import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Post = styled.div``

export const PostWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  display: grid;
  grid-template-columns: 44px 1fr;
  column-gap: 5px;
`

export const PostInfo = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 10px;
`

export const InfoWrapper = styled.div``

export const Actions = styled.div``

export const UserName = styled.span`
  display: block;
`

export const PostDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightText};
`

export const Edited = styled(PostDate)`
  margin-left: 10px;
  &::before {
    position: relative;
    top: -2px;
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.lightText};
    border-radius: 50%;
    margin-right: 4px;
  }
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
  grid-column: 2/-1;
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
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`

export const Category = styled.p`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 12px;
  text-decoration: underline;
  text-transform: lowercase;
`

export const CommentWrapper = styled(Link)`
  grid-column: 2/-1;
  display: flex;
  align-items: center;
  margin-top: 20px;
  > svg {
    color: ${({ theme }) => theme.colors.lightText};
  }
  &:hover {
    span {
      text-decoration: underline;
    }
  }
`

export const CommentsQuantity = styled.span`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.lightText};
`
