import { Page } from 'components/Layouts'
import { ActionColumnConfig, ReactTable } from 'components/ReactTable'
import { useApiResource, usePaginationQuery } from 'lib/hooks'
import { Company } from 'lib/types'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CellProps, Column, Row } from 'react-table'
import LeftHeader from './LeftHeader'

const actionConfig: ActionColumnConfig = {
  needConfirm: true
}

const CustomerCompany: React.VFC = () => {
  const { paginationData, refetch } = usePaginationQuery<Company>('companies')
  const { deleteApi } = useApiResource('companies')
  const navigate = useNavigate()

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

  const onRowClick = ({ original }: Row<Company>) => {
    navigate('/customer-company/' + original.id)
  }

  return (
    <Page title="企業一覧" leftHeader={<LeftHeader />}>
      <ReactTable<Company>
        columns={columns}
        defaultActionEdit
        actionConfig={actionConfig}
        onActionDelete={handleDelete}
        onRowClick={onRowClick}
        {...paginationData}
      />
    </Page>
  )
}

export { CustomerCompany }
