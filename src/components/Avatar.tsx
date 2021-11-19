import { Avatar as AvatarMui, styled } from '@mui/material'

const AvatarWithSize = styled(AvatarMui, {
  shouldForwardProp: (props) => props !== 'hasViewer'
})<{ size?: number; hasViewer?: boolean }>(({ size = 120, hasViewer }) => ({
  width: size,
  height: size,
  cursor: hasViewer ? 'pointer' : 'auto'
}))

export { AvatarWithSize }
