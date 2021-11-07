import {
  ClickAwayListener,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableProps,
  TableRow
} from '@mui/material'
import { SxProps } from '@mui/system'
import { TableSkeleton, TableSkeletonType } from 'components/Skeleton'
import { ReactElement } from 'react'
import { Row as RowProps, TableOptions, useTable } from 'react-table'
import EmptyTable from './EmptyTable'
import Pagination from './Pagination'
import { Cell, Row, SortLabel } from './StyledComponent'
import { hooks, selectionHook } from './tableHooks'

interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
  tableProps?: TableProps
  sx?: SxProps
  onRowClick?(row: RowProps<T>): void
  onClickAway?(): void
  loading?: boolean
  selection?: boolean
  skeletonConfig?: TableSkeletonType
  pageCount?: number
}

function ReactTable<T extends Record<string, unknown>>(props: TableProperties<T>): ReactElement {
  const {
    columns,
    data,
    pageCount = 0,
    tableProps,
    selection = false,
    onRowClick,
    onClickAway = () => undefined,
    loading,
    skeletonConfig,
    sx,
    ...useTableOptions
  } = props

  const instance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageSize: 50 },
      manualPagination: true,
      pageCount,
      ...useTableOptions
    },
    ...hooks,
    selectionHook(selection)
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = instance

  if (!loading && !data.length) {
    return <EmptyTable />
  }

  if (loading && !data.length) {
    return <TableSkeleton {...skeletonConfig} />
  }

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <TableContainer component={Paper} sx={sx}>
        <Table {...tableProps} {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => {
              const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps()
              return (
                <Row key={key} {...headerGroupProps}>
                  {headerGroup.headers.map((column) => {
                    const { key, ...cellHeaderProps } = column.getHeaderProps(
                      column.getSortByToggleProps()
                    )

                    return (
                      <Cell
                        variant="head"
                        sortDirection={column.isSortedDesc ? 'desc' : 'asc'}
                        key={key}
                        {...cellHeaderProps}
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
              )
            })}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              const { key, ...getRowProps } = row.getRowProps()

              const onRow = () => {
                if (typeof onRowClick === 'function') {
                  onRowClick(row)
                }
              }
              return (
                <Row onClick={onRow} hover key={key} {...getRowProps}>
                  {row.cells.map((cell) => {
                    const { key, ...getCellProps } = cell.getCellProps()
                    return (
                      <Cell variant="body" key={key} {...getCellProps}>
                        {cell.render('Cell')}
                      </Cell>
                    )
                  })}
                </Row>
              )
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <Pagination<T> instance={instance} />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </ClickAwayListener>
  )
}
export { ReactTable }
