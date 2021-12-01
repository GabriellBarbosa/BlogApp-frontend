import React from 'react'
import { Container, Content, Author, Text } from './styles'
import { Avatar } from '@components/Avatar'
import { CommentProps } from '@interfaces/comment'

export const Comment: React.FC<CommentProps> = ({
  post,
  author,
  comment,
  createdAt,
  updatedAt
}) => {
  return (
    <Container>
      <Avatar
        maxHeight={30}
        maxWidth={30}
        fontSize={16}
        userName={author.userName}
      />
      <Content>
        <Author>{author.userName}</Author>
        <Text>{comment}</Text>
      </Content>
    </Container>
  )
}
