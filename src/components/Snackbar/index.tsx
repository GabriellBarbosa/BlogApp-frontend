import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

interface Props {
  open: boolean
  severity: 'success' | 'info' | 'warning' | 'error'
  message: string
  duration?: number
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const SnackbarComponent: React.FC<Props> = ({
  open,
  severity,
  message,
  duration = 6000
}) => {
  const [snackOpen, setSnackOpen] = useState<boolean>(open)
  const handleClose = () => setSnackOpen(false)

  return (
    <Snackbar
      open={snackOpen}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
