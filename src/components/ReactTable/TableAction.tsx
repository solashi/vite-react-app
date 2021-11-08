import { Button, Stack } from '@mui/material'
import { UnknownObj } from 'lib/types'
import { useNavigate } from 'react-router-dom'
import { CellProps } from 'react-table'
import { ActionColumnConfig } from '.'

interface TableActionProps<T extends UnknownObj> extends CellProps<T> {
  actionConfig: ActionColumnConfig<T>
}

export const TableActionContainer = <Stack onClick={(e) => e.stopPropagation()} />

function TableAction<T extends Record<string, unknown>>(props: TableActionProps<T>) {
  const { row, actionConfig } = props
  const { onDelete, onEdit, editText = '編集', deleteText = '削除' } = actionConfig
  const { original } = row
  const navigate = useNavigate()

  const hasEdit = typeof onEdit === 'function'
  const hasDelete = typeof onDelete === 'function'

  const defaultEditAction = () => {
    navigate(`edit/${original.id}`)
  }

  const handleEdit = () => {
    if (hasEdit) {
      onEdit(props)
    } else {
      defaultEditAction()
    }
  }

  const handleDelete = () => {
    if (hasDelete) {
      onDelete(props)
    }
  }

  return (
    <Stack direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
      {hasEdit && <Button onClick={handleEdit}>{editText}</Button>}
      {hasDelete && <Button onClick={handleDelete}>{deleteText}</Button>}
    </Stack>
  )
}

export default TableAction
