import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { AlertProps } from '@interfaces/alert'

interface Props {
  value: AlertProps | null
  setValue: Dispatch<SetStateAction<AlertProps | null>>
}

export const AlertContext = createContext<Props | null>(null)

export const AlertProvider: React.FC = props => {
  const [value, setValue] = useState<AlertProps | null>(null)

  return (
    <AlertContext.Provider value={{ value, setValue }}>
      {props.children}
    </AlertContext.Provider>
  )
}
