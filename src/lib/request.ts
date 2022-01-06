import Axios, { AxiosRequestConfig } from 'axios'
import { history } from 'routers'
import { UserToken } from './types'

const baseURL = import.meta.env.VITE_API_URL as string

export type RefreshTokenResponse = {
  refresh_token: string
  access_token: string
}

let isRefreshing = false
const refreshSubscribers: ((token: string) => void)[] = []

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb)
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token))
}

async function refreshToken(token: UserToken) {
  try {
    const res = await Axios.request<RefreshTokenResponse>({
      method: 'POST',
      url: 'auth/refresh-token',
      baseURL,
      data: {
        refresh_token: token.refresh_token
      }
    })

    return res.data
  } catch (error) {
    localStorage.removeItem('user-token')
    history.push('/login')
  }
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
      if (_token && !isRefreshing) {
        isRefreshing = true
        const token = JSON.parse(_token) as UserToken

        refreshToken(token).then((res) => {
          isRefreshing = false

          if (res?.access_token) {
            localStorage.setItem('user-token', JSON.stringify(res))
            onRefreshed(res?.access_token)
          }
        })
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

    return Promise.reject(error.response.data)
  }
)
