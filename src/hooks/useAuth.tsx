import { Dispatch, SetStateAction, useContext } from 'react'
import { AuthContext } from '@providers/auth'
import { UserProps } from '@interfaces/user'

export const useAuth: () => {
  user?: UserProps | null | undefined
  setUser?: Dispatch<SetStateAction<UserProps | null>> | undefined
} = () => {
  const user = useContext(AuthContext)
  return { ...user }
}
