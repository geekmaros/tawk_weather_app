import type { WeatherData, ForecastData } from '@/types/weather.ts'
// import type { ApiResponse } from '@/types/api.ts'
import { apiGet, retryRequest } from '../utils/apiWrapper'
import { mockCurrentWeather } from '../../data/mockCurrentWeather.ts'
import { mockForecastWeather } from '../../data/mockForecastWeather.ts'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const WEATHER_BASE = '/data/2.5'

const defaultParams = {
  appid: API_KEY,
  units: 'metric',
}

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  const response = await retryRequest(() =>
    apiGet<WeatherData>(`${WEATHER_BASE}/weather`, {
      q: city,
      ...defaultParams,
    }),
  )

  return response.data
}

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  // return mockCurrentWeather
  const response = await retryRequest(() =>
    apiGet<WeatherData>(`${WEATHER_BASE}/weather`, {
      lat: lat,
      lon: lon,
      ...defaultParams,
    }),
  )

  return response.data
}

export const getForecast = async (city: string): Promise<ForecastData> => {
  const response = await retryRequest(() =>
    apiGet<ForecastData>(`${WEATHER_BASE}/forecast`, {
      q: city,
      ...defaultParams,
    }),
  )

  return response.data
}

export const getForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  // return mockForecastWeather
  const response = await retryRequest(() =>
    apiGet<ForecastData>(`${WEATHER_BASE}/forecast`, {
      lat: lat,
      lon: lon,
      ...defaultParams,
    }),
  )

  return response.data
}
