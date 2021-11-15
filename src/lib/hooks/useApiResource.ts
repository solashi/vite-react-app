import { AxiosRequestConfig } from 'axios'
import { request } from 'lib/request'
import { ServerResponse } from 'lib/types'
import { useCallback } from 'react'

export interface InstanceCommon {
  id: number
}

const useApiResource = <
  TInstance extends InstanceCommon,
  TCreateValues = Omit<TInstance, 'id'>,
  TUpdateValues extends InstanceCommon = TInstance
>(
  url: string
) => {
  const indexApi = useCallback(() => request.get<TInstance[]>(url), [url])

  const createApi = useCallback(
    <TResponse = TInstance>(values: TCreateValues, config?: AxiosRequestConfig) =>
      request.post<TResponse>(url, values, config),
    [url]
  )

  const updateApi = useCallback(
    <TResponse = ServerResponse<TInstance>>(values: TUpdateValues, config?: AxiosRequestConfig) =>
      request.patch<TResponse>(`${url}/${(values as TUpdateValues).id}`, values, config),
    [url]
  )

  const createOrUpdateApi = useCallback(
    <TResponse = ServerResponse<TInstance>>(
      values: TCreateValues | TUpdateValues,
      config?: AxiosRequestConfig
    ) => {
      if ((values as TUpdateValues).id) {
        return request.patch<TResponse>(`${url}/${(values as TUpdateValues).id}`, values, config)
      } else {
        return request.post<TResponse>(url, values, config)
      }
    },
    [url]
  )

  const showApi = useCallback(
    <TResponse = TInstance>(id: number, config?: AxiosRequestConfig) =>
      request.get<TResponse>(`${url}/${id}`, config),
    [url]
  )

  const deleteApi = useCallback(
    <TResponse = ServerResponse<boolean>>(id: number, config?: AxiosRequestConfig) =>
      request.delete<TResponse>(`${url}/${id}`, config),
    [url]
  )

  return { indexApi, createApi, updateApi, showApi, deleteApi, createOrUpdateApi }
}

export { useApiResource }
