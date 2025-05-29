import { ref, type Ref } from 'vue'
import type { ApiError } from '../types/api'
import { getErrorMessage } from '../utils/errorHandler'

interface UseApiState<T, TArgs extends readonly unknown[]> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<ApiError | null>
  execute: (...args: TArgs) => Promise<T | null>
  reset: () => void
}

export const useApi = <T, TArgs extends readonly unknown[]>(
  apiFunction: (...args: TArgs) => Promise<T>,
): UseApiState<T, TArgs> => {
  const data = ref(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  const execute = async (...args: TArgs): Promise<T | null> => {
    try {
      loading.value = true
      error.value = null

      const result = await apiFunction(...args)
      data.value = result

      return result
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError
      console.error('API call failed:', getErrorMessage(apiError))
      return null
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    loading.value = false
    error.value = null
  }

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}
