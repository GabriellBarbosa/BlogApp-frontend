import { useContext } from 'react'
import { AlertContext } from '@providers/alert'
import { AlertProps } from '@interfaces/alert'

export const useSnackbar: () => {
  value?: AlertProps[] | null | undefined
  addAlert?: (alert: AlertProps) => void
} = () => {
  const alert = useContext(AlertContext)
  return { ...alert }
}
