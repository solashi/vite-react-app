/* eslint-disable react/jsx-key */
import {
  ClickAwayListener,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableProps,
  Typography
} from '@mui/material'
import { Box, SxProps } from '@mui/system'
import { TableSkeleton, TableSkeletonType } from 'components/Skeleton'
import { cloneDeep } from 'lodash'
import { useCallback } from 'react'
import { Row as RowProps, TableOptions, useRowSelect, useSortBy, useTable } from 'react-table'
import {
  Cell,
  CellInSticky,
  Row,
  SortLabel,
  StickyLeftCell,
  StickyRightCell
} from './StyledComponent'

interface Props<T extends Record<string, unknown>> extends TableOptions<T> {
  tableProps?: TableProps
  sx?: SxProps
  rowSx?: SxProps
  cellSx?: SxProps
  headCellSx?: SxProps
  bodyCellSx?: SxProps
  onRowClick?(row: RowProps<T>): void
  FooterSlot?: React.VFC
  onClickAway?(): void
  loading?: boolean
  fixedColumns?: {
    left?: number
    right?: number
  }
  skeletonConfig?: TableSkeletonType
}

function ReactTable<T extends Record<string, unknown>>(props: Props<T>) {
  const {
    columns,
    data,
    tableProps,
    rowSx,
    cellSx,
    headCellSx,
    bodyCellSx,
    onRowClick,
    FooterSlot,
    onClickAway = () => undefined,
    loading,
    fixedColumns,
    skeletonConfig,
    sx,
    ...useTableOptions
  } = props

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>(
    {
      columns,
      data,
      ...useTableOptions
    },
    useSortBy,
    useRowSelect
  )

  const getFixedArray = useCallback(
    function fixedArray<Type>(arr: Type[]): (Type[] & Type[][]) | Type[] {
      if (!arr?.length) return []
      if (!fixedColumns) return arr
      const _arr = cloneDeep(arr) as Type[] & Type[][]
      if (fixedColumns?.left) {
        _arr.unshift(_arr.splice(0, fixedColumns.left))
      }
      if (fixedColumns?.right) {
        _arr.push(_arr.splice(-fixedColumns.right, fixedColumns.right))
      }
      return _arr
    },
    [fixedColumns]
  )

  if (!loading && !data.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 48,
          backgroundColor: (theme) => theme.palette.grey[100],
          marginBottom: (theme) => theme.spacing(2),
          width: '100%',
          mb: 4
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No data
        </Typography>
      </Box>
    )
  }

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <>
        {loading && !data.length ? (
          <TableSkeleton {...skeletonConfig} />
        ) : (
          <TableContainer component={Paper} variant="outlined" sx={sx}>
            <Table {...tableProps} {...getTableProps()}>
              <TableHead>
                {headerGroups.map((headerGroup) => (
                  <Row {...headerGroup.getHeaderGroupProps()}>
                    {getFixedArray(headerGroup.headers).map((column, index) => {
                      if (Array.isArray(column)) {
                        const StickyCell = index === 0 ? StickyLeftCell : StickyRightCell
                        return (
                          <StickyCell variant="head" key={index} sx={headCellSx || cellSx}>
                            {column.map((c) => (
                              <CellInSticky
                                style={{ width: c.width }}
                                component="div"
                                sortDirection={c.isSortedDesc ? 'desc' : 'asc'}
                                {...c.getHeaderProps(c.getSortByToggleProps())}
                              >
                                <SortLabel
                                  active={c.isSorted}
                                  // react-table has a unsorted state which is not treated here
                                  direction={c.isSortedDesc ? 'desc' : 'asc'}
                                >
                                  {c.render('Header')}
                                </SortLabel>
                              </CellInSticky>
                            ))}
                          </StickyCell>
                        )
                      }
                      return (
                        <Cell
                          variant="head"
                          sx={headCellSx || cellSx}
                          sortDirection={column.isSortedDesc ? 'desc' : 'asc'}
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                        >
                          <SortLabel
                            active={column.isSorted}
                            // react-table has a unsorted state which is not treated here
                            direction={column.isSortedDesc ? 'desc' : 'asc'}
                          >
                            <Stack direction="row" alignItems="center">
                              {column.render('Header')}
                            </Stack>
                          </SortLabel>
                        </Cell>
                      )
                    })}
                  </Row>
                ))}
              </TableHead>
              <TableBody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row)
                  const onRow = () => {
                    if (typeof onRowClick === 'function') {
                      onRowClick(row)
                    }
                  }
                  return (
                    <Row onClick={onRow} hover {...row.getRowProps()} sx={rowSx}>
                      {getFixedArray(row.cells).map((cell, index) => {
                        if (Array.isArray(cell)) {
                          const StickyCell = index === 0 ? StickyLeftCell : StickyRightCell
                          return (
                            <StickyCell key={index} sx={bodyCellSx || cellSx} variant="body">
                              {cell.map((c) => (
                                <CellInSticky
                                  style={{ width: c.column.width }}
                                  component="div"
                                  {...c.getCellProps()}
                                >
                                  {c.render('Cell')}
                                </CellInSticky>
                              ))}
                            </StickyCell>
                          )
                        }

                        return (
                          <Cell variant="body" sx={bodyCellSx || cellSx} {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </Cell>
                        )
                      })}
                    </Row>
                  )
                })}
              </TableBody>
            </Table>

            {FooterSlot && <FooterSlot />}
          </TableContainer>
        )}
      </>
    </ClickAwayListener>
  )
}
export { ReactTable }
