import React, { useState } from 'react'
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
import { EditModal } from './EditModal'
import { DeleteModal } from './DeleteModal'

interface Props {
  posts: PostProps[]
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>
  getPosts: () => Promise<void>
}

export const Posts: React.FC<Props> = ({ posts, setPosts, getPosts }) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [editPostId, setEditPostId] = useState<string>('')
  const [deletePostId, setDeletePostId] = useState<string>('')
  const { user } = useAuth()

  const openModal = (modal: 'edit' | 'delete', id: string) => {
    console.log(posts)
    switch (modal) {
      case 'edit':
        setEditPostId(id)
        setEditModalOpen(true)
        break
      case 'delete':
        setDeletePostId(id)
        setDeleteModalOpen(true)
        break
      default:
        break
    }
  }

  const handleClose = (modal: 'edit' | 'delete') => {
    switch (modal) {
      case 'edit':
        setEditPostId('')
        setEditModalOpen(false)
        break
      case 'delete':
        setDeletePostId('')
        setDeleteModalOpen(false)
        break
      default:
        break
    }
  }

  const postDate = (date: Date) => {
    const formattedDate = parseISO(String(date))
    return formatDistance(formattedDate, new Date(), {
      locale: pt
    })
  }

  const isThePostOwner = (authorId: string) => user?._id === authorId

  return (
    <>
      {editPostId && (
        <EditModal
          postId={editPostId}
          open={editModalOpen}
          handleClose={() => handleClose('edit')}
          setPosts={setPosts}
        />
      )}
      {deletePostId && (
        <DeleteModal
          postId={deletePostId}
          open={deleteModalOpen}
          handleClose={() => handleClose('delete')}
          getPostsAfterDelete={getPosts}
        />
      )}
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
                        <Delete
                          onClick={() => openModal('delete', _id)}
                          title="deletar postagem"
                        >
                          <DeleteForeverOutlined />
                        </Delete>
                        <Edit
                          onClick={() => openModal('edit', _id)}
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
                </ContentWrapper>
              </PostWrapper>
            </Post>
          ))}
      </Container>
    </>
  )
}
