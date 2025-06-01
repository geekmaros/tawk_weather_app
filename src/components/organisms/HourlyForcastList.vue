<script setup lang="ts">
import type { HourlyForecastItem } from '@/types/weather'
import HourlyForecastCard from '@/components/molecules/HourlyForecastCard.vue'
import SectionHeader from '@/components/molecules/SectionHeader.vue'

defineProps<{
  forecast: HourlyForecastItem[]
}>()
</script>

<template>
  <section class="hourly-forecast">
    <SectionHeader class="hourly-forecast__title" title="Hourly Forecast" />
    <ul class="hourly-forecast__list">
      <li v-for="item in forecast" :key="item.id" class="hourly-forecast__item">
        <HourlyForecastCard :time="item.time" :icon="item.icon" :temperature="item.temperature" />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.hourly-forecast {
  margin-top: 1.5rem;

  &__title {
    margin-bottom: 1rem;
  }

  &__list {
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    padding-bottom: 1rem;
    list-style: none;
    margin: 0;

    // cover all browswers: Hide scrollbar (WebKit-based browsers)
    &::-webkit-scrollbar {
      display: none;
    }

    // Hide scrollbar (Firefox)
    scrollbar-width: none;

    // Hide scrollbar (Edge, IE)
    -ms-overflow-style: none;
  }

  &__item {
    min-width: 90px;
    flex-shrink: 0;
  }
}
</style>
