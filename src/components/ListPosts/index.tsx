import React from 'react'
import {
  Container,
  Post,
  PostWrapper,
  ContentWrapper,
  UserName,
  Main,
  Content,
  Category
} from './styles'
import { PostProps } from 'src/interfaces/post'
import { Avatar } from '@components/Avatar'

interface Props {
  posts: PostProps[]
}

export const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <Container>
      {posts &&
        posts.map(({ id, author, content, category }, index) => (
          <Post key={`${id}${index}`}>
            <PostWrapper>
              <Avatar userName={author.userName} />
              <ContentWrapper>
                <UserName>{author.userName}</UserName>
                <Main>
                  <Content>{content}</Content>
                  <Category>{category.name}</Category>
                </Main>
              </ContentWrapper>
            </PostWrapper>
          </Post>
        ))}
    </Container>
  )
}
