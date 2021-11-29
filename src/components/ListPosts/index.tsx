import React, { useState } from 'react'
import { Container } from './styles'
import { PostProps } from 'src/interfaces/post'
import { EditModal } from './EditModal'
import { DeleteModal } from './DeleteModal'
import { Post } from './Post'

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

  const openModal = (modal: 'edit' | 'delete', id: string) => {
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
          posts.map(
            ({ _id, author, content, category, updatedAt, createdAt }) => (
              <Post
                key={_id}
                id={_id}
                author={author}
                content={content}
                category={category}
                updatedAt={updatedAt}
                createdAt={createdAt}
                openModal={openModal}
              />
            )
          )}
      </Container>
    </>
  )
}
