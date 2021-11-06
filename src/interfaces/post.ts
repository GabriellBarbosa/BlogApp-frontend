import { UserProps } from './user'
import { CategoryProps } from './category'

export interface PostProps {
  id: string
  author: UserProps
  category: CategoryProps
  content: string
  slug: string
  updatedAt: Date
  createdAt: Date
}
