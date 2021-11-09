import { Stack, StackProps } from '@mui/material'

const CellContainer: React.FC<StackProps> = ({ children }) => {
  return <Stack onClick={(e) => e.stopPropagation()}>{children}</Stack>
}

export { CellContainer }
