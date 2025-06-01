<template>
  <div class="city-weather-list">
    <CityWeatherCard
      v-for="city in cities"
      :key="city.name"
      :location="city.name"
      :time="city.time"
      :condition="city.description"
      :temperature="city.temperature"
      :high="city.high"
      :low="city.low"
      :dt="city.dt"
      @click="handleClick(city)"
      class="city-weather-list__card"
    />
  </div>
</template>

<script setup lang="ts">
import CityWeatherCard from '@/components/molecules/CityWeatherCard.vue'

defineProps<{
  cities: {
    name: string
    time: string
    description: string
    temperature: number
    high: number
    low: number
    dt: number
  }[]
}>()

const emit = defineEmits<{
  (e: 'select', city: any): void
}>()

const handleClick = (city: any) => {
  emit('select', city)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/components/city-weather-list' as *;

.city-weather-list {
  display: flex;
  flex-direction: column;
}
</style>
