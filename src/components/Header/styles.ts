import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Container = styled.header`
  display: block;
  background-color: ${({ theme }) => theme.colors.contentBg};
`
export const Wrapper = styled.div`
  max-width: 720px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NavLinkStyled = styled(NavLink)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.text};
  padding: 15px;
  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  }
`

export const MyProfie = styled(NavLink)`
  display: flex;
  align-items: center;
  font-size: 14px;
  > div {
    margin-right: 10px;
  }
`
