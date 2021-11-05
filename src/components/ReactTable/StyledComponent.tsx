import {
  TableCell,
  tableCellClasses,
  TableRow,
  tableRowClasses,
  TableSortLabel
} from '@mui/material'
import { styled } from '@mui/system'

const Cell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 12,
    lineHeight: '18px',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.grey[300]
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.grey[600],
    lineHeight: '20px',
    borderColor: theme.palette.grey[200]
  }
}))

const StickyLeftCell = styled(Cell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    left: 0,
    position: 'sticky',
    zIndex: 1102,
    backgroundColor: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    left: 0,
    position: 'sticky',
    zIndex: 1101,
    backgroundColor: theme.palette.common.white
  }
}))

const StickyRightCell = styled(Cell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    right: 0,
    position: 'sticky',
    zIndex: 1102,
    backgroundColor: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    right: 0,
    position: 'sticky',
    zIndex: 1101,
    backgroundColor: theme.palette.common.white
  }
}))

const CellInSticky = styled(Cell)({
  padding: 0,
  margin: 0,
  border: 'none'
})

const Row = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.hover}`]: {
    cursor: 'pointer',
    '&$hover:hover': {
      backgroundColor: theme.palette.grey[100],
      '& td': {
        backgroundColor: theme.palette.grey[100]
      }
    }
  }
}))

const SortLabel = styled(TableSortLabel)({})

export { Cell, StickyLeftCell, StickyRightCell, CellInSticky, Row, SortLabel }
