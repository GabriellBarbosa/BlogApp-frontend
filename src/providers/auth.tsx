import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { UserProps } from '@interfaces/user'

interface Props {
  user: UserProps | null
  setUser: Dispatch<SetStateAction<UserProps | null>>
}

export const AuthContext: React.Context<Props | null> =
  createContext<Props | null>(null)

export const AuthProvider: React.FC = props => {
  const [user, setUser] = useState<UserProps | null>(null)
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
