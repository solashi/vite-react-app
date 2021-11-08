import {
  ClickAwayListener,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableProps
} from '@mui/material'
import { SxProps } from '@mui/system'
import { TableSkeleton, TableSkeletonType } from 'components/Skeleton'
import { UnknownObj } from 'lib/types'
import { ReactElement, useEffect } from 'react'
import { CellProps, Row as RowProps, TableOptions, useTable } from 'react-table'
import EmptyTable from './EmptyTable'
import Pagination from './Pagination'
import { Cell, Row, SortLabel } from './StyledComponent'
import { actionHook, hooks, selectionHook } from './tableHooks'

export type PaginationMeta = {
  page: number
  per_page: number
}

export type ActionColumnConfig<T extends UnknownObj> = {
  onEdit?(props: CellProps<T>): void
  onDelete?(props: CellProps<T>): void
  editText?: string
  deleteText?: string
  needConfirm?: boolean
}

interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
  tableProps?: TableProps
  sx?: SxProps
  onRowClick?(row: RowProps<T>): void
  onClickAway?(): void
  loading?: boolean
  selection?: boolean
  skeletonConfig?: TableSkeletonType
  pageCount?: number
  handleChangePagination?(paginationMeta: PaginationMeta): void
  usePaginationQuery?: boolean
  isPreviousData?: boolean
  action?: ActionColumnConfig<T>
}

function ReactTable<T extends Record<string, unknown>>(props: TableProperties<T>): ReactElement {
  const {
    columns,
    data,
    pageCount,
    tableProps,
    selection = false,
    action,
    onRowClick = () => undefined,
    onClickAway = () => undefined,
    handleChangePagination,
    usePaginationQuery,
    loading,
    skeletonConfig,
    sx,
    ...useTableOptions
  } = props

  const instance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageSize: 20 },
      manualPagination: true,
      autoResetPage: false,
      pageCount,
      ...useTableOptions
    },
    ...hooks,
    selectionHook(selection),
    actionHook(action)
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize }
  } = instance

  const hasRowClick = typeof onRowClick === 'function'

  useEffect(() => {
    if (typeof handleChangePagination === 'function') {
      handleChangePagination({ page: pageIndex + 1, per_page: pageSize })
    }
  }, [pageIndex, pageSize])

  if (loading && !data.length) {
    return <TableSkeleton {...skeletonConfig} />
  }

  if (!loading && !data.length) {
    return <EmptyTable />
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
                          hideSortIcon={column.id === '_selector'}
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

              return (
                <Row
                  onClick={() => onRowClick(row)}
                  hasRowClick={hasRowClick}
                  hover
                  key={key}
                  {...getRowProps}
                >
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
            <Row>
              <Pagination<T> instance={instance} />
            </Row>
          </TableFooter>
        </Table>
      </TableContainer>
    </ClickAwayListener>
  )
}
export { ReactTable }
