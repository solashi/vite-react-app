import Axios, { AxiosRequestConfig } from 'axios'
import { UserToken } from './types'

const baseURL = import.meta.env.VITE_API_URL as string

function authRequestInterceptor(config: AxiosRequestConfig) {
  const _token = localStorage.getItem('user-token')

  // Fix stupid axios typescript
  if (_token && config.headers) {
    const token = JSON.parse(_token) as UserToken
    config.headers.authorization = `Bearer ${token.access_token}`
  }

  return config
}

export const request = Axios.create({
  baseURL
})

request.interceptors.request.use(authRequestInterceptor)
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // const message = error.response?.data?.message || error.message
    // Handle toast message

    return Promise.reject(error.response.data)
  }
)
