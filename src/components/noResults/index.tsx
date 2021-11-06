import React from 'react'
import { Message } from './styles'
import Lottie from 'react-lottie'
import animationData from '@assets/animation/no-results.json'

interface Props {
  message: string
}

export const NoResults: React.FC<Props> = ({ message }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div>
      <Message>{message}</Message>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isStopped={false}
        isPaused={false}
      />
    </div>
  )
}
