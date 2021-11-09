import React, { FormEvent, useState, useEffect } from 'react'
import {
  Container,
  ModalWrapper,
  Title,
  Form,
  Content,
  Category
} from './styles'
import { AddCircle } from '@mui/icons-material'
import { Modal } from '@components/Modal'
import { MenuItem } from '@mui/material'
import { Button } from '@components/Button'
import { api } from '@services/api'
import { CategoryProps } from '@interfaces/category'

export const AddPost: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryProps[]>([])

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
        console.log(error)
      }
    }
    getCategories()
  }, [])

  return (
    <>
      <Modal open={open} handleClose={handleClose}>
        <ModalWrapper>
          <Title>Adicionar postagem</Title>
          <Form onSubmit={handleSubmit}>
            <Content
              id="outlined-multiline-flexible"
              label="No que você está pensando?"
              multiline
              maxRows={4}
              // value={value}
              // onChange={handleChange}
            />
            <Category
              id="outlined-select-currency"
              select
              label="Categoria da postagem"
              // value={currency}
              // onChange={handleChange}
              helperText="selecione uma categoria"
            >
              {categories.length &&
                categories.map(({ id, name, slug }, index) => (
                  <MenuItem key={`${id}${index}`} value={slug}>
                    {name}
                  </MenuItem>
                ))}
            </Category>
            <Button disabled>
              {/* {true ? 'Criando postagem...' : 'Criar Postagem'} */}
              Criar Postagem
            </Button>
          </Form>
        </ModalWrapper>
      </Modal>

      <Container onClick={handleOpen}>
        <AddCircle />
        <p>Adicionar nova postagem</p>
      </Container>
    </>
  )
}
