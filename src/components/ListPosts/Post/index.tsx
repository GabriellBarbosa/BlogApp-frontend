import React, { useEffect, useState } from 'react'
import {
  Post as Container,
  PostWrapper,
  ContentWrapper,
  PostInfo,
  UserName,
  PostDate,
  Delete,
  Edit,
  Main,
  Content,
  Category,
  CommentWrapper,
  CommentsQuantity
} from '../styles'
import { Avatar } from '@components/Avatar'
import { UserProps } from '@interfaces/user'
import { formatDistance, parseISO } from 'date-fns'
import { CategoryProps } from '@interfaces/category'
import { pt } from 'date-fns/locale'
import {
  Edit as EditIcon,
  DeleteForeverOutlined,
  Chat
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { useSnackbar } from '@hooks/useSnackbar'

interface Props {
  id: string
  author: UserProps
  content: string
  category: CategoryProps
  createdAt: Date
  updatedAt: Date
  openModal: (modal: 'edit' | 'delete', id: string) => void
}

export const Post: React.FC<Props> = ({
  id,
  author,
  content,
  category,
  createdAt,
  updatedAt,
  openModal
}) => {
  const [commentsQuantity, setCommentsQuantity] = useState<number>(0)
  const { user } = useAuth()
  const { addAlert } = useSnackbar()

  const postDate = (date: Date) => {
    const formattedDate = parseISO(String(date))
    return formatDistance(formattedDate, new Date(), {
      locale: pt
    })
  }

  const isThePostOwner = (authorId: string) => user?._id === authorId

  const getCommentsQuantity = async () => {
    try {
      const { data } = await api.get(`comments/list/${id}`)
      setCommentsQuantity(data.length)
    } catch {
      if (addAlert) {
        addAlert({
          message: 'Ocorreu um erro ao carregar os comentários',
          severity: 'error'
        })
      }
    }
  }

  useEffect(() => {
    getCommentsQuantity()
  }, [])
  return (
    <Container key={id}>
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
                <Delete
                  onClick={() => openModal('delete', id)}
                  title="deletar postagem"
                >
                  <DeleteForeverOutlined />
                </Delete>
                <Edit
                  onClick={() => openModal('edit', id)}
                  title="Editar postagem"
                >
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
          <CommentWrapper to={`post/${id}`}>
            <Chat />
            <CommentsQuantity>
              {commentsQuantity === 0 ? 'nenhum' : commentsQuantity}{' '}
              {commentsQuantity > 1 ? 'comentários' : 'comentário'}
            </CommentsQuantity>
          </CommentWrapper>
        </ContentWrapper>
      </PostWrapper>
    </Container>
  )
}
