import React from 'react'
import { Container, Content } from './styles'

interface Props {
  open: boolean
  handleClose: () => void
}

export const Modal: React.FC<Props> = ({ open, handleClose, children }) => {
  return (
    <Container
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Content>{children}</Content>
    </Container>
  )
}
