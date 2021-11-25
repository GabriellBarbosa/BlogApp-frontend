import React, { useRef, useState } from 'react'
import { Container, Title, FormStyled, FieldsWrapper, Login } from './styles'
import { Input } from '@components/Input'
import { FormHandles } from '@unform/core'
import { Button } from '@components/Button'
import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { useSnackbar } from '@hooks/useSnackbar'
import { UserProps } from '@interfaces/user'
import { Link, useNavigate } from 'react-router-dom'
import { useErrors } from '@hooks/useErrors'
import * as Yup from 'yup'

interface FormProps {
  userName: string
  email: string
  password: string
  confirmPassword: string
}

export const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const { addAlert } = useSnackbar()
  const { handleBackendErrors, validateBeforeSubmit } = useErrors()

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
      navigate('/')
      if (addAlert) {
        addAlert({
          message: `Seja bem-vindo(a), ${response.data.user.userName}`,
          severity: 'info'
        })
      }
    } catch (err: unknown) {
      if (err instanceof Yup.ValidationError) {
        validateBeforeSubmit(err, formRef)
        setLoading(false)
        return
      }
      handleBackendErrors(err, formRef)
      setLoading(false)
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
        <Login>
          Já possui conta? <Link to="/login">Login</Link>
        </Login>
      </FormStyled>
    </Container>
  )
}
