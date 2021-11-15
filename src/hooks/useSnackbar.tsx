import { useContext } from 'react'
import { AlertContext } from '@providers/alert'

export const useSnackbar = () => {
  const alert = useContext(AlertContext)
  return { ...alert }
}
