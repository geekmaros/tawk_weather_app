<script setup lang="ts">
import SectionHeader from '@/components/molecules/SectionHeader.vue'
import BaseIconButton from '@/components/atoms/BaseIconButton.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

// Props from parent
const props = defineProps<{
  name: string
  email: string
  phone: string
}>()

const emit = defineEmits(['edit-toggle'])

const router = useRouter()

const formattedPhone = computed(() =>
  props.phone.replace(/(\+?\d{1,3})?[\s-]?(\d{3})[\s-]?(\d{3})[\s-]?(\d{4})/, '$1 $2 $3 $4'),
)

const goBack = () => {
  router.back()
}

const toggleEdit = () => {
  emit('edit-toggle')
}
</script>

<template>
  <div class="profile-header-wrapper">
    <div class="profile-header-wrapper__header">
      <BaseIconButton
        class="icon"
        icon="IconArrowLeft"
        aria-label="Go back"
        variant="icon"
        :icon-color="'black'"
        @click="goBack"
      />
      <SectionHeader class="text--header" title="Edit Profile" />
    </div>

    <div class="profile-header-wrapper__banner">
      <div class="avatar-wrapper">
        <img src="@/assets/images/default.png" alt="Avatar" class="avatar" />
        <BaseIconButton
          class="icon"
          icon="IconEdit"
          aria-label="Toggle Edit"
          variant="icon"
          :icon-color="'black'"
          @click="toggleEdit"
        />
      </div>
    </div>

    <div class="profile-name">
      <div class="summary">
        <p class="name">{{ name }}</p>
        <p class="info">{{ email }} | {{ formattedPhone }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-header-wrapper {
  position: relative;
  background: #f5f8ff;
  border-bottom-left-radius: 100% 30%;
  border-bottom-right-radius: 100% 30%;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    z-index: 10;
    position: relative;

    .icon {
      position: absolute;
      left: 0;
    }
    //.text--header {
    //}
  }

  &__banner {
    position: relative;
    width: 100%;
    height: 140px;
    margin-top: -1rem;
    .icon {
      position: absolute;
      bottom: 0;
      margin-left: -30px;
      background: #f5f5f5;
      border-radius: 50%;
      border: 5px solid #f5f5f5;
    }

    .avatar-wrapper {
      position: absolute;
      bottom: -48px;
      left: 50%;
      transform: translateX(-50%);

      .avatar {
        width: 96px;
        height: 96px;
        border-radius: 50%;
        border: 4px solid white;
        object-fit: cover;
      }
    }

    .summary {
      margin-top: 60px; // to give space below the avatar
      text-align: center;

      .name {
        font-weight: 600;
        font-size: 1.125rem;
      }

      .info {
        font-size: 0.875rem;
        color: #6b7280;
      }
    }
  }
}

.profile-name {
  width: 100%;
  margin: 60px auto;
  align-items: center;
  justify-items: center;

  .summary {
    text-align: center;
  }
}
</style>
