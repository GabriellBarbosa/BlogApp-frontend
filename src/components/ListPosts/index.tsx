import React from 'react'
import {
  Container,
  Post,
  PostWrapper,
  ContentWrapper,
  UserName,
  PostDate,
  Main,
  Content,
  Category
} from './styles'
import { PostProps } from 'src/interfaces/post'
import { Avatar } from '@components/Avatar'
import { formatDistance, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale'
import { Link } from 'react-router-dom'

interface Props {
  posts: PostProps[]
}

export const Posts: React.FC<Props> = ({ posts }) => {
  const postDate = (date: Date) => {
    const formattedDate = parseISO(String(date))
    return formatDistance(formattedDate, new Date(), {
      locale: pt
    })
  }

  return (
    <Container>
      {posts &&
        posts.map(({ id, author, content, category, createdAt }, index) => (
          <Post key={`${id}${index}`}>
            <PostWrapper>
              <Avatar userName={author.userName} />
              <ContentWrapper>
                <UserName>{author.userName}</UserName>
                <PostDate>{postDate(createdAt)}</PostDate>
                <Main>
                  <Content>{content}</Content>
                  <Link to={`posts/${category.slug}`}>
                    <Category>{category.name}</Category>
                  </Link>
                </Main>
              </ContentWrapper>
            </PostWrapper>
          </Post>
        ))}
    </Container>
  )
}
