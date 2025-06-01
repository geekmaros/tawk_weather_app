// export function formatDate(datetime: string): string {
//   const date = new Date(datetime)
//   return date.toLocaleDateString(undefined, {
//     weekday: 'short',
//     month: 'short',
//     day: 'numeric',
//   })
// }

export const formatDate = (dt_txt: string | Date): string => {
  const date = new Date(dt_txt)
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

export const formatHour = (dt_txt: string): string => {
  const date = new Date(dt_txt)
  return date.toLocaleTimeString(undefined, { hour: 'numeric', hour12: true })
}

export const formatTime = (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => {
  const d = new Date(date)
  return d.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    ...options,
  })
}

export const formatDay = (input: string | Date): string => {
  const date = typeof input === 'string' ? new Date(input) : input
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

export const getTodayFormattedDate = (): string =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
