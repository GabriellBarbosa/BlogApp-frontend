import React, { useEffect, useState } from 'react'
import { Container, Title } from './styles'
import { api } from '@services/api'
import { useLocation } from 'react-router'
import { useSnackbar } from '@hooks/useSnackbar'
import { CategoryProps } from '@interfaces/category'
import { PostProps } from '@interfaces/post'
import { Posts } from '@components/ListPosts'

export const PostsByCategory: React.FC = () => {
  const [category, setCategory] = useState<CategoryProps>()
  const [posts, setPosts] = useState<PostProps[]>([])
  const { addAlert } = useSnackbar()
  const { pathname } = useLocation()
  const categorySlug = pathname.split('/')[2]

  const getPosts = async () => {
    try {
      const response = await api.get(`posts/category/${categorySlug}`)
      setCategory(response.data.category)
      setPosts(response.data.posts)
    } catch {
      if (addAlert) {
        addAlert({
          message: 'Não possível carregar as postagens',
          severity: 'error'
        })
      }
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Container>
      {category && (
        <div>
          <Title>#{category.name}</Title>
          {posts.length ? (
            <Posts getPosts={getPosts} posts={posts} setPosts={setPosts} />
          ) : null}
        </div>
      )}
    </Container>
  )
}
