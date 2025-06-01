import { ref, watch, type Ref } from 'vue'
import { debounce } from '@/utils/debounce'
import { searchGeoCity } from '@/services/geoService'
import { handleApiError } from '@/utils/errorHandler.ts'
import type { GeoCity } from '@/types/geo'

export const useGeocode = (query: Ref<string>) => {
  const suggestions = ref<GeoCity[]>([])
  const loading = ref(false)

  const fetchSuggestions = debounce(async (q: string) => {
    if (!q.trim()) return
    loading.value = true
    try {
      suggestions.value = await searchGeoCity(q)
    } catch (err) {
      const parsed = handleApiError(err)
      console.log(parsed)
      suggestions.value = []
    } finally {
      loading.value = false
    }
  }, 400)

  watch(query, (val) => {
    if (val.length > 2) fetchSuggestions(val)
    else suggestions.value = []
  })

  return {
    suggestions,
    loading,
  }
}
