import Axios, { AxiosRequestConfig } from 'axios'
import { UserToken } from './types'

const baseURL = import.meta.env.VITE_API_URL as string

export type RefreshTokenResponse = {
  refresh_token: string
  access_token: string
}

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []
let count = 0

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb)
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token))
}

async function refreshToken(token: UserToken) {
  const res = await Axios.request<RefreshTokenResponse>({
    method: 'POST',
    url: 'auth/refresh-token',
    baseURL,
    data: {
      refresh_token: token.refresh_token
    }
  })

  return res.data
}

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

    if (error.response && error.response.status === 401) {
      const _token = localStorage.getItem('user-token')
      if (_token && !isRefreshing && count < 1) {
        count++
        isRefreshing = true
        const token = JSON.parse(_token) as UserToken

        refreshToken(token)
          .then((res) => {
            if (res?.access_token) {
              localStorage.setItem('user-token', JSON.stringify(res))
              onRefreshed(res?.access_token)
            }
          })
          .catch(() => {
            localStorage.removeItem('user-token')
            // push to login
          })
          .finally(() => {
            count = 0
            isRefreshing = false
            refreshSubscribers = []
          })
      } else {
        // push to login
      }

      const retryOrigReq = new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          // replace the expired token and retry
          error.config.headers.authorization = 'Bearer ' + token
          resolve(request(error.config))
        })
      })

      return retryOrigReq
    }
    if (error.response) {
      error.response.data.httpStatus = error.response.status
    }
    return Promise.reject(error.response.data)
  }
)
