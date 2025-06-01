<template>
  <section class="city-list-template">
    <header class="city-list-template__header">
      <h1 class="city-list-template__title">Weather</h1>
      <slot name="profile" />
    </header>

    <div class="city-list-template__search">
      <slot name="search" />
    </div>

    <div class="city-list-template__content">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/components/city-list-template' as *;

.city-list-template {
  padding: 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 2.313rem;
    font-weight: 700;
  }

  &__search {
    margin: 1rem 0;
  }

  &__content {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
