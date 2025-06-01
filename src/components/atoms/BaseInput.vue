<script setup lang="ts">
import { ref, watch, computed, defineAsyncComponent } from 'vue'

interface InputProps {
  name: string
  modelValue: string | number
  type?: string
  label?: string
  placeholder?: string
  maxLength?: number
  min?: number
  disabled?: boolean
  required?: boolean
  error?: string
  supportingText?: string
  leadingIcon?: string
  trailingIcon?: string
  erasable?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  label: '',
  placeholder: '',
  required: false,
  disabled: false,
  erasable: false,
  loading: false,
})

const emit = defineEmits([
  'update:modelValue',
  'blur',
  'focus',
  'change',
  'erase',
  'leadingIconClicked',
  'trailingIconClicked',
])

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function handleErase() {
  emit('update:modelValue', '')
  emit('erase')
}

const LeadingIconComponent = computed(() => {
  if (!props.leadingIcon) return null

  return defineAsyncComponent(() => import(`@/components/atoms/icons/${props.leadingIcon}.vue`))
})

const TrailingIconComponent = computed(() => {
  if (!props.trailingIcon) return null

  return defineAsyncComponent(() => import(`@/components/atoms/icons/${props.leadingIcon}.vue`))
})
</script>

<template>
  <div class="base-input">
    <label v-if="label" class="base-input__label" :for="name">
      {{ label }}
      <span v-if="required" class="base-input__required">*</span>
    </label>

    <div class="base-input__wrapper" :class="{ 'has-error': !!error, 'is-disabled': disabled }">
      <component
        v-if="LeadingIconComponent"
        :is="LeadingIconComponent"
        class="base-input__icon leading"
        @click="$emit('leadingIconClicked')"
      />

      <input
        :id="name"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :min="min"
        :disabled="disabled"
        class="base-input__field"
        @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        @change="$emit('change')"
      />

      <!-- Loading Spinner -->
      <span v-if="loading" class="base-input__spinner trailing" aria-label="Loading"></span>

      <!-- Erasable Icon -->
      <span
        v-else-if="erasable && inputValue"
        class="base-input__icon trailing"
        @click="handleErase"
      >
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.99536 2C7.512 2 6.06196 2.43987 4.82859 3.26398C3.59522 4.08809 2.63393 5.25943 2.06627 6.62987C1.49861 8.00032 1.35009 9.50832 1.63948 10.9632C1.92886 12.418 2.64317 13.7544 3.69206 14.8033C4.74096 15.8522 6.07733 16.5665 7.53219 16.8559C8.98704 17.1453 10.495 16.9968 11.8655 16.4291C13.2359 15.8614 14.4073 14.9001 15.2314 13.6668C16.0555 12.4334 16.4954 10.9834 16.4954 9.5C16.493 7.51159 15.7021 5.6053 14.2961 4.19928C12.8901 2.79326 10.9838 2.00234 8.99536 2ZM8.99536 15.5C7.80868 15.5 6.64864 15.1481 5.66194 14.4888C4.67525 13.8295 3.90621 12.8925 3.45209 11.7961C2.99796 10.6997 2.87914 9.49334 3.11065 8.32946C3.34216 7.16557 3.91361 6.09647 4.75272 5.25736C5.59184 4.41824 6.66094 3.8468 7.82482 3.61529C8.98871 3.38378 10.1951 3.5026 11.2915 3.95672C12.3878 4.41085 13.3249 5.17988 13.9842 6.16658C14.6435 7.15327 14.9954 8.31331 14.9954 9.5C14.9935 11.0907 14.3608 12.6158 13.236 13.7406C12.1112 14.8655 10.5861 15.4982 8.99536 15.5ZM11.7756 6.71975C11.706 6.65009 11.6233 6.59483 11.5323 6.55713C11.4413 6.51943 11.3438 6.50002 11.2453 6.50002C11.1468 6.50002 11.0493 6.51943 10.9583 6.55713C10.8674 6.59483 10.7847 6.65009 10.7151 6.71975L8.99531 8.4395L7.27556 6.71975C7.20619 6.64895 7.12347 6.59261 7.03218 6.55398C6.9409 6.51535 6.84286 6.49521 6.74374 6.4947C6.64462 6.4942 6.54638 6.51335 6.45471 6.55105C6.36304 6.58876 6.27975 6.64426 6.20966 6.71435C6.13957 6.78444 6.08407 6.86773 6.04637 6.9594C6.00867 7.05107 5.98952 7.14931 5.99003 7.24843C5.99053 7.34755 6.01068 7.44559 6.04931 7.53687C6.08794 7.62816 6.14429 7.71088 6.21508 7.78025L7.93481 9.5L6.21506 11.2198C6.14504 11.2893 6.08944 11.372 6.05145 11.4631C6.01345 11.5542 5.99381 11.6519 5.99365 11.7505C5.99349 11.8492 6.01281 11.947 6.0505 12.0382C6.0882 12.1294 6.14352 12.2123 6.21331 12.2821C6.2831 12.3519 6.36598 12.4072 6.45719 12.4449C6.54841 12.4826 6.64616 12.5019 6.74485 12.5017C6.84355 12.5015 6.94124 12.4819 7.03232 12.4439C7.1234 12.4059 7.20609 12.3503 7.27564 12.2802L8.99539 10.5605L10.7151 12.2802C10.8562 12.4188 11.0463 12.496 11.244 12.4951C11.4417 12.4942 11.6311 12.4153 11.7709 12.2755C11.9107 12.1357 11.9896 11.9463 11.9905 11.7486C11.9914 11.5509 11.9142 11.3608 11.7756 11.2198L10.0559 9.5L11.7757 7.78025C11.8453 7.71063 11.9006 7.62796 11.9383 7.53698C11.976 7.446 11.9954 7.34848 11.9953 7.25C11.9953 7.15151 11.9759 7.054 11.9382 6.96302C11.9005 6.87203 11.8453 6.78937 11.7756 6.71975H11.7756Z"
            fill="#8C939D"
          />
        </svg>
      </span>

      <!-- Trailing Icon -->
      <component
        v-if="TrailingIconComponent"
        :is="TrailingIconComponent"
        class="base-input__icon trailing"
        @click="$emit('trailingIconClicked')"
      />
    </div>

    <p v-if="supportingText && !error" class="base-input__supporting">{{ supportingText }}</p>
    <p v-if="error" class="base-input__error">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">
.base-input {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__label {
    font-size: 0.875rem;
    color: #1f2937;
    margin-bottom: 0.25rem;
    display: inline-block;
  }

  &__required {
    color: red;
    margin-left: 0.25rem;
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 0.625rem;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.2s ease;

    &.has-error {
      border-color: #f87171;
    }

    &.is-disabled {
      background: #f3f4f6;
      pointer-events: none;
      opacity: 0.7;
    }
  }

  &__field {
    flex: 1;
    font-size: 1rem;
    border: none;
    outline: none;
    background: transparent;
    color: #111827;

    &::placeholder {
      color: #9ca3af;
    }
  }

  &__icon {
    font-size: 1rem;
    color: #6b7280;
    cursor: pointer;
    &.leading {
      margin-right: 0.5rem;
    }
    &.trailing {
      margin-left: 0.5rem;
    }
  }

  &__supporting {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }

  &__error {
    font-size: 0.75rem;
    color: #ef4444;
    margin-top: 0.25rem;
  }

  &__spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid #d1d5db;
    border-top-color: #4b5563;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    &.trailing {
      margin-left: 0.5rem;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
