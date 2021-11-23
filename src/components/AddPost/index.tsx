import React, { FormEvent, useState, useEffect } from 'react'
import { Container, ModalWrapper, Title, Form } from './styles'
import { AddCircle } from '@mui/icons-material'
import { Modal } from '@components/Modal'
import { Button } from '@components/Button'
import { api } from '@services/api'
import { CategoryProps } from '@interfaces/category'
import { useSnackbar } from '@hooks/useSnackbar'
import { Select } from '@components/Fields/Select'

export const AddPost: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const { addAlert } = useSnackbar()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await api.get('admin/categories')
        setCategories(data)
      } catch (error) {
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
            <Form onSubmit={handleSubmit}>
              <Select label="Categoria da postagem" options={categories} />
              <Button loading={loading}>Criar Postagem</Button>
            </Form>
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
