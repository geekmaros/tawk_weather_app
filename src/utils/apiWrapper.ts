import type { AxiosRequestConfig } from 'axios'
import type { ApiResponse, ApiError } from '../types/api'
import type { WeatherRequestParams, ForecastRequestParams } from '../types/weather.ts'
import { apiClient } from './axiosConfig'
import { isRetryableError } from './errorHandler'
import type { ForecastData, WeatherData } from '@/types/weather.ts'
import { sleep } from '@/utils/helpers.ts'

// Utility types for better type safety
type QueryParams = Record<string, string | number | boolean | undefined>
type RequestBody = Record<string, unknown> | FormData | string | number | boolean | null

export const apiGet = async <TResponse>(
  url: string,
  params?: QueryParams,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<TResponse>> => {
  try {
    const response = await apiClient.get<TResponse>(url, {
      ...config,
      params: {
        ...params,
        ...config?.params,
      },
    })

    return {
      data: response.data,
      status: response.status,
      message: 'Request successful',
    }
  } catch (error) {
    throw error // Re-throw the processed error from interceptor
  }
}

export const apiPost = async <TResponse, TRequestBody = RequestBody>(
  url: string,
  data?: TRequestBody,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<TResponse>> => {
  try {
    const response = await apiClient.post<TResponse>(url, data, config)

    return {
      data: response.data,
      status: response.status,
      message: 'Request successful',
    }
  } catch (error) {
    throw error
  }
}

export const apiPut = async <TResponse, TRequestBody = RequestBody>(
  url: string,
  data?: TRequestBody,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<TResponse>> => {
  try {
    const response = await apiClient.put<TResponse>(url, data, config)

    return {
      data: response.data,
      status: response.status,
      message: 'Request successful',
    }
  } catch (error) {
    throw error
  }
}

export const apiPatch = async <TResponse, TRequestBody = RequestBody>(
  url: string,
  data?: TRequestBody,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<TResponse>> => {
  try {
    const response = await apiClient.patch<TResponse>(url, data, config)

    return {
      data: response.data,
      status: response.status,
      message: 'Request successful',
    }
  } catch (error) {
    throw error
  }
}

export const apiDelete = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<TResponse>> => {
  try {
    const response = await apiClient.delete<TResponse>(url, config)

    return {
      data: response.data,
      status: response.status,
      message: 'Request successful',
    }
  } catch (error) {
    throw error
  }
}

// Utility function for retrying failed requests with proper typing
export const retryRequest = async <TResponse>(
  requestFn: () => Promise<ApiResponse<TResponse>>,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<ApiResponse<TResponse>> => {
  let lastError: ApiError | Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn()
    } catch (error) {
      lastError = error as ApiError

      if (!isRetryableError(lastError as ApiError) || attempt === maxRetries) {
        throw lastError
      }

      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`)
      await sleep(delay)
      delay *= 2
    }
  }

  throw lastError!
}

// Type-safe wrapper functions for common use cases
export const fetchWeatherData = (city: string, apiKey: string) =>
  apiGet<WeatherData>('/weather', {
    q: city,
    appid: apiKey,
    units: 'metric',
  })

export const fetchForecastData = (city: string, apiKey: string) =>
  apiGet<ForecastData>('/forecast', {
    q: city,
    appid: apiKey,
    units: 'metric',
  })

export const fetchWeatherByCoords = (lat: number, lon: number, apiKey: string) =>
  apiGet<WeatherData>('/weather', {
    lat: lat.toString(),
    lon: lon.toString(),
    appid: apiKey,
    units: 'metric',
  })

const toQueryParams = (params: WeatherRequestParams | ForecastRequestParams): QueryParams => {
  const queryParams: QueryParams = {}

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams[key] = typeof value === 'number' ? value.toString() : value
    }
  })

  return queryParams
}

// Type-safe weather API functions
export const getWeatherWithParams = (params: WeatherRequestParams) =>
  apiGet<WeatherData>('/weather', toQueryParams(params))

export const getForecastWithParams = (params: ForecastRequestParams) =>
  apiGet<ForecastData>('/forecast', toQueryParams(params))

// Generic API response handler with better error typing
export const handleApiResponse = async <TResponse>(
  apiCall: Promise<ApiResponse<TResponse>>,
): Promise<{ success: true; data: TResponse } | { success: false; error: ApiError }> => {
  try {
    const response = await apiCall
    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, error: error as ApiError }
  }
}

// Usage examples with proper typing:
/*
// ✅ Properly typed - TypeScript knows the response type
const weatherResponse = await apiGet<WeatherData>('/weather', { q: 'London' })
// weatherResponse.data is of type WeatherData

// ✅ Type-safe parameters
const params: WeatherRequestParams = {
  q: 'London',
  appid: 'your-api-key',
  units: 'metric'
}
const typedWeather = await getWeatherWithParams(params)

// ✅ Safe error handling
const result = await handleApiResponse(
  apiGet<WeatherData>('/weather', { q: 'London' })
)

if (result.success) {
  // result.data is WeatherData
  console.log(result.data.main.temp)
} else {
  // result.error is ApiError
  console.error(result.error.message)
}
*/
