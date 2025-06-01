<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="section-header">
    <h2 class="section-header__title">{{ title }}</h2>
    <p v-if="subtitle" class="section-header__subtitle">{{ subtitle }}</p>
    <slot name="action" />
  </div>
</template>

<style scoped lang="scss">
.section-header {
  &__title {
    font-family: 'SF Pro Display', sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #111827;
    text-transform: capitalize;
    margin: 0;
  }

  &__subtitle {
    font-family: 'SF Pro Display', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #6b7280;
    margin-top: 4px;
  }
}
</style>
