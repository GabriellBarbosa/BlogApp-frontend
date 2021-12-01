import { UserProps } from './user'

export interface CommentProps {
  author: UserProps
  post: string
  comment: string
  updatedAt: Date
  createdAt: Date
}
