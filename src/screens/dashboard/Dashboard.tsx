import { Page } from 'components/Layouts'
import { ReactTable } from 'components/ReactTable'
import { usePaginationQuery } from 'lib/hooks'
import { AdminUser } from 'lib/types'
import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'

const Dashboard: React.VFC = () => {
  const { paginationData } = usePaginationQuery<AdminUser>('admin-users')

  const columns = useMemo<Column<AdminUser>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Email',
        accessor: 'email'
      }
    ],
    []
  )

  return (
    <Page title="ダッシュボード">
      <ReactTable<AdminUser>
        columns={columns}
        {...paginationData}
        onRowClick={() => console.log('on row click')}
        action={{
          onEdit: ({ row }: CellProps<AdminUser>) => {
            console.log(row.original.name)
          },
          onDelete: ({ row }: CellProps<AdminUser>) => {
            alert(row.original.name)
          }
        }}
      />
    </Page>
  )
}

export { Dashboard }
