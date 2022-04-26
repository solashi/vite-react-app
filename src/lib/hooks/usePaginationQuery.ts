import { PaginationMeta } from 'components/ReactTable'
import { Pagination } from 'lib/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { useQuery, useQueryClient } from 'react-query'

function usePaginationQuery<T>(
  endpoint: string,
  params?: Record<string, unknown>,
  enabled?: boolean
) {
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    per_page: 10
  })

  const [_params, setParams] = useState(params)

  const queryClient = useQueryClient()

  const { data, isFetching, isPreviousData, ...queryResult } = useQuery<Pagination<T>>(
    [endpoint, { ...meta, ..._params, ...params }],
    {
      keepPreviousData: true,
      staleTime: 10000,
      enabled
    }
  )

  useEffect(() => {
    if (!data) return
    const hasMore = data.current_page < data.last_page
    if (hasMore) {
      queryClient.prefetchQuery([
        endpoint,
        { page: meta.page + 1, per_page: meta.per_page, ..._params, ...params }
      ])
    }
  }, [_params, data, endpoint, meta, params, queryClient])

  const handleChangePagination = useCallback((paginationMeta: PaginationMeta) => {
    setMeta(paginationMeta)
  }, [])

  const resetPagination = useCallback((paginationMeta?: PaginationMeta) => {
    if (paginationMeta) {
      setMeta(paginationMeta)
    } else {
      setMeta({
        page: 1,
        per_page: 10
      })
    }
  }, [])

  const handleChangeParams = useCallback((newParams, resetPaginationMeta = true) => {
    if (resetPaginationMeta) {
      unstable_batchedUpdates(() => {
        setParams(newParams)
        setMeta({
          page: 1,
          per_page: 10
        })
      })
    } else {
      setParams(newParams)
    }
  }, [])

  const paginationData = useMemo(
    () => ({
      data: data?.data || [],
      pageCount: data?.total,
      loading: isFetching,
      isPreviousData,
      handleChangePagination,
      resetPagination,
      meta
    }),
    [
      data?.data,
      data?.total,
      isFetching,
      isPreviousData,
      handleChangePagination,
      resetPagination,
      meta
    ]
  )

  return { paginationData, handleChangeParams, ...queryResult }
}

export { usePaginationQuery }
