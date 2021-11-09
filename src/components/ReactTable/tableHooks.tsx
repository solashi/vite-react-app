import { Checkbox } from '@mui/material'
import { CellProps, HeaderProps, Hooks, usePagination, useRowSelect, useSortBy } from 'react-table'
import { ActionColumnConfig } from '.'
import { TableAction } from './components'

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

function actionHook<T extends Record<string, unknown>>(action?: ActionColumnConfig<T>) {
  return (hooks: Hooks<T>) => {
    if (!action) return
    hooks.allColumns.push((columns) => [
      ...columns,
      {
        id: '__action',
        Cell: (props: CellProps<T>) => <TableAction<T> actionConfig={action} {...props} />
      }
    ])
  }
}

const hooks = [useSortBy, usePagination, useRowSelect]

export { hooks, selectionHook, actionHook }
