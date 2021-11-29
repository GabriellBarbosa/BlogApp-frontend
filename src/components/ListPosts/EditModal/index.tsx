import React, { useEffect, useRef, useState } from 'react'
import { ModalWrapper, Title, FormStyled } from '../styles'
import { Modal } from '@components/Modal'
import { Textarea } from '@components/Fields/Textarea'
import { CategoryProps } from '@interfaces/category'
import { api, authenticatedRequest } from '@services/api'
import { useSnackbar } from '@hooks/useSnackbar'
import { useErrors } from '@hooks/useErrors'
import { Select } from '@components/Fields/Select'
import { Button } from '@components/Button'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { PostProps } from '@interfaces/post'

interface Props {
  postId: string
  open: boolean
  handleClose: () => void
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>
}

interface FormProps {
  content: string
  category: string
}

export const EditModal: React.FC<Props> = ({
  open,
  handleClose,
  postId,
  setPosts
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const formRef = useRef<FormHandles>(null)
  const { addAlert } = useSnackbar()
  const { validateBeforeSubmit } = useErrors()

  const getPostsAfterEdit = async () => {
    try {
      const { data } = await api.get('posts')
      setPosts(data)
    } catch {
      if (addAlert) {
        addAlert({
          message: 'Ocorreu um erro no nosso servidor',
          severity: 'error'
        })
      }
    }
  }

  const handleSubmit = async (data: FormProps) => {
    try {
      setLoading(true)
      const schema = Yup.object().shape({
        content: Yup.string().required('Escreva algo'),
        category: Yup.string().required('Selecione uma categoria')
      })
      await schema.validate(data, {
        abortEarly: false
      })

      const apiAuthenticated = authenticatedRequest()
      if (!apiAuthenticated) {
        if (addAlert) {
          addAlert({
            message: 'É preciso estar logado para realizar essa ação',
            severity: 'warning'
          })
        }
        return null
      }
      await apiAuthenticated.put(`posts/edit/${postId}`, data)

      getPostsAfterEdit()
      setLoading(false)
      handleClose()

      if (addAlert) {
        addAlert({
          message: 'Postagem editada com sucesso',
          severity: 'success'
        })
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        validateBeforeSubmit(err, formRef)
        setLoading(false)
        return
      }
      setLoading(false)
    }
  }

  const setPostFields = async () => {
    try {
      const { data } = await api.get(`posts/${postId}`)
      Object.entries(data).forEach(([key, value]) => {
        formRef.current?.setFieldValue(key, value)
      })
    } catch {
      if (addAlert) {
        addAlert({
          message: 'Ocorreu um erro',
          severity: 'error'
        })
      }
    }
  }

  const getCategories = async () => {
    try {
      const { data } = await api.get('admin/categories')
      setCategories(data)
    } catch {
      if (addAlert) {
        addAlert({
          message: 'Erro ao carregar as categorias',
          severity: 'error'
        })
      }
    }
  }

  useEffect(() => {
    getCategories()
    setPostFields()
  }, [open])

  return (
    <Modal open={open} handleClose={handleClose}>
      <ModalWrapper>
        <Title>Editar postagem</Title>
        <FormStyled ref={formRef} onSubmit={handleSubmit}>
          <Textarea
            rows={4}
            label="Corrigir o que eu estava pensando..."
            name="content"
          />
          {categories.length && (
            <Select label="Categoria" name="category">
              {categories.map(({ _id, name }) => (
                <option key={_id} value={_id}>
                  {name}
                </option>
              ))}
            </Select>
          )}
          <Button loading={loading}>Editar</Button>
        </FormStyled>
      </ModalWrapper>
    </Modal>
  )
}
