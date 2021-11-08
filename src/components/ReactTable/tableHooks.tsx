import { Checkbox } from '@mui/material'
import { CellProps, HeaderProps, Hooks, usePagination, useRowSelect, useSortBy } from 'react-table'

function selectionHook<T extends Record<string, unknown>>(enabled: boolean) {
  return (hooks: Hooks<T>) => {
    if (!enabled) return
    hooks.allColumns.push((columns) => [
      {
        id: '_selector',
        Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<T>) => (
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            indeterminate
            {...getToggleAllRowsSelectedProps()}
          />
        ),
        Cell: ({ row }: CellProps<T>) => (
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            indeterminate
            {...row.getToggleRowSelectedProps()}
          />
        )
      },
      ...columns
    ])
  }
}

const hooks = [useSortBy, usePagination, useRowSelect]

export { hooks, selectionHook }
