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
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

interface Props {
  posts: PostProps[]
}

export const Posts: React.FC<Props> = ({ posts }) => {
  const stringToColor = (string: string) => {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.substr(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name)
      },
      children: `${name.charAt(0).toUpperCase()}`
    }
  }

  return (
    <Container>
      {posts &&
        posts.map(({ id, author, content, category }, index) => (
          <Post key={`${id}${index}`}>
            <PostWrapper>
              <Stack direction="row" spacing={2}>
                <Avatar {...stringAvatar(String(author.userName))} />
              </Stack>
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
