<template>
  <div class="search-bar" :class="{ expanded: isFocused }">
    <div class="search-bar__box">
      <form class="search-bar__form" @submit.prevent="emitSearch">
        <BaseInput
          v-model="model"
          name="search"
          placeholder="Search for a city or airport"
          :erasable="true"
          @trailingIconClicked="emitSearch"
          :loading="loading"
          leading-icon="IconSearch"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />
      </form>

      <ul v-if="suggestions.length" class="search-bar__suggestions">
        <li
          v-for="city in suggestions"
          :key="city.name + city.lat + city.lon"
          class="search-bar__suggestion"
          @mousedown="selectCity(city)"
        >
          {{ city.name }}, {{ city.state ? city.state + ',' : '' }} {{ city.country }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGeocode } from '@/composables/useGeocode'
import type { GeoCity } from '@/types/geo'
import BaseInput from '@/components/atoms/BaseInput.vue'

const modelValue = defineModel<string>({ required: true })
const emit = defineEmits<{
  (e: 'search', query: string): void
  (e: 'select', city: GeoCity): void
}>()

const model = computed({
  get: () => modelValue.value,
  set: (val) => (modelValue.value = val),
})

const { suggestions, loading } = useGeocode(model)

const isFocused = ref(false)

const emitSearch = () => {
  if (model.value.trim()) emit('search', model.value.trim())
}

const onInput = () => {
  // optional extra logic
}

const selectCity = (city: GeoCity) => {
  emit('select', city)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/components/search-bar' as *;
.search-bar {
  position: relative;

  &.expanded {
    position: fixed;
    inset: 0;
    background: white;
    z-index: 50;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  &__box {
    position: relative;
    width: 100%;
  }

  &__form {
    display: flex;
    align-items: center;
    background: #f3f4f6;
    border-radius: 0.75rem;
    width: 100%;
  }

  &__suggestions {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    z-index: 100;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  &__suggestion {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #f9fafb;
    }
  }
}
</style>
