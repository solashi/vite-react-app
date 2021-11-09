import { Button, Stack } from '@mui/material'
import { useDialog } from 'lib/providers'
import { UnknownObj } from 'lib/types'
import { useNavigate } from 'react-router-dom'
import { CellProps } from 'react-table'
import { ActionColumnConfig } from '..'
import { CellContainer } from './CellContainer'

interface TableActionProps<T extends UnknownObj> extends CellProps<T> {
  actionConfig: ActionColumnConfig<T>
}

export const TableActionContainer = <Stack onClick={(e) => e.stopPropagation()} />

function TableAction<T extends Record<string, unknown>>(props: TableActionProps<T>) {
  const { row, actionConfig } = props
  const {
    onDelete,
    onEdit,
    editText = '編集',
    deleteText = '削除',
    deleteConfirmText = 'Do you want to delete this record?',
    needConfirm = false
  } = actionConfig
  const { original } = row
  const navigate = useNavigate()
  const dialog = useDialog()

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

  const _delete = () => {
    if (hasDelete) {
      onDelete(props)
    }
  }

  const deleteConfirm = async () => {
    try {
      if (hasDelete) {
        await dialog({ description: deleteConfirmText })
        onDelete(props)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = () => {
    if (needConfirm) {
      deleteConfirm()
    } else {
      _delete()
    }
  }

  return (
    <CellContainer direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
      {hasEdit && <Button onClick={handleEdit}>{editText}</Button>}
      {hasDelete && <Button onClick={handleDelete}>{deleteText}</Button>}
    </CellContainer>
  )
}

export { TableAction }
