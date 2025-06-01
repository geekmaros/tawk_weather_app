import type { GeoCity } from '@/types/geo'
import { mockGeoDirectCities } from '../../data/mockGeoDirectCities.ts'
import { apiGet, retryRequest } from '@/utils/apiWrapper.ts'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const GEO_BASE = '/geo/1.0'

export const searchGeoCity = async (query: string): Promise<GeoCity[]> => {
  // return mockGeoDirectCities

  const response = await retryRequest(() =>
    apiGet<GeoCity[]>(`${GEO_BASE}/direct`, {
      q: query,
      limit: 5,
      appid: API_KEY,
    }),
  )

  return response.data
}
