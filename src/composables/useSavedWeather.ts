import { useLocalStorage } from '@vueuse/core'
import type { SavedWeatherItem } from '@/types/weather'

// we need this so we can have consistent lat and long
function normalizeCoord(coord: number): number {
  return parseFloat(coord.toFixed(4))
}

export const useSavedWeather = () => {
  const savedCoords = useLocalStorage<SavedWeatherItem[]>('saved-weathers', [])

  const isSaved = (lat: number, lon: number): boolean => {
    const nLat = normalizeCoord(lat)
    const nLon = normalizeCoord(lon)

    return savedCoords.value.some(
      (item) => normalizeCoord(item.lat) === nLat && normalizeCoord(item.lon) === nLon,
    )
  }

  const addSaved = (item: SavedWeatherItem) => {
    const nLat = normalizeCoord(item.lat)
    const nLon = normalizeCoord(item.lon)

    if (!isSaved(nLat, nLon)) {
      savedCoords.value.push({ ...item, lat: nLat, lon: nLon })
    }
  }

  const removeSaved = (lat: number, lon: number) => {
    const nLat = normalizeCoord(lat)
    const nLon = normalizeCoord(lon)

    const index = savedCoords.value.findIndex(
      (item) => normalizeCoord(item.lat) === nLat && normalizeCoord(item.lon) === nLon,
    )

    if (index !== -1) {
      savedCoords.value.splice(index, 1)
    }
  }

  const toggleSaved = (item: SavedWeatherItem) => {
    if (isSaved(item.lat, item.lon)) {
      removeSaved(item.lat, item.lon)
    } else {
      addSaved(item)
    }
  }

  return {
    savedCoords,
    isSaved,
    addSaved,
    removeSaved,
    toggleSaved,
  }
}
