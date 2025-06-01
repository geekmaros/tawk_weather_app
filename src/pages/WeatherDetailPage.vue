<template>
  <section class="weather-detail">
    <div v-if="isLoading" class="weather-detail__loading">
      <WeatherLoader />
    </div>

    <div v-else-if="hasError" class="weather-detail__error">
      <p>{{ errorMessage }}</p>
    </div>

    <div v-else class="weather-detail__content">
      <WeatherDetailsTemplate>
        <template #weatherSummary>
          <WeatherSummary
            v-if="currentWeather"
            :city="currentWeather?.name"
            :country-code="currentWeather?.sys.country"
            :temperature="currentWeather?.main.temp"
            :icon-code="currentWeather?.weather[0].icon"
            :description="currentWeather?.weather[0].description"
            :last-updated="lastUpdated"
            :lat="lat"
            :lon="lon"
            @refresh="handleRefresh"
          />
        </template>

        <!-- We Showing the Hourly Forecast here -->
        <template #hourlyForecast>
          <HourlyForecastList :forecast="hourlyForecast" />
        </template>

        <!-- We Showing the Weekly Forecast here -->
        <template #weeklyForecast>
          <WeeklyForecastList :forecast="weeklyForecast" />
        </template>
      </WeatherDetailsTemplate>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { HourlyForecastItem, ForecastData } from '@/types/weather'
import { useRoute, useRouter } from 'vue-router'
import { useWeather } from '@/composables/useWeather'
import WeatherSummary from '@/components/molecules/WeatherSummary.vue'
import WeatherDetailsTemplate from '@/components/templates/WeatherDetailsTemplate.vue'
import { formatTime, formatDay } from '@/utils/formatters'
import HourlyForecastList from '@/components/organisms/HourlyForcastList.vue'
import WeeklyForecastList from '@/components/organisms/WeeklyForecastList.vue'
import WeatherLoader from '@/components/molecules/WeatherLoader.vue'

const route = useRoute()
const router = useRouter()

const lat = Number(route.query.lat)
const lon = Number(route.query.lon)

const {
  weatherByCoords: currentWeather,
  forecastByCoords: forecast,
  getWeatherByCoords,
  getForecastByCoords,
  isLoading,
  hasError,
  errorMessage,
} = useWeather()

onMounted(() => {
  if (!lat || !lon) {
    router.push('/')
  } else {
    getWeatherByCoords(lat, lon)
    getForecastByCoords(lat, lon)
  }
})

const handleRefresh = () => {
  if (lat && lon) {
    getWeatherByCoords(lat, lon)
    getForecastByCoords(lat, lon)
  }
}

const lastUpdated = computed(() => {
  const dt = currentWeather.value?.dt

  if (typeof dt === 'number') {
    return formatTime(dt * 1000)
  }

  return ''
})

// for free tier openweather offers 3-hour interval: get next 12 hours (4 entries)
const hourlyForecast = computed<HourlyForecastItem[]>(
  () =>
    (forecast.value?.list.slice(0, 4) ?? [])
      .map((item) => {
        const weather = item.weather?.[0]
        if (!item.main || !weather) return null

        return {
          id: item.dt,
          icon: weather.icon,
          temperature: item.main.temp,
          time: formatTime(new Date(item.dt * 1000)),
        }
      })
      .filter(Boolean) as HourlyForecastItem[],
)

// One forecast per day at noon (12:00)
const weeklyForecast = computed(() => {
  const grouped: Record<string, ForecastData['list'][0]> = {}

  forecast.value?.list.forEach((entry) => {
    const [date, time] = entry.dt_txt.split(' ')
    const hour = time.split(':')[0]
    if (hour === '12' && !grouped[date]) {
      grouped[date] = entry
    }
  })

  return Object.values(grouped)
    .slice(0, 7)
    .map((item) => ({
      id: item.dt,
      day: formatDay(item.dt_txt),
      icon: item.weather[0].icon,
      temperature: Math.round(item.main.temp),
      description: item.weather[0].description,
    }))
})
</script>

<style lang="scss" scoped>
.weather-detail {
  &__loading,
  &__error {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
  }
}
</style>
