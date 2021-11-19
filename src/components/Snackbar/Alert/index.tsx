import React, { useState } from 'react'
import { Container } from './styles'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { AlertProps as Props } from '@interfaces/alert'

const AlertMUI = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const Alert: React.FC<Props> = ({ message, severity }) => {
  const [open, setOpen] = useState<boolean>(true)
  const handleClose = () => setOpen(false)

  return (
    <Container className={open ? '' : 'hidden'}>
      <AlertMUI
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
        style={{ marginTop: 20 }}
      >
        {message}
      </AlertMUI>
    </Container>
  )
}
