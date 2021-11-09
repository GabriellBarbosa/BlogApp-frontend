import styled from 'styled-components'
import { Modal, Box } from '@mui/material'

export const Container = styled(Modal)`
  display: grid;
  place-items: center;
`

export const Content = styled(Box)`
  outline: none;
  background-color: ${({ theme }) => theme.colors.contentBg};
  background-color: #21262d;
  border-radius: 8px;
`
