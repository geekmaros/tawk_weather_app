<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  tag?: string
  clickable?: boolean
  className?: string
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const wrapperTag = computed(() => props.tag || 'div')
</script>

<template>
  <component
    :is="wrapperTag"
    :class="['base-card', { 'base-card--clickable': clickable }, className]"
    @click="
      (e: MouseEvent) => {
        if (clickable) emit('click', e)
      }
    "
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.base-card {
  //padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07);
  transition: box-shadow 0.2s ease;

  &--clickable {
    cursor: pointer;

    &:hover {
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
