import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

interface ErrProps {
  [key: string]: string
}

export const validateBeforeSubmit = async (
  err: Yup.ValidationError,
  formRef: React.RefObject<FormHandles>
) => {
  const errorMessages: ErrProps = {}
  err.inner.forEach(error => {
    const { path, message } = error
    if (path && message) errorMessages[path] = message
  })
  formRef.current?.setErrors(errorMessages)
}
