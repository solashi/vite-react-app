import { Stack, StackProps, Typography, TypographyProps } from '@mui/material'

export type FormDetailProps = StackProps & {
  label?: string
  labelProps?: TypographyProps
}

const FormDetail: React.FC<FormDetailProps> = ({ children, label, labelProps, ...props }) => {
  return (
    <Stack alignItems="flex-start" {...props}>
      <Typography variant="h6" gutterBottom {...labelProps}>
        {label}
      </Typography>
      {children}
    </Stack>
  )
}

export { FormDetail }
