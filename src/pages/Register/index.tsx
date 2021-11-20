import React, { useRef, useState } from 'react'
import { Container, Title, FormStyled, FieldsWrapper } from './styles'
import { Input } from '@components/Input'
import { FormHandles } from '@unform/core'
import { Button } from '@components/Button'
import { ResponseError } from '@interfaces/responseError'
import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { UserProps } from '@interfaces/user'
import { validateBeforeSubmit } from '@helpers/validateBeforeSubmit'
import * as Yup from 'yup'

interface ErrProps {
  [key: string]: string
}

interface FormProps {
  userName: string
  email: string
  password: string
  confirmPassword: string
}

interface MyError {
  response: { data: { message: ResponseError[] } }
  status: number
}

export const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { setUser } = useAuth()

  const handleSubmit = async (data: FormProps) => {
    try {
      setLoading(true)

      const schema = Yup.object().shape({
        userName: Yup.string()
          .min(2, 'Nome muito curto')
          .required('Campo obrigatório'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('Campo obrigatório'),
        password: Yup.string()
          .min(2, 'Senha muito curta')
          .required('Campo obrigatório'),
        confirmPassword: Yup.string()
          .min(2, 'Senha muito curta')
          .required('Campo obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      formRef.current?.setErrors({})

      if (data.confirmPassword != data.password) {
        formRef.current?.setErrors({
          password: 'As senhas precisam ser iguais',
          confirmPassword: 'As senhas precisam ser iguais'
        })
        setLoading(false)
        return
      }

      const response = await api.post('auth/register', data)
      window.localStorage.setItem('token', response.data.token)
      if (setUser) {
        setUser(response.data.user as UserProps)
      }
      setLoading(false)
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        await validateBeforeSubmit(err, formRef)
        setLoading(false)
        return
      }

      const { response, status } = err as MyError
      if (status === 500) {
        setLoading(false)
        return
      }
      const errorMessages: ErrProps = {}
      response.data.message.forEach((error: ResponseError) => {
        const { field, message } = error
        errorMessages[field] = message
        formRef.current?.setErrors(errorMessages)
        setLoading(false)
        return
      })
    }
  }

  return (
    <Container>
      <FormStyled ref={formRef} onSubmit={handleSubmit}>
        <Title>Criar conta</Title>
        <FieldsWrapper>
          <Input label="Nome de usuário" name="userName" type="text" />
          <Input label="E-mail" name="email" type="text" />
          <Input label="Senha" name="password" type="password" />
          <Input
            label="Confirme a senha"
            name="confirmPassword"
            type="password"
          />
        </FieldsWrapper>
        <Button loading={loading}>Pronto</Button>
      </FormStyled>
    </Container>
  )
}
