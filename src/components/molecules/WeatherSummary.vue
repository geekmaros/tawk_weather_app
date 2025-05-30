<script setup lang="ts">
import WeatherIcon from '@/components/atoms/WeatherIcon.vue'
import { formatTime, getTodayFormattedDate } from '@/utils/formatters'
import { computed } from 'vue'
import BaseIconButton from '@/components/atoms/BaseIconButton.vue'
import { useRoute, useRouter } from 'vue-router'
import { getCountryName } from '@/utils/helpers.ts'

// const route = useRoute()
const router = useRouter()

const props = defineProps<{
  city: string
  countryCode: string
  temperature: number
  iconCode: string
  description: string
  lastUpdated: string | number | Date
}>()

const lastUpdatedValue = computed(() => {
  if (typeof props.lastUpdated === 'number') {
    return formatTime(props.lastUpdated * 1000)
  }

  if (props.lastUpdated instanceof Date) {
    return formatTime(props.lastUpdated)
  }

  return ''
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="weather-summary">
    <div class="weather-summary__header">
      <BaseIconButton icon="IconArrowLeft" aria-label="Go back" variant="icon" @click="goBack" />

      <span v-if="countryCode" class="weather-summary__location"
        >{{ city }}, {{ getCountryName(countryCode) }}</span
      >

      <BaseIconButton icon="IconPlus" aria-label="add location to favourite" variant="icon" />
    </div>

    <div class="weather-summary__content">
      <p class="weather-summary__date">{{ getTodayFormattedDate() }}</p>

      <WeatherIcon
        :iconCode="iconCode"
        :width="74"
        :height="74"
        size="4x"
        class="weather-summary__icon"
      />

      <p class="weather-summary__temperature">{{ Math.round(temperature) }}° C</p>
      <p class="weather-summary__description">{{ description }}</p>

      <p class="weather-summary__updated">
        <span>Last Update {{ lastUpdatedValue }}</span>
        <BaseIconButton
          class="weather-summary__updated--refresh"
          icon="IconRefresh"
          variant="icon"
          aria-label="refresh"
        />
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather-summary {
  text-align: center;
  color: white;
  padding: 1.5rem 1rem;
  background: linear-gradient(118.25deg, #4f80fa 1.2%, #3764d7 59.26%, #335fd1 79.2%);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__location {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 100%;
    text-transform: capitalize;
  }

  &__city {
    font-weight: 500;
    font-size: 20px;
  }

  &__date {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 100%;
    text-transform: capitalize;
  }

  &__icon {
    margin: 24px 0 16px 0;
    width: 72px;
    height: 72px;
  }

  &__temperature {
    font-weight: 400;
    font-size: 20px;
    line-height: 100%;
  }

  &__description {
    margin-top: 4px;
    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
    text-transform: capitalize;
  }

  &__updated {
    display: flex;
    align-items: center;
    margin-top: 2rem;
    font-size: 14px;

    &--refresh {
      margin-left: -10px;
    }
  }
}
</style>
