import React from 'react'
import { Container } from './styles'
import { Input } from '@components/Input'
import { Form } from '@unform/web'

export const Register: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input label="Nome de usuário" name="userName" type="text" />
        <Input label="E-mail" name="email" type="email" />
        <Input label="Senha" name="password" type="password" />
        <Input
          label="Confirme a senha"
          name="confirmPassword"
          type="password"
        />
        <button>Pronto</button>
      </Form>
    </Container>
  )
}
