export interface AlertProps {
  open: boolean
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
  duration?: number
}
