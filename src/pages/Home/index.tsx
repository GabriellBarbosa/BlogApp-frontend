import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import { api } from '@services/api'
import { PostProps } from 'src/interfaces/post'
import { Posts } from '@components/posts'
import { NoResults } from '@components/noResults'

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await api.get('posts')
        setPosts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])

  return (
    <Container>
      {posts.length ? (
        <>
          <Posts posts={posts} />
          <NoResults message={'Não há mais postagens'} />
        </>
      ) : (
        <NoResults message={'Não há postagens'} />
      )}
    </Container>
  )
}
