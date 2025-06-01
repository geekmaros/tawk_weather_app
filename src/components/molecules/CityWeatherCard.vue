<template>
  <BaseCard
    :class="['weather-card', isNight ? 'night' : 'day']"
    clickable
    @click="
      (e) => {
        $emit('click', e)
      }
    "
  >
    <div class="weather-card__info">
      <div>
        <h3 class="weather-card__location">{{ location }}</h3>
        <p class="weather-card__subtitle">{{ time }}</p>
      </div>
      <div>
        <p class="weather-card__temp">{{ temperature }}°</p>
      </div>
    </div>
    <div class="weather-card__meta">
      <p class="weather-card__condition">{{ smartCapitalize(condition) }}</p>
      <p class="weather-card__range">
        <span>H:{{ high }}° </span>
        <span>L:{{ low }}° </span>
      </p>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '@/components/atoms/BaseCard.vue'

const props = defineProps<{
  location: string
  time: string
  condition: string
  temperature: number
  high: number
  low: number
  dt: number
}>()

const smartCapitalize = (text: string) => {
  const words = text.trim().split(/\s+/)

  if (words.length === 2) {
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

const isNight = computed(() => {
  const hour = new Date(props.dt * 1000).getHours()
  return hour < 6 || hour >= 18 // 6 PM to 6 AM is considered night
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/components/city-weather-card' as *;

.weather-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 1rem;
  background-size: cover;
  background-position: center;
  background-color: #1e3a8a; // fallback
  color: #fff;
  margin-bottom: 1rem;
  cursor: pointer;

  &.day {
    background-image: url('@/assets/images/day.png');
    background-color: #3b82f6; // fallback blue
  }
  &.night {
    background-image: url('@/assets/images/night.png');
    background-color: #3b82f6;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__location {
    font-weight: 700;
    font-size: 25px;
    line-height: 100%;
  }
  //
  &__subtitle {
    margin-top: 2px;
    font-weight: 500;
    font-size: 15px;
    line-height: 100%;
    letter-spacing: -1%;
  }
  //
  &__condition {
    font-weight: 500;
    font-size: 15px;
    line-height: 100%;
    letter-spacing: 1px;
  }
  //
  &__meta {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  //
  &__temp {
    font-size: 3.313rem;
    font-weight: 100;
    line-height: 100%;
    letter-spacing: 1.68px;
  }
  //
  &__range {
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 5%;
    display: flex;
    gap: 0.5rem;
  }
}
</style>
