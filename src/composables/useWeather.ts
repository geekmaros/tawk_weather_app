import { computed } from 'vue'

import {
  getCurrentWeather,
  getWeatherByCoords,
  getForecast,
  getForecastByCoords,
} from '../services/weatherService'
import { useApi } from './useApi'

export const useWeather = () => {
  const currentWeatherApi = useApi(getCurrentWeather)
  const weatherByCoordsApi = useApi(getWeatherByCoords)
  const forecastApi = useApi(getForecast)
  const forecastByCoordsApi = useApi(getForecastByCoords)

  const isLoading = computed(
    () =>
      currentWeatherApi.loading.value ||
      weatherByCoordsApi.loading.value ||
      forecastApi.loading.value ||
      forecastByCoordsApi.loading.value,
  )

  const hasError = computed(
    () =>
      currentWeatherApi.error.value ||
      weatherByCoordsApi.error.value ||
      forecastApi.error.value ||
      forecastByCoordsApi.error.value,
  )

  const errorMessage = computed(() => {
    const errors = [
      currentWeatherApi.error.value,
      weatherByCoordsApi.error.value,
      forecastApi.error.value,
      forecastByCoordsApi.error.value,
    ].filter(Boolean)

    return errors.length > 0 ? errors[0]?.message : null
  })

  return {
    // Current weather
    currentWeather: currentWeatherApi.data,
    getCurrentWeather: currentWeatherApi.execute,

    // Weather by coordinates
    weatherByCoords: weatherByCoordsApi.data,
    getWeatherByCoords: weatherByCoordsApi.execute,

    // Forecast
    forecast: forecastApi.data,
    getForecast: forecastApi.execute,

    // Forecast by coordinates
    forecastByCoords: forecastByCoordsApi.data,
    getForecastByCoords: forecastByCoordsApi.execute,

    // Global state
    isLoading,
    hasError,
    errorMessage,

    // Reset functions
    resetCurrentWeather: currentWeatherApi.reset,
    resetWeatherByCoords: weatherByCoordsApi.reset,
    resetForecast: forecastApi.reset,
    resetForecastByCoords: forecastByCoordsApi.reset,
  }
}
