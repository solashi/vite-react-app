import { Page } from 'components/Layouts'
import { ReactTable } from 'components/ReactTable'
import { usePaginationQuery } from 'lib/hooks'
import { CustomerCompany as Company } from 'lib/types'
import { useMemo } from 'react'
import { Column } from 'react-table'

const CustomerCompany: React.VFC = () => {
  const { paginationData } = usePaginationQuery<Company>('companies')

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

  return (
    <Page title="企業一覧">
      <ReactTable<Company> columns={columns} {...paginationData} />
    </Page>
  )
}

export { CustomerCompany }
