<template>
  <div class="profile">
    <ProfileTemplate>
      <template #profile-header>
        <ProfileHeader
          :name="form.name"
          :email="form.email"
          :phone="form.phone"
          @edit-toggle="toggleEdit"
        />
      </template>
      <template #profile-form>
        <ProfileForm :is-editing="isEditing" v-model:form="form" @save="handleSave" />
      </template>
    </ProfileTemplate>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProfileHeader from '@/components/molecules/ProfileHeader.vue'
import ProfileTemplate from '@/components/templates/ProfileTemplate.vue'
import ProfileForm from '@/components/molecules/ProfileForm.vue'

const isEditing = ref(false)
const form = ref({
  name: 'Jane Doe',
  email: 'jane@gmail.com',
  phone: '+1 234 567 89',
})

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const handleSave = async (formData: typeof form.value) => {
  console.log('Saving...', formData)
  Object.assign(form.value, formData)
  isEditing.value = false
}
</script>
