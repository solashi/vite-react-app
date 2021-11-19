import { Avatar as AvatarMui } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

type AvatarProps = {
  size?: number
  hasViewer?: boolean
  imageUrl: string
  onClick: () => void
}

const Avatar: React.VFC<AvatarProps> = ({ size = 120, imageUrl, onClick }) => {
  const hasViewer = imageUrl ? true : false
  if (hasViewer) return <AvatarWithSize onClick={onClick} size={size} src={imageUrl} />
  else return <AvatarWithSize size={size} src={imageUrl} />
}

const AvatarWithSize = styled(AvatarMui, {
  shouldForwardProp: (props) => props !== 'hasViewer'
})<{ size: number; hasViewer?: boolean }>(({ size, hasViewer }) => ({
  width: size,
  height: size,
  cursor: hasViewer ? 'pointer' : 'auto'
}))

export { Avatar }
