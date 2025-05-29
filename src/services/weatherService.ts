import type { WeatherData, ForecastData } from '@/types/weather.ts'
// import type { ApiResponse } from '@/types/api.ts'
import { apiGet, retryRequest } from '../utils/apiWrapper'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const defaultParams = {
  appid: API_KEY,
  units: 'metric',
}

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  const response = await retryRequest(() =>
    apiGet<WeatherData>('/weather', {
      q: city,
      ...defaultParams,
    }),
  )

  return response.data
}

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await retryRequest(() =>
    apiGet<WeatherData>('/weather', {
      lat: lat.toString(),
      lon: lon.toString(),
      ...defaultParams,
    }),
  )

  return response.data
}

export const getForecast = async (city: string): Promise<ForecastData> => {
  const response = await retryRequest(() =>
    apiGet<ForecastData>('/forecast', {
      q: city,
      ...defaultParams,
    }),
  )

  return response.data
}

export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  const response = await retryRequest(() =>
    apiGet<ForecastData>('/forecast', {
      lat: lat.toString(),
      lon: lon.toString(),
      ...defaultParams,
    }),
  )

  return response.data
}
