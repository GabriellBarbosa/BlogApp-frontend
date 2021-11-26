import React, { useState, useEffect, useRef } from 'react'
import { Container, ModalWrapper, Title, FormStyled } from './styles'
import { AddCircle } from '@mui/icons-material'
import { Modal } from '@components/Modal'
import { Button } from '@components/Button'
import { authenticatedRequest, api } from '@services/api'
import { CategoryProps } from '@interfaces/category'
import { useSnackbar } from '@hooks/useSnackbar'
import { Select } from '@components/Fields/Select'
import { Textarea } from '@components/Fields/Textarea'
import { useErrors } from '@hooks/useErrors'
import { useAuth } from '@hooks/useAuth'
import * as Yup from 'yup'

interface FormProps {
  content: string
  category: string
}

export const AddPost: React.FC = () => {
  const { user } = useAuth()
  if (!user) return null

  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const { addAlert } = useSnackbar()
  const { handleBackendErrors, validateBeforeSubmit } = useErrors()
  const formRef = useRef(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
      const response = await apiAuthenticated.post('posts/add', data)
      // setPosts(response.data.something)

      setLoading(false)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        validateBeforeSubmit(err, formRef)
        setLoading(false)
        return
      }
      handleBackendErrors(err, formRef)
      setLoading(false)
    }
  }

  useEffect(() => {
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
    getCategories()
  }, [])

  return (
    <>
      {open && (
        <Modal open={open} handleClose={handleClose}>
          <ModalWrapper>
            <Title>Adicionar postagem</Title>
            <FormStyled ref={formRef} onSubmit={handleSubmit}>
              <Textarea
                rows={4}
                label="No que você está pensando?"
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
              <Button loading={loading}>Adicionar</Button>
            </FormStyled>
          </ModalWrapper>
        </Modal>
      )}

      <Container onClick={handleOpen}>
        <AddCircle />
        <p>Adicionar nova postagem</p>
      </Container>
    </>
  )
}
