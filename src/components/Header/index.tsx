import React from 'react'
import { Container, Wrapper, HomeLink, MyProfie } from './styles'
import { Home } from '@mui/icons-material'
import { useAuth } from '@hooks/useAuth'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { NavLink } from 'react-router-dom'

export const Header: React.FC = () => {
  const { user } = useAuth()

  return (
    <Container>
      <Wrapper>
        <HomeLink to="/">
          <Home />
        </HomeLink>
        <>
          {user ? (
            <MyProfie to="/meu-perfil">
              <Avatar
                userName={user.userName}
                maxWidth={30}
                maxHeight={30}
                fontSize={16}
              />
              Olá, {user.userName}
            </MyProfie>
          ) : (
            <NavLink to="/login">
              <Button style={{ fontWeight: 400, fontSize: 16 }}>Entrar</Button>
            </NavLink>
          )}
        </>
      </Wrapper>
    </Container>
  )
}
