import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NavLinkStyled = styled(NavLink)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  }
`

export const Container = styled.header`
  display: block;
  background-color: ${({ theme }) => theme.colors.contentBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`
export const Wrapper = styled.div`
  max-width: 720px;
  padding: 0 20px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HomeLink = styled(NavLinkStyled)``

export const MyProfie = styled(NavLinkStyled)`
  font-size: 14px;
  > div {
    margin-right: 10px;
  }
`
