<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseInput from '@/components/atoms/BaseInput.vue'

interface Country {
  name: string
  code: string
  dialCode: string
  flag: string
}

// in a real app we use an API for the country code
const countries: Country[] = [
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '🇳🇬' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧' },
]

const selectedCountry = ref<Country>(countries[0])
const phoneNumber = defineModel<string>({ required: true })

const fullNumber = computed(() => `${selectedCountry.value.dialCode} ${phoneNumber.value}`)
</script>

<template>
  <div class="phone-input">
    <div class="phone-input__selector">
      <select v-model="selectedCountry" class="flag-dropdown">
        <option v-for="country in countries" :key="country.code" :value="country">
          {{ country.flag }}
        </option>
      </select>
    </div>
    <BaseInput
      v-model="phoneNumber"
      type="tel"
      name="phone"
      placeholder="Enter phone number"
      class="phone-input__input"
    />
  </div>
</template>

<style scoped lang="scss">
.phone-input {
  display: flex;
  align-items: center;

  &__selector {
    margin-right: 0.5rem;

    select.flag-dropdown {
      font-size: 1rem;
      padding: 0.4rem;
      border-radius: 6px;
      border: 1px solid #ccc;
      background: white;
      appearance: none;
    }
  }

  &__input {
    flex: 1;
  }
}
</style>
