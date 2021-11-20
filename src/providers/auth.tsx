import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect
} from 'react'
import { UserProps } from '@interfaces/user'
import { api } from '@services/api'

interface Props {
  user: UserProps | null
  setUser: Dispatch<SetStateAction<UserProps | null>>
}

export const AuthContext: React.Context<Props | null> =
  createContext<Props | null>(null)

export const AuthProvider: React.FC = props => {
  const [user, setUser] = useState<UserProps | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await api.post('auth/auto-login')
        setUser(data.user)
      } catch (err) {
        setUser(null)
      }
    }
    getUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
