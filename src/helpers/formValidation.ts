import { MyError } from '@interfaces/myError'
import { ResponseError } from '@interfaces/responseError'
import { FormHandles } from '@unform/core'
import { useSnackbar } from '@hooks/useSnackbar'
import * as Yup from 'yup'

interface ErrProps {
  [key: string]: string
}

export const validateBeforeSubmit: (
  err: Yup.ValidationError,
  formRef: React.RefObject<FormHandles>
) => ErrProps = (
  err: Yup.ValidationError,
  formRef: React.RefObject<FormHandles>
) => {
  const errorMessages: ErrProps = {}
  err.inner.forEach(error => {
    const { path, message } = error
    if (path && message) errorMessages[path] = message
  })
  formRef.current?.setErrors(errorMessages)
  return errorMessages
}

export const handleBackendErrors: (
  err: unknown,
  formRef: React.RefObject<FormHandles>
) => null | undefined = (
  err: unknown,
  formRef: React.RefObject<FormHandles>
) => {
  const { response, status } = err as MyError
  const { addAlert } = useSnackbar()
  if (status === 500) {
    if (addAlert) {
      addAlert({
        message: 'Ocorreu um erro no nosso servidor',
        severity: 'error'
      })
    }
    return null
  }
  const errorMessages: ErrProps = {}
  response.data.message.forEach((error: ResponseError) => {
    const { field, message } = error
    errorMessages[field] = message
    formRef.current?.setErrors(errorMessages)
    return errorMessages
  })
}
