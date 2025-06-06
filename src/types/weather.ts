export interface WeatherData {
  id: number
  name: string
  country: string
  coord: {
    lat: number
    lon: number
  }
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
    deg: number
  }
  visibility: number
  dt: number
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
}

export interface ForecastData {
  list: Array<{
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      humidity: number
    }
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
    wind: {
      speed: number
      deg: number
    }
    dt_txt: string
  }>
  city: {
    name: string
    country: string
    coord: {
      lat: number
      lon: number
    }
  }
}

export interface HourlyForecastItem {
  id?: number
  icon: string
  temperature: number
  time: string
}

export interface WeeklyForecastItem {
  id: number
  day: string
  icon: string
  temperature: number
  description: string
}

export interface UserWeather {
  id: number
  name: string
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  main: {
    temp: number
    temp_min: number
    temp_max: number
    feels_like: number
    pressure: number
    humidity: number
  }
  sys: {
    country: string
  }
  dt: number
}

export interface SavedWeatherItem {
  city: string
  countryCode: string
  lat: number
  lon: number
}

export interface WeatherRequestParams {
  q?: string
  lat?: string
  lon?: string
  appid: string
  units?: 'metric' | 'imperial' | 'kelvin'
  lang?: string
}

export interface ForecastRequestParams extends WeatherRequestParams {
  cnt?: number // Number of timestamps to return
}
