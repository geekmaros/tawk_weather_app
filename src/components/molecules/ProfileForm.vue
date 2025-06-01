<script setup lang="ts">
import PhoneInput from '@/components/molecules/PhoneInput.vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import { ref, watch, defineProps, defineEmits } from 'vue'

// Props
const props = defineProps<{
  isEditing: boolean
}>()

// Emit event to parent when form is submitted
const emit = defineEmits<{
  (e: 'save', formData: typeof form.value): void
}>()

const form = ref({
  name: 'Jane Doe',
  email: 'jane@gmail.com',
  phone: '+1 234 567 89',
})

const handleSubmit = () => {
  emit('save', { ...form.value })
}
</script>

<template>
  <div class="profile-form">
    <form class="form" @submit.prevent="handleSubmit">
      <BaseInput
        class="form-input"
        v-model="form.name"
        name="name"
        label="Full name"
        :disabled="!isEditing"
      />
      <BaseInput
        class="form-input"
        v-model="form.email"
        name="email"
        label="Email"
        :disabled="!isEditing"
      />
      <PhoneInput class="form-input" v-model="form.phone" :disabled="!isEditing" />

      <BaseButton v-if="isEditing" class="form-button" type="submit" label="Save Changes" />
    </form>
  </div>
</template>

<style scoped lang="scss">
.profile-form {
  padding: 1rem;
  height: 100%;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .form-input {
      background: #f5f5f5;
      width: 100%;
      border-radius: 8px;
    }

    .form-button {
      width: 100%;
    }
  }
}
</style>
