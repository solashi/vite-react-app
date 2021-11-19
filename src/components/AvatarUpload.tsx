import { PhotoCameraRounded } from '@mui/icons-material'
import { Avatar, AvatarProps, Badge, FormControlProps, Stack, styled } from '@mui/material'
import { FileBag, useModalState, useUploader } from 'lib/hooks'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import Viewer from 'react-viewer'
import { AddControlProps, InputControl } from './Form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AvatarUploadProps = UseControllerProps<any> &
  AvatarProps<
    'div',
    AddControlProps & {
      controlProps?: FormControlProps
      urlUpload?: string
      size?: number
      multiple?: boolean
    }
  >

const AvatarWithSize = styled(Avatar, {
  shouldForwardProp: (props) => props !== 'hasViewer'
})<{ size: number; hasViewer?: boolean }>(({ size, hasViewer, theme }) => ({
  width: size,
  height: size,
  cursor: hasViewer ? 'pointer' : 'auto',
  border: `2px solid ${theme.palette.background.paper}`
}))

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  border: `2px solid ${theme.palette.background.paper}`,
  cursor: 'pointer',
  backgroundColor: theme.palette.grey[400],
  '&:hover': {
    backgroundColor: theme.palette.grey[300]
  }
}))

const Input = styled('input')({
  display: 'none'
})

const AvatarUpload: React.VFC<AvatarUploadProps> = ({
  name,
  control,
  defaultValue,
  label,
  helperText,
  controlProps,
  urlUpload,
  size = 96,
  multiple,
  ...props
}) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control, defaultValue })
  const { isOpen, onClose, onOpen } = useModalState()

  const { onDrop } = useUploader({
    url: urlUpload || 'upload',
    onUploaded(file: FileBag) {
      onChange(file.responseData.link)
    }
  })

  const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    onDrop(target.files as FileList)
  }

  return (
    <>
      <InputControl fieldError={error} label={label} helperText={helperText} {...controlProps}>
        <Stack direction="row" justifyContent="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <label htmlFor="avatar-upload">
                <Input
                  accept="image/*"
                  id="avatar-upload"
                  onChange={handleChooseImage}
                  multiple={multiple}
                  type="file"
                />
                <SmallAvatar>
                  <PhotoCameraRounded sx={{ fontSize: 20 }} />
                </SmallAvatar>
              </label>
            }
          >
            {value ? (
              <AvatarWithSize onClick={onOpen} hasViewer size={size} src={value} {...props} />
            ) : (
              <AvatarWithSize size={size} {...props} />
            )}
          </Badge>
        </Stack>
      </InputControl>

      <Viewer
        zIndex={1600}
        visible={isOpen}
        onClose={onClose}
        noFooter
        onMaskClick={onClose}
        images={[{ src: value as string, alt: 'avatar' }]}
      />
    </>
  )
}

export { AvatarUpload }
