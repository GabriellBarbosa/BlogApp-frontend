import styled from 'styled-components'

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

export const UserName = styled.span`
  display: block;
`

export const PostDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightText};
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
  color: ${props => props.theme.colors.text};
  margin-bottom: 10px;
`

export const Category = styled.p`
  color: ${props => props.theme.colors.primary};
  font-size: 12px;
  text-decoration: underline;
  text-transform: lowercase;
`
