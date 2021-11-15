import { useContext } from 'react'
import { AlertContext } from '@providers/alert'
import { AlertProps } from '@interfaces/alert'

export const useSnackbar: () => {
  value?: AlertProps | null | undefined
  setValue?: React.Dispatch<React.SetStateAction<AlertProps | null>> | undefined
} = () => {
  const alert = useContext(AlertContext)
  return { ...alert }
}
