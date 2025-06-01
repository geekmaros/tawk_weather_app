<script setup lang="ts">
import BaseCard from '@/components/atoms/BaseCard.vue'
import WeatherIcon from '@/components/atoms/WeatherIcon.vue'
import BaseIconButton from '@/components/atoms/BaseIconButton.vue'

defineProps<{
  day: string
  description: string
  temperature: number
  icon: string
}>()
</script>

<template>
  <BaseCard class="weekly-card">
    <div class="weekly-card__content">
      <WeatherIcon :iconCode="icon" size="4x" class="weather-summary__icon" />
      <div class="weekly-card__info">
        <h4 class="weekly-card__day">{{ day }}</h4>
        <p class="weekly-card__description">{{ description }}</p>
      </div>
      <div>
        <span class="weekly-card__temperature forecast__temp">{{ temperature }}°C</span>
        <BaseIconButton icon="IconCaretRight" variant="icon" aria-label="refresh" />
      </div>
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
.weekly-card {
  background: #d2dfff;
  border-radius: 12px;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__day {
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
  }

  &__description {
    font-size: 0.813rem;
    margin-top: -15px;
    color: #494343;
    text-transform: capitalize;
  }
}
</style>
