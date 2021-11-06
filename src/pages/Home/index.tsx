import React, { useEffect, useState } from 'react'
import {
  Container,
  Posts,
  Post,
  PostWrapper,
  ContentWrapper,
  UserName,
  Main,
  Content,
  Category,
  Separator
} from './styles'
import { api } from '@services/api'
import { PostProps } from 'src/interfaces/post'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>()

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

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await api.get('posts')
        setPosts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])

  return (
    <Container>
      <Posts>
        {posts &&
          posts.map(({ id, author, content, category }) => (
            <Post key={id}>
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
              <Separator />
            </Post>
          ))}
      </Posts>
    </Container>
  )
}
