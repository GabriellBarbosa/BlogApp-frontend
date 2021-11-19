import React from 'react'
import { Container, Wrapper, NavLinkStyled, MyProfie } from './styles'
import { Home } from '@mui/icons-material'
import { useAuth } from '@hooks/useAuth'
import { Avatar } from '@components/Avatar'

export const Header: React.FC = () => {
  const { user } = useAuth()

  return (
    <Container>
      <Wrapper>
        <NavLinkStyled to="/">
          <Home />
        </NavLinkStyled>
        <>
          {user ? (
            <span>Login/Criar Conta</span>
          ) : (
            <MyProfie to="/meu-perfil">
              <Avatar
                userName="biel900"
                maxWidth={30}
                maxHeight={30}
                fontSize={16}
              />
              Olá, Gabriel
            </MyProfie>
          )}
        </>
      </Wrapper>
    </Container>
  )
}
