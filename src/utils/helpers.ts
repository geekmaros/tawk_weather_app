export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getWeatherIconUrl = (iconCode: string, size: '2x' | '4x' = '2x'): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`
}

export const getCountryName = (code: string) => {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(code)
}
