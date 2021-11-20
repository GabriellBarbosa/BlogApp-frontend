import React from 'react'
import { Avatar as AvatarMUI, Stack } from '@mui/material'

interface Props {
  userName: string
  maxWidth?: number
  maxHeight?: number
  fontSize?: number
}

export const Avatar: React.FC<Props> = ({
  userName,
  maxWidth = 40,
  maxHeight = 40,
  fontSize = 20
}) => {
  const stringToColor = (string: string) => {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.substr(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  const stringAvatar = (name: string) => {
    return {
      sx: {
        maxWidth,
        maxHeight,
        fontSize,
        bgcolor: stringToColor(name)
      },
      children: `${name.charAt(0).toUpperCase()}`
    }
  }
  return (
    <Stack direction="row" spacing={2}>
      <AvatarMUI {...stringAvatar(userName)} />
    </Stack>
  )
}
