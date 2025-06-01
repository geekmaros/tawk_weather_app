<script setup lang="ts">
import BaseCard from '@/components/atoms/BaseCard.vue'
import type { HourlyForecastItem } from '@/types/weather'
import WeatherIcon from '@/components/atoms/WeatherIcon.vue'

defineProps<Omit<HourlyForecastItem, 'id'>>()
</script>

<template>
  <BaseCard class="hourly-card">
    <div class="hourly-card__inner">
      <WeatherIcon :iconCode="icon" size="4x" class="weather-summary__icon" />
      <p class="hourly-card__temp forecast__temp">{{ Math.round(temperature) }}°</p>
      <p class="hourly-card__hour">{{ time }}</p>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
.hourly-card {
  background-color: #f5f5f5;
  padding: 12px 0px 12px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__hour {
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    margin-top: 8px;
    color: #494343;
  }
}
</style>
