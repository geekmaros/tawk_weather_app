<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  iconCode: string // e.g., '10d' this is from openweather
  alt?: string // optional alt text, we need this to make accessiblity consitent
  size?: '2x' | '4x' // icon resolution, this is based on openweather
  className?: string
}>()

const url = computed(
  () => `https://openweathermap.org/img/wn/${props.iconCode}@${props.size || '2x'}.png`,
)
</script>

<template>
  <img
    :src="url"
    :alt="alt || 'Weather icon'"
    :class="['weather-icon', className]"
    loading="lazy"
    width="64"
    height="64"
  />
</template>

<style scoped lang="scss">
.weather-icon {
  display: inline-block;
  width: 64px;
  height: 64px;
  object-fit: contain;
}
</style>
