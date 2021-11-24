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

export type RefreshTokenResponse = {
  refresh_token: string
  access_token: string
}

async function refreshToken(token: UserToken) {
  try {
    const res = await Axios.request<RefreshTokenResponse>({
      method: 'POST',
      baseURL,
      data: {
        refresh_token: token.refresh_token
      }
    })

    return res.data
  } catch (error) {
    console.log(error)
  }
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
    // Handle refresh token
    if (error.response && error.response.status === 401) {
      const _token = localStorage.getItem('user-token')
      if (_token) {
        const token = JSON.parse(_token) as UserToken
        return refreshToken(token).then((res) => {
          error.config.headers.authorization = `Bearer ${res?.access_token}`
          localStorage.setItem('user-token', JSON.stringify(res))
          return request.request(error.config)
        })
      }
    }

    return Promise.reject(error.response.data)
  }
)
