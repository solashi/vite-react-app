import { Button, Stack } from '@mui/material'
import { useDialog } from 'lib/providers'
import { UnknownObj } from 'lib/types'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CellProps } from 'react-table'
import { ActionColumnConfig } from '..'
import { CellContainer } from './CellContainer'

interface TableActionProps<T extends UnknownObj> extends CellProps<T> {
  actionConfig?: ActionColumnConfig
  onActionEdit?(props: CellProps<T>): void
  onActionDelete?(props: CellProps<T>): void
  defaultActionEdit?: boolean
}

const defaultConfig = {
  editText: '編集',
  deleteText: '削除',
  deleteConfirmText: 'Do you want to delete this record?',
  needConfirm: false
}

export const TableActionContainer = <Stack onClick={(e) => e.stopPropagation()} />

function TableAction<T extends Record<string, unknown>>(props: TableActionProps<T>) {
  const { row, actionConfig, onActionEdit, onActionDelete, defaultActionEdit } = props
  const { editText, deleteText, deleteConfirmText, needConfirm } = actionConfig || defaultConfig

  const { original } = row
  const navigate = useNavigate()
  const dialog = useDialog()

  const hasEdit = typeof onActionEdit === 'function'
  const hasDelete = typeof onActionDelete === 'function'

  const defaultEditAction = () => {
    navigate(`edit/${original.id}`)
  }

  const handleEdit = () => {
    if (hasEdit) {
      onActionEdit(props)
    } else {
      defaultEditAction()
    }
  }

  const _delete = () => {
    if (hasDelete) {
      onActionDelete(props)
    }
  }

  const deleteConfirm = async () => {
    try {
      if (hasDelete) {
        await dialog({ description: deleteConfirmText })
        onActionDelete(props)
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
    <CellContainer direction="row" spacing={1}>
      {!!(defaultActionEdit || hasEdit) && <Button onClick={handleEdit}>{editText}</Button>}
      {hasDelete && <Button onClick={handleDelete}>{deleteText}</Button>}
    </CellContainer>
  )
}

export default memo(TableAction) as typeof TableAction
