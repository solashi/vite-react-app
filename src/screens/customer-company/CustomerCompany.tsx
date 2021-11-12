import { Page } from 'components/Layouts'
import { ActionColumnConfig, ReactTable } from 'components/ReactTable'
import { useApiResource, usePaginationQuery } from 'lib/hooks'
import { CustomerCompany as Company } from 'lib/types'
import { useCallback, useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import LeftHeader from './LeftHeader'

const actionConfig: ActionColumnConfig = {
  needConfirm: true
}

const CustomerCompany: React.VFC = () => {
  const { paginationData, refetch } = usePaginationQuery<Company>('companies')
  const { deleteApi } = useApiResource('companies')

  const columns = useMemo<Column<Company>[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: '企業名',
        accessor: 'name'
      }
    ],
    []
  )

  const handleDelete = useCallback(
    async ({ row }: CellProps<Company>) => {
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
      <ReactTable<Company>
        columns={columns}
        defaultActionEdit
        actionConfig={actionConfig}
        onActionDelete={handleDelete}
        {...paginationData}
      />
    </Page>
  )
}

export { CustomerCompany }
