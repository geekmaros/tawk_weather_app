import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import { handleApiError, getErrorMessage } from './errorHandler'
import { toast } from 'vue-sonner'

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'https://api.openweathermap.org',
    timeout: 10000, // 10 seconds
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`)
      return config
    },
    (error) => {
      console.error('Request interceptor error:', error)
      return Promise.reject(error)
    },
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(`Response received from: ${response.config.url}`, {
        status: response.status,
        dataLength: JSON.stringify(response.data).length,
      })
      return response
    },
    (error) => {
      const apiError = handleApiError(error)
      const message = getErrorMessage(apiError)

      toast.error(message)
      return Promise.reject(apiError)
    },
  )

  return instance
}

export const apiClient = createAxiosInstance()
