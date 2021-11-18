import { Page } from 'components/Layouts'
import { ReactTable } from 'components/ReactTable'
import { useApiResource, usePaginationQuery } from 'lib/hooks'
import { useDialog } from 'lib/providers'
import { UserType } from 'lib/types/user'
import { useCallback, useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import LeftHeader from './LeftHeader'

const User: React.VFC = () => {
  const { paginationData, refetch } = usePaginationQuery<UserType>('users')
  const dialog = useDialog()
  const { deleteApi } = useApiResource<UserType>('users')

  const columns = useMemo<Column<UserType>[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: '姓',
        accessor: 'last_name'
      },
      {
        Header: '名',
        accessor: 'first_name'
      },
      {
        Header: 'ステータス',
        accessor: 'status'
      },
      {
        Header: '所属企業',
        accessor: 'company'
      },
      {
        Header: '担当したことのある コンシェルジュ',
        accessor: 'concierge'
      }
    ],
    []
  )

  const handleDelete = useCallback(
    async ({ row }: CellProps<UserType>) => {
      await dialog({
        description: 'Do you want to delete this cord?'
      })
      try {
        await deleteApi(row.original.id)
        refetch()
      } catch (error) {
        console.log(error)
      }
    },
    [deleteApi, dialog, refetch]
  )

  return (
    <Page title="ユーザー一覧" leftHeader={<LeftHeader />}>
      <ReactTable<UserType>
        columns={columns}
        defaultActionEdit
        onActionDelete={handleDelete}
        {...paginationData}
      />
    </Page>
  )
}

export { User }
