import React, { useEffect, useRef, useState } from 'react'
import { Container, Comments } from './styles'
import { Post as PostComponent } from '@components/Post'
import { useLocation } from 'react-router'
import { api, authenticatedRequest } from '@services/api'
import { PostProps } from '@interfaces/post'
import { EditModal } from '@components/Modal/EditModal'
import { DeleteModal } from '@components/Modal/DeleteModal'
import { CommentProps } from '@interfaces/comment'
import { Textarea } from '@components/Fields/Textarea'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Button } from '@components/Button'
import { useErrors } from '@hooks/useErrors'
import { useSnackbar } from '@hooks/useSnackbar'
import { Comment } from './Comment'
import * as Yup from 'yup'

interface FormProps {
  comment: string
}

export const Post: React.FC = () => {
  const [post, setPost] = useState<PostProps>()
  const [comments, setComments] = useState<CommentProps[]>([])
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [editPostId, setEditPostId] = useState<string>('')
  const [deletePostId, setDeletePostId] = useState<string>('')
  const formRef = useRef<FormHandles>(null)
  const { pathname } = useLocation()
  const { validateBeforeSubmit } = useErrors()
  const { addAlert } = useSnackbar()
  const id = pathname.split('/')[pathname.split('/').length - 1]

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
        setEditModalOpen(false)
        break
      case 'delete':
        setDeleteModalOpen(false)
        break
      default:
        break
    }
  }

  const getPost = async () => {
    try {
      const { data } = await api.get(`posts/${id}`)
      setPost(data)
    } catch {}
  }

  const getComments = async () => {
    try {
      const { data } = await api.get(`comments/list/${id}`)
      setComments(data)
      console.log(data)
    } catch {}
  }

  const handleSubmit = async (data: FormProps) => {
    try {
      setLoading(true)
      const schema = Yup.object().shape({
        comment: Yup.string().required('Escreva algo')
      })
      await schema.validate(data, {
        abortEarly: false
      })

      const api = authenticatedRequest()
      if (!api) {
        if (addAlert) {
          addAlert({
            message: 'Você não possui permissão para acessar esse recurso',
            severity: 'warning'
          })
        }
        return
      }

      await api.post(`comments/add/${post?._id}`, data)
      getComments()

      setLoading(false)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        validateBeforeSubmit(err, formRef)
        setLoading(false)
        return
      }
    }
  }

  useEffect(() => {
    getPost()
    getComments()
  }, [])

  if (!post) return null
  return (
    <Container>
      <EditModal
        postId={editPostId}
        open={editModalOpen}
        handleClose={() => handleClose('edit')}
      />
      <DeleteModal
        postId={deletePostId}
        open={deleteModalOpen}
        handleClose={() => handleClose('delete')}
      />
      <PostComponent
        id={post._id}
        author={post.author}
        category={post.category}
        content={post.content}
        updatedAt={post.updatedAt}
        createdAt={post.createdAt}
        openModal={openModal}
      />
      <Comments>
        <>
          {comments.length ? (
            comments.map(props => (
              <div key={props.post}>
                <Comment {...props} />
              </div>
            ))
          ) : (
            <p>Seja o primeiro a comentar</p>
          )}
        </>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Textarea name="comment" placeholder="adicione um comentário" />
          <Button loading={loading}>Comentar</Button>
        </Form>
      </Comments>
    </Container>
  )
}
