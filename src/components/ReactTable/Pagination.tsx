import { TablePagination } from '@mui/material'
import { ReactElement, useCallback } from 'react'
import { TableInstance } from 'react-table'
import TablePaginationActions from './PaginationAction'

type PaginationProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>
}

function Pagination<T extends Record<string, unknown>>({
  instance
}: PaginationProps<T>): ReactElement {
  const {
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize }
  } = instance

  const handleChangePage = useCallback(
    (_, newPage: number) => {
      if (newPage === pageIndex + 1) {
        nextPage()
      } else if (newPage === pageIndex - 1) {
        previousPage()
      } else {
        gotoPage(newPage)
      }
    },
    [gotoPage, nextPage, pageIndex, previousPage]
  )

  const handleChangeRowsPerPage = useCallback(
    (e) => {
      setPageSize(Number(e.target.value))
    },
    [setPageSize]
  )

  return (
    <TablePagination
      rowsPerPageOptions={[50, 100, 200, { label: 'All', value: -1 }]}
      colSpan={instance.columns.length}
      count={pageCount}
      rowsPerPage={pageSize}
      page={pageIndex}
      SelectProps={{
        inputProps: {
          'aria-label': 'rows per page'
        },
        native: true
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  )
}

export default Pagination
