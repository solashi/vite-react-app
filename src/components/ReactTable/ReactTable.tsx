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
import { ReactElement, useEffect } from 'react'
import { CellProps, Row as RowProps, TableOptions, useTable } from 'react-table'
import { Cell, Row, SortLabel } from './components'
import EmptyTable from './EmptyTable'
import { Pagination } from './Pagination'
import { actionHook, hooks, selectionHook } from './tableHooks'

export type PaginationMeta = {
  page: number
  per_page: number
}

export type ActionColumnConfig = {
  editText?: string
  deleteText?: string
  needConfirm?: boolean
  deleteConfirmText?: string
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
  isPreviousData?: boolean
  actionConfig?: ActionColumnConfig
  onActionEdit?(props: CellProps<T>): void
  onActionDelete?(props: CellProps<T>): void
  defaultActionEdit?: boolean
}

function ReactTable<T extends Record<string, unknown>>(props: TableProperties<T>): ReactElement {
  const {
    columns,
    data,
    pageCount,
    tableProps,
    selection = false,
    actionConfig,
    onActionEdit,
    onActionDelete,
    onRowClick,
    onClickAway = () => undefined,
    handleChangePagination,
    loading,
    defaultActionEdit,
    skeletonConfig,
    sx,
    ...useTableOptions
  } = props

  const instance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
      manualPagination: true,
      autoResetPage: false,
      pageCount,
      ...useTableOptions
    },
    ...hooks,
    selectionHook(selection),
    actionHook({ actionConfig, onActionEdit, onActionDelete, defaultActionEdit })
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
  }, [handleChangePagination, pageIndex, pageSize])

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
                          hideSortIcon={column.id === '_selector' || column.id === '__action'}
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
                  onClick={() => hasRowClick && onRowClick(row)}
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
