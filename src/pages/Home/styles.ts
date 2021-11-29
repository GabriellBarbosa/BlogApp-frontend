import styled from 'styled-components'

export const Container = styled.div`
  max-width: 720px;
  padding: 0 20px;
  margin: 40px auto;
`
export const AddPostWrapper = styled.div`
  max-width: 240px;
  margin: 0 auto 40px;
`

export const Posts = styled.ul``

export const RecentText = styled.p`
  margin: 20px 0;
  color: ${({ theme }) => theme.colors.lightText};
`

export const Post = styled.li`
  margin-bottom: 20px;
`

export const PostWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`
export const ContentWrapper = styled.div`
  margin: 10px 0 0 10px;
  width: 100%;
`

export const UserName = styled.span``

export const Main = styled.main`
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
`

export const Content = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: 10px;
`

export const Category = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  text-decoration: underline;
  text-transform: lowercase;
`

export const Separator = styled.span`
  display: block;
  height: 1px;
  width: 100%;
  background: #21262d;
  margin-top: 20px;
`
