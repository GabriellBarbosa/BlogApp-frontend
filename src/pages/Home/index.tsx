import React, { useEffect, useState } from 'react'
import { Container, AddPostWrapper, RecentText } from './styles'
import { api } from '@services/api'
import { PostProps } from '@interfaces/post'
import { Posts } from '@components/ListPosts'
import { NoResults } from '@components/NoResults'
import { AddPost } from '@components/AddPost'

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await api.get('posts')
        setPosts(data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])

  return (
    <Container>
      <AddPostWrapper>
        <AddPost />
      </AddPostWrapper>
      {posts.length ? (
        <>
          <RecentText>Postagens recentes</RecentText>
          <Posts posts={posts} />
          <NoResults message={'Não há mais postagens'} />
        </>
      ) : (
        <NoResults message={'Não há postagens'} />
      )}
    </Container>
  )
}
