<script setup lang="ts">
import type { PropType } from 'vue'

interface ButtonProps {
  icon: string
  label?: string
  ariaLabel?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'ghost' | 'icon'
  disabled?: boolean
  className?: string
  iconColor?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  variant: 'primary',
  disabled: false,
  iconColor: 'white',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :aria-label="ariaLabel || label"
    :class="['base-button', variant, className]"
    :disabled="disabled"
    @click="(e) => emit('click', e)"
  >
    <slot name="icon">
      <component
        v-if="icon"
        :is="resolveIcon(icon)"
        class="base-button__icon"
        :style="{ color: iconColor || 'inherit' }"
      />
    </slot>

    <span v-if="label" class="base-button__label">
      {{ label }}
    </span>
  </button>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'

// Dynamically load icons from atoms/icons directory
function resolveIcon(name: string) {
  return defineAsyncComponent(() => import(`@/components/atoms/icons/${name}.vue`))
}
</script>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &.primary {
    background-color: #007aff;
    color: white;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: #005fc1;
    }
  }

  &.ghost {
    background: transparent;
    color: #333;
    padding: 0.5rem;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  &.icon {
    background: none;
    padding: 0.4rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  &__icon {
    font-size: 1.25rem;
    display: flex;
  }

  &__label {
    margin-left: 0.5rem;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
