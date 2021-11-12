import { PaginationMeta } from 'components/ReactTable'
import { Pagination } from 'lib/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'

function usePaginationQuery<T>(endpoint: string, params?: Record<string, unknown>) {
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    per_page: 10
  })

  const queryClient = useQueryClient()

  const { data, isFetching, isPreviousData, ...queryResult } = useQuery<Pagination<T>>(
    [endpoint, { ...meta, ...params }],
    {
      keepPreviousData: true,
      staleTime: 10000
    }
  )

  useEffect(() => {
    if (!data) return
    const hasMore = data.current_page < data.last_page
    if (hasMore) {
      queryClient.prefetchQuery([endpoint, { page: meta.page + 1, per_page: meta.per_page }])
    }
  }, [data, endpoint, meta, queryClient])

  const handleChangePagination = useCallback((paginationMeta: PaginationMeta) => {
    setMeta(paginationMeta)
  }, [])

  const paginationData = useMemo(
    () => ({
      data: data?.data || [],
      pageCount: data?.total,
      loading: isFetching,
      isPreviousData,
      handleChangePagination
    }),
    [data, isFetching, isPreviousData, handleChangePagination]
  )

  return { paginationData, ...queryResult }
}

export { usePaginationQuery }
