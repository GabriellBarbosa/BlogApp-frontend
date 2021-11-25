import React, { useRef, useState } from 'react'
import {
  Container,
  Title,
  FormStyled,
  FieldsWrapper,
  RecoverPassword,
  Register
} from './styles'
import { Input } from '@components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Button } from '@components/Button'
import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { UserProps } from '@interfaces/user'
import { useErrors } from '@hooks/useErrors'
import * as Yup from 'yup'

interface FormProps {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const { validateBeforeSubmit, handleBackendErrors } = useErrors()

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

      const response = await api.post('auth/authenticate', data)
      window.localStorage.setItem('token', response.data.token)
      if (setUser) {
        setUser(response.data.user as UserProps)
      }

      setLoading(false)
      navigate('/')
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
        <Title>Login</Title>
        <FieldsWrapper>
          <Input label="E-mail" name="email" type="text" />
          <Input label="Senha" name="password" type="password" />
          <RecoverPassword>
            <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
          </RecoverPassword>
        </FieldsWrapper>
        <Button loading={loading}>Login</Button>
        <Register>
          Não possui conta? <Link to="/criar-conta">criar conta</Link>
        </Register>
      </FormStyled>
    </Container>
  )
}
