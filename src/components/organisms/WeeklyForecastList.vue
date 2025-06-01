<script setup lang="ts">
import type { WeeklyForecastItem } from '@/types/weather'
import WeeklyForecastCard from '@/components/molecules/WeeklyForecastCard.vue'
import SectionHeader from '@/components/molecules/SectionHeader.vue'

defineProps<{
  forecast: WeeklyForecastItem[]
}>()
</script>

<template>
  <section class="weekly-forecast">
    <SectionHeader class="weekly-forecast__title" title="7-Day Forecast" />
    <ul class="weekly-forecast__list">
      <li v-for="item in forecast" :key="item.id" class="weekly-forecast__item">
        <WeeklyForecastCard
          :day="item.day"
          :description="item.description"
          :temperature="item.temperature"
          :icon="item.icon"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.weekly-forecast {
  margin-top: 2rem;

  &__title {
    margin-bottom: 1.25rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0;
    list-style: none;
    margin: 0;
  }

  &__item {
    width: 100%;
  }
}
</style>
