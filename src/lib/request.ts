import Axios, { AxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_API_URL as string

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = localStorage.getItem('access_token')

  // Fix stupid axios typescript
  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
}

export const request = Axios.create({
  baseURL
})

request.interceptors.request.use(authRequestInterceptor)
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // const message = error.response?.data?.message || error.message
    // Handle toast message

    return Promise.reject(error)
  }
)
