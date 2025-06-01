<script setup lang="ts"></script>

<template>
  <section class="weather-details-template">
    <div class="weather-details__summary">
      <slot name="weatherSummary"> </slot>
    </div>

    <div class="weather-details-template__forecast">
      <slot name="hourlyForecast"></slot>

      <slot name="weeklyForecast"> </slot>
    </div>
  </section>
</template>

<style scoped lang="scss">
.weather-details-template {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__forecast {
    padding: 1rem;
    flex: 1;
  }
}
</style>
