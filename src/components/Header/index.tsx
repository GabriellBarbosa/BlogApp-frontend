import React from 'react'
import { Container, Wrapper, HomeLink, MyProfie } from './styles'
import { Home } from '@mui/icons-material'
import { useAuth } from '@hooks/useAuth'
import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { NavLink, useLocation } from 'react-router-dom'
import { routes } from '@helpers/hideHeaderAndFooterRoutes'

export const Header: React.FC = () => {
  const { user } = useAuth()
  const { pathname } = useLocation()

  const notShowHeader = routes.includes(pathname)

  if (notShowHeader) return null
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
