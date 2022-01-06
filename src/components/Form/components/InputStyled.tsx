import { OutlinedInput, outlinedInputClasses, styled } from '@mui/material'

export type AdditionInputProps = {
  bgcolor?: string | false
}

const InputStyled = styled(OutlinedInput, {
  shouldForwardProp: (props) => props !== 'bgcolor'
})<AdditionInputProps>(({ theme, bgcolor }) => ({
  [`&.${outlinedInputClasses.disabled}`]: {
    backgroundColor: theme.palette.grey[300]
  },
  '& .MuiInputBase-inputSizeSmall': {
    height: '1rem',
    fontSize: '0.75rem',
    padding: theme.spacing(1, 1.5)
  },
  '&.MuiInputBase-sizeSmall': {
    '&& .MuiAutocomplete-input': {
      padding: '2px 4px 2px 6px'
    }
  },
  '& ::placeholder': {
    color: theme.palette.grey[400]
  },
  [`& .${outlinedInputClasses.input}`]: {
    borderRadius: 5,
    position: 'relative',
    backgroundColor: bgcolor || 'none',
    fontSize: 14,
    padding: theme.spacing(1, 1.5)
  },
  height: 40,
  '&& .MuiAutocomplete-input': {
    padding: '2px 4px 2px 6px'
  }
}))

export { InputStyled }
