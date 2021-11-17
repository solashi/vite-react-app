import { Box, BoxProps, Stack, Typography } from '@mui/material'

const Color: React.VFC<BoxProps & { hideCode?: boolean }> = ({ bgcolor, hideCode, ...props }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box
        width={50}
        height={30}
        borderRadius="2px"
        p={0.5}
        borderColor={(theme) => theme.palette.common.black}
        border={1}
      >
        <Box borderRadius="2px" width="100%" height="100%" bgcolor={bgcolor} {...props} />
      </Box>
      {!hideCode && <Typography>{bgcolor}</Typography>}
    </Stack>
  )
}

export { Color }
