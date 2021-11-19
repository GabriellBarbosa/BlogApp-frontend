import React, { createContext, useState } from 'react'
import { AlertProps } from '@interfaces/alert'

interface Props {
  value: AlertProps[] | null
  addAlert: (alert: AlertProps) => void
}

export const AlertContext = createContext<Props | null>(null)

export const AlertProvider: React.FC = props => {
  const [value, setValue] = useState<AlertProps[] | null>(null)

  const addAlert = (alert: AlertProps) => {
    setValue(prevState => {
      if (prevState === null) {
        return [alert]
      }
      if (prevState) {
        return [...prevState, alert]
      }
      return null
    })
  }

  return (
    <AlertContext.Provider value={{ value, addAlert }}>
      {props.children}
    </AlertContext.Provider>
  )
}
