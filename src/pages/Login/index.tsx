import React, { useRef, useState } from 'react'
import { Container, Title, FormStyled, FieldsWrapper } from './styles'
import { Input } from '@components/Input'
import { Link } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Button } from '@components/Button'
import { validateBeforeSubmit } from '@helpers/validateBeforeSubmit'
import * as Yup from 'yup'

interface FormProps {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = async (data: FormProps) => {
    try {
      setLoading(true)
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('E-mail inválido')
          .required('Informe o seu e-mail'),
        password: Yup.string()
          .min(2, 'Senha muito curta')
          .required('Informe a sua senha')
      })

      await schema.validate(data, {
        abortEarly: false
      })
      setLoading(false)
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        await validateBeforeSubmit(err, formRef)
        setLoading(false)
      }
    }
  }

  return (
    <Container>
      <FormStyled ref={formRef} onSubmit={handleSubmit}>
        <Title>Login</Title>
        <FieldsWrapper>
          <Input label="E-mail" name="email" type="text" />
          <Input label="Senha" name="password" type="password" />
        </FieldsWrapper>
        <Button loading={loading}>Pronto</Button>
      </FormStyled>
    </Container>
  )
}
