import { Page } from 'components/Layouts'
import { ReactTable } from 'components/ReactTable'
import { useApiResource, usePaginationQuery } from 'lib/hooks'
import { useDialog } from 'lib/providers'
import { CompanyGroup as GroupType } from 'lib/types'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { CellProps, Column, Row } from 'react-table'
import LeftHeader from './LeftHeader'

const CompanyGroup: React.VFC = () => {
  const { paginationData, refetch } = usePaginationQuery<GroupType>('groups')
  const { deleteApi } = useApiResource<GroupType>('groups')
  const dialog = useDialog()
  const navigate = useNavigate()

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
    [deleteApi, dialog, refetch]
  )

  const onRowClick = ({ original }: Row<GroupType>) => {
    navigate('/company-group/' + original.id)
  }

  return (
    <Page title="企業一覧" leftHeader={<LeftHeader />}>
      <ReactTable<GroupType>
        columns={columns}
        defaultActionEdit
        onRowClick={onRowClick}
        onActionDelete={handleDelete}
        {...paginationData}
      />
    </Page>
  )
}

export { CompanyGroup }
