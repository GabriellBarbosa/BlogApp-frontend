import React from 'react'
import { MyError } from '@interfaces/myError'
import { ResponseError } from '@interfaces/responseError'
import { useSnackbar } from '@hooks/useSnackbar'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'

interface ErrProps {
  [key: string]: string
}

export const useErrors: () => {
  // return type
  validateBeforeSubmit: (
    err: Yup.ValidationError,
    formRef: React.RefObject<FormHandles>
  ) => ErrProps
  handleBackendErrors: (
    err: unknown,
    formRef: React.RefObject<FormHandles>
  ) => ErrProps | null
  // return type
} = () => {
  const { addAlert } = useSnackbar()

  const validateBeforeSubmit: (
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

  const handleBackendErrors: (
    err: unknown,
    formRef: React.RefObject<FormHandles>
  ) => ErrProps | null = (
    err: unknown,
    formRef: React.RefObject<FormHandles>
  ) => {
    const { response } = err as MyError
    if (response.status === 500) {
      if (addAlert) {
        addAlert({
          message: 'Ocorreu um erro no nosso servidor. Volte mais tarde',
          severity: 'error'
        })
      }
      return null
    }
    const errorMessages: ErrProps = {}
    response.data.message.forEach((error: ResponseError) => {
      const { field, message } = error
      errorMessages[field] = message
    })
    formRef.current?.setErrors(errorMessages)
    return errorMessages
  }

  return { validateBeforeSubmit, handleBackendErrors }
}
