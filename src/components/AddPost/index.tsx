import React, { useState, useEffect, useRef } from 'react'
import { Container, ModalWrapper, Title, FormStyled } from './styles'
import { AddCircle } from '@mui/icons-material'
import { Modal } from '@components/Modal'
import { Button } from '@components/Button'
import { api } from '@services/api'
import { CategoryProps } from '@interfaces/category'
import { useSnackbar } from '@hooks/useSnackbar'
import { Select } from '@components/Fields/Select'

interface FormProps {
  content: string
  category: string
}

export const AddPost: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const { addAlert } = useSnackbar()
  const formRef = useRef(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = (data: FormProps) => {
    setLoading(true)
    console.log(data)
    setLoading(false)
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
