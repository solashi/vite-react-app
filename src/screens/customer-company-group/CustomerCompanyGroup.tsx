import { Page } from 'components/Layouts'
import { ReactTable } from 'components/ReactTable'
import { useApiResource, usePaginationQuery } from 'lib/hooks'
import { useDialog } from 'lib/providers'
import { CustomerCompanyGroup as GroupType } from 'lib/types'
import { useCallback, useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import LeftHeader from './LeftHeader'

const CustomerCompanyGroup: React.VFC = () => {
  const { paginationData, refetch } = usePaginationQuery<GroupType>('groups')
  const { deleteApi } = useApiResource<GroupType>('groups')
  const dialog = useDialog()

  const columns = useMemo<Column<GroupType>[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'グループ名',
        accessor: 'name'
      },
      {
        Header: 'グループ企業数',
        accessor: 'companies_count'
      }
    ],
    []
  )

  const handleDelete = useCallback(
    async ({ row }: CellProps<GroupType>) => {
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
    [deleteApi, refetch]
  )

  return (
    <Page title="企業一覧" leftHeader={<LeftHeader />}>
      <ReactTable<GroupType>
        columns={columns}
        defaultActionEdit
        onActionDelete={handleDelete}
        {...paginationData}
      />
    </Page>
  )
}

export { CustomerCompanyGroup }
