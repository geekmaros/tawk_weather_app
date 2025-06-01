<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'ghost' | 'danger' | 'icon'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    disabled: false,
    loading: false,
  },
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['base-button', variant, { loading }]"
    @click="(e) => emit('click', e)"
  >
    <span v-if="loading" class="loader" />
    <span v-else>{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.3rem;
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &.primary {
    background-color: #2e3a5a;
    color: white;

    &:hover {
      background-color: #4338ca;
    }
  }

  &.ghost {
    background: transparent;
    color: #4f46e5;
    border: 1px solid #4f46e5;

    &:hover {
      background: #eef2ff;
    }
  }

  &.danger {
    background-color: #dc2626;
    color: white;

    &:hover {
      background-color: #b91c1c;
    }
  }

  &.icon {
    padding: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .loader {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid white;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
