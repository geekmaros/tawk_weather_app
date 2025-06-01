<template>
  <CityListTemplate>
    <template #profile>
      <IconUser @click="goToProfile" aria-label="Go to profile" />
    </template>

    <template #search>
      <SearchBar v-model="search" @search="handleSearch" @select="handleCitySelect" />
    </template>

    <template #default>
      <div v-if="isLoading" class="loading-container">
        <WeatherLoader />
      </div>

      <template v-else>
        <CityWeatherList
          v-if="formattedCities.length"
          :cities="formattedCities"
          @select="handleCardClick"
        />
        <p v-else class="no-cities-message">You haven't saved any cities yet.</p>
      </template>
    </template>
  </CityListTemplate>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWeather } from '@/composables/useWeather'
import CityListTemplate from '@/components/templates/CityListTemplate.vue'
import SearchBar from '@/components/molecules/SearchBar.vue'
import CityWeatherList from '@/components/organisms/CityWeatherList.vue'
import IconUser from '@/components/atoms/icons/IconUser.vue'
import type { GeoCity } from '@/types/geo.ts'
import BaseCard from '@/components/atoms/BaseCard.vue'
import type { SavedWeatherItem } from '@/types/weather.ts'
import { useGeolocation } from '@/composables/useGeolocation'
import { useSavedWeather } from '@/composables/useSavedWeather'
import { formatTime } from '@/utils/formatters.ts'
import WeatherLoader from '@/components/molecules/WeatherLoader.vue'

const router = useRouter()

const search = ref('')
// const savedCities = ref(['London', 'Seongnam-si', 'Bangsar South'])

const { weatherByCoords, getWeatherByCoords, isLoading } = useWeather()

const { savedCoords } = useSavedWeather()

const selectedCity = ref<GeoCity | null>(null)
const savedWeatherItems = ref<SavedWeatherItem[]>([])
let pollingInterval: number | undefined

const formattedCities = computed(() =>
  savedWeatherItems.value.filter(Boolean).map((w) => ({
    name: w.name,
    time: formatTime(w.dt * 1000),
    description: w.weather?.[0]?.description ?? 'Unknown',
    temperature: Math.round(w.main?.temp),
    high: Math.round(w.main?.temp_max),
    low: Math.round(w.main?.temp_min),
    lat: w.coord.lat,
    lon: w.coord.lon,
    dt: w.dt,
    timezone: w.timezone,
  })),
)

const handleCitySelect = async (city: GeoCity) => {
  selectedCity.value = city
  search.value = ''
  console.log(city)

  await getWeatherByCoords(city.lat, city.lon)

  console.log(weatherByCoords)

  await router.push({
    name: 'WeatherDetailPage',
    params: { city: city.name },
    query: { lat: city.lat, lon: city.lon },
  })
}
function handleSearch(query: string) {
  console.log('Manual search triggered:', query)

  // Optionally fetch coordinates and weather from text if not selecting from suggestions
  // For example:
  // const results = await searchGeoCity(query)
  // handleCitySelect(results[0])
}
function goToProfile() {
  // navigate to profile page
  router.push({ name: 'EditProfilePage' })
}

const handleCardClick = async (city: any) => {
  console.log('I herer event ', city)
  try {
    await router.push({
      name: 'WeatherDetailPage',
      params: { city: city.name },
      query: { lat: city.lat, lon: city.lon },
    })
  } catch (err) {
    console.error('🚨 Router push failed:', err)
  }
}

const fetchSavedCitiesWeather = async () => {
  const result = await Promise.allSettled(
    savedCoords.value.map(({ lat, lon }) => getWeatherByCoords(lat, lon)),
  )

  savedWeatherItems.value = result
    .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled' && r.value)
    .map((r) => r.value)
}

onMounted(async () => {
  await fetchSavedCitiesWeather()

  // we doing a Poll every 5 minutes (in ms), used 5 so as not to exhuast it on time while testing locally
  pollingInterval = window.setInterval(fetchSavedCitiesWeather, 5 * 60 * 1000)
})

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval)
})
</script>
<style lang="scss">
.no-cities-message {
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
  color: #6b7280; // Tailwind's gray-500
}
</style>
