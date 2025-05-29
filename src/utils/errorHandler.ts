import type { ApiError } from '../types/api'

// Type for axios error structure
interface AxiosError {
  response?: {
    status: number
    data?: unknown
  }
  message?: string
  code?: string
}

// Type guard to check if error has axios structure
const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === 'object' && error !== null && 'response' in error
}

export const handleApiError = (error: unknown): ApiError => {
  console.error('API Error:', error)

  // Network error (no response)
  if (!isAxiosError(error) || !error.response) {
    return {
      message: 'Network error. Please check your internet connection.',
      code: 'NETWORK_ERROR',
    }
  }

  const { status, data } = error.response

  // Handle specific HTTP status codes
  switch (status) {
    case 400:
      return {
        message: getDataMessage(data) || 'Invalid request. Please check your input.',
        status: 400,
        code: 'BAD_REQUEST',
        details: data,
      }

    case 401:
      return {
        message: 'Invalid API key. Please check your OpenWeatherMap API key.',
        status: 401,
        code: 'UNAUTHORIZED',
      }

    case 403:
      return {
        message: 'Access forbidden. Your API key may not have the required permissions.',
        status: 403,
        code: 'FORBIDDEN',
      }

    case 404:
      return {
        message: 'City not found. Please check the city name and try again.',
        status: 404,
        code: 'NOT_FOUND',
      }

    case 429:
      return {
        message: 'Rate limit exceeded. Please try again later.',
        status: 429,
        code: 'RATE_LIMIT',
      }

    case 500:
      return {
        message: 'Server error. Please try again later.',
        status: 500,
        code: 'SERVER_ERROR',
      }

    case 503:
      return {
        message: 'Service temporarily unavailable. Please try again later.',
        status: 503,
        code: 'SERVICE_UNAVAILABLE',
      }

    default:
      return {
        message: getDataMessage(data) || `Request failed with status ${status}`,
        status,
        code: 'UNKNOWN_ERROR',
        details: data,
      }
  }
}

// Helper function to safely extract message from unknown data
const getDataMessage = (data: unknown): string | null => {
  if (typeof data === 'object' && data !== null && 'message' in data) {
    const message = (data as { message: unknown }).message
    return typeof message === 'string' ? message : null
  }
  return null
}

export const getErrorMessage = (error: ApiError): string => {
  return error.message
}

export const isRetryableError = (error: ApiError): boolean => {
  const retryableCodes = ['NETWORK_ERROR', 'SERVER_ERROR', 'SERVICE_UNAVAILABLE']
  return retryableCodes.includes(error.code || '')
}
