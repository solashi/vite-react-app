import { CSSInterpolation } from '@mui/material'
import { blue } from '@mui/material/colors'

export const textBoldButton: CSSInterpolation = {
  fontWeight: 'bold',
  color: blue[600],
  '&:hover': {
    backgroundColor: 'transparent'
  }
}
