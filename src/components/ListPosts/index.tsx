import React from 'react'
import {
  Container,
  Post,
  PostWrapper,
  ContentWrapper,
  PostInfo,
  UserName,
  PostDate,
  Delete,
  Edit,
  Main,
  Content,
  Category
} from './styles'
import { PostProps } from 'src/interfaces/post'
import { Avatar } from '@components/Avatar'
import { formatDistance, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { Edit as EditIcon, DeleteForeverOutlined } from '@mui/icons-material'

interface Props {
  posts: PostProps[]
}

export const Posts: React.FC<Props> = ({ posts }) => {
  const { user } = useAuth()

  const postDate = (date: Date) => {
    const formattedDate = parseISO(String(date))
    return formatDistance(formattedDate, new Date(), {
      locale: pt
    })
  }

  const isThePostOwner = (authorId: string) => user?._id === authorId

  return (
    <Container>
      {posts &&
        posts.map(({ _id, author, content, category, createdAt }, index) => (
          <Post key={`${_id}${index}`}>
            <PostWrapper>
              <Avatar userName={author.userName} />
              <ContentWrapper>
                <PostInfo>
                  <div>
                    <UserName>{author.userName}</UserName>
                    <PostDate>{postDate(createdAt)}</PostDate>
                  </div>
                  {isThePostOwner(author._id) && (
                    <div>
                      <Delete title="deletar postagem">
                        <DeleteForeverOutlined />
                      </Delete>
                      <Edit title="Editar postagem">
                        <EditIcon />
                      </Edit>
                    </div>
                  )}
                </PostInfo>
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
